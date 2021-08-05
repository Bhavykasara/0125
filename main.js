noseX=0;
noseY=0;
rsX=0;
rsY=0;
difference=0;
leftWristX=0;
rightWristX=0;
mainX=0;

function preload() {
    img=loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWONCW2eRNoYkf81opwW7Jp05qJiuY-Pd2WA&usqp=CAU');
}

function setup() {
    vedio=createCapture(VIDEO);
    vedio.size(550,500);
    vedio.position(150,150);
    vedio.hide();

    canvas=createCanvas(450,400);
    canvas.center();

    poseNet=ml5.poseNet(vedio,modalLoaded);
    poseNet.on('pose',gotPoses);
}

function modalLoaded() {
    console.log('modsl is loaded');
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        difference=floor(leftWristX-rightWristX);
    }
}

function draw() {
    image(vedio,0,0,450,400);
    document.getElementById("ans").innerHTML = "Width And Height of the square is  = " + difference;
    fill(255,255,255);
    stroke(0,0,0);
    square(noseX-(difference/2),noseY-(difference/2),difference);

    image(img,noseX-(difference/2),noseY-(difference/2),difference,difference);
}