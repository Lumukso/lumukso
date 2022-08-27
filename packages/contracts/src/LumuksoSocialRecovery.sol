// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";
import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {_ERC1271_MAGICVALUE, _INTERFACEID_LSP0} from "@lukso/lsp-smart-contracts/contracts/LSP0ERC725Account/LSP0Constants.sol";

contract LumuksoSocialRecovery is LSP11BasicSocialRecovery {
    using ECDSA for bytes32;
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;

    mapping(address => PendingGuardian) public pendingGuardians;
    EnumerableSet.AddressSet invitations;

    event PendingGuardianAdded(address indexed guardian, uint256 expiration);
    event PendingGuardianConfirmed(address indexed guardian);
    event VoteCast(bytes32 indexed recoveryProcessId, address indexed newOwner, address indexed voter);

    struct PendingGuardian {
        address guardian;
        uint256 expiration;
    }

    constructor(UniversalProfile profile, uint8 faultTolerance) LSP11BasicSocialRecovery(address(profile)) {
        // number of guardians = 3f + 1
        // guardians threshold = number of guardians - f = 2f + 1
        _guardiansThreshold = 2 * faultTolerance + 1;
    }

    function addPendingGuardian(address guardian) public virtual onlyOwner {
        invitations.add(guardian);
        pendingGuardians[guardian] = PendingGuardian({
            guardian : guardian,
            expiration : block.timestamp + 60 * 60 * 24 * 7 // 7 days
        });
        emit PendingGuardianAdded(guardian, pendingGuardians[guardian].expiration);
    }

    function getPendingGuardianExpiration(address guardian) external view returns (uint256) {
        return pendingGuardians[guardian].expiration;
    }

    function getInvitations() public virtual view returns (address[] memory) {
        return invitations.values();
    }

    function isInvited(address pendingGuardian) public virtual view returns (bool) {
        return invitations.contains(address(pendingGuardian));
    }

    function isValidRecoveryProcessId(bytes32 recoveryProcessId) public virtual view returns(bool) {
        return _recoverProcessesIds[_recoveryCounter].contains(recoveryProcessId);
    }

    function confirmPendingGuardian(UniversalProfile guardian, bytes memory signature) public virtual {
        require(guardian.supportsInterface(_INTERFACEID_LSP0), "INVALID_UNIVERSAL_PROFILE_ADDRESS");
        require(invitations.contains(address(guardian)), "GUARDIAN_NOT_INVITED");
        require(pendingGuardians[address(guardian)].guardian == address(guardian), "INVALID_PENDING_GUARDIAN");
        require(pendingGuardians[address(guardian)].expiration > block.timestamp, "PENDING_GUARDIAN_EXPIRED");
        require(
            guardian.isValidSignature(
                keccak256(bytes(getConfirmationMessage(address(guardian)))).toEthSignedMessageHash(),
                signature
            ) == _ERC1271_MAGICVALUE,
            "SIGNATURE_INVALID"
        );

        // commit pending guardian address
        invitations.remove(address(guardian));
        delete pendingGuardians[address(guardian)];
        _guardians.add(address(guardian));
        emit PendingGuardianConfirmed(address(guardian));
    }

    function confirmPendingGuardian(address guardian, bytes32 r, bytes32 s, uint8 v) public virtual {
        require(invitations.contains(address(guardian)), "GUARDIAN_NOT_INVITED");
        require(pendingGuardians[guardian].guardian == address(guardian), "INVALID_PENDING_GUARDIAN");
        require(pendingGuardians[guardian].expiration > block.timestamp, "PENDING_GUARDIAN_EXPIRED");
        require(
            keccak256(bytes(getConfirmationMessage(guardian))).toEthSignedMessageHash().recover(v, r, s) == guardian,
            "SIGNATURE_INVALID"
        );

        // commit pending guardian address
        invitations.remove(address(guardian));
        delete pendingGuardians[guardian];
        _guardians.add(address(guardian));
        emit PendingGuardianConfirmed(address(guardian));
    }

    function getConfirmationMessage(address guardian) public view returns(string memory) {
        return string.concat(
            "operation=confirmPendingGuardian&expirationTimestamp=",
            Strings.toString(pendingGuardians[guardian].expiration),
            "&socialRecoveryAddress=",
            Strings.toHexString(uint256(uint160(address(this))), 20)
        );
    }

    function voteToRecover(bytes32 recoverProcessId, address newOwner) public virtual override onlyGuardians {
        LSP11BasicSocialRecoveryCore.voteToRecover(recoverProcessId, newOwner);
        emit VoteCast(recoverProcessId, newOwner, msg.sender);
    }

    function isThresholdMet(bytes32 recoverProcessId) public virtual view returns(bool) {
        uint256 recoverCounter = _recoveryCounter;
        uint256 senderVotes;
        uint256 guardiansLength = _guardians.length();

        unchecked {
            for (uint256 i = 0; i < guardiansLength; i++) {
                if (
                    _guardiansVotes[recoverCounter][recoverProcessId][_guardians.at(i)] ==
                    msg.sender
                ) {
                    senderVotes++;
                }
            }
        }

        return senderVotes >= _guardiansThreshold;
    }
}