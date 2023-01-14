function fun_signup() {
    // get first name
    var firstName = $("#text_firstName").val();
    // validate firstName
    validateFirstName(firstName);
    // get last name
    var lastName = $("#text_lastName").val();
    // validate lastName
    validateLastName(lastName);
    // get gender
    var gender = $("input[name='radio_gender']:checked").val();
    // get dob
    var dob = $("#date_dob").val();
    // validate dob
    validateDOB(dob);
    // get email ID
    var emailId = $("#text_emailID").val();
    // validate emailID
    validateEmailId(emailId);
    // get contact number
    var contactNo = $("#text_contactNo").val();
    // validate contactNo
    validateContactNo(contactNo);
    // get password
    var pwd = $("#password_pwd").val();
    // validate firstName
    validatePwd(pwd);
    // get retype password
    var repwd = $("#password_retypePwd").val();
    // validate re-typed pwd
    validateRetypedPwd(repwd);
    // show all information on an alert box
    var str = firstName + " " + lastName + "\n" + gender + "\n" + dob + "\n" + emailId + "\n" + contactNo + "\n" + pwd + "\n" + repwd;
    alert(str);
}

/*function resetForm() {
    $("#text_firstName").val("");
    $("#text_lastName").val("");
    $("input[name='radio_gender']").each(function () { $(this).prop('checked', false); });
    $("#date_dob").val("");
    $("#text_emailID").val("");
    $("#text_contactNo").val("");
    $("#password_pwd").val("");
    $("#password_retypePwd").val("");
}*/

function validateFirstName(firstName) {
    var testPassed = true;
    firstName = firstName.trim()
    if(firstName.length > 30 || firstName.length < 1) {
        testPassed = false;
    } else {
        var format = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(format.test(firstName)) {
            testPassed = false;
        }
    }
    if(testPassed == false) {
        $("#text_firstName").val("");
        alert("Please enter a valid first name");
    }
}

function validateLastName(lastName) {
    var testPassed = true;
    lastName = lastName.trim()
    if(lastName.length > 30 || lastName.length < 1) {
        testPassed = false;
    } else {
        var format = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(format.test(lastName)) {
            testPassed = false;
        }
    }
    if(testPassed == false) {
        $("#text_lastName").val("");
        alert("Please enter a valid last name");
    }
}

function validateDOB(dob) {
    testPassed = true;
    // get current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    // get year, month, and days from dob
    var splits = dob.split("-");
    var dobYear = parseInt(splits[0]);
    var dobMonth = parseInt(splits[1]);
    var dobDay = parseInt(splits[2]);
    // calculate approx age
    if((yyyy - dobYear) > 120) {
        testPassed = false;
    } else {
        if((dobYear > yyyy) || (dobMonth < 1) || (dobMonth > 12) || (dobDay < 1) || (dobDay > 31)) {
            testPassed = false;
        }
    }
    if(testPassed == false) {
        $("#date_dob").val("");
        alert("Please enter a valid Date of Birth");
    }
}

function validateEmailId(emailId) {
    var testPassed = true;
    // check length of email ID
    if(emailId.length > 50) {
        testPassed = false;
    } else {
        var format = /[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
        if(format.test(emailId)) {
            testPassed = false;
        }
    }
    if(testPassed == false) {
        $("#text_emailID").val("");
        alert("Please enter a valid email ID");
    }
}

function validateContactNo(contactNo) {
    var testPassed = true;
    if(contactNo.length != 10) {
        testPassed = false;
    } else {
        var format = /[a-zA-Z!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
        if(format.test(contactNo)) {
            testPassed = false;
        }
    }
    if(testPassed == false) {
        $("#text_contactNo").val("");
        alert("Please enter a valid contact number")
    }
}

function validatePwd(pwd) {
}

function validateRetypedPwd(repwd) {
}

function validate() {
}
