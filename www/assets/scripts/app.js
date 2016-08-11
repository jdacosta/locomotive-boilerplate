(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _environment = require('./utils/environment');

var _html = require('./utils/html');

var _globals = require('./utils/globals');

var _globals2 = _interopRequireDefault(_globals);

var _modules = require('./modules');

var modules = _interopRequireWildcard(_modules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* jshint esnext: true */


// Global functions and tools


// Basic modules


var App = function () {
				function App() {
								var _this = this;

								_classCallCheck(this, App);

								this.modules = modules;
								this.currentModules = [];

								_environment.$document.on('initModules.App', function (event) {
												_this.initGlobals(event.firstBlood).deleteModules().initModules();
								});
				}

				/**
     * Destroy all existing modules
     * @return  {Object}  this  Allows chaining
     */


				App.prototype.deleteModules = function deleteModules() {
								// Loop modules
								var i = this.currentModules.length;

								// Destroy all modules
								while (i--) {
												this.currentModules[i].destroy();
												this.currentModules.splice(i);
								}

								return this;
				};

				/**
     * Execute global functions and settings
     * Allows you to initialize global modules only once if you need
     * (ex.: when using Barba.js or SmoothState.js)
     * @return  {Object}  this  Allows chaining
     */


				App.prototype.initGlobals = function initGlobals(firstBlood) {
								(0, _globals2.default)(firstBlood);
								return this;
				};

				/**
     * Find modules and initialize them
     * @return  {Object}  this  Allows chaining
     */


				App.prototype.initModules = function initModules() {
								// Elements with module
								var moduleEls = document.querySelectorAll('[data-module]');

								// Loop through elements
								var i = 0;
								var elsLen = moduleEls.length;

								for (; i < elsLen; i++) {

												// Current element
												var el = moduleEls[i];

												// All data- attributes considered as options
												var options = (0, _html.getNodeData)(el);

												// Add current DOM element and jQuery element
												options.el = el;
												options.$el = $(el);

												// Module does exist at this point
												var attr = options.module;

												// Splitting modules found in the data-attribute
												var moduleIdents = attr.replace(/\s/g, '').split(',');

												// Loop modules
												var j = 0;
												var modulesLen = moduleIdents.length;

												for (; j < modulesLen; j++) {
																var moduleAttr = moduleIdents[j];

																if (typeof this.modules[moduleAttr] === 'function') {
																				var module = new this.modules[moduleAttr](options);
																				this.currentModules.push(module);
																}
												}
								}

								return this;
				};

				return App;
}();

// IIFE for loading the application
// ==========================================================================


(function () {
				window.App = new App();
				_environment.$document.trigger({
								type: 'initModules.App',
								firstBlood: true
				});
})();

},{"./modules":3,"./utils/environment":6,"./utils/globals":7,"./utils/html":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrollTo = scrollTo;
/* jshint esnext: true */
var isAnimating = false;

var defaults = {
    easing: 'swing',
    headerOffset: 60,
    speed: 300
};

/**
 * scrollTo is a function that scrolls a container to an element's position within that controller
 * Uses jQuery's $.Deferred to allow using a callback on animation completion
 * @param   {object}  $element  A jQuery node
 * @param   {object}  options
 */
function scrollTo($element, options) {
    var deferred = $.Deferred();

    // Drop everything if this ain't a jQuery object
    if ($element instanceof jQuery && $element.length > 0) {

        // Merging options
        options = $.extend({}, defaults, typeof options !== 'undefined' ? options : {});

        // Prevents accumulation of animations
        if (isAnimating === false) {
            isAnimating = true;

            // Default container that we'll be scrolling
            var $container = $('html, body');
            var elementOffset = 0;

            // Testing container in options for jQuery-ness
            // If we're not using a custom container, we take the top document offset
            // If we are, we use the elements position relative to the container
            if (typeof options.$container !== 'undefined' && options.$container instanceof jQuery && options.$container.length > 0) {
                $container = options.$container;
                elementOffset = $element.position().top;
            } else {
                elementOffset = $element.offset().top;
            }

            $container.animate({
                scrollTop: elementOffset - options.headerOffset
            }, options.speed, options.easing, function () {
                isAnimating = false;
                deferred.resolve();
            });
        }
    }

    return deferred.promise();
}

},{}],3:[function(require,module,exports){
/* jshint esnext: true */
// export {default as Button} from './modules/Button';
"use strict";

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _environment = require('../utils/environment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* jshint esnext: true */


/**
 * Abstract module
 * Gives access to generic jQuery nodes
 */
var _class = function _class(options) {
	_classCallCheck(this, _class);

	this.$document = _environment.$document;
	this.$window = _environment.$window;
	this.$html = _environment.$html;
	this.$body = _environment.$body;
	this.$el = options.$el;
	this.el = options.el;
};

exports.default = _class;

},{"../utils/environment":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addToArray = addToArray;
exports.arrayContains = arrayContains;
exports.arrayContentsMatch = arrayContentsMatch;
exports.ensureArray = ensureArray;
exports.lastItem = lastItem;
exports.removeFromArray = removeFromArray;
exports.toArray = toArray;
exports.findByKeyValue = findByKeyValue;

var _is = require('./is');

function addToArray(array, value) {
	var index = array.indexOf(value);

	if (index === -1) {
		array.push(value);
	}
}

function arrayContains(array, value) {
	for (var i = 0, c = array.length; i < c; i++) {
		if (array[i] == value) {
			return true;
		}
	}

	return false;
}

function arrayContentsMatch(a, b) {
	var i;

	if (!(0, _is.isArray)(a) || !(0, _is.isArray)(b)) {
		return false;
	}

	if (a.length !== b.length) {
		return false;
	}

	i = a.length;
	while (i--) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
}

function ensureArray(x) {
	if (typeof x === 'string') {
		return [x];
	}

	if (x === undefined) {
		return [];
	}

	return x;
}

function lastItem(array) {
	return array[array.length - 1];
}

function removeFromArray(array, member) {
	if (!array) {
		return;
	}

	var index = array.indexOf(member);

	if (index !== -1) {
		array.splice(index, 1);
	}
}

function toArray(arrayLike) {
	var array = [],
	    i = arrayLike.length;
	while (i--) {
		array[i] = arrayLike[i];
	}

	return array;
}

function findByKeyValue(array, key, value) {
	return array.filter(function (obj) {
		return obj[key] === value;
	});
}

},{"./is":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $document = $(document);
var $window = $(window);
var $html = $(document.documentElement);
var $body = $(document.body);

exports.$document = $document;
exports.$window = $window;
exports.$html = $html;
exports.$body = $body;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	svg4everybody();
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.escapeHtml = escapeHtml;
exports.unescapeHtml = unescapeHtml;
exports.getNodeData = getNodeData;
/**
 * @see  https://github.com/ractivejs/ractive/blob/dev/src/utils/html.js
 */
function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Prepare HTML content that contains mustache characters for use with Ractive
 * @param  {string} str
 * @return {string}
 */
function unescapeHtml(str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

/**
 * Get element data attributes
 * @param   {DOMElement}  node
 * @return  {Array}       data
 */
function getNodeData(node) {
    // All attributes
    var attributes = node.attributes;

    // Regex Pattern
    var pattern = /^data\-(.+)$/;

    // Output
    var data = {};

    for (var i in attributes) {
        if (!attributes[i]) {
            continue;
        }

        // Attributes name (ex: data-module)
        var name = attributes[i].name;

        // This happens.
        if (!name) {
            continue;
        }

        var match = name.match(pattern);
        if (!match) {
            continue;
        }

        // If this throws an error, you have some
        // serious problems in your HTML.
        data[match[1]] = node.getAttribute(name);
    }

    return data;
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isArray = isArray;
exports.isArrayLike = isArrayLike;
exports.isEqual = isEqual;
exports.isNumeric = isNumeric;
exports.isObject = isObject;
exports.isFunction = isFunction;
var toString = Object.prototype.toString,
    arrayLikePattern = /^\[object (?:Array|FileList)\]$/;

// thanks, http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
function isArray(thing) {
	return toString.call(thing) === '[object Array]';
}

function isArrayLike(obj) {
	return arrayLikePattern.test(toString.call(obj));
}

function isEqual(a, b) {
	if (a === null && b === null) {
		return true;
	}

	if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
		return false;
	}

	return a === b;
}

// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumeric(thing) {
	return !isNaN(parseFloat(thing)) && isFinite(thing);
}

function isObject(thing) {
	return thing && toString.call(thing) === '[object Object]';
}

function isFunction(thing) {
	var getType = {};
	return thing && getType.toString.call(thing) === '[object Function]';
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.visibilityApi = undefined;

var _is = require('./is');

var _array = require('./array');

var _environment = require('./environment');

var CALLBACKS = {
	hidden: [],
	visible: []
}; /* jshint esnext: true */


var ACTIONS = ['addCallback', 'removeCallback'];

var STATES = ['visible', 'hidden'];

var PREFIX = 'v-';

var UUID = 0;

// Main event
_environment.$document.on('visibilitychange', function (event) {
	if (document.hidden) {
		onDocumentChange('hidden');
	} else {
		onDocumentChange('visible');
	}
});

/**
 * Add a callback
 * @param {string}   state
 * @param {function} callback
 * @return {string}  ident
 */
function addCallback(state, options) {
	var callback = options.callback || '';

	if (!(0, _is.isFunction)(callback)) {
		console.warn('Callback is not a function');
		return false;
	}

	var ident = PREFIX + UUID++;

	CALLBACKS[state].push({
		ident: ident,
		callback: callback
	});

	return ident;
}

/**
 * Remove a callback
 * @param  {string}   state  Visible or hidden
 * @param  {string}   ident  Unique identifier
 * @return {boolean}         If operation was a success
 */
function removeCallback(state, options) {
	var ident = options.ident || '';

	if (typeof ident === 'undefined' || ident === '') {
		console.warn('Need ident to remove callback');
		return false;
	}

	var index = (0, _array.findByKeyValue)(CALLBACKS[state], 'ident', ident)[0];

	// console.log(ident)
	// console.log(CALLBACKS[state])

	if (typeof index !== 'undefined') {
		(0, _array.removeFromArray)(CALLBACKS[state], index);
		return true;
	} else {
		console.warn('Callback could not be found');
		return false;
	}
}

/**
 * When document state changes, trigger callbacks
 * @param  {string}  state  Visible or hidden
 */
function onDocumentChange(state) {
	var callbackArray = CALLBACKS[state];
	var i = 0;
	var len = callbackArray.length;

	for (; i < len; i++) {
		callbackArray[i].callback();
	}
}

/**
 * Public facing API for adding and removing callbacks
 * @param   {object}           options  Options
 * @return  {boolean|integer}           Unique identifier for the callback or boolean indicating success or failure
 */
function visibilityApi(options) {
	var action = options.action || '';
	var state = options.state || '';
	var ret = void 0;

	// Type and value checking
	if (!(0, _array.arrayContains)(ACTIONS, action)) {
		console.warn('Action does not exist');
		return false;
	}
	if (!(0, _array.arrayContains)(STATES, state)) {
		console.warn('State does not exist');
		return false;
	}

	// @todo Magic call function pls
	if (action === 'addCallback') {
		ret = addCallback(state, options);
	} else if (action === 'removeCallback') {
		ret = removeCallback(state, options);
	}

	return ret;
}

exports.visibilityApi = visibilityApi;

},{"./array":5,"./environment":6,"./is":9}]},{},[1,2,3,4,5,6,7,8,9,10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9BcHAuanMiLCJhc3NldHMvc2NyaXB0cy9nbG9iYWwvc2Nyb2xsVG8uanMiLCJhc3NldHMvc2NyaXB0cy9tb2R1bGVzLmpzIiwiYXNzZXRzL3NjcmlwdHMvbW9kdWxlcy9BYnN0cmFjdE1vZHVsZS5qcyIsImFzc2V0cy9zY3JpcHRzL3V0aWxzL2FycmF5LmpzIiwiYXNzZXRzL3NjcmlwdHMvdXRpbHMvZW52aXJvbm1lbnQuanMiLCJhc3NldHMvc2NyaXB0cy91dGlscy9nbG9iYWxzLmpzIiwiYXNzZXRzL3NjcmlwdHMvdXRpbHMvaHRtbC5qcyIsImFzc2V0cy9zY3JpcHRzL3V0aWxzL2lzLmpzIiwiYXNzZXRzL3NjcmlwdHMvdXRpbHMvdmlzaWJpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0E7O0FBQ0E7O0FBR0E7Ozs7QUFHQTs7SUFBWSxPOzs7Ozs7MEpBUlo7OztBQUlBOzs7QUFHQTs7O0lBR00sRztBQUNMLG1CQUFjO0FBQUE7O0FBQUE7O0FBQ2IsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGFBQUssY0FBTCxHQUFzQixFQUF0Qjs7QUFFQSwrQkFBVSxFQUFWLENBQWEsaUJBQWIsRUFBZ0MsVUFBQyxLQUFELEVBQVc7QUFDMUMsa0JBQUssV0FBTCxDQUFpQixNQUFNLFVBQXZCLEVBQ0UsYUFERixHQUVFLFdBRkY7QUFHQSxTQUpEO0FBS0E7O0FBRUQ7Ozs7OztrQkFJQSxhLDRCQUFnQjtBQUNmO0FBQ0EsWUFBSSxJQUFJLEtBQUssY0FBTCxDQUFvQixNQUE1Qjs7QUFFQTtBQUNBLGVBQU8sR0FBUCxFQUFZO0FBQ1gsaUJBQUssY0FBTCxDQUFvQixDQUFwQixFQUF1QixPQUF2QjtBQUNBLGlCQUFLLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBMkIsQ0FBM0I7QUFDQTs7QUFFRCxlQUFPLElBQVA7QUFDQSxLOztBQUVEOzs7Ozs7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QUksQ0FBQywwQkFBYyxNQUFkLEVBQXNCLEtBQXRCLENBQUwsRUFBbUM7QUFDbEMsVUFBUSxJQUFSLENBQWEsc0JBQWI7QUFDQSxTQUFPLEtBQVA7QUFDQTs7QUFFRDtBQUNBLEtBQUksV0FBVyxhQUFmLEVBQThCO0FBQzdCLFFBQU0sWUFBWSxLQUFaLEVBQW1CLE9BQW5CLENBQU47QUFDQSxFQUZELE1BRU8sSUFBSSxXQUFXLGdCQUFmLEVBQWlDO0FBQ3ZDLFFBQU0sZUFBZSxLQUFmLEVBQXNCLE9BQXRCLENBQU47QUFDQTs7QUFFRCxRQUFPLEdBQVA7QUFDQTs7UUFFUSxhLEdBQUEsYSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgeyAkZG9jdW1lbnQgfSBmcm9tICcuL3V0aWxzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IGdldE5vZGVEYXRhIH0gZnJvbSAnLi91dGlscy9odG1sJztcblxuLy8gR2xvYmFsIGZ1bmN0aW9ucyBhbmQgdG9vbHNcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vdXRpbHMvZ2xvYmFscyc7XG5cbi8vIEJhc2ljIG1vZHVsZXNcbmltcG9ydCAqIGFzIG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcblxuY2xhc3MgQXBwIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5tb2R1bGVzID0gbW9kdWxlcztcblx0XHR0aGlzLmN1cnJlbnRNb2R1bGVzID0gW107XG5cblx0XHQkZG9jdW1lbnQub24oJ2luaXRNb2R1bGVzLkFwcCcsIChldmVudCkgPT4ge1xuXHRcdFx0dGhpcy5pbml0R2xvYmFscyhldmVudC5maXJzdEJsb29kKVxuXHRcdFx0XHQuZGVsZXRlTW9kdWxlcygpXG5cdFx0XHRcdC5pbml0TW9kdWxlcygpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlc3Ryb3kgYWxsIGV4aXN0aW5nIG1vZHVsZXNcblx0ICogQHJldHVybiAge09iamVjdH0gIHRoaXMgIEFsbG93cyBjaGFpbmluZ1xuXHQgKi9cblx0ZGVsZXRlTW9kdWxlcygpIHtcblx0XHQvLyBMb29wIG1vZHVsZXNcblx0XHR2YXIgaSA9IHRoaXMuY3VycmVudE1vZHVsZXMubGVuZ3RoO1xuXG5cdFx0Ly8gRGVzdHJveSBhbGwgbW9kdWxlc1xuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdHRoaXMuY3VycmVudE1vZHVsZXNbaV0uZGVzdHJveSgpO1xuXHRcdFx0dGhpcy5jdXJyZW50TW9kdWxlcy5zcGxpY2UoaSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogRXhlY3V0ZSBnbG9iYWwgZnVuY3Rpb25zIGFuZCBzZXR0aW5nc1xuXHQgKiBBbGxvd3MgeW91IHRvIGluaXRpYWxpemUgZ2xvYmFsIG1vZHVsZXMgb25seSBvbmNlIGlmIHlvdSBuZWVkXG5cdCAqIChleC46IHdoZW4gdXNpbmcgQmFyYmEuanMgb3IgU21vb3RoU3RhdGUuanMpXG5cdCAqIEByZXR1cm4gIHtPYmplY3R9ICB0aGlzICBBbGxvd3MgY2hhaW5pbmdcblx0ICovXG5cdGluaXRHbG9iYWxzKGZpcnN0Qmxvb2QpIHtcblx0XHRnbG9iYWxzKGZpcnN0Qmxvb2QpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZpbmQgbW9kdWxlcyBhbmQgaW5pdGlhbGl6ZSB0aGVtXG5cdCAqIEByZXR1cm4gIHtPYmplY3R9ICB0aGlzICBBbGxvd3MgY2hhaW5pbmdcblx0ICovXG5cdGluaXRNb2R1bGVzKCkge1xuICAgICAgICAvLyBFbGVtZW50cyB3aXRoIG1vZHVsZVxuICAgICAgICB2YXIgbW9kdWxlRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kdWxlXScpO1xuXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBlbGVtZW50c1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBlbHNMZW4gPSBtb2R1bGVFbHMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoOyBpIDwgZWxzTGVuOyBpKyspIHtcblxuICAgICAgICAgICAgLy8gQ3VycmVudCBlbGVtZW50XG4gICAgICAgICAgICBsZXQgZWwgPSBtb2R1bGVFbHNbaV07XG5cbiAgICAgICAgICAgIC8vIEFsbCBkYXRhLSBhdHRyaWJ1dGVzIGNvbnNpZGVyZWQgYXMgb3B0aW9uc1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBnZXROb2RlRGF0YShlbCk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBjdXJyZW50IERPTSBlbGVtZW50IGFuZCBqUXVlcnkgZWxlbWVudFxuICAgICAgICAgICAgb3B0aW9ucy5lbCA9IGVsO1xuICAgICAgICAgICAgb3B0aW9ucy4kZWwgPSAkKGVsKTtcblxuICAgICAgICAgICAgLy8gTW9kdWxlIGRvZXMgZXhpc3QgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgbGV0IGF0dHIgPSBvcHRpb25zLm1vZHVsZTtcblxuICAgICAgICAgICAgLy8gU3BsaXR0aW5nIG1vZHVsZXMgZm91bmQgaW4gdGhlIGRhdGEtYXR0cmlidXRlXG4gICAgICAgICAgICBsZXQgbW9kdWxlSWRlbnRzID0gYXR0ci5yZXBsYWNlKC9cXHMvZywgJycpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgICAgIC8vIExvb3AgbW9kdWxlc1xuICAgICAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICAgICAgbGV0IG1vZHVsZXNMZW4gPSBtb2R1bGVJZGVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKDsgaiA8IG1vZHVsZXNMZW47IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBtb2R1bGVBdHRyID0gbW9kdWxlSWRlbnRzW2pdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZHVsZXNbbW9kdWxlQXR0cl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vZHVsZSA9IG5ldyB0aGlzLm1vZHVsZXNbbW9kdWxlQXR0cl0ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vZHVsZXMucHVzaChtb2R1bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuLy8gSUlGRSBmb3IgbG9hZGluZyB0aGUgYXBwbGljYXRpb25cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4oZnVuY3Rpb24oKSB7XG4gICAgd2luZG93LkFwcCA9IG5ldyBBcHAoKTtcbiAgICAkZG9jdW1lbnQudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdpbml0TW9kdWxlcy5BcHAnLFxuICAgICAgICBmaXJzdEJsb29kOiB0cnVlXG4gICAgfSk7XG59KSgpO1xuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xudmFyIGlzQW5pbWF0aW5nID0gZmFsc2U7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBlYXNpbmc6ICdzd2luZycsXG4gICAgaGVhZGVyT2Zmc2V0OiA2MCxcbiAgICBzcGVlZDogMzAwXG59O1xuXG4vKipcbiAqIHNjcm9sbFRvIGlzIGEgZnVuY3Rpb24gdGhhdCBzY3JvbGxzIGEgY29udGFpbmVyIHRvIGFuIGVsZW1lbnQncyBwb3NpdGlvbiB3aXRoaW4gdGhhdCBjb250cm9sbGVyXG4gKiBVc2VzIGpRdWVyeSdzICQuRGVmZXJyZWQgdG8gYWxsb3cgdXNpbmcgYSBjYWxsYmFjayBvbiBhbmltYXRpb24gY29tcGxldGlvblxuICogQHBhcmFtICAge29iamVjdH0gICRlbGVtZW50ICBBIGpRdWVyeSBub2RlXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsVG8oJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAvLyBEcm9wIGV2ZXJ5dGhpbmcgaWYgdGhpcyBhaW4ndCBhIGpRdWVyeSBvYmplY3RcbiAgICBpZiAoJGVsZW1lbnQgaW5zdGFuY2VvZiBqUXVlcnkgJiYgJGVsZW1lbnQubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIC8vIE1lcmdpbmcgb3B0aW9uc1xuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCAodHlwZW9mIG9wdGlvbnMgIT09ICd1bmRlZmluZWQnID8gb3B0aW9ucyA6IHt9KSk7XG5cbiAgICAgICAgLy8gUHJldmVudHMgYWNjdW11bGF0aW9uIG9mIGFuaW1hdGlvbnNcbiAgICAgICAgaWYgKGlzQW5pbWF0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBEZWZhdWx0IGNvbnRhaW5lciB0aGF0IHdlJ2xsIGJlIHNjcm9sbGluZ1xuICAgICAgICAgICAgdmFyICRjb250YWluZXIgPSAkKCdodG1sLCBib2R5Jyk7XG4gICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgIC8vIFRlc3RpbmcgY29udGFpbmVyIGluIG9wdGlvbnMgZm9yIGpRdWVyeS1uZXNzXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgdXNpbmcgYSBjdXN0b20gY29udGFpbmVyLCB3ZSB0YWtlIHRoZSB0b3AgZG9jdW1lbnQgb2Zmc2V0XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUsIHdlIHVzZSB0aGUgZWxlbWVudHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLiRjb250YWluZXIgIT09ICd1bmRlZmluZWQnICYmIG9wdGlvbnMuJGNvbnRhaW5lciBpbnN0YW5jZW9mIGpRdWVyeSAmJiBvcHRpb25zLiRjb250YWluZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRjb250YWluZXIgPSBvcHRpb25zLiRjb250YWluZXI7XG4gICAgICAgICAgICAgICAgZWxlbWVudE9mZnNldCA9ICRlbGVtZW50LnBvc2l0aW9uKCkudG9wXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPZmZzZXQgPSAkZWxlbWVudC5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGNvbnRhaW5lci5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGVsZW1lbnRPZmZzZXQgLSBvcHRpb25zLmhlYWRlck9mZnNldFxuICAgICAgICAgICAgfSwgb3B0aW9ucy5zcGVlZCwgb3B0aW9ucy5lYXNpbmcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xufVxuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuLy8gZXhwb3J0IHtkZWZhdWx0IGFzIEJ1dHRvbn0gZnJvbSAnLi9tb2R1bGVzL0J1dHRvbic7XG4iLCIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG5pbXBvcnQgeyAkZG9jdW1lbnQsICR3aW5kb3csICRodG1sLCAkYm9keSB9IGZyb20gJy4uL3V0aWxzL2Vudmlyb25tZW50JztcblxuLyoqXG4gKiBBYnN0cmFjdCBtb2R1bGVcbiAqIEdpdmVzIGFjY2VzcyB0byBnZW5lcmljIGpRdWVyeSBub2Rlc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLiRkb2N1bWVudCA9ICRkb2N1bWVudDtcblx0XHR0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuXHRcdHRoaXMuJGh0bWwgPSAkaHRtbDtcblx0XHR0aGlzLiRib2R5ID0gJGJvZHk7XG5cdFx0dGhpcy4kZWwgPSBvcHRpb25zLiRlbDtcblx0XHR0aGlzLmVsID0gb3B0aW9ucy5lbDtcblx0fVxufVxuIiwiaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4vaXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9BcnJheSAoIGFycmF5LCB2YWx1ZSApIHtcblx0dmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZiggdmFsdWUgKTtcblxuXHRpZiAoIGluZGV4ID09PSAtMSApIHtcblx0XHRhcnJheS5wdXNoKCB2YWx1ZSApO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUNvbnRhaW5zICggYXJyYXksIHZhbHVlICkge1xuXHRmb3IgKCBsZXQgaSA9IDAsIGMgPSBhcnJheS5sZW5ndGg7IGkgPCBjOyBpKysgKSB7XG5cdFx0aWYgKCBhcnJheVtpXSA9PSB2YWx1ZSApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5Q29udGVudHNNYXRjaCAoIGEsIGIgKSB7XG5cdHZhciBpO1xuXG5cdGlmICggIWlzQXJyYXkoIGEgKSB8fCAhaXNBcnJheSggYiApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmICggYS5sZW5ndGggIT09IGIubGVuZ3RoICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGkgPSBhLmxlbmd0aDtcblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0aWYgKCBhW2ldICE9PSBiW2ldICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQXJyYXkgKCB4ICkge1xuXHRpZiAoIHR5cGVvZiB4ID09PSAnc3RyaW5nJyApIHtcblx0XHRyZXR1cm4gWyB4IF07XG5cdH1cblxuXHRpZiAoIHggPT09IHVuZGVmaW5lZCApIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRyZXR1cm4geDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3RJdGVtICggYXJyYXkgKSB7XG5cdHJldHVybiBhcnJheVsgYXJyYXkubGVuZ3RoIC0gMSBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5ICggYXJyYXksIG1lbWJlciApIHtcblx0aWYgKCAhYXJyYXkgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgaW5kZXggPSBhcnJheS5pbmRleE9mKCBtZW1iZXIgKTtcblxuXHRpZiAoIGluZGV4ICE9PSAtMSApIHtcblx0XHRhcnJheS5zcGxpY2UoIGluZGV4LCAxICk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkgKCBhcnJheUxpa2UgKSB7XG5cdHZhciBhcnJheSA9IFtdLCBpID0gYXJyYXlMaWtlLmxlbmd0aDtcblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0YXJyYXlbaV0gPSBhcnJheUxpa2VbaV07XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQnlLZXlWYWx1ZSggYXJyYXksIGtleSwgdmFsdWUgKSB7XG5cdHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4gb2JqW2tleV0gPT09IHZhbHVlO1xuXHR9KTtcbn1cbiIsImNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcbmNvbnN0ICRodG1sID0gJChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuY29uc3QgJGJvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xuXG5leHBvcnQgeyAkZG9jdW1lbnQsICR3aW5kb3csICRodG1sLCAkYm9keSB9O1xuIiwiLyoganNoaW50IGVzbmV4dDogdHJ1ZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xufVxuIiwiLyoqXG4gKiBAc2VlICBodHRwczovL2dpdGh1Yi5jb20vcmFjdGl2ZWpzL3JhY3RpdmUvYmxvYi9kZXYvc3JjL3V0aWxzL2h0bWwuanNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG59XG5cbi8qKlxuICogUHJlcGFyZSBIVE1MIGNvbnRlbnQgdGhhdCBjb250YWlucyBtdXN0YWNoZSBjaGFyYWN0ZXJzIGZvciB1c2Ugd2l0aCBSYWN0aXZlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5lc2NhcGVIdG1sKHN0cikge1xuICAgIHJldHVybiBzdHJcbiAgICAgICAgLnJlcGxhY2UoLyZsdDsvZywgJzwnKVxuICAgICAgICAucmVwbGFjZSgvJmd0Oy9nLCAnPicpXG4gICAgICAgIC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xufVxuXG4vKipcbiAqIEdldCBlbGVtZW50IGRhdGEgYXR0cmlidXRlc1xuICogQHBhcmFtICAge0RPTUVsZW1lbnR9ICBub2RlXG4gKiBAcmV0dXJuICB7QXJyYXl9ICAgICAgIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVEYXRhKG5vZGUpIHtcbiAgICAvLyBBbGwgYXR0cmlidXRlc1xuICAgIHZhciBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgLy8gUmVnZXggUGF0dGVyblxuICAgIHZhciBwYXR0ZXJuID0gL15kYXRhXFwtKC4rKSQvO1xuXG4gICAgLy8gT3V0cHV0XG4gICAgdmFyIGRhdGEgPSB7fTtcblxuICAgIGZvciAobGV0IGkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbaV0pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXR0cmlidXRlcyBuYW1lIChleDogZGF0YS1tb2R1bGUpXG4gICAgICAgIGxldCBuYW1lID0gYXR0cmlidXRlc1tpXS5uYW1lO1xuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucy5cbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXRjaCA9IG5hbWUubWF0Y2gocGF0dGVybik7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhpcyB0aHJvd3MgYW4gZXJyb3IsIHlvdSBoYXZlIHNvbWVcbiAgICAgICAgLy8gc2VyaW91cyBwcm9ibGVtcyBpbiB5b3VyIEhUTUwuXG4gICAgICAgIGRhdGFbbWF0Y2hbMV1dID0gbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJ2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuXHRhcnJheUxpa2VQYXR0ZXJuID0gL15cXFtvYmplY3QgKD86QXJyYXl8RmlsZUxpc3QpXFxdJC87XG5cbi8vIHRoYW5rcywgaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vaW5zdGFuY2VvZi1jb25zaWRlcmVkLWhhcm1mdWwtb3ItaG93LXRvLXdyaXRlLWEtcm9idXN0LWlzYXJyYXkvXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSAoIHRoaW5nICkge1xuXHRyZXR1cm4gdG9TdHJpbmcuY2FsbCggdGhpbmcgKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXlMaWtlICggb2JqICkge1xuXHRyZXR1cm4gYXJyYXlMaWtlUGF0dGVybi50ZXN0KCB0b1N0cmluZy5jYWxsKCBvYmogKSApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbCAoIGEsIGIgKSB7XG5cdGlmICggYSA9PT0gbnVsbCAmJiBiID09PSBudWxsICkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aWYgKCB0eXBlb2YgYSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgPT09ICdvYmplY3QnICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBhID09PSBiO1xufVxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE4MDgyL3ZhbGlkYXRlLW51bWJlcnMtaW4tamF2YXNjcmlwdC1pc251bWVyaWNcbmV4cG9ydCBmdW5jdGlvbiBpc051bWVyaWMgKCB0aGluZyApIHtcblx0cmV0dXJuICFpc05hTiggcGFyc2VGbG9hdCggdGhpbmcgKSApICYmIGlzRmluaXRlKCB0aGluZyApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QgKCB0aGluZyApIHtcblx0cmV0dXJuICggdGhpbmcgJiYgdG9TdHJpbmcuY2FsbCggdGhpbmcgKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24oIHRoaW5nICkge1xuXHR2YXIgZ2V0VHlwZSA9IHt9O1xuXHRyZXR1cm4gdGhpbmcgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cbiIsIi8qIGpzaGludCBlc25leHQ6IHRydWUgKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzJztcbmltcG9ydCB7IGFycmF5Q29udGFpbnMsIGZpbmRCeUtleVZhbHVlLCByZW1vdmVGcm9tQXJyYXkgfSBmcm9tICcuL2FycmF5JztcbmltcG9ydCB7ICRkb2N1bWVudCwgJHdpbmRvdywgJGh0bWwsICRib2R5IH0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cbmNvbnN0IENBTExCQUNLUyA9IHtcblx0aGlkZGVuOiBbXSxcblx0dmlzaWJsZTogW11cbn07XG5cbmNvbnN0IEFDVElPTlMgPSBbXG5cdCdhZGRDYWxsYmFjaycsXG5cdCdyZW1vdmVDYWxsYmFjaydcbl07XG5cbmNvbnN0IFNUQVRFUyA9IFtcblx0J3Zpc2libGUnLFxuXHQnaGlkZGVuJ1xuXTtcblxuY29uc3QgUFJFRklYID0gJ3YtJztcblxubGV0IFVVSUQgPSAwO1xuXG4vLyBNYWluIGV2ZW50XG4kZG9jdW1lbnQub24oJ3Zpc2liaWxpdHljaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuXHRpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG5cdFx0b25Eb2N1bWVudENoYW5nZSgnaGlkZGVuJyk7XG5cdH0gZWxzZSB7XG5cdFx0b25Eb2N1bWVudENoYW5nZSgndmlzaWJsZScpO1xuXHR9XG59KTtcblxuLyoqXG4gKiBBZGQgYSBjYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9ICAgc3RhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBpZGVudFxuICovXG5mdW5jdGlvbiBhZGRDYWxsYmFjayAoc3RhdGUsIG9wdGlvbnMpIHtcblx0bGV0IGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjayB8fCAnJztcblxuXHRpZiAoIWlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG5cdFx0Y29uc29sZS53YXJuKCdDYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBpZGVudCA9IFBSRUZJWCArIFVVSUQrKztcblxuXHRDQUxMQkFDS1Nbc3RhdGVdLnB1c2goe1xuXHRcdGlkZW50OiBpZGVudCxcblx0XHRjYWxsYmFjazogY2FsbGJhY2tcblx0fSk7XG5cblx0cmV0dXJuIGlkZW50O1xufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNhbGxiYWNrXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgc3RhdGUgIFZpc2libGUgb3IgaGlkZGVuXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgaWRlbnQgIFVuaXF1ZSBpZGVudGlmaWVyXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgIElmIG9wZXJhdGlvbiB3YXMgYSBzdWNjZXNzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNhbGxiYWNrIChzdGF0ZSwgb3B0aW9ucykge1xuXHRsZXQgaWRlbnQgPSBvcHRpb25zLmlkZW50IHx8ICcnO1xuXG5cdGlmICh0eXBlb2YoaWRlbnQpID09PSAndW5kZWZpbmVkJyB8fCBpZGVudCA9PT0gJycpIHtcblx0XHRjb25zb2xlLndhcm4oJ05lZWQgaWRlbnQgdG8gcmVtb3ZlIGNhbGxiYWNrJyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0bGV0IGluZGV4ID0gZmluZEJ5S2V5VmFsdWUoQ0FMTEJBQ0tTW3N0YXRlXSwgJ2lkZW50JywgaWRlbnQpWzBdO1xuXG5cdC8vIGNvbnNvbGUubG9nKGlkZW50KVxuXHQvLyBjb25zb2xlLmxvZyhDQUxMQkFDS1Nbc3RhdGVdKVxuXG5cdGlmICh0eXBlb2YoaW5kZXgpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHJlbW92ZUZyb21BcnJheShDQUxMQkFDS1Nbc3RhdGVdLCBpbmRleCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKCdDYWxsYmFjayBjb3VsZCBub3QgYmUgZm91bmQnKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuLyoqXG4gKiBXaGVuIGRvY3VtZW50IHN0YXRlIGNoYW5nZXMsIHRyaWdnZXIgY2FsbGJhY2tzXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBzdGF0ZSAgVmlzaWJsZSBvciBoaWRkZW5cbiAqL1xuZnVuY3Rpb24gb25Eb2N1bWVudENoYW5nZSAoc3RhdGUpIHtcblx0bGV0IGNhbGxiYWNrQXJyYXkgPSBDQUxMQkFDS1Nbc3RhdGVdO1xuXHRsZXQgaSA9IDA7XG5cdGxldCBsZW4gPSBjYWxsYmFja0FycmF5Lmxlbmd0aDtcblxuXHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Y2FsbGJhY2tBcnJheVtpXS5jYWxsYmFjaygpO1xuXHR9XG59XG5cbi8qKlxuICogUHVibGljIGZhY2luZyBBUEkgZm9yIGFkZGluZyBhbmQgcmVtb3ZpbmcgY2FsbGJhY2tzXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICAgICAgICAgb3B0aW9ucyAgT3B0aW9uc1xuICogQHJldHVybiAge2Jvb2xlYW58aW50ZWdlcn0gICAgICAgICAgIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY2FsbGJhY2sgb3IgYm9vbGVhbiBpbmRpY2F0aW5nIHN1Y2Nlc3Mgb3IgZmFpbHVyZVxuICovXG5mdW5jdGlvbiB2aXNpYmlsaXR5QXBpIChvcHRpb25zKSB7XG5cdGxldCBhY3Rpb24gPSBvcHRpb25zLmFjdGlvbiB8fCAnJztcblx0bGV0IHN0YXRlID0gb3B0aW9ucy5zdGF0ZSB8fCAnJztcblx0bGV0IHJldDtcblxuXHQvLyBUeXBlIGFuZCB2YWx1ZSBjaGVja2luZ1xuXHRpZiAoIWFycmF5Q29udGFpbnMoQUNUSU9OUywgYWN0aW9uKSkge1xuXHRcdGNvbnNvbGUud2FybignQWN0aW9uIGRvZXMgbm90IGV4aXN0Jyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmICghYXJyYXlDb250YWlucyhTVEFURVMsIHN0YXRlKSkge1xuXHRcdGNvbnNvbGUud2FybignU3RhdGUgZG9lcyBub3QgZXhpc3QnKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBAdG9kbyBNYWdpYyBjYWxsIGZ1bmN0aW9uIHBsc1xuXHRpZiAoYWN0aW9uID09PSAnYWRkQ2FsbGJhY2snKSB7XG5cdFx0cmV0ID0gYWRkQ2FsbGJhY2soc3RhdGUsIG9wdGlvbnMpO1xuXHR9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3JlbW92ZUNhbGxiYWNrJykge1xuXHRcdHJldCA9IHJlbW92ZUNhbGxiYWNrKHN0YXRlLCBvcHRpb25zKTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCB7IHZpc2liaWxpdHlBcGkgfTtcbiJdfQ==
