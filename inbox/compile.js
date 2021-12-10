const   path = require('path');
const   fs   = require('fs');
const   solc = require('solc');


const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source    = fs.readFileSync(inboxPath,'utf-8');


var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content : source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
/*
for (var contractName in output.contracts['Inbox.sol']) {
    console.log(
      contractName +
        ': ' +
        //output.contracts['Inbox.sol'][contractName].evm.bytecode.object
        JSON.stringify(output.contracts['Inbox.sol'][contractName].evm.bytecode.object)

       // fs.writeFileSync('d:\\mahdi.txt',JSON.stringify(output.contracts['Inbox.sol'][contractName]))
    );
    console.log(' ');
    console.log(
        contractName +
          ': ' +
          //output.contracts['Inbox.sol'][contractName].evm.bytecode.object
          JSON.stringify(output.contracts['Inbox.sol'][contractName].abi)
  
         // fs.writeFileSync('d:\\mahdi.txt',JSON.stringify(output.contracts['Inbox.sol'][contractName]))
      );
  }
  console.log(output.contracts['Inbox.sol'][`Inbox`].abi);
  console.log(output.contracts['Inbox.sol'][`Inbox`].evm.bytecode.object);
*/

out = {interface:output.contracts['Inbox.sol'][`Inbox`].abi,bytecode:output.contracts['Inbox.sol'][`Inbox`].evm.bytecode.object}

console.log(out)

module.exports = out;


