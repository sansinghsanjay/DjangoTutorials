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
                fun_proceedHome(formData);
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

function fun_proceedHome(formData) {
    // create a dynamic hidden form to submit user details with POST method
    // create a dynamic hidden form
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "home";
    // create hidden elements of this form
    for(let key in formData) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = formData[key];
        // append element in this form
        form.appendChild(hiddenField);
    }
    // append this form to a body
    document.body.appendChild(form);
    // submit the form
    form.submit();
}