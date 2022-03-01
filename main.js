song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;

function setup() {
    canvas = createCanvas(700, 500);
    canvas.position(600, 400);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore= results[0].pose.keypoints[10].score;
        console.log("leftWristScore :" + leftWristScore);
        console.log("RightWirstScore : " + rightWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X :" + leftWristX + " leftWrist Y :" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X :" + rightWristX + " rightWrist Y :" + rightWristY);

    }
}

function draw() {
    image(video, 0, 0, 700, 500);
    fill("red");
    stroke("red");
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);

        leftWristNumber = Number(leftWristY);
        leftWristfloor = floor(leftWristNumber);
        volume = leftWristfloor / 500;
        document.getElementById("volume").innerHTML = "Volume : " + volume.toFixed(2);
        song.setVolume(volume);
    }
    if (rightWristScore > 0.2 ) {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML = "Speed : 0.5x";
             song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML = "Speed : 1x";
             song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML = "Speed : 1.5x";
             song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML = "Speed : 2x";
             song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML = "Speed : 2.5x";
             song.rate(2.5);
        }



    } 
}



function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(2);
}