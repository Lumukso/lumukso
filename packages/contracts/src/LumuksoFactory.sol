// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import "./LumuksoSocialRecovery.sol";

contract LumuksoFactory {

    mapping(address => LumuksoSocialRecovery) public instances;
    event LumuksoDeployed(address);

    constructor() {}

    function create(UniversalProfile _profile, uint8 faultTolerance) public returns(address) {
        require(msg.sender == address(_profile), "Only the profile owner can create a Lumukso");
        LumuksoSocialRecovery lumukso = new LumuksoSocialRecovery(_profile, faultTolerance);
        instances[address(_profile)] = lumukso;
        emit LumuksoDeployed(address(lumukso));
        return address(lumukso);
    }
}