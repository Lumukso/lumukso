// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import "./Lumukso.sol";

contract LumuksoFactory {

    mapping(address => Lumukso) public instances;
    event LumuksoDeployed(address);

    constructor() {}

    function create(UniversalProfile _profile) public returns(address) {
        require(msg.sender == address(_profile), "Only the profile owner can create a Lumukso");
        Lumukso lumukso = new Lumukso(_profile);
        instances[address(_profile)] = lumukso;
        emit LumuksoDeployed(address(lumukso));
        return address(lumukso);
    }
}