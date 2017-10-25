// render cart.html

const tableHeader = "<th><td>type</td><td>shape</td><td>quantity</td><td>comment</td><td></td></th>"

var myPurchase = JSON.parse(localStorage.myPurchase);
var itemList = myPurchase.itemList;

$(function (){
	renderTable();
	console.log(localStorage.lastVisit)
});

function deleteItem(n){
	itemList.splice(n, 1);
	myPurchase.itemList = itemList;
	localStorage.setItem('myPurchase', JSON.stringify(myPurchase));
	renderTable();
}

function renderTable() {
	var table = $('#items');
	table.empty();
	table.append(tableHeader);
	for (var i = 0; i < itemList.length; i++) {
		var item = itemList[i];
		table.append('<tr><td>' + (i+1) + '</td><td>'
			+ item.type + '</td><td>'
			+ item.shape + '</td><td>'
			+ item.quantity + '</td><td>'
			+ item.info + '</td><td>'
			+ '<a href="#" onclick="deleteItem(' + (i) + ');">delete</a></td></tr>'
			);
	}
}

function getQuote(){
	clearItem();
}

function clearItem(){
	localStorage.setItem('myPurchase', '{"itemList":[]}');
}
