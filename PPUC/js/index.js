// import bootstrap
import 'bootstrap';
// import fontawesome icons
import '@fortawesome/fontawesome-free/js/all.js';
import * as scrollToElement from 'scroll-to-element';

// import bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// import site styles
import '../scss/app.scss';

import LeaderLine from 'leader-line';
import { dom } from '@fortawesome/fontawesome-svg-core';
window.drawFlowArrows = () => {
	dom.i2svg().then(() => {
		// given a flow chat element returns the underlying circle element SVG
		const getCircle = (element) => element.children[0].children[0].children[0];
		const leaderLineConfig = {color: '#337ab7'};
		const lines = [
			['Pre-ComplaintCircle', 'ComplaintCircle'],
			['ComplaintCircle', 'ReviewCircle'],
			['ReviewCircle', 'InvestigationCircle'],
			['InvestigationCircle', 'ResultCircle'],
		];
		for (let line of lines) {
			new LeaderLine(
				getCircle(document.getElementById(line[0])),
				getCircle(document.getElementById(line[1])),
				leaderLineConfig
			);
		}
	});
};

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
            // scroll to answer area
            scrollToElement("#pre-complaintPanel");
            break;
        case c = "Complaint":
            document.getElementById("complaintPanel").style.display = "block";
            // scroll to answer area
            scrollToElement("#complaintPanel");
            break;
        case c = "Review":
            document.getElementById("reviewPanel").style.display = "block";
            // scroll to answer area
            scrollToElement("#reviewPanel");
            break;
        case c = "Investigation":
            document.getElementById("investigationPanel").style.display = "block";
            // scroll to answer area
            scrollToElement("#investigationPanel");
            break;
        case c = "Result":
            document.getElementById("resultPanel").style.display = "block";
            // scroll to answer area
            scrollToElement("#resultPanel");
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
