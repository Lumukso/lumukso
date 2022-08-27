// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";
import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {_ERC1271_MAGICVALUE} from "@lukso/lsp-smart-contracts/contracts/LSP0ERC725Account/LSP0Constants.sol";

contract LumuksoSocialRecovery is LSP11BasicSocialRecovery {
    using ECDSA for bytes32;
    using EnumerableSet for EnumerableSet.AddressSet;

    mapping(UniversalProfile => PendingGuardian) public pendingGuardians;
    EnumerableSet.AddressSet invitations;

    event PendingGuardianAdded(address indexed guardian, uint256 expiration);
    event PendingGuardianConfirmed(address indexed guardian);

    struct PendingGuardian {
        address guardian;
        uint256 expiration;
    }

    constructor(UniversalProfile profile) LSP11BasicSocialRecovery(address(profile)) {
    }

    function addPendingGuardian(UniversalProfile guardian) public virtual onlyOwner {
        invitations.add(address(guardian));
        pendingGuardians[guardian] = PendingGuardian({
            guardian: address(guardian),
            expiration: block.timestamp + 60 * 60 * 24 * 7 // 7 days
        });
        emit PendingGuardianAdded(address(guardian), pendingGuardians[guardian].expiration);
    }

    function getPendingGuardianExpiration(UniversalProfile guardian) external view returns(uint256) {
        return pendingGuardians[guardian].expiration;
    }

    function getInvitations() public virtual view returns(address[] memory) {
        return invitations.values();
    }

    function isInvited(UniversalProfile pendingGuardian) public virtual view returns(bool) {
        return invitations.contains(address(pendingGuardian));
    }

    function confirmPendingGuardian(UniversalProfile guardian, bytes memory signature) public virtual {
        require(invitations.contains(address(guardian)), "GUARDIAN_NOT_INVITED");
        require(pendingGuardians[guardian].guardian == address(guardian), "INVALID_PENDING_GUARDIAN");
        require(pendingGuardians[guardian].expiration > block.timestamp, "PENDING_GUARDIAN_EXPIRED");
        require(
            guardian.isValidSignature(
                keccak256(bytes(string.concat(
                        "operation=confirmPendingGuardian&expirationTimestamp=",
                        Strings.toString(pendingGuardians[guardian].expiration),
                        "&socialRecoveryAddress=",
                        string(abi.encodePacked(address(this)))
                    ))).toEthSignedMessageHash(),
                signature
            ) == _ERC1271_MAGICVALUE,
            "SIGNATURE_INVALID"
        );

        // commit pending guardian address
        invitations.remove(address(guardian));
        delete pendingGuardians[guardian];
        _guardians.add(address(guardian));
        emit PendingGuardianConfirmed(address(guardian));
    }
}