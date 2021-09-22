/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/About.jsx":
/*!**********************************!*\
  !*** ./src/components/About.jsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var About = /*#__PURE__*/function (_Component) {
  _inherits(About, _Component);

  var _super = _createSuper(About);

  function About() {
    _classCallCheck(this, About);

    return _super.apply(this, arguments);
  }

  _createClass(About, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
        className: "text-center pt-5 pl-2"
      }, "About P", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        style: {
          color: "#5685d1"
        }
      }, "x"), "PUC"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron pb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "The P", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        style: {
          color: "#5685d1"
        }
      }, "x"), "PUC team is made up of a subset of members from Grief to Action (G2A) , a working group at the University of Pittsburgh's Center for Analytical Approaches.", " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "Our team is made up of students, staff, and community members who came together this summer in the wake of George Floyd's murder to use data analysis to address structural racism in Pittsburgh and beyond.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron pt-0 bg-white"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4 border-top border-secondary"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "The aim of this project is to analyze police union contracts and the barriers they pose to holding police officers accountable, as well as to demystify the police misconduct investigation process."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "Our search tool allows users to easily look up information in these contracts, and helps them to become more familiar with some of the problematic language used within them and break this information down."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4 border-top border-secondary"
      })));
    }
  }]);

  return About;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (About);

/***/ }),

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/app.scss */ "./src/scss/app.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../routes */ "./src/routes.js");
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Navbar */ "./src/components/Navbar.jsx");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer.jsx");
/* harmony import */ var _Landing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Landing */ "./src/components/Landing.jsx");
/* harmony import */ var _Researchers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Researchers */ "./src/components/Researchers.jsx");
/* harmony import */ var _Citizens__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Citizens */ "./src/components/Citizens.jsx");
/* harmony import */ var _About__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./About */ "./src/components/About.jsx");
/* harmony import */ var _Contact__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Contact */ "./src/components/Contact.jsx");
/* harmony import */ var _Location__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Location */ "./src/components/Location.jsx");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import bootstrap
 // import site styles

















var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  var _super = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super.apply(this, arguments);
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // scroll to top button
      $(document).ready(function () {
        $(window).scroll(function () {
          if ($(this).scrollTop() > 50) {
            $("#back-to-top").fadeIn();
          } else {
            $("#back-to-top").fadeOut();
          }
        }); // scroll body to 0px on click

        $("#back-to-top").click(function () {
          $("body,html").animate({
            scrollTop: 0
          }, 400);
          return false;
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_14__.HashRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_Navbar__WEBPACK_IMPORTED_MODULE_6__.default, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
        className: "container body-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__.Route, {
        path: _routes__WEBPACK_IMPORTED_MODULE_5__.default.home,
        exact: true,
        component: _Landing__WEBPACK_IMPORTED_MODULE_8__.default
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__.Route, {
        path: _routes__WEBPACK_IMPORTED_MODULE_5__.default.researchers,
        component: _Researchers__WEBPACK_IMPORTED_MODULE_9__.default
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__.Route, {
        path: _routes__WEBPACK_IMPORTED_MODULE_5__.default.citizens + "/:lid?",
        component: _Citizens__WEBPACK_IMPORTED_MODULE_10__.default
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__.Route, {
        path: _routes__WEBPACK_IMPORTED_MODULE_5__.default.about,
        component: _About__WEBPACK_IMPORTED_MODULE_11__.default
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__.Route, {
        path: _routes__WEBPACK_IMPORTED_MODULE_5__.default.contact,
        component: _Contact__WEBPACK_IMPORTED_MODULE_12__.default
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__.Route, {
        path: _routes__WEBPACK_IMPORTED_MODULE_5__.default.location + "/:lid",
        component: _Location__WEBPACK_IMPORTED_MODULE_13__.default
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("a", {
        id: "back-to-top",
        href: "#",
        className: "btn btn-light btn-lg back-to-top",
        role: "button"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_16__.faChevronUp
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_Footer__WEBPACK_IMPORTED_MODULE_7__.default, null)));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_2__.Component);

/* harmony default export */ __webpack_exports__["default"] = (App);
var container = document.getElementById("app");

if (container) {
  (0,react_dom__WEBPACK_IMPORTED_MODULE_3__.render)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(App, null), container);
}

/***/ }),

/***/ "./src/components/CitizenInfoPanel.jsx":
/*!*********************************************!*\
  !*** ./src/components/CitizenInfoPanel.jsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var CitizenInfoPanel = /*#__PURE__*/function (_Component) {
  _inherits(CitizenInfoPanel, _Component);

  var _super = _createSuper(CitizenInfoPanel);

  function CitizenInfoPanel() {
    _classCallCheck(this, CitizenInfoPanel);

    return _super.apply(this, arguments);
  }

  _createClass(CitizenInfoPanel, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        id: this.props.id,
        className: "card border-blue"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-header bg-blue font-weight-bold text-white"
      }, this.props.stage.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-body",
        dangerouslySetInnerHTML: {
          __html: this.props.stage.content
        }
      }), this.props.stage.resources && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-footer",
        dangerouslySetInnerHTML: {
          __html: this.props.stage.resources
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-header bg-blue font-weight-bold text-white"
      }, "Frequently Asked Questions"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "pt-1",
        id: "citizenInfoPanelAccordion"
      }, this.props.questions && this.props.questions.map(function (question) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          key: question.id,
          className: "card card-default"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "card-header",
          role: "tab",
          id: "heading{{q.id}}"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
          className: "collapsed",
          role: "button",
          "data-toggle": "collapse",
          href: "#collapse".concat(question.id),
          "aria-expanded": "false",
          "aria-controls": "collapse".concat(question.id)
        }, question.question)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          id: "collapse".concat(question.id),
          className: "collapse",
          "aria-labelledby": "heading".concat(question.id),
          "data-parent": "#citizenInfoPanelAccordion"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "card-body",
          dangerouslySetInnerHTML: {
            __html: question.answer
          }
        })));
      })));
    }
  }]);

  return CitizenInfoPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (CitizenInfoPanel);

/***/ }),

/***/ "./src/components/Citizens.jsx":
/*!*************************************!*\
  !*** ./src/components/Citizens.jsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ "./node_modules/react-dom/server.browser.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var scroll_to_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scroll-to-element */ "./node_modules/scroll-to-element/index.js");
/* harmony import */ var scroll_to_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(scroll_to_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/js/dist/tooltip */ "./node_modules/bootstrap/js/dist/tooltip.js");
/* harmony import */ var bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_js_dist_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap/js/dist/popover */ "./node_modules/bootstrap/js/dist/popover.js");
/* harmony import */ var bootstrap_js_dist_popover__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_popover__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _CitizenInfoPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CitizenInfoPanel */ "./src/components/CitizenInfoPanel.jsx");
/* harmony import */ var _libs_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../libs/api */ "./src/libs/api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }













var Citizens = /*#__PURE__*/function (_Component) {
  _inherits(Citizens, _Component);

  var _super = _createSuper(Citizens);

  function Citizens(props) {
    var _this;

    _classCallCheck(this, Citizens);

    _this = _super.call(this, props);
    _this.state = {
      locations: {},
      location: null,
      locationQuestions: null,
      locationStages: null,
      locationGlossary: null,
      stageOrder: ["pre-complaint", "complaint", "review", "investigation", "result"],
      curStage: null,
      locationSubStages: {
        review: [{
          id: 1,
          text: "DAR is filed. Copies given to officer",
          faq: {
            title: "FAQ",
            text: "FAQ TEXT"
          }
        }, {
          id: 2,
          text: "DAR goes through the chain of command"
        }, {
          id: 3,
          text: "DOPS holds meeting with officer",
          alternates: [{
            id: 4,
            text: "No discipline"
          }]
        }]
      }
    };
    _this.getLocationQuestions = _this.getLocationQuestions.bind(_assertThisInitialized(_this));
    _this.getLocationStages = _this.getLocationStages.bind(_assertThisInitialized(_this));
    _this.getLocationGlossary = _this.getLocationGlossary.bind(_assertThisInitialized(_this));
    _this.applyGlossary = _this.applyGlossary.bind(_assertThisInitialized(_this));
    _this.handleLocationSelect = _this.handleLocationSelect.bind(_assertThisInitialized(_this));
    _this.handleIconClick = _this.handleIconClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Citizens, [{
    key: "getLocationQuestions",
    value: function getLocationQuestions() {
      var _this2 = this;

      _libs_api__WEBPACK_IMPORTED_MODULE_8__.default.getLocationQuestions(this.state.location.id).then(function (resp) {
        var questionsByCat = {};

        var _iterator = _createForOfIteratorHelper(resp),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var category = _step.value;
            questionsByCat[category.name.toLowerCase()] = category.questions;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        _this2.setState({
          locationQuestions: questionsByCat
        });
      });
    }
  }, {
    key: "getLocationStages",
    value: function getLocationStages() {
      var _this3 = this;

      _libs_api__WEBPACK_IMPORTED_MODULE_8__.default.getLocationStages(this.state.location.id).then(function (resp) {
        _this3.setState({
          locationStages: resp
        });
      });
    }
  }, {
    key: "getLocationGlossary",
    value: function getLocationGlossary() {
      var _this4 = this;

      _libs_api__WEBPACK_IMPORTED_MODULE_8__.default.getLocationGlossary(this.state.location.id).then(function (resp) {
        _this4.setState({
          locationGlossary: resp
        }, function () {
          _this4.applyGlossary();
        });
      });
    }
  }, {
    key: "applyGlossary",
    value: function applyGlossary() {
      // ensure we have the terms + substages
      if (!this.state.locationGlossary || !this.state.locationSubStages) {
        return;
      } // go through all substages and look for terms


      var newSubStages = {};

      for (var _i = 0, _Object$entries = Object.entries(this.state.locationSubStages); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            stageName = _Object$entries$_i[0],
            subStages = _Object$entries$_i[1];

        var _iterator2 = _createForOfIteratorHelper(subStages),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var subStage = _step2.value;
            subStage.html = subStage.text;

            var _iterator3 = _createForOfIteratorHelper(this.state.locationGlossary),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var term = _step3.value;

                var termMatches = _toConsumableArray(subStage.text.matchAll(new RegExp("\\b".concat(term.term, "\\b"), "g"))); // start from end of indices


                termMatches.reverse();

                var _iterator4 = _createForOfIteratorHelper(termMatches),
                    _step4;

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var match = _step4.value;
                    var index = match.index;
                    subStage.html = "".concat(subStage.html.substr(0, index), "<a\n\t\t      data-toggle=\"tooltip\"\n\t\t      title=\"\"\n\t\t      data-original-title=\"").concat(term.definition, "\"\n\t\t    >").concat(term.term).concat(react_dom_server__WEBPACK_IMPORTED_MODULE_1__.renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                      className: "fa-xs mb-3",
                      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faQuestionCircle
                    })), "\n\t\t    </a>").concat(subStage.html.substr(index + term.term.length));
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        newSubStages[stageName] = subStages;
      }

      this.setState({
        locationSubStages: newSubStages
      });
    }
  }, {
    key: "handleLocationSelect",
    value: function handleLocationSelect(location) {
      var _this5 = this;

      // update current selected location
      this.setState({
        location: location
      }, function () {
        _this5.getLocationQuestions();

        _this5.getLocationStages();

        _this5.getLocationGlossary();
      });
    }
  }, {
    key: "handleIconClick",
    value: function handleIconClick(category) {
      this.setState({
        curStage: category
      }, function () {
        // draw leader lines
        scroll_to_element__WEBPACK_IMPORTED_MODULE_3__("#citizenInfoPanel");
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      // enable all tooltips
      jquery__WEBPACK_IMPORTED_MODULE_4___default()('[data-toggle="tooltip"]').tooltip(); // enable all popovers

      jquery__WEBPACK_IMPORTED_MODULE_4___default()('[data-toggle="popover"]').popover(); // load available locations

      _libs_api__WEBPACK_IMPORTED_MODULE_8__.default.getLocations().then(function (resp) {
        var locationsByState = {};

        var _iterator5 = _createForOfIteratorHelper(resp),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var loc = _step5.value;

            if (locationsByState[loc.state]) {
              locationsByState[loc.state].push(loc);
            } else {
              locationsByState[loc.state] = [loc];
            }
          } // check if preset location

        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        var lid = _this6.props.match.params.lid;
        var location = null; // if set try to find it

        if (lid) {
          location = resp.find(function (loc) {
            return loc.id == lid;
          });
        } else {
          // default to Pittsburgh
          location = resp.find(function (loc) {
            return loc.name == "Pittsburgh";
          });
        }

        _this6.setState({
          locations: locationsByState,
          location: location
        }, function () {
          _this6.getLocationQuestions();

          _this6.getLocationStages();

          _this6.getLocationGlossary();
        });
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      // enable all tooltips
      jquery__WEBPACK_IMPORTED_MODULE_4___default()('[data-toggle="tooltip"]').tooltip(); // enable all popovers

      jquery__WEBPACK_IMPORTED_MODULE_4___default()('[data-toggle="popover"]').popover();
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "container-fluid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "dropdown text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        className: "btn btn-secondary dropdown-toggle",
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        style: {
          margin: "10px auto"
        }
      }, "Choose a state", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "caret"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "dropdown-menu multi-level"
      }, Object.entries(this.state.locations).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            state = _ref2[0],
            cities = _ref2[1];

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
          key: state,
          className: "dropdown-submenu"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
          className: "dropdown-item"
        }, state), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
          className: "dropdown-menu"
        }, cities.map(function (city) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
            key: city.id
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
            className: "dropdown-item",
            onClick: function onClick() {
              return _this7.handleLocationSelect(city);
            }
          }, city.name));
        })));
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, this.state.location && this.state.location.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "This tool highlights the phases involved in the process of filing a police complaint. Click on a circle to learn more about that particular phase. Disclaimer: All the information presented with this tool was found on the OMI and CPRB websites.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row no-gutters"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-stage col-6 col-lg-12",
        onClick: function onClick() {
          return _this7.handleIconClick("pre-complaint");
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "fa-stack fa-5x"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-2x flow-circle w-100 ".concat(this.state.curStage == "pre-complaint" ? "flow-circle-selected" : ""),
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faCircle
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-1x fa-inverse",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faUsers
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
        className: "text-center flow-stage-text col-6 col-lg-12"
      }, "Interaction"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-none d-md-block row no-gutters h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto d-flex align-items-center h-75 mb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowRight
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-block d-md-none row h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto col-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowDown
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-stage col-6 col-lg-12",
        onClick: function onClick() {
          return _this7.handleIconClick("complaint");
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "fa-stack fa-5x"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-2x flow-circle w-100 ".concat(this.state.curStage == "complaint" ? "flow-circle-selected" : ""),
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faCircle
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-1x fa-inverse",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faExclamationCircle
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
        className: "text-center flow-stage-text col-6 col-lg-12"
      }, "Complaint"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-none d-md-block row no-gutters h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto d-flex align-items-center h-75 mb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowRight
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-block d-md-none row h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto col-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowDown
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-stage col-6 col-lg-12",
        onClick: function onClick() {
          return _this7.handleIconClick("review");
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "fa-stack fa-5x"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-2x flow-circle w-100 ".concat(this.state.curStage == "review" ? "flow-circle-selected" : ""),
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faCircle
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-1x fa-inverse",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faEdit
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
        className: "text-center flow-stage-text col-6 col-lg-12"
      }, "Review"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-none d-md-block row no-gutters h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto d-flex align-items-center h-75 mb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowRight
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-block d-md-none row h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto col-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowDown
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-stage col-6 col-lg-12",
        onClick: function onClick() {
          return _this7.handleIconClick("investigation");
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "fa-stack fa-5x"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-2x flow-circle w-100 ".concat(this.state.curStage == "investigation" ? "flow-circle-selected" : ""),
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faCircle
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-1x fa-inverse",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faSearch
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
        className: "text-center flow-stage-text col-6 col-lg-12"
      }, "Investigation"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-none d-md-block row no-gutters h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto d-flex align-items-center h-75 mb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowRight
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "d-block d-md-none row h-100"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-circle col-auto col-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-3x",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faArrowDown
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "text-center flow-stage col-6 col-lg-12",
        onClick: function onClick() {
          return _this7.handleIconClick("result");
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "fa-stack fa-5x"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-2x flow-circle w-100 ".concat(this.state.curStage == "result" ? "flow-circle-selected" : ""),
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faCircle
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        className: "fa-stack-1x fa-inverse",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faCheck
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
        className: "text-center flow-stage-text col-6 col-lg-12"
      }, "Result")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row mt-5"
      }, this.state.curStage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CitizenInfoPanel__WEBPACK_IMPORTED_MODULE_7__.default, {
        id: "citizenInfoPanel",
        stage: this.state.locationStages[this.state.curStage],
        questions: this.state.locationQuestions[this.state.curStage]
      })));
    }
  }]);

  return Citizens;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (Citizens);

/***/ }),

/***/ "./src/components/Contact.jsx":
/*!************************************!*\
  !*** ./src/components/Contact.jsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Contact = /*#__PURE__*/function (_Component) {
  _inherits(Contact, _Component);

  var _super = _createSuper(Contact);

  function Contact() {
    _classCallCheck(this, Contact);

    return _super.apply(this, arguments);
  }

  _createClass(Contact, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
        className: "text-center pt-5 pl-2"
      }, "Contact Us"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron pt-2 bg-white"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4 border-top border-secondary"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead text-center"
      }, "Feel free to e-mail us with any questions or inquiries. We're happy to help!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("address", {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "General:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        href: "mailto:caasipuc@pitt.edu"
      }, "caasipuc@pitt.edu")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("address", {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Tech Support:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        href: "mailto:cjk94@pitt.edu"
      }, "cjk94@pitt.edu")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4 border-top border-secondary"
      })));
    }
  }]);

  return Contact;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (Contact);

/***/ }),

/***/ "./src/components/Footer.jsx":
/*!***********************************!*\
  !*** ./src/components/Footer.jsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Footer = /*#__PURE__*/function (_Component) {
  _inherits(Footer, _Component);

  var _super = _createSuper(Footer);

  function Footer() {
    _classCallCheck(this, Footer);

    return _super.apply(this, arguments);
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "font-italic"
      }, "The information you obtain at this site is not, nor is it intended to be, legal advice. The people who create and maintain this web site are not attorneys and the information here does not create an attorney client relationship. While we make every effort to remain up to date and comprehensive, the information provided is for informational purposes only and may not reflect the most current legal developments for all cases. To take legal action or to defend yourself in any individual case, you should consult an attorney for advice regarding your individual situation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\xA9 ", new Date().getFullYear(), " - CAASI From Grief to Action"));
    }
  }]);

  return Footer;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/components/Landing.jsx":
/*!************************************!*\
  !*** ./src/components/Landing.jsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../routes */ "./src/routes.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var Landing = /*#__PURE__*/function (_Component) {
  _inherits(Landing, _Component);

  var _super = _createSuper(Landing);

  function Landing() {
    _classCallCheck(this, Landing);

    return _super.apply(this, arguments);
  }

  _createClass(Landing, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron",
        style: {
          backgroundImage: "url(https://i.imgur.com/jj0eBl5.jpg)",
          backgroundSize: "100%",
          paddingTop: "60px",
          paddingBottom: "90px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
        src: "/static/app/img/CAASI2.png",
        style: {
          width: "55px",
          paddingBottom: "14px",
          opacity: 0.9
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
        style: {
          color: "white"
        }
      }, "ACPP"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4",
        style: {
          borderTop: "1px solid white"
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead",
        style: {
          color: "white"
        }
      }, "Allegheny County Policing Project")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron",
        style: {
          backgroundColor: "white",
          paddingTop: "20px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "What does our tool do?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "Our tool allows researchers to explore police union contracts more easily for information, and helps citizens to find resources near them and learn more about the process of filing a misconduct complaint."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
        className: "btn btn-secondary float-right",
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.about,
        role: "button"
      }, "Learn more")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron",
        style: {
          backgroundColor: "white",
          paddingTop: "20px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "How can it help?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "With a more widespread understanding of these police union contracts, we can help break down the barriers they pose to holding police offers accountable for misconduct and misconduct investigation processes. This can help those considering filing a police misconduct complaint understand more about how the process works and what it means for them if they choose to do so."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
        className: "btn btn-secondary float-right",
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.about,
        role: "button"
      }, "Learn more")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.researchers
      }, "Researchers: search and compare police union contracts")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "Search our database of police contracts by keyword or by city.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "jumbotron"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.citizens
      }, "Citizens: learn about the process of filing a misconduct complaint")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "lead"
      }, "Learn about the stages of filing a complaint and find links to resources for your city.")));
    }
  }]);

  return Landing;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (Landing);

/***/ }),

/***/ "./src/components/Location.jsx":
/*!*************************************!*\
  !*** ./src/components/Location.jsx ***!
  \*************************************/
/***/ (function() {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/yong8/Workspace/g2a-website/PPUC/frontend/src/components/Location.jsx: Unterminated JSX contents (179:12)\n\n\u001b[0m \u001b[90m 177 |\u001b[39m           )}\u001b[0m\n\u001b[0m \u001b[90m 178 |\u001b[39m         \u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mdiv\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 179 |\u001b[39m       \u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mdiv\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     |\u001b[39m             \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 180 |\u001b[39m     )\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 181 |\u001b[39m   }\u001b[0m\n\u001b[0m \u001b[90m 182 |\u001b[39m }\u001b[0m\n    at Object._raise (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:776:17)\n    at Object.raiseWithData (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:769:17)\n    at Object.raise (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:737:17)\n    at Object.jsxReadToken (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:4418:20)\n    at Object.getTokenFromCode (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:4804:19)\n    at Object.nextToken (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:7970:12)\n    at Object.next (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:7900:10)\n    at Object.eat (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:7905:12)\n    at Object.expect (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:9169:10)\n    at Object.jsxParseClosingElementAt (/Users/yong8/Workspace/g2a-website/PPUC/frontend/node_modules/@babel/parser/lib/index.js:4702:10)");

/***/ }),

/***/ "./src/components/Navbar.jsx":
/*!***********************************!*\
  !*** ./src/components/Navbar.jsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../routes */ "./src/routes.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var Navbar = /*#__PURE__*/function (_Component) {
  _inherits(Navbar, _Component);

  var _super = _createSuper(Navbar);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _super.apply(this, arguments);
  }

  _createClass(Navbar, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "container"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "navbar navbar-expand-lg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.home,
        className: "navbar-brand",
        style: {
          fontWeight: "bold"
        }
      }, "ACPP"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "button",
        className: "navbar-toggler navbar-light",
        "data-toggle": "collapse",
        "data-target": ".navbar-collapse"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "navbar-toggler-icon"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "navbar-collapse collapse"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
        className: "navbar-nav"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "nav-item nav-link"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.researchers
      }, "Researchers")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "nav-item nav-link"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.citizens
      }, "Citizens")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "nav-item nav-link"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.about
      }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "nav-item nav-link"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
        to: _routes__WEBPACK_IMPORTED_MODULE_1__.default.contact
      }, "Contact Us"))))));
    }
  }]);

  return Navbar;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (Navbar);

/***/ }),

/***/ "./src/components/ResearcherResult.jsx":
/*!*********************************************!*\
  !*** ./src/components/ResearcherResult.jsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-highlight-words */ "./node_modules/react-highlight-words/dist/main.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_highlight_words__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../routes */ "./src/routes.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








var ResearcherResultSentence = /*#__PURE__*/function (_Component) {
  _inherits(ResearcherResultSentence, _Component);

  var _super = _createSuper(ResearcherResultSentence);

  function ResearcherResultSentence(props) {
    var _this;

    _classCallCheck(this, ResearcherResultSentence);

    _this = _super.call(this, props);
    _this.state = {
      expanded: false
    };
    _this.handleExpandedToggle = _this.handleExpandedToggle.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ResearcherResultSentence, [{
    key: "handleExpandedToggle",
    value: function handleExpandedToggle() {
      if (this.props.collapsable) {
        this.setState({
          expanded: !this.state.expanded
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "".concat(!this.state.expanded && this.props.collapsable ? "text-truncate" : ""),
        onClick: function onClick() {
          return _this2.handleExpandedToggle();
        }
      }, this.props.collapsable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "".concat(!this.state.expanded ? "" : "d-none")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faChevronRight
      }), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "".concat(!this.state.expanded ? "d-none" : "")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faChevronDown
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_highlight_words__WEBPACK_IMPORTED_MODULE_1___default()), {
        highlightClassName: "font-weight-bold px-0 bg-transparent",
        searchWords: this.props.searchQueryWords,
        autoEscape: true,
        textToHighlight: this.props.sentence.text
      }));
    }
  }]);

  return ResearcherResultSentence;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

var ResearcherResult = /*#__PURE__*/function (_Component2) {
  _inherits(ResearcherResult, _Component2);

  var _super2 = _createSuper(ResearcherResult);

  function ResearcherResult() {
    _classCallCheck(this, ResearcherResult);

    return _super2.apply(this, arguments);
  }

  _createClass(ResearcherResult, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row mb-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
        to: "".concat(_routes__WEBPACK_IMPORTED_MODULE_3__.default.location, "/").concat(this.props.result.id)
      }, this.props.result.name))), this.props.result.sentences.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "text-center"
      }, "There are no contract sentences available for this city yet.")), this.props.result.sentences.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-12 contract-highlight-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResearcherResultSentence, {
        searchQueryWords: this.props.searchQueryWords,
        sentence: {
          text: this.props.result.sentences.slice(0, 3).map(function (s) {
            return s.text;
          }).join("\n")
        },
        key: this.props.result.sentences[0].id,
        collapsable: false
      }), this.props.result.sentences.length - 3 > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "text-decoration-none float-right",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        href: "#sentences".concat(this.props.result.id),
        "aria-controls": "sentences".concat(this.props.result.id)
      }, this.props.result.sentences.length - 3, " more sentences")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-12 collapse",
        id: "sentences".concat(this.props.result.id)
      }, this.props.result.sentences.slice(3).map(function (sentence) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResearcherResultSentence, {
          searchQueryWords: _this3.props.searchQueryWords,
          sentence: sentence,
          key: sentence.id,
          collapsable: true
        });
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4 border-top border-light-gray"
      }));
    }
  }]);

  return ResearcherResult;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (ResearcherResult);

/***/ }),

/***/ "./src/components/Researchers.jsx":
/*!****************************************!*\
  !*** ./src/components/Researchers.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var scroll_to_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scroll-to-element */ "./node_modules/scroll-to-element/index.js");
/* harmony import */ var scroll_to_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(scroll_to_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _libs_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../libs/api */ "./src/libs/api.js");
/* harmony import */ var _libs_researcher_search_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../libs/researcher_search_lang */ "./src/libs/researcher_search_lang.js");
/* harmony import */ var _libs_researcher_search_lang__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_libs_researcher_search_lang__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../routes */ "./src/routes.js");
/* harmony import */ var _ResearcherResult__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ResearcherResult */ "./src/components/ResearcherResult.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }











var Researchers = /*#__PURE__*/function (_Component) {
  _inherits(Researchers, _Component);

  var _super = _createSuper(Researchers);

  function Researchers(props) {
    var _this;

    _classCallCheck(this, Researchers);

    _this = _super.call(this, props);
    _this.state = {
      searchQuery: "",
      searchQueryWords: [],
      searchQueryError: null,
      queryResults: null,
      filteredQueryResults: null,
      queryResultCounties: null,
      countyFilter: "null",
      currentPage: 1,
      totalPages: 1,
      pageSize: 10
    };
    _this.setPage = _this.setPage.bind(_assertThisInitialized(_this));
    _this.setPageSize = _this.setPageSize.bind(_assertThisInitialized(_this));
    _this.setSearchQuery = _this.setSearchQuery.bind(_assertThisInitialized(_this));
    _this.setCountyFilter = _this.setCountyFilter.bind(_assertThisInitialized(_this));
    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Researchers, [{
    key: "setPage",
    value: function setPage(newPage) {
      this.setState({
        currentPage: newPage
      }); // scroll to top

      scroll_to_element__WEBPACK_IMPORTED_MODULE_2__("#results");
    }
  }, {
    key: "setPageSize",
    value: function setPageSize(newPageSize) {
      newPageSize = parseInt(newPageSize);
      this.setState({
        pageSize: newPageSize,
        totalPages: Math.ceil(this.state.filteredQueryResults.length / newPageSize),
        currentPage: 1
      });
    }
  }, {
    key: "setSearchQuery",
    value: function setSearchQuery(newQuery, autoSearch) {
      var _this2 = this;

      this.setState({
        searchQuery: newQuery
      }, function () {
        return autoSearch ? _this2.handleSearch() : null;
      });
    }
  }, {
    key: "setCountyFilter",
    value: function setCountyFilter(county) {
      if (county) {
        if (county === "All") {
          this.setState({
            filteredQueryResults: this.state.queryResults,
            countyFilter: "null",
            currentPage: 1,
            totalPages: Math.ceil(this.state.queryResults.length / this.state.pageSize)
          });
        } else {
          // filter down to current county
          var filteredResults = this.state.queryResults.filter(function (a) {
            return a.name === county;
          });
          this.setState({
            filteredQueryResults: filteredResults,
            countyFilter: county,
            currentPage: 1,
            totalPages: Math.ceil(filteredResults.length / this.state.pageSize)
          });
        }
      } else {
        // disable filter
        this.setState({
          filteredQueryResults: this.state.queryResults,
          countyFilter: "null",
          currentPage: 1,
          totalPages: Math.ceil(this.state.queryResults.length / this.state.pageSize)
        });
      }
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(event) {
      var _this3 = this;

      if (event) {
        event.preventDefault();
      } // parse query


      try {
        var getQueryWords = function getQueryWords(query) {
          if (typeof query === "string") {
            return [query];
          } else {
            return getQueryWords(query["operand1"]).concat(getQueryWords(query["operand2"]));
          }
        };

        var searchQuery = _libs_researcher_search_lang__WEBPACK_IMPORTED_MODULE_5___default().parse(this.state.searchQuery); // parse down to just the words being searched for, for highlighting

        var searchQueryWords = getQueryWords(searchQuery["query"]);
        _libs_api__WEBPACK_IMPORTED_MODULE_4__.default.getResearcherSearchResults(searchQuery).then(function (resp) {
          // sort based on city name
          resp.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }

            if (a.name > b.name) {
              return 1;
            }

            return 0;
          }); // parse states out

          var respCounties = _toConsumableArray(new Set(resp.map(function (a) {
            return a.name;
          })));

          _this3.setState({
            queryResults: resp,
            filteredQueryResults: resp,
            queryResultCounties: respCounties,
            searchQueryError: null,
            searchQueryWords: searchQueryWords,
            countyFilter: "null",
            totalPages: Math.ceil(resp.length / _this3.state.pageSize)
          });
        }); // set search query param

        this.props.history.push({
          pathname: _routes__WEBPACK_IMPORTED_MODULE_6__.default.researchers,
          search: "?" + new URLSearchParams({
            search: this.state.searchQuery
          }).toString()
        });
      } catch (err) {
        if (err instanceof (_libs_researcher_search_lang__WEBPACK_IMPORTED_MODULE_5___default().SyntaxError)) {
          this.setState({
            searchQueryError: err
          });
        } else {
          throw err;
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var queryParams = query_string__WEBPACK_IMPORTED_MODULE_1__.parse(this.props.location.search); // if search already set, use it

      if (queryParams.search) {
        this.setSearchQuery(queryParams.search, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "row mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-lg-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-6 offset-md-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this4.handleSearch(e);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
        type: "text",
        className: "form-control input-lg ".concat(this.state.searchQueryError ? "border-danger" : ""),
        placeholder: "Search Query...",
        value: this.state.searchQuery,
        onChange: function onChange(event) {
          return _this4.setSearchQuery(event.target.value, false);
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "input-group-append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        className: "btn btn-outline-primary",
        type: "submit"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__.faSearch
      })))), this.state.searchQueryError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "text-danger text-center"
      }, "This search query is invalid")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-lg-12 mt-1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-6 offset-md-3 small text-secondary"
      }, "e.g., interview AND review"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-6 offset-md-3 mt-2 text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "btn-group",
        role: "group",
        "aria-label": "..."
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this4.setSearchQuery("time limit", true);
        },
        className: "ex-keyword btn btn-info btn-rounded mr-2"
      }, "time limit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this4.setSearchQuery("discipline", true);
        },
        className: "ex-keyword btn btn-info btn-rounded mr-2"
      }, "discipline"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this4.setSearchQuery("false arrest", true);
        },
        className: "ex-keyword btn btn-info btn-rounded mr-2"
      }, "false arrest"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this4.setSearchQuery("destroy", true);
        },
        className: "ex-keyword btn btn-info btn-rounded mr-2"
      }, "destory"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this4.setSearchQuery("release", true);
        },
        className: "ex-keyword btn btn-info btn-rounded mr-2"
      }, "release"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return _this4.setSearchQuery("subpoena", true);
        },
        className: "ex-keyword btn btn-info btn-rounded"
      }, "subpoena")))), this.state.filteredQueryResults && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-lg-12"
      }, this.state.queryResultCounties && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-lg-12 mt-3 row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
        className: "custom-select",
        value: this.state.countyFilter,
        onChange: function onChange(e) {
          return _this4.setCountyFilter(e.target.value);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
        value: "null",
        disabled: true
      }, "Filter by Municipality"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
        key: "All"
      }, "All"), this.state.queryResultCounties.map(function (result) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
          key: result
        }, result);
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "input-group-append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        className: "btn btn-outline-secondary",
        type: "button",
        onClick: function onClick() {
          return _this4.setCountyFilter();
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__.faTimes
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-md-3 offset-md-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
        className: "custom-select",
        defaultValue: "null",
        onChange: function onChange(e) {
          return _this4.setPageSize(e.target.value);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
        value: "null",
        disabled: true
      }, "Results per Page"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
        value: "10"
      }, "10"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
        value: "20"
      }, "20"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
        value: "50"
      }, "50"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
        value: "100"
      }, "100")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-lg-12 mt-3",
        id: "results"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Results"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
        className: "my-4 border-top border-secondary"
      }), this.state.queryResults && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", null, this.state.filteredQueryResults.length, " Results found!"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-lg-12 mt-3"
      }, this.state.filteredQueryResults.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "text-center lead"
      }, "Sorry, it appears there are no results for this search!"), this.state.filteredQueryResults.slice(this.state.pageSize * (this.state.currentPage - 1), this.state.pageSize * this.state.currentPage).map(function (result) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ResearcherResult__WEBPACK_IMPORTED_MODULE_7__.default, {
          result: result,
          searchQueryWords: _this4.state.searchQueryWords,
          key: result.id
        });
      }), this.state.filteredQueryResults.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-lg-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {
        "aria-label": "Result navigation"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
        className: "pagination justify-content-center"
      }, this.state.currentPage - 1 > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "page-link",
        "aria-label": "Previous",
        onClick: function onClick() {
          return _this4.setPage(_this4.state.currentPage - 1);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        "aria-hidden": "true"
      }, "\xAB"))), this.state.currentPage - 2 > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "page-item",
        onClick: function onClick() {
          return _this4.setPage(_this4.state.currentPage - 2);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "page-link"
      }, this.state.currentPage - 2)), this.state.currentPage - 1 > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "page-item",
        onClick: function onClick() {
          return _this4.setPage(_this4.state.currentPage - 1);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "page-link"
      }, this.state.currentPage - 1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "page-item active"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "page-link"
      }, this.state.currentPage)), this.state.currentPage + 1 <= this.state.totalPages && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "page-item",
        onClick: function onClick() {
          return _this4.setPage(_this4.state.currentPage + 1);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "page-link"
      }, this.state.currentPage + 1)), this.state.currentPage + 2 <= this.state.totalPages && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "page-item",
        onClick: function onClick() {
          return _this4.setPage(_this4.state.currentPage + 2);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "page-link"
      }, this.state.currentPage + 2)), this.state.currentPage + 1 <= this.state.totalPages && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "page-item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        className: "page-link",
        "aria-label": "Next",
        onClick: function onClick() {
          return _this4.setPage(_this4.state.currentPage + 1);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        "aria-hidden": "true"
      }, "\xBB")))))))));
    }
  }]);

  return Researchers;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ __webpack_exports__["default"] = (Researchers);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/stable */ "./node_modules/core-js/stable/index.js");
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_stable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_polyfills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/polyfills */ "./src/libs/polyfills.js");
/* harmony import */ var _libs_polyfills__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_polyfills__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/components/App.jsx");
// handle all polyfills for browsers

 // start react



/***/ }),

/***/ "./src/libs/api.js":
/*!*************************!*\
  !*** ./src/libs/api.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var toJSON = function toJSON(resp) {
  return resp.json();
};

var Api = {
  BASE_PATH: "/PxPUC",
  ENDPOINTS: {
    getLocations: function getLocations() {
      return "".concat(Api.BASE_PATH, "/locations");
    },
    getLocation: function getLocation(lid) {
      return "".concat(Api.BASE_PATH, "/location/").concat(lid);
    },
    getLocationContract: function getLocationContract(lid) {
      return "".concat(Api.BASE_PATH, "/location/").concat(lid, "/contract");
    },
    getLocationContractFile: function getLocationContractFile(lid, format) {
      return "".concat(Api.BASE_PATH, "/location/").concat(lid, "/contract/download?format=").concat(format);
    },
    getLocationQuestions: function getLocationQuestions(lid) {
      return "".concat(Api.BASE_PATH, "/location/").concat(lid, "/questions");
    },
    getLocationProblematicSentences: function getLocationProblematicSentences(lid) {
      return "".concat(Api.BASE_PATH, "/location/").concat(lid, "/problematic-sentences");
    },
    getLocationGlossary: function getLocationGlossary(lid) {
      return "".concat(Api.BASE_PATH, "/location/").concat(lid, "/glossary");
    },
    getLocationStages: function getLocationStages(lid) {
      return "".concat(Api.BASE_PATH, "/location/").concat(lid, "/stages");
    },
    getResearcherSearchResults: function getResearcherSearchResults(query) {
      return "".concat(Api.BASE_PATH, "/researcher?query=").concat(JSON.stringify(query));
    }
  },
  getLocations: function getLocations() {
    return fetch(Api.ENDPOINTS.getLocations()).then(toJSON);
  },
  getLocation: function getLocation(lid) {
    return fetch(Api.ENDPOINTS.getLocation(lid)).then(toJSON);
  },
  getLocationContract: function getLocationContract(lid) {
    return fetch(Api.ENDPOINTS.getLocationContract(lid)).then(toJSON);
  },
  getLocationContractFile: function getLocationContractFile(lid, format) {
    return fetch(Api.ENDPOINTS.getLocationContractFile(lid, format));
  },
  getLocationQuestions: function getLocationQuestions(lid) {
    return fetch(Api.ENDPOINTS.getLocationQuestions(lid)).then(toJSON);
  },
  getLocationProblematicSentences: function getLocationProblematicSentences(lid) {
    return fetch(Api.ENDPOINTS.getLocationProblematicSentences(lid)).then(toJSON);
  },
  getLocationGlossary: function getLocationGlossary(lid) {
    return fetch(Api.ENDPOINTS.getLocationGlossary(lid)).then(toJSON);
  },
  getLocationStages: function getLocationStages(lid) {
    return fetch(Api.ENDPOINTS.getLocationStages(lid)).then(toJSON);
  },
  getResearcherSearchResults: function getResearcherSearchResults(query) {
    return fetch(Api.ENDPOINTS.getResearcherSearchResults(query)).then(toJSON);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Api);

/***/ }),

/***/ "./src/libs/polyfills.js":
/*!*******************************!*\
  !*** ./src/libs/polyfills.js ***!
  \*******************************/
/***/ (function() {

// children polyfill for IE11
(function (constructor) {
  if (constructor && constructor.prototype && constructor.prototype.children == null) {
    Object.defineProperty(constructor.prototype, "children", {
      get: function get() {
        var i = 0,
            node,
            nodes = this.childNodes,
            children = []; //iterate all childNodes

        while (node = nodes[i++]) {
          //remenber those, that are Node.ELEMENT_NODE (1)
          if (node.nodeType === 1) {
            children.push(node);
          }
        }

        return children;
      }
    });
  } //apply the fix to all HTMLElements (window.Element) and to SVG/XML (window.Node)

})(window.Node || window.Element);

/***/ }),

/***/ "./src/libs/researcher_search_lang.js":
/*!********************************************!*\
  !*** ./src/libs/researcher_search_lang.js ***!
  \********************************************/
/***/ (function(module) {

"use strict";
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */


function peg$subclass(child, parent) {
  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message = message;
  this.expected = expected;
  this.found = found;
  this.location = location;
  this.name = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function (expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function literal(expectation) {
      return '"' + literalEscape(expectation.text) + '"';
    },
    "class": function _class(expectation) {
      var escapedParts = "",
          i;

      for (i = 0; i < expectation.parts.length; i++) {
        escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
      }

      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },
    any: function any(expectation) {
      return "any character";
    },
    end: function end(expectation) {
      return "end of input";
    },
    other: function other(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return "\\x" + hex(ch);
    });
  }

  function classEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return "\\x" + hex(ch);
    });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i,
        j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }

      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? '"' + literalEscape(found) + '"' : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},
      peg$startRuleFunctions = {
    S: peg$parseS
  },
      peg$startRuleFunction = peg$parseS,
      peg$c0 = function peg$c0(exprQ) {
    return {
      query: exprQ
    };
  },
      peg$c1 = " and ",
      peg$c2 = peg$literalExpectation(" and ", true),
      peg$c3 = " or ",
      peg$c4 = peg$literalExpectation(" or ", true),
      peg$c5 = '"',
      peg$c6 = peg$literalExpectation('"', false),
      peg$c7 = function peg$c7(exprQOP, exprQ) {
    return {
      operation: "OR",
      operand1: exprQOP,
      operand2: exprQ
    };
  },
      peg$c8 = function peg$c8(exprQOP, exprQ) {
    return {
      operation: "AND",
      operand1: exprQOP,
      operand2: exprQ
    };
  },
      peg$c9 = " ",
      peg$c10 = peg$literalExpectation(" ", false),
      peg$c11 = function peg$c11() {
    return text();
  },
      peg$c12 = /^[A-Za-z0-9'.!?]/,
      peg$c13 = peg$classExpectation([["A", "Z"], ["a", "z"], ["0", "9"], "'", ".", "!", "?"], false, false),
      peg$currPos = 0,
      peg$savedPos = 0,
      peg$posDetailsCache = [{
    line: 1,
    column: 1
  }],
      peg$maxFailPos = 0,
      peg$maxFailExpected = [],
      peg$silentFails = 0,
      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + '".');
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location);
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return {
      type: "literal",
      text: text,
      ignoreCase: ignoreCase
    };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return {
      type: "class",
      parts: parts,
      inverted: inverted,
      ignoreCase: ignoreCase
    };
  }

  function peg$anyExpectation() {
    return {
      type: "any"
    };
  }

  function peg$endExpectation() {
    return {
      type: "end"
    };
  }

  function peg$otherExpectation(description) {
    return {
      type: "other",
      description: description
    };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos],
        p;

    if (details) {
      return details;
    } else {
      p = pos - 1;

      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails = peg$computePosDetails(endPos);
    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
  }

  function peg$parseS() {
    var s0, s1;
    s0 = peg$currPos;
    s1 = peg$parseQ();

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }

    s0 = s1;
    return s0;
  }

  function peg$parseQ() {
    var s0;
    s0 = peg$parseQOR();

    if (s0 === peg$FAILED) {
      s0 = peg$parseQAND();

      if (s0 === peg$FAILED) {
        s0 = peg$parsePP();

        if (s0 === peg$FAILED) {
          s0 = peg$parseP();
        }
      }
    }

    return s0;
  }

  function peg$parseAND() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c1) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c2);
      }
    }

    return s0;
  }

  function peg$parseOR() {
    var s0;

    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c3) {
      s0 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c4);
      }
    }

    return s0;
  }

  function peg$parseESC() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 34) {
      s0 = peg$c5;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c6);
      }
    }

    return s0;
  }

  function peg$parseQOR() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parseQOP();

    if (s1 !== peg$FAILED) {
      s2 = peg$parseOR();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseQ();

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c7(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseQAND() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parseQOP();

    if (s1 !== peg$FAILED) {
      s2 = peg$parseAND();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseQ();

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseQOP() {
    var s0;
    s0 = peg$parsePP();

    if (s0 === peg$FAILED) {
      s0 = peg$parseP();
    }

    return s0;
  }

  function peg$parsePP() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$parseESC();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parseP();

      if (s4 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s5 = peg$c9;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parseP();

        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s5 = peg$c9;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c10);
            }
          }

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parseP();

        if (s3 !== peg$FAILED) {
          s4 = peg$parseESC();

          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c11();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseP() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = [];

    if (peg$c12.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c13);
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (peg$c12.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c11();
    }

    s0 = s1;
    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  home: "/",
  researchers: "/researchers",
  citizens: "/citizens",
  about: "/about",
  contact: "/contact",
  location: "/location"
});

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = function() {};
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/index.js","vendor"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = function() {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			var executeModules = data[3];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkppuc"] = self["webpackChunkppuc"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = function() {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (function() {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	__webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=main.a9fe9392348e75adca3b.js.map