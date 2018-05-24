pragma solidity ^0.4.17;

contract Election {
    
    string public candidate;
    uint public x;
    function Election () public {
        candidate = "candidate 1";
        x = 10;
    }
}