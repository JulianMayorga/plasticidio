var listRef;
//var jugadores = [];

$(function () {
    listRef = new Firebase('https://plasticidio.firebaseio.com/');
    listRef.on('child_added', function (snapshot) {
        var msgData = snapshot.val();
        //jugadores.push(msgData.user_id + ": " + msgData.text + "seg");
        $("#jugadores").append("<li><div class='jugador large button expand'>" + msgData.user_id + ": " + msgData.text + " seg</div></li>");
        //console.log(jugadores);
    });
});