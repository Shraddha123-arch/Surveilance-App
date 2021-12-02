video="";
status="";
objects=[];
function preload() {
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
}




function gotResults(error, results){
if(error){
    console.log(error);
    }
    console.log(results);
    objects=results;
}
function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML= "Status: Detecting Objects";
}

function modelLoaded(){
    console.log('Model has succesfully loaded :D')
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status !=""){
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++);{
            document.getElementById('status').innerHTML= "Status: Detecting Objects";
            document.getElementById('number_of_objects').innerHTML= "Number of Objects Detected:" +objects.length;
            fill('cyan');
            percent=floor(objects[i].confidence + 100);
            text(objects[i].label+ " " + percent+ "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('yellow');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}
