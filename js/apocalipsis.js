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
        console.log(volcan);
        $.playground().addSprite("volcan" + i, {
            posx: getRandomInt(60, 340),
            posy: getRandomInt(200, 400),
            height: 101,
            width: 58,
            animation: volcan,
            geometry: $.gQ.GEOMETRY_RECTANGLE /* GEOMETRY_DISC GEOMETRY_RECTANGLE */
        })

        $("#volcan" + i).rotate(-15);
        var hammertime = $("#volcan" + i).hammer();
        console.log(hammertime);
        // the whole area
        hammertime.on("touch", function (ev) {
            if (window.console) { console.log(ev); }
            $(this).css("display", "none");
        });
    }
    return volcanes;
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
        $("#loadtext").html("" + percent + "%");
    });

    // register the start button and remove the splash screen once the game is ready to starts
    $("#start").click(function () {
        $.playground().startGame(function () {
            var volcanes = [];
            $("#splash").remove();

            $.playground().addSprite("tierra", {
                posx: 40,
                posy: 200,
                height: 400,
                width: 400,
                animation: tierra,
                geometry: $.gQ.GEOMETRY_DISC /*GEOMETRY_DISC GEOMETRY_RECTANGLE*/
            })

            volcanes = crearVolcanes(3);

        });
    });

});