//A game won when an even number arrives

pragma solidity ^0.4.18;

contract EvenOddGame {
    uint nonce = 0;
    
    address public ownerAddress;
    
    event UserWon(address player, uint generatedNumber);
    event UserLost(address player, uint generatedNumber);
    
    function () public payable {}
    
    function playGame () public payable {
        //Amount control
        require(msg.value == 0.01 ether);
        
        //Generate Random Number
        uint randomNumber = uint(keccak256(block.blockhash(block.number), nonce)) % 100;
        nonce++;
        
        //Win or Lose control
        if(randomNumber % 2 == 0) {
            //Even
            msg.sender.transfer(msg.value*2);
            UserWon(msg.sender, randomNumber);
        }else{
            //Odd
            UserLost(msg.sender, randomNumber);
        }
    }
    
    function withdrawTotalBalance () public payable {
        ownerAddress.transfer(address(this).balance);
    }
    
    function setOwnerAddress(address newOwnerAddress) public {
        ownerAddress = newOwnerAddress;
    }
    
    function getContractBalance () public view returns(uint256) {
        return this.balance;
    }
}
