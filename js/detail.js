// this js handles the "add to cart" animation and controller change.
// should be placed below updateCart.js

// construct an object of a new item
function Item(type, shape, quantity, info) {
    this.type     = type;
    this.shape    = shape;
    this.quantity = quantity;
    this.info     = info;
}

$(function() {

    placeJumpingCircle();
    $('#more').hide();

    try {
        changeItemTitle();
    } catch(err) {
        // when people delete all items and try to hit "x",
        // they will be taken back to the index page
        window.location.href="index.html"
    }

    if (!JSON.parse(localStorage.myPurchase).currentShape){
        disableButtonsAfterSubmit();
    }

    $('#quote').click(function(){
        addNewItem(parseInt($('#quantity').val()),
                   $('#info').val());
        disableButtonsAfterSubmit();
        $('#jumpingCircle').text($('#quantity').val());
        $('#jumpingCircle').animate({
            opacity: 1,
            top: $('#cart').offset().top,
            left: $('#cart').offset().left,
            fontSize: '20%',
        }, {
            duration: 800,
            complete: function() {
                updateCart();
                $('#quote').disabled = false;
                $('#cart').toggleClass('shake');
                $('#jumpingCircle').animate({
                    opacity: 0
                }, {
                    duration: 300,
                    complete: function () {
                        placeJumpingCircle();
                        $('#cart').toggleClass('shake');
                        $('#more').show(300);
                    }
                });
            }
        });
    });

});

function placeJumpingCircle() {

    if ($('#jumpingCircle')) {
        $('#jumpingCircle').remove();
    }
    var $myItem = $('<span id="jumpingCircle">1</span>');
    $('body').append($myItem);

    var start = $( document ).width()/2;
    $myItem.css('left', start+"px")
}

function addNewItem(quantity, info){
    if (info == ""){
        info = "None.";
    }
    var purchase = JSON.parse(localStorage.myPurchase);

    if ($('#quote').hasClass("disabled-bordered-button")){
        var newItem = new Item(purchase.itemList[purchase.itemList.length-1].type, 
                               purchase.itemList[purchase.itemList.length-1].shape, 
                               quantity, 
                               info);
    } else{
        var newItem = new Item(purchase.currentType, 
                           purchase.currentShape, 
                           quantity, 
                           info);
    }
    purchase.currentType = undefined;
    purchase.currentShape = undefined;
    purchase.itemList.push(newItem);
    localStorage.setItem('myPurchase', JSON.stringify(purchase));
}

function disableButtonsAfterSubmit(){
    $('#quote').text('add to my shopping cart again');
    $('#quote').addClass('disabled-bordered-button');
    $('.button-holder a').addClass('functionally-disabled')
                         .addClass('disabled-bordered-button')
    $('#more').show(300);
}

function changeItemTitle(){
    var info = JSON.parse(localStorage.myPurchase);
    if (!info.currentShape){
        var lastItem = info.itemList[info.itemList.length-1];
        $('#item-title').text(lastItem.shape+'-shaped '+lastItem.type+' pillow')
    } else {
        $('#item-title').text(info.currentShape+'-shaped '+info.currentType+' pillow')
    }
}

