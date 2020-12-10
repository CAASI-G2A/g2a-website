function postData(input) {
    $.ajax({
        type: "POST",
        url: "/directory.py",
        data: { param: input },
        success: getData
    });
}

function getData(result) {
    console.log(response);
}

postData('data to process');