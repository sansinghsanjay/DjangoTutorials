function fun_button_testButton() {
    // call backend for the secret message
    $.ajax({
        type: "POST",
        url: "show_record",
        success: function(response) {
            // show the secret message
            alert("The record is: " + response['record']);
        },
        error: function() {
            alert("An error occurred while receiving the record");
        }
    });
}