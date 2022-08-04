// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6KeyManager.sol";
import "./LumuksoSocialRecovery.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";

contract Lumukso is LSP6KeyManager {

    UniversalProfile public profile;
    LumuksoSocialRecovery public socialRecovery;

    constructor(UniversalProfile _profile) LSP6KeyManager(address(_profile)) {
        profile = _profile;
        socialRecovery = new LumuksoSocialRecovery(address(profile));
    }

    function claimProfileOwnership() public virtual {
        profile.claimOwnership();
    }
}