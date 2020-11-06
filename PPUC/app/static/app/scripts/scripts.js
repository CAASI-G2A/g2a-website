function showCategory(c) {
    //on click set all elements to hidden and who the one we want
    document.getElementById("pre-complaintPanel").style.display = "none";
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "none";
    document.getElementById("notificationPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    document.getElementById(c + "Answer").innerHTML = "Answer:" 
    switch (c) {
        case c = "Pre-Complaint":
            document.getElementById("pre-complaintPanel").style.display = "block";
            break;
        case c = "Complaint":
            document.getElementById("complaintPanel").style.display = "block";
            break;
        case c = "Notification":
            document.getElementById("notificationPanel").style.display = "block";
            break;
        case c = "Investigation":
            document.getElementById("investigationPanel").style.display = "block";
            break;
        case c = "Result":
            document.getElementById("resultPanel").style.display = "block";
            break;
    }
}
function showPreComplaint() {
    //on click set all elements to hidden and who the one we want
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "none";
    document.getElementById("notificationPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    document.getElementById("pre-complaintPanel").style.display = "block";
}
function showContractSearch() {
    //on click set all elements to hidden and who the one we want
    document.getElementById("pre-complaintPanel").style.display = "none";
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("notificationPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "block";
}
function setAnswer(answer,c) {
    document.getElementById(c+ "Answer").innerHTML = answer;
}