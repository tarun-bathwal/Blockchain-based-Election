var Election = artifacts.require('./Election.sol');

contract ( "Election", function(accounts){
    var electionInstance;

    it("initializes with two candidates",function(){
        return Election.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then(function(count){
            assert.equal(count,2);
        });
    });

    it("initializes the candidates with correct values",function(){
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate[0],1,"contains correct id");
            assert.equal(candidate[1],'Candidate1',"contains correct name");
            assert.equal(candidate[2],0,"contains correct no of voters");
            return electionInstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate[0],2,"contains correct id");
            assert.equal(candidate[1],'Candidate2',"contains correct name");
            assert.equal(candidate[2],0,"contains correct no of voters");
        });
    });

    it("allows a voter to cast a vote",function(){
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            candidateId=1;
            return electionInstance.vote(candidateId,{ from : accounts[0] });
        }).then(function(receipt){
            return electionInstance.voters(accounts[0]);
        }).then(function(voted){
            assert(voted,"the voter is marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount=candidate[2];
            assert.equal(voteCount,1,"increments the votecount of candidate");
        });
    });

    it("throws an exception for invalid candidate",function(){
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            return electionInstance.vote(99,{from:accounts[1]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0 , "error message must contain revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount=candidate1[2];
            assert.equal(voteCount,1,"candidate1 did not receive any vote");
            return electionInstance.candidates(2);
        }).then(function(candidate2){
            var voteCount=candidate2[2];
            assert.equal(voteCount,0,"candidate2 did not receive any vote");
        });
    });

    it("throws an exception for double voting",function(){
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            candidateId=2;
            electionInstance.vote(candidateId,{from:accounts[1]});
            return electionInstance.candidates(2);
        }).then(function(candidate){
            var voteCount=candidate[2];
            assert.equal(voteCount,1,"accepts first vote");
            return electionInstance.vote(candidateId,{from:accounts[1]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"error msg contains revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount=candidate1[2];
            assert.equal(voteCount,1,"candidate1 did not receive any vote");
            return electionInstance.candidates(2);
        }).then(function(candidate2){
            var voteCount=candidate2[2];
            assert.equal(voteCount,1,"candidate2 did not receive any vote");
        });
    });
    
});