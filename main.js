status = "";
objects = [];

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            if (objects[0].label == "person"){
                alarm.stop();
                document.getElementById("status").innerHTML = "Status : Object Detected";
                document.getElementById("text").innerHTML = "Baby Found";

                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 20,objects[i].y + 20);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else {
                alarm.play();
                document.getElementById("status").innerHTML = "Status : Object Not Detected";
                document.getElementById("text").innerHTML = "Baby Not Found";
            }
        }
        if(objects.length < 0){
            alarm.play();
            document.getElementById("status").innerHTML = "Status : Object Not Detected";
            document.getElementById("text").innerHTML = "Baby Not Found";
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}