/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IndexOutOfArrayExecption = /** @class */ (function () {
    function IndexOutOfArrayExecption(message) {
        this.message = message;
        this.name = "IndexOutOfArrayException";
    }
    return IndexOutOfArrayExecption;
}());
exports.IndexOutOfArrayExecption = IndexOutOfArrayExecption;
var ExtJsObject = /** @class */ (function () {
    function ExtJsObject(element, e_index) {
        var re;
        if (typeof (element) === "string") {
            re = document.querySelectorAll(element);
            if (e_index != undefined) {
                re = [re[e_index]];
            }
        }
        else if (element == undefined || element == document) {
            /**
             * @param {Function} toDo function that is called when the document has been loaded
             */
            this.ready = function (toDo) {
                document.addEventListener("DOMContentLoaded", toDo);
            };
            return this;
        }
        else if (typeof (element) === "object") {
            if (element.length == undefined) {
                re = [element];
            }
            else if (e_index != undefined) {
                re = [element[e_index]];
            }
            else {
                re = element;
            }
        }
        else if (element.type == "ExtJsObject") {
            return element;
        }
        else {
            return;
        }
        this.type = "ExtJsObject";
        this.node = re;
    }
    /**
     * @param {String} html HTML to put inside the element or undefined or nothing
     * @return {String|Object} HTML that is inside the first element or the current instance.
     */
    ExtJsObject.prototype.html = function (html) {
        if (html != undefined) {
            for (var i = 0; i < this.node.length; i++) {
                var e = this.node[i];
                if (typeof (html) === "string" || typeof (html) === "number") {
                    e.innerHTML = html;
                }
            }
            return this;
        }
        else {
            return this.node[0].innerHTML;
        }
    };
    /**
     * @param {String} text text to put inside the element or undefined or nothing
     * @return {String|Object} text that is inside the first element or the current instance.
     */
    ExtJsObject.prototype.text = function (text) {
        if (text != undefined) {
            for (var i = 0; i < this.node.length; i++) {
                var e = this.node[i];
                if (typeof (text) === "string" || typeof (text) === "number") {
                    e.innerText = text;
                }
            }
            return this;
        }
        else {
            return this.node[0].innerText;
        }
    };
    /**
     * @param {Function|Undefined} toDo function that is called when somebody clicks on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the click.
     */
    ExtJsObject.prototype.click = function (toDo, element) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener("click", toDo);
                }
                else {
                    e.click();
                }
            }
            else if (toDo !== undefined) {
                var x = e;
                e.addEventListener("click", function (event) {
                    if (x.querySelector(element) == event.target) {
                        var xe = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
            else {
                var x = e;
                var xe = x.querySelector(element);
                xe.click();
            }
        }
        return this;
    };
    /**
     * @param index index of the element or undefined or nothing
     * @return {Object} a DOM element
     */
    ExtJsObject.prototype.get = function (index) {
        if (index != undefined) {
            if (this.node[index] == undefined)
                throw new IndexOutOfArrayExecption("ExtJsObject.get undefined index node[" + index + "]");
            return this.node[index];
        }
        else {
            if (this.node[0] == undefined)
                throw new IndexOutOfArrayExecption("ExtJsObject.get undefined index node[0]");
            return this.node[0];
        }
    };
    /**
     * @param value the height of the element (and units (em / px / cm, etc)) or undefined or nothing
     * @return {Object|Number} Object if value != undefined and Number if value == undefined
     */
    ExtJsObject.prototype.height = function (value) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (value !== undefined) {
                e.style.height = value;
            }
            else {
                return e.offsetHeight;
            }
        }
        return this;
    };
    /**
     * @param value the width of the element (and units (em / px / cm, etc)) or undefined or nothing
     * @return {Object|Number} Object if value != undefined and Number if value == undefined
     */
    ExtJsObject.prototype.width = function (value) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (value !== undefined) {
                e.style.width = value;
            }
            else {
                return e.offsetWidth;
            }
        }
        return this;
    };
    /**
     * @param classx class to add to the classlist of the element
     * @return {Object} the current instance of ExtJs
     */
    ExtJsObject.prototype.addClass = function (classx) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            e.classList.add(classx);
        }
        return this;
    };
    /**
     * @param classx class to remove from the classlist of the element
     * @return {Object} the current instance of ExtJs
     */
    ExtJsObject.prototype.removeClass = function (classx) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            e.classList.remove(classx);
        }
        return this;
    };
    /**
     * Delete the element(s)
     */
    ExtJsObject.prototype.remove = function () {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            e.parentElement.removeChild(e);
        }
    };
    /**
     * @param element_type element to createElement
     * @return {Array} element list in an ExtJsObject
     */
    ExtJsObject.prototype.child = function (element_type) {
        var e_list = [];
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            var elem = document.createElement(element_type);
            e.appendChild(elem);
            e_list.push(elem);
        }
        return $(e_list);
    };
    /**
     * @param prop The css proprety that we want to modify.
     * @param value The value that we want to assign to that property
     * @param i the index of the element (optional)
     */
    ExtJsObject.prototype.css = function (prop, value, i) {
        var y = i;
        if (i == undefined) {
            i = 0;
        }
        if (value == undefined) {
            return this.node[i].style[prop];
        }
        else if (y != undefined) {
            this.node[i].style[prop] = value;
            return this;
        }
        else {
            for (var i_1 = 0; i_1 < this.node.length; i_1++) {
                var e = this.node[i_1];
                e.style[prop] = value;
            }
            return this;
        }
    };
    /**
     * @param attr The attribute that we want to modify
     * @param value The value that we want to assign to that atribute
     * @param i the index of the element (optional)
     */
    ExtJsObject.prototype.attr = function (attr, value, i) {
        var y = i;
        if (i == undefined) {
            i = 0;
        }
        if (value == undefined) {
            return this.node[i].getAttribute(attr);
        }
        else if (y != undefined) {
            this.node[i].style[attr] = value;
            return this;
        }
        else {
            for (var i_2 = 0; i_2 < this.node.length; i_2++) {
                var e = this.node[i_2];
                e.setAttribute(attr, value);
            }
            return this;
        }
    };
    /**
     * Returns the nearest parent of the element's
     * @param selector The selector of the nearest parent
     */
    ExtJsObject.prototype.parent = function (selector) {
        var parents = [];
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (selector == undefined) {
                parents.push(e.parentElement);
            }
            else {
                parents.push(e.closest(selector));
            }
        }
        return $(parents);
    };
    /**
     * @param {String} html Text to put inside the element or undefined or nothing
     * @return {String|Object} Text that is inside the first element or the current instance.
     */
    ExtJsObject.prototype.value = function (text) {
        if (text != undefined) {
            for (var i = 0; i < this.node.length; i++) {
                var e = this.node[i];
                if (typeof (text) === "string" || typeof (text) === "number") {
                    e.value = text;
                }
            }
            return this;
        }
        else {
            var node = this.node[0];
            return this.node[0].value;
        }
    };
    /**
     * @param {Function|Undefined} toDo function that is called when somebody keypress on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the keypress.
     */
    ExtJsObject.prototype.keypress = function (toDo, element) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener("keypress", toDo);
                }
            }
            else if (toDo !== undefined) {
                var x = e;
                e.addEventListener("keypress", function (event) {
                    if (x.querySelector(element) == event.target) {
                        var xe = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    };
    /**
     * @param {Function|Undefined} toDo function that is called when somebody input on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the input.
     */
    ExtJsObject.prototype.input = function (toDo, element) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener("input", toDo);
                }
            }
            else if (toDo !== undefined) {
                var x = e;
                e.addEventListener("input", function (event) {
                    if (x.querySelector(element) == event.target) {
                        var xe = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    };
    /**
     * @param {Function|Undefined} toDo function that is called when somebody keydown on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the keydown.
     */
    ExtJsObject.prototype.keydown = function (toDo, element) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener("keydown", toDo);
                }
            }
            else if (toDo !== undefined) {
                var x = e;
                e.addEventListener("keydown", function (event) {
                    if (x.querySelector(element) == event.target) {
                        var xe = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    };
    /**
     * @param {Function|Undefined} toDo function that is called when somebody change on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the change.
     */
    ExtJsObject.prototype.change = function (toDo, element) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener("change", toDo);
                }
            }
            else if (toDo !== undefined) {
                var x = e;
                e.addEventListener("change", function (event) {
                    if (x.querySelector(element) == event.target) {
                        var xe = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    };
    /**
     * @param {Function|Undefined} toDo function that is called when somebody keyup on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the keyup.
     */
    ExtJsObject.prototype.keyup = function (toDo, element) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener("keyup", toDo);
                }
            }
            else if (toDo !== undefined) {
                var x = e;
                e.addEventListener("keyup", function (event) {
                    if (x.querySelector(element) == event.target) {
                        var xe = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    };
    /**
     * Returns the previous sibling of an element or a set of elements
     */
    ExtJsObject.prototype.prevSibling = function () {
        var siblings = [];
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            siblings.push(e.previousSibling);
        }
        return $(siblings);
    };
    /**
     * Returns the next sibling of an element or a set of elements
     */
    ExtJsObject.prototype.nextSibling = function () {
        var siblings = [];
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            siblings.push(e.nextSibling);
        }
        return $(siblings);
    };
    /**
     * Calls a callback for each element
     */
    ExtJsObject.prototype.forEach = function (callback) {
        this.node.forEach(function (element) {
            callback.bind(element)();
        });
    };
    return ExtJsObject;
}());
exports.ExtJsObject = ExtJsObject;
var AjaxRequest = /** @class */ (function () {
    function AjaxRequest() {
    }
    /**
    * @param {String} url URL of the resource
    * @param {Function} callback function which is called when the request has been performed correctly
    * @param {Function} error_callback function which is called when the request has not been performed correctly
    */
    AjaxRequest.prototype.GET = function (url, callback, error_callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp.responseText);
            }
            else if (xhttp.readyState == 4) {
                if (error_callback != undefined) {
                    try {
                        error_callback();
                    }
                    catch (e) {
                    }
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };
    /**
    * @param {String} url URL of the resource
    * @param {Function} callback function which is called when the request has been performed correctly
    * @param {Function} error_callback function which is called when the request has not been performed correctly
    */
    AjaxRequest.prototype.DELETE = function (url, callback, error_callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp.responseText);
            }
            else if (xhttp.readyState == 4) {
                if (error_callback != undefined) {
                    try {
                        error_callback();
                    }
                    catch (e) {
                    }
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("x-http-method-override", "DELETE");
        xhttp.send();
    };
    /**
    * @param {String} url URL of the resource
    * @param {Array} data assoc array with the data that will be sent
    * @param {Function} callback function which is called when the request has been performed correctly
    * @param {Function} error_callback function which is called when the request has not been performed correctly
    */
    AjaxRequest.prototype.POST = function (url, data, callback, error_callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp.responseText);
            }
            else if (xhttp.readyState == 4) {
                if (error_callback != undefined) {
                    try {
                        error_callback();
                    }
                    catch (e) {
                    }
                }
            }
        };
        xhttp.open("POST", url, true);
        var keys = Object.keys(data);
        var d = "";
        for (var i = 0; i < keys.length; i++) {
            if (i !== 0) {
                d = d + "&";
            }
            d = d + keys[i] + "=" + data[keys[i]];
        }
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(d);
    };
    /**
    * @param {String} url URL of the resource
    * @param {Array} data assoc array with the data that will be sent
    * @param {Function} callback function which is called when the request has been performed correctly
    * @param {Function} error_callback function which is called when the request has not been performed correctly
    */
    AjaxRequest.prototype.PUT = function (url, data, callback, error_callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp.responseText);
            }
            else if (xhttp.readyState == 4) {
                if (error_callback != undefined) {
                    try {
                        error_callback();
                    }
                    catch (e) {
                    }
                }
            }
        };
        xhttp.open("POST", url, true);
        var keys = Object.keys(data);
        var d = "";
        for (var i = 0; i < keys.length; i++) {
            if (i !== 0) {
                d = d + "&";
            }
            d = d + keys[i] + "=" + data[keys[i]];
        }
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("x-http-method-override", "PUT");
        xhttp.send(d);
    };
    return AjaxRequest;
}());
exports.AR = new AjaxRequest();
/**
 *
 * @param {String|Object|Array} e
 * @param {Number} index
 */
function $(e, index) {
    if (e != undefined) {
        return new ExtJsObject(e, index);
    }
    else {
        return this;
    }
}
exports.$ = $;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(2);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var extjs_1 = __webpack_require__(0);
var c_error = "Erreur de communication avec le serveur";
var SharedModel = /** @class */ (function () {
    function SharedModel() {
        this.api_url = "api";
    }
    /**
     * Logs the user out.
     */
    SharedModel.prototype.logout = function () {
        extjs_1.AR.GET(this.api_url + 'api?res=logout', function () { return window.location.href = "login"; }, function () { return alert(c_error); });
    };
    /**
     * Logs the user in or checks if the user is logged in.
     * @param credentials User's credentials
     * @param callback Success callback
     * @param error_callback Error callback
     */
    SharedModel.prototype.login = function (credentials, callback, error_callback) {
        if (credentials == undefined) {
            extjs_1.AR.GET(this.api_url + 'api?res=login', function (data) {
                var d;
                try {
                    d = JSON.parse(data);
                }
                catch (error) {
                    d = { isConnected: false };
                }
                if (d.isConnected == true) {
                    if (callback != undefined) {
                        callback(d);
                    }
                }
                else if (error_callback != undefined) {
                    error_callback(d);
                }
            });
        }
        else {
            var user_email = credentials.email;
            var user_password = credentials.password;
            var keep_connection = credentials.keep_connection;
            try {
                extjs_1.AR.POST(this.api_url + 'api/index.php?res=login&keep_connection=' + keep_connection, {
                    user_email: user_email, user_password: user_password
                }, function (data) {
                    var d;
                    try {
                        d = JSON.parse(data);
                    }
                    catch (error) {
                        d = { isConnected: false };
                    }
                    if (d.isConnected == true) {
                        if (callback != undefined) {
                            callback(d);
                        }
                    }
                    else if (error_callback != undefined) {
                        error_callback();
                    }
                }, function () {
                    alert(c_error);
                });
            }
            catch (error) {
            }
        }
    };
    return SharedModel;
}());
exports.SharedModel = SharedModel;
var P = /** @class */ (function () {
    function P() {
        this.isDb = false;
    }
    /**
     * Gets the value associated with a key (needle) in a query string
     * @param needle The key to which the value is associated
     */
    P.prototype.get = function (needle) {
        var url = this._hash;
        var informations = url.split(";");
        for (var i = 0; i < informations.length; i++) {
            var info = informations[i];
            var i_split = info.split('=');
            if (i_split[0] == needle) {
                return i_split[1];
            }
        }
        return "";
    };
    Object.defineProperty(P.prototype, "name", {
        /**
         * Gets the name of the current page
         */
        get: function () {
            var p = "";
            if (this.get('page') != "") {
                p = this.get('page');
            }
            else if (this.get('p') != "") {
                p = this.get('p');
            }
            if (p != "") {
                return p;
            }
            else {
                return "home";
            }
        },
        enumerable: true,
        configurable: true
    });
    P.prototype.changeUrl = function (page, url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Page: page, Url: url };
            history.pushState(obj, obj.Page, obj.Url);
        }
        else {
            window.location.href = page;
        }
    };
    P.prototype.setHash = function (x_url) {
        if (this.isDb == true) {
            var split = x_url.split("/");
            x_url = split[split.length - 1];
            if (x_url == "dashboard.php") {
                x_url = "home";
            }
            x_url = x_url.replace('dashboard-', "");
            if (x_url.indexOf('manage-project-') >= 0) {
                return "p=manage-project;id=" + x_url.replace('manage-project-', "");
            }
            else if (x_url.indexOf('publish-project-') >= 0) {
                return "p=publish-project;id=" + x_url.replace('publish-project-', "");
            }
            else {
                return "p=" + x_url;
            }
        }
        else {
            var split = x_url.split("/");
            x_url = split[split.length - 1];
            if (x_url.indexOf('project-') == 0) {
                return "p=project;id=" + x_url.replace('project-', "");
            }
            return "p=" + x_url;
        }
    };
    P.prototype.addUrlSwitcher = function () {
        var _this = this;
        var all = document.querySelectorAll('[data-internal=true]');
        for (var i = 0; i < all.length; i++) {
            var element = all[i];
            element.onclick = function (e) {
                //@ts-ignore
                _this.hash = _this.setHash(e.target.href);
                //@ts-ignore
                _this.changeUrl("Groupe vicri", e.target.href);
                //@ts-ignore
                window.onhashchange();
                return false;
            };
        }
    };
    Object.defineProperty(P.prototype, "hash", {
        /**** Some getters and setters ****/
        set: function (hash) {
            this._hash = hash;
        },
        enumerable: true,
        configurable: true
    });
    return P;
}());
exports.P = P;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Modules are imported here
 */
var site_view_1 = __webpack_require__(5);
var site_model_1 = __webpack_require__(8);
var extjs_1 = __webpack_require__(0);
/**
 * The controller is the link between the view and the model
 */
var Controller = /** @class */ (function () {
    function Controller(page, model, view) {
        this._page = page;
        this._model = model;
        this._view = view;
    }
    /**
     * Loads the page from this._page.name
     */
    Controller.prototype.loadPage = function () {
        this._model.login(undefined, this.choosePage.bind(this), this.choosePage.bind(this));
    };
    Controller.prototype.choosePage = function (state) {
        this._view.manageMenu(state);
        this._view.clear();
        switch (this._page.name) {
            case "home":
                this._view.buildHomePage();
                break;
            case "projects":
                this._view.buildProjectsPage(this._model.getProjects.bind(this._model));
                break;
            case "project":
                this._view.buildProjectPage(this._model.getProjectById.bind(this._model), this._page.get('id'));
                break;
            case "videos":
                this._view.buildVideosPage(this._model.getVideos.bind(this._model));
                break;
            case "photos":
                this._view.buildPhotosPage(this._model.getPhotos.bind(this._model));
                break;
            case "logout":
                this._model.logout();
            default:
                this._view.build404Page();
                break;
        }
    };
    Object.defineProperty(Controller.prototype, "page", {
        /**
         * @returns {Page} returns an instance of Page
         */
        get: function () {
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    return Controller;
}());
/**
 * When the document is ready;
 */
extjs_1.$(document).ready(function () {
    // Getting objects ready
    var page = new site_model_1.Page();
    var model = new site_model_1.Model();
    var view = new site_view_1.View();
    // Getting workspace ready
    view.container = extjs_1.$('.dynamic-content');
    //Getting the model ready by defining the api directory
    model.api_url = "./";
    // Creating a new controller object
    var controller = new Controller(page, model, view);
    //@ts-ignore Getting the page ready
    controller.page.hash = window_hash; // This variable is defined via PHP
    // Loading the page
    controller.loadPage();
    // Setting page
    view.page = controller.page;
    // When the url changes without reloading the page
    window.onpopstate = function (event) {
        controller.page.hash = controller.page.setHash(document.location.href);
        //@ts-ignore
        window.onhashchange();
    };
    // When the part after the #changes
    window.onhashchange = function () {
        controller.loadPage();
    };
    // Hamburger menu system
    var menu = extjs_1.$('.scms-header-actions');
    extjs_1.$('.hamburger').click(function () {
        if (this.classList.contains('clicked')) {
            extjs_1.$(this).removeClass('clicked');
            extjs_1.$(this).addClass('none');
            menu.removeClass('open');
        }
        else {
            extjs_1.$(this).removeClass('none');
            extjs_1.$(this).addClass('clicked');
            menu.addClass('open');
        }
        ;
    });
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(6);
var extjs_1 = __webpack_require__(0);
var View = /** @class */ (function () {
    function View() {
    }
    View.prototype.clear = function () { this._c.html(""); };
    ;
    View.prototype.manageMenu = function (state) {
        if (state.isConnected == true) {
            extjs_1.$('#menu-login').addClass('hidden');
            extjs_1.$('#menu-db').removeClass('hidden');
            extjs_1.$('#menu-logout').removeClass('hidden');
        }
        else {
            extjs_1.$('#menu-login').removeClass('hidden');
            extjs_1.$('#menu-db').addClass('hidden');
            extjs_1.$('#menu-logout').addClass('hidden');
        }
    };
    View.prototype.buildHomePage = function () {
        var container = this._c;
        container.html('<div class="scms-landing-image" style="height:600px;background:url(vicri.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');
        var welcome_block = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element');
        welcome_block
            .child('h2')
            .html("Bienvenue sur le site web du groupe vicri de l'INDSé")
            .addClass('scms-content-block-title');
        welcome_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .html("Bienvenue sur notre site ! Ici, vous trouverez les différents projets terminés et en cours du groupe vicri de l'INDSé 2e&3e degrés. Ce site web est un des projets du groupe et son code source est disponible gratuitement sur github :-)"
            + " Les projets terminés sont rangés dans les différentes catégories : Vidéos, Photos et Autres. Les projets en cours se trouvent dans la partie Projets.");
        container
            .child('div')
            .addClass('scms-landing-image')
            .css('height', "250px")
            .css('background', "url(res/photos.jpg) no-repeat")
            .css('background-size', "cover")
            .css('background-position', "center");
        var photos_block = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element');
        photos_block
            .child('h2')
            .html("Nos photos")
            .addClass('scms-content-block-title');
        photos_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .html("Vous retrouverez, ici, organisées par dossier triés par date, toutes les photos réalisées par le groupe vicri de l'INDSé 2e&3e degrés.");
        photos_block
            .child('a')
            .addClass('scms-simple-action-button')
            .html('Voir les photos')
            .attr('data-internal', true)
            .get(0).href = "photos";
        container
            .child('div')
            .addClass('scms-landing-image')
            .css('height', "250px")
            .css('background', "url(res/videos.jpg) no-repeat")
            .css('background-size', "cover")
            .css('background-position', "center");
        var videos_block = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element');
        videos_block
            .child('h2')
            .html("Nos vidéos")
            .addClass('scms-content-block-title');
        videos_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .html("Vous retrouverez, ici, toutes les vidéos réalisées par le groupe vicri de l'INDSé 2e&3e degrés qui ont été uploadées sur YouTube");
        videos_block
            .child('a')
            .addClass('scms-simple-action-button')
            .html('Voir les vidéos')
            .attr('data-internal', true)
            .get(0).href = "photos";
        this.buildFooter();
    };
    View.prototype.build404Page = function () {
        var content = this._c;
        content.html('<div class="scms-basics-404-image" style="background:url(\'./res/404-rail.jpg\') no-repeat;background-position:center;background-size:cover;"><link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet"><span class="inside-scms-basics-404-span">404</span><span class="inside-scms-basics-404-span-2">You\'re lost !</span><a href="home" class="go-home-button"><button class="scms-simple-action-button" >HOME PAGE</button></a><span class="powered-by-scms">Powered by SCMS</span></div>');
        this.buildFooter();
    };
    View.prototype.buildFooter = function () {
        this._c.child('div').addClass('scms-footer').html("Groupe vicri");
        this.buildLinks();
    };
    View.prototype.buildLinks = function () {
        var _this = this;
        var all = document.querySelectorAll('[data-internal=true]');
        for (var i = 0; i < all.length; i++) {
            var element = all[i];
            element.onclick = function (e) {
                //@ts-ignore
                _this._page.hash = _this._page.setHash(e.target.href);
                //@ts-ignore
                _this._page.changeUrl("Groupe vicri", e.target.href);
                //@ts-ignore
                window.onhashchange();
                return false;
            };
        }
    };
    View.prototype.buildProjectsPage = function (getProjects) {
        var _this = this;
        var container = this._c;
        container.html('<div class="scms-landing-image" style="height:600px;max-height:calc(100vh - 60px);background:url(./res/projects.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');
        var project_block = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element')
            .css('background', "#fcfcfc");
        project_block
            .child('h2')
            .html("Bienvenue sur notre page projets ! ")
            .addClass('scms-content-block-title');
        project_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .css('text-align', "center")
            .html("Ici, vous trouverez les différents projets réalisés par notre groupe qu'ils soient terminés ou non.");
        var wrapper = project_block
            .child('div')
            .addClass('wrapper');
        getProjects(function (projects) {
            projects.forEach(function (project) {
                function nl2br(str, is_xhtml) {
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                }
                var pb = wrapper
                    .child('div')
                    .addClass('project');
                var pbc = pb
                    .child('div')
                    .addClass('img');
                pbc
                    .child('div')
                    .css('background', "url(https://picsum.photos/450/300?random#" + Math.random() + ") no-repeat")
                    .css('background-position', "center")
                    .css('background-size', "cover")
                    .addClass('rimg');
                pbc
                    .child('div')
                    .addClass('text')
                    .html(project.name);
                pb
                    .child('p')
                    .html(nl2br(project.shortDescription, false));
                var cf = pb
                    .child('div')
                    .addClass('clearfix');
                var cf_h = pb.child("div");
                cf_h
                    .addClass('cf-hover')
                    .child('a')
                    .addClass("button")
                    .html('Voir le projet')
                    .css('text-decoration', "none")
                    .attr('data-internal', true)
                    .get(0)
                    .href = "project-" + project.id;
                _this.buildLinks();
            });
        });
        this.buildFooter();
    };
    View.prototype.buildVideosPage = function (getProjects) {
        var _this = this;
        var container = this._c;
        container.html('<div class="scms-landing-image" style="height:600px;max-height:calc(100vh - 60px);background:url(./res/our_videos.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');
        var project_block = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element')
            .css('background', "#fcfcfc");
        project_block
            .child('h2')
            .html("Bienvenue sur notre page videos ! ")
            .addClass('scms-content-block-title');
        project_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .css('text-align', "center")
            .html("Ici, vous trouverez les vidéos réalisées par les membres du groupe vicri");
        var wrapper = project_block
            .child('div')
            .addClass('wrapper');
        getProjects(function (projects) {
            projects.forEach(function (project) {
                function nl2br(str, is_xhtml) {
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                }
                var pb = wrapper
                    .child('div')
                    .addClass('project');
                var pbc = pb
                    .child('div')
                    .addClass('img');
                pbc
                    .child('div')
                    .css('background-position', "center")
                    .css('background-size', "cover")
                    .addClass('rimg')
                    .css('opacity', "1")
                    .html("\n                        <iframe style=\"width:100%;height:100%\" src=\"https://www.youtube.com/embed/" + project.url + "\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>\n                    ");
                pb
                    .child('p')
                    .html("<b>" + project.title + "</b><br /><div style=\"height:5px;\"></div>" + nl2br(project.description, false));
                var cf = pb
                    .child('div')
                    .addClass('clearfix');
                var cf_h = pb.child("div");
                cf_h
                    .addClass('cf-hover')
                    .child('a')
                    .addClass("button")
                    .html('Voir le projet')
                    .css('text-decoration', "none")
                    .attr('data-internal', true)
                    .get(0)
                    .href = "project-" + project.id;
                _this.buildLinks();
            });
        });
        this.buildFooter();
    };
    View.prototype.buildPhotosPage = function (getProjects) {
        var _this = this;
        var container = this._c;
        container.html('<div class="scms-landing-image" style="height:600px;max-height:calc(100vh - 60px);background:url(./res/our_photos.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');
        var project_block = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element')
            .css('background', "#fcfcfc");
        project_block
            .child('h2')
            .html("Bienvenue sur notre page photos ! ")
            .addClass('scms-content-block-title');
        project_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .css('text-align', "center")
            .html("Ici, vous trouverez les photos réalisées par les membres du groupe vicri");
        var wrapper = project_block
            .child('div')
            .addClass('wrapper');
        getProjects(function (projects) {
            projects.forEach(function (project) {
                function nl2br(str, is_xhtml) {
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                }
                var pb = wrapper
                    .child('div')
                    .addClass('project');
                var pbc = pb
                    .child('div')
                    .addClass('img');
                pbc
                    .child('div')
                    .css('background', "url(" + project.cover + ") no-repeat")
                    .css('background-position', "center")
                    .css('background-size', "cover")
                    .css('opacity', "1")
                    .addClass('rimg');
                pbc
                    .child('div')
                    .css('background-position', "center")
                    .css('background-size', "cover")
                    .addClass('rimg');
                pb
                    .child('p')
                    .html("<b>" + project.title + "</b><br /><div style=\"height:5px;\"></div>" + nl2br(project.description, false));
                var cf = pb
                    .child('div')
                    .addClass('clearfix');
                var cf_h = pb.child("div");
                cf_h
                    .addClass('cf-hover')
                    .child('a')
                    .addClass("button")
                    .html('Voir le projet')
                    .css('text-decoration', "none")
                    .attr('data-internal', true)
                    .get(0)
                    .href = "project-" + project.id;
                cf_h
                    .addClass('cf-hover')
                    .child('a')
                    .addClass("button")
                    .html('Voir les photos')
                    .css('text-decoration', "none")
                    .attr('data-internal', true)
                    .get(0)
                    .href = "photos-" + project.id;
                _this.buildLinks();
            });
        });
        this.buildFooter();
    };
    View.prototype.buildProjectPage = function (getProject, id) {
        var container = this._c;
        var project_block = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element')
            .css('background', "#fcfcfc");
        getProject(id, function (project) {
            var managers = "";
            project.managers.forEach(function (manager, index) { return managers += manager + ((index + 1 == project.managers.length) ? "" : ((index + 2 == project.managers.length) ? " et " : ", ")); });
            project_block
                .child('h2')
                .html(project.name)
                .addClass('scms-content-block-title');
            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html("Type de projet : " + project.type);
            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html("Manager(s) : " + managers);
            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html("R\u00E9sum\u00E9 : " + project.shortDescription);
            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html("Description : " + project.description);
            if (project.isPublished == true) {
                project_block
                    .child('p')
                    .addClass('scms-content-block-paragraph')
                    .html("Ce projet est publi\u00E9");
            }
        }, function (error) {
            project_block
                .html("Une erreur est survenue : il se peut que le projet n'existe pas<br /> " + error.message);
        });
        this.buildFooter();
    };
    Object.defineProperty(View.prototype, "container", {
        set: function (c) { this._c = c; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "page", {
        set: function (p) { this._page = p; },
        enumerable: true,
        configurable: true
    });
    return View;
}());
exports.View = View;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./site.style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./site.style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Missing binding C:\\wamp64\\www\\vicri.website\\node_modules\\node-sass\\vendor\\win32-x64-57\\binding.node\nNode Sass could not find a binding for your current environment: Windows 64-bit with Node.js 8.x\n\nFound bindings for the following environments:\n  - Windows 64-bit with Node.js 9.x\n\nThis usually happens because your environment has changed since running `npm install`.\nRun `npm rebuild node-sass --force` to build the binding for your current environment.\n    at module.exports (C:\\wamp64\\www\\vicri.website\\node_modules\\node-sass\\lib\\binding.js:15:13)\n    at Object.<anonymous> (C:\\wamp64\\www\\vicri.website\\node_modules\\node-sass\\lib\\index.js:14:35)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)\n    at Module.require (module.js:587:17)\n    at require (internal/module.js:11:18)\n    at Object.<anonymous> (C:\\wamp64\\www\\vicri.website\\node_modules\\sass-loader\\lib\\loader.js:3:14)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)\n    at Module.require (module.js:587:17)\n    at require (internal/module.js:11:18)\n    at loadLoader (C:\\wamp64\\www\\vicri.website\\node_modules\\loader-runner\\lib\\loadLoader.js:13:17)\n    at iteratePitchingLoaders (C:\\wamp64\\www\\vicri.website\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (C:\\wamp64\\www\\vicri.website\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at C:\\wamp64\\www\\vicri.website\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (C:\\wamp64\\www\\vicri.website\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (C:\\wamp64\\www\\vicri.website\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (C:\\wamp64\\www\\vicri.website\\node_modules\\loader-runner\\lib\\LoaderRunner.js:362:2)\n    at NormalModule.doBuild (C:\\wamp64\\www\\vicri.website\\node_modules\\webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (C:\\wamp64\\www\\vicri.website\\node_modules\\webpack\\lib\\NormalModule.js:275:15)\n    at Compilation.buildModule (C:\\wamp64\\www\\vicri.website\\node_modules\\webpack\\lib\\Compilation.js:151:10)\n    at factoryCallback (C:\\wamp64\\www\\vicri.website\\node_modules\\webpack\\lib\\Compilation.js:344:12)\n    at factory (C:\\wamp64\\www\\vicri.website\\node_modules\\webpack\\lib\\NormalModuleFactory.js:241:5)\n    at applyPluginsAsyncWaterfall (C:\\wamp64\\www\\vicri.website\\node_modules\\webpack\\lib\\NormalModuleFactory.js:94:13)");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shared_model_1 = __webpack_require__(3);
var extjs_1 = __webpack_require__(0);
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a list of all the photos that are on the site
     * @param callback function that is called once all the photos have been gotten
     */
    Model.prototype.getPhotos = function (callback) {
        console.log(this);
        extjs_1.AR.GET(this.api_url + 'api/index.php?res=photos', function (data) {
            var d = JSON.parse(data);
            callback(d);
        }, function () {
            alert('Une erreur est survenue');
        });
    };
    /**
     * Gets a list of all the videos that are on the site
     * @param callback function that is called once all the videos have been gotten
     */
    Model.prototype.getVideos = function (callback) {
        console.log(this);
        extjs_1.AR.GET(this.api_url + 'api/index.php?res=videos', function (data) {
            var d = JSON.parse(data);
            callback(d);
        }, function () {
            alert('Une erreur est survenue');
        });
    };
    /**
     * Gets a list of all the projects that are on the site
     * @param callback function that is called once all the project have been gotten
     */
    Model.prototype.getProjects = function (callback) {
        console.log(this);
        extjs_1.AR.GET(this.api_url + 'api/index.php?res=projects', function (data) {
            var d = JSON.parse(data);
            callback(d);
        }, function () {
            alert('Une erreur est survenue');
        });
    };
    /**
     * Gets the informations of a project via it's id
     * @param id the id of the project
     * @param callback function to call when * is ok
     * @param onErrorCallback function to call if something went wrong
     * @param othercallback function passed to callback
     * @param second_other_callback function passed to callback
     */
    Model.prototype.getProjectById = function (id, callback, onErrorCallback) {
        extjs_1.AR.GET(this.api_url + "api?res=project&id=" + id, function (data) {
            try {
                var d = JSON.parse(data);
                if (d.type != "error" && d.message == undefined) {
                    callback(d);
                }
                else {
                    if (onErrorCallback != undefined) {
                        onErrorCallback(d);
                    }
                }
            }
            catch (error) {
                onErrorCallback({
                    type: "error",
                    message: error.toString()
                });
            }
        });
    };
    return Model;
}(shared_model_1.SharedModel));
exports.Model = Model;
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Page;
}(shared_model_1.P));
exports.Page = Page;


/***/ })
/******/ ]);