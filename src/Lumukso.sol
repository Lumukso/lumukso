// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@erc725/smart-contracts/contracts/interfaces/IERC725X.sol";
import "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";
import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6KeyManager.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {LSP6Utils} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol";
import {MAGIC_LINK_GUARDIAN_KEY} from "./constants.sol";

contract Lumukso is LSP6KeyManager, LSP11BasicSocialRecovery(msg.sender), IERC725X, IERC725Y {
    using ECDSA for bytes32;

    UniversalProfile public profile;
    address public pendingMagicLinkGuardian;

    event PendingMagicLinkGuardianUpdated(address guardian);
    event MagicLinkGuardianUpdated(address guardian);

    constructor(UniversalProfile _profile) LSP6KeyManager(address(_profile)) {
        profile = _profile;
    }

    function claimOwnership() public virtual onlyOwner {
        profile.claimOwnership();
    }

    function setPendingMagicLinkGuardian(address magicLinkAddress) public virtual onlyOwner {
        pendingMagicLinkGuardian = magicLinkAddress;
        emit PendingMagicLinkGuardianUpdated(pendingMagicLinkGuardian);
    }

    function confirmMagicLinkGuardian(uint256 expirationTimestamp, bytes memory pendingMagicLinkGuardianSignature) public virtual onlyOwner {
        require(block.timestamp < expirationTimestamp, "SIGNATURE_EXPIRED");
        require(
            keccak256(bytes(string.concat(
                "{\"operation\":\"confirmMagicLinkGuardian\",\"expirationTimestamp\":",
                Strings.toString(expirationTimestamp),
                "}"
            ))).toEthSignedMessageHash().recover(pendingMagicLinkGuardianSignature) == pendingMagicLinkGuardian,
            "SIGNATURE_INVALID"
        );

        // set profile key MAGIC_LINK_GUARDIAN_KEY as magic link guardian
        bytes32[] memory keys = new bytes32[](1);
        keys[0] = bytes32(keccak256(abi.encodePacked(MAGIC_LINK_GUARDIAN_KEY)));
        bytes[] memory values = new bytes[](1);
        values[0] = abi.encodePacked(pendingMagicLinkGuardian);
        LSP6Utils.setDataViaKeyManager(
            address(this),
            keys,
            values
        );

        // commit pending guardian address
        addGuardian(pendingMagicLinkGuardian);
        emit MagicLinkGuardianUpdated(pendingMagicLinkGuardian);
        pendingMagicLinkGuardian = address(0);
    }

    function execute(
        uint256 operationType,
        address to,
        uint256 value,
        bytes calldata data
    ) external override payable onlyOwner returns (bytes memory) {
        return profile.execute(operationType, to, value, data);
    }

    function getData(bytes32 dataKey) external override view returns (bytes memory dataValue) {
        return profile.getData(dataKey);
    }

    function getData(bytes32[] memory dataKeys) external view returns (bytes[] memory dataValues) {
        return profile.getData(dataKeys);
    }

    function setData(bytes32 dataKey, bytes memory dataValue) external override onlyOwner {
        profile.setData(dataKey, dataValue);
    }

    function setData(bytes32[] memory dataKeys, bytes[] memory dataValues) external override onlyOwner {
        profile.setData(dataKeys, dataValues);
    }

    function supportsInterface(bytes4 _interfaceId) public view virtual override(LSP6KeyManagerCore, LSP11BasicSocialRecoveryCore, IERC165) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }
}