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
import "../src/LumuksoUtils.sol";

contract LumuksoTest is Test {
    using ECDSA for bytes32;
    using ECDSA for bytes;

    LumuksoUtils utils;

    uint8 constant faultTolerance = 0;

    UniversalProfile aliceUniversalProfile;
    LumuksoSocialRecovery lumuksoSocialRecovery;

    // original owner
    LSP6KeyManager aliceKeyManager;
    uint256 constant aliceUPKey = 1;

    // recovered owner
    LSP6KeyManager bobKeyManager;
    UniversalProfile bobUniversalProfile;
    uint256 constant bobUPKey = 2;

    // universal profile guardian
    LSP6KeyManager guardianKeyManager;
    UniversalProfile guardianUniversalProfile;
    uint256 constant guardianUPKey = 3;

    // sso guardian
    uint256 constant guardianSSOKey = 4;

    function setUp() public {
        utils = new LumuksoUtils();
        (aliceUniversalProfile, aliceKeyManager) = createUniversalProfileViaUP(vm.addr(aliceUPKey));

        // setup social recovery permissions
        vm.startPrank(vm.addr(aliceUPKey));
        lumuksoSocialRecovery = new LumuksoSocialRecovery(aliceUniversalProfile, faultTolerance);
        {
            (bytes32[] memory keys, bytes[] memory values) = utils.getSocialRecoveryPermissionKeyValues(aliceUniversalProfile, lumuksoSocialRecovery);
            aliceKeyManager.execute(abi.encodeWithSignature("setData(bytes32[],bytes[])", keys, values));
            assertTrue(utils.checkSocialRecoveryPermissions(aliceUniversalProfile, lumuksoSocialRecovery));
        }
        assertEq(2 * faultTolerance + 1, lumuksoSocialRecovery.getGuardiansThreshold());
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

        // create guardian universal profile
        (guardianUniversalProfile, guardianKeyManager) = createUniversalProfileViaUP(vm.addr(guardianUPKey));

        // add pending guardian
        vm.startPrank(vm.addr(aliceUPKey));
        aliceKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("addPendingGuardian(address)", address(guardianUniversalProfile))
            )
        );
        vm.stopPrank();

        // confirm pending guardian
        {
            vm.startPrank(vm.addr(aliceUPKey));
            string memory message = string.concat(
                "operation=confirmPendingGuardian&expirationTimestamp=",
                Strings.toString(lumuksoSocialRecovery.getPendingGuardianExpiration(address(guardianUniversalProfile))),
                "&socialRecoveryAddress=",
                Strings.toHexString(uint256(uint160(address(lumuksoSocialRecovery))), 20)
            );
            emit log(message);
            bytes32 hash = bytes(message).toEthSignedMessageHash();
            (uint8 v, bytes32 r, bytes32 s) = vm.sign(guardianUPKey, hash);
            lumuksoSocialRecovery.confirmPendingGuardian(address(guardianUniversalProfile), bytes.concat(r, s, abi.encodePacked(v)));
            vm.stopPrank();
        }

        // create new UP profile
        (bobUniversalProfile, bobKeyManager) = createUniversalProfileViaUP(vm.addr(bobUPKey));

        // vote to recover bob
        vm.startPrank(vm.addr(guardianUPKey));
        bytes32 recoveryProcessId = keccak256("e85183df-ec42-477f-9a0e-526033776310");
        guardianKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("voteToRecover(bytes32,address)", recoveryProcessId, address(bobUniversalProfile))
            )
        );
        assertEq(lumuksoSocialRecovery.isValidRecoveryProcessId(recoveryProcessId), true);
        vm.stopPrank();

        assertEq(lumuksoSocialRecovery.countVotes(recoveryProcessId, address(bobUniversalProfile)), 1);

        // add sso pending guardian
        vm.startPrank(vm.addr(aliceUPKey));
        aliceKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("addPendingGuardian(address)", vm.addr(guardianSSOKey))
            )
        );
        vm.stopPrank();

        // confirm pending guardian
        vm.startPrank(vm.addr(aliceUPKey));
        bytes32 hash = bytes(string.concat(
                "operation=confirmPendingGuardian&expirationTimestamp=",
                Strings.toString(lumuksoSocialRecovery.getPendingGuardianExpiration(vm.addr(guardianSSOKey))),
                "&socialRecoveryAddress=",
                Strings.toHexString(uint256(uint160(address(lumuksoSocialRecovery))), 20)
                )).toEthSignedMessageHash();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(guardianSSOKey, hash);
        lumuksoSocialRecovery.confirmPendingGuardian(vm.addr(guardianSSOKey), bytes.concat(r, s, abi.encodePacked(v)));
        vm.stopPrank();

        // vote to recover bob
        vm.startPrank(vm.addr(bobUPKey));
        string memory voteToRecoverMessage = lumuksoSocialRecovery.getVoteToRecoverMessage(recoveryProcessId, address(bobUniversalProfile));
        bytes32 voteToRecoverMessageHash = bytes(voteToRecoverMessage).toEthSignedMessageHash();
        (v, r, s) = vm.sign(guardianSSOKey, voteToRecoverMessageHash);
        lumuksoSocialRecovery.voteToRecoverViaSignature(vm.addr(guardianSSOKey), recoveryProcessId, address(bobUniversalProfile), bytes.concat(r, s, abi.encodePacked(v)));
        vm.stopPrank();

        bytes32[] memory ids = lumuksoSocialRecovery.recoveryProcessIds();
        assertEq(ids.length, 1);
        assertEq(ids[0], recoveryProcessId);

        assertEq(lumuksoSocialRecovery.countVotes(recoveryProcessId, address(bobUniversalProfile)), 2);

        // recover ownership to bob
        vm.startPrank(vm.addr(bobUPKey));
        bobKeyManager.execute(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                OPERATION_CALL,
                address(lumuksoSocialRecovery),
                0,
                abi.encodeWithSignature("recoverOwnership(bytes32,string,bytes32)", recoveryProcessId, secret, keccak256("new secret"))
            )
        );
        assertEq(LSP6Utils.getPermissionsFor(aliceUniversalProfile, address(bobUniversalProfile)), _ALL_DEFAULT_PERMISSIONS);
        assertTrue(utils.checkProfileAccessRecovered(aliceUniversalProfile, address(bobUniversalProfile)));
        vm.stopPrank();

        ids = lumuksoSocialRecovery.recoveryProcessIds();
        assertEq(ids.length, 0);
    }
}
