const HDWalletProvider      = require('@truffle/hdwallet-provider');
const Web3                  = require('web3');
//var Contract              = require('web3-eth-contract');
const {interface, bytecode} = require('./compile');

const mnemonicPhrase = "conduct legal razor media six pony spice across valid melody detail differ"; // 12 word mnemonic
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "https://rinkeby.infura.io/v3/bf975c9a2f224bcfa502d3e0f0b86e7b"
});



//gas:web3.utils.toWei('1','ether'),

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deploy from account: ',accounts[0]);

    let result = await new web3.eth.Contract(interface)
    .deploy({data:'0x'+bytecode,arguments:['Hi there!']})
    .send({gasPrice:'3000000000000000',from: accounts[0]});
    console.log('Contract deployed to ',result.options.address);    
};


/*
const deploy = async ()=>{
    var contract = new Contract(interface);
    contract.setProvider(provider);
    contract.deploy({data:'0x'+bytecode,arguments:['Hi there!']})
    .send({gas:'1000000',from: accounts[0]})
    .on('receipt', ()=>{
        console.log("Done");
    });
};
*/

deploy();