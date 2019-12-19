var socket = io();
var name;

$(document).ready(function () {

$('#chatForm').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    let msg = $('#m').val();
    if (msg == "") return;

    socket.emit('chat message', `${name}: ${msg}`);
    $('#m').val('');
    return false;
});

$('#groupForm').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    let group = $('#groupString').val();
    name = $('#userName').val();
    if (group == "" || name == "") return;

    io().emit('group', group);
    socket.removeAllListeners();
    
    setTimeout(function(){
        socket = io('/'+group);

        socket.on('chat message', function (msg) {
            $('#messages').append($('<li>').text(msg));
        });

        socket.on('board update', function (msg) {
            board.update_board(msg);
            window.updateBoard();
        });

        console.log("joined "+ group)
        $('#game').css("display", "flex");
        $('#lobby').css("display", "none");
    }, 500);

    return false;
});

});