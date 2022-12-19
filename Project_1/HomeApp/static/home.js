function function_sum() {
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
