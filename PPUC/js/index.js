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
			['pre-complaintIcon', 'complaintIcon'],
			['complaintIcon', 'reviewIcon'],
			['reviewIcon', 'investigationIcon'],
			['investigationIcon', 'resultIcon'],
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

window.showCategory = (c) => {
    $("#pre-complaintCircle")[0].classList.remove("flow-circle-selected");
    $("#complaintCircle")[0].classList.remove("flow-circle-selected");
    $("#reviewCircle")[0].classList.remove("flow-circle-selected");
    $("#investigationCircle")[0].classList.remove("flow-circle-selected");
    $("#resultCircle")[0].classList.remove("flow-circle-selected");
    //on click set all elements to hidden and who the one we want
    document.getElementById("pre-complaintPanel").style.display = "none";
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "none";
    document.getElementById("reviewPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    switch (c) {
        case c = "Pre-Complaint":
            document.getElementById("pre-complaintPanel").style.display = "block";
            $("#pre-complaintCircle")[0].classList.add("flow-circle-selected");
            // scroll to answer area
            scrollToElement("#pre-complaintPanel");
            break;
        case c = "Complaint":
            document.getElementById("complaintPanel").style.display = "block";
            $("#complaintCircle")[0].classList.add("flow-circle-selected");
            // scroll to answer area
            scrollToElement("#complaintPanel");
            break;
        case c = "Review":
            document.getElementById("reviewPanel").style.display = "block";
            $("#reviewCircle")[0].classList.add("flow-circle-selected");
            // scroll to answer area
            scrollToElement("#reviewPanel");
            break;
        case c = "Investigation":
            document.getElementById("investigationPanel").style.display = "block";
            $("#investigationCircle")[0].classList.add("flow-circle-selected");
            // scroll to answer area
            scrollToElement("#investigationPanel");
            break;
        case c = "Result":
            document.getElementById("resultPanel").style.display = "block";
            $("#resultCircle")[0].classList.add("flow-circle-selected");
            // scroll to answer area
            scrollToElement("#resultPanel");
            break;
    }
}

window.showContractSearch = () => {
    //on click set all elements to hidden and who the one we want
    document.getElementById("pre-complaintPanel").style.display = "none";
    document.getElementById("complaintPanel").style.display = "none";
    document.getElementById("reviewPanel").style.display = "none";
    document.getElementById("investigationPanel").style.display = "none";
    document.getElementById("resultPanel").style.display = "none";
    document.getElementById("contractPanel").style.display = "block";
}

// scroll to top button
$(document).ready(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('#back-to-top').click(() => {
		$('body,html').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
});
