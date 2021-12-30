# Solidity_Samples

To get familiar with Solodity language, I watched a lot of video tutorials and implement all sample codes.

But as those programs are a bit old and because of the upgrades that Solitidy faced, I have to update those programs to compile with new compilers and share them here for 2 purposes:

1. I keep them here to be available wherever I want to refer and update.
2. To be a small resource to be used by other Solidity programmers.

**Lottery.sol**

A great sample code written by **Stephen Grider** in his ***"Ethereum and Solidity The Complete Developer's Guide"*** series.
I think he is one the masters of Blockchain technologies and I love his teaching style.
In this Lottery.sol file, I do following changes.
* Using **constructor** instead of class name.
* Adding license.
* Adding comments for **require** statements.
* Using **payable** and **address(this).balance** structure forced by new version of compiler.
* Adding **memory** specifer for address[] argument in getPlayers() function.
* Using **abi.encodePacked** to concatenate parameters to produce pseudo random numbers.
* I think it is good idea to add a GetWinnerAddress function to return the last winner address ( not implemented yet).

