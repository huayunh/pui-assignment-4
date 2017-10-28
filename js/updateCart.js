// this JS keep the shopping cart up-to-date.
// should be placed above detail.js

$(function() {
    updateCart();
    var loc = window.location.href.split('/');
    localStorage.lastVisit = loc[loc.length-1];
});

function updateCart(){
    if (typeof(Storage) !== 'undefined') {
        // assume there is something in this session. 
        // No checking on if the customer skipped to this page.

        var itemList = JSON.parse(
            localStorage.getItem('myPurchase')
        ).itemList;

        if (itemList){
            var itemSum = itemList.length;
            $('#item-sum').text(itemSum);

            
        } else {
            var itemSum = 0;
        }

        // change the dot to red if we have more than 1 item, else grey
        if (itemSum) {
            $('#item-sum').css('background-color', 'crimson');
        } else {
            $('#item-sum').css('background-color', '#888');
        }   

    } else {
        alert("Sorry! Your browser does not support local storage.");
    }
}
