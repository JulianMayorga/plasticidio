var volcanes_muertos = 0;
var tiempo_restante = 5;
var count = 0;
var counter;
var volcanes = [];

function crearVolcanes(numero) {

    tiempo_restante = 3;
    volcanes = new Array(numero);
    var volcan = new $.gQ.Animation({
        imageURL: "img/volcan02.png",
        numberOfFrame: 7,
        delta: 200,
        rate: 120,
        type: $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_PINGPONG
    });

    for (var i = 0; i < numero; i++) {
        $.playground().addSprite("volcan" + i, {
            posx: getRandomInt(90, 310),
            posy: getRandomInt(230, 370),
            height: 114,
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
                crearVolcanes(getRandomInt(1, 1 + count * 0.1));
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
    $("#tiempo_restante").text("Tierra explota en " + tiempo_restante + "!");
    tiempo_restante -= 1;
    if (tiempo_restante === 0) {
        // Destruir escena
        volcanes_muertos = null; // Hack: Hace que no se llame a crearVolcanes
        // Mostrar score
        // Volver a pantalla de inicio

    }
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {
    // sets the div to use to display the game and its dimension
    $("#playground").playground({ width: 480, height: 800 });

    // configure the loading bar
    $.loadCallback(function (percent) {
        $("#loadBar").width(400 * percent);
        $("#loadtext").html("" + percent + "%");
    });

    // register the start button and remove the splash screen once the game is ready to starts
    $("#start").click(function () {
        $.playground().startGame(function () {
            $("#splash").remove();
            counter = setInterval(timer, 1000); //1000 will  run it every 1 second
            setInterval(timervolcan, 1000);
            $.playground().append("<span id='timer' style='position: absolute; text-align: center; top: 0px; z-index:1000'>Tiempo: 0 seg</span>");

            //  Crear volcanes
            volcanes = crearVolcanes(3);
            $.playground().append("<span id='tiempo_restante' style='position: absolute; text-align: center; top: 40px; z-index:1000; color: rgb(124, 0, 0)'>Tierra explota en "
    + tiempo_restante + "!</span>");
            //meteoros = crearMeteoros(2);

        });
    });
});