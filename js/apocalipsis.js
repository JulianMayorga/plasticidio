var volcanes_muertos = 0;
var tiempo_restante = 3;
var count = 0;
var counter;
var start;
var nombre = "Nombre Misterioso";
var jugadores = [];
var volcanes = [];
var listRef, newPushRef;

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
            posx: getRandomInt($("#tierra").position().left, $("#tierra").position().left + 200),
            posy: getRandomInt($("#tierra").position().top, $("#tierra").position().top + 200),
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

    $('#conteo-final').text(tiempo_restante + "!");

    if (tiempo_restante === 0) {
        // Destruir escena
        // Mostrar score
        window.clearTimeout(counter);
        submitScore();
        $("#reiniciar").css("display", "inline").click(restartGame);
        $("#countdown").detach();
        $("#timer").detach();
        $("#score").css("display", "inline");
        $("#segundos").text(count); // Volver a pantalla de inicio
    }
}

function restartGame() {
    // Set some data to the generated location
    //console.log(nombre);
    //console.log(count);
    window.location.reload();
}

function submitScore() {
    newPushRef.set({ user_id: nombre, text: count });
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {
    listRef = new Firebase('https://plasticidio.firebaseio.com/');
    listRef.on('child_added', function (snapshot) {
        var msgData = snapshot.val();
        jugadores.push(msgData.user_id + ": " + msgData.text + "seg");
        console.log(jugadores);
    });
    // Generate a reference to a new location with push
    newPushRef = listRef.push();

    // sets the div to use to display the game and its dimension
    $("#playground").playground({ width: $(window).width(), height: $(window).height() });

    // register the start button and remove the splash screen once the game is ready to starts
    $("#start").click(function () {
        $.playground().startGame(function () {
            start = $("#start").detach();
            $("#titulo").detach();
            $("#nombre-input").css("display", "none");
            $("#nombre").css("display", "block");
            if ($("#nombre-input").val()) {
                nombre = $("#nombre-input").val();
            }
            $("#nombre").text(nombre);
            counter = setInterval(timer, 1000); //1000 will  run it every 1 second
            setInterval(timervolcan, 1000);
            $("#timer").css("display", "inline");
            $("#countdown").css("display", "inline");
            //  Crear volcanes
            volcanes = crearVolcanes(3);
            //meteoros = crearMeteoros(2);

        });
    });
});