/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://signboard/./src/scss/index.scss?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar signboard_1 = __webpack_require__(/*! ./signboard */ \"./src/signboard.ts\");\r\n__webpack_require__(/*! ./scss/index.scss */ \"./src/scss/index.scss\");\r\nvar appInit = function () {\r\n    var signboard = new signboard_1.Signboard();\r\n    var applyButton = document.getElementById(\"applyButton\");\r\n    var clearButton = document.getElementById(\"clearButton\");\r\n    applyButton.addEventListener(\"click\", signboard.ApplyButtonClick, false);\r\n    clearButton.addEventListener(\"click\", signboard.ClearText, false);\r\n    window.onresize = signboard.SetPosition;\r\n    document.body.onclick = signboard.SwitchPanel;\r\n    signboard.LoadText();\r\n};\r\nwindow.onload = appInit;\r\n\n\n//# sourceURL=webpack://signboard/./src/app.ts?");

/***/ }),

/***/ "./src/signboard.ts":
/*!**************************!*\
  !*** ./src/signboard.ts ***!
  \**************************/
/*! flagged exports */
/*! export Signboard [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Signboard = void 0;\r\n/**\r\n * サインボードクラス\r\n */\r\nvar Signboard = /** @class */ (function () {\r\n    // -------------------------------------\r\n    // 構築・消滅\r\n    // -------------------------------------\r\n    function Signboard() {\r\n        this.displayPanel = document.getElementById(\"displayPanel\");\r\n        this.controlPanel = document.getElementById(\"controlPanel\");\r\n        this.textBox = document.getElementById(\"textBox\");\r\n        this.controlPanel.onclick = function (event) { return event.cancelBubble = true; };\r\n    }\r\n    // -------------------------------------\r\n    // パブリックメソッド\r\n    // -------------------------------------\r\n    /**\r\n     * 「表示」ボタンが押下された時に呼び出されるメソッド\r\n     * @param event イベント\r\n     */\r\n    Signboard.prototype.ApplyButtonClick = function (event) {\r\n        var text = this.textBox.value;\r\n    };\r\n    /**\r\n     * 入力されたメッセージを消去する\r\n     */\r\n    Signboard.prototype.ClearText = function () {\r\n        this.displayPanel.textContent = \"\";\r\n    };\r\n    /**\r\n     * メッセージの表示位置を設定する\r\n     */\r\n    Signboard.prototype.SetPosition = function () {\r\n        var bodyHeight = document.body.clientHeight;\r\n        var divHeight = this.displayPanel.clientHeight;\r\n        this.displayPanel.style.top = (bodyHeight - divHeight) / 2 + \"px\";\r\n    };\r\n    /**\r\n     * 操作用領域の表示・非表示を切り替える\r\n     */\r\n    Signboard.prototype.SwitchPanel = function () {\r\n        var visibility = this.controlPanel.style.visibility;\r\n        this.controlPanel.style.visibility = visibility === \"hidden\"\r\n            ? \"visible\"\r\n            : \"hidden\";\r\n    };\r\n    /**\r\n     * 保存したメッセージを読み込む\r\n     * @returns\r\n     */\r\n    Signboard.prototype.LoadText = function () {\r\n        var storage = localStorage;\r\n        if (typeof storage === \"undefined\") {\r\n            return;\r\n        }\r\n        var text = storage.getItem(\"text\");\r\n        if (!text) {\r\n            return;\r\n        }\r\n        this.SetText(text);\r\n    };\r\n    // -------------------------------------\r\n    // プライベートメソッド\r\n    // -------------------------------------\r\n    /**\r\n     * 指定されたメッセージをローカルストレージに保存する\r\n     * @param text 対象のメッセージ\r\n     * @returns\r\n     */\r\n    Signboard.prototype.SaveText = function (text) {\r\n        var storage = localStorage;\r\n        if (typeof storage === \"undefined\") {\r\n            return;\r\n        }\r\n        storage.setItem(\"text\", text);\r\n    };\r\n    /**\r\n     * 指定された文字列を画面に表示する\r\n     * @param text 対象の文字列\r\n     */\r\n    Signboard.prototype.SetText = function (text) {\r\n        this.displayPanel.textContent = text;\r\n        this.displayPanel.style.fontSize = this.GetFontSize(text);\r\n        this.SetPosition();\r\n        this.SwitchPanel();\r\n    };\r\n    /**\r\n     * 指定された文字列に合う文字サイズを取得する\r\n     * @param text 対象の文字列\r\n     * @returns 文字サイズ\r\n     */\r\n    Signboard.prototype.GetFontSize = function (text) {\r\n        if (text.length < 6) {\r\n            return \"72px\";\r\n        }\r\n        if (text.length < 11) {\r\n            return \"48px\";\r\n        }\r\n        return \"36px\";\r\n    };\r\n    return Signboard;\r\n}());\r\nexports.Signboard = Signboard;\r\n\n\n//# sourceURL=webpack://signboard/./src/signboard.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;