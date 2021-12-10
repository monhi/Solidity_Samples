const assert                = require('assert');
const ganache               = require('ganache-cli');
const Web3                  = require('web3');
const provider              = ganache.provider();
const web3                  = new Web3(provider);
const {interface,bytecode}  = require('../compile');

const INITIAL_STRING = 'Hi There!';
 let accounts;
 let inbox; 

 beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
     //
    inbox = await new web3.eth.Contract(interface)
     .deploy({data:bytecode, arguments:[INITIAL_STRING]})
     .send({from:accounts[0], gas:'2000000'})
     inbox.setProvider(provider);     
 });

 describe('Inbox',()=>{
     it('Deploys a contract',()=>{
         //console.log(inbox);
         console.log('inbox address is:'+inbox.options.address);
         assert.ok(inbox.options.address);
         assert.ok(inbox.methods.message);
     });

     it('Has a default message',async ()=>{
         let message = await inbox.methods.message().call();
         console.log('Message is: '+ message);
         assert.equal(message,INITIAL_STRING);
     });

     it('Can change the message', async ()=> {
        let hash = await inbox.methods.setMessage('bye').send({from:accounts[0]});
        console.log(hash);
        let message = await inbox.methods.message().call();
        console.log('Message is: '+ message);
        assert.equal(message,'bye');
     });

 })
