pragma solidity ^0.4.17;

contract Election {
    //model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //store accounts that have voted
    mapping(address => bool) public voters;

    //store candidates
    mapping(uint => Candidate) public candidates;
    
    event votedEvent(
        uint indexed _candidateId
    );
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

    function vote (uint _candidateId ) public {
        require(!voters[msg.sender]);
        require(_candidateId>0 && _candidateId<=candidatesCount);
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        votedEvent(_candidateId);
    }
}