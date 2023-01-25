function fun_signup() {
    // get first name
    var firstName = $("#text_firstName").val();
    // validate firstName
    var firstNameTestPassed = validateFirstName(firstName);
    // get last name
    var lastName = $("#text_lastName").val();
    // validate lastName
    var lastNameTestPassed = validateLastName(lastName);
    // get gender
    var gender = $("input[name='radio_gender']:checked").val();
    // get dob
    var dob = $("#date_dob").val();
    // validate dob
    var dobTestPassed = validateDOB(dob);
    // get email ID
    var emailId = $("#text_emailID").val();
    // validate emailID
    var emailIdTestPassed = validateEmailId(emailId);
    // get contact number
    var contactNo = $("#text_contactNo").val();
    // validate contactNo
    var contactNoTestPassed = validateContactNo(contactNo);
    // get password
    var pwd = $("#password_pwd").val();
    // validate firstName
    var pwdTestPassed = validatePwd(pwd);
    // get retype password
    var repwd = $("#password_retypePwd").val();
    // validate re-typed pwd
    var retypePwdTestPassed = validateRetypedPwd(pwd, repwd);
    // proceed only if all validation tests passed
    if(firstNameTestPassed == true && lastNameTestPassed == true && dobTestPassed == true && emailIdTestPassed == true && contactNoTestPassed == true && pwdTestPassed == true && retypePwdTestPassed == true) {
        // create dictionary of all values
        var formData = {
            "firstName": firstName,
            "lastName": lastName,
            "gender": gender,
            "dob": dob,
            "emailId": emailId,
            "contactNo": contactNo,
            "pwd": pwd,
            "retype_pwd": repwd,
        }
        // submit data to the backend by a POST request
        $.ajax({
            type: "POST",
            url: "process_signup",
            data: formData,
            success: function() {
                alert("Form data saved successfully");
                window.location = "/";
            },
            error: function() {
                alert("Error occurred");
            }
        });
    }
}

function validateFirstName(firstName) {
    // check if it passes test or not
    var testPassed = true;
    // remove empty space the first name
    firstName = firstName.trim()
    // length must be greater than 1 and less than 30 chars
    if(firstName.length > 30 || firstName.length < 1) {
        testPassed = false;
    } else {
        // it should not contain any of these characters
        var format = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(format.test(firstName)) {
            testPassed = false;
        }
    }
    // if it failed the validation, reset the field and raise the alert message
    if(testPassed == false) {
        $("#text_firstName").val("");
        alert("Please enter a valid first name");
    }
    return testPassed;
}

function validateLastName(lastName) {
    // check if it passes test or not
    var testPassed = true;
    // remove blank space from the last name
    lastName = lastName.trim()
    // it should be between 1 to 30 characters
    if(lastName.length > 30 || lastName.length < 1) {
        testPassed = false;
    } else {
        // it should not contain any of these chars
        var format = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(format.test(lastName)) {
            testPassed = false;
        }
    }
    // if it failed the validation, then reset the field and raise the alert message
    if(testPassed == false) {
        $("#text_lastName").val("");
        alert("Please enter a valid last name");
    }
    return testPassed;
}

function validateDOB(dob) {
    // check if it passes test or not
    var testPassed = true;
    // get current date - date, month, and year
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    // extract year, month, and days from the entered dob
    var splits = dob.split("-");
    var dobYear = parseInt(splits[0]);
    var dobMonth = parseInt(splits[1]);
    var dobDay = parseInt(splits[2]);
    // calculate approx age - if it is more than 120 years, it will fail the validation test
    if((yyyy - dobYear) > 120) {
        testPassed = false;
    } else {
        // basic checks, day range, month range, year range, and it should not be a future date
        if((dobYear > yyyy) || (dobMonth < 1) || (dobMonth > 12) || (dobDay < 1) || (dobDay > 31)) {
            testPassed = false;
        }
    }
    // if it fails the validation then reset the field and raise the alert message
    if(testPassed == false) {
        $("#date_dob").val("");
        alert("Please enter a valid Date of Birth");
    }
    return testPassed;
}

function validateEmailId(emailId) {
    // check if it passes test or not
    var testPassed = true;
    // check length of email ID
    if(emailId.length > 50) {
        testPassed = false;
    } else {
        // it should not contain any of these chars
        var format = /[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
        if(format.test(emailId)) {
            testPassed = false;
        }
    }
    // if it fails the validation test, then reset the field and raise the alert message
    if(testPassed == false) {
        $("#text_emailID").val("");
        alert("Please enter a valid email ID");
    }
    return testPassed;
}

function validateContactNo(contactNo) {
    // check if it passes test or not
    var testPassed = true;
    // its length should be 10
    if(contactNo.length != 10) {
        testPassed = false;
    } else {
        // it should not contain any of these chars
        var format = /[a-zA-Z!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
        if(format.test(contactNo)) {
            testPassed = false;
        }
    }
    // if it fails the validation test, then reset the field and raise the alert message
    if(testPassed == false) {
        $("#text_contactNo").val("");
        alert("Please enter a valid contact number")
    }
    return testPassed;
}

function validatePwd(pwd) {
    // check if it passes test or not
    var testPassed = true;
    // its length must be between 8 and 16 chars
    if(pwd.length < 8 || pwd.length > 16) {
        testPassed = false;
    } else {
        // it should not contain any of these chars
        var format = /[%^&()+-=\[\]{};':"\\|,<>\/?]+/;
        if(format.test(pwd)) {
            testPassed = false;
        }
    }
    // if it fails the validation test, then reset the field and raise the alert message
    if(testPassed == false) {
        $("#password_pwd").val("");
        $("#password_retypePwd").val("");
        alert("Please enter a valid password (rules: 8 to 16 chars long, a-z, A-Z, 0-9, #, @, !, *)");
    }
    return testPassed;
}

function validateRetypedPwd(pwd, repwd) {
    // check if it passes test or not
    var testPassed = true;
    if(repwd != pwd) {
        testPassed = false;
    }
    // if it fails the validation test, then reset the field and raise the alert message
    if(testPassed == false) {
        $("#password_pwd").val("");
        $("#password_retypePwd").val("");
        alert("Entered passwords don't match");
    }
    return testPassed;
}