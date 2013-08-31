var listRef;
var jugadores = [];

$(function () {
    listRef = new Firebase('https://plasticidio.firebaseio.com/');
    listRef.on('child_added', function (snapshot) {
        var msgData = snapshot.val();
        jugadores.push({
            "nombre": msgData.user_id,
            "puntaje": msgData.text
        });
        jugadores.sort(numOrdDesc);
        $("#jugadores").empty();
        jugadores.forEach(function (element, index, array) {
            $("#jugadores").append("<li><div class='jugador large button expand'>" + element.nombre + ": " + element.puntaje + " seg</div></li>");
        })
        console.log(jugadores);
    });
});

function numOrdDesc(a, b) { return (b.puntaje - a.puntaje); }