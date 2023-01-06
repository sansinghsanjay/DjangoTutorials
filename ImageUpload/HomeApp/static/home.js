function selectSubmit() {
    // create an element "select files"
    let inputFiles = document.createElement('input');
    inputFiles.type = 'file';
    inputFiles.multiple = 'multiple';  // for multiple file selections
    inputFiles.onchange = _ => {
        // get array of selected files
    	files = Array.from(inputFiles.files);
        for(let i=0; i<files.length; i++) {
            uploadImage(files[i]);
        }
    };
    inputFiles.click();
}

function uploadImage(file) {
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
                $("#div_server_response").html(result['result']);
            },
            error: function(error_message) {
                $("#div_server_response").html(error_message);
            }
        });
    };
    reader.readAsDataURL(file);
}