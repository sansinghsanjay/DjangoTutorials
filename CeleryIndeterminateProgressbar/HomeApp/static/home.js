function startEvent() {
    // get the current status
    var current_status = $("#status").text();
    // create websocket connection
    var socket = new WebSocket("ws://localhost:8000/ws/some_url/");
    // trigger on on_message event
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if(data.message != current_status) {
            $("#status").html(data.message);
        }
        if(data.message == "Started") {
            var progress_bar = document.getElementById("progress_bar");
            progress_bar.removeAttribute("value");
        }
        if(data.message == "Completed") {
            $("#progress_bar").val("100");
        }
    }
}