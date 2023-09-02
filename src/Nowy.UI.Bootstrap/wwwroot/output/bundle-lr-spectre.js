/******/ var __webpack_modules__ = ({

/***/ "./resources/nowy/common/_index.ts":
/*!*****************************************!*\
  !*** ./resources/nowy/common/_index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _thirdparty_pinch_zoom_pinch_zoom_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../thirdparty/pinch-zoom/pinch-zoom.min */ "./resources/thirdparty/pinch-zoom/pinch-zoom.min.js");
/* harmony import */ var _thirdparty_pinch_zoom_pinch_zoom_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_thirdparty_pinch_zoom_pinch_zoom_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _thirdparty_long_press_event_long_press_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../thirdparty/long-press-event/long-press-event */ "./resources/thirdparty/long-press-event/long-press-event.js");
/* harmony import */ var _thirdparty_long_press_event_long_press_event__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_thirdparty_long_press_event_long_press_event__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general */ "./resources/nowy/common/general.ts");
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_general__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _telerik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./telerik */ "./resources/nowy/common/telerik.ts");
/* harmony import */ var _telerik__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_telerik__WEBPACK_IMPORTED_MODULE_3__);
// import "@fluentui/web-components/dist/web-components.min";






/***/ }),

/***/ "./resources/nowy/common/general.ts":
/*!******************************************!*\
  !*** ./resources/nowy/common/general.ts ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "./resources/nowy/common/telerik.ts":
/*!******************************************!*\
  !*** ./resources/nowy/common/telerik.ts ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "./resources/nowy/framework-spectre/_index.ts":
/*!****************************************************!*\
  !*** ./resources/nowy/framework-spectre/_index.ts ***!
  \****************************************************/
/***/ (() => {



/***/ }),

/***/ "./resources/nowy/theme-lr/_index.ts":
/*!*******************************************!*\
  !*** ./resources/nowy/theme-lr/_index.ts ***!
  \*******************************************/
/***/ (() => {



/***/ }),

/***/ "./resources/thirdparty/long-press-event/long-press-event.js":
/*!*******************************************************************!*\
  !*** ./resources/thirdparty/long-press-event/long-press-event.js ***!
  \*******************************************************************/
/***/ (() => {

/*!
 * long-press-event - v@version@
 * Pure JavaScript long-press-event
 * https://github.com/john-doherty/long-press-event
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {

    'use strict';

    // local timer object based on rAF
    var timer = null;

    // check if we're using a touch screen
    var hasPointerEvents = (('PointerEvent' in window) || (window.navigator && 'msPointerEnabled' in window.navigator));
    var isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

    // switch to pointer events or touch events if using a touch screen
    var mouseDown = hasPointerEvents ? 'pointerdown' : isTouch ? 'touchstart' : 'mousedown';
    var mouseUp = hasPointerEvents ? 'pointerup' : isTouch ? 'touchend' : 'mouseup';
    var mouseMove = hasPointerEvents ? 'pointermove' : isTouch ? 'touchmove' : 'mousemove';

    // track number of pixels the mouse moves during long press
    var startX = 0; // mouse x position when timer started
    var startY = 0; // mouse y position when timer started
    var maxDiffX = 10; // max number of X pixels the mouse can move during long press before it is canceled
    var maxDiffY = 10; // max number of Y pixels the mouse can move during long press before it is canceled

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    // requestAnimationFrame() shim by Paul Irish
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    /**
     * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     * @returns {object} handle to the timeout object
     */
    function requestTimeout(fn, delay) {

        if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame &&
            !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
            !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return window.setTimeout(fn, delay);

        var start = new Date().getTime();
        var handle = {};

        var loop = function () {
            var current = new Date().getTime();
            var delta = current - start;

            if (delta >= delay) {
                fn.call();
            }
            else {
                handle.value = requestAnimFrame(loop);
            }
        };

        handle.value = requestAnimFrame(loop);

        return handle;
    }

    /**
     * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {object} handle The callback function
     * @returns {void}
     */
    function clearRequestTimeout(handle) {
        if (handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
                window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
                    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
                        window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
                            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
                                window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
                                    clearTimeout(handle);
        }
    }

    /**
     * Fires the 'long-press' event on element
     * @param {MouseEvent|PointerEvent|TouchEvent} originalEvent The original event being fired
     * @returns {void}
     */
    function fireLongPressEvent(originalEvent) {

        clearLongPressTimer();

        originalEvent = unifyEvent(originalEvent);

        // fire the long-press event
        var allowClickEvent = this.dispatchEvent(new CustomEvent('contextmenu', {
            bubbles: true,
            cancelable: true,

            // custom event data (legacy)
            detail: {
                clientX: originalEvent.clientX,
                clientY: originalEvent.clientY
            },

            // add coordinate data that would typically acompany a touch/click event
            clientX: originalEvent.clientX,
            clientY: originalEvent.clientY,
            offsetX: originalEvent.offsetX,
            offsetY: originalEvent.offsetY,
            pageX: originalEvent.pageX,
            pageY: originalEvent.pageY,
            screenX: originalEvent.screenX,
            screenY: originalEvent.screenY
        }));

        if (!allowClickEvent) {
            // suppress the next click event if e.preventDefault() was called in long-press handler
            document.addEventListener('click', function suppressEvent(e) {
                document.removeEventListener('click', suppressEvent, true);
                cancelEvent(e);
            }, true);
        }
    }

    /**
     * consolidates mouse, touch, and Pointer events
     * @param {MouseEvent|PointerEvent|TouchEvent} e The original event being fired
     * @returns {MouseEvent|PointerEvent|Touch}
     */
    function unifyEvent(e) {
        if (e.changedTouches !== undefined) {
            return e.changedTouches[0];
        }
        return e;
    }

    /**
     * method responsible for starting the long press timer
     * @param {event} e - event object
     * @returns {void}
     */
    function startLongPressTimer(e) {

        clearLongPressTimer(e);

        var el = e.target;

        // get delay from html attribute if it exists, otherwise default to 1500
        var longPressDelayInMs = parseInt(getNearestAttribute(el, 'data-long-press-delay', '1500'), 10); // default 1500

        // start the timer
        timer = requestTimeout(fireLongPressEvent.bind(el, e), longPressDelayInMs);
    }

    /**
     * method responsible for clearing a pending long press timer
     * @param {event} e - event object
     * @returns {void}
     */
    function clearLongPressTimer(e) {
        clearRequestTimeout(timer);
        timer = null;
    }

    /**
    * Cancels the current event
    * @param {object} e - browser event object
    * @returns {void}
    */
    function cancelEvent(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Starts the timer on mouse down and logs current position
     * @param {object} e - browser event object
     * @returns {void}
     */
    function mouseDownHandler(e) {
        startX = e.clientX;
        startY = e.clientY;
        startLongPressTimer(e);
    }

    /**
     * If the mouse moves n pixels during long-press, cancel the timer
     * @param {object} e - browser event object
     * @returns {void}
     */
    function mouseMoveHandler(e) {

        // calculate total number of pixels the pointer has moved
        var diffX = Math.abs(startX - e.clientX);
        var diffY = Math.abs(startY - e.clientY);

        // if pointer has moved more than allowed, cancel the long-press timer and therefore the event
        if (diffX >= maxDiffX || diffY >= maxDiffY) {
            clearLongPressTimer(e);
        }
    }

    /**
     * Gets attribute off HTML element or nearest parent
     * @param {object} el - HTML element to retrieve attribute from
     * @param {string} attributeName - name of the attribute
     * @param {any} defaultValue - default value to return if no match found
     * @returns {any} attribute value or defaultValue
     */
    function getNearestAttribute(el, attributeName, defaultValue) {

        // walk up the dom tree looking for data-action and data-trigger
        while (el && el !== document.documentElement) {

            var attributeValue = el.getAttribute(attributeName);

            if (attributeValue) {
                return attributeValue;
            }

            el = el.parentNode;
        }

        return defaultValue;
    }

    // hook events that clear a pending long press event
    document.addEventListener(mouseUp, clearLongPressTimer, true);
    document.addEventListener(mouseMove, mouseMoveHandler, true);
    document.addEventListener('wheel', clearLongPressTimer, true);
    document.addEventListener('scroll', clearLongPressTimer, true);

    // hook events that can trigger a long press event
    document.addEventListener(mouseDown, mouseDownHandler, true); // <- start

}(window, document));


/***/ }),

/***/ "./resources/thirdparty/pinch-zoom/pinch-zoom.min.js":
/*!***********************************************************!*\
  !*** ./resources/thirdparty/pinch-zoom/pinch-zoom.min.js ***!
  \***********************************************************/
/***/ (() => {

"function" != typeof Object.assign && Object.defineProperty(Object, "assign", { value: function (a) { if (null == a) throw new TypeError("Cannot convert undefined or null to object"); for (var b, c = Object(a), d = 1; d < arguments.length; d++)if (b = arguments[d], null != b) for (var e in b) Object.prototype.hasOwnProperty.call(b, e) && (c[e] = b[e]); return c }, writable: !0, configurable: !0 }), "function" != typeof Array.from && (Array.from = function (a) { return [].slice.call(a) }); var buildElement = function (a) { var b = document.implementation.createHTMLDocument(""); return b.body.innerHTML = a, Array.from(b.body.children)[0] }, triggerEvent = function (a, b) { var c = document.createEvent("HTMLEvents"); c.initEvent(b, !0, !1), a.dispatchEvent(c) }, definePinchZoom = function () { var a = Math.min, b = Math.max, c = Math.abs, d = function (a, b) { this.el = a, this.zoomFactor = 1, this.lastScale = 1, this.offset = { x: 0, y: 0 }, this.initialOffset = { x: 0, y: 0 }, this.options = Object.assign({}, this.defaults, b), this.setupMarkup(), this.bindEvents(), this.update(), this.isImageLoaded(this.el) && (this.updateAspectRatio(), this.setupOffsets()), this.enable() }, e = function (c, a) { return c + a }, f = function (a, b) { return a > b - .01 && a < b + .01 }; d.prototype = { defaults: { tapZoomFactor: 2, zoomOutFactor: 1.3, animationDuration: 300, maxZoom: 4, minZoom: .5, draggableUnzoomed: !0, lockDragAxis: !1, setOffsetsOnce: !1, use2d: !0, zoomStartEventName: "pz_zoomstart", zoomUpdateEventName: "pz_zoomupdate", zoomEndEventName: "pz_zoomend", dragStartEventName: "pz_dragstart", dragUpdateEventName: "pz_dragupdate", dragEndEventName: "pz_dragend", doubleTapEventName: "pz_doubletap", verticalPadding: 0, horizontalPadding: 0, onZoomStart: null, onZoomEnd: null, onZoomUpdate: null, onDragStart: null, onDragEnd: null, onDragUpdate: null, onDoubleTap: null }, handleDragStart: function (a) { triggerEvent(this.el, this.options.dragStartEventName), "function" == typeof this.options.onDragStart && this.options.onDragStart(this, a), this.stopAnimation(), this.lastDragPosition = !1, this.hasInteraction = !0, this.handleDrag(a) }, handleDrag: function (a) { var b = this.getTouches(a)[0]; this.drag(b, this.lastDragPosition), this.offset = this.sanitizeOffset(this.offset), this.lastDragPosition = b }, handleDragEnd: function () { triggerEvent(this.el, this.options.dragEndEventName), "function" == typeof this.options.onDragEnd && this.options.onDragEnd(this, event), this.end() }, handleZoomStart: function (a) { triggerEvent(this.el, this.options.zoomStartEventName), "function" == typeof this.options.onZoomStart && this.options.onZoomStart(this, a), this.stopAnimation(), this.lastScale = 1, this.nthZoom = 0, this.lastZoomCenter = !1, this.hasInteraction = !0 }, handleZoom: function (a, b) { var c = this.getTouchCenter(this.getTouches(a)), d = b / this.lastScale; this.lastScale = b, this.nthZoom += 1, 3 < this.nthZoom && (this.scale(d, c), this.drag(c, this.lastZoomCenter)), this.lastZoomCenter = c }, handleZoomEnd: function () { triggerEvent(this.el, this.options.zoomEndEventName), "function" == typeof this.options.onZoomEnd && this.options.onZoomEnd(this, event), this.end() }, handleDoubleTap: function (a) { var b = this.getTouches(a)[0], c = 1 < this.zoomFactor ? 1 : this.options.tapZoomFactor, d = this.zoomFactor, e = function (a) { this.scaleTo(d + a * (c - d), b) }.bind(this); this.hasInteraction || (this.isDoubleTap = !0, d > c && (b = this.getCurrentZoomCenter()), this.animate(this.options.animationDuration, e, this.swing), triggerEvent(this.el, this.options.doubleTapEventName), "function" == typeof this.options.onDoubleTap && this.options.onDoubleTap(this, a)) }, computeInitialOffset: function () { this.initialOffset = { x: -c(this.el.offsetWidth * this.getInitialZoomFactor() - this.container.offsetWidth) / 2, y: -c(this.el.offsetHeight * this.getInitialZoomFactor() - this.container.offsetHeight) / 2 } }, resetOffset: function () { this.offset.x = this.initialOffset.x, this.offset.y = this.initialOffset.y }, isImageLoaded: function (a) { return "IMG" === a.nodeName ? a.complete && 0 !== a.naturalHeight : Array.from(a.querySelectorAll("img")).every(this.isImageLoaded) }, setupOffsets: function () { this.options.setOffsetsOnce && this._isOffsetsSet || (this._isOffsetsSet = !0, this.computeInitialOffset(), this.resetOffset()) }, sanitizeOffset: function (c) { var d = this.el.offsetWidth * this.getInitialZoomFactor() * this.zoomFactor, e = this.el.offsetHeight * this.getInitialZoomFactor() * this.zoomFactor, f = d - this.getContainerX() + this.options.horizontalPadding, g = e - this.getContainerY() + this.options.verticalPadding, h = b(f, 0), i = b(g, 0), j = a(f, 0) - this.options.horizontalPadding, k = a(g, 0) - this.options.verticalPadding; return { x: a(b(c.x, j), h), y: a(b(c.y, k), i) } }, scaleTo: function (a, b) { this.scale(a / this.zoomFactor, b) }, scale: function (a, b) { a = this.scaleZoomFactor(a), this.addOffset({ x: (a - 1) * (b.x + this.offset.x), y: (a - 1) * (b.y + this.offset.y) }), triggerEvent(this.el, this.options.zoomUpdateEventName), "function" == typeof this.options.onZoomUpdate && this.options.onZoomUpdate(this, event) }, scaleZoomFactor: function (c) { var d = this.zoomFactor; return this.zoomFactor *= c, this.zoomFactor = a(this.options.maxZoom, b(this.zoomFactor, this.options.minZoom)), this.zoomFactor / d }, canDrag: function () { return this.options.draggableUnzoomed || !f(this.zoomFactor, 1) }, drag: function (a, b) { b && (this.options.lockDragAxis ? c(a.x - b.x) > c(a.y - b.y) ? this.addOffset({ x: -(a.x - b.x), y: 0 }) : this.addOffset({ y: -(a.y - b.y), x: 0 }) : this.addOffset({ y: -(a.y - b.y), x: -(a.x - b.x) }), triggerEvent(this.el, this.options.dragUpdateEventName), "function" == typeof this.options.onDragUpdate && this.options.onDragUpdate(this, event)) }, getTouchCenter: function (a) { return this.getVectorAvg(a) }, getVectorAvg: function (a) { return { x: a.map(function (a) { return a.x }).reduce(e) / a.length, y: a.map(function (a) { return a.y }).reduce(e) / a.length } }, addOffset: function (a) { this.offset = { x: this.offset.x + a.x, y: this.offset.y + a.y } }, sanitize: function () { this.zoomFactor < this.options.zoomOutFactor ? this.zoomOutAnimation() : this.isInsaneOffset(this.offset) && this.sanitizeOffsetAnimation() }, isInsaneOffset: function (a) { var b = this.sanitizeOffset(a); return b.x !== a.x || b.y !== a.y }, sanitizeOffsetAnimation: function () { var a = this.sanitizeOffset(this.offset), b = { x: this.offset.x, y: this.offset.y }, c = function (c) { this.offset.x = b.x + c * (a.x - b.x), this.offset.y = b.y + c * (a.y - b.y), this.update() }.bind(this); this.animate(this.options.animationDuration, c, this.swing) }, zoomOutAnimation: function () { if (1 !== this.zoomFactor) { var a = this.zoomFactor, b = this.getCurrentZoomCenter(), c = function (c) { this.scaleTo(a + c * (1 - a), b) }.bind(this); this.animate(this.options.animationDuration, c, this.swing) } }, updateAspectRatio: function () { this.unsetContainerY(), this.setContainerY(this.container.parentElement.offsetHeight) }, getInitialZoomFactor: function () { var b = this.container.offsetWidth / this.el.offsetWidth, c = this.container.offsetHeight / this.el.offsetHeight; return a(b, c) }, getAspectRatio: function () { return this.el.offsetWidth / this.el.offsetHeight }, getCurrentZoomCenter: function () { var a = this.offset.x - this.initialOffset.x, b = -1 * this.offset.x - a / (1 / this.zoomFactor - 1), c = this.offset.y - this.initialOffset.y, d = -1 * this.offset.y - c / (1 / this.zoomFactor - 1); return { x: b, y: d } }, getTouches: function (a) { var b = this.container.getBoundingClientRect(), c = document.documentElement.scrollTop || document.body.scrollTop, d = document.documentElement.scrollLeft || document.body.scrollLeft, e = b.top + c, f = b.left + d; return Array.prototype.slice.call(a.touches).map(function (a) { return { x: a.pageX - f, y: a.pageY - e } }) }, animate: function (a, b, c, d) { var e = new Date().getTime(), f = function () { if (this.inAnimation) { var g = new Date().getTime() - e, h = g / a; g >= a ? (b(1), d && d(), this.update(), this.stopAnimation(), this.update()) : (c && (h = c(h)), b(h), this.update(), requestAnimationFrame(f)) } }.bind(this); this.inAnimation = !0, requestAnimationFrame(f) }, stopAnimation: function () { this.inAnimation = !1 }, swing: function (a) { return -Math.cos(a * Math.PI) / 2 + .5 }, getContainerX: function () { return this.container.offsetWidth }, getContainerY: function () { return this.container.offsetHeight }, setContainerY: function (a) { return this.container.style.height = a + "px" }, unsetContainerY: function () { this.container.style.height = null }, setupMarkup: function () { this.container = buildElement("<div class=\"pinch-zoom-container\"></div>"), this.el.parentNode.insertBefore(this.container, this.el), this.container.appendChild(this.el), this.container.style.overflow = "hidden", this.container.style.position = "relative", this.el.style.webkitTransformOrigin = "0% 0%", this.el.style.mozTransformOrigin = "0% 0%", this.el.style.msTransformOrigin = "0% 0%", this.el.style.oTransformOrigin = "0% 0%", this.el.style.transformOrigin = "0% 0%", this.el.style.position = "absolute" }, end: function () { this.hasInteraction = !1, this.sanitize(), this.update() }, bindEvents: function () { var a = this; g(this.container, this), this.resizeHandler = this.update.bind(this), window.addEventListener("resize", this.resizeHandler), Array.from(this.el.querySelectorAll("img")).forEach(function (b) { b.addEventListener("load", a.update.bind(a)) }), "IMG" === this.el.nodeName && this.el.addEventListener("load", this.update.bind(this)) }, update: function (a) { a && "resize" === a.type && (this.updateAspectRatio(), this.setupOffsets()), a && "load" === a.type && (this.updateAspectRatio(), this.setupOffsets()); this.updatePlanned || (this.updatePlanned = !0, window.setTimeout(function () { this.updatePlanned = !1; var a = this.getInitialZoomFactor() * this.zoomFactor, b = -this.offset.x / a, c = -this.offset.y / a, d = "scale3d(" + a + ", " + a + ",1) translate3d(" + b + "px," + c + "px,0px)", e = "scale(" + a + ", " + a + ") translate(" + b + "px," + c + "px)", f = function () { this.clone && (this.clone.parentNode.removeChild(this.clone), delete this.clone) }.bind(this); !this.options.use2d || this.hasInteraction || this.inAnimation ? (this.is3d = !0, f(), this.el.style.webkitTransform = d, this.el.style.mozTransform = e, this.el.style.msTransform = e, this.el.style.oTransform = e, this.el.style.transform = d) : (this.is3d && (this.clone = this.el.cloneNode(!0), this.clone.style.pointerEvents = "none", this.container.appendChild(this.clone), window.setTimeout(f, 200)), this.el.style.webkitTransform = e, this.el.style.mozTransform = e, this.el.style.msTransform = e, this.el.style.oTransform = e, this.el.style.transform = e, this.is3d = !1) }.bind(this), 0)) }, enable: function () { this.enabled = !0 }, disable: function () { this.enabled = !1 }, destroy: function () { window.removeEventListener("resize", this.resizeHandler), this.container && (this.container.remove(), this.container = null) } }; var g = function (a, b) { var c = null, d = 0, e = null, f = null, g = function (a, d) { c !== a && (c && !a && ("zoom" === c ? b.handleZoomEnd(d) : "drag" === c ? b.handleDragEnd(d) : void 0), "zoom" === a ? b.handleZoomStart(d) : "drag" === a ? b.handleDragStart(d) : void 0); c = a }, h = function (a) { 2 === d ? g("zoom") : 1 === d && b.canDrag() ? g("drag", a) : g(null, a) }, i = function (a) { return Array.from(a).map(function (a) { return { x: a.pageX, y: a.pageY } }) }, j = function (c, a) { var d, e, b = Math.sqrt; return d = c.x - a.x, e = c.y - a.y, b(d * d + e * e) }, k = function (a, b) { var c = j(a[0], a[1]), d = j(b[0], b[1]); return d / c }, l = function (a) { a.stopPropagation(), a.preventDefault() }, m = function (a) { var f = new Date().getTime(); 1 < d && (e = null); 300 > f - e ? (l(a), b.handleDoubleTap(a), "zoom" === c ? b.handleZoomEnd(a) : "drag" === c ? b.handleDragEnd(a) : void 0) : b.isDoubleTap = !1; 1 === d && (e = f) }, n = !0; a.addEventListener("touchstart", function (a) { b.enabled && (n = !0, d = a.touches.length, m(a)) }, { passive: !1 }), a.addEventListener("touchmove", function (a) { b.enabled && !b.isDoubleTap && (n ? (h(a), c && l(a), f = i(a.touches)) : ("zoom" === c ? 2 == f.length && 2 == a.touches.length && b.handleZoom(a, k(f, i(a.touches))) : "drag" === c ? b.handleDrag(a) : void 0, c && (l(a), b.update())), n = !1) }, { passive: !1 }), a.addEventListener("touchend", function (a) { b.enabled && (d = a.touches.length, h(a)) }) }; return d }, PinchZoom = definePinchZoom();

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./resources/bundles/bundle-lr-spectre.ts ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nowy_theme_lr_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nowy/theme-lr/_index */ "./resources/nowy/theme-lr/_index.ts");
/* harmony import */ var _nowy_theme_lr_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nowy_theme_lr_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nowy_framework_spectre_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nowy/framework-spectre/_index */ "./resources/nowy/framework-spectre/_index.ts");
/* harmony import */ var _nowy_framework_spectre_index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nowy_framework_spectre_index__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nowy_common_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nowy/common/_index */ "./resources/nowy/common/_index.ts");




})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**************************************************!*\
  !*** ./resources/bundles/bundle-lr-spectre.scss ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWxyLXNwZWN0cmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBNkQ7QUFFVDtBQUNRO0FBRXpDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05uQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQix1QkFBdUI7QUFDdkIsdUJBQXVCOztBQUV2QjtBQUNBOztBQUVBOztBQUVBLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxlQUFlLFVBQVU7QUFDekIsZUFBZSxLQUFLO0FBQ3BCLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRCxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25ELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EseUdBQXlHOztBQUV6RztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxLQUFLO0FBQ3BCLGlCQUFpQixLQUFLO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrRUFBa0U7O0FBRWxFLENBQUM7Ozs7Ozs7Ozs7O0FDbFFELGdGQUFnRixzQkFBc0Isa0ZBQWtGLGtDQUFrQyxzQkFBc0IsbUhBQW1ILFVBQVUsa0NBQWtDLG1FQUFtRSx5QkFBeUIsR0FBRyxrQ0FBa0Msd0RBQXdELDZEQUE2RCxtQ0FBbUMsNENBQTRDLDRDQUE0QyxrQ0FBa0Msb0VBQW9FLHNFQUFzRSxZQUFZLHlCQUF5QixZQUFZLGlDQUFpQywwS0FBMEssd0JBQXdCLGNBQWMsd0JBQXdCLHFDQUFxQyxnQkFBZ0IsWUFBWSxva0JBQW9rQixrQ0FBa0MsNE9BQTRPLDZCQUE2QiwrQkFBK0IsZ0hBQWdILCtCQUErQixzSkFBc0osa0NBQWtDLDRQQUE0UCxnQ0FBZ0MseUVBQXlFLDJJQUEySSwrQkFBK0Isc0pBQXNKLGtDQUFrQyxpSUFBaUksa0NBQWtDLGFBQWEscVNBQXFTLHNDQUFzQyx1QkFBdUIsMExBQTBMLDZCQUE2Qiw0RUFBNEUsZ0NBQWdDLHFJQUFxSSw4QkFBOEIsaUlBQWlJLGlDQUFpQyx1WUFBdVksU0FBUywwQ0FBMEMsNkJBQTZCLG9DQUFvQywyQkFBMkIsOENBQThDLHdFQUF3RSxzSkFBc0osa0NBQWtDLHlCQUF5Qix1SUFBdUkseUJBQXlCLGlFQUFpRSwwQkFBMEIsaUZBQWlGLHVCQUF1QixxQkFBcUIsdUJBQXVCLHFCQUFxQixrQ0FBa0MsdUpBQXVKLGlDQUFpQyw2QkFBNkIsK0JBQStCLFNBQVMsd0JBQXdCLFlBQVksZ0RBQWdELFlBQVksMEJBQTBCLDRCQUE0QixnQkFBZ0Isa0RBQWtELDBCQUEwQiw2SUFBNkksaUNBQWlDLGdDQUFnQyxtQ0FBbUMseUNBQXlDLGdEQUFnRCxvQ0FBb0MscUJBQXFCLDZGQUE2RixhQUFhLDZEQUE2RCxrQ0FBa0MsNkJBQTZCLDZFQUE2RSxrQ0FBa0MsYUFBYSwrREFBK0QsbUNBQW1DLHVGQUF1RixzQ0FBc0Msa0hBQWtILGdCQUFnQixnQ0FBZ0MsbURBQW1ELHNDQUFzQyx3TUFBd00sU0FBUyxjQUFjLDZCQUE2Qix1TkFBdU4sZ0VBQWdFLFNBQVMsa0NBQWtDLEdBQUcsbUNBQW1DLGdEQUFnRCx3QkFBd0IsNkNBQTZDLG9KQUFvSixhQUFhLGlEQUFpRCwrQkFBK0IsdUJBQXVCLHdCQUF3Qix3Q0FBd0MsK0JBQStCLG1DQUFtQywrQkFBK0Isb0NBQW9DLGdDQUFnQywrQ0FBK0MsaUNBQWlDLG9DQUFvQyw2QkFBNkIsZ2dCQUFnZ0IscUJBQXFCLDBEQUEwRCw0QkFBNEIsY0FBYyxnTUFBZ00sOENBQThDLDJGQUEyRix5QkFBeUIsd0pBQXdKLGdGQUFnRix5QkFBeUIsK1FBQStRLGtGQUFrRixhQUFhLG9rQkFBb2tCLGtCQUFrQix3QkFBd0IsbUJBQW1CLHlCQUF5QixtQkFBbUIseUJBQXlCLGtJQUFrSSwwQkFBMEIsK0RBQStELDhMQUE4TCxPQUFPLHFCQUFxQiwwRUFBMEUscUJBQXFCLHdDQUF3QyxTQUFTLDBCQUEwQixHQUFHLHdCQUF3Qix5QkFBeUIsdURBQXVELHdCQUF3QiwwQ0FBMEMsY0FBYyxxQkFBcUIseUNBQXlDLHFCQUFxQiw4QkFBOEIscUJBQXFCLGlKQUFpSixvQkFBb0IsVUFBVSxnREFBZ0QsbURBQW1ELElBQUksYUFBYSxrREFBa0Qsc1BBQXNQLElBQUksYUFBYSxpREFBaUQsMkNBQTJDLEtBQUssVUFBVTs7Ozs7O1NDQTUvWTtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EsaUNBQWlDLFdBQVc7VUFDNUM7VUFDQTs7Ozs7VUNQQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMaUM7QUFDUztBQUNYOzs7Ozs7Ozs7O0FDSC9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL25vd3kvY29tbW9uL19pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvdGhpcmRwYXJ0eS9sb25nLXByZXNzLWV2ZW50L2xvbmctcHJlc3MtZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3RoaXJkcGFydHkvcGluY2gtem9vbS9waW5jaC16b29tLm1pbi5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2J1bmRsZXMvYnVuZGxlLWxyLXNwZWN0cmUudHMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2J1bmRsZXMvYnVuZGxlLWxyLXNwZWN0cmUuc2Nzcz83ZGU4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBcIkBmbHVlbnR1aS93ZWItY29tcG9uZW50cy9kaXN0L3dlYi1jb21wb25lbnRzLm1pblwiO1xuXG5pbXBvcnQgXCIuLi8uLi90aGlyZHBhcnR5L3BpbmNoLXpvb20vcGluY2gtem9vbS5taW5cIjtcbmltcG9ydCBcIi4uLy4uL3RoaXJkcGFydHkvbG9uZy1wcmVzcy1ldmVudC9sb25nLXByZXNzLWV2ZW50XCI7XG5cbmltcG9ydCBcIi4vZ2VuZXJhbFwiO1xuaW1wb3J0IFwiLi90ZWxlcmlrXCI7XG4iLCIvKiFcbiAqIGxvbmctcHJlc3MtZXZlbnQgLSB2QHZlcnNpb25AXG4gKiBQdXJlIEphdmFTY3JpcHQgbG9uZy1wcmVzcy1ldmVudFxuICogaHR0cHM6Ly9naXRodWIuY29tL2pvaG4tZG9oZXJ0eS9sb25nLXByZXNzLWV2ZW50XG4gKiBAYXV0aG9yIEpvaG4gRG9oZXJ0eSA8d3d3LmpvaG5kb2hlcnR5LmluZm8+XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBsb2NhbCB0aW1lciBvYmplY3QgYmFzZWQgb24gckFGXG4gICAgdmFyIHRpbWVyID0gbnVsbDtcblxuICAgIC8vIGNoZWNrIGlmIHdlJ3JlIHVzaW5nIGEgdG91Y2ggc2NyZWVuXG4gICAgdmFyIGhhc1BvaW50ZXJFdmVudHMgPSAoKCdQb2ludGVyRXZlbnQnIGluIHdpbmRvdykgfHwgKHdpbmRvdy5uYXZpZ2F0b3IgJiYgJ21zUG9pbnRlckVuYWJsZWQnIGluIHdpbmRvdy5uYXZpZ2F0b3IpKTtcbiAgICB2YXIgaXNUb3VjaCA9ICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCAobmF2aWdhdG9yLk1heFRvdWNoUG9pbnRzID4gMCkgfHwgKG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCkpO1xuXG4gICAgLy8gc3dpdGNoIHRvIHBvaW50ZXIgZXZlbnRzIG9yIHRvdWNoIGV2ZW50cyBpZiB1c2luZyBhIHRvdWNoIHNjcmVlblxuICAgIHZhciBtb3VzZURvd24gPSBoYXNQb2ludGVyRXZlbnRzID8gJ3BvaW50ZXJkb3duJyA6IGlzVG91Y2ggPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJztcbiAgICB2YXIgbW91c2VVcCA9IGhhc1BvaW50ZXJFdmVudHMgPyAncG9pbnRlcnVwJyA6IGlzVG91Y2ggPyAndG91Y2hlbmQnIDogJ21vdXNldXAnO1xuICAgIHZhciBtb3VzZU1vdmUgPSBoYXNQb2ludGVyRXZlbnRzID8gJ3BvaW50ZXJtb3ZlJyA6IGlzVG91Y2ggPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnO1xuXG4gICAgLy8gdHJhY2sgbnVtYmVyIG9mIHBpeGVscyB0aGUgbW91c2UgbW92ZXMgZHVyaW5nIGxvbmcgcHJlc3NcbiAgICB2YXIgc3RhcnRYID0gMDsgLy8gbW91c2UgeCBwb3NpdGlvbiB3aGVuIHRpbWVyIHN0YXJ0ZWRcbiAgICB2YXIgc3RhcnRZID0gMDsgLy8gbW91c2UgeSBwb3NpdGlvbiB3aGVuIHRpbWVyIHN0YXJ0ZWRcbiAgICB2YXIgbWF4RGlmZlggPSAxMDsgLy8gbWF4IG51bWJlciBvZiBYIHBpeGVscyB0aGUgbW91c2UgY2FuIG1vdmUgZHVyaW5nIGxvbmcgcHJlc3MgYmVmb3JlIGl0IGlzIGNhbmNlbGVkXG4gICAgdmFyIG1heERpZmZZID0gMTA7IC8vIG1heCBudW1iZXIgb2YgWSBwaXhlbHMgdGhlIG1vdXNlIGNhbiBtb3ZlIGR1cmluZyBsb25nIHByZXNzIGJlZm9yZSBpdCBpcyBjYW5jZWxlZFxuXG4gICAgLy8gcGF0Y2ggQ3VzdG9tRXZlbnQgdG8gYWxsb3cgY29uc3RydWN0b3IgY3JlYXRpb24gKElFL0Nocm9tZSlcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgICAgIHdpbmRvdy5DdXN0b21FdmVudCA9IGZ1bmN0aW9uIChldmVudCwgcGFyYW1zKSB7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcblxuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICAgICAgICAgIHJldHVybiBldnQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LkN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gICAgfVxuXG4gICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgc2hpbSBieSBQYXVsIElyaXNoXG4gICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgc2V0VGltZW91dCBleGNlcHQgdXNlcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZSBwb3NzaWJsZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtpbnR9IGRlbGF5IFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBoYW5kbGUgdG8gdGhlIHRpbWVvdXQgb2JqZWN0XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpbWVvdXQoZm4sIGRlbGF5KSB7XG5cbiAgICAgICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmICF3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAgICAgICAhKHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSkgJiYgLy8gRmlyZWZveCA1IHNoaXBzIHdpdGhvdXQgY2FuY2VsIHN1cHBvcnRcbiAgICAgICAgICAgICF3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAmJiAhd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZm4sIGRlbGF5KTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGhhbmRsZSA9IHt9O1xuXG4gICAgICAgIHZhciBsb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IGN1cnJlbnQgLSBzdGFydDtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID49IGRlbGF5KSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLnZhbHVlID0gcmVxdWVzdEFuaW1GcmFtZShsb29wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBoYW5kbGUudmFsdWUgPSByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApO1xuXG4gICAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmVoYXZlcyB0aGUgc2FtZSBhcyBjbGVhclRpbWVvdXQgZXhjZXB0IHVzZXMgY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgd2hlcmUgcG9zc2libGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBoYW5kbGUgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpIHtcbiAgICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6IC8qIFN1cHBvcnQgZm9yIGxlZ2FjeSBBUEkgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgdGhlICdsb25nLXByZXNzJyBldmVudCBvbiBlbGVtZW50XG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fFBvaW50ZXJFdmVudHxUb3VjaEV2ZW50fSBvcmlnaW5hbEV2ZW50IFRoZSBvcmlnaW5hbCBldmVudCBiZWluZyBmaXJlZFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpcmVMb25nUHJlc3NFdmVudChvcmlnaW5hbEV2ZW50KSB7XG5cbiAgICAgICAgY2xlYXJMb25nUHJlc3NUaW1lcigpO1xuXG4gICAgICAgIG9yaWdpbmFsRXZlbnQgPSB1bmlmeUV2ZW50KG9yaWdpbmFsRXZlbnQpO1xuXG4gICAgICAgIC8vIGZpcmUgdGhlIGxvbmctcHJlc3MgZXZlbnRcbiAgICAgICAgdmFyIGFsbG93Q2xpY2tFdmVudCA9IHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NvbnRleHRtZW51Jywge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIGN1c3RvbSBldmVudCBkYXRhIChsZWdhY3kpXG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBjbGllbnRYOiBvcmlnaW5hbEV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgY2xpZW50WTogb3JpZ2luYWxFdmVudC5jbGllbnRZXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBhZGQgY29vcmRpbmF0ZSBkYXRhIHRoYXQgd291bGQgdHlwaWNhbGx5IGFjb21wYW55IGEgdG91Y2gvY2xpY2sgZXZlbnRcbiAgICAgICAgICAgIGNsaWVudFg6IG9yaWdpbmFsRXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFk6IG9yaWdpbmFsRXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgIG9mZnNldFg6IG9yaWdpbmFsRXZlbnQub2Zmc2V0WCxcbiAgICAgICAgICAgIG9mZnNldFk6IG9yaWdpbmFsRXZlbnQub2Zmc2V0WSxcbiAgICAgICAgICAgIHBhZ2VYOiBvcmlnaW5hbEV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgcGFnZVk6IG9yaWdpbmFsRXZlbnQucGFnZVksXG4gICAgICAgICAgICBzY3JlZW5YOiBvcmlnaW5hbEV2ZW50LnNjcmVlblgsXG4gICAgICAgICAgICBzY3JlZW5ZOiBvcmlnaW5hbEV2ZW50LnNjcmVlbllcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICghYWxsb3dDbGlja0V2ZW50KSB7XG4gICAgICAgICAgICAvLyBzdXBwcmVzcyB0aGUgbmV4dCBjbGljayBldmVudCBpZiBlLnByZXZlbnREZWZhdWx0KCkgd2FzIGNhbGxlZCBpbiBsb25nLXByZXNzIGhhbmRsZXJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gc3VwcHJlc3NFdmVudChlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdXBwcmVzc0V2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxFdmVudChlKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29uc29saWRhdGVzIG1vdXNlLCB0b3VjaCwgYW5kIFBvaW50ZXIgZXZlbnRzXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fFBvaW50ZXJFdmVudHxUb3VjaEV2ZW50fSBlIFRoZSBvcmlnaW5hbCBldmVudCBiZWluZyBmaXJlZFxuICAgICAqIEByZXR1cm5zIHtNb3VzZUV2ZW50fFBvaW50ZXJFdmVudHxUb3VjaH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bmlmeUV2ZW50KGUpIHtcbiAgICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbWV0aG9kIHJlc3BvbnNpYmxlIGZvciBzdGFydGluZyB0aGUgbG9uZyBwcmVzcyB0aW1lclxuICAgICAqIEBwYXJhbSB7ZXZlbnR9IGUgLSBldmVudCBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFydExvbmdQcmVzc1RpbWVyKGUpIHtcblxuICAgICAgICBjbGVhckxvbmdQcmVzc1RpbWVyKGUpO1xuXG4gICAgICAgIHZhciBlbCA9IGUudGFyZ2V0O1xuXG4gICAgICAgIC8vIGdldCBkZWxheSBmcm9tIGh0bWwgYXR0cmlidXRlIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIGRlZmF1bHQgdG8gMTUwMFxuICAgICAgICB2YXIgbG9uZ1ByZXNzRGVsYXlJbk1zID0gcGFyc2VJbnQoZ2V0TmVhcmVzdEF0dHJpYnV0ZShlbCwgJ2RhdGEtbG9uZy1wcmVzcy1kZWxheScsICcxNTAwJyksIDEwKTsgLy8gZGVmYXVsdCAxNTAwXG5cbiAgICAgICAgLy8gc3RhcnQgdGhlIHRpbWVyXG4gICAgICAgIHRpbWVyID0gcmVxdWVzdFRpbWVvdXQoZmlyZUxvbmdQcmVzc0V2ZW50LmJpbmQoZWwsIGUpLCBsb25nUHJlc3NEZWxheUluTXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG1ldGhvZCByZXNwb25zaWJsZSBmb3IgY2xlYXJpbmcgYSBwZW5kaW5nIGxvbmcgcHJlc3MgdGltZXJcbiAgICAgKiBAcGFyYW0ge2V2ZW50fSBlIC0gZXZlbnQgb2JqZWN0XG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2xlYXJMb25nUHJlc3NUaW1lcihlKSB7XG4gICAgICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBDYW5jZWxzIHRoZSBjdXJyZW50IGV2ZW50XG4gICAgKiBAcGFyYW0ge29iamVjdH0gZSAtIGJyb3dzZXIgZXZlbnQgb2JqZWN0XG4gICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNhbmNlbEV2ZW50KGUpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGltZXIgb24gbW91c2UgZG93biBhbmQgbG9ncyBjdXJyZW50IHBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGUgLSBicm93c2VyIGV2ZW50IG9iamVjdFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1vdXNlRG93bkhhbmRsZXIoZSkge1xuICAgICAgICBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgICAgIHN0YXJ0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgc3RhcnRMb25nUHJlc3NUaW1lcihlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgbW91c2UgbW92ZXMgbiBwaXhlbHMgZHVyaW5nIGxvbmctcHJlc3MsIGNhbmNlbCB0aGUgdGltZXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSAtIGJyb3dzZXIgZXZlbnQgb2JqZWN0XG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gbW91c2VNb3ZlSGFuZGxlcihlKSB7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRvdGFsIG51bWJlciBvZiBwaXhlbHMgdGhlIHBvaW50ZXIgaGFzIG1vdmVkXG4gICAgICAgIHZhciBkaWZmWCA9IE1hdGguYWJzKHN0YXJ0WCAtIGUuY2xpZW50WCk7XG4gICAgICAgIHZhciBkaWZmWSA9IE1hdGguYWJzKHN0YXJ0WSAtIGUuY2xpZW50WSk7XG5cbiAgICAgICAgLy8gaWYgcG9pbnRlciBoYXMgbW92ZWQgbW9yZSB0aGFuIGFsbG93ZWQsIGNhbmNlbCB0aGUgbG9uZy1wcmVzcyB0aW1lciBhbmQgdGhlcmVmb3JlIHRoZSBldmVudFxuICAgICAgICBpZiAoZGlmZlggPj0gbWF4RGlmZlggfHwgZGlmZlkgPj0gbWF4RGlmZlkpIHtcbiAgICAgICAgICAgIGNsZWFyTG9uZ1ByZXNzVGltZXIoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGF0dHJpYnV0ZSBvZmYgSFRNTCBlbGVtZW50IG9yIG5lYXJlc3QgcGFyZW50XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVsIC0gSFRNTCBlbGVtZW50IHRvIHJldHJpZXZlIGF0dHJpYnV0ZSBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWUgLSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVmYXVsdFZhbHVlIC0gZGVmYXVsdCB2YWx1ZSB0byByZXR1cm4gaWYgbm8gbWF0Y2ggZm91bmRcbiAgICAgKiBAcmV0dXJucyB7YW55fSBhdHRyaWJ1dGUgdmFsdWUgb3IgZGVmYXVsdFZhbHVlXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TmVhcmVzdEF0dHJpYnV0ZShlbCwgYXR0cmlidXRlTmFtZSwgZGVmYXVsdFZhbHVlKSB7XG5cbiAgICAgICAgLy8gd2FsayB1cCB0aGUgZG9tIHRyZWUgbG9va2luZyBmb3IgZGF0YS1hY3Rpb24gYW5kIGRhdGEtdHJpZ2dlclxuICAgICAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuXG4gICAgICAgICAgICB2YXIgYXR0cmlidXRlVmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBob29rIGV2ZW50cyB0aGF0IGNsZWFyIGEgcGVuZGluZyBsb25nIHByZXNzIGV2ZW50XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZVVwLCBjbGVhckxvbmdQcmVzc1RpbWVyLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdXNlTW92ZSwgbW91c2VNb3ZlSGFuZGxlciwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBjbGVhckxvbmdQcmVzc1RpbWVyLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjbGVhckxvbmdQcmVzc1RpbWVyLCB0cnVlKTtcblxuICAgIC8vIGhvb2sgZXZlbnRzIHRoYXQgY2FuIHRyaWdnZXIgYSBsb25nIHByZXNzIGV2ZW50XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZURvd24sIG1vdXNlRG93bkhhbmRsZXIsIHRydWUpOyAvLyA8LSBzdGFydFxuXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcbiIsIlwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgT2JqZWN0LmFzc2lnbiAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7IHZhbHVlOiBmdW5jdGlvbiAoYSkgeyBpZiAobnVsbCA9PSBhKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0XCIpOyBmb3IgKHZhciBiLCBjID0gT2JqZWN0KGEpLCBkID0gMTsgZCA8IGFyZ3VtZW50cy5sZW5ndGg7IGQrKylpZiAoYiA9IGFyZ3VtZW50c1tkXSwgbnVsbCAhPSBiKSBmb3IgKHZhciBlIGluIGIpIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBlKSAmJiAoY1tlXSA9IGJbZV0pOyByZXR1cm4gYyB9LCB3cml0YWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAgfSksIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgQXJyYXkuZnJvbSAmJiAoQXJyYXkuZnJvbSA9IGZ1bmN0aW9uIChhKSB7IHJldHVybiBbXS5zbGljZS5jYWxsKGEpIH0pOyB2YXIgYnVpbGRFbGVtZW50ID0gZnVuY3Rpb24gKGEpIHsgdmFyIGIgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJcIik7IHJldHVybiBiLmJvZHkuaW5uZXJIVE1MID0gYSwgQXJyYXkuZnJvbShiLmJvZHkuY2hpbGRyZW4pWzBdIH0sIHRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIChhLCBiKSB7IHZhciBjID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpOyBjLmluaXRFdmVudChiLCAhMCwgITEpLCBhLmRpc3BhdGNoRXZlbnQoYykgfSwgZGVmaW5lUGluY2hab29tID0gZnVuY3Rpb24gKCkgeyB2YXIgYSA9IE1hdGgubWluLCBiID0gTWF0aC5tYXgsIGMgPSBNYXRoLmFicywgZCA9IGZ1bmN0aW9uIChhLCBiKSB7IHRoaXMuZWwgPSBhLCB0aGlzLnpvb21GYWN0b3IgPSAxLCB0aGlzLmxhc3RTY2FsZSA9IDEsIHRoaXMub2Zmc2V0ID0geyB4OiAwLCB5OiAwIH0sIHRoaXMuaW5pdGlhbE9mZnNldCA9IHsgeDogMCwgeTogMCB9LCB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLCBiKSwgdGhpcy5zZXR1cE1hcmt1cCgpLCB0aGlzLmJpbmRFdmVudHMoKSwgdGhpcy51cGRhdGUoKSwgdGhpcy5pc0ltYWdlTG9hZGVkKHRoaXMuZWwpICYmICh0aGlzLnVwZGF0ZUFzcGVjdFJhdGlvKCksIHRoaXMuc2V0dXBPZmZzZXRzKCkpLCB0aGlzLmVuYWJsZSgpIH0sIGUgPSBmdW5jdGlvbiAoYywgYSkgeyByZXR1cm4gYyArIGEgfSwgZiA9IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhID4gYiAtIC4wMSAmJiBhIDwgYiArIC4wMSB9OyBkLnByb3RvdHlwZSA9IHsgZGVmYXVsdHM6IHsgdGFwWm9vbUZhY3RvcjogMiwgem9vbU91dEZhY3RvcjogMS4zLCBhbmltYXRpb25EdXJhdGlvbjogMzAwLCBtYXhab29tOiA0LCBtaW5ab29tOiAuNSwgZHJhZ2dhYmxlVW56b29tZWQ6ICEwLCBsb2NrRHJhZ0F4aXM6ICExLCBzZXRPZmZzZXRzT25jZTogITEsIHVzZTJkOiAhMCwgem9vbVN0YXJ0RXZlbnROYW1lOiBcInB6X3pvb21zdGFydFwiLCB6b29tVXBkYXRlRXZlbnROYW1lOiBcInB6X3pvb211cGRhdGVcIiwgem9vbUVuZEV2ZW50TmFtZTogXCJwel96b29tZW5kXCIsIGRyYWdTdGFydEV2ZW50TmFtZTogXCJwel9kcmFnc3RhcnRcIiwgZHJhZ1VwZGF0ZUV2ZW50TmFtZTogXCJwel9kcmFndXBkYXRlXCIsIGRyYWdFbmRFdmVudE5hbWU6IFwicHpfZHJhZ2VuZFwiLCBkb3VibGVUYXBFdmVudE5hbWU6IFwicHpfZG91YmxldGFwXCIsIHZlcnRpY2FsUGFkZGluZzogMCwgaG9yaXpvbnRhbFBhZGRpbmc6IDAsIG9uWm9vbVN0YXJ0OiBudWxsLCBvblpvb21FbmQ6IG51bGwsIG9uWm9vbVVwZGF0ZTogbnVsbCwgb25EcmFnU3RhcnQ6IG51bGwsIG9uRHJhZ0VuZDogbnVsbCwgb25EcmFnVXBkYXRlOiBudWxsLCBvbkRvdWJsZVRhcDogbnVsbCB9LCBoYW5kbGVEcmFnU3RhcnQ6IGZ1bmN0aW9uIChhKSB7IHRyaWdnZXJFdmVudCh0aGlzLmVsLCB0aGlzLm9wdGlvbnMuZHJhZ1N0YXJ0RXZlbnROYW1lKSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiB0aGlzLm9wdGlvbnMub25EcmFnU3RhcnQgJiYgdGhpcy5vcHRpb25zLm9uRHJhZ1N0YXJ0KHRoaXMsIGEpLCB0aGlzLnN0b3BBbmltYXRpb24oKSwgdGhpcy5sYXN0RHJhZ1Bvc2l0aW9uID0gITEsIHRoaXMuaGFzSW50ZXJhY3Rpb24gPSAhMCwgdGhpcy5oYW5kbGVEcmFnKGEpIH0sIGhhbmRsZURyYWc6IGZ1bmN0aW9uIChhKSB7IHZhciBiID0gdGhpcy5nZXRUb3VjaGVzKGEpWzBdOyB0aGlzLmRyYWcoYiwgdGhpcy5sYXN0RHJhZ1Bvc2l0aW9uKSwgdGhpcy5vZmZzZXQgPSB0aGlzLnNhbml0aXplT2Zmc2V0KHRoaXMub2Zmc2V0KSwgdGhpcy5sYXN0RHJhZ1Bvc2l0aW9uID0gYiB9LCBoYW5kbGVEcmFnRW5kOiBmdW5jdGlvbiAoKSB7IHRyaWdnZXJFdmVudCh0aGlzLmVsLCB0aGlzLm9wdGlvbnMuZHJhZ0VuZEV2ZW50TmFtZSksIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vcHRpb25zLm9uRHJhZ0VuZCAmJiB0aGlzLm9wdGlvbnMub25EcmFnRW5kKHRoaXMsIGV2ZW50KSwgdGhpcy5lbmQoKSB9LCBoYW5kbGVab29tU3RhcnQ6IGZ1bmN0aW9uIChhKSB7IHRyaWdnZXJFdmVudCh0aGlzLmVsLCB0aGlzLm9wdGlvbnMuem9vbVN0YXJ0RXZlbnROYW1lKSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiB0aGlzLm9wdGlvbnMub25ab29tU3RhcnQgJiYgdGhpcy5vcHRpb25zLm9uWm9vbVN0YXJ0KHRoaXMsIGEpLCB0aGlzLnN0b3BBbmltYXRpb24oKSwgdGhpcy5sYXN0U2NhbGUgPSAxLCB0aGlzLm50aFpvb20gPSAwLCB0aGlzLmxhc3Rab29tQ2VudGVyID0gITEsIHRoaXMuaGFzSW50ZXJhY3Rpb24gPSAhMCB9LCBoYW5kbGVab29tOiBmdW5jdGlvbiAoYSwgYikgeyB2YXIgYyA9IHRoaXMuZ2V0VG91Y2hDZW50ZXIodGhpcy5nZXRUb3VjaGVzKGEpKSwgZCA9IGIgLyB0aGlzLmxhc3RTY2FsZTsgdGhpcy5sYXN0U2NhbGUgPSBiLCB0aGlzLm50aFpvb20gKz0gMSwgMyA8IHRoaXMubnRoWm9vbSAmJiAodGhpcy5zY2FsZShkLCBjKSwgdGhpcy5kcmFnKGMsIHRoaXMubGFzdFpvb21DZW50ZXIpKSwgdGhpcy5sYXN0Wm9vbUNlbnRlciA9IGMgfSwgaGFuZGxlWm9vbUVuZDogZnVuY3Rpb24gKCkgeyB0cmlnZ2VyRXZlbnQodGhpcy5lbCwgdGhpcy5vcHRpb25zLnpvb21FbmRFdmVudE5hbWUpLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRoaXMub3B0aW9ucy5vblpvb21FbmQgJiYgdGhpcy5vcHRpb25zLm9uWm9vbUVuZCh0aGlzLCBldmVudCksIHRoaXMuZW5kKCkgfSwgaGFuZGxlRG91YmxlVGFwOiBmdW5jdGlvbiAoYSkgeyB2YXIgYiA9IHRoaXMuZ2V0VG91Y2hlcyhhKVswXSwgYyA9IDEgPCB0aGlzLnpvb21GYWN0b3IgPyAxIDogdGhpcy5vcHRpb25zLnRhcFpvb21GYWN0b3IsIGQgPSB0aGlzLnpvb21GYWN0b3IsIGUgPSBmdW5jdGlvbiAoYSkgeyB0aGlzLnNjYWxlVG8oZCArIGEgKiAoYyAtIGQpLCBiKSB9LmJpbmQodGhpcyk7IHRoaXMuaGFzSW50ZXJhY3Rpb24gfHwgKHRoaXMuaXNEb3VibGVUYXAgPSAhMCwgZCA+IGMgJiYgKGIgPSB0aGlzLmdldEN1cnJlbnRab29tQ2VudGVyKCkpLCB0aGlzLmFuaW1hdGUodGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uLCBlLCB0aGlzLnN3aW5nKSwgdHJpZ2dlckV2ZW50KHRoaXMuZWwsIHRoaXMub3B0aW9ucy5kb3VibGVUYXBFdmVudE5hbWUpLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRoaXMub3B0aW9ucy5vbkRvdWJsZVRhcCAmJiB0aGlzLm9wdGlvbnMub25Eb3VibGVUYXAodGhpcywgYSkpIH0sIGNvbXB1dGVJbml0aWFsT2Zmc2V0OiBmdW5jdGlvbiAoKSB7IHRoaXMuaW5pdGlhbE9mZnNldCA9IHsgeDogLWModGhpcy5lbC5vZmZzZXRXaWR0aCAqIHRoaXMuZ2V0SW5pdGlhbFpvb21GYWN0b3IoKSAtIHRoaXMuY29udGFpbmVyLm9mZnNldFdpZHRoKSAvIDIsIHk6IC1jKHRoaXMuZWwub2Zmc2V0SGVpZ2h0ICogdGhpcy5nZXRJbml0aWFsWm9vbUZhY3RvcigpIC0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0KSAvIDIgfSB9LCByZXNldE9mZnNldDogZnVuY3Rpb24gKCkgeyB0aGlzLm9mZnNldC54ID0gdGhpcy5pbml0aWFsT2Zmc2V0LngsIHRoaXMub2Zmc2V0LnkgPSB0aGlzLmluaXRpYWxPZmZzZXQueSB9LCBpc0ltYWdlTG9hZGVkOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gXCJJTUdcIiA9PT0gYS5ub2RlTmFtZSA/IGEuY29tcGxldGUgJiYgMCAhPT0gYS5uYXR1cmFsSGVpZ2h0IDogQXJyYXkuZnJvbShhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIikpLmV2ZXJ5KHRoaXMuaXNJbWFnZUxvYWRlZCkgfSwgc2V0dXBPZmZzZXRzOiBmdW5jdGlvbiAoKSB7IHRoaXMub3B0aW9ucy5zZXRPZmZzZXRzT25jZSAmJiB0aGlzLl9pc09mZnNldHNTZXQgfHwgKHRoaXMuX2lzT2Zmc2V0c1NldCA9ICEwLCB0aGlzLmNvbXB1dGVJbml0aWFsT2Zmc2V0KCksIHRoaXMucmVzZXRPZmZzZXQoKSkgfSwgc2FuaXRpemVPZmZzZXQ6IGZ1bmN0aW9uIChjKSB7IHZhciBkID0gdGhpcy5lbC5vZmZzZXRXaWR0aCAqIHRoaXMuZ2V0SW5pdGlhbFpvb21GYWN0b3IoKSAqIHRoaXMuem9vbUZhY3RvciwgZSA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0ICogdGhpcy5nZXRJbml0aWFsWm9vbUZhY3RvcigpICogdGhpcy56b29tRmFjdG9yLCBmID0gZCAtIHRoaXMuZ2V0Q29udGFpbmVyWCgpICsgdGhpcy5vcHRpb25zLmhvcml6b250YWxQYWRkaW5nLCBnID0gZSAtIHRoaXMuZ2V0Q29udGFpbmVyWSgpICsgdGhpcy5vcHRpb25zLnZlcnRpY2FsUGFkZGluZywgaCA9IGIoZiwgMCksIGkgPSBiKGcsIDApLCBqID0gYShmLCAwKSAtIHRoaXMub3B0aW9ucy5ob3Jpem9udGFsUGFkZGluZywgayA9IGEoZywgMCkgLSB0aGlzLm9wdGlvbnMudmVydGljYWxQYWRkaW5nOyByZXR1cm4geyB4OiBhKGIoYy54LCBqKSwgaCksIHk6IGEoYihjLnksIGspLCBpKSB9IH0sIHNjYWxlVG86IGZ1bmN0aW9uIChhLCBiKSB7IHRoaXMuc2NhbGUoYSAvIHRoaXMuem9vbUZhY3RvciwgYikgfSwgc2NhbGU6IGZ1bmN0aW9uIChhLCBiKSB7IGEgPSB0aGlzLnNjYWxlWm9vbUZhY3RvcihhKSwgdGhpcy5hZGRPZmZzZXQoeyB4OiAoYSAtIDEpICogKGIueCArIHRoaXMub2Zmc2V0LngpLCB5OiAoYSAtIDEpICogKGIueSArIHRoaXMub2Zmc2V0LnkpIH0pLCB0cmlnZ2VyRXZlbnQodGhpcy5lbCwgdGhpcy5vcHRpb25zLnpvb21VcGRhdGVFdmVudE5hbWUpLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRoaXMub3B0aW9ucy5vblpvb21VcGRhdGUgJiYgdGhpcy5vcHRpb25zLm9uWm9vbVVwZGF0ZSh0aGlzLCBldmVudCkgfSwgc2NhbGVab29tRmFjdG9yOiBmdW5jdGlvbiAoYykgeyB2YXIgZCA9IHRoaXMuem9vbUZhY3RvcjsgcmV0dXJuIHRoaXMuem9vbUZhY3RvciAqPSBjLCB0aGlzLnpvb21GYWN0b3IgPSBhKHRoaXMub3B0aW9ucy5tYXhab29tLCBiKHRoaXMuem9vbUZhY3RvciwgdGhpcy5vcHRpb25zLm1pblpvb20pKSwgdGhpcy56b29tRmFjdG9yIC8gZCB9LCBjYW5EcmFnOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlVW56b29tZWQgfHwgIWYodGhpcy56b29tRmFjdG9yLCAxKSB9LCBkcmFnOiBmdW5jdGlvbiAoYSwgYikgeyBiICYmICh0aGlzLm9wdGlvbnMubG9ja0RyYWdBeGlzID8gYyhhLnggLSBiLngpID4gYyhhLnkgLSBiLnkpID8gdGhpcy5hZGRPZmZzZXQoeyB4OiAtKGEueCAtIGIueCksIHk6IDAgfSkgOiB0aGlzLmFkZE9mZnNldCh7IHk6IC0oYS55IC0gYi55KSwgeDogMCB9KSA6IHRoaXMuYWRkT2Zmc2V0KHsgeTogLShhLnkgLSBiLnkpLCB4OiAtKGEueCAtIGIueCkgfSksIHRyaWdnZXJFdmVudCh0aGlzLmVsLCB0aGlzLm9wdGlvbnMuZHJhZ1VwZGF0ZUV2ZW50TmFtZSksIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vcHRpb25zLm9uRHJhZ1VwZGF0ZSAmJiB0aGlzLm9wdGlvbnMub25EcmFnVXBkYXRlKHRoaXMsIGV2ZW50KSkgfSwgZ2V0VG91Y2hDZW50ZXI6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0aGlzLmdldFZlY3RvckF2ZyhhKSB9LCBnZXRWZWN0b3JBdmc6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB7IHg6IGEubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLnggfSkucmVkdWNlKGUpIC8gYS5sZW5ndGgsIHk6IGEubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLnkgfSkucmVkdWNlKGUpIC8gYS5sZW5ndGggfSB9LCBhZGRPZmZzZXQ6IGZ1bmN0aW9uIChhKSB7IHRoaXMub2Zmc2V0ID0geyB4OiB0aGlzLm9mZnNldC54ICsgYS54LCB5OiB0aGlzLm9mZnNldC55ICsgYS55IH0gfSwgc2FuaXRpemU6IGZ1bmN0aW9uICgpIHsgdGhpcy56b29tRmFjdG9yIDwgdGhpcy5vcHRpb25zLnpvb21PdXRGYWN0b3IgPyB0aGlzLnpvb21PdXRBbmltYXRpb24oKSA6IHRoaXMuaXNJbnNhbmVPZmZzZXQodGhpcy5vZmZzZXQpICYmIHRoaXMuc2FuaXRpemVPZmZzZXRBbmltYXRpb24oKSB9LCBpc0luc2FuZU9mZnNldDogZnVuY3Rpb24gKGEpIHsgdmFyIGIgPSB0aGlzLnNhbml0aXplT2Zmc2V0KGEpOyByZXR1cm4gYi54ICE9PSBhLnggfHwgYi55ICE9PSBhLnkgfSwgc2FuaXRpemVPZmZzZXRBbmltYXRpb246IGZ1bmN0aW9uICgpIHsgdmFyIGEgPSB0aGlzLnNhbml0aXplT2Zmc2V0KHRoaXMub2Zmc2V0KSwgYiA9IHsgeDogdGhpcy5vZmZzZXQueCwgeTogdGhpcy5vZmZzZXQueSB9LCBjID0gZnVuY3Rpb24gKGMpIHsgdGhpcy5vZmZzZXQueCA9IGIueCArIGMgKiAoYS54IC0gYi54KSwgdGhpcy5vZmZzZXQueSA9IGIueSArIGMgKiAoYS55IC0gYi55KSwgdGhpcy51cGRhdGUoKSB9LmJpbmQodGhpcyk7IHRoaXMuYW5pbWF0ZSh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24sIGMsIHRoaXMuc3dpbmcpIH0sIHpvb21PdXRBbmltYXRpb246IGZ1bmN0aW9uICgpIHsgaWYgKDEgIT09IHRoaXMuem9vbUZhY3RvcikgeyB2YXIgYSA9IHRoaXMuem9vbUZhY3RvciwgYiA9IHRoaXMuZ2V0Q3VycmVudFpvb21DZW50ZXIoKSwgYyA9IGZ1bmN0aW9uIChjKSB7IHRoaXMuc2NhbGVUbyhhICsgYyAqICgxIC0gYSksIGIpIH0uYmluZCh0aGlzKTsgdGhpcy5hbmltYXRlKHRoaXMub3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbiwgYywgdGhpcy5zd2luZykgfSB9LCB1cGRhdGVBc3BlY3RSYXRpbzogZnVuY3Rpb24gKCkgeyB0aGlzLnVuc2V0Q29udGFpbmVyWSgpLCB0aGlzLnNldENvbnRhaW5lclkodGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQpIH0sIGdldEluaXRpYWxab29tRmFjdG9yOiBmdW5jdGlvbiAoKSB7IHZhciBiID0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGggLyB0aGlzLmVsLm9mZnNldFdpZHRoLCBjID0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0IC8gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7IHJldHVybiBhKGIsIGMpIH0sIGdldEFzcGVjdFJhdGlvOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmVsLm9mZnNldFdpZHRoIC8gdGhpcy5lbC5vZmZzZXRIZWlnaHQgfSwgZ2V0Q3VycmVudFpvb21DZW50ZXI6IGZ1bmN0aW9uICgpIHsgdmFyIGEgPSB0aGlzLm9mZnNldC54IC0gdGhpcy5pbml0aWFsT2Zmc2V0LngsIGIgPSAtMSAqIHRoaXMub2Zmc2V0LnggLSBhIC8gKDEgLyB0aGlzLnpvb21GYWN0b3IgLSAxKSwgYyA9IHRoaXMub2Zmc2V0LnkgLSB0aGlzLmluaXRpYWxPZmZzZXQueSwgZCA9IC0xICogdGhpcy5vZmZzZXQueSAtIGMgLyAoMSAvIHRoaXMuem9vbUZhY3RvciAtIDEpOyByZXR1cm4geyB4OiBiLCB5OiBkIH0gfSwgZ2V0VG91Y2hlczogZnVuY3Rpb24gKGEpIHsgdmFyIGIgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsIGQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQsIGUgPSBiLnRvcCArIGMsIGYgPSBiLmxlZnQgKyBkOyByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYS50b3VjaGVzKS5tYXAoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHsgeDogYS5wYWdlWCAtIGYsIHk6IGEucGFnZVkgLSBlIH0gfSkgfSwgYW5pbWF0ZTogZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgdmFyIGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgZiA9IGZ1bmN0aW9uICgpIHsgaWYgKHRoaXMuaW5BbmltYXRpb24pIHsgdmFyIGcgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGUsIGggPSBnIC8gYTsgZyA+PSBhID8gKGIoMSksIGQgJiYgZCgpLCB0aGlzLnVwZGF0ZSgpLCB0aGlzLnN0b3BBbmltYXRpb24oKSwgdGhpcy51cGRhdGUoKSkgOiAoYyAmJiAoaCA9IGMoaCkpLCBiKGgpLCB0aGlzLnVwZGF0ZSgpLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZikpIH0gfS5iaW5kKHRoaXMpOyB0aGlzLmluQW5pbWF0aW9uID0gITAsIHJlcXVlc3RBbmltYXRpb25GcmFtZShmKSB9LCBzdG9wQW5pbWF0aW9uOiBmdW5jdGlvbiAoKSB7IHRoaXMuaW5BbmltYXRpb24gPSAhMSB9LCBzd2luZzogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIC1NYXRoLmNvcyhhICogTWF0aC5QSSkgLyAyICsgLjUgfSwgZ2V0Q29udGFpbmVyWDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGggfSwgZ2V0Q29udGFpbmVyWTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0IH0sIHNldENvbnRhaW5lclk6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBhICsgXCJweFwiIH0sIHVuc2V0Q29udGFpbmVyWTogZnVuY3Rpb24gKCkgeyB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBudWxsIH0sIHNldHVwTWFya3VwOiBmdW5jdGlvbiAoKSB7IHRoaXMuY29udGFpbmVyID0gYnVpbGRFbGVtZW50KFwiPGRpdiBjbGFzcz1cXFwicGluY2gtem9vbS1jb250YWluZXJcXFwiPjwvZGl2PlwiKSwgdGhpcy5lbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLmNvbnRhaW5lciwgdGhpcy5lbCksIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZWwpLCB0aGlzLmNvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCIsIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiLCB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IFwiMCUgMCVcIiwgdGhpcy5lbC5zdHlsZS5tb3pUcmFuc2Zvcm1PcmlnaW4gPSBcIjAlIDAlXCIsIHRoaXMuZWwuc3R5bGUubXNUcmFuc2Zvcm1PcmlnaW4gPSBcIjAlIDAlXCIsIHRoaXMuZWwuc3R5bGUub1RyYW5zZm9ybU9yaWdpbiA9IFwiMCUgMCVcIiwgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBcIjAlIDAlXCIsIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCIgfSwgZW5kOiBmdW5jdGlvbiAoKSB7IHRoaXMuaGFzSW50ZXJhY3Rpb24gPSAhMSwgdGhpcy5zYW5pdGl6ZSgpLCB0aGlzLnVwZGF0ZSgpIH0sIGJpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHsgdmFyIGEgPSB0aGlzOyBnKHRoaXMuY29udGFpbmVyLCB0aGlzKSwgdGhpcy5yZXNpemVIYW5kbGVyID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemVIYW5kbGVyKSwgQXJyYXkuZnJvbSh0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIikpLmZvckVhY2goZnVuY3Rpb24gKGIpIHsgYi5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBhLnVwZGF0ZS5iaW5kKGEpKSB9KSwgXCJJTUdcIiA9PT0gdGhpcy5lbC5ub2RlTmFtZSAmJiB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHRoaXMudXBkYXRlLmJpbmQodGhpcykpIH0sIHVwZGF0ZTogZnVuY3Rpb24gKGEpIHsgYSAmJiBcInJlc2l6ZVwiID09PSBhLnR5cGUgJiYgKHRoaXMudXBkYXRlQXNwZWN0UmF0aW8oKSwgdGhpcy5zZXR1cE9mZnNldHMoKSksIGEgJiYgXCJsb2FkXCIgPT09IGEudHlwZSAmJiAodGhpcy51cGRhdGVBc3BlY3RSYXRpbygpLCB0aGlzLnNldHVwT2Zmc2V0cygpKTsgdGhpcy51cGRhdGVQbGFubmVkIHx8ICh0aGlzLnVwZGF0ZVBsYW5uZWQgPSAhMCwgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aGlzLnVwZGF0ZVBsYW5uZWQgPSAhMTsgdmFyIGEgPSB0aGlzLmdldEluaXRpYWxab29tRmFjdG9yKCkgKiB0aGlzLnpvb21GYWN0b3IsIGIgPSAtdGhpcy5vZmZzZXQueCAvIGEsIGMgPSAtdGhpcy5vZmZzZXQueSAvIGEsIGQgPSBcInNjYWxlM2QoXCIgKyBhICsgXCIsIFwiICsgYSArIFwiLDEpIHRyYW5zbGF0ZTNkKFwiICsgYiArIFwicHgsXCIgKyBjICsgXCJweCwwcHgpXCIsIGUgPSBcInNjYWxlKFwiICsgYSArIFwiLCBcIiArIGEgKyBcIikgdHJhbnNsYXRlKFwiICsgYiArIFwicHgsXCIgKyBjICsgXCJweClcIiwgZiA9IGZ1bmN0aW9uICgpIHsgdGhpcy5jbG9uZSAmJiAodGhpcy5jbG9uZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY2xvbmUpLCBkZWxldGUgdGhpcy5jbG9uZSkgfS5iaW5kKHRoaXMpOyAhdGhpcy5vcHRpb25zLnVzZTJkIHx8IHRoaXMuaGFzSW50ZXJhY3Rpb24gfHwgdGhpcy5pbkFuaW1hdGlvbiA/ICh0aGlzLmlzM2QgPSAhMCwgZigpLCB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGQsIHRoaXMuZWwuc3R5bGUubW96VHJhbnNmb3JtID0gZSwgdGhpcy5lbC5zdHlsZS5tc1RyYW5zZm9ybSA9IGUsIHRoaXMuZWwuc3R5bGUub1RyYW5zZm9ybSA9IGUsIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gZCkgOiAodGhpcy5pczNkICYmICh0aGlzLmNsb25lID0gdGhpcy5lbC5jbG9uZU5vZGUoITApLCB0aGlzLmNsb25lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIiwgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9uZSksIHdpbmRvdy5zZXRUaW1lb3V0KGYsIDIwMCkpLCB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGUsIHRoaXMuZWwuc3R5bGUubW96VHJhbnNmb3JtID0gZSwgdGhpcy5lbC5zdHlsZS5tc1RyYW5zZm9ybSA9IGUsIHRoaXMuZWwuc3R5bGUub1RyYW5zZm9ybSA9IGUsIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gZSwgdGhpcy5pczNkID0gITEpIH0uYmluZCh0aGlzKSwgMCkpIH0sIGVuYWJsZTogZnVuY3Rpb24gKCkgeyB0aGlzLmVuYWJsZWQgPSAhMCB9LCBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7IHRoaXMuZW5hYmxlZCA9ICExIH0sIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemVIYW5kbGVyKSwgdGhpcy5jb250YWluZXIgJiYgKHRoaXMuY29udGFpbmVyLnJlbW92ZSgpLCB0aGlzLmNvbnRhaW5lciA9IG51bGwpIH0gfTsgdmFyIGcgPSBmdW5jdGlvbiAoYSwgYikgeyB2YXIgYyA9IG51bGwsIGQgPSAwLCBlID0gbnVsbCwgZiA9IG51bGwsIGcgPSBmdW5jdGlvbiAoYSwgZCkgeyBjICE9PSBhICYmIChjICYmICFhICYmIChcInpvb21cIiA9PT0gYyA/IGIuaGFuZGxlWm9vbUVuZChkKSA6IFwiZHJhZ1wiID09PSBjID8gYi5oYW5kbGVEcmFnRW5kKGQpIDogdm9pZCAwKSwgXCJ6b29tXCIgPT09IGEgPyBiLmhhbmRsZVpvb21TdGFydChkKSA6IFwiZHJhZ1wiID09PSBhID8gYi5oYW5kbGVEcmFnU3RhcnQoZCkgOiB2b2lkIDApOyBjID0gYSB9LCBoID0gZnVuY3Rpb24gKGEpIHsgMiA9PT0gZCA/IGcoXCJ6b29tXCIpIDogMSA9PT0gZCAmJiBiLmNhbkRyYWcoKSA/IGcoXCJkcmFnXCIsIGEpIDogZyhudWxsLCBhKSB9LCBpID0gZnVuY3Rpb24gKGEpIHsgcmV0dXJuIEFycmF5LmZyb20oYSkubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiB7IHg6IGEucGFnZVgsIHk6IGEucGFnZVkgfSB9KSB9LCBqID0gZnVuY3Rpb24gKGMsIGEpIHsgdmFyIGQsIGUsIGIgPSBNYXRoLnNxcnQ7IHJldHVybiBkID0gYy54IC0gYS54LCBlID0gYy55IC0gYS55LCBiKGQgKiBkICsgZSAqIGUpIH0sIGsgPSBmdW5jdGlvbiAoYSwgYikgeyB2YXIgYyA9IGooYVswXSwgYVsxXSksIGQgPSBqKGJbMF0sIGJbMV0pOyByZXR1cm4gZCAvIGMgfSwgbCA9IGZ1bmN0aW9uIChhKSB7IGEuc3RvcFByb3BhZ2F0aW9uKCksIGEucHJldmVudERlZmF1bHQoKSB9LCBtID0gZnVuY3Rpb24gKGEpIHsgdmFyIGYgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgMSA8IGQgJiYgKGUgPSBudWxsKTsgMzAwID4gZiAtIGUgPyAobChhKSwgYi5oYW5kbGVEb3VibGVUYXAoYSksIFwiem9vbVwiID09PSBjID8gYi5oYW5kbGVab29tRW5kKGEpIDogXCJkcmFnXCIgPT09IGMgPyBiLmhhbmRsZURyYWdFbmQoYSkgOiB2b2lkIDApIDogYi5pc0RvdWJsZVRhcCA9ICExOyAxID09PSBkICYmIChlID0gZikgfSwgbiA9ICEwOyBhLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChhKSB7IGIuZW5hYmxlZCAmJiAobiA9ICEwLCBkID0gYS50b3VjaGVzLmxlbmd0aCwgbShhKSkgfSwgeyBwYXNzaXZlOiAhMSB9KSwgYS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChhKSB7IGIuZW5hYmxlZCAmJiAhYi5pc0RvdWJsZVRhcCAmJiAobiA/IChoKGEpLCBjICYmIGwoYSksIGYgPSBpKGEudG91Y2hlcykpIDogKFwiem9vbVwiID09PSBjID8gMiA9PSBmLmxlbmd0aCAmJiAyID09IGEudG91Y2hlcy5sZW5ndGggJiYgYi5oYW5kbGVab29tKGEsIGsoZiwgaShhLnRvdWNoZXMpKSkgOiBcImRyYWdcIiA9PT0gYyA/IGIuaGFuZGxlRHJhZyhhKSA6IHZvaWQgMCwgYyAmJiAobChhKSwgYi51cGRhdGUoKSkpLCBuID0gITEpIH0sIHsgcGFzc2l2ZTogITEgfSksIGEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGZ1bmN0aW9uIChhKSB7IGIuZW5hYmxlZCAmJiAoZCA9IGEudG91Y2hlcy5sZW5ndGgsIGgoYSkpIH0pIH07IHJldHVybiBkIH0sIFBpbmNoWm9vbSA9IGRlZmluZVBpbmNoWm9vbSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmltcG9ydCBcIi4uL25vd3kvdGhlbWUtbHIvX2luZGV4XCI7XG5pbXBvcnQgXCIuLi9ub3d5L2ZyYW1ld29yay1zcGVjdHJlL19pbmRleFwiO1xuaW1wb3J0IFwiLi4vbm93eS9jb21tb24vX2luZGV4XCI7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=