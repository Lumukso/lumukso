// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ILSP11BasicSocialRecovery} from "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/ILSP11BasicSocialRecovery.sol";
import "solmate/src/auth/Owned.sol";

contract TwitterGuardian is Owned(msg.sender) {
    /**
    mapping(address => uint256) nonces;

    struct RegisterRequest {
        uint256 nonce;
        uint8 v;
        bytes32 r;
        bytes32 s;
        address owner;
        uint256 deadline;
    }

    function register(RegisterRequest calldata request) external {
        require(request.deadline >= block.timestamp, "PERMIT_DEADLINE_EXPIRED");

        address recoveredAddress = ecrecover(
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    DOMAIN_SEPARATOR(),
                    keccak256(
                        abi.encode(
                            keccak256(
                                "RegisterRequest(uint256 nonce,uint8 v,bytes32 r,bytes32 s,address owner,uint256 deadline)"
                            ),
                            request.nonce,
                            request.v,
                            request.r,
                            request.s,
                            request.owner,
                            request.deadline
                        )
                    )
                )
            ),
            request.v,
            request.r,
            request.s
        );
        require(recoveredAddress != address(0) && recoveredAddress == msg.sender, "INVALID_SIGNER");

        allowance[recoveredAddress][spender] = value;
    }

    function validateRegistration(string calldata tweetId, address ) external onlyOwner {
        // if tweet content is valid via ecrecover
        // call voteToRecover
    }
    */
}