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
});