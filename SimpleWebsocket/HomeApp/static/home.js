function startCommunication() {
    alert("Starting websocket communication");
    var socket = new WebSocket('ws://localhost:8000/ws/some_url/');
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        document.getElementById("div_websocket").innerText = data.message;
    }
}