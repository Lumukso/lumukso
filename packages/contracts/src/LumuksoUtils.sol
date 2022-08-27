// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import "./LumuksoSocialRecovery.sol";

contract LumuksoUtils {

    function getSocialRecoveryPermissionKeyValues(UniversalProfile profile, LumuksoSocialRecovery socialRecovery) public view returns(bytes32[] memory, bytes[] memory) {
        return LSP6Utils
            .createPermissionsKeysForController(
                profile,
                address(socialRecovery),
                abi.encodePacked(hex"0000000000000000000000000000000000000000000000000000000000000026") // STATICCALL + CHANGEPERMISSIONS + ADDPERMISSIONS
            );
    }

    function checkSocialRecoveryPermissions(UniversalProfile profile, LumuksoSocialRecovery socialRecovery) public view returns(bool) {
        bytes32 permissions = LSP6Utils.getPermissionsFor(profile, address(socialRecovery));
        return LSP6Utils.hasPermission(permissions, 0x0000000000000000000000000000000000000000000000000000000000000026);
    }
}
