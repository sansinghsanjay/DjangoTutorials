// function to execute on click of "button_startAction"
function startAction() {
    // reset the value of progress division
    $("#div_progress_val").html("0%");
    // reset the value of progress bar
    $("#progress_bar").val("0");
    // create websocket connection
    var socket = new WebSocket("ws://localhost:8000/ws/some_url/");
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if(parseInt(data.message) > -1) {
            $("#div_progress_val").html(data.message + "%");
            $("#progress_bar").val(data.message);
        }
    }
}