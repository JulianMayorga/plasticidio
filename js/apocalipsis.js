
$(function () {
    var tierra = new $.gQ.Animation({ imageURL: "img/tierra.png" });
    var volcan = new $.gQ.Animation({ imageURL: "img/volcan.png" });
    // sets the div to use to display the game and its dimension
    $("#playground").playground({ width: 480, height: 800 }).css("background-color", "red");

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

            $.playground().addSprite("volcan", {
                posx: 60,
                posy: 200,
                height: 101,
                width: 58,
                animation: volcan,
                geometry: $.gQ.GEOMETRY_RECTANGLE /*GEOMETRY_DISC GEOMETRY_RECTANGLE*/
            })

            $("#volcan").rotate(-15);
            var hammertime = $("#volcan").hammer();
            console.log(hammertime);
            // the whole area
            hammertime.on("touch", function (ev) {
                if (window.console) { console.log(ev); }
                $(this).css("display", "none");
            });
        });
    });

});