var yearText = document.querySelector(".Year");
yearText.innerHTML = new Date().getFullYear();

var animationReady = true;
var laurel = document.getElementsByClassName("laureltilt")[0];
var heart = document.getElementsByClassName("hearttilt")[0];
var navbarIcon = document.getElementsByClassName("navbar-logo")[0];
var title = document.getElementsByClassName("d-lg-inline-block envisionname")[0];

var shootingStarPic = ["images/ShootingStar0.png", "images/ShootingStar1.png", "images/ShootingStar2.png"];
var cometPanel = document.getElementsByClassName("comet-panel")[0];
var cometImage = document.createElement("img");
cometPanel.appendChild(cometImage);
cometImage.style.position = "absolute";
cometImage.style.zIndex = 0;

var umbrellaForeground = document.getElementsByClassName("umbrella-foreground")[0];

title.addEventListener("mouseenter", forwardAnimation, {passive: true});
window.addEventListener("resize", matchDivSize);


startCometAnimation();



moveNavbarIcon(Date.now()/1000);

function forwardAnimation(){
    if(animationReady === true){
        animationReady = false;
        let startTime = Date.now()/1000;
        setTimeout(()=>{moveLaurel(startTime)},250);
        moveHeart(startTime);
    }

}

function moveLaurel(startTime){
    let originalTopValue = 20;
    let originalLeftValue = 20;
    let originalWidthValue = 100;
    let animationDuration = 1.5;
    let elapsedTime = Date.now()/1000 - startTime;

    if(elapsedTime <= animationDuration){
    laurel.style.left = numToPx(originalLeftValue-((animationDuration-elapsedTime) * 300));
    laurel.style.top = numToPx(originalTopValue-((animationDuration-elapsedTime)*120));
    laurel.style.transform = "rotate(" + (-(animationDuration-elapsedTime)*30).toString() + "deg)";
    laurel.style.width = numToPx(originalWidthValue+((animationDuration-elapsedTime)*100));
    laurel.style.opacity = (elapsedTime/animationDuration)**.5;
    setTimeout(()=>{moveLaurel(startTime)}, 16); //60fps is 16.67 milliseconds
    }else{
        laurel.style.left = numToPx(originalLeftValue);
        laurel.style.top = numToPx(originalTopValue);
        laurel.style.width = numToPx(originalWidthValue);
        laurel.style.transform = "rotate(0deg)";
        laurel.style.opacity = 1;
        setTimeout(()=>{fadeOut((Date.now()/1000)+11)}, 11000);
    }
}

function fadeOut(startTime){
    let animationDuration = 2;
    let elapsedTime = Date.now()/1000 - startTime;
    if(elapsedTime <= animationDuration){
        laurel.style.opacity = (animationDuration-elapsedTime);
        heart.style.opacity = (animationDuration-elapsedTime);
        setTimeout(()=>{fadeOut(startTime)}, 16);
    }else{
        laurel.style.opacity = 0;
        laurel.style.opacity = 0;
        animationReady = true;
    }
}

function moveHeart(startTime){
    let originalTopValue = 20;
    let originalLeftValue = 20;
    let animationDuration = 1.5;
    let elapsedTime = Date.now()/1000 - startTime;
    if(elapsedTime<animationDuration){
    heart.style.top = numToPx(originalTopValue-((animationDuration-elapsedTime) * 30));
    heart.style.left = numToPx(originalLeftValue+(((animationDuration-elapsedTime)**2)*400));
    heart.style.transform = "rotate(" + ((animationDuration-elapsedTime)*50).toString() + "deg)";
    heart.style.transform = "scaleX(" + ((elapsedTime/animationDuration)).toString() + ")";
    heart.style.opacity = (elapsedTime/animationDuration)**5;
    setTimeout(()=>{moveHeart(startTime)},16);
    }else{
    heart.style.top = numToPx(originalTopValue);
    heart.style.left = numToPx(originalLeftValue);
    heart.style.transform = "rotate(0deg)";
    heart.style.transform = "scaleX(1.0)";
    heart.style.opacity = "1"
    }
}

function moveNavbarIcon(startTime){
    let activeTime = 4;
    let pauseTime = 12;
    let time=Date.now()/1000;
    navbarIcon.style.left = numToPx(1+(Math.sin(time*1)*2));
    navbarIcon.style.top = numToPx(Math.sin(time*6)*2);
    navbarIcon.style.filter = "drop-shadow(0px " + numToPx(10-(Math.sin(time*6)*3)) + " 4px rgba(100,100,100, .5))";
    if(time-startTime < activeTime){
        setTimeout(()=>{moveNavbarIcon(startTime)},16);
    } else{
        navbarIcon.style.left = "1";
        navbarIcon.style.top = "0";
        navbarIcon.style.filter = "drop-shadow(0px 10px 4px rgba(100,100,100, .5))";
        setTimeout(()=>{moveNavbarIcon(time+(pauseTime))},pauseTime*1000);
    }

}

function startCometAnimation(){
    let startLeft = Math.floor(Math.random()*1401);
    let startTop = Math.floor(Math.random()*261)-10;
    let direction = (Math.random() > 0.5);
    cometImage.style.width = "100px";
    cometImage.style.height = "50px";
    cometImage.style.transform = direction ? "scaleX(1)" : "scaleX(-1)";
    animateComet(startLeft, startTop, direction, Date.now()/1000)
    swapCometImage(0);
}

function animateComet(startLeft, startTop, direction, startTime){
    let animationDuration = 1.5;
    let horizontalSpeed = 350;
    let verticalSpeed = 100;
    let elapsedTime = Date.now()/1000 - startTime;
    horizontalSpeed = direction ? horizontalSpeed : -horizontalSpeed;
    if(elapsedTime < animationDuration){
        cometImage.style.left = numToPx(startLeft-(elapsedTime)*horizontalSpeed);
        cometImage.style.top = numToPx(startTop+(.5+elapsedTime**2)*verticalSpeed);
        setTimeout(()=>{animateComet(startLeft, startTop, direction, startTime)},16);
    }else{
        //cometImage.width = "40px";
        //cometImage.height = "20px";
    }
}

function swapCometImage(index){
    if(index < 3){
        cometImage.src = shootingStarPic[index];
        setTimeout(()=>{swapCometImage(index+1)},400)
    }else{
        let delay = 5000+(Math.random()*5000);
        cometImage.style.width = "0";
        cometImage.style.height = "0";
        setTimeout(startCometAnimation, 2000+Math.random()*5000);
    }
}

//trying to figure out how to correctly adjust umbrellaForeground's top or bottom position after finding adjusting width.
//Then add a listener for each time the screen dimension changes.
//matchDivSize();
setTimeout(matchDivSize, 20);
function matchDivSize(){
    console.log(cometPanel.getBoundingClientRect().width);
    umbrellaForeground.style.width = numToPx(cometPanel.getBoundingClientRect().width*1.5);
    umbrellaForeground.style.top = numToPx((cometPanel.getBoundingClientRect().height-umbrellaForeground.getBoundingClientRect().height)/2);
}

function numToPx(m_Int){
    return m_Int.toString() + "px";
}

//Maybe think about a little gentle wiggle on the logo on the navbar.
//Shooting stars on the payment and insurance with an overlay lawer of the umbrella and woman so there's depth.
//Spinn award logos when moused over?