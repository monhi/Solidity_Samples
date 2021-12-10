const assert                = require('assert');
const ganache               = require('ganache-cli');
const Web3                  = require('web3');
const provider              = ganache.provider();
const web3                  = new Web3(provider);
const {interface,bytecode}  = require('../compile');


let     accounts;
let     lottery;


 beforeEach(async ()=>{
    accounts    = await web3.eth.getAccounts();
    lottery     = await new web3.eth.Contract(interface)
     .deploy({data:bytecode})
     .send({from:accounts[0], gas:'2000000'})
     lottery.setProvider(provider);     
 });

 describe('Lottery ontract',()=>{
     it('Deploys a contract',()=>{
         //console.log('Lottery address is:'+lottery.options.address);
         assert.ok(lottery.options.address);         
     });

     it('Allows one contract to enter',async ()=>{
         await lottery.methods.enter().send(
             {
                 from:accounts[0],
                 value:web3.utils.toWei('0.02','ether')
             }
         );
         const players = await lottery.methods.getPlayers().call({
             from:accounts[0]
         });
        assert.equal(accounts[0],players[0]);
        assert.equal(1, players.length);
     });

     it('Allows multiple contract to enter',async ()=>{
        await lottery.methods.enter().send(
            {
                from:accounts[0],
                value:web3.utils.toWei('0.02','ether')
            }
        );

        await lottery.methods.enter().send(
            {
                from:accounts[1],
                value:web3.utils.toWei('0.02','ether')
            }
        );

        await lottery.methods.enter().send(
            {
                from:accounts[2],
                value:web3.utils.toWei('0.02','ether')
            }
        );        



        const players = await lottery.methods.getPlayers().call({
            from:accounts[0]
        });
       assert.equal(accounts[0],players[0]);
       assert.equal(accounts[1],players[1]);
       assert.equal(accounts[2],players[2]);
       assert.equal(3, players.length);
    })     

    it('Requires a minimum amount of ether to enter',async ()=>{
        try
        {
            await lottery.methods.enter().send(
                {
                    from:accounts[0],
                    value:0
                }
            );
            assert(false);
        }
        catch(err)
        {
            //console.log(err);
            assert(err);
        }
    });

    it('Only manager can call pickWinner function', async ()=>{
        try
        {
            await lottery.methods.pickWinner().send({
                from:accounts[1]
                });
                assert(false);
        }
        catch(err)
        {
            //console.log(err);
            assert(err);
        }        
    });

    it('Sends money to the winner and resets the player array',async ()=>{
        await lottery.methods.enter().send(
            {
                from:accounts[0],
                value:web3.utils.toWei('2','ether')
            }
        );
        const initialBalance = await web3.eth.getBalance(accounts[0]);        
        await lottery.methods.pickWinner().send({from:accounts[0]});
        const finalBalance  = await web3.eth.getBalance(accounts[0]);
        const difference    = finalBalance - initialBalance;
        //console.log(difference);
        assert(difference> web3.utils.toWei('1.8','ether'));

    });

 })
