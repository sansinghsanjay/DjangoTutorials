// global variable
let files;

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
            $("#div_image_area").append(
                "<div class='div_image' id='div_image_'" + i + "><img class='div_image_tag' src='" + URL.createObjectURL(files[i]) + "'/><input type='text' readonly value='Predicted Label' class='div_image_text' id='div_image_text_'" + i + "></div>"
            );
        }
        // change the label of this button
        $("#button_browse").html("SUBMIT");
        $("#button_browse").attr("onclick", "action_submit()");
    };
    inputFiles.click();
}

function action_submit() {
    alert("Number of files selected: " + files.length);
}