function fun_signin() {
    // get email ID
    var emailId = $("#text_emailId").val();
    // get password
    var pwd = $("#password_pwd").val();
    // prepare data to send it
    var formData = {
        'emailId': emailId,
        'pwd': pwd,
    }
    // forward the data to the backend
    $.ajax({
        type: "POST",
        url: "process_signin",
        data: formData,
        success: function(response) {
            if(response['result'] == "successful") {
                window.location.href = "home";
            } else {
                // reset fields
                $("#text_emailId").val("");
                $("#password_pwd").val("");
                alert("Incorrect email ID and / or password");
            }
        },
        error: function() {
            alert("Some error occurred at the backend. Unable to complete the request.");
        }
    });
}