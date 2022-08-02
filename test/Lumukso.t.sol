// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../src/Lumukso.sol";
import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {_ALL_DEFAULT_PERMISSIONS} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Constants.sol";

contract LumuksoTest is Test {
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
        myLumukso.setPendingMagicLinkGuardian(0x47A8A64B2c1A1636D269a0F774DC7532f45c70E3);
        vm.startPrank(0x47A8A64B2c1A1636D269a0F774DC7532f45c70E3);
        // FIXME: myLumukso.confirmMagicLinkGuardian();
    }
}
