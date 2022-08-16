// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "solmate/src/auth/Owned.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract TweetOracle is Owned(msg.sender) {
    using EnumerableMap for EnumerableMap.Bytes32ToBytes32Map;

    mapping(address => EnumerableMap.Bytes32ToBytes32Map) challenges;
    EnumerableMap.Bytes32ToBytes32Map responses;

    event NewChallenge(address challenger, bytes32 challengeId, bytes32 challenge);
    event ChallengeResolved(address resolver, uint256 tweetId, bytes32 challengeId, bytes32 response);

    function newChallenge() external {
        bytes32 challengeId = prng(0);
        bytes32 challenge = prng(1);
        challenges[msg.sender].set(challengeId, challenge);
        emit NewChallenge(msg.sender, challengeId, challenge);
    }

    function acceptChallengeResponse(address resolver, uint256 tweetId, bytes32 challengeId, bytes32 response) external onlyOwner {
        bytes32 challenge = challenges[resolver].get(challengeId);
        // TODO: ecrecover verify
        responses.set(challengeId, response);
        challenges[msg.sender].remove(challengeId);
        emit ChallengeResolved(resolver, tweetId, challengeId, response);
    }

    function prng(uint256 seed) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(block.coinbase, block.difficulty, block.timestamp, msg.sender, msg.data, seed));
    }
}