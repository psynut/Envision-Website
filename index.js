var yearText = document.querySelector(".Year");
yearText.innerHTML = new Date().getFullYear();

console.log(4^2);

var forwardAnimationRunning = false;
var laurel = document.getElementsByClassName("laureltilt")[0];
var heart = document.getElementsByClassName("hearttilt")[0];

var title = document.getElementsByClassName("d-lg-inline-block envisionname")[0]
title.addEventListener("mouseenter", forwardAnimation, {passive: true});
//title.addEventListener("mouseleave", backwardAnimation, {passive: true});

function forwardAnimation(){
    if(forwardAnimationRunning === false){
        forwardAnimationRunning = true
        console.log("Running this");
        let startTime = Date.now()/1000;
        setTimeout(()=>{moveLaurel(startTime)},250);
        moveHeart(startTime);
    }

}

function moveLaurel(startTime){
    let elapsedTime = Date.now()/1000 - startTime;
    console.log(forwardAnimationRunning);
    if(elapsedTime <= 2){
    laurel.style.left = numToPx(20-((2-elapsedTime) * 300));
    laurel.style.top = numToPx(20-((2-elapsedTime)*120));
    laurel.style.transform = "rotate(" + (-(2-elapsedTime)*30).toString() + "deg)";
    laurel.style.width = numToPx(100+((2-elapsedTime)*100));
    setTimeout(()=>{moveLaurel(startTime)}, 16); //60fps is 16.67 milliseconds
    }else{
        laurel.style.left = numToPx(20);
        laurel.style.top = numToPx(20);
        laurel.style.width = numToPx(100);
        laurel.style.transform = "rotate(0deg)";
        console.log("Laurel Movement Done");
        forwardAnimationRunning=false;
    }
}

function moveHeart(startTime){
    let elapsedTime = Date.now()/1000 - startTime;
    if(elapsedTime<1.5){
    heart.style.top = numToPx(20-((1.5-elapsedTime) * 30));
    heart.style.left = numToPx(20+(((1.5-elapsedTime)**2)*400));
    heart.style.transform = "rotate(" + ((1.5-elapsedTime)*50).toString() + "deg)";
    heart.style.transform = "scaleX(" + ((elapsedTime/1.5)).toString() + ")";
    setTimeout(()=>{moveHeart(startTime)},16);
    }else{
    heart.style.left = numToPx(20);
    heart.style.top = numToPx(20);
    heart.style.transform = "rotate(0deg)";
    heart.style.transform = "scaleX(1.0)";
        console.log("Heart Movement Done");
    }
}

function backwardAnimation(){
    laurel.style.left = "20px";
    laurel.style.top = "20px";
}

function numToPx(m_Int){
    return m_Int.toString() + "px";
}

//Maybe think about a little gentle wiggle on the logo on the navbar.
//Shooting stars on the payment and insurance with an overlay lawer of the umbrella and woman so there's depth.
//Spinn award logos when moused over?