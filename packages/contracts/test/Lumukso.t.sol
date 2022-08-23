// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "../src/Lumukso.sol";
import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {_ALL_DEFAULT_PERMISSIONS} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Constants.sol";
import {OPERATION_CALL} from "@erc725/smart-contracts/contracts/constants.sol";

contract LumuksoTest is Test {
    using ECDSA for bytes32;

    UniversalProfile myUniversalProfile;
    Lumukso myLumukso;

    uint256 constant originalOwner = 1;
    uint256 constant guardian = 2;
    uint256 constant newOwner = 3;

    function setUp() public {
        vm.startPrank(vm.addr(originalOwner));

        myUniversalProfile = new UniversalProfile(vm.addr(originalOwner));
        myLumukso = new Lumukso(myUniversalProfile);
        assertEq(myLumukso.target(), address(myUniversalProfile));

        {
            (bytes32[] memory keys, bytes[] memory values) = LSP6Utils
                .createPermissionsKeysForController(
                    myUniversalProfile,
                    vm.addr(originalOwner),
                    abi.encodePacked(_ALL_DEFAULT_PERMISSIONS)
                );
            myUniversalProfile.setData(keys, values);
        }

        {
            (bytes32[] memory keys, bytes[] memory values) = LSP6Utils
                .createPermissionsKeysForController(
                    myUniversalProfile,
                    address(myLumukso.socialRecovery()),
                    abi.encodePacked(hex"0000000000000000000000000000000000000000000000000000000000000026") // STATICCALL + CHANGEPERMISSIONS + ADDPERMISSIONS
                );
            myUniversalProfile.setData(keys, values);
        }

        myUniversalProfile.transferOwnership(address(myLumukso));
        myUniversalProfile.execute(
            OPERATION_CALL,
            address(myLumukso),
            0,
            abi.encodeWithSignature("claimProfileOwnership()")
        );
        assertEq(myUniversalProfile.owner(), address(myLumukso));

        vm.stopPrank();
    }

    function testMagicLinkGuardian() public {
        // set secret
        vm.startPrank(address(myUniversalProfile));
        string memory secret = "recovery secret";
        bytes32 secretHash = keccak256(bytes(secret));
        myLumukso.socialRecovery().setSecret(secretHash);
        vm.stopPrank();

        // add pending guardian
        vm.startPrank(address(myUniversalProfile));
        myLumukso.socialRecovery().addPendingGuardian(vm.addr(guardian));
        bytes32 hash = keccak256(bytes(string.concat(
                "operation=confirmPendingGuardian&expirationTimestamp=",
                Strings.toString(myLumukso.socialRecovery().getPendingGuardianExpiration(vm.addr(guardian))),
                "&socialRecoveryAddress=",
                string(abi.encodePacked(address(myLumukso.socialRecovery())))
            ))).toEthSignedMessageHash();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(guardian, hash);
        myLumukso.socialRecovery().confirmPendingGuardian(vm.addr(guardian), r, s, v);
        vm.stopPrank();

        // vote to recover bob
        vm.startPrank(vm.addr(guardian));
        bytes32 recoverProcessId = keccak256("recover-process-1");
        myLumukso.socialRecovery().voteToRecover(recoverProcessId, vm.addr(newOwner));
        vm.stopPrank();

        // recover ownership to bob
        vm.startPrank(vm.addr(newOwner));
        myLumukso.socialRecovery().recoverOwnership(recoverProcessId, secret, keccak256("new secret"));
        vm.stopPrank();
    }
}
