var volcanes_muertos = 0;
var vida = 4;
var count = 0;
var counter;
var volcanes = [];
var tiempo_volcan = 0;

function crearVolcanes(numero) {

    tiempo_volcan = 0;
    volcanes = new Array(numero);
    var volcan = new $.gQ.Animation({
        imageURL: "img/volcanes.png",
        numberOfFrame: 22,
        delta: 200,
        rate: 120,
        type: $.gQ.ANIMATION_HORIZONTAL
    });

    for (var i = 0; i < numero; i++) {
        $.playground().addSprite("volcan" + i, {
            posx: getRandomInt(90, 310),
            posy: getRandomInt(230, 370),
            height: 172,
            width: 200,
            animation: volcan,
            geometry: $.gQ.GEOMETRY_RECTANGLE /* GEOMETRY_DISC GEOMETRY_RECTANGLE */
        });

        volcanes.push(volcan);

        $("#volcan" + i).rotate(-15);
        var hammertime = $("#volcan" + i).hammer();
        // the whole area
        hammertime.on("touch", function (ev) {
            // Remover meteorito
            $(this).remove();
            volcanes_muertos += 1;
            if (volcanes_muertos === numero) {
                crearVolcanes(getRandomInt(3, 6));
                volcanes_muertos = 0;
            }
        });
    }
    return volcanes;
}

function timer() {
    count = count + 1;

    $("#timer").text("Tiempo: " + count + " seg"); // watch for spelling
}

function timervolcan() {
    tiempo_volcan += 1;
    if (tiempo_volcan === 5) {
        vida -= 1;
        $("#volcan1").pauseAnimation();
        $("#volcan2").pauseAnimation();
        $("#volcan0").pauseAnimation();

        $("#vida").text("Vida: " + vida);
    }
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {
    var tierra = new $.gQ.Animation({ imageURL: "img/tierra.png" });
    // sets the div to use to display the game and its dimension
    $("#playground").playground({ width: 480, height: 800 });

    // configure the loading bar
    $.loadCallback(function (percent) {
        $("#loadBar").width(400 * percent);
        console.log(percent)
        $("#loadtext").html("" + percent + "%");
    });

    // register the start button and remove the splash screen once the game is ready to starts
    $("#start").click(function () {
        $.playground().startGame(function () {
            $("#splash").remove();
            counter = setInterval(timer, 1000); //1000 will  run it every 1 second
            setInterval(timervolcan, 1000);
            $.playground().append("<span id='timer' style='position: absolute; text-align: center; top: 0px; z-index:1000'>Tiempo: 0 seg</span>");
            $.playground().append("<span id='vida' style='position: absolute; text-align: center; top: 20px; z-index:1000'>Vida: " + vida + "</span>");

            $.playground().addSprite("tierra", {
                posx: 40,
                posy: 200,
                height: 400,
                width: 400,
                animation: tierra,
                geometry: $.gQ.GEOMETRY_DISC /*GEOMETRY_DISC GEOMETRY_RECTANGLE*/
            })

            //  Crear volcanes
            volcanes = crearVolcanes(3);
            //meteoros = crearMeteoros(2);

        });
    });
});