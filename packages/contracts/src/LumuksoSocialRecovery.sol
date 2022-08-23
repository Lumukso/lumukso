// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";

contract LumuksoSocialRecovery is LSP11BasicSocialRecovery {
    using ECDSA for bytes32;

    struct PendingGuardian {
        address guardian;
        uint256 expiration;
    }

    mapping(address => PendingGuardian) public pendingGuardians;

    event PendingGuardianAdded(address indexed guardian, uint256 expiration);
    event PendingGuardianConfirmed(address indexed guardian);

    constructor(address _account) LSP11BasicSocialRecovery(_account) {
    }

    function addPendingGuardian(address guardian) public virtual onlyOwner {
        pendingGuardians[guardian] = PendingGuardian({
            guardian: guardian,
            expiration: block.timestamp + 60 * 60 * 24 * 7 // 7 days
        });
        emit PendingGuardianAdded(guardian, pendingGuardians[guardian].expiration);
    }

    function getPendingGuardianExpiration(address guardian) external view returns(uint256) {
        return pendingGuardians[guardian].expiration;
    }

    function confirmPendingGuardian(address guardian, bytes32 r, bytes32 s, uint8 v) public virtual onlyOwner {
        require(pendingGuardians[guardian].guardian == guardian, "INVALID_PENDING_GUARDIAN");
        require(pendingGuardians[guardian].expiration > block.timestamp, "PENDING_GUARDIAN_EXPIRED");
        require(
            keccak256(bytes(string.concat(
                    "operation=confirmPendingGuardian&expirationTimestamp=",
                    Strings.toString(pendingGuardians[guardian].expiration),
                    "&socialRecoveryAddress=",
                    string(abi.encodePacked(address(this)))
                ))).toEthSignedMessageHash().recover(v, r, s) == guardian,
            "SIGNATURE_INVALID"
        );

        // commit pending guardian address
        delete pendingGuardians[guardian];
        addGuardian(guardian);
        emit PendingGuardianConfirmed(guardian);
    }
}