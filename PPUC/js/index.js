// handle all polyfills for browsers
import 'core-js/stable';
import './polyfills.js'

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
    // can't use CSS class here since it seems to mess with LeaderLine
    // Results in lines "floating" after a button is clicked
    document.getElementById("pre-complaintCircle").style.color = "";
    document.getElementById("complaintCircle").style.color = "";
    document.getElementById("reviewCircle").style.color = "";
    document.getElementById("investigationCircle").style.color = "";
    document.getElementById("resultCircle").style.color = "";
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
            document.getElementById("pre-complaintCircle").style.color = "#d9534f";
            // scroll to answer area
            scrollToElement("#pre-complaintPanel");
            break;
        case c = "Complaint":
            document.getElementById("complaintPanel").style.display = "block";
            document.getElementById("complaintCircle").style.color = "#d9534f";
            // scroll to answer area
            scrollToElement("#complaintPanel");
            break;
        case c = "Review":
            document.getElementById("reviewPanel").style.display = "block";
            document.getElementById("reviewCircle").style.color = "#d9534f";
            // scroll to answer area
            scrollToElement("#reviewPanel");
            break;
        case c = "Investigation":
            document.getElementById("investigationPanel").style.display = "block";
            document.getElementById("investigationCircle").style.color = "#d9534f";
            // scroll to answer area
            scrollToElement("#investigationPanel");
            break;
        case c = "Result":
            document.getElementById("resultPanel").style.display = "block";
            document.getElementById("resultCircle").style.color = "#d9534f";
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

window.loadModalLink = function(element, e) {
	if (e) {
		e.preventDefault();
	}
	const modalId = $(element).attr("data-target");
	const href = $(element).attr("href");
	$(modalId).modal("show").load(href);
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
