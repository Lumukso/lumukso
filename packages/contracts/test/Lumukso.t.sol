// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {LSP6KeyManager} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6KeyManager.sol";
import {_ALL_DEFAULT_PERMISSIONS} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Constants.sol";
import {OPERATION_CALL} from "@erc725/smart-contracts/contracts/constants.sol";
import "../src/LumuksoSocialRecovery.sol";

contract LumuksoTest is Test {
    using ECDSA for bytes32;

    UniversalProfile aliceUniversalProfile;
    LumuksoSocialRecovery lumuksoSocialRecovery;

    LSP6KeyManager aliceKeyManager;
    uint256 constant aliceUPKey = 1;

    LSP6KeyManager bobKeyManager;
    UniversalProfile bobUniversalProfile;
    uint256 constant bobUPKey = 2;

    uint256 constant guardian = 3;

    function setUp() public {
        (aliceUniversalProfile, aliceKeyManager) = createUniversalProfileViaUP(vm.addr(aliceUPKey));

        // setup social recovery permissions
        vm.startPrank(vm.addr(aliceUPKey));
        lumuksoSocialRecovery = new LumuksoSocialRecovery(aliceUniversalProfile);
        {
            (bytes32[] memory keys, bytes[] memory values) = LSP6Utils
            .createPermissionsKeysForController(
                aliceUniversalProfile,
                address(lumuksoSocialRecovery),
                abi.encodePacked(hex"0000000000000000000000000000000000000000000000000000000000000026") // STATICCALL + CHANGEPERMISSIONS + ADDPERMISSIONS
            );
            aliceKeyManager.execute(abi.encodeWithSignature("setData(bytes32[],bytes[])", keys, values));
        }
        vm.stopPrank();
    }

    function createUniversalProfileViaUP(address key) internal returns(UniversalProfile, LSP6KeyManager) {
        vm.startPrank(key);

        // setup universal profile & key manager
        UniversalProfile universalProfile = new UniversalProfile(key);
        LSP6KeyManager keyManager = new LSP6KeyManager(address(universalProfile));
        {
            {
                (bytes32[] memory keys, bytes[] memory values) = LSP6Utils
                .createPermissionsKeysForController(
                    universalProfile,
                    key,
                    abi.encodePacked(_ALL_DEFAULT_PERMISSIONS)
                );
                universalProfile.setData(keys, values);
            }
            {
                (bytes32[] memory keys, bytes[] memory values) = LSP6Utils
                .createPermissionsKeysForController(
                    universalProfile,
                    address(keyManager),
                    abi.encodePacked(_ALL_DEFAULT_PERMISSIONS)
                );
                universalProfile.setData(keys, values);
            }

            universalProfile.transferOwnership(address(keyManager));
            keyManager.execute(abi.encodeWithSignature("claimOwnership()"));
            assertEq(universalProfile.owner(), address(keyManager));
        }

        vm.stopPrank();

        return (universalProfile, keyManager);
    }

    function testRecovery() public {
        // set secret
        vm.startPrank(vm.addr(aliceUPKey));
        string memory secret = "recovery secret";
        bytes32 secretHash = keccak256(bytes(secret));
        aliceKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("setSecret(bytes32)", secretHash)
            )
        );
        vm.stopPrank();

        // add pending guardian
        vm.startPrank(vm.addr(aliceUPKey));
        aliceKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("addPendingGuardian(address)", vm.addr(guardian))
            )
        );
        bytes32 hash = keccak256(bytes(string.concat(
            "operation=confirmPendingGuardian&expirationTimestamp=",
            Strings.toString(lumuksoSocialRecovery.getPendingGuardianExpiration(vm.addr(guardian))),
            "&socialRecoveryAddress=",
            string(abi.encodePacked(address(lumuksoSocialRecovery))
        )))).toEthSignedMessageHash();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(guardian, hash);
        aliceKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("confirmPendingGuardian(address,bytes32,bytes32,uint8)", vm.addr(guardian), r, s, v)
            )
        );
        vm.stopPrank();

        // create new UP profile
        (bobUniversalProfile, bobKeyManager) = createUniversalProfileViaUP(vm.addr(bobUPKey));

        // vote to recover bob
        vm.startPrank(vm.addr(guardian));
        bytes32 recoverProcessId = keccak256("e85183df-ec42-477f-9a0e-526033776310");
        lumuksoSocialRecovery.voteToRecover(recoverProcessId, address(bobUniversalProfile));
        vm.stopPrank();

        // recover ownership to bob
        vm.startPrank(vm.addr(bobUPKey));
        bobKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("recoverOwnership(bytes32,string,bytes32)", recoverProcessId, secret, keccak256("new secret"))
            )
        );
        assertEq(LSP6Utils.getPermissionsFor(aliceUniversalProfile, address(bobUniversalProfile)), _ALL_DEFAULT_PERMISSIONS);
        vm.stopPrank();
    }
}
