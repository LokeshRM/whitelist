//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract WhiteList {
    uint8 maxWhiteListAddressAllowed;
    uint8 public whiteListed;

    mapping(address => bool) public whiteListAddresses;

    constructor(uint8 _maxAllowed) {
        maxWhiteListAddressAllowed = _maxAllowed;
    }

    function addToWhiteList() public {
        require(!whiteListAddresses[msg.sender], "already whitelisted");
        require(
            whiteListed <= maxWhiteListAddressAllowed,
            "maximum whitelist acheived"
        );
        whiteListAddresses[msg.sender] = true;
        whiteListed++;
    }
}
