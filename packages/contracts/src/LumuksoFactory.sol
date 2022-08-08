// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";
import "./Lumukso.sol";

contract LumuksoFactory {

    event LumuksoDeployed(address);

    constructor() {}

    function create(UniversalProfile _profile) public returns(address) {
        address lumuksoAddress = address(new Lumukso(_profile));
        emit LumuksoDeployed(lumuksoAddress);
        return lumuksoAddress;
    }
}