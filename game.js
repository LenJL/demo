//colors
var buttonColours =["red","blue","green","yellow"];
//stores random chosen colors
var gamePattern=[];
//stores users clicking pattern of colors(red ,yellow , red... etc)
var userClickedPattern=[];

var started = false;

var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextsequence();
        started = true;
    }
});

$(".btn").click(function(){
    //stores users clicking pattern of colors
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function() {
                nextsequence();
            }, 1000);
        }
    }else{
        gameOver();
    }
}

function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    setTimeout(function()  {
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    startOver();
}

function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}


function nextsequence(){
    userClickedPattern =[];
    level++;

    $("#level-title").text("Level " + level);
    // chooses random color.
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    //stores  the random chosen color.
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


}

function playSound(name){
    var audio = new Audio("sounds/"+ name+".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");

    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}



