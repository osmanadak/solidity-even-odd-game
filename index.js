$(document).ready(function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log("metamask");
    web3js = new Web3(web3.currentProvider);


    // Gets networks name
    web3js.version.getNetwork((err, netId) => {
      console.log("Netid " + netId);
      if(!!err){
        alert(err);
      }
      if(netId != 3){
        alert("Please connect to Ropsten Network");
      }
      switch (netId) {
        case "1":
          console.log('This is mainnet')
          break
        case "2":
          console.log('This is the deprecated Morden test network.')
          break
        case "3":
          console.log('This is the ropsten test network.')
          break
        default:
          console.log('This is an unknown network.')
      }
    });
  } else {
    // Handle the case where the user doesn't have web3. Probably 
    // show them a message telling them to install Metamask in 
    // order to use our app.
    // For example
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

    alert("Please install metamask");
    return false;
  }
  abi = JSON.parse('[{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwnerAddress","type":"address"}],"name":"setOwnerAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getContractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"playGame","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawTotalBalance","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"player","type":"address"},{"indexed":false,"name":"generatedNumber","type":"uint256"}],"name":"UserWon","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"player","type":"address"},{"indexed":false,"name":"generatedNumber","type":"uint256"}],"name":"UserLost","type":"event"}]')
  EvenOddGame = web3js.eth.contract(abi).at('0xd85bff306292b5013377a463edde92e8e4ada804');

  getOwnerAddress();
  getBalance();
});

function getBalance(){
  EvenOddGame.getContractBalance(function (error, result) {
      if (!error)
          $('#totalBalance').text(web3.fromWei(result))
      else
          console.error(error);
  });
}
function getOwnerAddress(){
  EvenOddGame.ownerAddress(function (error, result) {
      if (!error)
          $('#ownerAddress').text(result);
      else
          console.error(error);
  });
}

function playGame() {
  EvenOddGame.playGame({value: web3.toWei('0.01', 'ether')},function(error, result) {
    if (!error)
          console.log(result);
      else
          console.error(error);
  });
}

function changeContractOwner() {
  owner = $('#owner').val();
  EvenOddGame.setOwnerAddress(owner, function(error, result) {
    if (!error){
        console.log(result);
        getOwnerAddress();
        $('#owner').val('');
      }else{
        console.error(error);
      }
  });
}

function withdrawAll() {
  EvenOddGame.withdrawTotalBalance(function (error, result) {
      if (!error){
        console.log(result);
      }else{
        console.error(error);
      }
  });
}
