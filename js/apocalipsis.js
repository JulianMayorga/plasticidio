var volcanes_muertos = 0;

function crearVolcanes(numero) {
    var volcanes = new Array(numero);
    var volcan = new $.gQ.Animation({
        imageURL: "img/volcan-atlas.png",
        numberOfFrame: 3,
        delta: 56,
        rate: 100,
        type: $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_PINGPONG
    });

    for (var i = 0; i < numero; i++) {
        $.playground().addSprite("volcan" + i, {
            posx: getRandomInt(60, 340),
            posy: getRandomInt(200, 400),
            height: 101,
            width: 58,
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

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var volcanes = [];

$(function () {
    var tierra = new $.gQ.Animation({ imageURL: "img/tierra.png" });
    var vida = 4;
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

        });
    });

});