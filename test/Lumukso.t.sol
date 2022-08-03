// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "../src/Lumukso.sol";
import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {_ALL_DEFAULT_PERMISSIONS} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Constants.sol";

contract LumuksoTest is Test {
    using ECDSA for bytes32;

    UniversalProfile myUniversalProfile;
    Lumukso myLumukso;

    function setUp() public {
        myUniversalProfile = new UniversalProfile(address(this));
        myLumukso = new Lumukso(myUniversalProfile);
        assertEq(myLumukso.target(), address(myUniversalProfile));

        (bytes32[] memory keys, bytes[] memory values) = LSP6Utils
            .createPermissionsKeysForController(
                myUniversalProfile,
                address(myLumukso),
                abi.encodePacked(_ALL_DEFAULT_PERMISSIONS)
            );
        myUniversalProfile.setData(keys, values);

        myUniversalProfile.transferOwnership(address(myLumukso));
        myLumukso.claimOwnership();
        assertEq(myUniversalProfile.owner(), address(myLumukso));
    }

    function testAddMagicLinkGuardian() public {
        uint256 expirationTimestamp = block.timestamp + 300;
        address bob = vm.addr(2);
        myLumukso.setPendingMagicLinkGuardian(bob);
        bytes32 hash = keccak256(bytes(string.concat(
                "operation=confirmMagicLinkGuardian&expirationTimestamp=",
                Strings.toString(expirationTimestamp),
                "&lumuksoAddress=",
                string(abi.encodePacked(address(myLumukso)))
            ))).toEthSignedMessageHash();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(2, hash);
        myLumukso.confirmMagicLinkGuardian(expirationTimestamp, r, s, v);
    }
}
