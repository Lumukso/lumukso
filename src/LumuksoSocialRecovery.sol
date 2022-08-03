// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {MAGIC_LINK_GUARDIAN_KEY} from "./constants.sol";
import {_ALL_DEFAULT_PERMISSIONS} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Constants.sol";

contract LumuksoSocialRecovery is LSP11BasicSocialRecovery {
    using ECDSA for bytes32;

    address public pendingMagicLinkGuardian;

    event PendingMagicLinkGuardianUpdated(address guardian);
    event MagicLinkGuardianUpdated(address guardian);

    constructor(address _account) LSP11BasicSocialRecovery(_account) {
    }

    function setPendingMagicLinkGuardian(address magicLinkAddress) public virtual onlyOwner {
        pendingMagicLinkGuardian = magicLinkAddress;
        emit PendingMagicLinkGuardianUpdated(pendingMagicLinkGuardian);
    }

    function confirmMagicLinkGuardian(uint256 expirationTimestamp, bytes32 r, bytes32 s, uint8 v) public virtual onlyOwner {
        require(block.timestamp < expirationTimestamp, "SIGNATURE_EXPIRED");
        require(
            keccak256(bytes(string.concat(
                    "operation=confirmMagicLinkGuardian&expirationTimestamp=",
                    Strings.toString(expirationTimestamp),
                    "&lumuksoAddress=",
                    string(abi.encodePacked(address(this)))
                ))).toEthSignedMessageHash().recover(v, r, s) == pendingMagicLinkGuardian,
            "SIGNATURE_INVALID"
        );

        // commit pending guardian address
        addGuardian(pendingMagicLinkGuardian);
        emit MagicLinkGuardianUpdated(pendingMagicLinkGuardian);
        pendingMagicLinkGuardian = address(0);
    }
}