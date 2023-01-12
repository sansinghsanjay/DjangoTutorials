// global variable
var files;

function button_browse() {
    // select files
    let inputFiles = document.createElement('input');
    inputFiles.type = 'file';
    inputFiles.multiple = 'multiple';
    inputFiles.onchange = _ => {
        // get array of selected files
    	files = Array.from(inputFiles.files);
        // reset the div_image_area
        $("#div_image_area").html("");
        // set the images
        for(let i=0; i<files.length; i++) {
            let id = files[i].name;
            id = id.replace(".", "_");
            $("#div_image_area").append(
                "<div class='div_image' id='div_" + id + "_img'><img class='div_image_tag' src='" + URL.createObjectURL(files[i]) + "'/><input type='text' readonly value='Predicted Label' class='div_image_text' id='div_" + id + "_text'></div>"
            );
        }
        // change the label of this button
        $("#button_browse").html("SUBMIT");
        $("#button_browse").attr("onclick", "action_submit()");
    };
    inputFiles.click();
}

function action_submit() {
    //alert("Number of files selected: " + files.length);
    // change status and color of text in div_upload_status
    $("#div_upload_status").html("Uploading... (0%)");
    $("#div_upload_status").css("color", "black");
    // reset the value and color div_image_processing
    $("#div_image_processing").html("Processing...");
    $("#div_image_processing").css("color", "silver");
    // reset the value of progress_bar
    $("#progress_bar").val("0");
    // start uploading files one by one
    for(let i=0; i<files.length; i++) {
        uploadImage(files[i], files.length);
    }
}

function uploadImage(file, totalFiles) {
    // create fileread object
    var reader = new FileReader();
    // get the name of file
    var filename = file.name;
    reader.onloadend = () => {
        // Use a regex to remove data url part
        var base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        // make data variable
        post_data = {
            'image_base64': base64String,
            'filename': filename,
        }
        // submit the data at backend
        $.ajax({
            type: "POST",
            url: "upload/",
            data: post_data,
            success: function(result) {
                // get the last status message posted
                var status_message = $("#div_upload_status").text();
                // remove white space and new line character from both the ends of status message
                status_message = status_message.trim()
                if(status_message == "Uploading... (0%)") {
                    var index = 1;
                    if(index == totalFiles) {
                        // caclulate the percentage of task done
                        var percentage = calculateProgress(index, totalFiles);
                        // update the status and change the color as uploading is done
                        $("#div_upload_status").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)");
                        $("#div_upload_status").css("color", "green");
                        // update the progress bar
                        $("#progress_bar").val(percentage.toString());
                        // call the imageProcessing function
                        imageProcessing();
                    } else {
                        // caclulate the percentage of task done
                        var percentage = calculateProgress(index, totalFiles);
                        // update the status
                        $("#div_upload_status").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)");
                        // update the progress bar
                        $("#progress_bar").val(percentage.toString());
                    }
                } else {
                    // split the status message
                    var tokens = status_message.split(" ");
                    // get the last progress
                    var index = parseInt(tokens[2]);
                    // increment the progress
                    index += 1;
                    // if the progress is not equal to the total images, then just update the status; else update status and show "complete"
                    if(index < totalFiles) {
                        // caclulate the percentage of task done
                        var percentage = calculateProgress(index, totalFiles);
                        // update the status
                        $("#div_upload_status").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)");
                        // update the progress bar
                        $("#progress_bar").val(percentage.toString());
                    } else {
                        // caclulate the percentage of task done
                        var percentage = calculateProgress(index, totalFiles);
                        // update the status and change the color to green as the uploading is done
                        $("#div_upload_status").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)");
                        $("#div_upload_status").css("color", "green");
                        // update the progress bar
                        $("#progress_bar").val(percentage.toString());
                        // call the imageProcessing function
                        imageProcessing();
                    }
                }
            },
            error: function(error_message) {
                $("#div_upload_status").html(error_message);
            }
        });
    };
    reader.readAsDataURL(file);
}

function calculateProgress(done, total) {
    var percentage = (done / total) * 100;
    percentage = percentage.toFixed(2);
    return percentage;
}

function imageProcessing() {
    // update the status
    $("#div_image_processing").html("Processing images... (please wait)");
    $("#div_image_processing").css("color", "black");
    // start the progress_bar in indeterminate form
    $("#progress_bar").removeAttr("value");
    // make the call to process images
    $.ajax({
        type: "POST",
        url: "process/",
        success: function(result) {
            // iterate over the results received and set the predictions in the respective textfields
            $.each(result, function(k, v){
                $("#" + k).val(v);
            });
            // update the status and change the font color
            $("#div_image_processing").html("Processing done");
            $("#div_image_processing").css("color", "green");
            // set the progress bar at 100 as processing is done
            $("#progress_bar").val("100");
        },
        error: function(error) {
            // update the error
            $("#div_image_processing").html("Error");
        }
    });
}