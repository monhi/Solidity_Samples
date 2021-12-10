// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Inbox {

    string public message;

    constructor(string memory ini)
    {
        message = ini;
    }

    function setMessage(string memory newMessage) public
    {
        message = newMessage;
    }

}
