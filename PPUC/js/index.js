// import bootstrap
import 'bootstrap';
// import fontawesome icons
import '@fortawesome/fontawesome-free/js/all.js';

// import bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// import site styles
import "../scss/app.scss";

window.showCategory = function(c) {
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

window.showContractSearch = function() {
    //on click set all elements to hidden and who the one we want
    document.getElementById("pre-complaintPanel").style.display = "none";
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("reviewPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "block";
}
