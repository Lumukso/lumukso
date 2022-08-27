// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/LumuksoFactory.sol";
import "../src/LumuksoUtils.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        LumuksoFactory lumuksoFactory = new LumuksoFactory();
        LumuksoUtils lumuksoUtils = new LumuksoUtils();

        vm.stopBroadcast();
    }
}
