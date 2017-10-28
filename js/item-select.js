/* 
 * 1. on click, highlight the property selected
 * 2. update the localStorage
 */

var types = {
    'couch': 1,
    'bed': 2,
    'round': 3,
    'floor pouf': 4
}

var shapes = {
    'square': 1,
    'round': 2,
    'dog': 3,
    'bear': 4,
    'bunny': 5,
    'cat': 6,
    'customize': 7
}

function onClick(n){
    removeSelection();
    addSelection(n);
};

function updateType(pillowType) {
    var info = JSON.parse(localStorage.myPurchase);
    info.currentType = pillowType;
    localStorage.setItem('myPurchase', JSON.stringify(info));
}

function updateShape(pillowShape) {
    var info = JSON.parse(localStorage.myPurchase);
    info.currentShape = pillowShape;
    localStorage.setItem('myPurchase', JSON.stringify(info));
}

function removeSelection(){
    var buttons = document.getElementsByClassName("item");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    } 
}

function addSelection(n){
    if (n){
        document.getElementById('button'+n).classList.add("selected");
        ($('.button-holder a.bordered-button.disabled-bordered-button.functionally-disabled')
        .removeClass('disabled-bordered-button')
        .removeClass('functionally-disabled'));
    }
}

function onLoadType(){
    var info = JSON.parse(localStorage.myPurchase);
    addSelection(types[info.currentType]);
}

function onLoadShape(){
    var info = JSON.parse(localStorage.myPurchase);
    addSelection(shapes[info.currentShape]);
}
