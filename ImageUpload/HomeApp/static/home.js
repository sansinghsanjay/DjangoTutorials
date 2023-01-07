function selectSubmit() {
    // create an element "select files"
    let inputFiles = document.createElement('input');
    inputFiles.type = 'file';
    inputFiles.multiple = 'multiple';  // for multiple file selections
    inputFiles.onchange = _ => {
        // get array of selected files
    	files = Array.from(inputFiles.files);
    	// if number of files are more than 15 then raise error
    	if(files.length > 15 || files.length < 1) {
    	    $("#div_server_response").html("Please select up to 15 images at a time");
    	} else {
    	    // update the status
    	    $("#div_server_response").html("Uploading... (0%)");
    	    // update the value of progress_bar
    	    $("#progress_bar").val("0");
    	    // upload one by one each file
            for(let i=0; i<files.length; i++) {
                uploadImage(files[i], files.length);
            }
        }
    };
    inputFiles.click();
}

function uploadImage(file, totalFiles) {
    // create fileread object
    var reader = new FileReader();
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
            url: "upload_process/",
            data: post_data,
            success: function(result) {
                // get the last status message posted
                var status_message = $("#div_server_response").text();
                // remove white space and new line character from both the ends of status message
                status_message = status_message.trim()
                if(status_message == "Uploading... (0%)") {
                    var index = 1;
                    if(index == totalFiles) {
                        // caclulate the percentage of task done
                        var percentage = calculateProgress(index, totalFiles);
                        // update the status
                        $("#div_server_response").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)<br>Uploading completed successfully");
                        // update the progress bar
                        $("#progress_bar").val(percentage.toString());
                    } else {
                        // caclulate the percentage of task done
                        var percentage = calculateProgress(index, totalFiles);
                        // update the status
                        $("#div_server_response").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)");
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
                        $("#div_server_response").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)");
                        // update the progress bar
                        $("#progress_bar").val(percentage.toString());
                    } else {
                        // caclulate the percentage of task done
                        var percentage = calculateProgress(index, totalFiles);
                        // update the status
                        $("#div_server_response").html("Successfully uploaded " + index + " out of " + totalFiles + " images (" + percentage + "%)<br>Uploading completed successfully");
                        // update the progress bar
                        $("#progress_bar").val(percentage.toString());
                    }
                }
            },
            error: function(error_message) {
                $("#div_server_response").html(error_message);
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