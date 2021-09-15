song = "";
song2 = "";
leftWristY = ""
leftWristX = ""
rightWristY = ""
rightWristX = ""
leftWristScore = ""
rightWristScore = ""
song_status = ""

function preload(){
    song = loadSound("can.mp3");
    song2 = loadSound("entertainer.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
} 

function draw(){
    image(video, 0,0, 600,500)
    if(rightWristScore > 0.5){
        fill("purple")
        stroke("purple")
        circle(rightWristX, rightWristY, 20)

        if(song_status == ""){
        song2.play()
        song_status ="song2"
        }
        if(song_status == "song"){
        song.stop()
        song2.play()
        song_status = "song2"
        }
    }
   
    
    if(leftWristScore > 0.5){
        fill("pink")
        stroke("pink")
        circle(leftWristX, leftWristY, 20)
        
        if(song_status == ""){
            song.play()
            song_status ="song"
            }
            if(song_status == "song2"){
            song2.stop()
            song.play()
            song_status = "song"
            }
    }
    
}

function play(){
    song.play()
}

function modelLoaded(){
    console.log("Kitty Loaded!")
}

function gotPoses(results){
if(results.length > 0){
console.log(results)
leftWristScore = results[0].pose.keypoints[9].score
console.log(leftWristScore);
leftWristX = results[0].pose.leftWrist.x
console.log(leftWristX)
leftWristY = results[0].pose.leftWrist.y
console.log(leftWristY)


rightWristScore = results[0].pose.keypoints[10].score
console.log(rightWristScore)
rightWristX = results[0].pose.rightWrist.x
console.log(rightWristX)
rightWristY = results[0].pose.rightWrist.y
console.log(rightWristY)
}
}