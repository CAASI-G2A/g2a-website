function showCategory(c) {
    //on click set all elements to hidden and who the one we want
    //document.getElementById(c + "Circle").style.borderColor = "#B22222";
    document.getElementById("pre-complaintPanel").style.display = "none";
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "none";
    document.getElementById("reviewPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    switch (c) {
        case c = "Pre-Complaint":
            document.getElementById("pre-complaintPanel").style.display = "block";
            break;
        case c = "Complaint":
            document.getElementById("complaintPanel").style.display = "block";
            break;
        case c = "Review":
            document.getElementById("reviewPanel").style.display = "block";
            break;
        case c = "Investigation":
            document.getElementById("investigationPanel").style.display = "block";
            break;
        case c = "Result":
            document.getElementById("resultPanel").style.display = "block";
            break;
    }
}

function showContractSearch() {
    //on click set all elements to hidden and who the one we want
    document.getElementById("pre-complaintPanel").style.display = "none";
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("reviewPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "block";
}
function setAnswer(answer, c) {
    if (document.getElementById(c + "Answer").style.display == "none") {
        document.getElementById(c + "Answer").style.display = "block";
        document.getElementById(c + "Answer").innerHTML = answer;
    }
    else
        if (document.getElementById(c + "Answer").innerHTML != answer)
            document.getElementById(c + "Answer").innerHTML = answer;
        else
            document.getElementById(c + "Answer").style.display = "none"
}
