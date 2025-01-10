let level = 0;
let started = false;
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
letuserClickedPattern = [];

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level" + level)
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    const userChosenColour = $(this).attr("id");
    // const userChosenColour = this.id;
    console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
} 

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);


    const randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);

    const randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    console.log("#" + randomChosenColour);

    // let audioFileNumber = "./sounds/" + randomChosenColour + ".mp3";
    // console.log(audioFileNumber);
    // var audio = new Audio(audioFileNumber);
    // $(".btn").click(() => audio.play());

    playSound(userClickedPattern);
   

};


const playSound = soundName => {
    let audioFileNumber = "/Simon Game Challenge Starting Files/sounds//" + soundName + ".mp3";
    
    var audio = new Audio(audioFileNumber);
    audio.play().catch((error) => {
        console.log("Error playing audio:", error);
    });
}

const animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}