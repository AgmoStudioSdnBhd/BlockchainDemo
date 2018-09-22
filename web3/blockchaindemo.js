//Contract
var address = "0x72e0c967fb514c88522184bab5145163be74242d";
var abi = [{"constant":false,"inputs":[{"name":"_index","type":"uint256"}],"name":"addVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getVotedList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_phone","type":"string"}],"name":"addLecturer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getVoteCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getLecturer","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

//Account
var account = "0x8409cE7e1DB1165E96cEAe80876BB93a666DEb3F";
var privateKey = "689EA42ECF385892A75C6382A7EFD7AD3C38E2E485414F0D52FCA2C41B9D193F";

//Tools
var web3 = new Web3(new Web3.providers.HttpProvider("https://api.myetherwallet.com/rop"));

//Get Lecturer Function
function getLecturer(){
	var index = document.getElementById("getLecturerIndexInput").value;
	var response = web3.eth.contract(abi).at(address).getLecturer.call(index);
	document.getElementById("lecturerName").innerHTML = response;
}

//Get Vote Count Function
function getVoteCount(){
	var index = document.getElementById("getVoteIndexInput").value;
	var response = web3.eth.contract(abi).at(address).getVoteCount.call(index);
	document.getElementById("voteCount").innerHTML = "Total Vote = " + response;
}

//Add Lecturer Function
function addLecturer(){
	var name = document.getElementById("lecturerNameInput").value;
	var phone = document.getElementById("lecturerPhoneInput").value;
	var data = web3.eth.contract(abi).at(address).addLecturer.getData(name, phone);
	sendTx(data, function(err, transactionHash){
		document.getElementById("addLecturerTxHash").innerHTML = transactionHash;
	});
}

//Add Vote Function
function addVote(){
	var voteIndex = document.getElementById("addVoteIndexInput").value;
	var data = web3.eth.contract(abi).at(address).addVote.getData(voteIndex);
	sendTx(data, function(err, transactionHash){
		document.getElementById("addVoteTxHash").innerHTML = transactionHash;
	});
}

function getVotedAddress() {
	var data = web3.eth.contract(abi).at(address).getVotedList.call();
	document.getElementById("votedAddress").innerHTML = JSON.stringify(data);
}

//Send Data to Blockchain With Private Key
function sendTx(data, callback){
	web3.eth.getTransactionCount(account, function (err, nonce) {
		var tx = new ethereumjs.Tx({
		  nonce: nonce,
		  gasPrice: web3.toHex(web3.toWei('10', 'gwei')),
		  gasLimit: 3000000,
		  to: address,
		  value: 0,
		  data: data,
		});
		tx.sign(ethereumjs.Buffer.Buffer.from(privateKey, 'hex'));

		var raw = '0x' + tx.serialize().toString('hex');
		web3.eth.sendRawTransaction(raw, callback);
	});
}
