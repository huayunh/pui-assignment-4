// the text to rotate upon scrolling
var textList = [
    "Tired of dull pillows? We specialize in custom decorative throw pillows.",
    "All pillows are handmade in our artisan workshop out of Pittsburgh PA.",
    "You may customize your dream pillow!"
]

var onAnimation = 0;
var currentFrame = 0;

// check if webstorage is supported
if (typeof(Storage) !== "undefined") {
    if(!localStorage.myPurchase) {
        // create a new purchase JSON, if haven't done so
        var newPurchase = {
            itemList: [],
            currentType: undefined,
            currentShape: undefined
        };
        localStorage.setItem('myPurchase', JSON.stringify(newPurchase));
    }
} else {
    alert("Sorry! Your browser does not support local storage.")
}

$( document ).ready(function () {
    var totalFrames = document.getElementsByClassName("pics").length;
    var dots = document.getElementsByClassName('dot');
    dots[currentFrame].classList.add("onThisPage");
    window.addEventListener("wheel", onWheel);

    // when the user scrolls, either up or down.
    function onWheel(e){
        if (onAnimation || (e.deltaY>=-10 && e.deltaY <= 10)){
            return;
        }

        // change the big picture on the left
        var currentPic = document.getElementById('pic'+currentFrame);
        var nextPic;
        var nextFrame;
        if (e.deltaY > 0) { // if scrolling down
            nextFrame = (currentFrame + 1) % totalFrames;
        } else { // if scrolling up
            nextFrame = (currentFrame + totalFrames - 1) % totalFrames;
        }
        nextPic = document.getElementById('pic'+ nextFrame);
        onAnimation = 1;

        currentPic.classList.toggle("hidden");
        nextPic.classList.toggle("hidden");

        // change the texts on the right
        var currentLength = textList[currentFrame].length; 
        var nextLength = textList[nextFrame].length;
        var bragText = document.getElementById("brag");
        bragText.classList.toggle("changing");
        var animationFrame = 0;
        var totalAnimationFrames = 15;
        var animateTimer = setInterval(function(){
            animationFrame +=1;
            bragText.innerHTML = randomText(
                Math.floor((animationFrame/totalAnimationFrames)*(nextLength-currentLength))
                +currentLength);
            if (animationFrame == totalAnimationFrames){
                bragText.innerHTML = textList[nextFrame];
                clearInterval(animateTimer);
                onAnimation = 0;
                bragText.classList.toggle("changing");
                animationFrame = 0;
            }
        }, 50);
        currentFrame = nextFrame;

        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.remove("onThisPage");
        }
        dots[currentFrame].classList.add("onThisPage");
    }

    // return a string of length n
    function randomText(n){
        var str = "abcdefghijklmnopqrstuvwxyz.,abcdefghijklmnopqrstuvwxyz.,abcdefghijklmnopqrstuvwxyz.,abcdefghijklmnopqrstuvwxyz.,"
        return getRandomSubarray(str.split(""), n).join("");
    }

    // https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
    function getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }

    // draw the three dots at the bottom of the page
    function redrawScroll(){
        var frame = 0;
        var currentActiveDot = 0;
        setInterval(function(){
            for (var i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            if (frame < 3){
                if (currentActiveDot < dots.length){
                    dots[currentActiveDot].classList.add("active");
                } 
                currentActiveDot += 1;
            }
            frame += 1;
            if (frame > 8){
                frame = 0;
                currentActiveDot = 0;
            }
        }, 200)
    }
    redrawScroll();
});
    
