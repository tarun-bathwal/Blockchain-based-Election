pragma solidity ^0.4.17;

contract Election {
    //model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //store candidates
    mapping(uint => Candidate) public candidates;

    //store candidates count
    uint public candidatesCount;

    function Election () public {
        addCandidate("Candidate1");
        addCandidate("Candidate2");
    }

    function addCandidate (string _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}