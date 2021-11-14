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

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ts_sample_project/./src/scss/index.scss?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/*! CommonJS bailout: this is used directly at 11:19-23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n__webpack_require__(/*! ./scss/index.scss */ \"./src/scss/index.scss\");\r\n/**\r\n * 7 の数に応じて加算されるポイントの一覧\r\n */\r\nvar POINT_LIST = {\r\n    0: 0,\r\n    1: 5,\r\n    2: 20,\r\n    3: 100\r\n};\r\n/**\r\n * スピン実行最大回数\r\n */\r\nvar SPIN_MAX_COUNT = 20;\r\n/**\r\n * メッセージエリアにデフォルトで出す文字列\r\n */\r\nvar DEFALT_MESSAGE = 'スピンして 7 が出たらポイントゲット！';\r\n/**\r\n * 指定された時間、処理をストップさせる関数\r\n * @param ms 停止したい時間（ミリ秒）\r\n * @returns なし\r\n */\r\nvar sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };\r\n/**\r\n * スピン要素の文字色を赤色に変更する関数\r\n * @param spins スピン要素群\r\n */\r\nvar setSpinFontColorRed = function (spins) {\r\n    spins.forEach(function (spin) { return spin.style.color = 'red'; });\r\n};\r\n// const setSpinFontColorRed2 = (...spins: HTMLSpanElement[]) => {\r\n//     for (const spin of spins) {\r\n//         spin.style.color = 'red';\r\n//     }\r\n// };\r\n/**\r\n * スピン要素の文字色を金色に変更する関数\r\n * @param spins スピン要素群\r\n */\r\nvar setSpinFontColorGold = function (spins) {\r\n    spins.forEach(function (spin) { return spin.style.color = 'gold'; });\r\n};\r\n// const setSpinFontColorGold2 = (...spins: HTMLSpanElement[]) => {\r\n//     for (const spin of spins) {\r\n//         spin.style.color = 'gold';\r\n//     }\r\n// };\r\n/**\r\n * スピン要素にセットされた 7 の数をカウントする関数\r\n * @param spins スピン要素群\r\n * @returns 7 のカウント数\r\n */\r\nvar countNumberOfSeven = function (spins) {\r\n    var spinArray = Array.from(spins);\r\n    return spinArray.reduce(function (acc, spin) { return Number(spin.textContent) === 7 ? acc + 1 : acc; }, 0);\r\n};\r\n// const countNumberOfSeven2 = (...spins: HTMLSpanElement[]): number => {\r\n//     return spins.reduce((acc, spin) => Number(spin.textContent) === 7 ? acc + 1 : acc, 0);\r\n// };\r\n/**\r\n * コイン画像の表示 ON / OFF を切り替える関数\r\n * @param imgCoin コイン画像表示要素\r\n */\r\nvar toggleCoinImageOnOff = function (imgCoin) {\r\n    var isVisible = imgCoin.style.visibility === 'visible';\r\n    imgCoin.style.visibility = !isVisible ? 'visible' : 'hidden';\r\n};\r\nvar reset = function (elements) {\r\n    // リセット\r\n    elements.messageArea.textContent = DEFALT_MESSAGE;\r\n    elements.remainingCount.textContent = SPIN_MAX_COUNT.toString();\r\n    elements.score.textContent = '0';\r\n    elements.btnSpin.disabled = false;\r\n    elements.btnStop.disabled = true;\r\n    elements.btnReset.disabled = true;\r\n    elements.imgCoin.style.visibility = 'hidden';\r\n    elements.spins.forEach(function (spin) { return spin.textContent = \"\"; });\r\n};\r\nvar appInit = function () {\r\n    // メッセージ表示エリア\r\n    var messageArea = document.getElementById('messageArea');\r\n    // スピン要素\r\n    // const spin1 = <HTMLSpanElement>document.getElementById('spin1');\r\n    // const spin2 = <HTMLSpanElement>document.getElementById('spin2');\r\n    // const spin3 = <HTMLSpanElement>document.getElementById('spin3');\r\n    var spins = document.querySelectorAll(\".spinLabel\");\r\n    // スピン残回数表示要素\r\n    var remainingCount = document.getElementById('remainingCount');\r\n    // スコア表示要素\r\n    var score = document.getElementById('score');\r\n    // コイン画像表示要素\r\n    var imgCoin = document.getElementById('imgCoin');\r\n    // 「スピン」ボタン\r\n    var btnSpin = document.getElementById('btnSpin');\r\n    // 「ストップ」ボタン\r\n    var btnStop = document.getElementById('btnStop');\r\n    // 「リセット」ボタン\r\n    var btnReset = document.getElementById('btnReset');\r\n    var spinInterval = null;\r\n    btnSpin.addEventListener('click', function () {\r\n        btnSpin.disabled = true;\r\n        btnStop.disabled = false;\r\n        btnReset.disabled = true;\r\n        imgCoin.style.visibility = 'hidden';\r\n        // スピン要素の文字色を金色に変更する\r\n        setSpinFontColorGold(spins);\r\n        spinInterval = setInterval(function () {\r\n            spins.forEach(function (spin) {\r\n                var rnd = Math.floor(Math.random() * 9);\r\n                spin.textContent = rnd.toString();\r\n            });\r\n            // const rnd1 = Math.floor(Math.random() * 9);\r\n            // const rnd2 = Math.floor(Math.random() * 9);\r\n            // const rnd3 = Math.floor(Math.random() * 9);\r\n            // spin1.textContent = rnd1.toString();\r\n            // spin2.textContent = rnd2.toString();\r\n            // spin3.textContent = rnd3.toString();\r\n        }, 10);\r\n    });\r\n    btnStop.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {\r\n        var numberOfSeven, addPoint, currentScore, currentRemainingCount, i;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    btnStop.disabled = true;\r\n                    if (spinInterval) {\r\n                        clearInterval(spinInterval);\r\n                    }\r\n                    numberOfSeven = countNumberOfSeven(spins);\r\n                    addPoint = POINT_LIST[numberOfSeven];\r\n                    currentScore = Number(score.textContent);\r\n                    // 合計スコアを更新する\r\n                    score.textContent = (currentScore + addPoint).toString();\r\n                    currentRemainingCount = Number(remainingCount.textContent);\r\n                    // 残り回数を 1 減らす\r\n                    remainingCount.textContent = (currentRemainingCount - 1).toString();\r\n                    if (numberOfSeven === 3) {\r\n                        // スピン要素が 3 つとも 7 だった場合、文字色を赤に変更する\r\n                        setSpinFontColorRed(spins);\r\n                    }\r\n                    if (!(numberOfSeven > 0)) return [3 /*break*/, 4];\r\n                    i = 0;\r\n                    _a.label = 1;\r\n                case 1:\r\n                    if (!(i <= 6)) return [3 /*break*/, 4];\r\n                    // setTimeout(toggleCoinImageOnOff, 100, imgCoin);\r\n                    return [4 /*yield*/, sleep(100)];\r\n                case 2:\r\n                    // setTimeout(toggleCoinImageOnOff, 100, imgCoin);\r\n                    _a.sent();\r\n                    toggleCoinImageOnOff(imgCoin);\r\n                    _a.label = 3;\r\n                case 3:\r\n                    i++;\r\n                    return [3 /*break*/, 1];\r\n                case 4:\r\n                    btnReset.disabled = false;\r\n                    if (currentRemainingCount === 1) {\r\n                        // 現在の残り回数が 1 だった場合は、ゲーム終了とする\r\n                        messageArea.textContent = \"\\u3042\\u306A\\u305F\\u306E\\u6700\\u7D42\\u30B9\\u30B3\\u30A2\\u306F \" + score.textContent + \" \\u30DD\\u30A4\\u30F3\\u30C8\\u3067\\u3059\\uFF01\";\r\n                        return [2 /*return*/];\r\n                    }\r\n                    btnSpin.disabled = false;\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    }); });\r\n    var elements = {\r\n        messageArea: messageArea,\r\n        spins: spins,\r\n        remainingCount: remainingCount,\r\n        score: score,\r\n        imgCoin: imgCoin,\r\n        btnSpin: btnSpin,\r\n        btnStop: btnStop,\r\n        btnReset: btnReset,\r\n    };\r\n    btnReset.addEventListener('click', function () {\r\n        var spinNumber = Number(remainingCount.textContent);\r\n        if (spinNumber !== 0 && !window.confirm('まだ途中ですが、リセットしてもよろしいですか？')) {\r\n            return;\r\n        }\r\n        reset(elements);\r\n    });\r\n    reset(elements);\r\n};\r\nwindow.onload = appInit;\r\n\n\n//# sourceURL=webpack://ts_sample_project/./src/app.ts?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/app.ts");
/******/ })()
;