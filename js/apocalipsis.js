var volcanes_muertos = 0;
var tiempo_restante = 3;
var count = 0;
var counter;
var start;
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
    tiempo_restante -= 1;
    $("#tiempo_restante").text("Tierra explota en " + tiempo_restante + "!");
    if (tiempo_restante === 0) {
        // Destruir escena
        // Mostrar score
        $("#reiniciar").css("display", "inline").click(restartGame);
        $("#tiempo_restante").detach();
        $("#timer").detach();
        $("#score").css("display", "inline");
        $("#score").text("Aguantaste los ataques por " + count + " seg");// Volver a pantalla de inicio
    }
}

function restartGame() {
    window.location.reload();
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {
    // sets the div to use to display the game and its dimension
    $("#playground").playground({ width: 480, height: 800 });

    // register the start button and remove the splash screen once the game is ready to starts
    $("#start").click(function () {
        $.playground().startGame(function () {
            start = $("#start").detach();
            $("#titulo").detach();
            counter = setInterval(timer, 1000); //1000 will  run it every 1 second
            setInterval(timervolcan, 1000);
            $("#gui").append("<span id='timer' style='position: absolute; left: 150px; top: 0px; z-index:1000'>Tiempo: 0 seg</span>");

            //  Crear volcanes
            volcanes = crearVolcanes(3);
            $("#gui").append("<span id='tiempo_restante' style='position: absolute; left: 150px;; top: 40px; z-index:1000; color: rgb(124, 0, 0)'>Tierra explota en "
    + tiempo_restante + "!</span>");
            //meteoros = crearMeteoros(2);

        });
    });
});