/*function function_sum() {
    var a = parseInt(document.getElementById("text_a").value);
    var b = parseInt(document.getElementById("text_b").value);
    var sum = a + b;
    document.getElementById("div_result").textContent = "Sum is: " + sum;
    document.getElementById("text_a").value = "";
    document.getElementById("text_b").value = "";
}*/

function function_sum() {
    //var a = document.getElementById("text_a").value;
    //var b = document.getElementById("text_b").value;
    //alert(a + " - " + b);
    var a = $("#text_a").val();
    var b = $("#text_b").val();
    $.ajax({
        type: "post",
        url: "process/",
        data: {
            "a": a,
            "b": b,
        },
        success: function(result) {
            //alert("I am working!");
            $("#div_result").text("Sum is: " + result['result']);
        },
        error: function(error) {
            console.log(error);
        }
    });
}