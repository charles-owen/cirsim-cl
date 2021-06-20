/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./packages/cirsim/index.js":
/*!**********************************!*\
  !*** ./packages/cirsim/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cirsim": () => (/* reexport safe */ _src_Cirsim_Cirsim__WEBPACK_IMPORTED_MODULE_2__.Cirsim),
/* harmony export */   "default": () => (/* reexport safe */ _src_Cirsim_Cirsim__WEBPACK_IMPORTED_MODULE_2__.Cirsim)
/* harmony export */ });
/* harmony import */ var _src_public_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/public-path */ "./packages/cirsim/src/public-path.js");
/* harmony import */ var _src_public_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_public_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_polyfills_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/polyfills/all */ "./packages/cirsim/src/polyfills/all.js");
/* harmony import */ var _src_Cirsim_Cirsim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Cirsim/Cirsim */ "./packages/cirsim/src/Cirsim/Cirsim.js");
/* harmony import */ var _src_cirsim_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/_cirsim.scss */ "./packages/cirsim/src/_cirsim.scss");
/* harmony import */ var _src_Cirsim_Utility_Ready__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Cirsim/Utility/Ready */ "./packages/cirsim/src/Cirsim/Utility/Ready.js");
// The public-path module must be imported first!




 // This allows Cirsim to be used as Cirsim or Cirsim.Cirsim
// since the version in cl/cirsim is Cirsim.Cirsim.

_src_Cirsim_Cirsim__WEBPACK_IMPORTED_MODULE_2__.Cirsim.Cirsim = _src_Cirsim_Cirsim__WEBPACK_IMPORTED_MODULE_2__.Cirsim; // Automatically install into div.cirsim-install, where the text
// contents of the tag are JSON to configure Cirsim

_src_Cirsim_Utility_Ready__WEBPACK_IMPORTED_MODULE_4__.Ready.go(function () {
  var elements = document.querySelectorAll('div.cirsim-install');

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.classList.remove('cirsim-install');
    var json = JSON.parse(element.textContent);
    element.innerHTML = '';
    var cirsim = new _src_Cirsim_Cirsim__WEBPACK_IMPORTED_MODULE_2__.Cirsim(element, json);
    cirsim.startNow();
    element.style.display = 'block';
  }
});


__webpack_require__.g.Cirsim = _src_Cirsim_Cirsim__WEBPACK_IMPORTED_MODULE_2__.Cirsim;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Bend.js":
/*!********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Bend.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bend": () => (/* binding */ Bend)
/* harmony export */ });
/* harmony import */ var _Selectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Selectable */ "./packages/cirsim/src/Cirsim/Selectable.js");

/**
 * Object that represents a bend in a connection line.
 * @constructor
 */

var Bend = function Bend(x, y) {
  _Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.call(this);
  this.connection = null; // Connection this bend is associated with

  if (x !== undefined) {
    this.x = x;
    this.moveX = x;
  }

  if (y !== undefined) {
    this.y = y;
    this.moveY = y;
  }
};
Bend.prototype = Object.create(_Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.prototype);
Bend.prototype.constructor = Bend;
Bend.prototype.touchRange = 12;
Bend.prototype.size = 4;

Bend.prototype.clone = function () {
  var copy = new Bend();
  copy.copyFrom(this);
  return copy;
};

Bend.prototype.draw = function (context, view) {
  if (view.selection.isSelected(this)) {
    this.selectStyle(context, view);
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fill();
  }
};
/**
 * Determine if we have touched this bend
 * @param x
 * @param y
 * @returns {boolean}
 */


Bend.prototype.touch = function (x, y) {
  return Math.abs(x - this.x) + Math.abs(y - this.y) <= this.touchRange;
};
/**
 * Delete this bend, removing it from the connection.
 * @param caller Calling object.
 * that object.
 */


Bend.prototype["delete"] = function (caller) {
  this.connection.removeBend(this);
};
/**
 * Save this bend as an object suitable for conversion to JSON
 * @returns {{x: *, y: *}}
 */


Bend.prototype.save = function () {
  return {
    "x": this.x,
    "y": this.y
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Circuit.js":
/*!***********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Circuit.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Circuit": () => (/* binding */ Circuit)
/* harmony export */ });
/* harmony import */ var _Component_CircuitRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component/CircuitRef */ "./packages/cirsim/src/Cirsim/Component/CircuitRef.js");
/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Connection */ "./packages/cirsim/src/Cirsim/Connection.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");
/* harmony import */ var _Utility_Rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utility/Rect */ "./packages/cirsim/src/Cirsim/Utility/Rect.js");
/* harmony import */ var _Circuits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Circuits */ "./packages/cirsim/src/Cirsim/Circuits.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






/**
 * Construct a circuit
 * @param name Name of the circuit
 * @constructor
 */

var Circuit = function Circuit(name) {
  this.circuits = null;
  this.components = [];
  this.name = name;
  this.width = this.defWidth;
  this.height = this.defHeight; // Previous copy in the copy stack

  this.prev = null;
  /**
   * See if some object has been touched by the mouse.
   * @param x Mouse X
   * @param y Mouse Y
   * @return Touched element or null if none
   */

  this.touch = function (x, y) {
    //
    // First we try to grab a component.
    // We do this in reverse order so we are selecting
    // from top down.
    //
    for (var i = this.components.length - 1; i >= 0; i--) {
      var component = this.components[i];
      var grabbed = component.touch(x, y);

      if (grabbed !== null) {
        return grabbed;
      }
    }

    return null;
  };
  /**
   * Advance the animation by delta time...
   * @param delta
   */


  this.advance = function (delta) {
    var any = false;

    for (var i = 0; i < this.components.length; i++) {
      var component = this.components[i];

      if (component.advance(delta)) {
        any = true;
      }
    }

    return any;
  };
};
Circuit.prototype.defWidth = 1920; ///< Default width

Circuit.prototype.defHeight = 1080; ///< Default height

/**
 * Create a backup clone of this circuit
 * @returns {Circuit}
 */

Circuit.prototype.clone = function () {
  var copy = new Circuit(this.name);
  copy.width = this.width;
  copy.height = this.height; // Add to the copy stack

  copy.prev = this.prev;
  this.prev = copy; // Iterate over the components, cloning each of them

  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];
    var componentCopy = component.clone();
    copy.add(componentCopy);
  } // Again we iterate over the components, this time
  // cloning the output connections.


  for (var _i = 0; _i < this.components.length; _i++) {
    var component = this.components[_i];

    for (var j = 0; j < component.outs.length; j++) {
      var out = component.outs[j];

      for (var k = 0; k < out.to.length; k++) {
        out.to[k].clone();
      }
    }
  }

  return copy;
};
/**
 * Create a backup clone of this circuit
 * @returns {Circuit}
 */


Circuit.prototype.copy_clone = function () {
  var copy = new Circuit(this.name);
  copy.width = this.width;
  copy.height = this.height; // Iterate over the components, cloning each of them

  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];
    var componentCopy = component.clone();
    copy.add(componentCopy);
  } // Again we iterate over the components, this time
  // cloning the output connections.


  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];

    for (var j = 0; j < component.outs.length; j++) {
      var out = component.outs[j];

      for (var k = 0; k < out.to.length; k++) {
        out.to[k].clone();
      }
    }
  }

  return copy;
};
/**
 * Update circuit after a circuit change.
 * This is used by CircuitRef components to ensure
 * references are always correct.
 */


Circuit.prototype.update = function () {
  var _iterator = _createForOfIteratorHelper(this.components),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var component = _step.value;
      component.update();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

Circuit.prototype.draw = function (context, view) {
  this.components.forEach(function (component, index, array) {
    component.draw(context, view);
  });
};

Circuit.prototype.newTab = function () {
  // There was code here to iterate over the components
  // in reverse order. I don't recall why that was. I think
  // it may be a holdover from the circuits being in reverse
  // order. I'm removed it and will see if it breaks anything.
  // for(let i=this.components.length-1; i>= 0; i--) {
  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i]; // Tell any components that need to know that
    // we have selected a new tab. This is
    // important for the reference component.

    component.newTab();
  }
};

Circuit.prototype.recompute = function () {
  for (var i = 0; i < this.components.length; i++) {
    // Ensure everything get recomputed
    this.components[i].pending();
  }
};
/**
 * Test if components or bends are contained in a given rectangle.
 * @param rect Rect object
 * @returns {Array} Array of all contained components
 */


Circuit.prototype.inRect = function (rect) {
  var ret = [];

  for (var i = this.components.length - 1; i >= 0; i--) {
    this.components[i].inRect(rect, ret);
  }

  return ret;
};

Circuit.prototype.snapIt = function (item) {
  if (this.circuits.snap) {
    item.x = this.circuits.grid * Math.round(item.x / this.circuits.grid);
    item.y = this.circuits.grid * Math.round(item.y / this.circuits.grid);
  }
};

Circuit.prototype.add = function (component) {
  this.components.push(component);
  component.added(this);
  return component;
};
/**
 * Delete a specific item from the list of components
 * @param toDelete Item to delete
 */


Circuit.prototype["delete"] = function (toDelete) {
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i] === toDelete) {
      this.components.splice(i, 1);
      break;
    }
  }
};
/**
 * Determine if x,y touches a component In
 * @param x
 * @param y
 */


Circuit.prototype.touchIn = function (x, y) {
  for (var i = this.components.length - 1; i >= 0; i--) {
    var component = this.components[i];
    var touched = component.touchIn(x, y);

    if (touched !== null) {
      return touched;
    }
  }

  return null;
};
/**
 * Determine if x,y touches a component Out
 * @param x
 * @param y
 */


Circuit.prototype.touchOut = function (x, y) {
  for (var i = this.components.length - 1; i >= 0; i--) {
    var component = this.components[i];
    var touched = component.touchOut(x, y);

    if (touched !== null) {
      return touched;
    }
  }

  return null;
};
/**
 * Save this object into an object suitable for conversion to
 * a JSON object for storage.
 * @returns Object
 */


Circuit.prototype.save = function () {
  // Iterate over the components, saving each of them
  var comps = [];

  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i]; // Set an ID on each component
    // component.id = "c" + (i + 1001);

    comps.push(component.save());
  } // Then iterate over the connections, saving each of them


  var connections = [];

  for (var _i2 = 0; _i2 < this.components.length; _i2++) {
    var _component = this.components[_i2];
    connections = connections.concat(_component.saveConnections());
  }

  return {
    "name": this.name,
    "width": this.width,
    "height": this.height,
    "components": comps,
    "connections": connections
  };
};
/**
 * Load this object from an object that was converted from a
 * JSON object for storage.
 * @param obj
 */


Circuit.prototype.load = function (obj) {
  this.name = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.sanitize(obj.name);
  this.width = +obj.width;
  this.height = +obj.height; // Load the components

  var compsMap = {}; // Map from component ID to component object

  for (var i = 0; i < obj.components.length; i++) {
    var componentObj = obj.components[i];
    var componentProto = void 0;

    if (componentObj.type === "CircuitRef") {
      componentProto = _Component_CircuitRef__WEBPACK_IMPORTED_MODULE_0__.CircuitRef;
    } else {
      componentProto = this.circuits.model.main.components.get(componentObj.type);
    }

    if (componentProto !== null) {
      var component = new componentProto();
      component.circuit = this;
      component.load(componentObj);
      compsMap[component.id] = component;
      this.add(component);
    } else {
      console.log(componentObj);
    }
  } // Load the connections


  for (var _i3 = 0; _i3 < obj.connections.length; _i3++) {
    var connectionObj = obj.connections[_i3];
    var fmComp = compsMap[connectionObj["from"]];

    if (fmComp === undefined) {
      console.log("From object undefined");
      console.log(this);
      console.log(connectionObj);
      continue;
    }

    var toComp = compsMap[connectionObj["to"]];

    if (toComp === undefined) {
      console.log("To object undefined");
      console.log(this);
      console.log(connectionObj);
      continue;
    }

    var outNdx = connectionObj["out"];
    var inNdx = connectionObj["in"];
    var connection = this.connect(fmComp, outNdx, toComp, inNdx);

    if (connection !== null) {
      connection.load(connectionObj);
    }
  }
};
/**
 * Get a component by it's naming
 * @param naming Naming to search for
 * @returns {*}
 */


Circuit.prototype.getComponentByNaming = function (naming) {
  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];

    if (component.naming === naming) {
      return component;
    }
  }

  return null;
};
/**
 * Get all components by type
 * @param type Naming to search for
 * @returns Array with collection of components of that type
 */


Circuit.prototype.getComponentsByType = function (type) {
  var components = [];

  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];

    if (component.constructor.type === type) {
      components.push(component);
    }
  }

  return components;
};

Circuit.prototype.mouseUp = function () {
  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];
    component.mouseUp();
  }
};

Circuit.prototype.connect = function (outObj, outNdx, inObj, inNdx) {
  if (outObj.outs.length <= outNdx || inObj.ins.length <= inNdx) {
    return null;
  }

  return new _Connection__WEBPACK_IMPORTED_MODULE_1__.Connection(outObj.outs[outNdx], inObj.ins[inNdx]);
};

Circuit.prototype.getComponentsByType = function (type) {
  var ret = [];

  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];

    if (component.constructor.type === type) {
      ret.push(component);
    }
  }

  return ret;
};
/**
 * Determine the maximum size in each dimension for this circuit.
 * Does include an extra 16 pixel bias in each dimension to account for
 * inputs and outputs.
 * @returns {{x: number, y: number}}
 */


Circuit.prototype.maxXY = function () {
  var maxX = 1;
  var maxY = 1;

  for (var i = 0; i < this.components.length; i++) {
    var bounds = this.components[i].bounds();

    if (bounds.right > maxX) {
      maxX = bounds.right;
    }

    if (bounds.bottom > maxY) {
      maxY = bounds.bottom;
    }
  }

  return {
    x: maxX + 16,
    y: maxY + 16
  };
};
/**
 * Compute a bounding box that encloses all of this circuit.
 * @returns {*}
 */


Circuit.prototype.bounds = function () {
  if (this.components.length === 0) {
    return new _Utility_Rect__WEBPACK_IMPORTED_MODULE_3__.Rect();
  }

  var bounds = this.components[0].bounds();

  for (var i = 0; i < this.components.length; i++) {
    var b = this.components[i].bounds();
    bounds.expand(b);
  }

  return bounds;
};

Circuit.prototype.pending = function () {
  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i];
    component.pending();
  }
};

Circuit.prototype.getName = function () {
  return this.name;
};

Circuit.prototype.setName = function (name) {
  this.name = name;
};
/**
 * Obtain basic statistics about this circuit
 * @returns {{name: *, numComponents: Number, numConnections: number, width: *, height: *}}
 */


Circuit.prototype.stats = function () {
  var numConnections = 0;
  this.components.forEach(function (component) {
    component.outs.forEach(function (out) {
      numConnections += out.to.length;
    });
  });
  return {
    name: this.name,
    numComponents: this.components.length,
    numConnections: numConnections,
    width: this.width,
    height: this.height
  };
};

Circuit.prototype.moveToFront = function (component) {
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i] === component) {
      this.components.splice(i, 1);
      this.components.push(component);
      break;
    }
  }
};
/**
 * Return all CircuitRef components that refer to a circuit
 * @param circuit Circuit we are testing. If omitted, all CircuitRef components are returned.
 * @return array of CircuitRef components.
 */


Circuit.prototype.references = function (circuit) {
  var references = [];

  var _iterator2 = _createForOfIteratorHelper(this.components),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var component = _step2.value;

      if (component instanceof _Component_CircuitRef__WEBPACK_IMPORTED_MODULE_0__.CircuitRef) {
        if (circuit !== undefined) {
          if (component.circuitName === circuit.name) {
            references.push(component);
          }
        } else {
          references.push(component);
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return references;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Circuits.js":
/*!************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Circuits.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Circuits": () => (/* binding */ Circuits)
/* harmony export */ });
/* harmony import */ var _Simulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Simulation */ "./packages/cirsim/src/Cirsim/Simulation.js");
/* harmony import */ var _Circuit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Circuit */ "./packages/cirsim/src/Cirsim/Circuit.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




/**
 * A collection of circuit objects
 * @param model The model we are a member of
 * @param simulation The simulation object that simulates operation of the circuits
 * @constructor
 */

var Circuits = function Circuits(model, simulation) {
  this.model = model;
  this.circuits = [];
  this.grid = 8;
  this.snap = true;
  this.id = model !== null ? model.id : undefined; // If none is supplied, create a simulation object

  this.simulation = simulation ? simulation : new _Simulation__WEBPACK_IMPORTED_MODULE_0__.Simulation(); // Previous copy in the copy stack

  this.prev = null;
};
/**
 * Add a circuit to this collection of circuits
 * @param circuit
 */

Circuits.prototype.add = function (circuit) {
  this.circuits.push(circuit);
  circuit.circuits = this;
  return circuit;
};

Circuits.prototype.insert = function (circuit) {
  this.circuits.unshift(circuit);
  circuit.circuits = this;
  return circuit;
};
/**
 * Get the collection of circuits.
 * @returns Array of Circuit objects (copy)
 */


Circuits.prototype.getCircuits = function () {
  return this.circuits.slice();
};
/**
 * Get a circuit by name
 * @param name Name of the circuit
 * @returns Circuit object or null
 */


Circuits.prototype.getCircuit = function (name) {
  for (var i = 0; i < this.circuits.length; i++) {
    var circuit = this.circuits[i];

    if (circuit.name === name) {
      return circuit;
    }
  }

  return null;
};

Circuits.prototype.advance = function (delta) {
  var ret = false;

  for (var i = 0; i < this.circuits.length; i++) {
    var circuit = this.circuits[i];

    if (circuit.advance(delta)) {
      ret = true;
    }
  }

  return ret;
};
/**
 * Determine if a circuit can be deleted.
 * @param ndx Index into the circuits.
 */


Circuits.prototype.canDelete = function (ndx) {
  if (ndx === 0) {
    // The main circuit (first) cannot be deleted
    return false;
  } // Do any circuits to the left refer to this one?


  var circuit = this.circuits[ndx];

  for (var i = 0; i < ndx; i++) {
    var references = this.circuits[i].references(circuit);

    if (references.length > 0) {
      return false;
    }
  }

  return true;
};
/**
 * Determine if a circuit can be moved left as a tab.
 * @param ndx Index into the circuits.
 * @returns {boolean} True if can be moved left
 */


Circuits.prototype.canMoveLeft = function (ndx) {
  // First two tabs cannot be moved left at all
  if (ndx < 2) {
    return false;
  } // Does the circuit to the left refer to this one?


  var circuit = this.circuits[ndx];
  var references = this.circuits[ndx - 1].references(circuit);
  return references.length === 0;
};
/**
 * Determine if a circuit can be moved right as a tab
 * @param ndx Index into the circuits.
 * @returns {boolean} True if can be move right
 */


Circuits.prototype.canMoveRight = function (ndx) {
  // First tab cannot be moved at all. Last tab can't
  // move to the right.
  if (ndx === 0 || ndx === this.circuits.length - 1) {
    return false;
  } // What does this circuit refer to?


  var right = this.circuits[ndx + 1].name;
  var references = this.circuits[ndx].references();

  var _iterator = _createForOfIteratorHelper(references),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var reference = _step.value;

      if (reference.circuitName === right) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
};

Circuits.prototype.moveLeft = function (ndx) {
  if (this.canMoveLeft(ndx)) {
    this.model.backup();
    var t = this.circuits[ndx - 1];
    this.circuits[ndx - 1] = this.circuits[ndx];
    this.circuits[ndx] = t;
    return true;
  }

  return false;
};

Circuits.prototype.moveRight = function (ndx) {
  if (this.canMoveRight(ndx)) {
    this.model.backup();
    var t = this.circuits[ndx + 1];
    this.circuits[ndx + 1] = this.circuits[ndx];
    this.circuits[ndx] = t;
    return true;
  }

  return false;
};

Circuits.prototype.rename = function (ndx, name) {
  this.model.backup();
  var circuit = this.circuits[ndx]; // Rename any references to this circuit

  for (var i = 0; i < ndx; i++) {
    var references = this.circuits[i].references(circuit);

    var _iterator2 = _createForOfIteratorHelper(references),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var reference = _step2.value;
        reference.circuitName = name;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  circuit.setName(name);
};

Circuits.prototype.newTab = function () {
  // for(let i=0; i<this.circuits.length; i++) {
  //     this.circuits[i].newTab();
  // }
  for (var i = this.circuits.length - 1; i >= 0; i--) {
    this.circuits[i].newTab();
  }
};

Circuits.prototype.recompute = function () {
  //for(let i=0; i<this.circuits.length; i++) {
  for (var i = this.circuits.length - 1; i >= 0; i--) {
    this.circuits[i].recompute();
  }
};
/**
 * Create a backup clone of this circuit
 * @returns {Circuits}
 */


Circuits.prototype.clone = function () {
  var copy = new Circuits(this.model, this.simulation);
  copy.grid = this.grid;
  copy.snap = this.snap; // Add to the copy stack

  copy.prev = this.prev;
  this.prev = copy; // Copy the circuit objects

  for (var i = 0; i < this.circuits.length; i++) {
    var circuit = this.circuits[i];
    copy.add(circuit.clone());
  }

  return copy;
};
/**
 * Update circuits after a circuit change.
 * This is used by CircuitRef components to ensure
 * references are always correct.
 * @param circuit Update up until this circuit
 */


Circuits.prototype.update = function (circuit) {
  var _iterator3 = _createForOfIteratorHelper(this.circuits),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var c = _step3.value;

      if (c === circuit) {
        break;
      }

      c.update();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
};

Circuits.prototype.toJSON = function () {
  return JSON.stringify(this.save());
};
/**
 * Load the circuits from a JSON-encoded object
 * @param json
 */


Circuits.prototype.fmJSON = function (json) {
  var obj = JSON.parse(json);
  this.load(obj);
};
/**
 * Save this object into an object suitable for conversion to
 * a JSON object for storage.
 * @returns Object
 */


Circuits.prototype.save = function () {
  var cirs = [];

  for (var i = 0; i < this.circuits.length; i++) {
    var circuit = this.circuits[i];
    cirs.push(circuit.save());
  }

  var obj = {
    "grid": this.grid,
    "circuits": cirs,
    "id": this.id
  };

  if (this.snap) {
    obj.snap = true;
  }

  return obj;
};
/**
 * Load this object from an object converted from a JSON
 * object used for storage.
 * @param obj
 */


Circuits.prototype.load = function (obj) {
  this.grid = +obj["grid"];
  this.snap = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.boolean(obj["snap"]);
  this.prev = null;
  this.circuits = [];

  if (obj["id"] !== undefined) {
    this.id = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.sanitize(obj["id"]);
  } //
  // Load circuits in reverse order
  //


  for (var i = obj.circuits.length - 1; i >= 0; i--) {
    var circuitObj = obj.circuits[i];
    var circuit = new _Circuit__WEBPACK_IMPORTED_MODULE_1__.Circuit(circuitObj.name);
    this.insert(circuit);
    circuit.load(circuitObj);
  } // In reverse order, ensure all circuits have
  // had compute called on all components


  for (var _i = this.circuits.length - 1; _i >= 0; _i--) {
    this.circuits[_i].pending();
  }
};

Circuits.prototype.addCircuit = function (name) {
  var circuit = new _Circuit__WEBPACK_IMPORTED_MODULE_1__.Circuit(name);
  this.add(circuit);
};
/**
 * Delete a circuit by the index to the circuit
 * @param index Index into the circuits array
 */


Circuits.prototype.deleteCircuitByIndex = function (index) {
  this.circuits.splice(index, 1);
};
/**
 * Get a component by it's naming
 * @param naming Naming to search for
 * @returns {*}
 */


Circuits.prototype.getComponentByNaming = function (naming) {
  for (var i = 0; i < this.circuits.length; i++) {
    var circuit = this.circuits[i];
    var pin = circuit.getComponentByNaming(naming);

    if (pin !== null) {
      return pin;
    }
  }

  return null;
};
/**
 * Get all components by type
 * @param type Naming to search for
 * @returns Array with collection of components of that type
 */


Circuits.prototype.getComponentsByType = function (type) {
  var components = [];

  for (var i = 0; i < this.circuits.length; i++) {
    var circuit = this.circuits[i];
    var c = circuit.getComponentsByType(type);
    components = components.concat(c);
  }

  return components;
};
/**
 * Replace a circuit that currently exists with a new version.
 */


Circuits.prototype.replaceCircuit = function (circuit) {
  circuit.circuits = this;

  for (var i = 0; i < this.circuits.length; i++) {
    if (this.circuits[i].name === circuit.name) {
      this.circuits[i] = circuit; // Ensure all components in the new circuit are pending, so they
      // all get updated.

      circuit.components.forEach(function (component) {
        component.pending();
      }); // Force this to appear to be a new tab

      this.model.newTab();
      break;
    }
  }
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Cirsim.js":
/*!**********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Cirsim.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cirsim": () => (/* binding */ Cirsim)
/* harmony export */ });
/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main */ "./packages/cirsim/src/Cirsim/Main.js");
/* harmony import */ var _Options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options */ "./packages/cirsim/src/Cirsim/Options.js");
/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components */ "./packages/cirsim/src/Cirsim/Components.js");
/* harmony import */ var _Component_All__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Component/All */ "./packages/cirsim/src/Cirsim/Component/All.js");
/* harmony import */ var _Utility_Ready__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utility/Ready */ "./packages/cirsim/src/Cirsim/Utility/Ready.js");





/**
 * Create an instance of Cirsim
 *
 * This creates a single Instance that manages the
 * components and starts actual Cirsim windows.
 *
 * Construct and start running like this:
 *
 * Given an HTML div:
 *     <div id="cirsim"></div>
 *
 * The following script starts Cirsim in that div:
 *
 *     var cirsim = new Cirsim('#cirsim');
 *     cirsim.start();
 *
 * @param sel Selector to create Cirsim in (can be many)
 * @param options An object containing Cirsim options.
 * @constructor
 */

var Cirsim = function Cirsim(sel, options) {
  var _this = this;

  //
  // Master set of the version
  //
  var PACKAGE = __webpack_require__(/*! ../../package.json */ "./packages/cirsim/package.json");

  this.version = PACKAGE.version; //
  // Determine the root directory for Cirsim
  // This is the directory containing cirsim.js or
  // cirsim.min.js
  //

  this.root = __webpack_require__.p; // Record the selector

  this.sel = sel; // The Options object that manages user options

  this.options = new _Options__WEBPACK_IMPORTED_MODULE_1__.Options(options); //
  // Install all components and configure standard
  // Cirsim palettes.
  //

  this.components = new _Components__WEBPACK_IMPORTED_MODULE_2__.Components();
  (0,_Component_All__WEBPACK_IMPORTED_MODULE_3__.All)(this.components); // A collection of Main objects.

  var mains = []; // A collection of tests.
  // We collect those in Cirsim because the actual
  // Main may not be created, yet.

  var tests = [];
  /**
   * Start Cirsim running, creating the user interface.
   * This does wait for document ready before calling
   * this.startNow() unless we are running in no-window
   * mode. In that case it returns a started instance.
   */

  this.start = function () {
    if (sel === null) {
      return _this.startNow();
    }

    _Utility_Ready__WEBPACK_IMPORTED_MODULE_4__.Ready.go(function () {
      _this.startNow();
    });
  };
  /**
   * Start Cirsim running now. Does not wait for document ready.
   */


  this.startNow = function () {
    if (sel !== null) {
      if (sel instanceof Element) {
        var main = new _Main__WEBPACK_IMPORTED_MODULE_0__.Main(_this, sel, tests);
        mains.push(main);
      } else {
        var elements = document.querySelectorAll(sel);

        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];

          var _main = new _Main__WEBPACK_IMPORTED_MODULE_0__.Main(_this, element, tests);

          mains.push(_main);
        }
      }

      if (mains.length === 1) {
        if (_this.options.global !== null) {
          __webpack_require__.g[_this.options.global] = mains[0];
        }

        return mains[0];
      }
    } else {
      _this.options.display = 'none';

      var _main2 = new _Main__WEBPACK_IMPORTED_MODULE_0__.Main(_this, null, tests);

      mains.push(_main2);
      return _main2;
    }

    return null;
  };
  /**
   * Get all active instances of Cirsim that are running.
   * @returns {Array} Array of objects of type Main.
   * @deprecated This is going away
   */


  this.getInstances = function () {
    return mains;
  };
  /**
   * Add a test that is available to run
   *
   * The underlying test is a JavaScript object with these tags:
   *
   * tag: A tag to identify the test
   * name: Name of the test, what will appear in menus
   * input: Array of input labels
   * output: Array of output labels
   * test: Array of tests, each an array of input/expected
   * staff: true if this is staff testing (no saving)
   *
   * @param test Test to add. Can be Javascript object, JSON or base64
   * encoded JSON.
   */


  this.addTest = function (test) {
    tests.push(test);
  };
  /**
   * Run a test by name
   * @param test
   */


  this.runTest = function (test) {
    mains.forEach(function (main) {
      main.runTest(test);
    });
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component.js":
/*!*************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _Selectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Selectable */ "./packages/cirsim/src/Cirsim/Selectable.js");
/* harmony import */ var _In__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./In */ "./packages/cirsim/src/Cirsim/In.js");
/* harmony import */ var _Out__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Out */ "./packages/cirsim/src/Cirsim/Out.js");
/* harmony import */ var _OutInv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OutInv */ "./packages/cirsim/src/Cirsim/OutInv.js");
/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Connection */ "./packages/cirsim/src/Cirsim/Connection.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dompurify */ "./.yarn/cache/dompurify-npm-2.2.9-1a93a7440c-8673be49ae.zip/node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Utility_Rect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Utility/Rect */ "./packages/cirsim/src/Cirsim/Utility/Rect.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









/**
 * Base object for a component in a circuit
 * @constructor
 */

var Component = function Component() {
  _Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.call(this);
  var circuit = null;
  Object.defineProperty(this, 'circuit', {
    get: function get() {
      return circuit;
    },
    set: function set(value) {
      circuit = value;
    }
  });
  this.height = 10;
  this.width = 10;
  this.prev = null;
  this.id = ''; // Will be set to a unique id for this component

  this.circuit = null;
  this.naming = null; // Naming, as in U1 or I1

  this.ins = [];
  this.outs = [];
};
Component.prototype = Object.create(_Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.prototype);
Component.prototype.constructor = Component;
/**
 * Prefix for component naming
 */

Component.prototype.prefix = "U";
Component.prototype.nameRequired = false;
Component.prototype.delay = 11; ///< Propagation delay in nanoseconds

/**
 * Assign this component a unique ID. This is done when a
 * component is created by the view.
 */

Component.prototype.brand = function () {
  // Every component get a unique ID when it is created
  this.id = 'c' + ++Component.maxId;
}; /// Maximum ID integer value for any component


Component.maxId = 1000;

Component.prototype.copyFrom = function (component) {
  this.height = component.height;
  this.width = component.width;
  this.prev = component.prev;
  this.naming = component.naming;
  this.id = component.id;
  component.prev = this;
  _Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.prototype.copyFrom.call(this, component); //
  // Copy input and output states
  //

  for (var i = 0; i < this.ins.length; i++) {
    this.ins[i].copyFrom(component.ins[i]);
  }

  for (var _i = 0; _i < this.outs.length; _i++) {
    this.outs[_i].copyFrom(component.outs[_i]);
  }
};

Component.prototype.drop = function () {
  if (this.x < this.width / 2) {
    this.x = this.width / 2;
  }

  if (this.y < this.height / 2) {
    this.y = this.height / 2;
  }
};

Component.prototype.grab = function () {
  _Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.prototype.grab.call(this);
  this.circuit.moveToFront(this);
};

Component.prototype.mouseUp = function () {};
/**
 * Called when a component is added to a circuit
 * @param circuit
 */


Component.prototype.added = function (circuit) {
  this.circuit = circuit;

  if (this.naming === null && this.nameRequired) {
    // Create a new name
    for (var i = 1;; i++) {
      var naming = void 0;

      if (this.prefix.charAt(0) === "*") {
        if (i <= 26) {
          naming = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(i - 1);
        } else {
          naming = this.prefix.charAt(1) + (i - 26);
        }
      } else {
        naming = this.prefix + i;
      }

      var existing = this.circuit.getComponentByNaming(naming);

      if (existing === null) {
        this.naming = naming;
        break;
      }
    }
  }
};
/**
 * Add an input to this component
 * @param x Relative X location
 * @param y Relative Y location
 * @param len Length of the line to draw for the input
 * @return {In}
 */


Component.prototype.addIn = function (x, y, len, name) {
  var inObj = new _In__WEBPACK_IMPORTED_MODULE_1__.In(this, x, y, len, name);
  inObj.index = this.ins.length;
  this.ins.push(inObj);
  return inObj;
};
/**
 * Add an output to this component
 * @param x Relative X location
 * @param y Relative Y location
 * @param len Length of the line to draw for the output
 * @return Created output object
 */


Component.prototype.addOut = function (x, y, len, name, inv) {
  var outObj = new _Out__WEBPACK_IMPORTED_MODULE_2__.Out(this, x, y, len, name, inv);
  outObj.index = this.outs.length;
  this.outs.push(outObj);
  return outObj;
};
/**
 * Add an inverse output to this component
 * @param x Relative X location
 * @param y Relative Y location
 * @param len Length of the line to draw for the output
 * @return Created output object
 */


Component.prototype.addOutInv = function (x, y, len, name, inv) {
  var outObj = new _OutInv__WEBPACK_IMPORTED_MODULE_3__.OutInv(this, x, y, len, name, inv);
  outObj.index = this.outs.length;
  this.outs.push(outObj);
  return outObj;
};
/**
 * Try to touch this component or some part of
 * the component.
 * @param x Mouse X
 * @param y Mouse Y
 */


Component.prototype.touch = function (x, y) {
  // First, try to touch the inputs and outputs
  var touched = this.touchOut(x, y);

  if (touched !== null) {
    // We have touched an Out connector. Add a connection
    // for this output, but with no current "to"
    return new _Connection__WEBPACK_IMPORTED_MODULE_4__.Connection(touched, null);
  }

  touched = this.touchIn(x, y);

  if (touched !== null) {
    // We have touched an In connector. Add a connection
    // for this input, but with no current "from"
    return new _Connection__WEBPACK_IMPORTED_MODULE_4__.Connection(null, touched);
  } // Have we touched the component itself?


  if (x >= this.x - this.width / 2 && x <= this.x + this.width / 2 && y >= this.y - this.height / 2 && y <= this.y + this.height / 2) {
    return this;
  } // Test if we have touched an output connection or bend


  for (var i = 0; i < this.outs.length; i++) {
    var conn = this.outs[i].touchConnections(x, y);

    if (conn !== null) {
      return conn;
    }
  }

  return null;
};
/**
 * Try to touch an Out object for this componenet
 * @param x
 * @param y
 * @return Out object touched or null if none
 */


Component.prototype.touchOut = function (x, y) {
  for (var i = 0; i < this.outs.length; i++) {
    if (this.outs[i].touch(x, y)) {
      return this.outs[i];
    }
  }

  return null;
};
/**
 * Try to touch an In object for this componenet
 * @param x
 * @param y
 * @return In object touched or null if none
 */


Component.prototype.touchIn = function (x, y) {
  for (var i = 0; i < this.ins.length; i++) {
    if (this.ins[i].touch(x, y)) {
      return this.ins[i];
    }
  }

  return null;
};
/**
 * Collect all of this component and any bends that
 * are contained in the rectangle.
 * @param rect Rectangle to test
 * @param collect Collection (array) to add items to.
 */


Component.prototype.inRect = function (rect, collect) {
  if (rect.contains(this.x, this.y)) {
    collect.push(this);
  }

  this.outs.forEach(function (out) {
    out.selectRect(rect, collect);
  });
};

Component.prototype["delete"] = function () {
  // Delete all connection
  for (var i = 0; i < this.ins.length; i++) {
    this.ins[i].clear();
  }

  for (var i = 0; i < this.outs.length; i++) {
    this.outs[i].clear();
  }

  this.circuit["delete"](this);
};
/**
 * Compute a bounding box that completely contains the component
 * @returns {Rect}
 */


Component.prototype.bounds = function () {
  var bounds = new _Utility_Rect__WEBPACK_IMPORTED_MODULE_7__.Rect(this.x - this.width / 2, this.y - this.height / 2, this.x + this.width / 2, this.y + this.height / 2);

  var _iterator = _createForOfIteratorHelper(this.ins),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ins = _step.value;
      bounds.expand(ins.bounds());
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(this.outs),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var out = _step2.value;
      bounds.expand(out.bounds());
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return bounds;
};
/**
 * Draw component object.
 *
 * Default version for simple box objects
 * @param context Display context
 * @param view View object
 */


Component.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawBox(context);
  this.drawName(context, 0, 3);
  this.drawIO(context, view);
};
/**
 * Draw the input/output pins for this component.
 *
 * This also draws the connections.
 */


Component.prototype.drawIO = function (context, view) {
  for (var i = 0; i < this.ins.length; i++) {
    this.selectStyle(context, view);
    this.ins[i].draw(context, view);
  }

  for (var i = 0; i < this.outs.length; i++) {
    this.selectStyle(context, view);
    this.outs[i].draw(context, view);
  }
};
/**
 * Save the component basic properties to an object
 *
 * The character ' is replaced with `. This is so the
 * output JSON won't have any ' characters that would
 * cause problems in PHP and Javascript
 *
 * @returns {{id: *, x: *, y: *, name: string, type: *}}
 */


Component.prototype.save = function () {
  var type = this.constructor.type;
  var naming = this.naming;

  if (naming !== null) {
    naming = naming.replace(/'/g, '`');
  }

  return {
    "id": this.id,
    "x": this.x,
    "y": this.y,
    "name": naming,
    "type": type
  };
};

Component.prototype.load = function (obj) {
  this.id = this.sanitize(obj["id"]); // Determine the maximum loaded ID value as we load
  // in new components.

  var idValue = +this.id.substr(1);

  if (idValue > Component.maxId) {
    Component.maxId = idValue;
  }

  this.x = +obj["x"];
  this.y = +obj["y"];
  this.moveX = this.x;
  this.moveY = this.y;
  var naming = obj["name"];

  if (naming !== null) {
    this.naming = this.sanitize(naming).replace(/`/g, "'");
  } else {
    this.naming = null;
  }
};

Component.prototype.saveConnections = function () {
  var connections = [];

  for (var i = 0; i < this.outs.length; i++) {
    var out = this.outs[i];

    for (var j = 0; j < out.to.length; j++) {
      var conn = out.to[j];
      var connObj = conn.save();

      if (connObj !== null) {
        connections.push(connObj);
      }
    }
  }

  return connections;
};

Component.prototype.properties = function (main) {
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_5__.ComponentPropertiesDlg(this, main);
  dlg.open();
};
/**
 * Advance the animation for this component by delta seconds
 * @param delta Time to advance in seconds
 * @returns {boolean} true if animation needs to be redrawn
 */


Component.prototype.advance = function (delta) {
  return false;
};
/**
 * This function is called when an input is changed on this
 * component. It indicates that we need to queue a simulation
 * event for this component.
 */


Component.prototype.pending = function () {
  var delay = this.delay * 0.1;
  var state = [];

  for (var i = 0; i < this.ins.length; i++) {
    state.push(this.ins[i].value);
  }

  if (this.circuit.circuits !== null) {
    this.circuit.circuits.simulation.queue(this, delay, state);
  }
};

Component.prototype.getSimulation = function () {
  if (this.circuit !== null) {
    return this.circuit.circuits.simulation;
  }

  return null;
};
/**
 * Determine the propagation delay for this device
 */


Component.prototype.getDelay = function () {
  return this.delay;
};

Component.prototype.compute = function (state) {};

Component.prototype.newTab = function () {};
/**
 * Draw the name of a component
 * @param context Context to draw on
 * @param x X location
 * @param y Y locatino
 * @param font Optional font to use
 */


Component.prototype.drawName = function (context, x, y, font) {
  // Name
  if (this.naming !== null) {
    context.beginPath();
    context.font = font !== undefined ? font : "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x + x, this.y + y);
    context.stroke();
  }
};
/**
 * Draw text on a component
 * @param context Context to draw on
 * @param text Text to draw
 * @param x X location
 * @param y Y locatino
 * @param font Optional font to use
 */


Component.prototype.drawText = function (context, text, x, y, font) {
  context.beginPath();
  context.font = font !== undefined ? font : "14px Times";
  context.textAlign = "center";
  context.fillText(text, this.x + x, this.y + y);
  context.stroke();
};
/**
 * Many components are just a box. This is a function to draw that box
 * @param context Context to draw on
 */


Component.prototype.drawBox = function (context, fillStyle) {
  if (fillStyle !== 'none') {
    var save = context.fillStyle;
    context.fillStyle = fillStyle !== undefined ? fillStyle : '#ffffff';
    context.fillRect(this.x - this.width / 2 - 0.5, this.y - this.height / 2 - 0.5, this.width, this.height);
    context.fillStyle = save;
  }

  context.beginPath();
  context.rect(this.x - this.width / 2 - 0.5, this.y - this.height / 2 - 0.5, this.width, this.height);
  context.stroke();
};
/**
 * Many components are a trapezoid. This is a function to draw that trapezoid
 * @param context Conext to draw on
 * @param indentL Top/bottom indent size for left side (default = 0)
 * @param indentR Top/bottom indent size for right size (default = 20)
 */


Component.prototype.drawTrap = function (context, indentL, indentR) {
  if (indentL === undefined) {
    indentL = 0;
  }

  if (indentR === undefined) {
    indentR = 20;
  }

  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.fillStyle = '#ffffff'; // Left side

  context.beginPath();
  context.moveTo(leftX, topY + indentL);
  context.lineTo(leftX, botY - indentL); // Bottom

  context.lineTo(rightX, botY - indentR); // Right side

  context.lineTo(rightX, topY + indentR); // Top

  context.lineTo(leftX, topY + indentL);
  context.fill(); // Left side

  context.beginPath();
  context.moveTo(leftX, topY + indentL);
  context.lineTo(leftX, botY - indentL); // Bottom

  context.lineTo(rightX, botY - indentR); // Right side

  context.lineTo(rightX, topY + indentR); // Top

  context.lineTo(leftX, topY + indentL);
  context.stroke();
};
/**
 * Ability to send a command to a component.
 *
 * Commands are sent by tests.
 *
 * Default commands are...
 * type:InPinBus - Validates that a component is the correct type.
 *
 * @param null if not handled, or command result otherwise.
 */


Component.prototype.command = function (value) {
  if ((typeof value === 'string' || value instanceof String) && value.substr(0, 5) === "type:") {
    var expected = value.substr(5);

    if (expected !== this.constructor.type) {
      var expectedType = this.circuit.circuits.model.main.components.get(expected);

      if (expectedType !== null) {
        expectedType = expectedType.label;
      } else {
        expectedType = expected;
      }

      return {
        ok: false,
        msg: "Component " + this.naming + " should be type <strong>" + expectedType + "</strong> but is <strong>" + this.constructor.label + "</strong>"
      };
    }
  } else {
    return null;
  }

  return {
    ok: true
  };
};
/**
 * Override in the settable types, such as InPin and InPinBus
 * @param value Value to set
 */


Component.prototype.setAsString = function (value) {};
/**
 * Override in the string testable types, such as InPin and InPinBus
 * @param value Value to set
 * @param input In object
 */


Component.prototype.testAsString = function (value, input) {
  console.log(value);
};
/**
 * Draw a jagged (stair-step) line from x1,y1 to x2,y2
 * @param context Context to draw on
 * @param x1 Starting x
 * @param y1 Starting y
 * @param x2 Ending x
 * @param y2 Ending y
 * @param t Percentage of say from x1 to x2 the vertical line is
 */


Component.prototype.jaggedLine = function (context, x1, y1, x2, y2, t) {
  var xh = Math.round(x1 + (x2 - x1) * t) + 0.5;
  y1 += 0.5;
  y2 += 0.5;
  context.moveTo(x1, y1);
  context.lineTo(xh, y1);
  context.lineTo(xh, y2);
  context.lineTo(x2, y2);
  context.stroke();
};
/**
 * Sanitize text from user input and files to prevent XSS attacks.
 * @param text Text to sanitize
 * @returns Sanitized version
 */


Component.prototype.sanitize = function (text) {
  return dompurify__WEBPACK_IMPORTED_MODULE_6___default().sanitize(text);
};
/**
 * Update component after a circuit change.
 * This is used by CircuitRef components to ensure
 * references are always correct.
 */


Component.prototype.update = function () {};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/All.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/All.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "All": () => (/* binding */ All)
/* harmony export */ });
/* harmony import */ var _Zero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Zero */ "./packages/cirsim/src/Cirsim/Component/Zero.js");
/* harmony import */ var _One__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./One */ "./packages/cirsim/src/Cirsim/Component/One.js");
/* harmony import */ var _Or__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Or */ "./packages/cirsim/src/Cirsim/Component/Or.js");
/* harmony import */ var _Or3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Or3 */ "./packages/cirsim/src/Cirsim/Component/Or3.js");
/* harmony import */ var _Or4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Or4 */ "./packages/cirsim/src/Cirsim/Component/Or4.js");
/* harmony import */ var _Nor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Nor */ "./packages/cirsim/src/Cirsim/Component/Nor.js");
/* harmony import */ var _And__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./And */ "./packages/cirsim/src/Cirsim/Component/And.js");
/* harmony import */ var _And3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./And3 */ "./packages/cirsim/src/Cirsim/Component/And3.js");
/* harmony import */ var _And4__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./And4 */ "./packages/cirsim/src/Cirsim/Component/And4.js");
/* harmony import */ var _Nand__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Nand */ "./packages/cirsim/src/Cirsim/Component/Nand.js");
/* harmony import */ var _InPin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./InPin */ "./packages/cirsim/src/Cirsim/Component/InPin.js");
/* harmony import */ var _OutPin__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./OutPin */ "./packages/cirsim/src/Cirsim/Component/OutPin.js");
/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Clock */ "./packages/cirsim/src/Cirsim/Component/Clock.js");
/* harmony import */ var _Inverter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Inverter */ "./packages/cirsim/src/Cirsim/Component/Inverter.js");
/* harmony import */ var _LED__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./LED */ "./packages/cirsim/src/Cirsim/Component/LED.js");
/* harmony import */ var _Xor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Xor */ "./packages/cirsim/src/Cirsim/Component/Xor.js");
/* harmony import */ var _InPinBus__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./InPinBus */ "./packages/cirsim/src/Cirsim/Component/InPinBus.js");
/* harmony import */ var _OutPinBus__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./OutPinBus */ "./packages/cirsim/src/Cirsim/Component/OutPinBus.js");
/* harmony import */ var _BusConstant__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./BusConstant */ "./packages/cirsim/src/Cirsim/Component/BusConstant.js");
/* harmony import */ var _BusOr__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./BusOr */ "./packages/cirsim/src/Cirsim/Component/BusOr.js");
/* harmony import */ var _BusDecoder__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./BusDecoder */ "./packages/cirsim/src/Cirsim/Component/BusDecoder.js");
/* harmony import */ var _BusSelector__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./BusSelector */ "./packages/cirsim/src/Cirsim/Component/BusSelector.js");
/* harmony import */ var _BusMultiplexer__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./BusMultiplexer */ "./packages/cirsim/src/Cirsim/Component/BusMultiplexer.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Button */ "./packages/cirsim/src/Cirsim/Component/Button.js");
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Text */ "./packages/cirsim/src/Cirsim/Component/Text.js");
/* harmony import */ var _TrafficLight__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./TrafficLight */ "./packages/cirsim/src/Cirsim/Component/TrafficLight.js");
/* harmony import */ var _HexToSevenSegment__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./HexToSevenSegment */ "./packages/cirsim/src/Cirsim/Component/HexToSevenSegment.js");
/* harmony import */ var _SevenSeg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./SevenSeg */ "./packages/cirsim/src/Cirsim/Component/SevenSeg.js");
/* harmony import */ var _FmBus__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./FmBus */ "./packages/cirsim/src/Cirsim/Component/FmBus.js");
/* harmony import */ var _ToBus__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./ToBus */ "./packages/cirsim/src/Cirsim/Component/ToBus.js");
/* harmony import */ var _DFF__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./DFF */ "./packages/cirsim/src/Cirsim/Component/DFF.js");
/* harmony import */ var _DFFsr__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./DFFsr */ "./packages/cirsim/src/Cirsim/Component/DFFsr.js");
/* harmony import */ var _JKFF__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./JKFF */ "./packages/cirsim/src/Cirsim/Component/JKFF.js");
/* harmony import */ var _DLatch__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./DLatch */ "./packages/cirsim/src/Cirsim/Component/DLatch.js");
/* harmony import */ var _SRLatch__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./SRLatch */ "./packages/cirsim/src/Cirsim/Component/SRLatch.js");
/* harmony import */ var _Letters16__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Letters16 */ "./packages/cirsim/src/Cirsim/Component/Letters16.js");
/* harmony import */ var _Register__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Register */ "./packages/cirsim/src/Cirsim/Component/Register.js");
/* harmony import */ var _Alu4__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Alu4 */ "./packages/cirsim/src/Cirsim/Component/Alu4.js");
/* harmony import */ var _Registers16__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Registers16 */ "./packages/cirsim/src/Cirsim/Component/Registers16.js");
/* harmony import */ var _Pad__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Pad */ "./packages/cirsim/src/Cirsim/Component/Pad.js");
/* harmony import */ var _LEDBar__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./LEDBar */ "./packages/cirsim/src/Cirsim/Component/LEDBar.js");
/* harmony import */ var _Pc16__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./Pc16 */ "./packages/cirsim/src/Cirsim/Component/Pc16.js");
/* harmony import */ var _Memory16__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Memory16 */ "./packages/cirsim/src/Cirsim/Component/Memory16.js");
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./Memory */ "./packages/cirsim/src/Cirsim/Component/Memory.js");
/* harmony import */ var _Decoder3__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./Decoder3 */ "./packages/cirsim/src/Cirsim/Component/Decoder3.js");
/* harmony import */ var _InstructionDecoder4__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./InstructionDecoder4 */ "./packages/cirsim/src/Cirsim/Component/InstructionDecoder4.js");
/* harmony import */ var _Alu16__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./Alu16 */ "./packages/cirsim/src/Cirsim/Component/Alu16.js");
/* harmony import */ var _Counter__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./Counter */ "./packages/cirsim/src/Cirsim/Component/Counter.js");
/* harmony import */ var _Extend__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./Extend */ "./packages/cirsim/src/Cirsim/Component/Extend.js");
/* harmony import */ var _Alu__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./Alu */ "./packages/cirsim/src/Cirsim/Component/Alu.js");


















































/**
 * Add all components into the system.
 */

var All = function All(components) {
  // Comments are the order values
  components.add(_Zero__WEBPACK_IMPORTED_MODULE_0__.Zero); // 0

  components.add(_One__WEBPACK_IMPORTED_MODULE_1__.One); // 1

  components.add(_InPin__WEBPACK_IMPORTED_MODULE_10__.InPin); // 2

  components.add(_OutPin__WEBPACK_IMPORTED_MODULE_11__.OutPin); // 3

  components.add(_And__WEBPACK_IMPORTED_MODULE_6__.And); // 11

  components.add(_And3__WEBPACK_IMPORTED_MODULE_7__.And3); // 12

  components.add(_And4__WEBPACK_IMPORTED_MODULE_8__.And4); // 13

  components.add(_Nand__WEBPACK_IMPORTED_MODULE_9__.Nand); // 16

  components.add(_Or__WEBPACK_IMPORTED_MODULE_2__.Or); // 20

  components.add(_Or3__WEBPACK_IMPORTED_MODULE_3__.Or3); // 21

  components.add(_Or4__WEBPACK_IMPORTED_MODULE_4__.Or4); // 22

  components.add(_Nor__WEBPACK_IMPORTED_MODULE_5__.Nor); // 30

  components.add(_Xor__WEBPACK_IMPORTED_MODULE_15__.Xor); // 40

  components.add(_Inverter__WEBPACK_IMPORTED_MODULE_13__.Inverter); // 50

  components.add(_Button__WEBPACK_IMPORTED_MODULE_23__.Button); // 100

  components.add(_LED__WEBPACK_IMPORTED_MODULE_14__.LED); // 102

  components.add(_Clock__WEBPACK_IMPORTED_MODULE_12__.Clock); // 104

  components.add(_Text__WEBPACK_IMPORTED_MODULE_24__.Text); // 106

  components.add(_SRLatch__WEBPACK_IMPORTED_MODULE_34__.SRLatch); // 200

  components.add(_DLatch__WEBPACK_IMPORTED_MODULE_33__.DLatch); // 202

  components.add(_DFF__WEBPACK_IMPORTED_MODULE_30__.DFF); // 204

  components.add(_DFFsr__WEBPACK_IMPORTED_MODULE_31__.DFFsr); // 206

  components.add(_JKFF__WEBPACK_IMPORTED_MODULE_32__.JKFF); // 208

  components.add(_InPinBus__WEBPACK_IMPORTED_MODULE_16__.InPinBus); // 300

  components.add(_BusConstant__WEBPACK_IMPORTED_MODULE_18__.BusConstant); // 301

  components.add(_OutPinBus__WEBPACK_IMPORTED_MODULE_17__.OutPinBus); // 302

  components.add(_FmBus__WEBPACK_IMPORTED_MODULE_28__.FmBus); // 305

  components.add(_ToBus__WEBPACK_IMPORTED_MODULE_29__.ToBus); // 306

  components.add(_BusOr__WEBPACK_IMPORTED_MODULE_19__.BusOr); // 308

  components.add(_BusSelector__WEBPACK_IMPORTED_MODULE_21__.BusSelector); // 310

  components.add(_Extend__WEBPACK_IMPORTED_MODULE_48__.Extend); // 311

  components.add(_BusDecoder__WEBPACK_IMPORTED_MODULE_20__.BusDecoder); // 400

  components.add(_BusMultiplexer__WEBPACK_IMPORTED_MODULE_22__.BusMultiplexer); // 402

  components.add(_Register__WEBPACK_IMPORTED_MODULE_36__.Register); // 404

  components.add(_Counter__WEBPACK_IMPORTED_MODULE_47__.Counter); // 406

  components.add(_Pad__WEBPACK_IMPORTED_MODULE_39__.Pad); // 500

  components.add(_LEDBar__WEBPACK_IMPORTED_MODULE_40__.LEDBar); // 502

  components.add(_TrafficLight__WEBPACK_IMPORTED_MODULE_25__.TrafficLight); // 504

  components.add(_HexToSevenSegment__WEBPACK_IMPORTED_MODULE_26__.HexToSevenSegment); // 506

  components.add(_SevenSeg__WEBPACK_IMPORTED_MODULE_27__.SevenSeg); // 508

  components.add(_Letters16__WEBPACK_IMPORTED_MODULE_35__.Letters16); // 510

  components.add(_InstructionDecoder4__WEBPACK_IMPORTED_MODULE_45__.InstructionDecoder4); // 600

  components.add(_Alu4__WEBPACK_IMPORTED_MODULE_37__.Alu4); // 602

  components.add(_Registers16__WEBPACK_IMPORTED_MODULE_38__.Registers16); // 700

  components.add(_Pc16__WEBPACK_IMPORTED_MODULE_41__.Pc16); // 702

  components.add(_Memory16__WEBPACK_IMPORTED_MODULE_42__.Memory16); // 704

  components.add(_Memory__WEBPACK_IMPORTED_MODULE_43__.Memory); // 705

  components.add(_Alu16__WEBPACK_IMPORTED_MODULE_46__.Alu16); // 706

  components.add(_Alu__WEBPACK_IMPORTED_MODULE_49__.Alu); // 707

  components.add(_Decoder3__WEBPACK_IMPORTED_MODULE_44__.Decoder3); // 1000

  components.addPalette('combinatorial', [_Or__WEBPACK_IMPORTED_MODULE_2__.Or, _And__WEBPACK_IMPORTED_MODULE_6__.And, _Inverter__WEBPACK_IMPORTED_MODULE_13__.Inverter, _Xor__WEBPACK_IMPORTED_MODULE_15__.Xor, _Nand__WEBPACK_IMPORTED_MODULE_9__.Nand, _Nor__WEBPACK_IMPORTED_MODULE_5__.Nor]);
  components.addPalette('sequential', [_DFF__WEBPACK_IMPORTED_MODULE_30__.DFF, _DFFsr__WEBPACK_IMPORTED_MODULE_31__.DFFsr, _JKFF__WEBPACK_IMPORTED_MODULE_32__.JKFF, _DLatch__WEBPACK_IMPORTED_MODULE_33__.DLatch, _SRLatch__WEBPACK_IMPORTED_MODULE_34__.SRLatch]);
  components.addPalette('bus', [_InPinBus__WEBPACK_IMPORTED_MODULE_16__.InPinBus, _OutPinBus__WEBPACK_IMPORTED_MODULE_17__.OutPinBus, _BusOr__WEBPACK_IMPORTED_MODULE_19__.BusOr, _BusSelector__WEBPACK_IMPORTED_MODULE_21__.BusSelector, _BusDecoder__WEBPACK_IMPORTED_MODULE_20__.BusDecoder, _BusMultiplexer__WEBPACK_IMPORTED_MODULE_22__.BusMultiplexer]);
  components.addPalette('all', [_Zero__WEBPACK_IMPORTED_MODULE_0__.Zero, _One__WEBPACK_IMPORTED_MODULE_1__.One, _InPin__WEBPACK_IMPORTED_MODULE_10__.InPin, _OutPin__WEBPACK_IMPORTED_MODULE_11__.OutPin, _Clock__WEBPACK_IMPORTED_MODULE_12__.Clock, _Button__WEBPACK_IMPORTED_MODULE_23__.Button, _LED__WEBPACK_IMPORTED_MODULE_14__.LED, _Text__WEBPACK_IMPORTED_MODULE_24__.Text, _Or__WEBPACK_IMPORTED_MODULE_2__.Or, _Or3__WEBPACK_IMPORTED_MODULE_3__.Or3, _Or4__WEBPACK_IMPORTED_MODULE_4__.Or4, _Nor__WEBPACK_IMPORTED_MODULE_5__.Nor, _And__WEBPACK_IMPORTED_MODULE_6__.And, _And3__WEBPACK_IMPORTED_MODULE_7__.And3, _And4__WEBPACK_IMPORTED_MODULE_8__.And4, _Nand__WEBPACK_IMPORTED_MODULE_9__.Nand, _LEDBar__WEBPACK_IMPORTED_MODULE_40__.LEDBar, _Inverter__WEBPACK_IMPORTED_MODULE_13__.Inverter, _Xor__WEBPACK_IMPORTED_MODULE_15__.Xor, _DFF__WEBPACK_IMPORTED_MODULE_30__.DFF, _DFFsr__WEBPACK_IMPORTED_MODULE_31__.DFFsr, _JKFF__WEBPACK_IMPORTED_MODULE_32__.JKFF, _DLatch__WEBPACK_IMPORTED_MODULE_33__.DLatch, _SRLatch__WEBPACK_IMPORTED_MODULE_34__.SRLatch, _InPinBus__WEBPACK_IMPORTED_MODULE_16__.InPinBus, _OutPinBus__WEBPACK_IMPORTED_MODULE_17__.OutPinBus, _BusConstant__WEBPACK_IMPORTED_MODULE_18__.BusConstant, _BusOr__WEBPACK_IMPORTED_MODULE_19__.BusOr, _BusDecoder__WEBPACK_IMPORTED_MODULE_20__.BusDecoder, _BusSelector__WEBPACK_IMPORTED_MODULE_21__.BusSelector, _Extend__WEBPACK_IMPORTED_MODULE_48__.Extend, _BusMultiplexer__WEBPACK_IMPORTED_MODULE_22__.BusMultiplexer, _TrafficLight__WEBPACK_IMPORTED_MODULE_25__.TrafficLight, _HexToSevenSegment__WEBPACK_IMPORTED_MODULE_26__.HexToSevenSegment, _SevenSeg__WEBPACK_IMPORTED_MODULE_27__.SevenSeg, _FmBus__WEBPACK_IMPORTED_MODULE_28__.FmBus, _ToBus__WEBPACK_IMPORTED_MODULE_29__.ToBus, _Register__WEBPACK_IMPORTED_MODULE_36__.Register, _Letters16__WEBPACK_IMPORTED_MODULE_35__.Letters16, _Alu4__WEBPACK_IMPORTED_MODULE_37__.Alu4, _Registers16__WEBPACK_IMPORTED_MODULE_38__.Registers16, _Pc16__WEBPACK_IMPORTED_MODULE_41__.Pc16, _Memory__WEBPACK_IMPORTED_MODULE_43__.Memory, _InstructionDecoder4__WEBPACK_IMPORTED_MODULE_45__.InstructionDecoder4, _Pad__WEBPACK_IMPORTED_MODULE_39__.Pad, _Alu__WEBPACK_IMPORTED_MODULE_49__.Alu, _Counter__WEBPACK_IMPORTED_MODULE_47__.Counter]);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Alu.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Alu.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alu": () => (/* binding */ Alu)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _InvalidArgumentException__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../InvalidArgumentException */ "./packages/cirsim/src/Cirsim/InvalidArgumentException.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




/**
 * Component: General purpose ALU component.
 * Works for 4/8/16/32 bits.
 * @constructor
 */

var Alu = function Alu(name) {
  var _this = this;

  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this, name); // How much we shrink the right side relative to the left side.

  var shrink = 15; // Properties

  var size = 16; // Size in bits

  var output = undefined; // The secondary output format

  var initialize = function initialize() {
    Object.defineProperties(_this, {
      // Size in bits
      size: {
        get: function get() {
          return size;
        },
        set: function set(value) {
          if (![4, 8, 16, 32].includes(+value)) {
            throw new _InvalidArgumentException__WEBPACK_IMPORTED_MODULE_2__.InvalidArgumentException("Illegal size value " + value);
          }

          size = +value;
        }
      },
      height: {
        value: 16 * 8
      },
      width: {
        value: 64
      },
      output: {
        get: function get() {
          return output;
        },
        set: function set(value) {
          if (!Alu.OUTPUT.POSSIBLE.includes(+value)) {
            throw new _InvalidArgumentException__WEBPACK_IMPORTED_MODULE_2__.InvalidArgumentException("Illegal output value " + value);
          }

          if (output !== +value) {
            // Output has changed, set the component secondary output
            output = +value;
            var out = this.outs[1];
            out.clear();
            out.bus = output === Alu.OUTPUT.CPSR;
            out.name = Alu.OUTPUT.LABELS[output];
          }
        }
      },
      control: {
        value: Alu.CONTROL.THUMB,
        writable: true
      }
    });
    _this.cin = false; // Carry in

    var left = -_this.width / 2;
    var right = _this.width / 2;
    _this.operator = ''; // Inputs and one output

    var inOffset = 32;
    _this.addIn(left, -inOffset, 16, "A").bus = true;
    _this.addIn(left, inOffset, 16, "B").bus = true;
    var dy = 0.5 * shrink;

    var c = _this.addIn(0, _this.height / 2 - dy, 8 + dy, "C");

    c.orientation = 's';
    c.bus = true;

    _this.addIn(left, inOffset + 16, 16, "Cin");

    _this.addOut(right, 0, 16, "O").bus = true;
    _this.addOut(right, 24, 16, "CPSR").bus = true;
    _this.output = Alu.OUTPUT.CPSR;
  };
  /**
   * Draw component object.
   * @param context Display context
   * @param view View object
   */


  this.draw = function (context, view) {
    this.selectStyle(context, view);
    var leftX = this.x - this.width / 2 - 0.5;
    var rightX = this.x + this.width / 2 + 0.5;
    var topY = this.y - this.height / 2 - 0.5;
    var botY = this.y + this.height / 2 + 0.5; // Left side

    context.beginPath();
    context.moveTo(leftX, topY);
    context.lineTo(leftX, this.y - shrink / 2);
    context.lineTo(leftX + 20, this.y);
    context.lineTo(leftX, this.y + shrink / 2);
    context.lineTo(leftX, botY); // Bottom

    context.lineTo(rightX, botY - shrink); // Right side

    context.lineTo(rightX, topY + shrink); // Top

    context.lineTo(leftX, topY); // Name

    if (this.naming !== null) {
      context.font = "14px Times";
      context.textAlign = "center";
      context.fillText(this.naming, this.x, this.y - 16);
    }

    if (this.operator.length > 1) {
      context.font = "bold 14px Times";
      context.textAlign = "center";
      context.fillText(this.operator, this.x + 1, this.y + 4);
    } else {
      context.font = "bold 22px Times";
      context.textAlign = "center";
      var y = 6;
      var x = 1;

      switch (this.operator) {
        case '+':
          y = 6;
          break;

        case '-':
          y = 5;
          break;

        default:
          break;
      }

      context.fillText(this.operator, this.x + x, this.y + y);
    }

    context.stroke();
    this.drawIO(context, view);
  };
  /**
   * Clone this component object.
   * @returns {Alu}
   */


  this.clone = function () {
    var copy = new Alu();
    copy.copyFrom(this);
    copy.size = this.size;
    copy.output = this.output;
    copy.control = this.control;
    return copy;
  };
  /**
   * Load this object from an object converted from JSON
   * @param obj Object from JSON
   */


  this.load = function (obj) {
    this.size = obj['size'];
    this.output = obj['output'];
    this.control = obj['control'];
    _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
  };
  /**
   * Create a save object suitable for conversion to JSON for export.
   * @returns {*} Object
   */


  this.save = function () {
    var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
    obj['size'] = this.size;
    obj['output'] = this.output;
    obj['control'] = this.control;
    return obj;
  };
  /**
   * Map control values to the extended thumb control values.
   * @param {int} cv
   * @returns {*}
   */


  this.controlMapping = function (cv) {
    switch (this.control) {
      case Alu.CONTROL.ASAO:
        cv &= 3;

        switch (cv) {
          case 0:
            cv = 11; // add

            break;

          case 1:
            cv = 17; // subtract

            break;

          case 2:
            cv = 0; // and

            break;

          case 3:
            cv = 12; // or

            break;
        }

        break;
    }

    return cv;
  };

  initialize();
};
Alu.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Alu.prototype.constructor = Alu;
Alu.prototype.prefix = "ALU";
Alu.prototype.nameRequired = true;
Alu.type = "Alu"; ///< Name to use in files

Alu.label = "ALU"; ///< Label for the palette

Alu.desc = "Arithmetic Logic Unit"; ///< Description for the palette

Alu.img = "alu.png"; ///< Image to use for the palette

Alu.description = "<h2>Arithmetic Logic Unit</h2><p>A and B are bus inputs \nto the ALU. C is the control input. Cin is the carry input for adc and sbc \noperations. O is a bus output result.</p>\n<p>If Cin is not connected, it is assumed to be false.</p>\n<p>The status bits in CPSR are: 0:N, 1:Z, 2:C, 3:V</p>";
Alu.help = 'alu';
Alu.order = 707; // Definition of the possible ALU outputs

Alu.OUTPUT = {
  CPSR: 0,
  ///< CPSR register.
  N: 1,
  ///< Negative flag
  Z: 2,
  ///< Zero flag
  C: 3,
  ///< Carry
  V: 4,
  ///< Overflow,
  POSSIBLE: [0, 1, 2, 3, 4],
  NAMES: ['CPSR', 'N - Negative', 'Z - Zero', 'C - Carry', 'V - Overflow'],
  LABELS: ['CPSR', 'N', 'Z', 'Cout', 'V']
};
Alu.CONTROL = {
  THUMB: 0,
  ///< Thumb format (4 or 6 bits)
  ASAO: 1,
  ///< Add/subtract/and/or only (2 bits),
  POSSIBLE: [0, 1],
  NAMES: ['Thumb (4 or 6 bits)', 'Add/subtract/and/or']
};
/**
 * Compute the gate result
 * @param state
 */

Alu.prototype.compute = function (state) {
  var a = state[0];
  var b = state[1];
  var c = state[2];
  var size = this.size; // Number of bytes in the result

  var bytes = size / 8; // A byte mask for results

  var mask = 0;

  for (var i = 0; i < bytes; i++) {
    mask <<= 8;
    mask |= 0xff;
  } // Negative bit set value
  // This would be 0x8000 for 16 bits


  var nBit = 1 << size - 1; // Maximum value
  // This would be 32767 for 16 bits

  var max = nBit - 1; // Minimum value
  // This would be -32767 for 16 bits

  var min = -max - 1; // Determine the carry input

  this.cin = state[3] !== undefined && state[3];

  function parse(c) {
    if (c === undefined) {
      return undefined;
    }

    if (!Array.isArray(c)) {
      return undefined;
    }

    var p = 1; // Power

    var sum = 0; // Computed total

    var _iterator = _createForOfIteratorHelper(c),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;

        if (v === undefined) {
          return undefined;
        }

        if (v) {
          if (p === nBit) {
            sum -= p;
          } else {
            sum += p;
          }
        }

        p *= 2;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return sum;
  }

  var av = parse(a);
  var bv = parse(b);
  var cv = this.controlMapping(parse(c)); // console.log("av=" + av + " bc=" + bv + " cv=" + cv);

  var ov = bv;
  var carry = false;
  var overflow = false;
  var ov1, sign;

  switch (cv) {
    case 8: // TST (works like AND)

    case 0:
      // and
      ov = av & bv;
      this.operator = '&';
      break;

    case 1:
      // xor
      ov = av ^ bv;
      this.operator = 'xor';
      break;

    case 2:
      // left shift logical
      ov = av << bv;
      this.operator = '<<';
      break;

    case 3:
      // Right shift logical
      ov = (av & mask) >> bv;
      this.operator = '>>';
      break;

    case 4:
      // Arithmetic shift right
      sign = av & 1 << size - 1;
      ov = av;

      for (var _i = 0; _i < bv; _i++) {
        ov = av >> 1;
        ov |= sign;
      }

      this.operator = 'asr';
      break;

    case 5:
      // add w/carry
      ov = av + bv;

      if (this.cin) {
        ov++;
      }

      ov1 = (av & mask) + (bv & mask);
      carry = (ov1 & 1 << size) !== 0;
      overflow = ov < min || ov > max;
      this.operator = '+';
      break;

    case 11: // cmn, works like add

    case 34: // Format 3 add

    case 16:
      // Format 2 add
      ov = av + bv;
      ov1 = (av & mask) + (bv & mask);
      carry = (ov1 & 1 << size) !== 0;
      overflow = ov < min || ov > max;
      this.operator = '+';
      break;

    case 6:
      // subtract w/carry
      ov = av - bv;

      if (!this.cin) {
        ov--;
      }

      ov1 = (av & mask) + (~bv & mask) + 1;
      carry = (ov1 & 1 << size) !== 0;
      overflow = ov < min || ov > max;
      this.operator = '-';
      break;

    case 10: // cmp (works like sub)

    case 33: // Format 3 cmp

    case 35: // Format 3 sub

    case 17:
      // Format 2 sub
      ov = av - bv;
      ov1 = (av & mask) + (~bv & mask) + 1;
      carry = (ov1 & 1 << size) !== 0;
      overflow = ov < min || ov > max;
      this.operator = '-';
      break;

    case 7:
      // Rotate right
      sign = av & nBit;
      ov = av & mask;

      for (var _i2 = 0; _i2 < bv; _i2++) {
        var low = (ov & 1) << size - 1;
        ov = (av & mask) >> 1;
        ov |= low;
      }

      this.operator = 'ror';
      break;

    case 9:
      // Negate
      ov = -bv;
      this.operator = 'neg';
      break;

    case 12:
      // or
      ov = av | bv;
      this.operator = 'or';
      break;

    case 13:
      // mul
      ov = av * bv;
      overflow = ov < min || ov > max;
      this.operator = '*';
      break;

    case 14:
      // bic
      ov = av & (bv ^ mask);
      this.operator = 'bic';
      break;

    case 15:
      // not
      ov = av ^ mask;
      this.operator = 'not';
      break;

    case 18:
      // mul high
      ov = (av & mask) * (bv & mask) >> size;
      this.operator = '*^';
      break;

    default:
      // mov
      ov = bv;
      this.operator = 'mov';
      break;
  }

  ov &= mask;
  var o = []; // For accumulating the output

  if (ov === undefined) {
    for (var _i3 = 0; _i3 < size; _i3++) {
      o.push(undefined);
    }

    if (this.output === Alu.OUTPUT.CPSR) {
      this.outs[1].set([undefined, undefined, undefined, undefined]);
    } else {
      this.outs[1].set(undefined);
    }
  } else {
    var _ov = ov;

    for (var _i4 = 0; _i4 < size; _i4++) {
      o.push((_ov & 1) === 1);
      _ov >>= 1;
    }

    switch (this.output) {
      case Alu.OUTPUT.CPSR:
        // Order: N, Z, C, V
        this.outs[1].set([o[size - 1], ov === 0, carry, overflow]);
        break;

      case Alu.OUTPUT.N:
        this.outs[1].set(o[size - 1]);
        break;

      case Alu.OUTPUT.Z:
        this.outs[1].set(ov === 0);
        break;

      case Alu.OUTPUT.C:
        this.outs[1].set(carry);
        break;

      case Alu.OUTPUT.V:
        this.outs[1].set(overflow);
        break;
    }
  }

  this.outs[0].set(o);
};

Alu.prototype.properties = function (main) {
  var _this2 = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var sizeId = dlg.uniqueId();
  var outputId = dlg.uniqueId();
  var controlId = dlg.uniqueId();
  var html = "<div class=\"control-table\"><div class=\"control\">\n<label for=\"".concat(sizeId, "\">Size:</label>\n<select name=\"").concat(sizeId, "\" id=\"").concat(sizeId, "\">");

  for (var _i5 = 0, _arr = [4, 8, 16, 32]; _i5 < _arr.length; _i5++) {
    var size = _arr[_i5];
    var selected = this.size === size ? ' selected' : '';
    html += "<option value=\"".concat(size, "\"").concat(selected, ">").concat(size, "</option>");
  }

  html += "</select>\n</div>\n<div class=\"control\">\n        <label>Secondary Output:</label>\n        <select class=\"auto\" name=\"".concat(outputId, "\" id=\"").concat(outputId, "\">");

  var _iterator2 = _createForOfIteratorHelper(Alu.OUTPUT.POSSIBLE),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var output = _step2.value;

      var _selected = this.output === output ? ' selected' : '';

      var name = Alu.OUTPUT.NAMES[output];
      html += "<option value=\"".concat(output, "\"").concat(_selected, ">").concat(name, "</option>");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  html += "</select>\n</div>\n<div class=\"control\">\n<label>Control:</label>\n<select class=\"auto\" name=\"".concat(controlId, "\" id=\"").concat(controlId, "\">");

  var _iterator3 = _createForOfIteratorHelper(Alu.CONTROL.POSSIBLE),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var control = _step3.value;

      var _selected2 = this.control === control ? ' selected' : '';

      var _name = Alu.CONTROL.NAMES[control];
      html += "<option value=\"".concat(control, "\"").concat(_selected2, ">").concat(_name, "</option>");
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  html += "</select>\n</div></div>";
  dlg.extra(html, function () {
    return null;
  }, function () {
    _this2.size = document.getElementById(sizeId).value;
    _this2.output = document.getElementById(outputId).value;
    return null;
  }, 85);
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Alu16.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Alu16.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alu16": () => (/* binding */ Alu16)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");

/**
 * Component: 16-bit ALU
 * @constructor
 */

var Alu16 = function Alu16(name) {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this, name);
  this.height = 16 * 8;
  this.width = 64;
  this.shrink = 15;
  this.cin = false; // Carry in

  var left = -this.width / 2;
  var right = this.width / 2;
  this.operator = ''; // Inputs and one output

  var inOffset = 32;
  this.addIn(left, -inOffset, 16, "A").bus = true;
  this.addIn(left, inOffset, 16, "B").bus = true;
  var dy = 0.5 * this.shrink;
  var c = this.addIn(0, this.height / 2 - dy, 8 + dy, "C");
  c.orientation = 's';
  c.bus = true;
  this.addIn(left, inOffset + 16, 16, "Cin");
  this.addOut(right, 0, 16, "O").bus = true;
  this.addOut(right, 24, 16, "CPSR").bus = true;
};
Alu16.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Alu16.prototype.constructor = Alu16;
Alu16.prototype.prefix = "ALU";
Alu16.prototype.nameRequired = true;
Alu16.type = "Alu16"; ///< Name to use in files

Alu16.label = "ALU 16"; ///< Label for the palette

Alu16.desc = "Simple 16-bit ALU"; ///< Description for the palette

Alu16.img = "alu.png"; ///< Image to use for the palette

Alu16.description = '<h2>16-bit ALU</h2><p>Simple example 16-bit ALU. A and ' + 'B are bus inputs to the ALU. C is the control input. Cin is the carry input ' + 'for adc and sbc operations. O is a bus output result and CPSR is the status' + ' output bits for the current program status register.</p>' + '<p>If Cin is not connected, it is assumed to be false.</p>' + '<p>The status bits in CPSR are: 0:N, 1:Z, 2:C, 3:V</p>';
Alu16.help = 'alu16';
Alu16.order = 706;
/**
 * Compute the gate result
 * @param state
 */

Alu16.prototype.compute = function (state) {
  var a = state[0];
  var b = state[1];
  var c = state[2]; // Determine the carry input

  this.cin = state[3] !== undefined && state[3];

  function parse(c) {
    if (c === undefined) {
      return undefined;
    }

    if (!Array.isArray(c)) {
      return undefined;
    }

    var p = 1;
    var sum = 0;
    c.forEach(function (v) {
      if (v === undefined) {
        return undefined;
      }

      if (v) {
        if (p == 0x8000) {
          sum -= p;
        } else {
          sum += p;
        }
      }

      p *= 2;
    });
    return sum;
  }

  var av = parse(a);
  var bv = parse(b);
  var cv = parse(c); //console.log("av=" + av + " bc=" + bv + " cv=" + cv);

  var ov = bv;
  var carry = false;
  var overflow = false;

  switch (cv) {
    case 8: // TST (works like AND)

    case 0:
      // and
      ov = av & bv;
      this.operator = '&';
      break;

    case 1:
      // xor
      ov = av ^ bv;
      this.operator = 'xor';
      break;

    case 2:
      // left shift logical
      ov = av << bv;
      this.operator = '<<';
      break;

    case 3:
      // Right shift logical
      ov = (av & 0xffff) >> bv;
      this.operator = '>>';
      break;

    case 4:
      // Arithmetic shift right
      var sign = av & 0x8000;
      ov = av;

      for (var i = 0; i < bv; i++) {
        ov = av >> 1;
        ov |= sign;
      }

      this.operator = 'asr';
      break;

    case 5:
      // add w/carry
      ov = av + bv;

      if (this.cin) {
        ov++;
      }

      var ov1 = (av & 0xffff) + (bv & 0xffff);
      carry = (ov1 & 0x10000) != 0;
      overflow = ov < -32768 || ov > 32768;
      this.operator = '+';
      break;

    case 11: // cmn, works like add

    case 34: // Format 3 add

    case 16:
      // Format 2 add
      ov = av + bv;
      var ov1 = (av & 0xffff) + (bv & 0xffff);
      carry = (ov1 & 0x10000) != 0;
      overflow = ov < -32768 || ov > 32768;
      this.operator = '+';
      break;

    case 6:
      // subtract w/carry
      ov = av - bv;

      if (!this.cin) {
        ov--;
      }

      var ov1 = (av & 0xffff) + (~bv & 0xffff) + 1;
      carry = (ov1 & 0x10000) != 0;
      overflow = ov < -32768 || ov > 32768;
      this.operator = '-';
      break;

    case 10: // cmp (works like sub)

    case 33: // Format 3 cmp

    case 35: // Format 3 sub

    case 17:
      // Format 2 sub
      ov = av - bv;
      var ov1 = (av & 0xffff) + (~bv & 0xffff) + 1;
      carry = (ov1 & 0x10000) != 0;
      overflow = ov < -32768 || ov > 32768;
      this.operator = '-';
      break;

    case 7:
      // Rotate right
      var sign = av & 0x8000;
      ov = av & 0xffff;

      for (var i = 0; i < bv; i++) {
        var low = (ov & 1) << 15;
        ov = (av & 0xffff) >> 1;
        ov |= low;
      }

      this.operator = 'ror';
      break;

    case 9:
      // Negate
      ov = -bv;
      this.operator = 'neg';
      break;

    case 12:
      // or
      ov = av | bv;
      this.operator = 'or';
      break;

    case 13:
      // mul
      ov = av * bv;
      overflow = ov < -32768 || ov > 32768;
      this.operator = '*';
      break;

    case 14:
      // bic
      ov = av & (bv ^ 0xffff);
      this.operator = 'bic';
      break;

    case 15:
      // not
      ov = av ^ 0xffff;
      this.operator = 'not';
      break;

    case 18:
      // mul high
      av &= 0xffff;
      bv &= 0xffff;
      ov = av * bv >> 16;
      this.operator = '*^';
      break;

    default:
      // mov
      ov = bv;
      this.operator = 'mov';
      break;
  }

  ov &= 0xffff;

  if (ov === undefined) {
    this.outs[0].set([undefined, undefined, undefined, undefined]);
    this.outs[1].set([undefined, undefined, undefined, undefined]);
  } else {
    var o = [];
    var ov1 = ov;

    for (var i = 0; i < 16; i++) {
      o.push((ov1 & 1) == 1);
      ov1 >>= 1;
    }

    this.outs[0].set(o); // Order: N, Z, C, V

    this.outs[1].set([o[15], ov == 0, carry, overflow]);
  }
};
/**
 * Clone this component object.
 * @returns {Alu16}
 */


Alu16.prototype.clone = function () {
  var copy = new Alu16();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Alu16.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5; // Left side

  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, this.y - this.shrink / 2);
  context.lineTo(leftX + 20, this.y);
  context.lineTo(leftX, this.y + this.shrink / 2);
  context.lineTo(leftX, botY); // Bottom

  context.lineTo(rightX, botY - this.shrink); // Right side

  context.lineTo(rightX, topY + this.shrink); // Top

  context.lineTo(leftX, topY); // Name

  if (this.naming !== null) {
    context.font = "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x, this.y - 16);
  }

  if (this.operator.length > 1) {
    context.font = "bold 14px Times";
    context.textAlign = "center";
    context.fillText(this.operator, this.x + 1, this.y + 4);
  } else {
    context.font = "bold 22px Times";
    context.textAlign = "center";
    var y = 6;
    var x = 1;

    switch (this.operator) {
      case '+':
        y = 6;
        break;

      case '-':
        y = 5;
        break;

      default:
        break;
    }

    context.fillText(this.operator, this.x + x, this.y + y);
  }

  context.stroke();
  this.drawIO(context, view);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Alu4.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Alu4.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alu4": () => (/* binding */ Alu4)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: Simple 4-bit ALU
 * @constructor
 */

var Alu4 = function Alu4() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16 * 8;
  this.width = 64;
  this.shrink = 15;
  var left = -this.width / 2;
  var right = this.width / 2; // Inputs and one output

  var inOffset = 32;
  this.addIn(left, -inOffset, 16, "A").bus = true;
  this.addIn(left, inOffset, 16, "B").bus = true;
  var dy = 0.5 * this.shrink;
  var c = this.addIn(0, this.height / 2 - dy, 6 + dy, "C");
  c.orientation = 's';
  c.bus = true;
  this.addOut(right, 0, 16, "O").bus = true;
  this.addOut(right, 24, 16, "CPSR").bus = true;
};
Alu4.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Alu4.prototype.constructor = Alu4;
Alu4.prototype.prefix = "ALU";
Alu4.prototype.nameRequired = true;
Alu4.type = "alu4"; ///< Name to use in files

Alu4.label = "ALU 4"; ///< Label for the palette

Alu4.desc = "Simple 4-bit ALU"; ///< Description for the palette

Alu4.img = "alu.png"; ///< Image to use for the palette

Alu4.description = "<h2>4-bit ALU</h2><p>Simple example 4-bit ALU</p>\n<p>The operation is determined by the value of the C bus input. Operations \nsupported are:<p>\n<table>\n<tr><th>C</th><th>operation</th></tr>\n<tr><td>0</td><td>O&larr;B</td></tr>\n<tr><td>1</td><td>O&larr;A+B</td></tr>\n<tr><td>2</td><td>O&larr;A-B</td></tr>\n<tr><td>3</td><td>O&larr;A&amp;B</td></tr>\n<tr><td>4</td><td>O&larr;A|B</td></tr>\n<tr><td>5</td><td>O&larr;A&lt;&lt;B (logical)</td></tr>\n<tr><td>6</td><td>O&larr;A&lt;&lt;B (arithmetic)</td></tr>\n</table>\n<p>For the shift operations, negative values for B result in a right shift.<p>\n<p>The CPSR bits are VCZN (N is the lsb).</p>";
Alu4.order = 602;
/**
 * Compute the gate result
 * @param state
 */

Alu4.prototype.compute = function (state) {
  var a = state[0];
  var b = state[1];
  var c = state[2];

  function parse(c) {
    if (c === undefined) {
      return undefined;
    }

    var p = 1;
    var sum = 0;
    c.forEach(function (v) {
      if (v === undefined) {
        return undefined;
      }

      if (v) {
        if (p == 8) {
          sum -= p;
        } else {
          sum += p;
        }
      }

      p *= 2;
    });
    return sum;
  }

  var av = parse(a);
  var bv = parse(b);
  var cv = parse(c); //console.log("av=" + av + " bc=" + bv + " cv=" + cv);

  var ov = bv;
  var carry = false;
  var overflow = false;

  switch (cv) {
    default:
      // mov
      ov = bv;
      break;

    case 1:
      // add
      ov = av + bv;
      var ov1 = (av & 0xf) + (bv & 0xf);
      carry = (ov1 & 16) != 0;
      overflow = ov < -8 || ov > 7;
      break;

    case 2:
      // sub
      ov = av - bv;
      var ov1 = (av & 0xf) + (~bv & 0xf) + 1;
      carry = (ov1 & 16) != 0;
      overflow = ov < -8 || ov > 7;
      break;

    case 3:
      // and
      ov = av & bv;
      break;

    case 4:
      // or
      ov = av | bv;
      break;

    case 5:
      // shift logical
      if (bv < 0) {
        ov = (av & 0xf) >> -bv;
      } else {
        ov = (av & 0xf) << bv;
      }

      break;

    case 6:
      // shift arithmetic
      if (bv < 0) {
        ov = av >> -bv;
      } else {
        ov = av << bv;
      }

      break;
  }

  if (ov === undefined) {
    this.outs[0].set([undefined, undefined, undefined, undefined]);
    this.outs[1].set([undefined, undefined, undefined, undefined]);
  } else {
    var o = [(ov & 1) == 1, (ov & 2) == 2, (ov & 4) == 4, (ov & 8) == 8];
    this.outs[0].set(o); // Order: N, Z, C, V

    this.outs[1].set([o[3], ov == 0, carry, overflow]);
  }
};
/**
 * Clone this component object.
 * @returns {Alu4}
 */


Alu4.prototype.clone = function () {
  var copy = new Alu4();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Alu4.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5; // Left side

  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, this.y - this.shrink / 2);
  context.lineTo(leftX + 20, this.y);
  context.lineTo(leftX, this.y + this.shrink / 2);
  context.lineTo(leftX, botY); // Bottom

  context.lineTo(rightX, botY - this.shrink); // Right side

  context.lineTo(rightX, topY + this.shrink); // Top

  context.lineTo(leftX, topY); // Name

  if (this.naming !== null) {
    context.font = "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x, this.y - 15);
  }

  context.stroke();
  this.drawIO(context, view);
};

Alu4.prototype.properties = function (main) {
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/And.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/And.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "And": () => (/* binding */ And)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");
/* harmony import */ var _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphics/CanvasHelper */ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js");



/**
 * Component: AND gate
 * @constructor
 */

var And = function And() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 64; // Two inputs and one output

  this.addIn(-32, -16, 16);
  this.addIn(-32, 16, 16);
  this.addOut(32, 0, 16);
};
And.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
And.prototype.constructor = And;
And.type = "And"; ///< Name to use in files

And.label = "AND"; ///< Label for the palette

And.desc = "AND gate"; ///< Description for the palette

And.order = 11; ///< Order of presentation in the palette

And.description = "<h2>AND Gate</h2><p>The output of an AND gate is <em>true</em> if both inputs are true.</p>";
And.help = 'and';
/**
 * Compute the gate result
 * @param state
 */

And.prototype.compute = function (state) {
  if (state[0] && state[1]) {
    this.outs[0].set(true);
  } else if (state[0] === false || state[1] === false) {
    this.outs[0].set(false);
  } else {
    this.outs[0].set(undefined);
  }
};
/**
 * Clone this component object: AND gate.
 * @return {And}
 * @instance And
 */


And.prototype.clone = function () {
  var copy = new And();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


And.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  And.path(context, this.x, this.y, this.width, this.height);
  _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_2__.CanvasHelper.fillWith(context); // And.path(context, this.x, this.y, this.width, this.height);

  context.stroke();
  this.drawName(context, -2, 5);
  this.drawIO(context, view);
};
/**
 * Create a path in the basic AND gate shape.
 * @param context
 * @param x
 * @param y
 * @param width
 * @param height
 */


And.path = function (context, x, y, width, height) {
  var leftX = x - width / 2 - 0.5;
  var rightX = x + width / 2 + 0.5;
  var topY = y - height / 2 - 0.5;
  var botY = y + height / 2 + 0.5; // Left side

  context.beginPath();
  context.moveTo(leftX, botY);
  context.lineTo(leftX, topY); // Top

  context.lineTo(rightX - height / 2, topY); // Arc

  context.arc(rightX - height / 2, y, height / 2 + 0.5, -Math.PI / 2, Math.PI / 2); // Bottom

  context.lineTo(leftX, botY);
};
/**
 * Create a PaletteImage object for an And gate
 * This is the base shape without input/outputs
 * so we can use this code for 3-4 inputs and NAND
 */


And.paletteImageBase = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(120, 70);
  var context = paletteImage.context;
  context.lineWidth = 1.5;
  var x = paletteImage.width / 2;
  var y = paletteImage.height / 2;
  var scale = 0.5;
  var width = scale * paletteImage.width;
  var height = scale * paletteImage.height;
  var arc = 26.5;
  var leftX = x - width / 2 - 0.5;
  var rightX = x + width / 2 + 0.5;
  var topY = y - arc + 0.5;
  var botY = y + arc - 0.5;
  this.leftX = leftX - paletteImage.width / 2;
  this.rightX = rightX - paletteImage.width / 2; // Left side

  context.beginPath();
  context.moveTo(leftX, botY);
  context.lineTo(leftX, topY); // Top

  context.lineTo(rightX - arc, topY); // Arc

  context.arc(rightX - arc, y, arc, -Math.PI / 2, Math.PI / 2); // Bottom

  context.lineTo(leftX, botY);
  paletteImage.fillStroke();
  paletteImage.io(this.rightX, 0, 'e');
  return paletteImage;
};
/**
 * Create a PaletteImage object for an And gate
 */


And.paletteImage = function () {
  var paletteImage = And.paletteImageBase();
  paletteImage.io(this.leftX, -16, 'w');
  paletteImage.io(this.leftX, +16, 'w');
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/And3.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/And3.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "And3": () => (/* binding */ And3)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _And__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./And */ "./packages/cirsim/src/Cirsim/Component/And.js");


/**
 * Component: 3-input AND gate

 * @constructor
 */

var And3 = function And3() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 64; // Three inputs and one output

  this.addIn(-32, -16, 16);
  this.addIn(-32, 0, 16);
  this.addIn(-32, 16, 16);
  this.addOut(32, 0, 16);
};
And3.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
And3.prototype.constructor = And3;
And3.type = "And3"; ///< Name to use in files

And3.label = "AND"; ///< Label for the palette

And3.desc = "3-Input AND gate"; ///< Description for the palette

And3.order = 12; ///< Order of presentation in the palette

And3.description = '<h2>AND Gate</h2><p>The output of a three-input AND ' + 'gate is <em>true</em> if all three' + ' inputs are true.</p>';
And3.help = 'and3';
/**
 * Compute the gate result
 * @param state
 */

And3.prototype.compute = function (state) {
  if (state[0] && state[1] && state[2]) {
    this.outs[0].set(true);
  } else if (state[0] === undefined || state[1] === undefined || state[2] === undefined) {
    this.outs[0].set(undefined);
  } else {
    this.outs[0].set(false);
  }
};
/**
 * Clone this component object.
 * @returns {And3}
 */


And3.prototype.clone = function () {
  var copy = new And3();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


And3.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5; // Left side

  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, botY); // Top

  context.moveTo(leftX, topY);
  context.lineTo(rightX - this.height / 2, topY); // Bottom

  context.moveTo(leftX, botY);
  context.lineTo(rightX - this.height / 2, botY);
  context.stroke(); // Arc

  context.beginPath();
  context.arc(rightX - this.height / 2, this.y, this.height / 2 + 0.5, -Math.PI / 2, Math.PI / 2); // Name

  if (this.naming !== null) {
    context.font = "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x - 2, this.y + 5);
  }

  context.stroke();
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for an And gate
 */


And3.paletteImage = function () {
  var paletteImage = _And__WEBPACK_IMPORTED_MODULE_1__.And.paletteImageBase();
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_1__.And.leftX, -16, 'w');
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_1__.And.leftX, 0, 'w');
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_1__.And.leftX, +16, 'w');
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/And4.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/And4.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "And4": () => (/* binding */ And4)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _And__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./And */ "./packages/cirsim/src/Cirsim/Component/And.js");


/**
 * Component: 4-input AND gate
 * @constructor
 */

var And4 = function And4() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 64; // Three inputs and one output

  this.addIn(-32, -24, 16);
  this.addIn(-32, -8, 16);
  this.addIn(-32, 8, 16);
  this.addIn(-32, 24, 16);
  this.addOut(32, 0, 16);
};
And4.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
And4.prototype.constructor = And4;
And4.type = "And4"; ///< Name to use in files

And4.label = "AND"; ///< Label for the palette

And4.desc = "4-Input AND gate"; ///< Description for the palette

And4.order = 13; ///< Order of presentation in the palette

And4.description = '<h2>AND Gate</h2><p>The output of a four-input AND ' + 'gate is <em>true</em> if all four' + ' inputs are true.</p>';
And4.help = 'and4';
/**
 * Compute the gate result
 * @param state
 */

And4.prototype.compute = function (state) {
  if (state[0] && state[1] && state[2] && state[3]) {
    this.outs[0].set(true);
  } else if (state[0] === undefined || state[1] === undefined || state[2] === undefined || state[3] === undefined) {
    this.outs[0].set(undefined);
  } else {
    this.outs[0].set(false);
  }
};
/**
 * Clone this component object.
 * @returns {And4}
 * @memberof And4
 */


And4.prototype.clone = function () {
  var copy = new And4();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


And4.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5; // Left side

  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, botY); // Top

  context.moveTo(leftX, topY);
  context.lineTo(rightX - this.height / 2, topY); // Bottom

  context.moveTo(leftX, botY);
  context.lineTo(rightX - this.height / 2, botY);
  context.stroke(); // Arc

  context.beginPath();
  context.arc(rightX - this.height / 2, this.y, this.height / 2 + 0.5, -Math.PI / 2, Math.PI / 2); // Name

  if (this.naming !== null) {
    context.font = "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x - 2, this.y + 5);
  }

  context.stroke();
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for an And gate
 */


And4.paletteImage = function () {
  var paletteImage = _And__WEBPACK_IMPORTED_MODULE_1__.And.paletteImageBase();
  var y = paletteImage.height / 2;
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_1__.And.leftX, -24, 'w');
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_1__.And.leftX, -8, 'w');
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_1__.And.leftX, +8, 'w');
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_1__.And.leftX, +24, 'w');
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/BusConstant.js":
/*!*************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/BusConstant.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BusConstant": () => (/* binding */ BusConstant)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Value */ "./packages/cirsim/src/Cirsim/Value.js");



/**
 * Component: BusConstant gate
 * A constant bus value component.

 * @constructor
 */

var BusConstant = function BusConstant() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16;
  this.width = 96;
  this.value = new _Value__WEBPACK_IMPORTED_MODULE_2__.Value(); // One output

  this.addOut(48, 0, 16).bus = true;
  this.set([false, false, false, false]);
};
BusConstant.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
BusConstant.prototype.constructor = BusConstant;
BusConstant.prototype.prefix = null;
BusConstant.type = "BusConstant"; ///< Name to use in files

BusConstant.label = "Bus Constant"; ///< Label for the palette

BusConstant.desc = "Bus Constant value"; ///< Description for the palette

BusConstant.img = "busconstant.png"; ///< Image to use for the palette

BusConstant.description = '<h2>Bus Constant Value</h2><p>A Bus Constant is' + ' a value that can be set in the circuit as a fixed value feeding a bus.</p>' + '<p>Values can be preceeded by 0x or 0b for hexadecimal or binary ' + 'values.</p>' + '<p>The display and input format is selectable. Auto format will display values ' + 'with eight or fewer digits as binary and larger values in hex.</p>';
BusConstant.order = 301;
/**
 * Clone this component object.
 * @returns {BusConstant}
 */

BusConstant.prototype.clone = function () {
  var copy = new BusConstant();
  copy.copyFrom(this);
  copy.value = this.value.clone();
  return copy;
};
/**
 * Compute.
 *
 * Force the output to the current set value.
 * Since there are no inputs, state is ignored.
 * @param state
 */


BusConstant.prototype.compute = function (state) {
  this.outs[0].set(this.value.get());
};
/**
 * Draw the component.
 * @param context Display context
 * @param view View object
 */


BusConstant.prototype.draw = function (context, view) {
  // Component background
  this.drawBox(context);
  context.fillStyle = "#dddddd";
  context.fill(); // Select the style to draw the rest

  this.selectStyle(context, view);
  this.drawBox(context);
  this.value.draw(context, this.x, this.y, this.width - this.height / 2, this.naming);
  this.drawIO(context, view);
};
/**
 * Set the value for the input
 * @param value true for on
 */


BusConstant.prototype.set = function (value) {
  this.value.set(value);
  this.outs[0].set(this.value.get());
};

BusConstant.prototype.get = function () {
  return this.value.get();
};

BusConstant.prototype.setAsString = function (value, parseonly) {
  this.value.setAsString(value, parseonly);

  if (!parseonly) {
    this.outs[0].set(this.value.get());
  }
};

BusConstant.prototype.getAsString = function () {
  return this.value.getAsString();
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


BusConstant.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  this.value.save(obj);
  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


BusConstant.prototype.load = function (obj) {
  this.value.load(obj);
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};

BusConstant.prototype.properties = function (main) {
  var that = this;
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  this.value.dialogOptions(dlg, true, function () {
    that.compute(null);
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/BusDecoder.js":
/*!************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/BusDecoder.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BusDecoder": () => (/* binding */ BusDecoder)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");



/**
 * Component: General purpose decoder.
 *
 * Supports bus or single-bit inputs.
 * @constructor
 */

var BusDecoder = function BusDecoder() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 100;
  this.width = 52;
  this.value = null;
  var bus = true;
  Object.defineProperty(this, "bus", {
    get: function get() {
      return bus;
    },
    set: function set(value) {
      if (bus !== value) {
        if (this.ins[0].bus !== value) {
          for (var i = 0; i < this.ins.length; i++) {
            this.ins[i].clear();
          }

          this.ins = [];
        }

        bus = value;
        this.ensureIO();
      }
    }
  });
  this.setSize(3); // Size output and one input

  this.circuitOuts = [];
  this.ensureIO();
};
BusDecoder.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
BusDecoder.prototype.constructor = BusDecoder;
BusDecoder.prototype.prefix = 'U';
BusDecoder.type = "BusDecoder"; ///< Name to use in files

BusDecoder.label = "Decoder"; ///< Label for the palette

BusDecoder.desc = "Configurable Decoder"; ///< Description for the palette

BusDecoder.description = "<h2>Decoder</h2>\n<p>The Decoder component converts a 2 to 4-bit binary value on <strong>In</strong> \nto a true on one of four to sixteen output lines. The number of outputs is determined \nby the bit size and is configurable.</p>";
BusDecoder.order = 400;
BusDecoder.help = 'busdecoder';

BusDecoder.prototype.setSize = function (size) {
  this.size = size;
  this.outputs = 1;

  for (var i = 0; i < size; i++) {
    this.outputs *= 2;
  }

  this.ensureIO();
};
/**
 * Compute the gate result
 * @param state
 */


BusDecoder.prototype.compute = function (state) {
  if (this.bus) {
    if (Array.isArray(state[0])) {
      var c = 0;
      var pow = 1;

      for (var i = 0; i < state[0].length; i++) {
        c += state[0][i] ? pow : 0;
        pow *= 2;
      }

      this.set(c);
    } else {
      this.set(null);
    }
  } else {
    var _c = 0;
    var _pow = 1;
    var undef = false;

    for (var _i = 0; _i < state.length; _i++) {
      if (state[_i] === undefined) {
        undef = true;
        break;
      }

      _c += state[_i] ? _pow : 0;
      _pow *= 2;
    }

    this.set(undef ? null : _c);
  }
};
/**
 * Set the value of this component.
 * @param c Value to set.
 */


BusDecoder.prototype.set = function (c) {
  if (c !== null && c !== undefined) {
    c = c & this.outputs - 1;

    for (var i = 0; i < this.outputs; i++) {
      this.outs[i].set(i == c);
    }
  } else {
    for (var _i2 = 0; _i2 < this.outputs; _i2++) {
      this.outs[_i2].set(undefined);
    }
  }

  this.value = c;
};
/**
 * Clone this component object.
 * @returns {BusDecoder}
 */


BusDecoder.prototype.clone = function () {
  var copy = new BusDecoder();
  copy.bus = this.bus;
  copy.setSize(this.size);
  copy.copyFrom(this);
  return copy;
};
/**
 * Ensure the actual number of inputs matches the
 * defined bus size.
 */


BusDecoder.prototype.ensureIO = function () {
  var spacing = 16;
  var pinLen = 14;
  var i;
  var recompute = false;
  this.height = this.outputs * spacing + 26;

  if (this.height < 80) {
    this.height = 80;
  } //
  // Inputs
  //


  if (this.ins.length > 0) {
    //
    // Test if we switched input types
    // If so, disconnect everything and zero the inputs
    //
    if (this.ins[0].bus !== this.bus) {
      for (i = 0; i < this.ins.length; i++) {
        this.ins[i].clear();
      }

      this.ins = [];
    }
  }

  if (this.bus) {
    if (this.ins.length < 1) {
      this.addIn(-this.width / 2, 0, pinLen, "In").bus = true;
      recompute = true;
    }
  } else {
    var _startY = this.size / 2 * spacing - 8;

    for (i = 0; i < this.size; i++) {
      var pinY = _startY - i * spacing;
      var inp = null;

      if (i < this.ins.length) {
        inp = this.ins[i];
        inp.x = -this.width / 2;
        inp.y = pinY;
        inp.len = pinLen;
      } else {
        // Add any new pins
        inp = this.addIn(-this.width / 2, pinY, pinLen, "I" + i);
        recompute = true;
        inp.orientation = 'w';
      }
    } // Delete pins that have ceased to exist


    if (i < this.ins.length) {
      for (; i < this.ins.length; i++) {
        this.ins[i].clear();
      }

      this.ins.splice(this.size);
    }
  } //
  // Outputs
  //


  var x = this.width / 2;
  var startY = this.outputs / 2 * spacing - 8;

  for (i = 0; i < this.outputs; i++) {
    if (i >= this.outs.length) {
      break;
    }

    this.outs[i].name = "O" + i;
    this.outs[i].x = x;
    this.outs[i].y = startY - i * spacing;
    this.outs[i].len = pinLen;
  } // Add any new pins


  for (; i < this.outputs; i++) {
    this.addOut(x, startY - i * spacing, pinLen, "O" + i);
    recompute = true;
  } // Delete pins that have ceased to exist


  if (i < this.outs.length) {
    for (; i < this.outs.length; i++) {
      this.outs[i].clear();
    }

    this.outs.splice(this.outputs);
  }

  if (recompute) {
    this.set(this.value);
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


BusDecoder.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  this.drawBox(context);
  context.font = "12px Times";
  context.textAlign = "center";
  context.fillText("decoder", this.x, this.y + this.height / 2 - 2);

  if (this.value !== null && this.value >= 0 && this.value < this.outputs) {
    var y = this.outs[this.value].y;
    var rx = this.value >= 10 ? 26 : 19;
    this.jaggedLine(context, leftX + 15, this.y, rightX - rx, this.y + y, 0.5);
  }

  this.drawName(context, 0, -this.height / 2 + 12);
  this.drawIO(context, view);
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


BusDecoder.prototype.load = function (obj) {
  this.bus = obj["bus"] !== false;
  this.setSize(obj["size"]);
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


BusDecoder.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.size = this.size;
  obj.bus = this.bus;
  return obj;
};

BusDecoder.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = "<div class=\"control1 center\"><label for=\"".concat(id, "\">Size (bits): </label>\n<input class=\"number\" type=\"text\" name=\"").concat(id, "\" id=\"").concat(id, "\" value=\"").concat(this.size, "\"></div>");
  html += '<div class="control center"><div class="choosers">';
  var busId = dlg.uniqueId();
  html += "\n<label><input type=\"radio\" name=\"".concat(busId, "\"  ").concat(this.bus ? 'checked' : '', " value=\"1\"> Bus Input</label>\n<label><input type=\"radio\" name=\"").concat(busId, "\" ").concat(!this.bus ? 'checked' : '', " value=\"0\"> Single Bit Inputs</label>");
  html += '</div></div>';
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(id).value);

    if (isNaN(size) || size < 2 || size > 4) {
      return "Size must be an integer from 2 to 4";
    }

    return null;
  }, function () {
    _this.setSize(document.getElementById(id).value);

    _this.bus = document.querySelector("input[name=".concat(busId, "]:checked")).value === '1';
  });
  dlg.open();
};
/**
 * Create a PaletteImage object for a the component
 */


BusDecoder.paletteImage = function () {
  var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_2__.PaletteImage(60, 44);
  pi.box(20, 42);
  pi.io(10, -17.5, 'e', 8, 5);
  pi.io(-10, 0, 'w');
  pi.drawText("Decoder", 0, 20, "4px Times");
  return pi;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/BusMultiplexer.js":
/*!****************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/BusMultiplexer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BusMultiplexer": () => (/* binding */ BusMultiplexer)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: n-to-1 Multiplexer
 *
 * Works for both busses and single-bit inputs.
 * @constructor
 */

var BusMultiplexer = function BusMultiplexer() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 80;
  this.width = 32; // Number of inputs

  this.size = 2;
  this.lastIn = null;
  this.bus = true; // Size inputs and one output

  this.circuitIns = [];
  this.addOut(this.width / 2, 0, 8, "O").bus = true;
  var inp = this.addIn(0, -this.height / 2 + 10, 13, "");
  inp.orientation = "n";
  this.ensureIO();
};
BusMultiplexer.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
BusMultiplexer.prototype.constructor = BusMultiplexer;
BusMultiplexer.prototype.prefix = null;
BusMultiplexer.prototype.indent = 10;
BusMultiplexer.type = "Multiplexer"; ///< Name to use in files

BusMultiplexer.label = "Multiplexer"; ///< Label for the palette

BusMultiplexer.desc = "Multiplexer"; ///< Description for the palette

BusMultiplexer.img = "multiplexer.png"; ///< Image to use for the palette

BusMultiplexer.description = "<h2>Multiplexer</h2><p>Multiplexes 2 to 16 inputs to a single output. The \ninputs and outputs and can be configured as buses or single bits.</p>\n<p>The value of the input pin or bus determines which input is routed to O. The input will be a single\nbit if there are two choices (binary) or a bus if there are more than 2 choices. </p>";
BusMultiplexer.order = 402;
BusMultiplexer.help = 'multiplexer';
/**
 * Compute the gate result
 * @param state
 */

BusMultiplexer.prototype.compute = function (state) {
  // Which input?
  var in0 = state[0];

  if (in0 === undefined) {
    this.outs[0].set(undefined);
    this.lastIn = null;
    return;
  }

  if (Array.isArray(in0)) {
    var in0a = 0;
    var in0p = 1;
    in0.forEach(function (i) {
      if (i) {
        in0a += in0p;
      }

      in0p *= 2;
    });
    in0 = in0a;
  } else {
    in0 = in0 ? 1 : 0;
  }

  if (in0 <= state.length) {
    this.outs[0].set(state[in0 + 1]);
    this.lastIn = in0;
  } else {
    this.outs[0].set(undefined);
    this.lastIn = null;
  }
};
/**
 * Clone this component object.
 * @returns {BusMultiplexer}
 */


BusMultiplexer.prototype.clone = function () {
  var copy = new BusMultiplexer();
  copy.size = this.size;
  copy.bus = this.bus;
  copy.ensureIO();
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


BusMultiplexer.prototype.load = function (obj) {
  this.size = obj["size"];
  this.bus = obj["bus"] !== false;
  this.ensureIO();
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


BusMultiplexer.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.size = this.size;
  obj.bus = this.bus;
  return obj;
};
/**
 * Ensure the actual number of inputs matches the
 * defined bus size.
 */


BusMultiplexer.prototype.ensureIO = function () {
  if (this.bus !== this.outs[0].bus) {
    this.outs[0].clear();
    this.outs[0].bus = this.bus; // Clear the inputs after the first one (selector)

    for (i = 1; i < this.ins.length; i++) {
      this.ins[i].clear();
    }

    this.ins.splice(1, this.ins.length - 1);
  }

  var spacing = 16;
  this.height = this.size * spacing + 16;

  if (this.height < 48) {
    this.height = 48;
  }

  var x = this.width / 2;
  var in0 = this.ins[0];
  in0.x = 0;
  in0.y = -this.height / 2 + this.indent / 2;
  in0.bus = this.size > 2;
  var startY = this.size / 2 * spacing - 8;

  for (var i = 0; i < this.size; i++) {
    if (i >= this.ins.length - 1) {
      break;
    }

    var ins = this.ins[i + 1];
    ins.name = "I" + i;
    ins.x = -x;
    ins.y = startY - i * spacing;
    ins.len = 8;
  } // Add any new pins


  for (; i < this.size; i++) {
    this.addIn(-x, startY - i * spacing, 8, "I" + i).bus = this.bus;
  } // Delete pins that have ceased to exist


  i++;

  if (i < this.ins.length) {
    for (; i < this.ins.length; i++) {
      this.ins[i].clear();
    }

    this.ins.splice(this.size + 1);
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


BusMultiplexer.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawTrap(context, 0, this.indent);

  if (this.lastIn !== null) {
    var spacing = 16;
    var x1 = this.x - 4;
    var x2 = this.x + 4;
    var y2 = this.y - 1;
    var startY = this.y + this.size / 2 * spacing - 10;
    var y1 = startY - this.lastIn * 16;
    this.jaggedLine(context, x1, y1, x2, y2, 0.5);
  }

  this.drawIO(context, view);
};

BusMultiplexer.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = "<div class=\"control1 center gap\"><label for=\"".concat(id, "\">Number of inputs: </label>\n<input class=\"number\" type=\"text\" name=\"").concat(id, "\" id=\"").concat(id, "\" value=\"").concat(this.size, "\"></div>");
  html += '<div class="control center"><div class="choosers">';
  var busId = dlg.uniqueId();
  html += "\n<label><input type=\"radio\" name=\"".concat(busId, "\"  ").concat(this.bus ? 'checked' : '', " value=\"1\"> Bus</label>\n<label><input type=\"radio\" name=\"").concat(busId, "\" ").concat(!this.bus ? 'checked' : '', " value=\"0\"> Single Bit</label>");
  html += '</div></div>';
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(id).value);

    if (isNaN(size) || size < 2 || size > 16) {
      document.getElementById(id).select();
      return "Must be an integer from 2 to 16";
    }

    return null;
  }, function () {
    _this.size = parseInt(document.getElementById(id).value);
    _this.bus = document.querySelector("input[name=".concat(busId, "]:checked")).value === '1';

    _this.ensureIO();
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/BusOr.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/BusOr.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BusOr": () => (/* binding */ BusOr)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: Bus OR gate

 * @constructor
 */

var BusOr = function BusOr() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 80;
  this.size = 4;
  this.addOut(this.width / 2, 0, 16).bus = true;
  this.ensureIO();
};
BusOr.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
BusOr.prototype.constructor = BusOr;
BusOr.type = "BusOr"; ///< Name to use in files

BusOr.label = "Bus OR"; ///< Label for the palette

BusOr.desc = "Bus OR gate"; ///< Description for the palette

BusOr.img = "busor.png"; ///< Image to use for the palette

BusOr.description = "<h2>Bus OR Gate</h2><p>The output of an OR gate is <em>true</em> \nif either or both  inputs are true. Otherwise, it is false. This version works for \nbuses. The size determines the number of inputs.</p>";
BusOr.order = 308;
/**
 * Compute the gate result
 * @param state
 */

BusOr.prototype.compute = function (state) {
  var result = [];
  state.forEach(function (s) {
    if (Array.isArray(s)) {
      for (var i = 0; i < s.length; i++) {
        var v = s[i];

        if (result.length > i) {
          if (v === true) {
            result[i] = true;
          }
        } else {
          result.push(v);
        }
      }
    }
  });
  this.outs[0].set(result);
};
/**
 * Clone this component object.
 * @returns {BusOr}
 */


BusOr.prototype.clone = function () {
  var copy = new BusOr();
  copy.size = this.size;
  copy.ensureIO();
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


BusOr.prototype.load = function (obj) {
  this.size = obj["size"];
  this.ensureIO();
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


BusOr.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.size = this.size;
  return obj;
};
/**
 * Ensure the actual number of inputs matches the
 * defined bus size.
 */


BusOr.prototype.ensureIO = function () {
  var spacing = 16;
  this.height = this.size * spacing + 8;

  if (this.height < 50) {
    this.height = 50;
  }

  var startY = this.size / 2 * spacing - 8;

  for (var i = 0; i < this.size; i++) {
    //
    // This math computes the location of the pins
    // relative to the arc on the left side of the OR gate
    //
    var offset = this.size * 30;
    var a = Math.atan2(this.height / 2, offset);
    var r = offset / Math.cos(a);
    var pinY = startY - i * spacing;
    var pinX = Math.sqrt(r * r - pinY * pinY) - offset;

    if (i < this.ins.length) {
      this.ins[i].x = -this.width / 2 + pinX;
      this.ins[i].y = pinY;
      this.ins[i].len = 16 + pinX;
      this.ins[i].bus = true;
    } else {
      // Add any new pins
      this.addIn(-this.width / 2 + pinX, startY - i * spacing, 16 + pinX).bus = true;
    }
  }

  for (; i < this.size; i++) {} // Delete pins that have ceased to exist


  if (i < this.ins.length) {
    for (; i < this.ins.length; i++) {
      this.ins[i].clear();
    }

    this.ins.splice(this.size);
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


BusOr.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var h = this.height;
  var w = this.width;
  var leftX = this.x - w / 2 - 0.5;
  var rightX = this.x + w / 2 + 0.5;
  var topY = this.y - h / 2 - 0.5;
  var botY = this.y + h / 2 + 0.5;
  context.beginPath(); // Left side

  var offsetX = this.size * 30;
  var a = Math.atan2(h / 2, offsetX);
  var r = offsetX / Math.cos(a);
  context.arc(leftX - offsetX, this.y, r, -a, a); // Top

  var offsetY = (w / 2 * (w / 2) - h / 2 * (h / 2)) / h;
  r = h / 2 + offsetY;
  a = Math.atan2(offsetY, w / 2);
  context.moveTo(leftX, topY);
  context.lineTo(this.x - this.width / 4, topY);
  context.bezierCurveTo(this.x + this.width / 4, topY, this.x + 3 * this.width / 8, this.y - this.height / 4, this.x + this.width / 2, this.y);
  context.moveTo(leftX, botY);
  context.lineTo(this.x - this.width / 4, botY);
  context.bezierCurveTo(this.x + this.width / 4, botY, this.x + 3 * this.width / 8, this.y + this.height / 4, this.x + this.width / 2, this.y);
  context.stroke();
  this.drawName(context, -2, 5);
  this.drawIO(context, view);
};

BusOr.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = "<div class=\"control1 center\"><label for=\"".concat(id, "\">Size: </label>\n<input class=\"number\" type=\"text\" name=\"").concat(id, "\" id=\"").concat(id, "\" value=\"").concat(this.size, "\"></div>");
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(id).value);

    if (isNaN(size) || size < 2 || size > 16) {
      return "Size must be an integer from 2 to 16";
    }

    return null;
  }, function () {
    _this.size = parseInt(document.getElementById(id).value);

    _this.ensureIO();
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/BusSelector.js":
/*!*************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/BusSelector.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BusSelector": () => (/* binding */ BusSelector)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: BusSelector
 * A Bus Selector chooses some range of signals from an input
 * bus to output as a subset bus.

 * @constructor
 */

var BusSelector = function BusSelector() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16;
  this.width = 96;
  this.from = 0; // Low order bit to select

  this.to = 1; // High order bit to select
  // One input

  this.addIn(-48, 0, 16).bus = true; // One output

  this.addOut(48, 0, 16).bus = true;
};
BusSelector.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
BusSelector.prototype.constructor = BusSelector;
BusSelector.prototype.prefix = null;
BusSelector.type = "BusSelector"; ///< Name to use in files

BusSelector.label = "Bus Selector"; ///< Label for the palette

BusSelector.desc = "Bus Subset Selector"; ///< Description for the palette

BusSelector.img = "busselector.png"; ///< Image to use for the palette

BusSelector.description = "<h2>Bus Selector</h2><p>A Bus Selector chooses some \nrange of bits from an input bus and feeds them to an output bus. This is a  tool \nto use to select fields from a bus.</p>\n<p>If configured as 4 to 8 (8:4 on the symbol), bits 4-8 becomes bits 0-4 on\nthe output bus. The output is a bus if more than one bit is selected and is a bit \nif only one bit is selected.</p>";
BusSelector.order = 310;
BusSelector.help = 'busselector';
/**
 * Clone this component object.
 * @returns {BusSelector}
 */

BusSelector.prototype.clone = function () {
  var copy = new BusSelector();
  copy.copyFrom(this);
  copy.from = this.from;
  copy.to = this.to;
  return copy;
};
/**
 * Compute.
 *
 * Force the output to the current set value.
 * Since there are no inputs, state is ignored.
 * @param state
 */


BusSelector.prototype.compute = function (state) {
  // Test for the state undefined
  if (state[0] === undefined) {
    this.outs[0].set(undefined);
    return;
  }

  if (this.from == this.to) {
    // Single-bit output
    this.outs[0].set(state[0][this.from]);
  } else {
    // Bus output
    var value = [];

    for (var i = this.from; i <= this.to; i++) {
      value.push(state[0][i]);
    }

    this.outs[0].set(value);
  }
};
/**
 * Draw the component.
 * @param context Display context
 * @param view View object
 */


BusSelector.prototype.draw = function (context, view) {
  // Component background
  this.outlinePath(context);
  context.fillStyle = "#dddddd";
  context.fill(); // Select the style to draw the rest

  this.selectStyle(context, view); // Box for the component

  this.outlinePath(context);
  context.stroke();
  context.font = "14px Times";
  context.textAlign = "center";
  context.fillText("" + this.to + ":" + this.from, this.x, this.y + 5);
  this.drawIO(context, view);
};

BusSelector.prototype.outlinePath = function (context) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.moveTo(leftX + this.height / 2, topY);
  context.lineTo(leftX, this.y);
  context.lineTo(leftX + this.height / 2, botY);
  context.lineTo(rightX - this.height / 2, botY);
  context.lineTo(rightX, this.y);
  context.lineTo(rightX - this.height / 2, topY);
  context.lineTo(leftX + this.height / 2, topY);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


BusSelector.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.from = this.from;
  obj.to = this.to;
  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


BusSelector.prototype.load = function (obj) {
  this.from = obj['from'];
  this.to = obj['to'];
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
  this.ensureIO();
};

BusSelector.prototype.ensureIO = function () {
  this.outs[0].bus = this.from != this.to;
};

BusSelector.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var fmId = dlg.uniqueId();
  var toId = dlg.uniqueId();
  var html = "<div class=\"control1 center gap\">\n<input class=\"number\" type=\"text\" name=\"".concat(fmId, "\" id=\"").concat(fmId, "\" value=\"").concat(this.from, "\" spellcheck=\"false\" onfocus=\"this.select()\"> \n<label for=\"").concat(toId, "\">to </label>\n<input class=\"number\" type=\"text\" name=\"").concat(toId, "\" id=\"").concat(toId, "\" value=\"").concat(this.to, "\" spellcheck=\"false\" onfocus=\"this.select()\"></div>");
  dlg.extra(html, function () {
    var fromStr = document.getElementById(fmId).value;
    var toStr = document.getElementById(toId).value;
    var from = parseInt(fromStr);
    var to = parseInt(toStr);

    if (isNaN(from) || from < 0 || from > 32) {
      document.getElementById(fmId).select();
      return "Invalid from value";
    }

    if (isNaN(to) || to < 0 || to > 32) {
      document.getElementById(toId).select();
      return "Invalid to value";
    }

    if (from > to) {
      document.getElementById(fmId).select();
      return "Invalid values, <em>from</em> must be less than or equal to <em>to</em>.";
    }

    return null;
  }, function () {
    var fromstr = document.getElementById(fmId).value;
    var tostr = document.getElementById(toId).value;
    _this.from = parseInt(fromstr);
    _this.to = parseInt(tostr);

    _this.ensureIO();

    _this.pending();
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Button.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Button.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_Screw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/Screw */ "./packages/cirsim/src/Cirsim/Graphics/Screw.js");
/* harmony import */ var _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Vector */ "./packages/cirsim/src/Cirsim/Utility/Vector.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");




/**
 * Component: Button than can be pressed by the user

 * @constructor
 */

var Button = function Button() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this); // Size

  this.height = 50;
  this.width = 50;
  this.buttonSize = 40;
  this.value = false;
  this.color = 'blue'; // One output

  this.addOut(this.width / 2, 0, 48 - this.width / 2);
  this.set(false);
};
Button.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Button.prototype.constructor = Button;
Button.prototype.prefix = "B";
Button.type = "Button"; ///< Name to use in files

Button.label = "Button"; ///< Label for the palette

Button.desc = "Push Button"; ///< Description for the palette

Button.img = "button.png"; ///< Image to use for the palette

Button.order = 100; ///< Order of presentation in the palette

Button.description = '<h2>Push Button</h2><p>Clicking the button turns on' + ' the output (true), while releasing turns it off.</p>';
/**
 * Clone this component object.
 * @returns {Button}
 */

Button.prototype.clone = function () {
  var copy = new Button();
  copy.value = this.value;
  copy.color = this.color;
  copy.copyFrom(this);
  return copy;
};

Button.prototype.compute = function (state) {
  this.outs[0].set(this.value);
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Button.prototype.load = function (obj) {
  this.color = obj["color"] !== undefined ? obj["color"] : 'blue';
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


Button.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.color = this.color;
  return obj;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Button.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var topY = this.y - this.height / 2 + 0.5;
  var saveFillStyle = context.fillStyle;
  var saveStrokeStyle = context.strokeStyle; //
  // Button background
  //

  context.fillStyle = "#cccccc";
  context.fillRect(leftX, topY, this.width, this.height); // Border

  context.fillStyle = saveFillStyle;
  context.beginPath();
  context.rect(leftX, topY, this.width, this.height);
  context.stroke();

  switch (this.color) {
    case 'blue':
    default:
      var color = ["#25ffff", "#15ddff", "#00d5d4"];
      break;

    case 'green':
      var color = ["#25ff25", "#15ff00", "#00d500"];
      break;
  } // The button


  var r = 16;

  if (this.value) {
    var grd = context.createRadialGradient(this.x, this.y, 1, this.x, this.y, r);
    grd.addColorStop(0, color[0]);
    grd.addColorStop(0.5, color[1]);
    grd.addColorStop(1, color[2]);
    context.fillStyle = grd;
  } else {
    context.fillStyle = "#888888";
  }

  context.beginPath();
  context.arc(this.x, this.y, r, 0, Math.PI * 2);
  context.fill(); //
  // Button Border
  //

  context.strokeStyle = "#000000";
  context.beginPath();
  context.arc(this.x, this.y, 17, 0, Math.PI * 2);
  context.lineWidth = 4;
  context.stroke(); //
  // Restore
  //

  context.lineWidth = 1;
  context.fillStyle = saveFillStyle;
  context.strokeStyle = saveStrokeStyle; // Screws

  var s = 18;
  _Graphics_Screw__WEBPACK_IMPORTED_MODULE_1__.Screw.draw(context, this.x - s, this.y - s, 3, 0.3);
  _Graphics_Screw__WEBPACK_IMPORTED_MODULE_1__.Screw.draw(context, this.x - s, this.y + s, 3, 1.3);
  _Graphics_Screw__WEBPACK_IMPORTED_MODULE_1__.Screw.draw(context, this.x + s, this.y - s, 3, 2.3);
  _Graphics_Screw__WEBPACK_IMPORTED_MODULE_1__.Screw.draw(context, this.x + s, this.y + s, 3, 0.7);
  this.drawIO(context, view);
};

Button.prototype.touch = function (x, y) {
  if (_Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.distance(new _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(x, y), new _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(this.x, this.y)) < 16) {
    this.set(true);
    return null;
  }

  return _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.touch.call(this, x, y);
};

Button.prototype.mouseUp = function () {
  this.set(false);
};
/**
 * Set the value for the input
 * @param value true for on
 */


Button.prototype.set = function (value) {
  this.value = value;
  this.outs[0].set(value);
};

Button.prototype.setAsString = function (value) {
  var v = +value === 1;
  this.set(v);
};

Button.prototype.get = function () {
  return this.value;
};

Button.prototype.properties = function (main) {
  var _this = this;

  var that = this;
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_3__.ComponentPropertiesDlg(this, main, false);
  var id = dlg.uniqueId();
  var colors = ['green', 'blue'];
  var html = '<div class="control1 center"><label for="' + id + '">Color: </label><select id="' + id + '">';
  colors.forEach(function (color) {
    if (color === that.color) {
      html += '<option selected>' + color + '</option>';
    } else {
      html += '<option>' + color + '</option>';
    }
  });
  html += '</select></div>';
  dlg.extra(html, function () {
    return null;
  }, function () {
    _this.color = document.getElementById(id).value;
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/CircuitRef.js":
/*!************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/CircuitRef.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CircuitRef": () => (/* binding */ CircuitRef)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/CanvasHelper */ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/**
 * Component: Circuit Reference

 * @constructor
 */

var CircuitRef = function CircuitRef(paletteItem) {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 160;
  this.width = 80; // Name of the circuit this refers to (tab)

  this.circuitName = paletteItem !== undefined ? paletteItem.circuit : undefined;
  this.circuitRef = null;
  this.circuitIns = [];
  this.circuitOuts = [];
};
CircuitRef.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
CircuitRef.prototype.constructor = CircuitRef;
CircuitRef.type = "CircuitRef"; ///< Name to use in files

CircuitRef.label = "REF"; ///< Label for the palette

CircuitRef.desc = "Circuit Component"; ///< Description for the palette

CircuitRef.img = "circuitref.png"; ///< Image to use for the palette

CircuitRef.order = 99; ///< Order of presentation in the palette

CircuitRef.description = '<h2>Circuit Component</h2><p>A Circuit Component uses another' + 'Cirsim circuit as a component in the current circuit</p>';
/**
 * Compute the gate result
 * @param state
 */

CircuitRef.prototype.compute = function (state) {
  this.getCircuitRef();

  for (var i = 0; i < this.ins.length && i < this.circuitIns.length; i++) {
    this.circuitIns[i].set(state[i]);
  }

  for (var _i = 0; _i < this.outs.length && _i < this.circuitOuts.length; _i++) {
    this.outs[_i].set(this.circuitOuts[_i].get());
  }
};
/**
 * Advance the animation for this component by delta seconds
 * @param delta Time to advance in seconds
 * @returns {boolean} true if animation needs to be redrawn
 */


CircuitRef.prototype.advance = function (delta) {
  if (this.circuitRef !== null) {
    this.circuitRef.advance(delta);
  }

  for (var i = 0; i < this.outs.length && i < this.circuitOuts.length; i++) {
    this.outs[i].set(this.circuitOuts[i].get());
  }

  return true;
};

CircuitRef.prototype.getCircuitRef = function () {
  if (this.circuitRef !== null) {
    this.circuitRef.circuits = this.circuit.circuits;
    return this.circuitRef;
  }

  var circuit = this.circuit.circuits.getCircuit(this.circuitName);

  if (circuit === null) {
    return null;
  }

  this.circuitRef = this.circuit.circuits.getCircuit(this.circuitName).copy_clone();
  this.circuitRef.circuits = this.circuit.circuits; // Since a copy_clone will copy any ComponentRef objects in the
  // copy circuit, we need to clear it so a fresh copy will be
  // make instead.

  this.circuitRef.newTab();
  this.circuitRef.pending();
  this.ensureIO();
  return this.circuitRef;
};
/**
 * Called whenever a new tab is selected.
 *
 * This ensures the reference is rebuilt if a referenced tab
 * is modified or reloaded with a fresh circuit.
 */


CircuitRef.prototype.newTab = function () {
  this.circuitRef = null;
  this.circuitIns = [];
  this.circuitOuts = [];
};
/**
 * Update component after a circuit change.
 * This ensures all references are always correct.
 */


CircuitRef.prototype.update = function () {
  this.circuitRef = null;
  this.circuitIns = [];
  this.circuitOuts = [];
  this.ensureIO();
};

CircuitRef.prototype.ensureIO = function () {
  var circuit = this.circuitRef;

  if (circuit !== null) {
    // Find all of the pins (in or out) for a circuit
    var findAllPins = function findAllPins(regPin, busPin) {
      // Find all input pins in the tab circuit
      var ins = circuit.getComponentsByType(regPin);
      var insb = circuit.getComponentsByType(busPin);

      var _iterator = _createForOfIteratorHelper(insb),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pin = _step.value;
          ins.push(pin);
        } // Sort the order so they are in the order they appear

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      ins.sort(function (a, b) {
        if (a.y === b.y) {
          return a.x - b.x;
        }

        return a.y - b.y;
      });
      return ins;
    }; // Collect an array of pins by the component ID.


    var collectById = function collectById(pins) {
      var pinsById = {};

      var _iterator2 = _createForOfIteratorHelper(pins),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var pin = _step2.value;
          pinsById[pin.id] = pin;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return pinsById;
    }; //
    // Collect inputs
    //
    // Find all input pins in the tab circuit


    var ins = findAllPins('InPin', 'InPinBus'); // Collect inputs by their ID

    var insById = collectById(ins); //
    // If this is the first time this circuit
    // has been used, force all inputs to undefined
    // to ensure they get set from this circuit
    //

    if (this.circuitIns.length === 0) {
      for (var _i2 = 0; _i2 < ins.length; _i2++) {
        ins[_i2].set(undefined);
      }
    }

    this.circuitIns = ins; //
    // Collect outputs
    //
    // Find output pins in the tab circuit

    var outs = findAllPins('OutPin', 'OutPinBus'); // Collect outputs by their ID

    var outsById = collectById(outs);
    this.circuitOuts = outs; //
    // Determine if the settings are already correct.
    //

    if (ins.length === this.ins.length && outs.length === this.outs.length) {
      var bad = false; // Check the inputs

      for (var _i3 = 0; _i3 < ins.length; _i3++) {
        if (this.ins[_i3].name !== ins[_i3].naming || this.ins[_i3].bus !== (ins[_i3].constructor.type === 'InPinBus')) {
          bad = true;
          break;
        }
      } // Check the outputs


      for (var _i4 = 0; _i4 < outs.length; _i4++) {
        if (this.outs[_i4].name !== outs[_i4].naming || this.outs[_i4].bus !== (outs[_i4].constructor.type === 'OutPinBus')) {
          bad = true;
          break;
        }
      } // If it ain't broke, don't fix it.


      if (!bad) {
        return;
      }
    } //
    // Determine the size we need to draw the component
    //


    var maxIO = ins.length > outs.length ? ins.length : outs.length;
    this.height = maxIO * 16 + 32;

    if (this.height < 48) {
      this.height = 48;
    }

    var x = this.width / 2;
    var startY = -this.height / 2 + 8;

    var saveExistingPins = function saveExistingPins(currentPins, pinsById) {
      var savedPins = {};

      var _iterator3 = _createForOfIteratorHelper(currentPins),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var pin = _step3.value;

          if (pin.reference !== null && pinsById[pin.reference] !== undefined) {
            savedPins[pinsById[pin.reference].naming] = pin;
          } else {
            savedPins[pin.name] = pin;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return savedPins;
    }; //
    // Fix inputs
    //
    // Save off the existing inputs by name, then
    // clear the inputs so we can add them back in


    var savedInputs = saveExistingPins(this.ins, insById);
    this.ins = [];
    var i = 0;

    for (i = 0; i < ins.length; i++) {
      var inp = void 0;

      if (savedInputs[ins[i].naming] !== undefined) {
        inp = savedInputs[ins[i].naming];
        this.ins.push(inp);
        inp.name = ins[i].naming;
        inp.x = -x;
        inp.y = startY + i * 16;
        inp.len = 16;
        savedInputs[ins[i].naming] = null;
      } else {
        inp = this.addIn(-x, startY + i * 16, 16, ins[i].naming);
      }

      inp.bus = ins[i].constructor.type === 'InPinBus';
      inp.index = i;
      inp.reference = ins[i].id;
    }

    for (var name in savedInputs) {
      if (savedInputs[name] !== null) {
        // We have an input that has been deleted!
        // console.log(savedInputs[name]);
        savedInputs[name].clear();
      }
    } //
    // Fix outputs
    //
    // Save off existing outputs by name, then
    // clear the outputs so we can add them back in


    var savedOutputs = saveExistingPins(this.outs, outsById);
    this.outs = [];

    for (i = 0; i < outs.length; i++) {
      var out = void 0;

      if (savedOutputs[outs[i].naming] !== undefined) {
        out = savedOutputs[outs[i].naming];
        this.outs.push(out);
        out.name = outs[i].naming;
        out.x = x;
        out.y = startY + i * 16;
        out.len = 16;
        savedOutputs[outs[i].naming] = null;
      } else {
        out = this.addOut(x, startY + i * 16, 16, outs[i].naming);
      }

      out.index = i;
      out.bus = outs[i].constructor.type === 'OutPinBus';
      out.reference = outs[i].id;
    }

    for (var _name in savedOutputs) {
      if (savedOutputs[_name] !== null) {
        // We have an output that has been deleted!
        savedOutputs[_name].clear();
      }
    }
  }
};
/**
 * Clone this component object.
 * @returns {CircuitRef}
 */


CircuitRef.prototype.clone = function () {
  var copy = new CircuitRef();
  copy.circuitName = this.circuitName;

  for (var i = 0; i < this.ins.length; i++) {
    var clone = this.ins[i].clone();
    clone.component = copy;
    copy.ins.push(clone);
  }

  for (var _i5 = 0; _i5 < this.outs.length; _i5++) {
    var _clone = this.outs[_i5].clone();

    _clone.component = copy;
    copy.outs.push(_clone);
  }

  if (this.circuitRef !== null) {
    copy.circuitRef = this.circuitRef.copy_clone();
    copy.ensureIO();
  }

  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


CircuitRef.prototype.load = function (obj) {
  this.circuitName = obj["circuitName"];
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
  this.getCircuitRef();
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


CircuitRef.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.circuitName = this.circuitName;
  return obj;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


CircuitRef.prototype.draw = function (context, view) {
  this.getCircuitRef();
  this.ensureIO();
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.rect(leftX, topY, this.width, this.height);
  _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__.CanvasHelper.fillWith(context);
  context.stroke(); // Name

  context.font = "14px Times";
  context.textAlign = "center";

  if (this.naming !== null) {
    context.fillText(this.naming, this.x, this.y - 10);
  }

  context.fillText(this.circuitName, this.x, this.y + this.height / 2 - 5);
  context.stroke();
  this.drawIO(context, view);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Clock.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Clock.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Clock": () => (/* binding */ Clock)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: Clock generator
 * @param name The name to assign to the component
 * @constructor
 */

var Clock = function Clock() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 44;
  this.width = 44;
  this.freq = 1000000;
  this.period = 0.5;
  this.addOut(22, 0, 10);
  this.set(true);
  this.remaining = 1 / this.freq * this.period;
};
Clock.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Clock.prototype.constructor = Clock;
Clock.prototype.prefix = "C";
Clock.type = "Clock"; ///< Name to use in files

Clock.label = "Clock"; ///< Label for the palette

Clock.desc = "Clock"; ///< Description for the palette

Clock.img = "clock.png"; ///< Image to use for the palette

Clock.order = 104; ///< Order of presentation in the palette

Clock.description = '<h2>Clock</h2><p>A clock generates a sequence of pulses' + ' over time. The duty cycle is the width of the true period of the pulse as a percentage.</p>';
/**
 * Clone this component object.
 * @returns {Clock}
 */

Clock.prototype.clone = function () {
  var copy = new Clock();
  copy.freq = this.freq;
  copy.period = this.period;
  copy.value = this.value;
  copy.remaining = this.remaining;
  copy.copyFrom(this);
  return copy;
};
/**
 * Advance the animation for this component by delta seconds
 * @param delta Time to advance in seconds
 * @returns true if animation needs to be redrawn
 */


Clock.prototype.advance = function (delta) {
  this.remaining -= delta;

  if (this.remaining <= 0) {
    this.set(!this.value);
    this.remaining = 1 / this.freq * (this.value ? this.period : 1 - this.period);
    return true;
  } else {
    return false;
  }
};
/**
 * Set the value for the input
 * @param value true for on
 */


Clock.prototype.set = function (value) {
  this.value = value;
  this.outs[0].set(value);
};

Clock.prototype.get = function () {
  return this.value;
};
/**
 * Compute the gate result
 * @param state
 */


Clock.prototype.compute = function (state) {
  this.set(false);
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Clock.prototype.load = function (obj) {
  this.freq = obj["freq"];
  this.period = obj["period"];
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


Clock.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.freq = this.freq;
  obj.period = this.period;
  return obj;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Clock.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var x = this.x;
  var y = this.y;
  context.beginPath();
  context.arc(x, y, this.width / 2, 0, Math.PI * 2);
  context.fillStyle = '#ffffff';
  context.fill();
  context.beginPath();
  context.arc(x, y, this.width / 2, 0, Math.PI * 2);
  context.stroke(); // Waveform

  var leftX = this.x - 15.5;
  var rightX = this.x + 15.5;
  var topY = this.y - 10.4;
  var botY = this.y + 10.5;
  var midX = leftX + this.period * (rightX - leftX);
  var save = context.strokeStyle;
  context.strokeStyle = "#00aa00";
  context.beginPath();
  context.moveTo(leftX, botY);
  context.lineTo(leftX, topY);
  context.lineTo(midX, topY);
  context.lineTo(midX, botY);
  context.lineTo(rightX, botY); // Name

  if (this.naming !== null) {
    context.font = "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x - 2, this.y + 5);
  }

  context.stroke();
  context.strokeStyle = save;
  this.drawIO(context, view);
};

Clock.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var freqId = dlg.uniqueId();
  var sliderId = dlg.uniqueId();
  var html = "<div class=\"control\"><label for=\"".concat(freqId, "\">Frequency (Hz)</label>\n<input type=\"text\" id=\"").concat(freqId, "\" value=\"").concat(this.freq, "\"></div>\n<div class=\"control slider\"><label for=\"").concat(sliderId, "\">Duty Cycle</label>\n<input type=\"range\" min=\"100\" max=\"900\" class=\"\" value=\"").concat(this.period * 1000, "\" id=\"").concat(sliderId, "\">\n</div>");
  dlg.extra(html, function () {
    var freq = document.getElementById(freqId).value;

    if (+freq !== parseInt(freq)) {
      return "Frequency must be integer 1 to 1000000";
    }

    if (freq < 1 || freq > 10000000) {
      return "Frequency must be integer 1 to 1000000";
    }

    return null;
  }, function () {
    _this.freq = document.getElementById(freqId).value;
    _this.period = document.getElementById(sliderId).value * 0.001;
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Counter.js":
/*!*********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Counter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Counter": () => (/* binding */ Counter)
/* harmony export */ });
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");




/**
 * Component: Simple arbitrary bit size counter.
 */

var Counter = function Counter() {
  _Component__WEBPACK_IMPORTED_MODULE_1__.Component.call(this);
  this.height = 98;
  this.width = 48;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.value = 0;
  this.size = 16;
  this.lastClk = false;
  var clk = this.addIn(0, -h2, 8);
  clk.orientation = 'n';
  clk.clock = true;
  this.addIn(-w2, -24, 8, "UP");
  var res = this.addIn(0, h2, 8, "R");
  res.orientation = 's';
  this.addOut(w2, -24, 8, "C").bus = true;
  this.set(0);
};
Counter.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_1__.Component.prototype);
Counter.prototype.constructor = Counter;
Counter.prototype.prefix = "C";
Counter.type = "Counter"; ///< Name to use in files

Counter.label = "Counter"; ///< Label for the palette

Counter.desc = "Simple Counter"; ///< Description for the palette

Counter.description = "<h2>Simple Counter</h2><p>Supports up and down counting for \narbitrary bit sizes. C is the count output. The optional UP input controls the counting\ndirection. True means up counting. If not connected, the counter counts up. R is an \nasynchronous reset. The counter increments or decrements on the clock leading edge.</p>";
Counter.order = 406;
Counter.help = 'Counter';
/**
 * Compute the gate result
 * @param state
 */

Counter.prototype.compute = function (state) {
  if (state[2]) {
    // Reset!
    this.set(0);
  } else {
    if (state[0] && !this.lastClk) {
      // Clock leading edge
      if (state[1] !== false) {
        this.set(this.value + 1);
      } else {
        this.set(this.value - 1);
      }
    }
  }

  this.lastClk = state[0];
};

Counter.prototype.set = function (value) {
  this.value = value;
  var and = 0;

  for (var i = 0; i < this.size; i++) {
    and = and << 1 | 1;
  }

  this.value &= and;
  var o = this.value;
  var data = [];

  for (var _i = 0; _i < this.size; _i++) {
    data.push((o & 1) == 1);
    o >>= 1;
  }

  this.outs[0].set(data);
};
/**
 * Clone this component object.
 * @returns {Counter}
 */


Counter.prototype.clone = function () {
  var copy = new Counter();
  copy.size = this.size;
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Counter.prototype.load = function (obj) {
  this.size = obj["size"];
  _Component__WEBPACK_IMPORTED_MODULE_1__.Component.prototype.load.call(this, obj);
  this.set(0);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


Counter.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_1__.Component.prototype.save.call(this);
  obj.size = this.size;
  return obj;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Counter.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawBox(context);
  var y = this.y;
  context.font = '14px "Lucida Console", Monaco, monospace';
  context.textAlign = "center"; // Where does the text start?

  if (this.size > 12) {
    context.fillText(_Utility_Util__WEBPACK_IMPORTED_MODULE_0__.Util.toHex(this.value, 4), this.x, y);
  } else if (this.size > 8) {
    context.fillText(_Utility_Util__WEBPACK_IMPORTED_MODULE_0__.Util.toHex(this.value, 3), this.x, y);
  } else if (this.size > 4) {
    context.fillText(_Utility_Util__WEBPACK_IMPORTED_MODULE_0__.Util.toHex(this.value, 2), this.x, y);
  } else {
    context.fillText(_Utility_Util__WEBPACK_IMPORTED_MODULE_0__.Util.toBinary(this.value, this.size), this.x, y);
  }

  y += 25;
  context.font = "14px Times";
  context.fillText("counter", this.x, y);
  this.drawIO(context, view);
};

Counter.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = "<div class=\"control1 center gap\"><label for=\"".concat(id, "\">Size in bits: </label>\n<input class=\"number\" type=\"text\" name=\"").concat(id, "\" id=\"").concat(id, "\" value=\"").concat(this.size, "\"></div>");
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(id).value);

    if (isNaN(size) || size < 2 || size > 16) {
      document.getElementById(id).select();
      return "Must be an integer from 2 to 16";
    }

    return null;
  }, function () {
    _this.size = parseInt(document.getElementById(id).value);

    _this.set(_this.value);
  });
  dlg.open();
};
/**
 * Create a PaletteImage object for a the component
 */


Counter.paletteImage = function () {
  var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_3__.PaletteImage(60, 44);
  pi.box(16, 32);
  pi.io(8, -8, 'e');
  pi.io(-8, -8, 'w'); // Reset

  pi.io(0, 16, 's'); // Clock

  pi.clock(0, -16, 'n');
  pi.drawText("0000", 0, 2, "6px Times");
  pi.drawText("Counter", 0, 10, "4px Times");
  return pi;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/DFF.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/DFF.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DFF": () => (/* binding */ DFF)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");


/**
 * Component: D Flip-Flop

 * @constructor
 */

var DFF = function DFF() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 90;
  this.width = 64;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.lastClk = false; // Two inputs, two outputs

  this.addIn(-w2, 0, 16, "D");
  var clk = this.addIn(0, -h2, 11);
  clk.orientation = 'n';
  clk.clock = true;
  this.addOut(w2, -32, 16, "Q");
  this.addOutInv(w2, 32, 16, "Q", true);
  this.outs[0].set(false);
  this.outs[1].set(false);
};
DFF.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
DFF.prototype.constructor = DFF;
DFF.type = "DFF"; ///< Name to use in files

DFF.label = "D Flip-Flop"; ///< Label for the palette

DFF.desc = "D Flip-Flop"; ///< Description for the palette

DFF.order = 204; ///< Order of presentation in the palette

DFF.description = '<h2>D Flip-Flop</h2><p>D Flip-Flop.</p>';
/**
 * Compute the gate result
 * @param state
 */

DFF.prototype.compute = function (state) {
  if (state[1] && !this.lastClk) {
    var q = state[0];
    this.outs[0].set(q);
    this.outs[1].set(q);
  }

  this.lastClk = state[1];
};
/**
 * Clone this component object.
 * @returns {DFF}
 */


DFF.prototype.clone = function () {
  var copy = new DFF();
  copy.copyFrom(this);
  return copy;
};
/**
 * Create a PaletteImage object for a D-Flip Flop
 */


DFF.paletteImage = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(120, 120);
  var context = paletteImage.context;
  context.lineWidth = 1.5;
  paletteImage.box(40, 80);
  var w = paletteImage.width;
  var h = paletteImage.height;
  var ioY = 18;
  paletteImage.io(20, -ioY, 'e');
  paletteImage.io(20, ioY, 'e');
  paletteImage.io(-20, 0, 'w');
  paletteImage.io(0, -40, 'n');
  paletteImage.circle(23, ioY, 3);
  var font = '20px Times';
  paletteImage.drawText('Q', 10, -ioY + 5, font);
  paletteImage.drawTextBar('Q', 10, ioY + 5, font);
  paletteImage.drawText('D', -12, 5, font);
  var sz = 7;
  context.beginPath();
  context.moveTo(-sz + w / 2, -40 + h / 2);
  context.lineTo(w / 2, -40 + sz + h / 2);
  context.lineTo(sz + w / 2, -40 + h / 2);
  context.stroke();
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/DFFsr.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/DFFsr.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DFFsr": () => (/* binding */ DFFsr)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");

/**
 * Component: D Flip-Flop with Set and Reset

 * @constructor
 */

var DFFsr = function DFFsr() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 90;
  this.width = 64;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.lastClk = false; // Four inputs, two outputs

  this.addIn(-w2, -32, 16, "D");
  this.addIn(-w2, 32, 16).clock = true;
  var s = this.addIn(0, -h2, 11, "S");
  s.orientation = 'n';
  var r = this.addIn(0, h2, 11, "R");
  r.orientation = 's';
  this.addOut(w2, -32, 16, "Q");
  this.addOutInv(w2, 32, 16, "Q", true);
  this.outs[0].set(undefined);
  this.outs[1].set(undefined);
};
DFFsr.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
DFFsr.prototype.constructor = DFFsr;
DFFsr.type = "DFFsr"; ///< Name to use in files

DFFsr.label = "D Flip-Flop SR"; ///< Label for the palette

DFFsr.desc = "D Flip-Flop with Set/Reset"; ///< Description for the palette

DFFsr.img = "dffsr.png"; ///< Image to use for the palette

DFFsr.order = 206; ///< Order of presentation in the palette

DFFsr.description = '<h2>D Flip-Flop with Set/Reset</h2><p>D Flip-Flop with Set and Reset.' + ' Set and Reset can be safely left unconnected.</p>';
/**
 * Compute the gate result
 * @param state
 */

DFFsr.prototype.compute = function (state) {
  // Inputs:
  // 0: D
  // 1: CLK
  // 2: Set
  // 3: Reset
  var d = state[0];
  var c = state[1];
  var s = state[2];
  var r = state[3];
  var q = this.outs[0];
  var qn = this.outs[1];

  if (s === true && r === true) {
    q.set(undefined);
    qn.set(undefined);
  } else if (s === true) {
    q.set(true);
    qn.set(true);
  } else if (r === true) {
    q.set(false);
    qn.set(false);
  } else if (c && !this.lastClk) {
    q.set(d);
    qn.set(d);
  }

  this.lastClk = c;
};
/**
 * Clone this component object.
 * @returns {DFFsr}
 * @memberof DFFsr
 */


DFFsr.prototype.clone = function () {
  var copy = new DFFsr();
  copy.copyFrom(this);
  return copy;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/DLatch.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/DLatch.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DLatch": () => (/* binding */ DLatch)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");


/**
 * Component: D-Latch gate
 */

var DLatch = function DLatch() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 90;
  this.width = 64;
  var w2 = this.width / 2;
  var h2 = this.height / 2; // Two inputs, two outputs

  this.addIn(-w2, 0, 16, "D");
  this.addIn(0, -h2, 11, "CLK").orientation = 'n';
  this.addOut(w2, -32, 16, "Q");
  this.addOutInv(w2, 32, 16, "Q", true);
  this.outs[0].set(false);
  this.outs[1].set(false);
};
DLatch.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
DLatch.prototype.constructor = DLatch;
DLatch.type = "DLatch"; ///< Name to use in files

DLatch.label = "D  Latch"; ///< Label for the palette

DLatch.desc = "D Latch"; ///< Description for the palette
//DLatch.img = "d.png";         ///< Image to use for the palette

DLatch.order = 202; ///< Order of presentation in the palette

DLatch.description = "<h2>D Latch</h2>\n<p>A D latch passes the input D to the outputs Q and Q' when the clock input CLK is true, but\nlatches the value when CLK is false.</p>";
/**
 * Compute the gate result
 * @param state
 */

DLatch.prototype.compute = function (state) {
  if (state[1]) {
    var q = state[0];
    this.outs[0].set(q);
    this.outs[1].set(q);
  }
};
/**
 * Clone this component object.
 * @returns {DLatch}
 */


DLatch.prototype.clone = function () {
  var copy = new DLatch();
  copy.copyFrom(this);
  return copy;
};
/**
 * Create a PaletteImage object for a D-Latch
 */


DLatch.paletteImage = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(120, 120);
  var context = paletteImage.context;
  context.lineWidth = 1.5;
  paletteImage.box(40, 80);
  var ioY = 18;
  paletteImage.io(20, -ioY, 'e');
  paletteImage.io(20, ioY, 'e');
  paletteImage.io(-20, 0, 'w');
  paletteImage.io(0, -40, 'n');
  paletteImage.circle(23, ioY, 3);
  var font = '20px Times';
  paletteImage.drawText('Q', 10, -ioY + 5, font);
  paletteImage.drawTextBar('Q', 10, ioY + 5, font);
  paletteImage.drawText('D', -12, 5, font);
  paletteImage.drawText('CLK', 0, -29, '12px Times');
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Decoder3.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Decoder3.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Decoder3": () => (/* binding */ Decoder3)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");

/**
 * Component: 3-8 decoder
 * @deprecated - use BusDecoder
 */

var Decoder3 = function Decoder3() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 100;
  this.width = 48; // Size in bits

  this.size = 8; // Size output and one input

  this.circuitOuts = [];
  this.addIn(-this.width / 2, 0, 16, "In").bus = true;
  this.ensureIO();
};
Decoder3.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Decoder3.prototype.constructor = Decoder3;
Decoder3.prototype.prefix = null;
Decoder3.type = "Decoder3"; ///< Name to use in files

Decoder3.label = "3-to-8"; ///< Label for the palette

Decoder3.desc = "3-to-8 Decoder"; ///< Description for the palette

Decoder3.img = "decoder3.png"; ///< Image to use for the palette

Decoder3.description = "<h2>3-to-8 decoder</h2>\n<p>Converts a 3-bit binary value on <strong>In</strong> to a true on one of eight output lines.</p>";
Decoder3.order = 1000;
/**
 * Compute the gate result
 * @param state
 */

Decoder3.prototype.compute = function (state) {
  if (Array.isArray(state[0])) {
    var c = (state[0][0] ? 1 : 0) + (state[0][1] ? 2 : 0) + (state[0][2] ? 4 : 0);

    for (var i = 0; i < this.size; i++) {
      this.outs[i].set(i == c);
    }
  } else {
    for (var i = 0; i < this.size; i++) {
      this.outs[i].set(undefined);
    }
  }
};
/**
 * Clone this component object.
 * @returns {Decoder3}
 */


Decoder3.prototype.clone = function () {
  var copy = new Decoder3();
  copy.copyFrom(this);
  return copy;
};
/**
 * Ensure the actual number of inputs matches the
 * defined bus size.
 */


Decoder3.prototype.ensureIO = function () {
  var spacing = 16;
  this.height = this.size * spacing + 24;

  if (this.height < 80) {
    this.height = 80;
  }

  var x = this.width / 2;
  var startY = this.size / 2 * spacing - 8;

  for (var i = 0; i < this.size; i++) {
    if (i >= this.outs.length) {
      break;
    }

    this.outs[i].name = "O" + i;
    this.outs[i].x = x;
    this.outs[i].y = startY - i * spacing;
    this.outs[i].len = 16;
  } // Add any new pins


  for (; i < this.size; i++) {
    this.addOut(x, startY - i * spacing, 16, "O" + i);
  } // Delete pins that have ceased to exist


  if (i < this.outs.length) {
    for (; i < this.outs.length; i++) {
      this.outs[i].clear();
    }

    this.outs.splice(this.size);
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Decoder3.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  this.drawBox(context); // Left side
  //context.beginPath();

  context.font = "12px Times";
  context.textAlign = "center";
  context.fillText("decoder", this.x, this.y + this.height / 2 - 2); // context.stroke();

  this.drawIO(context, view);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Extend.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Extend.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Extend": () => (/* binding */ Extend)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");



/**
 * Component: Extend
 * The Extend component extends an input bus to
 * a larger output size.
 *
 * A common use is extending a 12 bit immediate value to
 * 16 or 32 bits.
 *
 * @constructor
 * @property {number} height Component height
 * @property {number} width Component width
 * @property {number} outputSize Number of output bits
 * @property {boolean} arithmetic Sign extend expansion
 */

var Extend = function Extend() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this); //
  // Object properties
  //

  Object.defineProperties(this, {
    // Component height
    height: {
      value: 32
    },

    /** Component width */
    width: {
      value: 96
    },
    outputSize: {
      value: 16,
      writable: true
    },
    arithmetic: {
      value: false,
      writable: true
    },
    shift: {
      value: 0,
      writable: true
    }
  }); // One input

  this.addIn(-48, 8, 16).bus = true; // One output

  this.addOut(48, 0, 16).bus = true;
};
Extend.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Extend.prototype.constructor = Extend;
Extend.prototype.prefix = null;
Extend.type = "Extend"; ///< Name to use in files

Extend.label = "Extend"; ///< Label for the palette

Extend.desc = "Bus Extend"; ///< Description for the palette

Extend.description = "<h2>Extend</h2><p>The Extend component extends a \nbus to a larger size. A common use is to extend an immediate value \nfrom an instruction to 16 or 32 bits.</p>\n<p>The output can be optionally shifted left by a fixed number of bits.</p>";
Extend.order = 311;
Extend.help = 'extend';
/**
 * Clone this component object.
 * @returns {Extend}
 */

Extend.prototype.clone = function () {
  var copy = new Extend();
  copy.copyFrom(this);
  copy.outputSize = this.outputSize;
  copy.arithmetic = this.arithmetic;
  copy.shift = this.shift;
  return copy;
};
/**
 * Compute.
 *
 * Force the output to the current set value.
 * Since there are no inputs, state is ignored.
 * @param state
 */


Extend.prototype.compute = function (state) {
  // Test for the state undefined
  if (state[0] === undefined) {
    this.outs[0].set(undefined);
    return;
  } // Bus output


  var value = [];
  var i = 0; // Shift amount

  for (; i < this.shift; i++) {
    value.push(0);
  } // Move the bits


  var inBit = 0;
  var lastBit = 0;

  for (; inBit < state[0].length && i < this.outputSize; inBit++, i++) {
    value.push(state[0][inBit]);
    lastBit = state[0][inBit];
  } // Expand


  for (; i < this.outputSize; i++) {
    value.push(this.arithmetic ? lastBit : 0);
  }

  this.outs[0].set(value);
};
/**
 * Draw the component.
 * @param context Display context
 * @param view View object
 */


Extend.prototype.draw = function (context, view) {
  // Component background
  this.outlinePath(context);
  context.fillStyle = "#ffffff";
  context.fill(); // Select the style to draw the rest

  this.selectStyle(context, view); // Box for the component
  //this.outlinePath(context);

  context.stroke();
  context.font = "14px Times";
  context.textAlign = "center";
  context.fillText("Extend", this.x, this.y + 10);
  this.drawIO(context, view);
};

Extend.prototype.outlinePath = function (context) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var leftTopY = this.y - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.moveTo(leftX, leftTopY);
  context.lineTo(leftX, botY);
  context.lineTo(rightX, botY);
  context.lineTo(rightX, topY);
  context.lineTo(leftX, leftTopY);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


Extend.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.outputSize = this.outputSize;
  obj.arithmetic = this.arithmetic;
  obj.shift = this.shift;
  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Extend.prototype.load = function (obj) {
  this.outputSize = obj['outputSize'];
  this.arithmetic = obj['arithmetic'];
  this.shift = obj['shift'];
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};

Extend.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var outputId = dlg.uniqueId();
  var arithId = dlg.uniqueId();
  var shiftId = dlg.uniqueId();
  var html = "<div class=\"control1 center gap\">\n<label>Output size (bits): \n<input class=\"number\" type=\"text\" name=\"".concat(outputId, "\" id=\"").concat(outputId, "\" value=\"").concat(this.outputSize, "\" spellcheck=\"false\" onfocus=\"this.select()\">\n</label>\n</div>\n<div class=\"control1 center gap\">\n<label>Output shift (bits): \n<input class=\"number\" type=\"text\" name=\"").concat(shiftId, "\" id=\"").concat(shiftId, "\" value=\"").concat(this.shift, "\" spellcheck=\"false\" onfocus=\"this.select()\">\n</label>\n</div>\n<div class=\"control1 center gap\">\n<label for=\"").concat(arithId, "\"><input type=\"checkbox\" id=\"").concat(arithId, "\" name=\"").concat(arithId, "\"").concat(this.arithmetic ? " checked" : "", "> Arithmetic extend</label>\n</div>");
  dlg.extra(html, function () {
    var outputStr = document.getElementById(outputId).value;
    var output = parseInt(outputStr);

    if (isNaN(output) || output < 1 || output > 32) {
      document.getElementById(outputId).select();
      return "Invalid output size, must be 1 to 32";
    }

    var shiftStr = document.getElementById(shiftId).value;
    var shift = parseInt(outputStr);

    if (isNaN(shift) || shift < 0 || shift > output) {
      document.getElementById(shiftId).select();
      return "Invalid shift size, must be 0 to the bit size.";
    }

    return null;
  }, function () {
    _this.arithmetic = document.getElementById(arithId).checked;
    var outputStr = document.getElementById(outputId).value;
    _this.outputSize = parseInt(outputStr);
    var shiftStr = document.getElementById(shiftId).value;
    _this.shift = parseInt(shiftStr);

    _this.pending();
  });
  dlg.open();
  document.getElementById(outputId).select();
};
/**
 * Create a PaletteImage object for a the component
 */


Extend.paletteImage = function () {
  var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_2__.PaletteImage(60, 44);
  var wid = 40;
  var hit = 16;
  var x = pi.width / 2;
  var y = pi.height / 2;
  var leftX = x - wid / 2 - 0.5;
  var rightX = x + wid / 2 + 0.5;
  var topY = y - hit / 2 - 0.5;
  var leftTopY = y;
  var botY = y + hit / 2 + 0.5;
  pi.context.beginPath();
  pi.context.moveTo(leftX, leftTopY);
  pi.context.lineTo(rightX, topY);
  pi.context.lineTo(rightX, botY);
  pi.context.lineTo(leftX, botY);
  pi.context.lineTo(leftX, leftTopY);
  pi.fillStroke();
  pi.io(20, 0, 'e');
  pi.io(-20, 4, 'w');
  pi.drawText("Extend", 0, 7, "8px Times");
  return pi;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/FmBus.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/FmBus.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FmBus": () => (/* binding */ FmBus)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: Convert bus into single-bit signals
 * @constructor
 */

var FmBus = function FmBus() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 80;
  this.width = 32; // Size in bits

  this.size = 4; // Size output and one input

  this.circuitOuts = [];
  this.addIn(-this.width / 2, 0, this.pinlength, "I").bus = true;
  this.ensureIO();
};
FmBus.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
FmBus.prototype.constructor = FmBus;
FmBus.prototype.prefix = null;
FmBus.prototype.indent = 10;
FmBus.prototype.pinlength = 8;
FmBus.type = "FmBus"; ///< Name to use in files

FmBus.label = "Fm Bus"; ///< Label for the palette

FmBus.desc = "Bus to Single bits"; ///< Description for the palette

FmBus.img = "fmbus.png"; ///< Image to use for the palette

FmBus.order = 305; ///< Order of presentation in the palette

FmBus.description = '<h2>From Bus</h2><p>Converts a bus input into single bit ' + 'outputs. This allows for simpler circuits.</p>';
/**
 * Compute the gate result
 * @param state
 */

FmBus.prototype.compute = function (state) {
  if (Array.isArray(state[0])) {
    for (var i = 0; i < this.size && i < state[0].length; i++) {
      this.outs[i].set(state[0][i]);
    }

    for (; i < this.size; i++) {
      this.outs[i].set(undefined);
    }
  } else {
    for (var i = 0; i < this.size; i++) {
      this.outs[i].set(undefined);
    }
  }
};
/**
 * Clone this component object.
 * @returns {FmBus}
 */


FmBus.prototype.clone = function () {
  var copy = new FmBus();
  copy.size = this.size;
  copy.ensureIO();
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


FmBus.prototype.load = function (obj) {
  this.size = obj["size"];
  this.ensureIO();
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


FmBus.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.size = this.size;
  return obj;
};
/**
 * Ensure the actual number of inputs matches the
 * defined bus size.
 */


FmBus.prototype.ensureIO = function () {
  var spacing = 16;
  this.height = this.size * spacing + 16;

  if (this.height < 48) {
    this.height = 48;
  }

  var x = this.width / 2;
  var startY = this.size / 2 * spacing - 8;

  for (var i = 0; i < this.size; i++) {
    if (i >= this.outs.length) {
      break;
    }

    this.outs[i].name = "O" + i;
    this.outs[i].x = x;
    this.outs[i].y = startY - i * spacing;
    this.outs[i].len = this.pinlength;
  } // Add any new pins


  for (; i < this.size; i++) {
    this.addOut(x, startY - i * spacing, this.pinlength, "O" + i);
  } // Delete pins that have ceased to exist


  if (i < this.outs.length) {
    for (; i < this.outs.length; i++) {
      this.outs[i].clear();
    }

    this.outs.splice(this.size);
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


FmBus.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawTrap(context, this.indent, 0);
  this.drawIO(context, view);
};

FmBus.prototype.properties = function (main) {
  var that = this;
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = '<div class="control1 center gap"><label for="' + id + '">Size: </label><input class="number" type="text" id="' + id + '" value="' + this.size + '"></div>';
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(id).value);

    if (isNaN(size) || size < 2 || size > 16) {
      return "Size must be an integer from 2 to 16";
    }

    return null;
  }, function () {
    that.size = parseInt(document.getElementById(id).value);
    that.ensureIO();
    that.pending();
  });
  dlg.open();
  document.getElementById(id).select();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/HexToSevenSegment.js":
/*!*******************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/HexToSevenSegment.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HexToSevenSegment": () => (/* binding */ HexToSevenSegment)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");


/**
 * Component: Hexadecimal to 7-segment decoder

 * @constructor
 */

var HexToSevenSegment = function HexToSevenSegment() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 134;
  this.width = 64;
  var w2 = this.width / 2;
  var h2 = this.height / 2; // Four inputs

  var y = -16 * 3 - 8;
  var len = 16;
  this.addIn(-this.width / 2, y, len, 'I3');
  y += 16;
  this.addIn(-this.width / 2, y, len, 'I2');
  y += 16;
  this.addIn(-this.width / 2, y, len, 'I1');
  y += 16;
  this.addIn(-this.width / 2, y, len, 'I0');
  y += 32;
  this.addIn(-this.width / 2, y, len, 'I').bus = true; // 7 outputs

  y = -16 * 3 - 8;
  len = 16;
  this.addOut(this.width / 2, y, len, "a");
  y += 16;
  this.addOut(this.width / 2, y, len, "b");
  y += 16;
  this.addOut(this.width / 2, y, len, "c");
  y += 16;
  this.addOut(this.width / 2, y, len, "d");
  y += 16;
  this.addOut(this.width / 2, y, len, "e");
  y += 16;
  this.addOut(this.width / 2, y, len, "f");
  y += 16;
  this.addOut(this.width / 2, y, len, "g");
  y += 16;
};
HexToSevenSegment.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
HexToSevenSegment.prototype.constructor = HexToSevenSegment;
HexToSevenSegment.prototype.prefix = "D";
HexToSevenSegment.type = "HexToSevenSegment"; ///< Name to use in files

HexToSevenSegment.label = "Hex to Seven Segment"; ///< Label for the palette

HexToSevenSegment.desc = "Hexadecimal to Seven Segment Decoder"; ///< Description for the palette

HexToSevenSegment.img = null; ///< Image to use for the palette

HexToSevenSegment.description = '<h2>Hex to Seven Segement</h2>' + '<p>Decodes hexadecimal into the correct outputs for a seven-segment display. Accepts either' + ' single bit lines or bus input.</p>';
HexToSevenSegment.order = 506;
/**
 * Compute the gate result
 * @param state
 */

HexToSevenSegment.prototype.compute = function (state) {
  var a = state[0];
  var b = state[1];
  var c = state[2];
  var d = state[3];

  if (a === undefined || b === undefined || c === undefined || d === undefined) {
    if (state[4] !== undefined) {
      var bus = state[4];
      a = bus[3];
      b = bus[2];
      c = bus[1];
      d = bus[0];
    }
  }

  if (a !== undefined && b !== undefined && c !== undefined && d !== undefined) {
    var i = (a ? 8 : 0) + (b ? 4 : 0) + (c ? 2 : 0) + (d ? 1 : 0);
    var mapping = [[true, true, true, true, true, true, false], // 0
    [false, true, true, false, false, false, false], // 1
    [true, true, false, true, true, false, true], // 2
    [true, true, true, true, false, false, true], // 3
    [false, true, true, false, false, true, true], // 4
    [true, false, true, true, false, true, true], // 5
    [true, false, true, true, true, true, true], // 6
    [true, true, true, false, false, false, false], // 7
    [true, true, true, true, true, true, true], // 8
    [true, true, true, true, false, true, true], // 9
    [true, true, true, false, true, true, true], // a
    [false, false, true, true, true, true, true], // b
    [true, false, false, true, true, true, false], // c
    [false, true, true, true, true, false, true], // d
    [true, false, false, true, true, true, true], // e
    [true, false, false, false, true, true, true] // f
    ];
    var m = mapping[i];

    for (a = 0; a < 7; a++) {
      this.outs[a].set(m[a]);
    }
  } else {
    for (a = 0; a < 7; a++) {
      this.outs[a].set(undefined);
    }
  }
};
/**
 * Clone this component object.
 * @returns {HexToSevenSegment}
 */


HexToSevenSegment.prototype.clone = function () {
  var copy = new HexToSevenSegment();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


HexToSevenSegment.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawBox(context);
  this.drawName(context, 0, 3);
  this.drawText(context, "Hex-to-7", 0, this.height / 2 - 5);
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for a the component
 */


HexToSevenSegment.paletteImage = function () {
  var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(60, 44);
  pi.box(20, 40);
  pi.io(-10, -15.5, 'w', 4, 5);
  pi.io(10, -15.5, 'e', 7, 5);
  var lw = pi.context.lineWidth;
  pi.context.lineWidth = 2;
  pi.io(-10, 15.5, 'w');
  pi.context.lineWidth = lw;
  pi.drawText("Hex-to-7", 0, 18, "4px Times");
  return pi;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/InPin.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/InPin.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InPin": () => (/* binding */ InPin)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/Led */ "./packages/cirsim/src/Cirsim/Graphics/Led.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");



/**
 * Component: InPin gate

 * @constructor InPin
 */

var InPin = function InPin() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16;
  this.width = 64;
  this.led = new _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led(19, 0, 7); // One output

  this.addOut(32, 0, 16);
  this.set(false);
};
InPin.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
InPin.prototype.constructor = InPin; // The special symbol * means letters

InPin.prototype.prefix = "*I";
InPin.prototype.nameRequired = true;
InPin.type = "InPin"; ///< Name to use in files

InPin.label = "In Pin"; ///< Label for the palette

InPin.desc = "Input Pin"; ///< Description for the palette

InPin.img = "inpin.png"; ///< Image to use for the palette

InPin.order = 2; ///< Order of presentation in the palette

InPin.description = '<h2>Input Pin</h2><p>An IN pin serves as input ' + 'for a circuit. Clicking the LED toggles the output true or false.</p>';
InPin.help = 'inpin';
/**
 * Clone this component object.
 * @returns {InPin}
 */

InPin.prototype.clone = function () {
  var copy = new InPin();
  copy.value = this.value;
  copy.copyFrom(this);
  return copy;
};

InPin.prototype.compute = function (state) {
  this.outs[0].set(this.value);
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


InPin.prototype.draw = function (context, view) {
  // Component background
  var background = this.value ? "white" : "#dddddd";
  this.outlinePath(context);
  context.fillStyle = background;
  context.fill(); // LED

  this.led.color = this.value ? "green" : "off";
  this.led.draw(context, this.x, this.y, background); // Select the style to draw the rest

  this.selectStyle(context, view); // Box for the component

  this.outlinePath(context);
  context.stroke(); // Name

  context.beginPath();
  context.font = "14px Times";
  context.textAlign = "center";
  var val = this.value ? "1" : "0";
  var x = this.x - 9;

  if (this.naming !== null) {
    context.fillText(this.naming + ": " + val, x, this.y + 5);
  } else {
    context.fillText(val, x, this.y + 5);
  }

  this.drawIO(context, view);
};

InPin.prototype.outlinePath = function (context) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, botY);
  context.lineTo(rightX - this.height / 2, botY);
  context.lineTo(rightX, this.y);
  context.lineTo(rightX - this.height / 2, topY);
  context.lineTo(leftX, topY);
};

InPin.prototype.touch = function (x, y) {
  if (this.led.touch(this.x, this.y, x, y)) {
    this.circuit.circuits.model.backup();
    this.set(!this.value);
    return null;
  }

  var touched = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.touch.call(this, x, y);
  return touched;
};
/**
 * Set the value for the input
 * @param value true for on
 */


InPin.prototype.set = function (value) {
  if (typeof value === 'string' || value instanceof String) {
    this.setAsString(value);
  } else {
    this.value = value;
    this.outs[0].set(value);
  }
};
/**
 * Set the value of an input from a string.
 * Accepts the following possible values.
 *
 * For undefined: undefined, '?', 'undefined'
 * For true: true, '1', 1, 'true'
 * For false: false, '0', false', 0
 *
 * @param value
 */


InPin.prototype.setAsString = function (value) {
  switch (value) {
    case undefined:
    case 'undefined':
    case '?':
      this.set(undefined);
      break;

    case 'false':
    case '0':
    case false:
      this.set(false);
      break;

    case 'true':
    case '1':
    case true:
      this.set(true);
      break;

    default:
      var v = +value === 1;
      this.set(v);
      break;
  }
};

InPin.prototype.get = function () {
  return this.value;
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


InPin.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.value = this.value;
  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


InPin.prototype.load = function (obj) {
  this.set(obj["value"]);
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};

InPin.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = '<div class="control center"><div class="choosers">' + '<label><input type="radio" id="' + id + '" value="1" name="' + id + '"' + (this.value ? " checked" : "") + '> true (1)</label>' + '<label><input type="radio" id="' + id + '" value="0" name="' + id + '"' + (this.value ? "" : " checked") + '> false (0)</label>' + '</div></div>';
  dlg.extra(html, function () {
    return null;
  }, function () {
    _this.set(document.querySelector('#' + id + ':checked').value === "1");
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/InPinBus.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/InPinBus.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InPinBus": () => (/* binding */ InPinBus)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Value */ "./packages/cirsim/src/Cirsim/Value.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");




/**
 * Component: InPinBus gate
 * An input pin for Bus inputs
 * @constructor
 */

var InPinBus = function InPinBus() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16;
  this.width = 96;
  this.narrow = false;
  this.value = new _Value__WEBPACK_IMPORTED_MODULE_2__.Value(); // One output

  this.addOut(48, 0, 16).bus = true;
  this.set([false, false, false, false]);
};
InPinBus.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
InPinBus.prototype.constructor = InPinBus;
InPinBus.prototype.prefix = "I";
InPinBus.prototype.nameRequired = true;
InPinBus.type = "InPinBus"; ///< Name to use in files

InPinBus.label = "Bus Input"; ///< Label for the palette

InPinBus.desc = "Bus Input Pin"; ///< Description for the palette

InPinBus.img = "inpinbus.png"; ///< Image to use for the palette

InPinBus.order = 300; ///< Order of presentation in the palette

InPinBus.description = '<h2>Bus Input Pin</h2><p>A Bus Input pin serves as input ' + 'for a circuit from a bus. Double-click to set the value.</p>' + '<p>Values can be preceeded by 0x or 0b for hexadecimal or binary ' + 'values.</p>' + '<p>The display and input format is selectable. Auto format will display values ' + 'with eight or fewer digits as binary and larger values in hex.</p>';
InPinBus.help = 'inpinbus';
/**
 * Clone this component object.
 * @returns {InPinBus}
 */

InPinBus.prototype.clone = function () {
  var copy = new InPinBus();
  copy.copyFrom(this);
  copy.value = this.value.clone();
  return copy;
};
/**
 * Compute.
 *
 * Force the output to the current set value.
 * Since there are no inputs, state is ignored.
 * @param state
 */


InPinBus.prototype.compute = function (state) {
  this.outs[0].set(this.value.get());
};
/**
 * Draw the component.
 * @param context Display context
 * @param view View object
 */


InPinBus.prototype.draw = function (context, view) {
  // Component background
  this.outlinePath(context);
  context.fillStyle = "#dddddd";
  context.fill(); // Select the style to draw the rest

  this.selectStyle(context, view); // Box for the component

  this.outlinePath(context);
  context.stroke();
  var x = this.x;

  if (this.narrow) {
    // Some adjustments of the X location
    // to make the narrow presentation look nicer
    x = this.x - this.height / 4 + 1;
  }

  this.value.draw(context, x, this.y, this.width - this.height / 2, this.naming);
  this.drawIO(context, view);
};

InPinBus.prototype.outlinePath = function (context) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, botY);
  context.lineTo(rightX - this.height / 2, botY);
  context.lineTo(rightX, this.y);
  context.lineTo(rightX - this.height / 2, topY);
  context.lineTo(leftX, topY);
};
/**
 * Set the value for the input
 * @param value true for on
 */


InPinBus.prototype.set = function (value) {
  if (Array.isArray(value)) {
    this.value.set(value);
  } else if (typeof value === 'string' || value instanceof String) {
    this.value.setAsString(value);
  }

  this.outs[0].set(this.value.get());
};

InPinBus.prototype.get = function () {
  return this.value.get();
};

InPinBus.prototype.setAsString = function (value, parseonly) {
  this.value.setAsString(value, parseonly);

  if (!parseonly) {
    this.outs[0].set(this.value.get());
  }
};

InPinBus.prototype.getAsString = function () {
  return this.value.getAsString();
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


InPinBus.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  this.value.save(obj);

  if (this.narrow) {
    obj.narrow = this.narrow;
  }

  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


InPinBus.prototype.load = function (obj) {
  this.value.load(obj);
  this.setNarrow(_Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.boolean(obj.narrow));
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};

InPinBus.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var content = this.value.dialogContent(dlg, true);
  var html = content.html + "<input type=\"checkbox\" id=\"".concat(id, "\" name=\"").concat(id, "\"").concat(this.narrow ? " checked" : "", "> <label for=\"").concat(id, "\">Narrow</label>");
  dlg.extra(html, content.validate, function () {
    content.accept();

    _this.setNarrow(document.getElementById(id).checked);

    _this.compute(null);
  });
  dlg.open();
};

InPinBus.prototype.setNarrow = function (narrow) {
  this.narrow = narrow;
  this.width = narrow ? 48 : 96;
  this.outs[0].x = this.width / 2;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/InstructionDecoder4.js":
/*!*********************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/InstructionDecoder4.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstructionDecoder4": () => (/* binding */ InstructionDecoder4)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: Simple 4-bit instruction decoder
 */

var InstructionDecoder4 = function InstructionDecoder4(name) {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this, name);
  this.height = 120;
  this.width = 80;
  this.instruction = ""; // Only outputs

  var y = -16 * 2;
  this.addOut(this.width / 2, y, 16, "Ae").bus = true;
  y += 16;
  this.addOut(this.width / 2, y, 16, "Be").bus = true;
  y += 16;
  this.addOut(this.width / 2, y, 16, "ALUe").bus = true;
  y += 16;
  this.addOut(this.width / 2, y, 16, "Im").bus = true;
  y += 16;
  this.addOut(this.width / 2, y, 16, "C").bus = true;
  y += 16;
  this.setAsString("nop");
};
InstructionDecoder4.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
InstructionDecoder4.prototype.constructor = InstructionDecoder4;
InstructionDecoder4.prototype.prefix = "ID";
InstructionDecoder4.prototype.nameRequired = true;
InstructionDecoder4.type = "InstructionDecoder4"; ///< Name to use in files

InstructionDecoder4.label = "Instruction Decoder 4"; ///< Label for the palette

InstructionDecoder4.desc = "Instruction Decoder"; ///< Description for the palette

InstructionDecoder4.img = "insdecoder4.png"; ///< Image to use for the palette

InstructionDecoder4.description = '<h2>Instruction Decoder</h2><p>Simple example' + ' instruction decoder. Decodes assembly statements into register and ALU operations.</p>';
InstructionDecoder4.help = 'instructiondecoder4';
InstructionDecoder4.order = 600;
/**
 * Compute the gate result
 * @param state
 */

InstructionDecoder4.prototype.compute = function (state) {};

InstructionDecoder4.prototype.setAsString = function (value, set) {
  this.instruction = value;

  if (set === undefined) {
    set = true;
  } // regular expression for lexical analysis


  var re = /\s*([a-zA-Z]*)(?:[\s,$]+([^\s,]+))?(?:[\s,$]+([^\s,]+))?(?:[\s,$]+([^\s,]+))?/;
  var match = this.instruction.toLowerCase().match(re);

  if (match === null || match.length < 2) {
    return "syntax error in input";
  }

  var ae = this.outs[0];
  var be = this.outs[1];
  var alue = this.outs[2];
  var im = this.outs[3];
  var c = this.outs[4]; // Get a register value from a string

  function getreg(s) {
    switch (s) {
      case 'r0':
        return "00";

      case 'r1':
        return "01";

      case 'r2':
        return "10";

      case 'r3':
        return '11';

      default:
        return null;
    }
  } // Get an immediate value from a string


  function getimm(s) {
    if (s === null || s === undefined) {
      return null;
    }

    if (s.substr(0, 1) !== '#') {
      return null;
    }

    var im = parseInt(s.substr(1));

    if (im > 7 || im < -8) {
      return null;
    }

    return ((im & 8) !== 0 ? '1' : '0') + ((im & 4) !== 0 ? '1' : '0') + ((im & 2) !== 0 ? '1' : '0') + ((im & 1) !== 0 ? '1' : '0');
  }

  var opcode = match[1];
  var rd = match[2];
  var ra = match.length > 3 ? match[3] : null;
  var rb = match.length > 4 ? match[4] : null;
  var rdreg = getreg(rd);
  var rareg = getreg(ra);
  var rbreg = getreg(rb);
  var raimm = getimm(ra);
  var rbimm = getimm(rb);

  function operation(cOp) {
    // Must have registers Rd and Ra
    if (rdreg === null || rareg === null || rb === null) {
      return null;
    }

    if (rb.substr(0, 1) === '#') {
      // This is an immediate operation
      if (rbimm === null) {
        return "invalid immediate value";
      }

      if (set) {
        ae.setAsString(rareg);
        be.setAsString("100");
        alue.setAsString("0" + rdreg);
        c.setAsString(cOp);
        im.setAsString(rbimm);
      }
    } else if (rareg !== null) {
      // This is a register operation
      if (set) {
        ae.setAsString(rareg);
        be.setAsString("0" + rbreg);
        alue.setAsString("0" + rdreg);
        c.setAsString(cOp);
      }
    }

    return null;
  }

  switch (opcode) {
    case 'nop':
      if (set) {
        ae.setAsString("00");
        be.setAsString("000");
        alue.setAsString("100");
        im.setAsString("0000");
        c.setAsString("111");
      }

      break;

    case 'mov':
      if (rdreg === null) {
        return null;
      }

      if (ra.substr(0, 1) === '#') {
        // This is an immediate operation
        if (raimm === null) {
          return "invalid immediate value";
        }

        if (set) {
          ae.setAsString(rdreg);
          be.setAsString("100");
          alue.setAsString("0" + rdreg);
          c.setAsString("000");
          im.setAsString(raimm);
        }
      } else if (rareg !== null) {
        // This is a register operation
        if (set) {
          ae.setAsString(rdreg);
          be.setAsString("0" + rareg);
          alue.setAsString("0" + rdreg);
          c.setAsString("000");
        }
      }

      break;

    case 'add':
      return operation("001");

    case 'sub':
      return operation("010");

    case 'and':
      return operation("011");

    case 'or':
      return operation("100");

    case 'sll':
      return operation("101");

    case 'sla':
      return operation("110");

    default:
      return 'invalid opcode';
  }

  return null;
};
/**
 * Clone this component object.
 * @returns {InstructionDecoder4}
 */


InstructionDecoder4.prototype.clone = function () {
  var copy = new InstructionDecoder4();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


InstructionDecoder4.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5; // Left side

  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, botY); // Bottom

  context.lineTo(rightX, botY); // Right side

  context.lineTo(rightX, topY); // Top

  context.lineTo(leftX, topY);
  context.font = "12px Times";
  context.textAlign = "center";
  context.fillText("instruction", this.x, this.y + this.height / 2 - 14);
  context.fillText("decoder", this.x, this.y + this.height / 2 - 2);
  context.fillText(this.instruction, this.x, this.y - this.height / 2 + 11); // Name

  if (this.naming !== null) {
    context.font = "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x - 15, this.y + 3);
  }

  context.stroke();
  this.drawIO(context, view);
};

InstructionDecoder4.prototype.properties = function (main) {
  var _this = this;

  var value = this.instruction;
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = '<p>Value<br>' + "<input type=\"text\" id=\"".concat(id, "\" spellcheck=\"false\" value=\"").concat(value, "\"></p>");
  dlg.extra(html, function () {
    var newValue = document.getElementById(id).value;
    return _this.setAsString(newValue, false);
  }, function () {
    var newValue = document.getElementById(id).value;

    _this.setAsString(newValue);
  }, 40);
  dlg.open();
  var input = document.getElementById(id);
  input.select();
  input.focus();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Inverter.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Inverter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inverter": () => (/* binding */ Inverter)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");
/* harmony import */ var _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphics/CanvasHelper */ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js");



/**
 * Component: Inverter gate
 * @constructor
 */

var Inverter = function Inverter() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 40; // One input and one output

  this.addIn(-20, 0, 12);
  this.addOutInv(20, 0, 12);
};
Inverter.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Inverter.prototype.constructor = Inverter;
Inverter.type = "Inverter"; ///< Name to use in files

Inverter.label = "Inverter"; ///< Label for the palette

Inverter.desc = "Inverter gate"; ///< Description for the palette

Inverter.order = 50; ///< Order of presentation in the palette

Inverter.description = "<h2>Inverter</h2><p>The output of an Inverter gate is <em>true</em> if the \n input is false and <em>false</em> if the input is true.</p>";
Inverter.help = 'inverter';
/**
 * Compute the gate result
 * @param state
 */

Inverter.prototype.compute = function (state) {
  this.outs[0].set(state[0]);
};
/**
 * Clone this component object.
 * @returns {Inverter}
 */


Inverter.prototype.clone = function () {
  var copy = new Inverter();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Inverter.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  Inverter.path(context, this.x, this.y, this.width, this.height);
  _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_2__.CanvasHelper.fillWith(context);
  Inverter.path(context, this.x, this.y, this.width, this.height);
  context.stroke(); // Name

  if (this.naming !== null) {
    context.font = "14px Times";
    context.textAlign = "center";
    context.fillText(this.naming, this.x - 6, this.y + 5);
    context.stroke();
  }

  this.drawIO(context, view);
};

Inverter.path = function (context, x, y, width, height) {
  var leftX = x - width / 2 - 0.5;
  var rightX = x + width / 2 + 0.5;
  var topY = y - height / 2 - 0.5;
  var botY = y + height / 2 + 0.5; // Left side

  context.beginPath();
  context.moveTo(leftX, topY);
  context.lineTo(leftX, botY); // Bottom

  context.lineTo(rightX, y); // Top

  context.lineTo(leftX, topY);
};
/**
 * Create a PaletteImage object for an Inverter
 */


Inverter.paletteImage = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(120, 70);
  var size = 0.7;
  Inverter.path(paletteImage.context, 60, 35, 40, 50);
  paletteImage.fillStroke(); // paletteImage.context.stroke();

  paletteImage.io(-20, 0, 'w');
  paletteImage.io(30, 0, 'e');
  paletteImage.circle(25, 0, 5);
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/JKFF.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/JKFF.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JKFF": () => (/* binding */ JKFF)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");

/**
 * Component: JK Flip-Flop
 * @constructor
 */

var JKFF = function JKFF() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 90;
  this.width = 64;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.lastClk = false; // Three inputs, two outputs

  this.addIn(-w2, -32, 16, "J");
  this.addIn(-w2, 32, 16, "K");
  this.addIn(-w2, 0, 16).clock = true;
  var s = this.addIn(0, -h2, 11, "S");
  s.orientation = 'n';
  var r = this.addIn(0, h2, 11, "R");
  r.orientation = 's';
  this.addOut(w2, -32, 16, "Q");
  this.addOutInv(w2, 32, 16, "Q", true);
  this.outs[0].set(undefined);
  this.outs[1].set(undefined);
};
JKFF.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
JKFF.prototype.constructor = JKFF;
JKFF.type = "JKFF"; ///< Name to use in files

JKFF.label = "JK Flip-Flop"; ///< Label for the palette

JKFF.desc = "JK Flip-Flop"; ///< Description for the palette

JKFF.img = "jk.png"; ///< Image to use for the palette

JKFF.order = 208; ///< Order of presentation in the palette

JKFF.description = '<h2>JK Flip-Flop</h2><p>JK Flip-Flop.</p>';
/**
 * Compute the gate result
 * @param state
 */

JKFF.prototype.compute = function (state) {
  var s = state[3];
  var r = state[4];
  var q = this.outs[0];
  var qn = this.outs[1];

  if (s === true && r === true) {
    q.set(undefined);
    qn.set(undefined);
  } else if (s === true) {
    q.set(true);
    qn.set(true);
  } else if (r === true) {
    q.set(false);
    qn.set(false);
  } else if (state[2] && !this.lastClk) {
    var j = state[0];
    var k = state[1];

    if (j && k) {
      var v = !this.outs[0].get();
      q.set(v);
      qn.set(v);
    } else if (j) {
      v = true;
      q.set(v);
      qn.set(v);
    } else if (k) {
      v = false;
      q.set(v);
      qn.set(v);
    }
  }

  this.lastClk = state[2];
};
/**
 * Clone this component object.
 * @returns {JKFF}
 */


JKFF.prototype.clone = function () {
  var copy = new JKFF();
  copy.copyFrom(this);
  return copy;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/LED.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/LED.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LED": () => (/* binding */ LED)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/Led */ "./packages/cirsim/src/Cirsim/Graphics/Led.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");




/**
 * Component: LED

 * @constructor
 */

var LED = function LED() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 32;
  this.width = 32;
  this.value = undefined;
  this.led = new _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led(0, 0, 12);
  this.color = "blue"; // One input

  this.addIn(-16, 0, 16);
};
LED.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
LED.prototype.constructor = LED;
LED.prototype.prefix = "L";
LED.prototype.nameRequired = true;
LED.type = "LED"; ///< Name to use in files

LED.label = "LED"; ///< Label for the palette

LED.desc = "Light Emitting Diode"; ///< Description for the palette

LED.img = "led.png"; ///< Image to use for the palette

LED.order = 102; ///< Order of presentation in the palette

LED.description = '<h2>LED</h2><p>An LED indicates if the input is true (color), false ' + '(black), or undefined (?). The LED color can be set using the component properties dialog' + ' box.</p>';
/**
 * Compute the gate result
 * @param state
 */

LED.prototype.compute = function (state) {
  this.value = state[0];
};

LED.prototype.get = function () {
  return this.ins[0].value;
};
/**
 * Clone this component object.
 * @returns {LED}
 */


LED.prototype.clone = function () {
  var copy = new LED();
  copy.color = this.color;
  copy.value = this.value;
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


LED.prototype.draw = function (context, view) {
  var value = this.get();
  var leftX = this.x - this.width / 2 - 0.5;
  var topY = this.y - this.height / 2 + 0.5; // Select the style

  this.selectStyle(context, view);
  var saveFillStyle = context.fillStyle;
  var saveStrokeStyle = context.strokeStyle; //
  // Button background
  //

  var background = value ? "#ffffff" : "#dddddd";
  context.fillStyle = background;
  context.fillRect(leftX, topY, this.width, this.height); // Border

  context.fillStyle = saveFillStyle;
  context.beginPath();
  context.rect(leftX, topY, this.width, this.height);
  context.stroke(); //
  // Restore
  //

  context.lineWidth = 1;
  context.fillStyle = saveFillStyle;
  context.strokeStyle = saveStrokeStyle; // LED

  this.led.color = value === undefined ? "undefined" : value ? this.color : "off";
  this.led.draw(context, this.x - 0.5, this.y, background);
  var edge = 12;
  context.fillRect(this.x - edge - 2, this.y - edge, 2, 2);
  context.fillRect(this.x + edge - 2, this.y - edge, 2, 2);
  context.fillRect(this.x - edge - 2, this.y + edge, 2, 2);
  context.fillRect(this.x + edge - 2, this.y + edge, 2, 2);
  this.drawIO(context, view);
};

LED.prototype.outlinePath = function (context) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.moveTo(leftX, this.y);
  context.lineTo(leftX + this.height / 2, botY);
  context.lineTo(rightX, botY);
  context.lineTo(rightX, topY);
  context.lineTo(leftX + this.height / 2, topY);
  context.lineTo(leftX, this.y);
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


LED.prototype.load = function (obj) {
  this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.sanitize(obj["color"]);
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


LED.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.color = this.color;
  return obj;
};

LED.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__.ComponentPropertiesDlg(this, main, false);
  var colorId = dlg.uniqueId();
  var html = _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led.colorSelector(colorId, this.color);
  dlg.extra(html, function () {
    return null;
  }, function () {
    _this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.sanitize(document.getElementById(colorId).value); // $('#' + colorId).val());
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/LEDBar.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/LEDBar.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LEDBar": () => (/* binding */ LEDBar)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Graphics_Led__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphics/Led */ "./packages/cirsim/src/Cirsim/Graphics/Led.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");




/**
 * Component: LED Bar - 2 to 16 LED's in a vertical bar

 * @constructor
 */

var LEDBar = function LEDBar() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 20;
  this.leds = [];
  this.horz = false; // Horizontal option

  this.bus = false; // Bus input?

  this.color = "blue";
  this.lastState = [];
  this.setSize(4);
};
LEDBar.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
LEDBar.prototype.constructor = LEDBar;
LEDBar.prototype.prefix = "L";
LEDBar.type = "LEDBar"; ///< Name to use in files

LEDBar.label = "LED Bar"; ///< Label for the palette

LEDBar.desc = "LED Indicator Bar"; ///< Description for the palette

LEDBar.img = "ledbar.png"; ///< Image to use for the palette

LEDBar.description = "<h2>LED Bar</h2><p>The LED Bar component displays from two to \nsixteen LEDs in a vertical or horizontal bar that are lighted by values on discrete inputs\nor a single bus input. </p>";
LEDBar.order = 502;
LEDBar.help = 'ledbar';

LEDBar.prototype.setSize = function (size) {
  this.size = +size;
  this.ensureIO();
};
/**
 * Compute the gate result
 * @param state
 */


LEDBar.prototype.compute = function (state) {
  if (this.bus) {
    this.lastState = state[0];

    if (this.lastState === undefined) {
      this.lastState = [];
    }
  } else {
    this.lastState = state;
  }
};
/**
 * Clone this component object.
 * @returns {LEDBar}
 */


LEDBar.prototype.clone = function () {
  var copy = new LEDBar();
  copy.size = this.size;
  copy.horz = this.horz;
  copy.bus = this.bus;
  copy.ensureIO();
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


LEDBar.prototype.load = function (obj) {
  this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.sanitize(obj["color"]);

  if (obj["horz"] !== undefined) {
    this.horz = obj['horz'] === true;
  }

  if (obj['bus'] !== undefined) {
    this.bus = obj['bus'] === true;
  }

  this.setSize(obj["size"]);
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


LEDBar.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.size = this.size;
  obj.color = this.color;
  obj.horz = this.horz;
  obj.bus = this.bus;
  return obj;
};
/**
 * Ensure the actual number of inputs matches the
 * defined bus size.
 */


LEDBar.prototype.ensureIO = function () {
  var spacing = 16; // Input counter

  var i = 0;
  this.leds = [];

  if (this.ins.length > 0) {
    //
    // Test if we switched input types
    // If so, disconnect everything and zero the inputs
    //
    if (this.ins[0].bus !== this.bus) {
      for (i = 0; i < this.ins.length; i++) {
        this.ins[i].clear();
      }

      this.ins = [];
    }
  }

  if (this.horz) {
    //
    // Horizontal configuration
    //
    this.width = this.size * spacing;

    if (this.width < 50) {
      this.width = 50;
    }

    this.height = 20;
    var startX = this.size / 2 * spacing - 8;

    for (i = 0; i < this.size; i++) {
      var pinX = startX - i * spacing;
      this.leds.push(new _Graphics_Led__WEBPACK_IMPORTED_MODULE_2__.Led(pinX, 0, spacing, this.height));
    }

    if (!this.bus) {
      for (i = 0; i < this.size; i++) {
        var _pinX = startX - i * spacing;

        var pinLen = 24 - this.height / 2;
        var inp = null;

        if (i < this.ins.length) {
          inp = this.ins[i];
        } else {
          // Add any new pins
          inp = this.addIn(_pinX, this.height / 2, pinLen);
        }

        if (inp !== null) {
          inp.x = _pinX;
          inp.y = this.height / 2;
          inp.len = pinLen;
          inp.orientation = 's';
          inp.bus = false;
        }
      }
    } else {
      var _inp = null;

      if (i < this.ins.length) {
        _inp = this.ins[i];
        _inp.x = -this.width / 2;
        _inp.y = 0;
        _inp.len = 16;
      } else {
        // Add any new pins
        _inp = this.addIn(-this.width / 2, 0, 16);
      }

      _inp.orientation = 'w';
      _inp.bus = true;

      _inp.autoLen();
    }
  } else {
    //
    // Vertical configuration
    //
    this.height = this.size * spacing;

    if (this.height < 50) {
      this.height = 50;
    }

    this.width = 20;
    var startY = this.size / 2 * spacing - 8;

    for (i = 0; i < this.size; i++) {
      var pinY = startY - i * spacing;
      this.leds.push(new _Graphics_Led__WEBPACK_IMPORTED_MODULE_2__.Led(0, pinY, this.width, spacing));
    }

    if (!this.bus) {
      for (i = 0; i < this.size; i++) {
        var _pinY = startY - i * spacing;

        var _pinLen = 24 - this.width / 2;

        var _inp2 = null;

        if (i < this.ins.length) {
          _inp2 = this.ins[i];
          _inp2.x = -this.width / 2;
          _inp2.y = _pinY;
          _inp2.len = _pinLen;
        } else {
          // Add any new pins
          _inp2 = this.addIn(-this.width / 2, _pinY, _pinLen);
        }

        if (_inp2 !== null) {
          _inp2.orientation = 'w';
          _inp2.bus = false;
        }
      }
    } else {
      var _inp3 = null;

      if (i < this.ins.length) {
        _inp3 = this.ins[i];
        _inp3.x = 0;
        _inp3.y = this.height / 2;
        _inp3.len = 16;
      } else {
        // Add any new pins
        _inp3 = this.addIn(0, this.height / 2, 16);
      }

      _inp3.orientation = 's';
      _inp3.bus = true;

      _inp3.autoLen();
    }
  }

  if (!this.bus) {
    // Delete pins that have ceased to exist
    if (i < this.ins.length) {
      for (; i < this.ins.length; i++) {
        this.ins[i].clear();
      }

      this.ins.splice(this.size);
    }
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


LEDBar.prototype.draw = function (context, view) {
  //
  // Ensure the state is current
  //
  var i = 0;

  for (; i < this.lastState.length && i < this.leds.length; i++) {
    var led = this.lastState[i];
    this.leds[i].color = led === undefined ? 'undefined' : led ? this.color : 'black';
  }

  for (; i < this.leds.length; i++) {
    this.leds[i].color = 'undefined';
  }

  var background = '#444444';
  this.selectStyle(context, view);
  this.drawBox(context, background);

  for (var _i = 0; _i < this.size; _i++) {
    this.leds[_i].draw(context, this.x, this.y, background);
  }

  this.drawBox(context, 'none');
  this.drawIO(context, view);
};

LEDBar.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main); // Size

  var sizeId = dlg.uniqueId();
  var html = "<div class=\"control1 center\"><label for=\"".concat(sizeId, "\">Size: </label>\n<input class=\"number\" type=\"text\" name=\"").concat(sizeId, "\" id=\"").concat(sizeId, "\" value=\"").concat(this.size, "\"></div>"); // Color

  var colorId = dlg.uniqueId();
  html += _Graphics_Led__WEBPACK_IMPORTED_MODULE_2__.Led.colorSelector(colorId, this.color);
  html += '<div class="control center"><div class="choosers">';
  var horzId = dlg.uniqueId();
  html += "\n<label><input type=\"radio\" name=\"".concat(horzId, "\" ").concat(!this.horz ? 'checked' : '', " value=\"0\"> Vertical</label>\n<label><input type=\"radio\" name=\"").concat(horzId, "\"  ").concat(this.horz ? 'checked' : '', " value=\"1\"> Horizontal</label>");
  html += '<br>';
  var busId = dlg.uniqueId();
  html += "\n<label><input type=\"radio\" name=\"".concat(busId, "\"  ").concat(this.bus ? 'checked' : '', " value=\"1\"> Bus Input</label>\n<label><input type=\"radio\" name=\"").concat(busId, "\" ").concat(!this.bus ? 'checked' : '', " value=\"0\"> Single Bit Inputs</label>");
  html += '</div></div>';
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(sizeId).value);

    if (isNaN(size) || size < 2 || size > 16) {
      return "Size must be an integer from 2 to 16";
    }

    return null;
  }, function () {
    _this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.sanitize(document.getElementById(colorId).value);
    _this.horz = document.querySelector("input[name=".concat(horzId, "]:checked")).value === '1';
    _this.bus = document.querySelector("input[name=".concat(busId, "]:checked")).value === '1';

    _this.setSize(parseInt(document.getElementById(sizeId).value));
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Letters16.js":
/*!***********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Letters16.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Letters16": () => (/* binding */ Letters16)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");

/**
 * Component: Letters16 Special 16 letter display
 * @constructor
 */

var Letters16 = function Letters16() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 150;
  this.width = 90;
  this.value = undefined;
  var len = 11;
  this.addIn(-this.width / 2, 0, len, "in").bus = true;
};
Letters16.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Letters16.prototype.constructor = Letters16;
Letters16.prototype.prefix = "L";
Letters16.prototype.nameRequired = true;
Letters16.type = "letters16"; ///< Name to use in files

Letters16.label = "16 Letter Display"; ///< Label for the palette

Letters16.desc = "16 Letter Display"; ///< Description for the palette

Letters16.img = "letters16.png"; ///< Image to use for the palette

Letters16.description = "<h2>16 Letter Display</h2>\n<p>A special display used for Word Sequencing tasks. A 4-bit bus input value 0-15 (0 to f in hex) maps\nto the letters indicated in this table:</p>\n<table class=\"center\">\n<tr><th>Value</th><th>Letter</th></tr>\n<tr><td>0</td><td>A</td></tr>\n<tr><td>1</td><td>C</td></tr>\n<tr><td>2</td><td>D</td></tr>\n<tr><td>3</td><td>E</td></tr>\n<tr><td>4</td><td>F</td></tr>\n<tr><td>5</td><td>H</td></tr>\n<tr><td>6</td><td>I</td></tr>\n<tr><td>7</td><td>L</td></tr>\n<tr><td>8</td><td>M</td></tr>\n<tr><td>9</td><td>N</td></tr>\n<tr><td>a</td><td>O</td></tr>\n<tr><td>b</td><td>R</td></tr>\n<tr><td>c</td><td>S</td></tr>\n<tr><td>d</td><td>T</td></tr>\n<tr><td>e</td><td>U</td></tr>\n<tr><td>f</td><td>W</td></tr>\n</table>\n";
Letters16.order = 510;
/**
 * Compute the gate result
 * @param state
 */

Letters16.prototype.compute = function (state) {
  if (Array.isArray(state[0])) {
    var v = state[0];

    if (v[0] === undefined || v[1] === undefined || v[2] === undefined || v[3] === undefined) {
      this.value = undefined;
    } else {
      this.value = (v[0] ? 1 : 0) + (v[1] ? 2 : 0) + (v[2] ? 4 : 0) + (v[3] ? 8 : 0);
    }
  } else {
    this.value = undefined;
  }
};

Letters16.prototype.get = function (i) {
  return this.ins[0].value[i];
};
/**
 * Clone this component object.
 * @returns {Letters16}
 */


Letters16.prototype.clone = function () {
  var copy = new Letters16();
  copy.value = this.value;
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Letters16.prototype.draw = function (context, view) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5; // Select the style

  this.selectStyle(context, view);
  var saveFillStyle = context.fillStyle;
  var saveStrokeStyle = context.strokeStyle; //
  // Background
  //

  context.fillStyle = "#cccccc";
  context.fillRect(leftX, topY, this.width, this.height); // Border

  context.fillStyle = saveFillStyle;
  context.beginPath();
  context.rect(leftX, topY, this.width, this.height);
  context.stroke();
  var letters = ['A', 'C', 'D', 'E', 'F', 'H', 'I', 'L', 'M', 'N', 'O', 'R', 'S', 'T', 'U', 'W'];
  var letter = this.value === undefined ? '?' : letters[this.value];
  context.beginPath();
  context.font = "60px Arial";
  context.textAlign = "center";
  context.strokeStyle = "#008800";
  context.fillStyle = context.strokeStyle;
  context.fillText(letter, this.x, this.y + 20);
  context.stroke(); // Restore
  //

  context.lineWidth = 1;
  context.fillStyle = saveFillStyle;
  context.strokeStyle = saveStrokeStyle;
  this.drawName(context, 0, this.height / 2 - 8);
  this.drawIO(context, view);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Memory.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Memory.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory": () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Connector */ "./packages/cirsim/src/Cirsim/Connector.js");
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");






/**
 * Component: General purpose memory component.
 * Works as 8, 16, or 32 bits.
 * @property {int} size Size in bits
 * @constructor
 */

var Memory = function Memory() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  var size = 16;
  var badAddr = false;
  Object.defineProperties(this, {
    size: {
      get: function get() {
        return size;
      },
      set: function set(value) {
        switch (+value) {
          case 8:
            size = 8;
            break;

          default:
            size = 16;
            break;

          case 32:
            size = 32;
            break;
        }
      }
    },
    badAddr: {
      writable: true
    },
    height: {
      value: 132
    },
    width: {
      value: 64
    }
  });
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.lastClk = false;
  this.data = [];
  this.lastAddress = null;
  this.lastData = null;
  this.write = 0;
  this.addIn(-w2, -32, 16, "A").bus = true;
  this.addIn(-w2, 32, 16, "W").bus = true;
  var clk = this.addIn(0, -h2, 14);
  clk.orientation = 'n';
  clk.clock = true;
  this.addOut(w2, -32, 16, "R").bus = true;
};
Memory.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Memory.prototype.constructor = Memory;
Memory.prototype.prefix = "M";
Memory.type = "Memory"; ///< Name to use in files

Memory.label = "Memory"; ///< Label for the palette

Memory.desc = "Memory"; ///< Description for the palette

Memory.img = null; ///< Image to use for the palette

Memory.description = "<h2>Memory Bank</h2><p>The Memory component implements a simple Memory Bank.\nMemory is an array of bytes. The A (address) input selects a memory location that is output on the R\noutput. The component can be configured for 8-, 16-, or 32-bit memory. \n</p>\n<p>In the 16-bit configuration,\nall accesses are considered to be multiples of two and retrieve two bytes. Addresses with the lower bit set\nare considered erroneous. </p>\n<p>In the 32-bit configuration,\nall accesses are considered to be multiples of four and retrieve four bytes. Addresses with any of the lower \ntwo bits set are considered erroneous.</p>\n<p>Memory is retrieved in little-endian mode (first byte is the least significant byte). \nErroneous addresses are indicated by an X next to the A input on\n the component.</p>\n<p>A clock cycle on the clock input writes the memory component with the value on the W (write) input.</p>";
Memory.order = 705;
Memory.help = 'memory';
/**
 * Compute the gate result
 * @param state
 */

Memory.prototype.compute = function (state) {
  var bytes = this.size / 8; // How many bytes we read/write
  // What is the address?

  var actualAddr = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[0]);
  var addr = actualAddr; // Subject to correction for byte offset

  this.badAddr = false; // Until we know otherwise

  if (addr === null) {
    this.outs[0].set(undefined);
  } else {
    // Validate the address
    switch (bytes) {
      case 2:
        this.badAddr = (addr & 1) !== 0;
        addr &= 0xfffe;
        break;

      case 4:
        this.badAddr = (addr & 3) !== 0;
        addr &= 0xfffc;
        break;
    }

    if (state[2] && !this.lastClk) {
      // clock leading edge
      this.write = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[1]);

      if (this.write !== null) {
        // Ensure the address exists...
        while (this.data.length < addr + bytes) {
          this.data.push(0);
        } // Write the bytes


        var write = this.write;

        for (var i = 0; i < bytes; i++) {
          this.data[addr + i] = write;
          write >>= 8;
        }
      }
    }

    var o = 0;

    if (addr <= this.data.length - bytes) {
      for (var _i = 0; _i < bytes; _i++) {
        o += this.data[addr + _i] << _i * 8;
      }
    }

    this.lastAddress = actualAddr;
    this.lastData = o;
    var data = [];

    for (var _i2 = 0; _i2 < this.size; _i2++) {
      data.push((o & 1) === 1);
      o >>= 1;
    }

    this.outs[0].set(data);
  }

  this.lastClk = state[2];
};

Memory.prototype.setAsString = function (value, set) {
  value = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_4__.Sanitize.sanitize(value);

  if (set === undefined) {
    set = true;
  }

  if (set) {
    this.data = [];
  }

  var values = value.split(/\s+/);
  var a = 0;

  for (var i in values) {
    var d = values[i];

    if (d.indexOf(":") >= 0) {
      a = parseInt(d, 16);

      if (isNaN(a)) {
        return "invalid input address";
      }

      continue;
    }

    if (d !== '') {
      var d = parseInt(d, 16);

      if (isNaN(d)) {
        return "invalid input data";
      }

      if (set) {
        while (this.data.length < a) {
          this.data.push(0);
        }

        this.data[a] = d;
        a++;
      }
    }
  }

  if (set) {
    this.pending();
  }

  return null;
};
/**
 * Clone this component object.
 * @returns {Memory}
 */


Memory.prototype.clone = function () {
  var copy = new Memory();
  copy.data = this.data.slice();
  copy.size = this.size;
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Memory.prototype.load = function (obj) {
  this.data = obj['data'];
  this.size = obj['size'];
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*} Object
 */


Memory.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.data = this.data;
  obj.size = this.size;
  return obj;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Memory.prototype.draw = function (context, view) {
  var bytes = this.size / 8;
  this.selectStyle(context, view);
  this.drawBox(context);
  var addrStr = this.lastAddress !== null ? _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.lastAddress, 4) : '????';
  var dataStr = this.lastData !== null ? _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.lastData, bytes * 2) : '????????'.substr(0, bytes * 2);
  context.font = "12px Times";
  context.textAlign = "center";

  if (bytes < 4) {
    context.fillText(addrStr + ":" + dataStr, this.x, this.y + this.height / 2 - 18);
  } else {
    context.fillText(addrStr + ":", this.x, this.y + this.height / 2 - 18 - 13);
    context.fillText(dataStr, this.x, this.y + this.height / 2 - 18);
  }

  context.fillText("memory", this.x, this.y + this.height / 2 - 5);
  this.drawName(context, 0, 3);
  this.drawIO(context, view);

  if (this.badAddr) {
    var savedStyle = context.strokeStyle;
    context.strokeStyle = '#ff0000';
    var sz = 12;
    var x = this.x - 12;
    var y = this.y - 33;
    context.beginPath();
    context.moveTo(x - sz / 2, y - sz / 2);
    context.lineTo(x + sz / 2, y + sz / 2);
    context.moveTo(x + sz / 2, y - sz / 2);
    context.lineTo(x - sz / 2, y + sz / 2);
    context.stroke();
    context.strokeStyle = savedStyle;
  }
};

Memory.prototype.properties = function (main) {
  var _this = this;

  //
  // Generate the hex representation of the memory
  //
  var data = '';

  for (var a = 0; a < this.data.length; a++) {
    if (a % 8 === 0) {
      if (data.length > 0) {
        data += "\n";
      }

      data += _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(a, 4) + ":";
    }

    data += " " + _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.data[a], 2);
  }

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_3__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var sizeId = dlg.uniqueId();
  var html = "<div class=\"control\">\n<label for=\"".concat(id, "\">Contents:\n<textarea class=\"code1\" type=\"text\" rows=\"9\" name=\"").concat(id, "\" id=\"").concat(id, "\" spellcheck=\"false\">").concat(data, "</textarea>\n</label>\n</div>\n<div class=\"control center\">\n<label>Size: \n<select name=\"").concat(sizeId, "\" id=\"").concat(sizeId, "\">\n");

  for (var _i3 = 0, _arr = [8, 16, 32]; _i3 < _arr.length; _i3++) {
    var size = _arr[_i3];
    var selected = this.size === size ? ' selected' : '';
    html += "<option value=\"".concat(size, "\"").concat(selected, ">").concat(size, "</option>");
  }

  html += "</select>\n</label>\n</div>";
  dlg.extra(html, function () {
    var value = document.getElementById(id).value;
    return _this.setAsString(value, false);
  }, function () {
    _this.size = document.getElementById(sizeId).value;
    var value = document.getElementById(id).value;
    return _this.setAsString(value);
  }, 85);
  dlg.open();
};
/**
 * Create a PaletteImage object for memory component
 */


Memory.paletteImage = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_5__.PaletteImage(120, 120);
  var context = paletteImage.context;
  context.lineWidth = 1.5;
  paletteImage.box(40, 80);
  var w = paletteImage.width;
  var h = paletteImage.height;
  var ioY = 18;
  paletteImage.io(0, -40, 'n');
  var lw = paletteImage.lineWidth(2);
  paletteImage.io(20, -ioY, 'e');
  paletteImage.io(-20, -ioY, 'w');
  paletteImage.io(-20, ioY, 'w');
  paletteImage.lineWidth(lw);
  var font = '20px Times';
  paletteImage.drawText('R', 10, -ioY + 5, font);
  paletteImage.drawText('A', -12, -ioY + 5, font);
  paletteImage.drawText('W', -12, ioY + 5, font);
  var sz = 7;
  context.beginPath();
  context.moveTo(-sz + w / 2, -40 + h / 2);
  context.lineTo(w / 2, -40 + sz + h / 2);
  context.lineTo(sz + w / 2, -40 + h / 2);
  context.stroke();
  paletteImage.drawText("memory", 0, 38, "8px Times");
  paletteImage.drawText("0000:0000", 0, 32, "8px Times");
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Memory16.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Memory16.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory16": () => (/* binding */ Memory16)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Connector */ "./packages/cirsim/src/Cirsim/Connector.js");
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");






/**
 * Component: 16-bit memory

 * @constructor
 * @deprecated Use Memory instead
 */

var Memory16 = function Memory16() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 132;
  this.width = 64;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.lastClk = false;
  this.data = [];
  this.lastAddress = 0;
  this.lastData = 0;
  this.write = 0;
  this.addIn(-w2, -32, 16, "A").bus = true;
  this.addIn(-w2, 32, 16, "W").bus = true;
  var clk = this.addIn(0, -h2, 14);
  clk.orientation = 'n';
  clk.clock = true;
  this.addOut(w2, -32, 16, "R").bus = true;
};
Memory16.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Memory16.prototype.constructor = Memory16;
Memory16.prototype.prefix = "M";
Memory16.type = "Memory16"; ///< Name to use in files

Memory16.label = "Memory"; ///< Label for the palette

Memory16.desc = "16-bit Memory"; ///< Description for the palette

Memory16.img = null; ///< Image to use for the palette

Memory16.description = "<h2>16-bit Memory Bank</h2><p>The Memory component implements a simple 16-bit Memory Bank.\nMemory is an array of bytes. The A (address) input selects a memory location that is output on the R\noutput. The component implements 16-bit memory,\nso all accesses are considered to be multiples of two and retrieve two bytes. Memory is retrieved in little-endian\nmode (first byte is the least significant byte).</p>\n<p>A clock cycle on the clock input writes the memory component with the value on the W (write) input.</p>";
Memory16.order = 704;
Memory16.help = 'memory16';
/**
 * Compute the gate result
 * @param state
 */

Memory16.prototype.compute = function (state) {
  // What is the address?
  var a = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[0]);

  if (a === null) {
    this.outs[0].set(undefined);
  } else {
    if (state[2] && !this.lastClk) {
      // Leading edge
      this.write = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[1]);

      if (this.write !== null) {
        // Ensure the address exists...
        while (this.data.length < a + 2) {
          this.data.push(0);
        }

        var hi = this.write >> 8;
        var lo = this.write & 0xff;
        this.data[a] = lo;
        this.data[a + 1] = hi;
      }
    }

    if (a < this.data.length - 1) {
      var o = this.data[a] + (this.data[a + 1] << 8);
    } else {
      var o = 0;
    }

    this.lastAddress = a;
    this.lastData = o;
    var data = [];

    for (var i = 0; i < 16; i++) {
      data.push((o & 1) == 1);
      o >>= 1;
    }

    this.outs[0].set(data);
  }

  this.lastClk = state[2];
};

Memory16.prototype.setAsString = function (value, set) {
  value = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_4__.Sanitize.sanitize(value);

  if (set === undefined) {
    set = true;
  }

  if (set) {
    this.data = [];
  }

  var values = value.split(/\s+/);
  var a = 0;

  for (var i in values) {
    var d = values[i];

    if (d.indexOf(":") >= 0) {
      a = parseInt(d, 16);

      if (isNaN(a)) {
        return "invalid input address";
      }

      continue;
    }

    if (d !== '') {
      var d = parseInt(d, 16);

      if (isNaN(d)) {
        return "invalid input data";
      }

      if (set) {
        while (this.data.length < a) {
          this.data.push(0);
        }

        this.data[a] = d;
        a++;
      }
    }
  }

  if (set) {
    this.pending();
  }

  return null;
};
/**
 * Clone this component object.
 * @returns {Memory16}
 */


Memory16.prototype.clone = function () {
  var copy = new Memory16();
  copy.data = this.data.slice();
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Memory16.prototype.load = function (obj) {
  this.data = obj['data'];
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*} Object
 */


Memory16.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.data = this.data;
  return obj;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Memory16.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawBox(context);
  context.font = "12px Times";
  context.textAlign = "center";
  context.fillText(_Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.lastAddress, 4) + ":" + _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.lastData, 4), this.x, this.y + this.height / 2 - 18);
  context.fillText("memory", this.x, this.y + this.height / 2 - 5);
  this.drawName(context, 0, 3);
  this.drawIO(context, view);
};

Memory16.prototype.properties = function (main) {
  var _this = this;

  //
  // Generate the hex representation of the memory
  //
  var data = '';

  for (var a = 0; a < this.data.length; a++) {
    if (a % 8 === 0) {
      if (data.length > 0) {
        data += "\n";
      }

      data += _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(a, 4) + ":";
    }

    data += " " + _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.data[a], 2);
  }

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_3__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = "<div class=\"control\"><label for=\"".concat(id, "\">Contents:</label>\n<textarea class=\"code1\" type=\"text\" rows=\"9\" name=\"").concat(id, "\" id=\"").concat(id, "\" spellcheck=\"false\">").concat(data, "</textarea>\n</div>");
  dlg.extra(html, function () {
    var value = document.getElementById(id).value;
    return _this.setAsString(value, false);
  }, function () {
    var value = document.getElementById(id).value;
    return _this.setAsString(value);
  }, 85);
  dlg.open();
};
/**
 * Create a PaletteImage object for memory component
 */


Memory16.paletteImage = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_5__.PaletteImage(120, 120);
  var context = paletteImage.context;
  context.lineWidth = 1.5;
  paletteImage.box(40, 80);
  var w = paletteImage.width;
  var h = paletteImage.height;
  var ioY = 18;
  paletteImage.io(0, -40, 'n');
  var lw = paletteImage.lineWidth(2);
  paletteImage.io(20, -ioY, 'e');
  paletteImage.io(-20, -ioY, 'w');
  paletteImage.io(-20, ioY, 'w');
  paletteImage.lineWidth(lw);
  var font = '20px Times';
  paletteImage.drawText('R', 10, -ioY + 5, font);
  paletteImage.drawText('A', -12, -ioY + 5, font);
  paletteImage.drawText('W', -12, ioY + 5, font);
  var sz = 7;
  context.beginPath();
  context.moveTo(-sz + w / 2, -40 + h / 2);
  context.lineTo(w / 2, -40 + sz + h / 2);
  context.lineTo(sz + w / 2, -40 + h / 2);
  context.stroke();
  paletteImage.drawText("memory", 0, 38, "8px Times");
  paletteImage.drawText("0000:0000", 0, 32, "8px Times");
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Nand.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Nand.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nand": () => (/* binding */ Nand)
/* harmony export */ });
/* harmony import */ var _And__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./And */ "./packages/cirsim/src/Cirsim/Component/And.js");

/**
 * Component: NAND gate
 * @constructor
 */

var Nand = function Nand() {
  _And__WEBPACK_IMPORTED_MODULE_0__.And.call(this, name); // Replace the regular output with an inverse output

  this.outs = [];
  this.addOutInv(32, 0, 16);
};
Nand.prototype = Object.create(_And__WEBPACK_IMPORTED_MODULE_0__.And.prototype);
Nand.prototype.constructor = Nand;
Nand.type = "Nand"; ///< Name to use in files

Nand.label = "NAND"; ///< Label for the palette

Nand.desc = "NAND gate"; ///< Description for the palette

Nand.order = 16; ///< Order of presentation in the palette

Nand.description = '<h2>NAND Gate</h2><p>The output of a NAND ' + 'gate is <em>false</em> if and only if both' + ' inputs are true.</p>';
Nand.help = 'nand';
/**
 * Clone this component object: a NAND gate
 * @returns {Nand}
 * @instance Nand
 */

Nand.prototype.clone = function () {
  var copy = new Nand();
  copy.copyFrom(this);
  return copy;
};
/**
 * Create a PaletteImage object for a NAND gate
 */


Nand.paletteImage = function () {
  var paletteImage = _And__WEBPACK_IMPORTED_MODULE_0__.And.paletteImageBase();
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_0__.And.leftX, -16, 'w');
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_0__.And.leftX, +16, 'w');
  paletteImage.io(_And__WEBPACK_IMPORTED_MODULE_0__.And.rightX + 10, 0, 'e');
  paletteImage.circle(_And__WEBPACK_IMPORTED_MODULE_0__.And.rightX + 5, 0, 5);
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Nor.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Nor.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nor": () => (/* binding */ Nor)
/* harmony export */ });
/* harmony import */ var _Or__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Or */ "./packages/cirsim/src/Cirsim/Component/Or.js");

/**
 * Component: NOR gate
 */

var Nor = function Nor() {
  _Or__WEBPACK_IMPORTED_MODULE_0__.Or.call(this, name); // Replace the regular output with an inverse output

  this.outs = [];
  this.addOutInv(32, 0, 16);
};
Nor.prototype = Object.create(_Or__WEBPACK_IMPORTED_MODULE_0__.Or.prototype);
Nor.prototype.constructor = Nor;
Nor.type = "Nor"; ///< Name to use in files

Nor.label = "NOR"; ///< Label for the palette

Nor.desc = "NOR gate"; ///< Description for the palette

Nor.img = "nor.png"; ///< Image to use for the palette

Nor.order = 30; ///< Order of presentation in the palette

Nor.description = "<h2>NOR Gate</h2><p>The output of a NOR gate is <em>false</em> if either or both \n inputs are true. Otherwise, it is true.</p>";
Nor.help = 'nor';
/**
 * Clone this component object.
 * @returns {Nor}
 */

Nor.prototype.clone = function () {
  var copy = new Nor();
  copy.copyFrom(this);
  return copy;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/One.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/One.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "One": () => (/* binding */ One)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");


/**
 * Component: One (fixed true) gate
 * @param name Name assigned to this component
 * @constructor
 */

var One = function One() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16;
  this.width = 16; // One output

  this.addOut(8, 0, 8);
  this.outs[0].set(true);
};
One.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
One.prototype.constructor = One;
One.prototype.prefix = null; ///< No component naming

One.type = "One"; ///< Name to use in files

One.label = "1"; ///< Label for the palette

One.desc = "1 (true)"; ///< Description for the palette

One.description = '<h2>One</h2><p>A simple true value.</p>';
One.order = 1; ///< Order of presentation in the palette

One.help = 'one'; ///< Help page is available

/**
 * Compute the gate result
 * @param state
 */

One.prototype.compute = function (state) {
  this.outs[0].set(true);
};
/**
 * Clone this component object.
 * @returns {One}
 */


One.prototype.clone = function () {
  var copy = new One();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


One.prototype.draw = function (context, view) {
  // Select the style to draw
  this.selectStyle(context, view);
  this.drawBox(context);
  this.drawText(context, '1', 0, 5, "14px Times");
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for the component
 */


One.paletteImage = function () {
  var size = 16; // Box size

  var width = 60; // Image width

  var height = 30; // Image height

  var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(width, height);
  pi.box(size, size);
  pi.io(size / 2, 0, 'e');
  pi.drawText("1", 0, 5, "14px Times");
  return pi;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Or.js":
/*!****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Or.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Or": () => (/* binding */ Or)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/CanvasHelper */ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");
/* harmony import */ var _And__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./And */ "./packages/cirsim/src/Cirsim/Component/And.js");




/**
 * Component: OR gate

 * @constructor
 */

var Or = function Or() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 64; //
  // This math computes the location of the pins
  // relative to the arc on the left side of the OR gate
  //

  var offset = Or.offsetX;
  var a = Math.atan2(this.height / 2, offset);
  var r = offset / Math.cos(a);
  var pinY = 16;
  var pinX = Math.sqrt(r * r - pinY * pinY) - offset; // Two inputs and one output

  this.addIn(-32 + pinX, -pinY, 16 + pinX);
  this.addIn(-32 + pinX, pinY, 16 + pinX);
  this.addOut(32, 0, 16);
};
Or.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Or.prototype.constructor = Or;
Or.offsetX = 40; ///< Left side offset for left arc

Or.offsetY = 30; ///< Lower offset to right arcs

Or.type = "Or"; ///< Name to use in files

Or.label = "OR"; ///< Label for the palette

Or.desc = "OR gate"; ///< Description for the palette
// Or.img = "or.png";         ///< Image to use for the palette

Or.order = 20; ///< Order of presentation in the palette

Or.description = "<h2>OR Gate</h2><p>The output of an OR gate is <em>true</em> \nif either or both inputs are true. Otherwise, it is false.</p>";
Or.help = 'or';
/**
 * Compute the gate result
 * @param state
 */

Or.prototype.compute = function (state) {
  if (state[0] || state[1]) {
    this.outs[0].set(true);
  } else if (state[0] === undefined || state[1] === undefined) {
    this.outs[0].set(undefined);
  } else {
    this.outs[0].set(false);
  }
};
/**
 * Clone this component object.
 * @returns {Or}
 */


Or.prototype.clone = function () {
  var copy = new Or();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Or.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  Or.draw(context, this.x, this.y, this.width, this.height);
  this.drawName(context, -2, 5);
  this.drawIO(context, view);
};

Or.draw = function (context, x, y, width, height) {
  Or.path(context, x, y, width, height);
  _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__.CanvasHelper.fillWith(context);
  context.stroke();
};

Or.path = function (context, x, y, width, height) {
  var leftX = x - width / 2 - 0.5;
  var rightX = x + width / 2 + 0.5;
  var topY = y - height / 2 - 0.5;
  var botY = y + height / 2 + 0.5;
  context.beginPath(); // Left side

  var offsetX = Or.offsetX;
  var a = Math.atan2(height / 2, offsetX);
  var r = offsetX / Math.cos(a);
  context.arc(leftX - offsetX, y, r, -a, a);
  var offsetY = (width / 2 * (width / 2) - height / 2 * (height / 2)) / height;
  r = height / 2 + offsetY;
  a = Math.atan2(offsetY, width / 2); // Bottom

  context.lineTo(x, botY);
  context.arc(x, y - offsetY, r, Math.PI / 2, a, true); // Top

  context.arc(x, y + offsetY, r, -a, -Math.PI / 2, true);
  context.lineTo(leftX, topY);
};
/**
 * Create a PaletteImage object for an Or gate
 * This is the base shape without input/outputs
 * so we can use this code for 3-4 inputs and NOR
 */


Or.paletteImageBase = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_2__.PaletteImage(120, 70);
  var context = paletteImage.context;
  context.lineWidth = 1.5;
  var x = paletteImage.width / 2;
  var y = paletteImage.height / 2;
  var width = 0.5 * paletteImage.width;
  var height = 0.65 * paletteImage.height;
  var leftX = x - width / 2 - 0.5;
  var rightX = x + width / 2 + 0.5;
  var topY = Math.round(y - height / 2) - 0.5;
  var botY = Math.round(y + height / 2) + 0.5;
  context.beginPath(); // Left side

  var offsetX = Or.offsetX;
  var a = Math.atan2(height / 2, offsetX);
  var r = offsetX / Math.cos(a);
  context.arc(leftX - offsetX, y, r, -a, a);
  var offsetY = (width / 2 * (width / 2) - height / 2 * (height / 2)) / height;
  r = height / 2 + offsetY;
  a = Math.atan2(offsetY, width / 2);
  this.leftX = leftX - paletteImage.width / 2 + 3;
  this.rightX = rightX - paletteImage.width / 2; // Bottom

  context.lineTo(x, botY);
  context.arc(x, y - offsetY, r, Math.PI / 2, a, true); // Top

  context.arc(x, y + offsetY, r, -a, -Math.PI / 2, true);
  context.lineTo(leftX, topY);
  paletteImage.fillStroke();
  paletteImage.io(this.rightX, 0, 'e');
  return paletteImage;
};
/**
 * Create a PaletteImage object for an Or gate
 */


Or.paletteImage = function () {
  var paletteImage = Or.paletteImageBase();
  paletteImage.io(this.leftX, -16, 'w');
  paletteImage.io(this.leftX, +16, 'w');
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Or3.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Or3.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Or3": () => (/* binding */ Or3)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Or__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Or */ "./packages/cirsim/src/Cirsim/Component/Or.js");


/**
 * Component: 3-input OR gate

 * @constructor
 */

var Or3 = function Or3() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 64; //
  // This math computes the location of the pins
  // relative to the arc on the left side of the OR gate
  //

  var offset = Or3.offsetX;
  var a = Math.atan2(this.height / 2, offset);
  var r = offset / Math.cos(a);
  var pinY = 16;
  var pinX = Math.sqrt(r * r - pinY * pinY) - offset;
  var pinY2 = 2;
  var pinX2 = Math.sqrt(r * r - pinY2 * pinY2) - offset; // Three inputs and one output

  this.addIn(-32 + pinX, -pinY, 16 + pinX);
  this.addIn(-32 + pinX2, 0, 16 + pinX2);
  this.addIn(-32 + pinX, pinY, 16 + pinX);
  this.addOut(32, 0, 16);
};
Or3.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Or3.prototype.constructor = Or3;
Or3.offsetX = 40; ///< Left side offset for left arc

Or3.offsetY = 30; ///< Lower offset to right arcs

Or3.type = "Or3"; ///< Name to use in files

Or3.label = "OR"; ///< Label for the palette

Or3.desc = "OR gate"; ///< Description for the palette
//Or3.img = "or3.png";         ///< Image to use for the palette

Or3.order = 21; ///< Order of presentation in the palette

Or3.description = '<h2>OR Gate</h2><p>The output of a three-input OR ' + 'gate is <em>true</em> if any of of the' + ' inputs are true. Otherwise, it is false.</p>';
/**
 * Compute the gate result
 * @param state
 */

Or3.prototype.compute = function (state) {
  if (state[0] || state[1] || state[2]) {
    this.outs[0].set(true);
  } else if (state[0] === undefined || state[1] === undefined || state[2] === undefined) {
    this.outs[0].set(undefined);
  } else {
    this.outs[0].set(false);
  }
};
/**
 * Clone this component object.
 * @returns {Or3}
 */


Or3.prototype.clone = function () {
  var copy = new Or3();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Or3.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  _Or__WEBPACK_IMPORTED_MODULE_1__.Or.draw(context, this.x, this.y, this.width, this.height);
  this.drawName(context, -2, 5);
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for an Or gate
 */


Or3.paletteImage = function () {
  var paletteImage = _Or__WEBPACK_IMPORTED_MODULE_1__.Or.paletteImageBase();
  paletteImage.io(_Or__WEBPACK_IMPORTED_MODULE_1__.Or.leftX, -16, 'w');
  paletteImage.io(_Or__WEBPACK_IMPORTED_MODULE_1__.Or.leftX, 0, 'w');
  paletteImage.io(_Or__WEBPACK_IMPORTED_MODULE_1__.Or.leftX, +16, 'w');
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Or4.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Or4.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Or4": () => (/* binding */ Or4)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Or__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Or */ "./packages/cirsim/src/Cirsim/Component/Or.js");
/* harmony import */ var _Or3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Or3 */ "./packages/cirsim/src/Cirsim/Component/Or3.js");



/**
 * Component: OR gate

 * @constructor
 */

var Or4 = function Or4() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 64;
  this.width = 64; //
  // This math computes the location of the pins
  // relative to the arc on the left side of the OR gate
  //

  var offset = Or4.offsetX;
  var a = Math.atan2(this.height / 2, offset);
  var r = offset / Math.cos(a);
  var pinY = 8;
  var pinX = Math.sqrt(r * r - pinY * pinY) - offset;
  var pinY2 = 8 + 16;
  var pinX2 = Math.sqrt(r * r - pinY2 * pinY2) - offset; // Four inputs and one output

  this.addIn(-32 + pinX2, -pinY2, 16 + pinX2);
  this.addIn(-32 + pinX, -pinY, 16 + pinX);
  this.addIn(-32 + pinX, pinY, 16 + pinX);
  this.addIn(-32 + pinX2, pinY2, 16 + pinX2);
  this.addOut(32, 0, 16);
};
Or4.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Or4.prototype.constructor = Or4;
Or4.offsetX = 40; ///< Left side offset for left arc

Or4.offsetY = 30; ///< Lower offset to right arcs

Or4.type = "Or4"; ///< Name to use in files

Or4.label = "OR"; ///< Label for the palette

Or4.desc = "OR gate"; ///< Description for the palette
//Or4.img = "or4.png";         ///< Image to use for the palette

Or4.order = 22; ///< Order of presentation in the palette

Or4.description = '<h2>OR Gate</h2><p>The output of a four-input OR ' + 'gate is <em>true</em> if any of of the' + ' inputs are true. Otherwise, it is false.</p>';
/**
 * Compute the gate result
 * @param state
 */

Or4.prototype.compute = function (state) {
  if (state[0] || state[1] || state[2] || state[3]) {
    this.outs[0].set(true);
  } else if (state[0] === undefined || state[1] === undefined || state[2] === undefined || state[3] === undefined) {
    this.outs[0].set(undefined);
  } else {
    this.outs[0].set(false);
  }
};
/**
 * Clone this component object.
 * @returns {Or4}
 */


Or4.prototype.clone = function () {
  var copy = new Or4();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Or4.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  _Or__WEBPACK_IMPORTED_MODULE_1__.Or.draw(context, this.x, this.y, this.width, this.height);
  this.drawName(context, -2, 5);
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for an Or gate
 */


Or4.paletteImage = function () {
  var paletteImage = _Or__WEBPACK_IMPORTED_MODULE_1__.Or.paletteImageBase();
  paletteImage.io(_Or__WEBPACK_IMPORTED_MODULE_1__.Or.leftX, -16, 'w');
  paletteImage.io(_Or__WEBPACK_IMPORTED_MODULE_1__.Or.leftX, -5.5, 'w');
  paletteImage.io(_Or__WEBPACK_IMPORTED_MODULE_1__.Or.leftX, +5.5, 'w');
  paletteImage.io(_Or__WEBPACK_IMPORTED_MODULE_1__.Or.leftX, +16, 'w');
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/OutPin.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/OutPin.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutPin": () => (/* binding */ OutPin)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/Led */ "./packages/cirsim/src/Cirsim/Graphics/Led.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");
/* harmony import */ var _Value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Value */ "./packages/cirsim/src/Cirsim/Value.js");





/**
 * Component: OutPin output pin

 * @constructor
 */

var OutPin = function OutPin() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16;
  this.width = 64;
  this.color = 'green';
  this.led = new _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led(-19, 0, 7); // One input

  this.addIn(-32, 0, 16);
};
OutPin.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
OutPin.prototype.constructor = OutPin;
OutPin.prototype.prefix = "O";
OutPin.prototype.nameRequired = true;
OutPin.type = "OutPin"; ///< Name to use in files

OutPin.label = "Out Pin"; ///< Label for the palette

OutPin.desc = "Output Pin"; ///< Description for the palette

OutPin.img = "outpin.png"; ///< Image to use for the palette

OutPin.order = 3; ///< Order of presentation in the palette

OutPin.description = "<h2>Ouput Pin</h2><p>An OUT pin serves as output \nfor a circuit. The LED indicates if the input is true (led illuminated), false \n(black), or undefined (?).</p>";
OutPin.help = 'outpin';
/**
 * This function is called when an input is changed on this
 * component.
 *
 * There is no delay for an output pin
 */

OutPin.prototype.pending = function () {};

OutPin.prototype.get = function () {
  return this.ins[0].value;
};

OutPin.prototype.getAsString = function () {
  switch (this.ins[0]) {
    case true:
      return "1";

    case false:
      return "0";

    default:
      return "?";
  }
};

OutPin.prototype.getAsValue = function () {
  return new _Value__WEBPACK_IMPORTED_MODULE_4__.Value(this.ins[0].value);
};
/**
 * Clone this component object.
 * @returns {OutPin}
 */


OutPin.prototype.clone = function () {
  var copy = new OutPin();
  copy.color = this.color;
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


OutPin.prototype.load = function (obj) {
  if (obj['color'] !== undefined) {
    this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.sanitize(obj["color"]);
  }

  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


OutPin.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);

  if (this.color !== 'green') {
    obj.color = this.color;
  }

  return obj;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


OutPin.prototype.draw = function (context, view) {
  var value = this.get(); // Component background

  var background = this.value ? "white" : "#dddddd";
  this.outlinePath(context);
  context.fillStyle = background;
  context.fill();

  if (this.color !== 'none') {
    // LED
    this.led.color = value === undefined ? "undefined" : value ? this.color : "off";
    this.led.draw(context, this.x, this.y, background);
  } // Select the style to draw the rest


  this.selectStyle(context, view); // Box for the component

  this.outlinePath(context);
  context.stroke(); // Name

  context.beginPath();
  context.font = "14px Times";
  context.textAlign = "center";

  if (this.color !== 'none') {
    var val = value === undefined ? "?" : value ? "1" : "0";
    var x = this.x + 9;

    if (this.naming !== null) {
      context.fillText(this.naming + ": " + val, x, this.y + 5);
    } else {
      context.fillText(val, x, this.y + 5);
    }
  } else {
    var _x = this.x + 4;

    if (this.naming !== null) {
      context.fillText(this.naming, _x, this.y + 5);
    }
  }

  this.drawIO(context, view);
};

OutPin.prototype.outlinePath = function (context) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.moveTo(leftX, this.y);
  context.lineTo(leftX + this.height / 2, botY);
  context.lineTo(rightX, botY);
  context.lineTo(rightX, topY);
  context.lineTo(leftX + this.height / 2, topY);
  context.lineTo(leftX, this.y);
};

OutPin.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__.ComponentPropertiesDlg(this, main);
  var html = "<div class=\"control1 center\">"; // Color

  var colorId = dlg.uniqueId();
  html += _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led.colorSelector(colorId, this.color, true);
  html += '</div>';
  dlg.extra(html, function () {
    return null;
  }, function () {
    _this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.sanitize(document.getElementById(colorId).value);
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/OutPinBus.js":
/*!***********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/OutPinBus.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutPinBus": () => (/* binding */ OutPinBus)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Value */ "./packages/cirsim/src/Cirsim/Value.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");




/**
 * Component: OutPinBus gate
 */

var OutPinBus = function OutPinBus() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.value = new _Value__WEBPACK_IMPORTED_MODULE_2__.Value();
  this.narrow = false;
  this.height = 16;
  this.width = 96; // One input

  this.addIn(-this.width / 2, 0, 16).bus = true;
};
OutPinBus.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
OutPinBus.prototype.constructor = OutPinBus;
OutPinBus.prototype.prefix = "O";
OutPinBus.prototype.nameRequired = true;
OutPinBus.type = "OutPinBus"; ///< Name to use in files

OutPinBus.label = "Bus Output"; ///< Label for the palette

OutPinBus.desc = "Bus Output Pin"; ///< Description for the palette

OutPinBus.img = "outpinbus.png"; ///< Image to use for the palette

OutPinBus.order = 302; ///< Order of presentation in the palette

OutPinBus.description = "<h2>Bus Output Pin</h2>\n<p>An Bus Out pin serves as output for a bus in a circuit.</p>\n<p>The output format is selectable. Auto format will display values \nwith eight or fewer digits as binary and larger values in hex.</p>";
OutPinBus.help = 'outpinbus';
/**
 * Compute the result
 * @param state
 */

OutPinBus.prototype.compute = function (state) {
  this.value.set(state[0]);
};

OutPinBus.prototype.get = function () {
  return this.value.get();
};

OutPinBus.prototype.getAsString = function () {
  return this.value.getAsString();
};

OutPinBus.prototype.getAsValue = function () {
  return new _Value__WEBPACK_IMPORTED_MODULE_2__.Value(this.value);
};
/**
 * Clone this component object.
 * @returns {OutPinBus}
 */


OutPinBus.prototype.clone = function () {
  var copy = new OutPinBus();
  copy.copyFrom(this);
  copy.value = this.value.clone();
  return copy;
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


OutPinBus.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  this.value.save(obj);

  if (this.narrow) {
    obj.narrow = this.narrow;
  }

  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


OutPinBus.prototype.load = function (obj) {
  this.value.load(obj);
  this.setNarrow(_Utility_Sanitize__WEBPACK_IMPORTED_MODULE_3__.Sanitize.boolean(obj.narrow));
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


OutPinBus.prototype.draw = function (context, view) {
  // Component background
  this.outlinePath(context);
  context.fillStyle = "#dddddd";
  context.fill(); // Select the style to draw the rest

  this.selectStyle(context, view); // Box for the component

  this.outlinePath(context);
  context.stroke();
  var x = this.x + this.height / 4;

  if (this.narrow) {
    // Some adjustments of the X location
    // to make the narrow presentation look nicer
    x = x - 2;
  }

  this.value.draw(context, x, this.y, this.width - this.height / 2, this.naming);
  this.drawIO(context, view);
};

OutPinBus.prototype.outlinePath = function (context) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5;
  context.beginPath();
  context.moveTo(leftX, this.y);
  context.lineTo(leftX + this.height / 2, botY);
  context.lineTo(rightX, botY);
  context.lineTo(rightX, topY);
  context.lineTo(leftX + this.height / 2, topY);
  context.lineTo(leftX, this.y);
};

OutPinBus.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var content = this.value.dialogContent(dlg);
  var html = content.html + "<input type=\"checkbox\" id=\"".concat(id, "\" name=\"").concat(id, "\"").concat(this.narrow ? " checked" : "", "> <label for=\"").concat(id, "\">Narrow</label>");
  dlg.extra(html, content.validate, function () {
    content.accept();

    _this.setNarrow(document.getElementById(id).checked);
  });
  dlg.open();
};

OutPinBus.prototype.setNarrow = function (narrow) {
  this.narrow = narrow;
  this.width = narrow ? 48 : 96;
  this.ins[0].x = -this.width / 2;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Pad.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Pad.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pad": () => (/* binding */ Pad)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/Button */ "./packages/cirsim/src/Cirsim/Graphics/Button.js");
/* harmony import */ var _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphics/CanvasHelper */ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js");
/* harmony import */ var _Value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Value */ "./packages/cirsim/src/Cirsim/Value.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Clock */ "./packages/cirsim/src/Cirsim/Component/Clock.js");
/* harmony import */ var _DFF__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DFF */ "./packages/cirsim/src/Cirsim/Component/DFF.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








/**
 * Component: Pad
 * Configurable keypad for button presses

 * @constructor
 */

var Pad = function Pad() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 150;
  this.width = 150;
  this.value = new _Value__WEBPACK_IMPORTED_MODULE_3__.Value();
  this.bus = true;
  this.bits = 4;
  this.clockDelay = 0; // The type of pad, null until we define it

  this.pad = null;
  this.setType(16);
  this.setAsInteger(0);
  this.setPressedOut(false);
};
Pad.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Pad.prototype.constructor = Pad;
Pad.prototype.prefix = "P";
Pad.prototype.nameRequired = true;
Pad.type = "Pad"; ///< Name to use in files

Pad.label = "Pad"; ///< Label for the palette

Pad.desc = "Configurable Keypad"; ///< Description for the palette

Pad.img = 'pad.png';
Pad.description = "<h2>Configurable Keypad</h2>\n<p>Presents a keypad with from 4 to 16 buttons. If configured as a bus output, there are two outputs. \nThe top output is the bus output and is the \nmost recently pressed button value. If configured for single bit output, there will be 2-4 output bits\nthe represent the most recently pressed button. \nThe bottom output is the clock and is true when the button is pressed.</p>";
Pad.order = 500;
Pad.help = 'pad';

Pad.prototype.setType = function (pad) {
  var _this = this;

  if (this.pad === pad) {
    this.ensureIO();
    return;
  }

  var size = 30;
  var gap = 5;

  var set16 = function set16() {
    _this.pad = 16;
    var a = -size * 1.5 - gap * 1.5;
    var b = -size / 2 - gap / 2;
    var c = size / 2 + gap / 2;
    var d = size * 1.5 + gap * 1.5;
    var up = -8;
    _this.buttons = [new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('0', 0, a, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('1', 1, b, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('2', 2, c, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('3', 3, d, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('4', 4, a, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('5', 5, b, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('6', 6, c, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('7', 7, d, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('8', 8, a, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('9', 9, b, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('A', 10, c, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('B', 11, d, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('C', 12, a, d + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('D', 13, b, d + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('E', 14, c, d + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('F', 15, d, d + up, size)];
    _this.width = (size + gap) * 4 + gap * 2 + 4;
    _this.height = _this.width + 13 + 4;
    _this.bits = 4;
  };

  var set10 = function set10() {
    _this.pad = 10; // Columns

    var x = -size - gap;
    var y = 0;
    var z = size + gap; // Rows

    var a = -size * 1.5 - gap * 1.5;
    var b = -size / 2 - gap / 2;
    var c = size / 2 + gap / 2;
    var d = size * 1.5 + gap * 1.5;
    var up = -8;
    _this.buttons = [new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('1', 1, x, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('2', 2, y, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('3', 3, z, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('4', 4, x, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('5', 5, y, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('6', 6, z, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('7', 7, x, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('8', 8, y, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('9', 9, z, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('0', 0, y, d + up, size)];
    _this.width = (size + gap) * 3 + gap * 2 + 4;
    _this.height = (size + gap) * 4 + gap * 2 + 4 + 13 + 4;
    _this.bits = 4;
  };

  var set12 = function set12() {
    _this.pad = 12; // Columns

    var x = -size - gap;
    var y = 0;
    var z = size + gap; // Rows

    var a = -size * 1.5 - gap * 1.5;
    var b = -size / 2 - gap / 2;
    var c = size / 2 + gap / 2;
    var d = size * 1.5 + gap * 1.5;
    var up = -8;
    _this.buttons = [new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('1', 1, x, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('2', 2, y, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('3', 3, z, a + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('4', 4, x, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('5', 5, y, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('6', 6, z, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('7', 7, x, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('8', 8, y, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('9', 9, z, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('*', 10, x, d + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('0', 0, y, d + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('#', 11, z, d + up, size)];
    _this.width = (size + gap) * 3 + gap * 2 + 4;
    _this.height = (size + gap) * 4 + gap * 2 + 4 + 13 + 4;
    _this.bits = 4;
  };

  var set8 = function set8() {
    _this.pad = 8;
    var a = -size * 1.5 - gap * 1.5;
    var b = -size / 2 - gap / 2;
    var c = size / 2 + gap / 2;
    var d = size * 1.5 + gap * 1.5;
    var up = -8;
    _this.buttons = [new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('0', 0, a, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('1', 1, b, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('2', 2, c, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('3', 3, d, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('4', 4, a, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('5', 5, b, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('6', 6, c, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('7', 7, d, c + up, size)];
    _this.width = (size + gap) * 4 + gap * 2 + 4;
    _this.height = (size + gap) * 2 + gap * 2 + 4 + 13 + 4;
    _this.bits = 3;
  };

  var set4 = function set4() {
    _this.pad = 4;
    var b = -size / 2 - gap / 2;
    var c = size / 2 + gap / 2;
    var up = -8;
    _this.buttons = [new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('0', 0, b, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('1', 1, c, b + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('2', 2, b, c + up, size), new _Graphics_Button__WEBPACK_IMPORTED_MODULE_1__.Button('3', 3, c, c + up, size)];
    _this.width = (size + gap) * 2 + gap * 2 + 4;
    _this.height = (size + gap) * 2 + gap * 2 + 4 + 13 + 4;
    _this.bits = 2;
  };

  switch (pad) {
    case 16:
    case '16':
    default:
      set16();
      break;

    case 10:
    case '10':
      set10();
      break;

    case 12:
    case '12':
      set12();
      break;

    case 8:
    case '8':
      set8();
      break;

    case 4:
    case '4':
      set4();
      break;
  }

  this.ensureIO();
};
/**
 * Ensure the actual number of outputs matches the
 * defined bus size.
 */


Pad.prototype.ensureIO = function () {
  var spacing = 16;
  var i = 0;

  if (this.outs.length > 0) {
    //
    // Test if we switched output types or size
    // If so, disconnect everything
    //
    var clear = false;

    if (this.outs[0].bus !== this.bus) {
      // Changed bus status
      clear = true;
    }

    if (!this.bus && this.outs.length !== this.bits + 1) {
      // Changed number of bits required
      clear = true;
    }

    if (!clear) {
      // Ensure positions are correct...
      var _iterator = _createForOfIteratorHelper(this.outs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var out = _step.value;
          out.x = this.width / 2;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return; // We're good!
    }
  } // Clear all outputs


  for (i = 0; i < this.outs.length; i++) {
    this.outs[i].clear();
  }

  this.outs = [];
  var startY = 0;
  var len = 11;

  if (this.bus) {
    this.addOut(this.width / 2, -16, len).bus = true;
  } else {
    for (i = 0; i < this.bits; i++) {
      var pinY = startY - i * spacing; // Add any new pins

      this.addOut(this.width / 2, pinY, len);
    }
  }

  this.addOut(this.width / 2, 32, len);
  this.setOuts();
  this.setPressedOut(false);
};
/**
 * Clone this component object.
 * @returns {Pad}
 */


Pad.prototype.clone = function () {
  var copy = new Pad();
  copy.value = this.value.clone();
  copy.bus = this.bus;
  copy.setType(this.pad);
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Pad.prototype.draw = function (context, view) {
  var _this2 = this;

  var leftX = this.x - this.width / 2 - 0.5;
  var topY = this.y - this.height / 2 - 0.5; // Select the style

  var saveUS = this.unselectedStyle;
  this.unselectedStyle = '#f2f2f2';
  this.selectStyle(context, view);
  var saveFillStyle = context.fillStyle;
  var saveStrokeStyle = context.strokeStyle;
  var radius = 6; //
  // Background
  //

  context.fillStyle = "#111111";
  _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_2__.CanvasHelper.roundedRect(context, leftX, topY, this.width, this.height, radius);
  context.fill(); // Border

  var indent = 3;
  context.fillStyle = saveFillStyle;
  context.lineWidth = 2;
  _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_2__.CanvasHelper.roundedRect(context, leftX + indent, topY + indent, this.width - indent * 2, this.height - indent * 2, radius);
  context.stroke();
  context.lineWidth = 1;
  this.buttons.forEach(function (button) {
    button.draw(context, _this2.x, _this2.y);
  });
  this.drawName(context, 0, this.height / 2 - 8); // Restore

  context.lineWidth = 1;
  context.fillStyle = saveFillStyle;
  context.strokeStyle = saveStrokeStyle;
  this.unselectedStyle = saveUS;
  this.drawIO(context, view);
};

Pad.prototype.touch = function (x, y) {
  var size = this.size;

  if (x < this.x - size / 2 || x > this.x + size / 2 || y < this.y - size / 2 || y > this.y - size / 2) {
    return;
  }

  for (var i in this.buttons) {
    var button = this.buttons[i];

    if (button.touch(x - this.x, y - this.y)) {
      this.setAsInteger(button.value, 4);
      this.setPressedOut(true);
      break;
    }
  }

  return _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.touch.call(this, x, y);
};
/**
 * Set the value for the input
 * @param value to set
 */


Pad.prototype.set = function (value) {
  this.value.set(value);
  this.setOuts();
  this.updateUI();
};

Pad.prototype.setAsInteger = function (value) {
  this.value.setAsInteger(value, this.bits);
  this.setOuts();
  this.updateUI();
};

Pad.prototype.updateUI = function () {
  var p = this.value.getAsInteger();
  var pressed = this.getPressedOut();

  if (pressed === undefined) {
    pressed = false;
  }

  this.buttons.forEach(function (button) {
    if (button.value !== p) {
      button.setState('off');
    } else if (pressed) {
      button.setState('pressed');
    } else {
      button.setState('on');
    }
  });
};
/**
 * This function sets the pad state based on an input string.
 *
 * This accepts a simple value. It also accepts these strings:
 *
 *  release - Releases any currently pressed button
 *  press:X - Presses button X
 *
 * @param value
 * @param parseonly
 */


Pad.prototype.setAsString = function (value, parseonly) {
  if (value === 'release') {
    this.mouseUp();
  } else if (value.substr(0, 6) === 'press:') {
    this.value.setAsHex(value.substr(6));
    this.setPressedOut(true);
    this.updateUI();
  } else {
    this.value.setAsString(value, parseonly);
    this.updateUI();
  }

  if (!parseonly) {
    this.setOuts();
  }
};

Pad.prototype.setOuts = function () {
  if (this.bus) {
    this.outs[0].set(this.value.get());
  } else {
    for (var b = 0; b < this.bits; b++) {
      this.outs[b].set(this.value.getBit(b));
    }
  }
};
/**
 * Advance the animation for this component by delta seconds
 * @param delta Time to advance in seconds
 * @returns true if animation needs to be redrawn
 */


Pad.prototype.advance = function (delta) {
  // if(this.clockDelay > 0) {
  //     this.clockDelay -= delta;
  //     if(this.clockDelay < 0) {
  //         this.clockDelay = 0;    // No pending clock
  //         if(this.bus) {
  //             this.outs[1].set(true);
  //         } else {
  //             this.outs[this.bits].set(true);
  //         }
  //         this.updateUI();
  //         return true;
  //     }
  // }
  return false;
};
/**
 * Compute the gate result
 * @param state
 */


Pad.prototype.compute = function (state) {
  var value = state[0] === true;

  if (this.bus) {
    this.outs[1].set(value);
  } else {
    this.outs[this.bits].set(value);
  }

  this.updateUI();
};
/**
 * Set the button pressed output to a given value.
 * @param value Value to set
 */


Pad.prototype.setPressedOut = function (value) {
  var simulation = this.getSimulation();

  if (simulation !== null) {
    simulation.queue(this, 50, [value]);
  } // if(value) {
  //     // The clock rising edge output is delayed by 50ns
  //     this.clockDelay = 0.00000004; // 0.00000005;
  //
  //     this.getSimulation().queue(this, 50, [1]);
  // } else {
  //     // Setting to zero
  //     this.clockDelay = 0;    // No pending clock
  //     if(this.bus) {
  //         this.outs[1].set(value);
  //     } else {
  //         this.outs[this.bits].set(value);
  //     }
  //     this.updateUI();
  // }

};

Pad.prototype.getPressedOut = function () {
  if (this.bus) {
    return this.outs[1].get();
  } else {
    return this.outs[this.bits].get();
  }
};

Pad.prototype.mouseUp = function () {
  this.buttons.forEach(function (button) {
    button.untouch();
  });
  this.setPressedOut(false);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


Pad.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  this.value.save(obj);
  obj.pad = this.pad;
  obj.bus = this.bus;
  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Pad.prototype.load = function (obj) {
  this.value.load(obj);
  this.bus = obj.bus !== false;
  this.setType(obj.pad);
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};

Pad.prototype.properties = function (main) {
  var _this3 = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_4__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = '<div class="control center"><div class="choosers">';
  html += "\n<label><input type=\"radio\" name=\"".concat(id, "\" value=\"16\" ").concat(this.pad === 16 ? 'checked' : '', "> 16 Buttons (Hex)</label>\n<label><input type=\"radio\" name=\"").concat(id, "\" value=\"10\" ").concat(this.pad === 10 ? 'checked' : '', "> 10 Buttons </label>\n<label><input type=\"radio\" name=\"").concat(id, "\" value=\"8\" ").concat(this.pad === 8 ? 'checked' : '', "> 8 Buttons </label>\n<label><input type=\"radio\" name=\"").concat(id, "\" value=\"4\" ").concat(this.pad === 4 ? 'checked' : '', "> 4 Buttons </label>\n<label><input type=\"radio\" name=\"").concat(id, "\" value=\"12\" ").concat(this.pad === 12 ? 'checked' : '', "> Phone (12 buttons)</label>\n");
  html += '<br>';
  var busId = dlg.uniqueId();
  html += "\n<label><input type=\"radio\" name=\"".concat(busId, "\"  ").concat(this.bus ? 'checked' : '', " value=\"1\"> Bus Output</label>\n<label><input type=\"radio\" name=\"").concat(busId, "\" ").concat(!this.bus ? 'checked' : '', " value=\"0\"> Single Bit Outputs</label>");
  html += '</div></div>';
  dlg.extra(html, function () {
    return null;
  }, function () {
    _this3.bus = document.querySelector("input[name=".concat(busId, "]:checked")).value === '1';

    _this3.setType(document.querySelector("input[name=".concat(id, "]:checked")).value);
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Pc16.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Pc16.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pc16": () => (/* binding */ Pc16)
/* harmony export */ });
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Connector */ "./packages/cirsim/src/Cirsim/Connector.js");



/**
 * Component: Simple 16-bit program counter
 */

var Pc16 = function Pc16() {
  _Component__WEBPACK_IMPORTED_MODULE_1__.Component.call(this);
  this.height = 128;
  this.width = 64;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.value = 0;
  this.lastClk = false;
  this.ba = 0;
  var clk = this.addIn(0, -h2, 8);
  clk.orientation = 'n';
  clk.clock = true;
  this.addIn(-w2, -32, 16, "BA").bus = true;
  this.addIn(-w2, 32, 16, "B");
  var res = this.addIn(0, h2, 8, "R");
  res.orientation = 's';
  this.addOut(w2, -32, 16, "PC").bus = true;
  this.outs[0].set(undefined);
};
Pc16.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_1__.Component.prototype);
Pc16.prototype.constructor = Pc16;
Pc16.prototype.prefix = "PC";
Pc16.type = "Pc16"; ///< Name to use in files

Pc16.label = "Program Counter"; ///< Label for the palette

Pc16.desc = "Program Counter"; ///< Description for the palette

Pc16.img = "pc16.png"; ///< Image to use for the palette

Pc16.description = "<h2>Program Counter</h2><p>Simple 16-bit program counter (PC). If B is true when \nthe clock edge rises, the signed value in BA (branch address) plus 2 is added to the PC.</p>";
Pc16.order = 702;
Pc16.help = 'pc16';
/**
 * Compute the gate result
 * @param state
 */

Pc16.prototype.compute = function (state) {
  if (state[3]) {
    // Reset!
    this.value = 0;
  } else {
    if (state[0] && !this.lastClk) {
      // Leading edge
      // Store the branch offset
      this.ba = _Connector__WEBPACK_IMPORTED_MODULE_2__.Connector.busValueToDecimal(state[1]);
      this.value += 2; // Clock in BA if the B input is set

      if (state[2]) {
        if (this.ba !== null) {
          // Branching!
          this.value += this.ba + 2;
        }
      }
    }
  }

  this.value &= 0xffff;
  var o = this.value;
  var data = [];

  for (var i = 0; i < 16; i++) {
    data.push((o & 1) == 1);
    o >>= 1;
  }

  this.outs[0].set(data);
  this.lastClk = state[0];
};
/**
 * Clone this component object.
 * @returns {Pc16}
 */


Pc16.prototype.clone = function () {
  var copy = new Pc16();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Pc16.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawBox(context);
  var y = this.y - 10;
  context.font = '14px "Lucida Console", Monaco, monospace';
  context.textAlign = "center"; // Where does the text start?

  context.fillText(_Utility_Util__WEBPACK_IMPORTED_MODULE_0__.Util.toHex(this.value, 4), this.x, y);
  y += 20;
  context.font = "12px Times";
  context.fillText("program", this.x, y);
  context.fillText("counter", this.x, y + 15); //this.drawName(context, 0, -this.height/2 + 20);

  this.drawIO(context, view);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Register.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Register.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Register": () => (/* binding */ Register)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");


/**
 * Component: Simple register.
 */

var Register = function Register() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 90;
  this.width = 32;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.lastClk = false; // Two inputs, two outputs

  this.addIn(-w2, 0, 8, "D").bus = true;
  var clk = this.addIn(0, -h2, 11);
  clk.orientation = 'n';
  clk.clock = true;
  this.addOut(w2, 0, 8, "Q").bus = true;
  this.outs[0].set(undefined);
};
Register.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Register.prototype.constructor = Register;
Register.type = "Register"; ///< Name to use in files

Register.label = "Register"; ///< Label for the palette

Register.desc = "Register"; ///< Description for the palette

Register.description = "<h2>Register</h2>\n<p>A bus register. Works like a D Flip-Flop for all bits on a bus input and output. \nWhen the clock input goes high, the output is set to the value of the input. Works for\nany bus size.</p>";
Register.order = 404;
/**
 * Compute the gate result
 * @param state
 */

Register.prototype.compute = function (state) {
  if (state[1] && !this.lastClk) {
    var q = state[0];
    this.outs[0].set(q);
  }

  this.lastClk = state[1];
};
/**
 * Clone this component object.
 * @returns {Register}
 */


Register.prototype.clone = function () {
  var copy = new Register();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Register.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawBox(context);
  this.drawName(context, 0, -16);
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for a the component
 */


Register.paletteImage = function () {
  var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(60, 44);
  var wid = 12;
  pi.box(wid, 32);
  pi.io(-wid / 2, 0, 'w');
  pi.io(wid / 2, 0, 'e');
  pi.drawText("D", -wid / 2 + 3, 2, "7px Times");
  pi.drawText("Q", wid / 2 - 3, 2, "7px Times"); // Clock

  pi.clock(0, -16, 'n');
  return pi;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Registers16.js":
/*!*************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Registers16.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers16": () => (/* binding */ Registers16)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Connector */ "./packages/cirsim/src/Cirsim/Connector.js");
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");



/**
 * Component: Simple 16-bit 8-register file.
 */

var Registers16 = function Registers16() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 176;
  this.width = 128;
  var w2 = this.width / 2;
  var h2 = this.height / 2;
  this.values = [0, 0, 0, 0, 0, 0, 0, 0];
  this.lastClk = false;
  this.lastA = null;
  this.lastB = null;
  this.lastALU = null;
  this.lastW = null;
  this.alu = 0;
  var clk = this.addIn(0, -h2, 8);
  clk.orientation = 'n';
  clk.clock = true;
  this.addIn(-w2, -48, 16, "ALU").bus = true;
  this.addIn(-w2, 16, 16, "Ae").bus = true;
  this.addIn(-w2, 48, 16, "Be").bus = true;
  this.addIn(-w2, -32, 16, "ALUe").bus = true;
  var reset = this.addIn(0, this.height / 2, 8, "R");
  reset.orientation = 's';
  this.addIn(-w2, -16, 16, 'W');
  this.addOut(w2, -48, 16, "A").bus = true;
  this.addOut(w2, 48, 16, "B").bus = true;
  this.outs[0].set(undefined);
  this.outs[1].set(undefined);
};
Registers16.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Registers16.prototype.constructor = Registers16;
Registers16.prototype.prefix = "R";
Registers16.type = "Registers16"; ///< Name to use in files

Registers16.label = "Registers"; ///< Label for the palette

Registers16.desc = "Register File"; ///< Description for the palette

Registers16.img = "registers16.png"; ///< Image to use for the palette

Registers16.description = "<h2>Registers</h2>\n<p>Simple 16-bit register file. Ae and Be choose which register is routed to \nthe A and B outputs. ALU is the input from the ALU. ALUe chooses which register to write. \nA register will only be written if W (write enable) is high.</p><p>R is a reset input and is optional. \nThe R input (reset) sets all registers to zero.</p>\n<p>The register file sets the \nregister on the clock <em>leading edge.</em></p>";
Registers16.order = 700;
Registers16.help = 'registers16';
/**
 * Compute the gate result
 * @param state
 */

Registers16.prototype.compute = function (state) {
  // What are the addresses?
  this.lastA = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[2], 8);
  this.lastB = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[3], 8);
  this.lastALU = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[4], 8);
  this.lastW = state[6]; // W

  if (state[0] && !this.lastClk) {
    // Clock leading edge
    this.alu = _Connector__WEBPACK_IMPORTED_MODULE_1__.Connector.busValueToDecimal(state[1]);

    if (this.lastALU !== null && this.lastW) {
      this.values[this.lastALU] = this.alu;
    }
  } // Reset?


  if (state[5]) {
    this.values = [0, 0, 0, 0, 0, 0, 0, 0];
  }

  if (this.lastA !== null) {
    var o = this.values[this.lastA];
    var data = [];

    for (var i = 0; i < 16; i++) {
      data.push((o & 1) == 1);
      o >>= 1;
    }

    this.outs[0].set(data);
  } else {
    this.outs[0].set(undefined);
  }

  if (this.lastB !== null) {
    var _o = this.values[this.lastB];
    var _data = [];

    for (var _i = 0; _i < 16; _i++) {
      _data.push((_o & 1) == 1);

      _o >>= 1;
    }

    this.outs[1].set(_data);
  } else {
    this.outs[1].set(undefined);
  }

  this.lastClk = state[0];
};
/**
 * Clone this component object.
 * @returns {Registers16}
 */


Registers16.prototype.clone = function () {
  var copy = new Registers16();
  copy.copyFrom(this);
  copy.values = this.values.slice();
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Registers16.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawBox(context);
  context.font = '10px "Lucida Console", Monaco, monospace';
  context.textAlign = "left"; // Where does the text start?

  var textY = this.y - 54;
  var textX = this.x - 11;
  var textXr = textX + 45;
  var y = textY;

  for (var i = 0; i < 8; i++) {
    context.fillText("r" + i + ":" + _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.values[i], 4), this.x - 10, y);
    y += 16;
  } // Offset to center in the next


  var textYc = textY - 4;

  if (this.lastALU !== null && this.lastW) {
    this.jaggedLine(context, this.x - this.width / 2 + 34, this.y - 48, textX, textYc + this.lastALU * 16, 0.5);
  }

  if (this.lastA !== null) {
    this.jaggedLine(context, textXr, textYc + this.lastA * 16, this.x + this.width / 2 - 14, this.y - 48, 0.66);
  }

  if (this.lastB !== null) {
    this.jaggedLine(context, textXr, textYc + this.lastB * 16, this.x + this.width / 2 - 14, this.y + 48, 0.33);
  }

  context.font = "12px Times";
  context.textAlign = "center";
  this.drawIO(context, view);
};
/**
 * Support for string-based testing.
 *
 * Set the register as a string.
 * This is used for testing/validation of register contents
 * Examples:
 *     test:r0-23
 *     test:reset
 * @param value Test string like red=1 or yel=0
 * @param input In object test was sent to
 */


Registers16.prototype.testAsString = function (value, input) {
  if (value === null) {
    return;
  }

  if (value === 'reset') {
    this.values = [0, 0, 0, 0, 0, 0, 0, 0];
    this.pending();
  } else if (value.substr(0, 1) === 'r') {
    var reg = parseInt(value.substr(1, 1));

    if (reg < 0 || reg > 7) {
      throw "Invalid register indicated in test " + value;
    }

    var expected = parseInt(value.substr(3));

    if (expected !== +this.values[reg]) {
      throw "Incorrect register values. Register r" + reg + " expected=0x" + _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(expected, 4) + " actual=0x" + _Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.toHex(this.values[reg], 4);
    }
  }
};
/**
 * Set the register as a string.
 * This is used for testing/validation of register contents. Works just
 * like testAsString and is mainly retained for backward compatibility.
 * @param value
 */


Registers16.prototype.setAsString = function (value) {
  this.testAsString(value);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/SRLatch.js":
/*!*********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/SRLatch.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SRLatch": () => (/* binding */ SRLatch)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");


/**
 * Component: SR-Latch gate
 */

var SRLatch = function SRLatch() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 90;
  this.width = 64;
  var w2 = this.width / 2; // Two inputs, two outputs

  this.addIn(-w2, -32, 16, "R"); // R

  this.addIn(-w2, 32, 16, "S"); // S

  this.addOut(w2, -32, 16, "Q"); // Q

  this.addOutInv(w2, 32, 16, "Q", true); // Q!

  this.outs[0].set(false);
  this.outs[1].set(false);
};
SRLatch.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
SRLatch.prototype.constructor = SRLatch;
SRLatch.type = "SRLatch"; ///< Name to use in files

SRLatch.label = "SR Latch"; ///< Label for the palette

SRLatch.desc = "SR Latch"; ///< Description for the palette
//SRLatch.img = "sr.png";         ///< Image to use for the palette

SRLatch.order = 200; ///< Order of presentation in the palette

SRLatch.description = '<h2>SR Latch</h2><p>Set/Reset latch. The S input sets the output. The R input resets the output.</p>';
/**
 * Compute the gate result
 * @param state
 */

SRLatch.prototype.compute = function (state) {
  var q = this.outs[0].get();
  var qn = !this.outs[1].get();
  var r = state[0];
  var s = state[1];

  if (r && s) {
    this.outs[0].set(true);
    this.outs[1].set(false);
  } else if (r) {
    this.outs[0].set(false);
    this.outs[1].set(false);
  } else if (s) {
    this.outs[0].set(true);
    this.outs[1].set(true);
  }
};
/**
 * Clone this component object.
 * @returns {SRLatch}
 */


SRLatch.prototype.clone = function () {
  var copy = new SRLatch();
  copy.copyFrom(this);
  return copy;
};
/**
 * Create a PaletteImage object for an SR Latch
 */


SRLatch.paletteImage = function () {
  var paletteImage = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(120, 100);
  var context = paletteImage.context;
  context.lineWidth = 1.5;
  paletteImage.box(40, 70);
  var ioY = 20;
  paletteImage.io(20, -ioY, 'e');
  paletteImage.io(20, ioY, 'e');
  paletteImage.io(-20, -ioY, 'w');
  paletteImage.io(-20, ioY, 'w');
  paletteImage.circle(23, ioY, 3);
  var font = '20px Times';
  paletteImage.drawText('Q', 10, -ioY + 5, font);
  paletteImage.drawTextBar('Q', 10, ioY + 5, font);
  paletteImage.drawText('R', -12, -ioY + 5, font);
  paletteImage.drawText('S', -12, ioY + 5, font);
  return paletteImage;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/SevenSeg.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/SevenSeg.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SevenSeg": () => (/* binding */ SevenSeg)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Vector */ "./packages/cirsim/src/Cirsim/Utility/Vector.js");



/**
 * Component: SevenSeg Seven Segment display
 */

var SevenSeg = function SevenSeg() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 150;
  this.width = 90;
  this.value = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  this.color = "green"; // Seven inputs plus enable

  var y = -16 * 4;
  var len = 11;
  this.addIn(-this.width / 2, y, len, "a");
  y += 16;
  this.addIn(-this.width / 2, y, len, "b");
  y += 16;
  this.addIn(-this.width / 2, y, len, "c");
  y += 16;
  this.addIn(-this.width / 2, y, len, "d");
  y += 16;
  this.addIn(-this.width / 2, y, len, "e");
  y += 16;
  this.addIn(-this.width / 2, y, len, "f");
  y += 16;
  this.addIn(-this.width / 2, y, len, "g");
  y += 16;
  y += 16;
  this.addIn(-this.width / 2, y, len, "en");
};
SevenSeg.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
SevenSeg.prototype.constructor = SevenSeg;
SevenSeg.prototype.prefix = "L";
SevenSeg.prototype.nameRequired = true;
SevenSeg.type = "7seg"; ///< Name to use in files

SevenSeg.label = "7 SEG"; ///< Label for the palette

SevenSeg.desc = "7 Segment Display"; ///< Description for the palette

SevenSeg.img = "7seg.png"; ///< Image to use for the palette

SevenSeg.order = 508; ///< Order of presentation in the palette

SevenSeg.description = '<h2>7 Seg</h2><p>A 7 segment display has seven different display' + ' positions that can be set independently to make numbers and other characters. The en (enable) pin' + ' enables the display if true or if not connected.</p>';
/**
 * Compute the gate result
 * @param state
 */

SevenSeg.prototype.compute = function (state) {
  if (state[7] === false) {
    for (var i = 0; i < 7; i++) {
      this.value[i] = false;
    }
  } else {
    for (var i = 0; i < 7; i++) {
      this.value[i] = state[i];
    }
  }
};

SevenSeg.prototype.get = function (i) {
  return this.ins[0].value[i];
};
/**
 * Clone this component object.
 * @returns {SevenSeg}
 */


SevenSeg.prototype.clone = function () {
  var copy = new SevenSeg();
  copy.color = this.color;
  copy.value = this.value.slice();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


SevenSeg.prototype.draw = function (context, view) {
  var leftX = this.x - this.width / 2 - 0.5;
  var rightX = this.x + this.width / 2 + 0.5;
  var topY = this.y - this.height / 2 - 0.5;
  var botY = this.y + this.height / 2 + 0.5; // Select the style

  this.selectStyle(context, view);
  var saveFillStyle = context.fillStyle;
  var saveStrokeStyle = context.strokeStyle; //
  // Background
  //

  context.fillStyle = "#cccccc";
  context.fillRect(leftX, topY, this.width, this.height); // Border

  context.fillStyle = saveFillStyle;
  context.beginPath();
  context.rect(leftX, topY, this.width, this.height);
  context.stroke();
  var border = 0.2 * this.width;
  var gap = 0.02 * this.width;
  leftX += border + 5;
  rightX -= border;
  topY += border;
  botY -= border;
  context.font = "11px Times";
  context.textAlign = "center";
  this.drawSegment(context, this.value[0], {
    x: leftX + gap,
    y: topY
  }, {
    x: rightX - gap,
    y: topY
  }, 'a');
  this.drawSegment(context, this.value[1], {
    x: rightX,
    y: topY + gap
  }, {
    x: rightX,
    y: this.y - gap
  }, 'b');
  this.drawSegment(context, this.value[2], {
    x: rightX,
    y: this.y + gap
  }, {
    x: rightX,
    y: botY - gap
  }, 'c');
  this.drawSegment(context, this.value[3], {
    x: rightX - gap,
    y: botY
  }, {
    x: leftX + gap,
    y: botY
  }, 'd');
  this.drawSegment(context, this.value[4], {
    x: leftX,
    y: botY - gap
  }, {
    x: leftX,
    y: this.y + gap
  }, 'e');
  this.drawSegment(context, this.value[5], {
    x: leftX,
    y: this.y - gap
  }, {
    x: leftX,
    y: topY + gap
  }, 'f');
  this.drawSegment(context, this.value[6], {
    x: leftX + gap,
    y: this.y
  }, {
    x: rightX - gap,
    y: this.y
  }, 'g'); //
  // Restore
  //

  context.lineWidth = 1;
  context.fillStyle = saveFillStyle;
  context.strokeStyle = saveStrokeStyle;
  this.drawIO(context, view);
};

SevenSeg.prototype.drawSegment = function (context, value, fm, to, letter) {
  var dir = new _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(to.x - fm.x, to.y - fm.y);
  var dir1 = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.normalize(dir);
  dir1 = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.rotate(dir1, Math.PI / 4);
  var dir2 = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.rotate(dir1, Math.PI / 2);
  var wid = 10;
  var elen = wid * 0.707;

  if (value) {
    switch (this.color) {
      case "red":
        context.fillStyle = "#fe0501";
        break;

      case "blue":
        context.fillStyle = "#15ddff"; // "#3dffff";

        break;

      default:
        // green
        context.fillStyle = "#00fb4a"; // "#00fb4a"; // "#78f71e";

        break;
    }
  } else {
    context.fillStyle = "#444444";
  }

  context.strokeStyle = "#222222";
  context.beginPath();
  context.moveTo(fm.x, fm.y);
  context.lineTo(fm.x + elen * dir1.x, fm.y + elen * dir1.y);
  context.lineTo(to.x + elen * dir2.x, to.y + elen * dir2.y);
  context.lineTo(to.x, to.y);
  context.lineTo(to.x - elen * dir1.x, to.y - elen * dir1.y);
  context.lineTo(fm.x - elen * dir2.x, fm.y - elen * dir2.y);
  context.lineTo(fm.x, fm.y);
  context.fill();
  context.stroke();
  var mid = new _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector((to.x + fm.x) / 2, (to.y + fm.y) / 2);
  var dir3 = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.rotate(_Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.normalize(dir), Math.PI / 2);
  var offset = 10;
  context.fillStyle = "#000000";
  context.fillText(letter, mid.x + dir3.x * offset, mid.y + dir3.y * offset + 2);

  if (value === undefined) {
    context.fillStyle = "#00ffff";
    context.fontWeight = "bolder";
    context.fillText("?", mid.x, mid.y + 3);
    context.fontWeight = "normal";
  }
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


SevenSeg.prototype.load = function (obj) {
  this.color = obj["color"];
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


SevenSeg.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.color = this.color;
  return obj;
};

SevenSeg.prototype.properties = function (main) {
  var that = this;
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main, false);
  var id = dlg.uniqueId();
  var colors = ['red', 'green', 'blue'];
  var html = '<div class="control1 center"><label for="' + id + '">Color: </label><select id="' + id + '">';
  colors.forEach(function (color) {
    if (color === that.color) {
      html += '<option selected>' + color + '</option>';
    } else {
      html += '<option>' + color + '</option>';
    }
  });
  html += '</select></div>';
  dlg.extra(html, function () {
    return null;
  }, function () {
    that.color = document.getElementById(id).value;
  });
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Text.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Text.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Text": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");
/* harmony import */ var _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Graphics/CanvasHelper */ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js");




/**
 * Component: Text (labelling) gate

 * @constructor
 */

var Text = function Text() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.size = 22;
  this.text = "Text";
  this.color = 'black';
  this.height = this.size;
  this.width = this.size * 2;
};
Text.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Text.prototype.constructor = Text;
Text.prototype.prefix = null;
Text.type = "Text"; ///< Name to use in files

Text.label = "Text"; ///< Label for the palette

Text.desc = "Arbitrary Text"; ///< Description for the palette

Text.img = "text.png"; ///< Image to use for the palette

Text.order = 106; ///< Order of presentation in the palette

Text.description = "<h2>Text</h2><p>Arbitrary text for diagrams. Allows for notations that help\ndescribe parts of diagrams. The text size in pixels can be specified, as can the colors from a \nlimited palette.</p><p>The color selection is overridden by the selection color (red) when the \ntext component is selected.</p>";
Text.help = 'text';
/**
 * Clone this component object.
 * @returns {Text}
 */

Text.prototype.clone = function () {
  var copy = new Text();
  copy.copyFrom(this);
  copy.text = this.text;
  copy.size = this.size;
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Text.prototype.draw = function (context, view) {
  // Select the style to draw
  var selected = this.selectStyle(context, view);
  var text = this.text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&amp;/g, '&'); // Name

  context.font = this.size + "px Times";
  context.textAlign = "center";

  if (!selected) {
    // We only switch the color if the text is not
    // currently selectd.
    var color;

    switch (this.color) {
      default:
        color = this.color;
        break;

      case 'green':
        color = '#008000';
        break;

      case 'pink':
        color = '#FF69B4';
        break;
    }

    _Graphics_CanvasHelper__WEBPACK_IMPORTED_MODULE_3__.CanvasHelper.fillTextWith(context, text, this.x - 1, this.y + 5, color);
  } else {
    context.fillText(text, this.x - 1, this.y + 5);
  } // Size the size to make selection easier


  this.height = this.size;
  this.width = context.measureText(text).width;
  this.drawIO(context, view);
};

Text.prototype.properties = function (main) {
  var _this = this;

  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var idText = dlg.uniqueId();
  var idSize = dlg.uniqueId();
  var idColor = dlg.uniqueId();
  var html = "<div class=\"control\">\n<label for=\"".concat(idText, "\">Text: </label>\n<input type=\"text\" id=\"").concat(idText, "\" value=\"").concat(this.text, "\">\n</div>\n<div class=\"control1 center\"><label for=\"").concat(idSize, "\">Size: </label>\n<input class=\"number\" type=\"text\" id=\"").concat(idSize, "\" value=\"").concat(this.size, "\"></div>");
  html += '<div class="control1 center"><label for="' + idColor + '">Color: </label><select id="' + idColor + '">';
  var colors = ['black', 'green', 'blue', 'purple', 'orange', 'maroon', 'pink'];

  for (var i in colors) {
    var color = colors[i];

    if (color === this.color) {
      html += '<option selected>' + color + '</option>';
    } else {
      html += '<option>' + color + '</option>';
    }
  }

  html += '</select></div>';
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(idSize).value);

    if (isNaN(size) || size < 10 || size > 55) {
      return "Size must be an integer between 10 and 55";
    } //
    // Convert all HTML entities so we can't possibly
    // have executable code here.
    //


    var text = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.htmlentities(document.getElementById(idText).value);

    if (text.length < 1) {
      return "Text cannot be empty";
    }

    return null;
  }, function () {
    _this.text = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.htmlentities(document.getElementById(idText).value);
    _this.size = parseInt(document.getElementById(idSize).value);
    _this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.sanitize(document.getElementById(idColor).value);
  });
  dlg.open();
  document.getElementById(idText).select();
};
/**
 * Create a save object suitable for conversion to JSON for export.
 *
 * The character ' is replaced with `. This is so the
 * output JSON won't have any ' characters that would
 * cause problems in PHP and Javascript
 *
 * @returns {*}
 */


Text.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.text = this.text.replace(/'/g, '`');
  obj.size = this.size;

  if (this.color !== 'black') {
    obj.color = this.color;
  }

  return obj;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Text.prototype.load = function (obj) {
  this.text = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.sanitize(obj["text"].replace(/`/g, "'"));
  this.size = +obj["size"];

  if (obj.color !== undefined) {
    this.color = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_2__.Sanitize.sanitize(obj.color);
  }

  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/ToBus.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/ToBus.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToBus": () => (/* binding */ ToBus)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/ComponentPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js");


/**
 * Component: Convert single-bit signals into a bus
 * @constructor
 */

var ToBus = function ToBus() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 80;
  this.width = 32; // Size in bits

  this.size = 4;
  this.circuitIns = [];
  this.addOut(this.width / 2, 0, this.pinlength, "O").bus = true;
  this.ensureIO();
};
ToBus.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
ToBus.prototype.constructor = ToBus;
ToBus.prototype.prefix = null;
ToBus.prototype.indent = 10;
ToBus.prototype.pinlength = 8;
ToBus.type = "ToBus"; ///< Name to use in files

ToBus.label = "To Bus"; ///< Label for the palette

ToBus.desc = "Single bits to a Bus"; ///< Description for the palette

ToBus.img = "tobus.png"; ///< Image to use for the palette

ToBus.order = 306; ///< Order of presentation in the palette

ToBus.description = '<h2>To Bus</h2><p>Converts single bit inputs into a ' + 'bus output to simplify circuits</p>';
/**
 * Compute the gate result
 * @param state
 */

ToBus.prototype.compute = function (state) {
  this.outs[0].set(state);
};
/**
 * Clone this component object.
 * @returns {ToBus}
 */


ToBus.prototype.clone = function () {
  var copy = new ToBus();
  copy.size = this.size;
  copy.ensureIO();
  copy.copyFrom(this);
  return copy;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


ToBus.prototype.load = function (obj) {
  this.size = obj["size"];
  this.ensureIO();
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.load.call(this, obj);
};
/**
 * Create a save object suitable for conversion to JSON for export.
 * @returns {*}
 */


ToBus.prototype.save = function () {
  var obj = _Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.save.call(this);
  obj.size = this.size;
  return obj;
};
/**
 * Ensure the actual number of inputs matches the
 * defined bus size.
 */


ToBus.prototype.ensureIO = function () {
  var spacing = 16;
  this.height = this.size * spacing + 12;

  if (this.height < 48) {
    this.height = 48;
  }

  var x = this.width / 2;
  var startY = this.size / 2 * spacing - 8;

  for (var i = 0; i < this.size; i++) {
    if (i >= this.ins.length) {
      break;
    }

    this.ins[i].name = "I" + i;
    this.ins[i].x = -x;
    this.ins[i].y = startY - i * spacing;
    this.ins[i].len = this.pinlength;
  } // Add any new pins


  for (; i < this.size; i++) {
    this.addIn(-x, startY - i * spacing, this.pinlength, "I" + i);
  } // Delete pins that have ceased to exist


  if (i < this.ins.length) {
    for (; i < this.ins.length; i++) {
      this.ins[i].clear();
    }

    this.ins.splice(this.size);
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


ToBus.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  this.drawTrap(context, 0, this.indent);
  this.drawIO(context, view);
};

ToBus.prototype.properties = function (main) {
  var that = this;
  var dlg = new _Dlg_ComponentPropertiesDlg__WEBPACK_IMPORTED_MODULE_1__.ComponentPropertiesDlg(this, main);
  var id = dlg.uniqueId();
  var html = '<div class="control1 center gap"><label for="' + id + '">Size: </label><input class="number" type="text" id="' + id + '" value="' + this.size + '"></div>';
  dlg.extra(html, function () {
    var size = parseInt(document.getElementById(id).value);

    if (isNaN(size) || size < 2 || size > 16) {
      return "Size must be an integer from 2 to 16";
    }

    return null;
  }, function () {
    that.size = parseInt(document.getElementById(id).value);
    that.ensureIO();
    that.pending();
  });
  dlg.open();
  document.getElementById(id).select();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/TrafficLight.js":
/*!**************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/TrafficLight.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrafficLight": () => (/* binding */ TrafficLight)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/Led */ "./packages/cirsim/src/Cirsim/Graphics/Led.js");
/* harmony import */ var _BusConstant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BusConstant */ "./packages/cirsim/src/Cirsim/Component/BusConstant.js");
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");
/* harmony import */ var _Registers16__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Registers16 */ "./packages/cirsim/src/Cirsim/Component/Registers16.js");





/**
 * Component: TrafficLight

 * @constructor
 */

var TrafficLight = function TrafficLight() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 96;
  this.width = 32;
  this.valueR = undefined;
  this.valueY = undefined;
  this.valueG = undefined;
  this.red = new _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led(0, -32, 12);
  this.yellow = new _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led(0, 0, 12);
  this.green = new _Graphics_Led__WEBPACK_IMPORTED_MODULE_1__.Led(0, 32, 12); // Inputs

  this.addIn(-16, -32, 16);
  this.addIn(-16, 0, 16);
  this.addIn(-16, 32, 16);
};
TrafficLight.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
TrafficLight.prototype.constructor = TrafficLight;
TrafficLight.prototype.prefix = "L";
TrafficLight.prototype.nameRequired = true;
TrafficLight.type = "TrafficLight"; ///< Name to use in files

TrafficLight.label = "Traffic Light"; ///< Label for the palette

TrafficLight.desc = "Traffic Light"; ///< Description for the palette

TrafficLight.img = "trafficlight.png"; ///< Image to use for the palette

TrafficLight.description = "<h2>Traffic Light</h2><p>The Traffic Light component has indicators \nfor Red, Yellow, and Green as in a conventional traffic light.</p>";
TrafficLight.order = 504;
TrafficLight.help = 'trafficlight';
/**
 * Compute the gate result
 * @param state
 */

TrafficLight.prototype.compute = function (state) {
  this.valueR = state[0];
  this.valueY = state[1];
  this.valueG = state[2];
};
/**
 * Clone this component object.
 * @returns {TrafficLight}
 */


TrafficLight.prototype.clone = function () {
  var copy = new TrafficLight();
  copy.copyFrom(this);
  return copy;
};
/**
 * Support for string-based testing.
 *
 * Example: test:red=1;yel=0;grn=0
 * @param value Test string like red=1 or yel=0
 * @param input In object test was sent to
 */


TrafficLight.prototype.testAsString = function (value, input) {
  if (value === null) {
    return;
  }

  var items = value.split('=');

  if (items[1] === '?') {
    // For don't cares, we just return
    return;
  }

  if (items.length < 2) {
    throw "Invalid traffic light test validation string " + value;
  }

  var testValue;

  switch (items[0]) {
    case 'red':
      testValue = this.valueR;
      break;

    case 'grn':
    case 'green':
      testValue = this.valueG;
      break;

    case 'yel':
    case 'yellow':
      testValue = this.valueY;
      break;

    default:
      throw "Invalid traffic light test validation string " + value;
  }

  if (testValue === undefined || items[1] === '1' && !testValue || items[1] === '0' && testValue) {
    var v = testValue === undefined ? '?' : testValue ? '1' : '0';
    throw "Incorrect traffic light value. Expected " + value + " but got " + items[0] + '=' + v;
  }
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


TrafficLight.prototype.draw = function (context, view) {
  // Select the style
  this.selectStyle(context, view);
  var background = "#feb51a";
  this.drawBox(context, background); // TrafficLight

  this.red.color = this.valueR === undefined ? "undefined" : this.valueR ? "red" : "off";
  this.red.draw(context, this.x - 0.5, this.y, background);
  this.yellow.color = this.valueY === undefined ? "undefined" : this.valueY ? "yellow" : "off";
  this.yellow.draw(context, this.x - 0.5, this.y, background);
  this.green.color = this.valueG === undefined ? "undefined" : this.valueG ? "green" : "off";
  this.green.draw(context, this.x - 0.5, this.y, background);
  this.drawIO(context, view);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Xor.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Xor.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xor": () => (/* binding */ Xor)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Or__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Or */ "./packages/cirsim/src/Cirsim/Component/Or.js");


/**
 * Component: XOR gate

 * @constructor
 */

var Xor = function Xor() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 50;
  this.width = 64; //
  // This math computes the location of the pins
  // relative to the arc on the left side of the OR gate
  //

  var offset = Xor.offsetX;
  var a = Math.atan2(this.height / 2, offset);
  var r = offset / Math.cos(a);
  var pinY = 16;
  var pinX = Math.sqrt(r * r - pinY * pinY) - offset; // Two inputs and one output

  this.addIn(-32 + pinX, -pinY, 16 + pinX);
  this.addIn(-32 + pinX, pinY, 16 + pinX);
  this.addOut(32, 0, 16);
};
Xor.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Xor.prototype.constructor = Xor;
Xor.offsetX = 40; ///< Left side offset for left arc

Xor.offsetY = 30; ///< Lower offset to right arcs

Xor.offsetX1 = 6; ///< Offset for the left extra bar

Xor.type = "Xor"; ///< Name to use in files

Xor.label = "XOR"; ///< Label for the palette

Xor.desc = "XOR gate"; ///< Description for the palette

Xor.img = "xor.png"; ///< Image to use for the palette

Xor.order = 40; ///< Xorder of presentation in the palette

Xor.description = '<h2>XOR Gate</h2><p>The output of an XOR ' + 'gate is <em>true</em> if the state of the inputs differ. Otherwise, it is false.</p>';
Xor.help = 'xor';
/**
 * Compute the gate result
 * @param state
 */

Xor.prototype.compute = function (state) {
  if (state[0] === undefined || state[1] === undefined) {
    this.outs[0].set(undefined);
  } else {
    this.outs[0].set(state[0] && !state[1] || !state[0] && state[1]);
  }
};
/**
 * Clone this component object.
 * @returns {Xor}
 */


Xor.prototype.clone = function () {
  var copy = new Xor();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Xor.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  _Or__WEBPACK_IMPORTED_MODULE_1__.Or.draw(context, this.x, this.y, this.width, this.height);
  context.beginPath(); // Extra left side

  var leftX = this.x - this.width / 2 - 0.5;
  var offsetX = Xor.offsetX;
  var a = Math.atan2(this.height / 2, offsetX);
  var r = offsetX / Math.cos(a);
  context.arc(leftX - offsetX - Xor.offsetX1, this.y, r, -a, a);
  context.stroke();
  this.drawName(context, -2, 5);
  this.drawIO(context, view);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Component/Zero.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Component/Zero.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Zero": () => (/* binding */ Zero)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");


/**
 * Component: Zero (fixed false) gate
 */

var Zero = function Zero() {
  _Component__WEBPACK_IMPORTED_MODULE_0__.Component.call(this);
  this.height = 16;
  this.width = 16; // Zero output

  this.addOut(8, 0, 8);
  this.outs[0].set(false);
};
Zero.prototype = Object.create(_Component__WEBPACK_IMPORTED_MODULE_0__.Component.prototype);
Zero.prototype.constructor = Zero;
Zero.prototype.prefix = null; ///< No component naming

Zero.type = "Zero"; ///< Name to use in files

Zero.label = "0"; ///< Label for the palette

Zero.desc = "0 (false)"; ///< Description for the palette

Zero.description = '<h2>Zero</h2><p>A simple false value.</p>';
Zero.order = 0; ///< Order of presentation in the palette

Zero.help = 'zero'; ///< Available online help for zero

/**
 * Compute the gate result
 * @param state
 */

Zero.prototype.compute = function (state) {
  this.outs[0].set(false);
};
/**
 * Clone this component object.
 * @returns {Zero}
 */


Zero.prototype.clone = function () {
  var copy = new Zero();
  copy.copyFrom(this);
  return copy;
};
/**
 * Draw component object.
 * @param context Display context
 * @param view View object
 */


Zero.prototype.draw = function (context, view) {
  // Select the style to draw
  this.selectStyle(context, view);
  this.drawBox(context);
  this.drawText(context, '0', 0, 5, "14px Times");
  this.drawIO(context, view);
};
/**
 * Create a PaletteImage object for the component
 */


Zero.paletteImage = function () {
  var size = 16; // Box size

  var width = 60; // Image width

  var height = 30; // Image height

  var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_1__.PaletteImage(width, height);
  pi.box(size, size);
  pi.io(size / 2, 0, 'e');
  pi.drawText("0", 0, 5, "14px Times");
  return pi;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Components.js":
/*!**************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Components.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Components": () => (/* binding */ Components),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The components collection for Cirsim
 * @constructor
 */
var Components = function Components() {
  this.components = [];
  this.palettes = {};
  /**
   * Add a component to the collection of available component objects
   * @param component Component object
   */

  this.add = function (component) {
    this.components.push(component);
    this.components.sort(function (a, b) {
      return a.order - b.order;
    });
  };
  /**
   * Get a component prototype by type
   * @param type Type name to find
   * @returns Component object or null.
   */


  this.get = function (type) {
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i].type === type) {
        return this.components[i];
      }
    }

    return null;
  };
  /**
   * Add a palette of components by name.
   * @param name Name to refer to the palette
   * @param components Array of component objects.
   */


  this.addPalette = function (name, components) {
    var names = [];

    for (var i = 0; i < components.length; i++) {
      names.push(components[i].type);
    }

    this.palettes[name] = names;
  };

  this.getPalette = function (name) {
    if (this.palettes.hasOwnProperty(name)) {
      return this.palettes[name];
    }

    return null;
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Components);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Connection.js":
/*!**************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Connection.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Connection": () => (/* binding */ Connection),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Selectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Selectable */ "./packages/cirsim/src/Cirsim/Selectable.js");
/* harmony import */ var _Bend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bend */ "./packages/cirsim/src/Cirsim/Bend.js");
/* harmony import */ var _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Vector */ "./packages/cirsim/src/Cirsim/Utility/Vector.js");
/* harmony import */ var _Utility_Rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utility/Rect */ "./packages/cirsim/src/Cirsim/Utility/Rect.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Connections from an In to an Out
 * @param from From (Out)
 * @param to To (In)
 * @param noset If true, do not call .set on the to device.
 *
 * The noset option is used by the clone function to create a
 * copy without causing a new simulation event.
 * @constructor
 */

var Connection = function Connection(from, to, noset) {
  _Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.call(this);
  this.touchRange = 8;
  this.bends = [];

  if (from !== null) {
    this.circuit = from.component.circuit;
    this.from = from;
    this.from.add(this);

    if (to === null) {
      var loc = from.getLoc();
      this.x = loc.x;
      this.y = loc.y;
    }
  } else {
    this.from = null;
  }

  if (to === undefined) {
    console.log(this);
  }

  if (to !== null) {
    this.circuit = to.component.circuit;
    this.to = to;
    this.to.add(this);

    if (from === null) {
      var loc = to.getLoc();
      this.x = loc.x;
      this.y = loc.y;
    }

    if (noset !== true) {
      to.set();
    }
  } else {
    this.to = null;
  }
};
Connection.prototype = Object.create(_Selectable__WEBPACK_IMPORTED_MODULE_0__.Selectable.prototype);
Connection.prototype.constructor = Connection;
/**
 * Clone this connection, create a connection on the prev circuit objects.
 * @returns {Connection}
 */

Connection.prototype.clone = function () {
  if (this.from === null || this.to === null) {
    return null;
  } // Get the new component object


  var from = this.from.component.prev;
  var to = this.to.component.prev;
  var fromNdx = this.from.index;
  var toNdx = this.to.index;

  if (to.ins[toNdx] === undefined) {
    console.log(this);
  }

  var copyConn = new Connection(from.outs[fromNdx], to.ins[toNdx], true); // Copy the bends

  for (var l = 0; l < this.bends.length; l++) {
    var copyBend = this.bends[l].clone();
    copyConn.addBend(copyBend);
  }

  return copyConn;
};
/**
 * Delete this connection, removing it from the circuit.
 * @param caller Calling object. We don't remove ourselves from
 * that object.
 */


Connection.prototype["delete"] = function (caller) {
  var to = this.to;

  if (this.to !== null && this.to !== caller) {
    this.to.remove(this);
  }

  if (this.from !== null && this.from !== caller) {
    this.from.remove(this);
  }

  if (to !== null) {
    to.set();
  }
};

Connection.prototype.removeBend = function (bend) {
  var newBend = [];
  this.bends.forEach(function (value) {
    if (value !== bend) {
      newBend.push(value);
    }
  });
  this.bends = newBend;
};
/**
 * Get the circuit this connection is associated with
 * @returns Circuit object or null
 */


Connection.prototype.getCircuit = function () {
  if (this.from !== null) {
    return this.from.component.circuit;
  }

  if (this.to !== null) {
    return this.to.component.circuit;
  }

  return null;
};

Connection.prototype.drop = function () {
  if (this.from !== null && this.to === null) {
    // Dropping the end on an output?
    var circuit = this.from.component.circuit;
    var inObj = circuit.touchIn(this.x, this.y);

    if (inObj !== null && this.from.bus === inObj.bus) {
      inObj.setConnection(this);
    } else {
      this.from.remove(this);
    }
  } else if (this.from === null && this.to !== null) {
    // Dropping the end of an input?
    var _circuit = this.to.component.circuit;

    var outObj = _circuit.touchOut(this.x, this.y);

    if (outObj !== null && this.to.bus === outObj.bus) {
      // Clear any connections currently to the destination In
      this.to.clear(); // Add ourselves back in...

      this.to.from = [this]; // Set where we come from

      this.from = outObj; // Add to the Out object

      outObj.add(this); // Force recalculation

      this.to.set();
    } else {
      this.to.remove(this);
    }
  }
};

Connection.prototype.draw = function (context, view) {
  this.selectStyle(context, view);
  context.beginPath();

  if (this.from !== null) {
    var loc = this.from.getLoc();
    context.moveTo(loc.x + 0.5, loc.y + 0.5);
  } else {
    context.moveTo(this.x + 0.5, this.y + 0.5);
  } // The bends...


  for (var i = 0; i < this.bends.length; i++) {
    var bend = this.bends[i];
    context.lineTo(bend.x + 0.5, bend.y + 0.5);
  }

  if (this.to !== null) {
    var loc = this.to.getLoc();
    context.lineTo(loc.x + 0.5, loc.y + 0.5);
  } else {
    context.lineTo(this.x + 0.5, this.y + 0.5);
  }

  context.stroke();

  for (var i = 0; i < this.bends.length; i++) {
    this.bends[i].draw(context, view);
  }
};
/**
 * Get a bounding box that encloses this connection.
 * @returns {Rect}
 */


Connection.prototype.bounds = function () {
  var bounds = null;

  if (this.from !== null) {
    var loc = this.from.getLoc();
    bounds = new _Utility_Rect__WEBPACK_IMPORTED_MODULE_3__.Rect(loc.x, loc.y, loc.x, loc.y);
  } else {
    bounds = new _Utility_Rect__WEBPACK_IMPORTED_MODULE_3__.Rect(this.x, this.y, this.x, this.y);
  } // The bends...


  var _iterator = _createForOfIteratorHelper(this.bends),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var bend = _step.value;
      bounds.expandXY(bend.x, bend.y);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (this.to !== null) {
    var _loc = this.to.getLoc();

    bounds.expandXY(_loc.x, _loc.y);
  } else {
    bounds.expandXY(this.x, this.y);
  }

  return bounds;
};
/**
 * Determine if we have touched this connection
 * @param x
 * @param y
 * @returns Connection or Bend or null
 */


Connection.prototype.touch = function (x, y) {
  // Handle any missing ends
  var from = this.from !== null ? this.from : new _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(x, y);
  var to = this.to !== null ? this.to : new _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(x, y); // Are we touching a bend?

  for (var i = 0; i < this.bends.length; i++) {
    var bend = this.bends[i];

    if (bend.touch(x, y)) {
      return bend;
    }
  }

  var p1 = from.getLoc();

  for (i = 0; i < this.bends.length; i++) {
    var p2 = this.bends[i];
    var d = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.distanceToLineSegment({
      x: x,
      y: y
    }, p1, p2);

    if (d.d <= this.touchRange) {
      return this;
    }

    p1 = p2;
  }

  var d = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.distanceToLineSegment({
    x: x,
    y: y
  }, p1, to.getLoc());
  return d.d <= this.touchRange ? this : null;
};
/**
 * Collect all bends that
 * are contained in the rectangle.
 * @param rect Rectangle to test
 * @param collect Collection (array) to add items to.
 */


Connection.prototype.selectRect = function (rect, collect) {
  // Are we touching a bend?
  for (var i = 0; i < this.bends.length; i++) {
    var bend = this.bends[i];

    if (rect.contains(bend.x, bend.y)) {
      collect.push(bend);
    }
  }
};
/**
 * A selected connection that we try to drag will create
 * a new bending point.
 * @returns null
 */


Connection.prototype.spawn = function (x, y) {
  if (this.to !== null && this.from !== null) {
    // Determine the segment we are closest to.
    var closest = 0;
    var closestD = 1e10;
    var p1 = this.from.getLoc();

    for (var i = 0; i < this.bends.length; i++) {
      var p2 = this.bends[i];
      var d = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.distanceToLineSegment({
        x: x,
        y: y
      }, p1, p2);

      if (d.d <= closestD) {
        closest = i;
        closestD = d.d;
      }

      p1 = p2;
    }

    var d = _Utility_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector.distanceToLineSegment({
      x: x,
      y: y
    }, p1, this.to.getLoc());

    if (d.d <= closestD) {
      closest = i;
      closestD = d.d;
    } // Create the bend


    var bend = new _Bend__WEBPACK_IMPORTED_MODULE_1__.Bend();

    if (closest < this.bends.length) {
      // Insert into list of bends
      this.insertBend(closest, bend);
    } else {
      this.addBend(bend);
    }

    bend.place(x, y);
    return bend;
  } else {
    return null;
  }
};

Connection.prototype.insertBend = function (before, bend) {
  bend.connection = this;
  bend.circuit = this.circuit;
  this.bends.splice(before, 0, bend);
};

Connection.prototype.addBend = function (bend) {
  bend.connection = this;
  bend.circuit = this.circuit;
  this.bends.push(bend);
};
/**
 * Save this connection as an object suitable for conversion to JSON
 * @returns Object
 */


Connection.prototype.save = function () {
  if (this.from === null || this.to === null) {
    return null;
  } // Get the component objects


  var from = this.from.component;
  var to = this.to.component;
  var fromNdx = this.from.index;
  var toNdx = this.to.index; // And the bends

  var bends = [];

  for (var i = 0; i < this.bends.length; i++) {
    var bend = this.bends[i];
    bends.push(bend.save());
  }

  return {
    "from": from.id,
    "out": fromNdx,
    "to": to.id,
    "in": toNdx,
    "bends": bends
  };
};

Connection.prototype.load = function (obj) {
  var that = this;
  obj["bends"].forEach(function (bendObj) {
    var bend = new _Bend__WEBPACK_IMPORTED_MODULE_1__.Bend(bendObj["x"], bendObj["y"]);
    that.addBend(bend);
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Connection);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Connector.js":
/*!*************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Connector.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Connector": () => (/* binding */ Connector)
/* harmony export */ });
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");
/* harmony import */ var _Utility_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility/Vector */ "./packages/cirsim/src/Cirsim/Utility/Vector.js");
/* harmony import */ var _Utility_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Rect */ "./packages/cirsim/src/Cirsim/Utility/Rect.js");



/**
 * Base object for connectors (In or Out)
 *
 * Both In and Out are derived from Connector
 * @param component Component this connector is for
 * @param x Relative x on the component
 * @param y Relative y on the component
 * @param len Length in pixels to draw the connector
 * @param name Name to draw next to the connector
 * @param inv True (optional) if connector has a circle (inverse)
 * @constructor
 */

var Connector = function Connector(component, x, y, len, name, inv) {
  this.component = component;
  this.x = x;
  this.y = y;
  this.len = len !== undefined ? len : 16;
  this.index = undefined;
  this.name = name;
  this.inv = inv;
  this.value = undefined;
  this.touchRange = 8;
  this.bus = false; // If this is a CircuitRef connector, this will be set
  // to the ID of the referenced component

  this.reference = null; /// Is this connector a clock? This applies to
  /// inputs only. Clocks draw as a triangle instead of a label

  this.clock = false;
}; /// Orientation of the input (n, s, e, or w)
/// "w" means the connection is to the left of x,y

Connector.prototype.orientation = "w";

Connector.prototype.single = function () {
  return true;
};

Connector.prototype.copyFrom = function (other) {
  this.x = other.x;
  this.y = other.y;
  this.len = other.len;
  this.index = other.index;
  this.name = other.name;
  this.inv = other.inv;
  this.value = other.value;
  this.touchRange = other.touchRange;
  this.bus = other.bus;
  this.reference = other.reference;
};

Connector.prototype.get = function () {
  return this.value;
};

Connector.prototype.getAsString = function () {
  function toValueString(v) {
    if (Array.isArray(v)) {
      var str = '';
      v.forEach(function (v1) {
        str = toValueString(v1) + str;
      });
      return str;
    } else {
      return v === undefined ? "?" : v ? "1" : "0";
    }
  }

  return toValueString(this.value);
};
/**
 * Parse a string in the bus value format.
 * @param str String to parse
 * @returns {*} Array as value or null if invalid
 */


Connector.parseBusValue = function (str) {
  var value = [];

  for (var i = str.length - 1; i >= 0; i--) {
    var _char = str.substr(i, 1);

    switch (_char) {
      case '0':
        value.push(false);
        break;

      case '1':
        value.push(true);
        break;

      case '?':
        value.push(undefined);
        break;

      default:
        return null;
    }
  }

  return value;
};
/**
 * Convert a bus value to a number.
 * @param bus The Bus value
 * @param limit If set, any computed value is modulus the limit value
 */


Connector.busValueToDecimal = function (bus, limit) {
  if (bus === undefined) {
    return null;
  }

  var val = 0;
  var pow = 1;

  for (var i in bus) {
    if (bus[i] === undefined) {
      return null;
    }

    if (bus[i]) {
      val += pow;
    }

    pow *= 2;
  }

  if (limit !== undefined) {
    val %= limit;
  }

  return val;
};
/**
 * Test to see if we have touched this connector
 * @param x Mouse X
 * @param y Mouse Y
 * @return true if touched
 */


Connector.prototype.touch = function (x, y) {
  var loc = this.getLoc();
  var touchRange = this.touchRange;

  if (x >= loc.x - touchRange && x <= loc.x + touchRange && y >= loc.y - touchRange && y <= loc.y + touchRange) {
    return true;
  }

  return false;
};
/**
 * Get the x,y location of the connection
 * @returns Object with x,y
 */


Connector.prototype.getLoc = function () {
  switch (this.orientation) {
    case 'w':
      return new _Utility_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(this.component.x + this.x - this.len, this.component.y + this.y);

    case 'n':
      return new _Utility_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(this.component.x + this.x, this.component.y + this.y - this.len);

    case 's':
      return new _Utility_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(this.component.x + this.x, this.component.y + this.y + this.len);

    case 'e':
      return new _Utility_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(this.component.x + this.x + this.len, this.component.y + this.y);
  }
};
/**
 * Draw the connector
 * @param context The display context
 * @param view View object we are drawing in
 */


Connector.prototype.draw = function (context, view) {
  var x = this.component.x + this.x;
  var y = this.component.y + this.y;

  if (this.bus) {
    context.lineWidth = 2;
  } else {
    context.lineWidth = 1;
  }

  switch (this.orientation) {
    case 'e':
      context.beginPath();
      context.moveTo(x, y + 0.5);
      context.lineTo(x + this.len, y + 0.5);
      context.fillRect(x + this.len - 1, y - 1, 3, 3);

      if (this.component.circuit.circuits.model.main.options.showOutputStates) {
        context.font = "11px Times";
        context.textAlign = "left";
        var value = this.getAsString();

        if (value.length > 8) {
          value = parseInt(value, 2);

          if (isNaN(value)) {
            value = "?";
          } else {
            value = _Utility_Util__WEBPACK_IMPORTED_MODULE_0__.Util.toHex(value, 4);
          }
        }

        context.fillText(value, x + 5, y - 2);
      }

      if (this.name !== undefined) {
        context.font = "12px Times";
        context.textAlign = "right";
        context.fillText(this.name, x - 3, y + 3);
      }

      context.stroke();
      break;

    case 'w':
      // Left side - to west
      context.beginPath();
      context.moveTo(x, y + 0.5);
      context.lineTo(x - this.len, y + 0.5);
      context.fillRect(x - this.len - 1, y - 1, 3, 3);

      if (this.clock) {
        var clockSize = 7;
        context.moveTo(x, y - clockSize);
        context.lineTo(x + clockSize, y);
        context.lineTo(x, y + clockSize);
      }

      if (this.name !== undefined) {
        context.font = "12px Times";
        context.textAlign = "left";
        context.fillText(this.name, x + 2, y + 3);
      }

      context.stroke();
      break;

    case 'n':
      // Top side, to north
      context.beginPath();
      context.moveTo(x + 0.5, y);
      context.lineTo(x + 0.5, y - this.len);
      context.fillRect(x - 1, y - this.len - 1, 3, 3);

      if (this.clock) {
        var clockSize = 7;
        context.moveTo(x - clockSize, y);
        context.lineTo(x, y + clockSize);
        context.lineTo(x + clockSize, y);
      }

      context.stroke();

      if (this.name !== undefined) {
        y += this.clock ? 12 + clockSize : 12;
        context.font = "12px Times";
        context.textAlign = "center";
        context.fillText(this.name, x, y);
      }

      break;

    case 's':
      // Bottom side, to sound
      context.beginPath();
      context.moveTo(x + 0.5, y);
      context.lineTo(x + 0.5, y + this.len);
      context.fillRect(x - 1, y + this.len - 1, 3, 3);

      if (this.clock) {
        var clockSize = 7;
        context.moveTo(x - clockSize, y);
        context.lineTo(x, y - clockSize);
        context.lineTo(x + clockSize, y);
      }

      context.stroke();

      if (this.name !== undefined) {
        y -= this.clock ? 6 + clockSize : 6;
        context.font = "12px Times";
        context.textAlign = "center";
        context.fillText(this.name, x, y);
      }

      break;
  }

  context.lineWidth = 1;
};
/**
 * Determine a length automatically so that the end of the
 * connector will be on the grid, but be at least 12 pixels long
 */


Connector.prototype.autoLen = function () {
  switch (this.orientation) {
    case 's':
      this.len = Math.floor(this.y / 8) * 8 + 8 - this.y;

      while (this.len < 12) {
        this.len += 8;
      }

      break;
  }
};
/**
 * Get a bounding box that encloses this connector.
 * @returns {Rect}
 */


Connector.prototype.bounds = function () {
  var x = this.component.x + this.x;
  var y = this.component.y + this.y;
  var bounds = new _Utility_Rect__WEBPACK_IMPORTED_MODULE_2__.Rect(x, y, x, y);

  switch (this.orientation) {
    case 'e':
      bounds.expandXY(x + this.len, y);
      break;

    case 'w':
      bounds.expandXY(x - this.len, y);
      break;

    case 'n':
      bounds.expandXY(x, y - this.len);
      break;

    case 's':
      bounds.expandXY(x, y + this.len);
      break;
  }

  return bounds;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/DOM/Tools.js":
/*!*************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/DOM/Tools.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tools": () => (/* binding */ Tools)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./.yarn/cache/@babel-runtime-npm-7.14.6-3272013297-dd931f6ef1.zip/node_modules/@babel/runtime/helpers/esm/typeof.js");


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Convenience functions for the DOM.
 * Tools that avoid having to have jQuery installed.
 * @constructor
 */
var Tools = function Tools() {};
/**
 * Is an element visible?
 * Borrowed from jQuery!
 * @param elem
 * @returns {boolean}
 */

Tools.isVisible = function (elem) {
  return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};
/**
 * Add a class to an element
 * @param element Element to add to
 * @param className Class to add
 */


Tools.addClass = function (element, className) {
  if (element.classList) element.classList.add(className);else element.className += ' ' + className;
};

Tools.addClasses = function (element, classes) {
  if (classes === undefined || classes === null) {
    return;
  }

  classes.split(' ').forEach(function (cls) {
    Tools.addClass(element, cls);
  });
};

Tools.removeClass = function (element, className) {
  var regEx = new RegExp('\\b' + className + '\\b', 'g');
  element.className = element.className.replace(regEx, "");
};
/**
 * Create a DIV with a provided class name.
 * @param className Class to add to the div
 * @param content Content to place in the div. HTML or Element
 * @returns {Element} Created DOM Element
 */


Tools.createClassedDiv = function (className, content) {
  var div = document.createElement('div');
  Tools.addClass(div, className);

  if (content !== undefined) {
    Tools.addContent(div, content);
  }

  return div;
};
/**
 * Add content to an element.
 * @param element Element to add to
 * @param content Content. Can be HTML or an Element.
 */


Tools.addContent = function (element, content) {
  if (Tools.isString(content)) {
    element.innerHTML += content;
  } else if (Tools.isElement(content)) {
    element.appendChild(content);
  }
};
/**
 * Is the passed value a string?
 * @param val
 * @returns {boolean}
 */


Tools.isString = function (val) {
  return typeof val === 'string' || !!val && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(val) === 'object' && Object.prototype.toString.call(val) === '[object String]';
};
/**
 * Is the passed value an HTMLElement?
 * @param val
 * @returns {boolean}
 */


Tools.isElement = function (val) {
  return val !== undefined && val !== null && val.nodeValue !== undefined;
};
/**
 * Get the current position of an element (specifically its border box, which excludes margins) relative to the document.
 * @param element
 */


Tools.offset = function (element) {
  var rect = element.getBoundingClientRect();
  return {
    left: rect.left + element.scrollLeft + window.pageXOffset,
    top: rect.top + element.scrollTop + window.pageYOffset
  };
};
/**
 * Find a child by tagName
 * @param element
 * @param tagName
 * @returns {*}
 */


Tools.child = function (element, tagName) {
  var _iterator = _createForOfIteratorHelper(element.childNodes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;

      if (node.tagName === tagName) {
        return node;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return null;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/AboutDialog.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/AboutDialog.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutDialog": () => (/* binding */ AboutDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");

/**
 * The standard About dialog box.
 * @constructor
 */

var AboutDialog = function AboutDialog(main) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this, "about");

  this.open = function () {
    this.buttonCancel = null;
    var root = main.cirsim.root; // Dialog box contents

    var content = "<figure><img src=\"".concat(root, "cirsim/img/logo-icon.png\" alt=\"Cirsim Logo\"></figure>\n<h1>Cirsim Circuit Simulator</h1>\n<p>Version: ").concat(main.cirsim.version, "</p>\n<p>Written by: Charles B. Owen</p>");

    if (main.cirsim.root.indexOf('cirsim-dev') >= 0) {
      content += "<p class=\"gap\">Running from the development site.</p>";
    }

    this.contents(content, "About Cirsim");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
  };
};
AboutDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
AboutDialog.prototype.constructor = AboutDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js":
/*!******************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/ComponentPropertiesDlg.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentPropertiesDlg": () => (/* binding */ ComponentPropertiesDlg)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Utility_Unique__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/Unique */ "./packages/cirsim/src/Cirsim/Utility/Unique.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");



/**
 * Component properties dialog box
 * @constructor
 */

var ComponentPropertiesDlg = function ComponentPropertiesDlg(component, main) {
  var _this = this;

  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this, 'component');
  this.resize = 'both'; // A unique ID for the component name input control

  var nameId = null;
  var extraHTML = '';

  var extraCreate = function extraCreate() {};

  var extraValidate = function extraValidate() {
    return null;
  };

  var extraTake = function extraTake() {
    return null;
  };

  this.open = function () {
    // Create the dialog box form
    var description = '';

    if ('help' in component.constructor) {
      description += '<a class="helper">help</a>';
    }

    if ('description' in component.constructor) {
      description += '<div class="description">';
      description += component.constructor.description + '</div>';
    } // Does this component have a naming?


    var name = '';

    if (component.naming !== null) {
      name = component.naming;
    } else {
      if (component.prefix !== null) {
        // Does not have a name. Create one
        for (var i = 1;; i++) {
          name = component.prefix + i;
          var existing = component.circuit.getComponentByNaming(name);

          if (existing === null) {
            break;
          }
        }
      }
    }

    var dlg = '';

    if (component.prefix !== null) {
      nameId = _Utility_Unique__WEBPACK_IMPORTED_MODULE_1__.Unique.uniqueName();
      dlg += '<div class="control1 center gap"><label for="' + nameId + '">Name: </label>' + '<input type="text" name="' + nameId + '" id="' + nameId + '" value="' + name + '" spellcheck="false" class="compname text ui-widget-content ui-corner-all">' + '</div>';
    }

    dlg += extraHTML + description;

    _this.contents(dlg, "Cirsim Component Properties");

    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(_this);
    extraCreate();

    if (nameId !== null) {
      document.getElementById(nameId).select();
    }

    var helper = _this.element.querySelector('a.helper');

    if (helper !== null) {
      helper.addEventListener('click', function (event) {
        event.preventDefault();
        var helper = component.constructor.help;
        main.menu.helpMenu.componentHelp(helper);
      });
    }
  };

  this.ok = function () {
    // Get name.
    // Trim spaces on either end
    var name = '';

    if (component.prefix !== null) {
      var nameElement = document.getElementById(nameId);
      name = nameElement.value.replace(/^\s+|\s+$/gm, '');

      if (name.length !== 0) {
        // If name is not empty, we ensure it is unique
        var existing = component.circuit.getComponentByNaming(name);

        if (existing !== null && existing !== component) {
          _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.addClass(nameElement, 'cirsim-error');

          _this.error("Name already exists");

          return;
        }
      }

      _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.removeClass(nameElement, 'cirsim-error');
      name = _this.sanitize(name);
    }

    var extraRet = extraValidate();

    if (extraRet !== null) {
      _this.error(extraRet);

      return;
    }

    main.backup();

    if (component.prefix !== null) {
      component.naming = name.length > 0 ? name : null;
    }

    extraTake();

    _this.close();

    main.currentView().draw();
  }; //
  // Member functions
  //


  this.extra = function (_extraHTML, _extraValidate, _extraTake) {
    extraHTML = _extraHTML;
    extraValidate = _extraValidate;
    extraTake = _extraTake;
  };

  this.extraCreate = function (_extraCreate) {
    extraCreate = _extraCreate;
  };
};
ComponentPropertiesDlg.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
ComponentPropertiesDlg.prototype.constructor = ComponentPropertiesDlg;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js":
/*!**************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/Dialog.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dialog": () => (/* binding */ Dialog)
/* harmony export */ });
/* harmony import */ var _Utility_Unique__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/Unique */ "./packages/cirsim/src/Cirsim/Utility/Unique.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dompurify */ "./.yarn/cache/dompurify-npm-2.2.9-1a93a7440c-8673be49ae.zip/node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dialog_cl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dialog-cl */ "./.yarn/cache/dialog-cl-npm-1.0.6-03d4a3bcc2-5364406882.zip/node_modules/dialog-cl/index.js");




/**
 * Base object for general-purpose dialog boxes where the
 * functionality is assumed to be implemented in a derived object.
 * @param classes Classes to add to the dialog box
 * @constructor
 */

var Dialog = function Dialog(classes) {
  this.classes = classes !== undefined ? 'cirsim ' + classes : 'cirsim';
  this.buttonOk = "Ok";
  this.buttonCancel = "Cancel";
  this.resize = 'none;';
  this.titleBarButtons = null;
};
/**
 * Set the dialog box contents
 * @param html HTML for the body
 * @param title Title for the title bar
 */

Dialog.prototype.contents = function (html, title) {
  this.html = html;
  this.title = title;
};
/**
 * Open the dialog box
 */


Dialog.prototype.open = function () {
  var _this = this;

  var form = document.createElement('form');
  var div = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('cirsim-dlg-content');
  form.appendChild(div);
  var dlg = "".concat(this.html, "<p class=\"error\"></p>\n<input type=\"submit\" tabindex=\"-1\" style=\"position:absolute; top:-1000px\">");
  div.innerHTML = dlg;
  this.element = div;
  var buttons = [];

  if (this.buttonOk !== null) {
    buttons.push({
      contents: 'Ok',
      click: function click(dialog) {
        _this.ok();
      },
      focus: true,
      'class': 'cs-ok'
    });
  }

  if (this.buttonCancel !== null) {
    buttons.push({
      contents: 'Cancel',
      click: function click(dialog) {
        dialog.close();
      },
      'class': 'cs-cancel'
    });
  }

  var dialog = new dialog_cl__WEBPACK_IMPORTED_MODULE_3__.default({
    'addClass': this.classes,
    title: this.title,
    content: form,
    buttons: buttons,
    resize: this.resize,
    titleBarButtons: this.titleBarButtons
  });
  this.dialog = dialog;
  this.onOpen();

  this.close = function () {
    dialog.close();
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    _this.ok();
  });

  this.buttonOk = function () {
    return this.dialog.div.querySelector('button.cs-ok');
  };
};

Dialog.prototype.ok = function () {
  this.close();
};

Dialog.prototype.error = function (msg) {
  if (msg !== undefined) {
    this.element.querySelector('.error').innerHTML = msg;
  }
};

Dialog.prototype.cancel = function () {};

Dialog.prototype.onOpen = function () {};
/**
 * Sanitize text from user input to prevent XSS attacks.
 * @param text Text to sanitize
 * @returns Sanitized version
 */


Dialog.prototype.sanitize = function (text) {
  return dompurify__WEBPACK_IMPORTED_MODULE_2___default().sanitize(text);
};
/**
 * Get a unique ID to use in dialog boxes
 */


Dialog.prototype.uniqueId = function () {
  return _Utility_Unique__WEBPACK_IMPORTED_MODULE_0__.Unique.uniqueName();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/ExportDlg.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/ExportDlg.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExportDlg": () => (/* binding */ ExportDlg)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vendor/Blob.js */ "./packages/cirsim/src/Cirsim/Vendor/Blob.js");
/* harmony import */ var _Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utility_Unique_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Unique.js */ "./packages/cirsim/src/Cirsim/Utility/Unique.js");
/* harmony import */ var _Vendor_FileSaver_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Vendor/FileSaver.js */ "./packages/cirsim/src/Cirsim/Vendor/FileSaver.js");




/**
 * File export dialog box
 * @param model Model object for the currently active model
 * @constructor
 */

var ExportDlg = function ExportDlg(model) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this); // A unique ID for the input control

  var id = this.uniqueId();

  this.open = function () {
    // Create the dialog box form
    var dlg = "<div class=\"control\"><label for=\"".concat(id, "\">Name</label>\n<input type=\"text\" id=\"").concat(id, "\" value=\"circuit\" class=\"text ui-widget-content ui-corner-all\">\n</div>\n<p>Enter a name for the exported .cirsim file.</p>");
    this.buttonOk = 'Export';
    this.contents(dlg, "Cirsim Export");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    document.getElementById(id).select();
  };
  /**
   * Export the circuits as a file.
   * Call by this.export below when Export pressed on the dialog box.
   */


  this.ok = function () {
    // Get name.
    // Trim spaces on either end
    // Remove extension
    var name = this.sanitize(document.getElementById(id).value).replace(/^\s+|\s+$/gm, '').replace(/\.[^/.]+$/, "");

    if (name.length === 0) {
      // Invalid name
      this.error("You must supply a name");
    } else {
      this.close();

      if (!name.endsWith('.cirsim')) {
        name += ".cirsim";
      } // See: https://eligrey.com/blog/saving-generated-files-on-the-client-side/


      var json = model.toJSON();
      (0,_Vendor_FileSaver_js__WEBPACK_IMPORTED_MODULE_3__.default)(new Blob([json], {
        type: "application/json"
      }), name);
    }
  };
};
ExportDlg.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
ExportDlg.prototype.constructor = ExportDlg;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/ExportPNGDlg.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/ExportPNGDlg.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExportPNGDlg": () => (/* binding */ ExportPNGDlg)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vendor/Blob.js */ "./packages/cirsim/src/Cirsim/Vendor/Blob.js");
/* harmony import */ var _Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Vendor_FileSaver_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Vendor/FileSaver.js */ "./packages/cirsim/src/Cirsim/Vendor/FileSaver.js");



/**
 * File export dialog box
 * @param view View we are exporting
 * @constructor
 */

var ExportPNGDlg = function ExportPNGDlg(view) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this); // A unique ID for the input control

  var id = this.uniqueId();

  this.open = function () {
    // Create the dialog box form
    var dlg = "<div class=\"control\"><label for=\"".concat(id, "\">Name</label>\n<input type=\"text\" id=\"").concat(id, "\" value=\"circuit\" class=\"text ui-widget-content ui-corner-all\">\n</div>\n<p>Enter a name for the exported .png file.</p>");
    this.buttonOk = 'Export';
    this.contents(dlg, "Cirsim Export PNG");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    document.getElementById(id).select();
  };
  /**
   * Export the current view as a PNG file.
   * Call by this.export below when Export pressed on the dialog box.
   */


  this.ok = function () {
    // Get name.
    // Trim spaces on either end
    // Remove extension
    var name = this.sanitize(document.getElementById(id).value).replace(/^\s+|\s+$/gm, '').replace(/\.[^/.]+$/, "");

    if (name.length === 0) {
      // Invalid name
      this.error("You must supply a name");
    } else {
      this.close();

      if (!name.endsWith('.png')) {
        name += ".png";
      } // Create a temporary canvas to use


      var circuit = view.circuit;
      var canvas = document.createElement('canvas');
      var bounds = circuit.bounds();
      var wid = bounds.right - bounds.left + 2;
      var hit = bounds.bottom - bounds.top + 2;
      canvas.style.width = wid + 'px';
      canvas.style.height = hit + 'px';
      canvas.width = wid;
      canvas.height = hit;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(1 - bounds.left, 1 - bounds.top);
      circuit.draw(ctx, view);
      canvas.toBlob(function (blob) {
        (0,_Vendor_FileSaver_js__WEBPACK_IMPORTED_MODULE_2__.default)(blob, name);
      });
    }
  };
};
ExportPNGDlg.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
ExportPNGDlg.prototype.constructor = ExportPNGDlg;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/FileDialog.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/FileDialog.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileDialog": () => (/* binding */ FileDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
/* harmony import */ var _FileExistsDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileExistsDialog */ "./packages/cirsim/src/Cirsim/Dlg/FileExistsDialog.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");




/**
 * Base object for both FileSaveDialog and FileSaveDialog
 */

var FileDialog = function FileDialog(open, options, toast) {
  var _this2 = this;

  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  var that = this;
  var files = options.getAPI('files'); // List of existing filenames. Null until set
  // by the directory listing.

  var existing = null;
  var callback = null; // Filename

  this.filename = ''; // Ids for the filename and list

  var nameId = this.uniqueId();
  var listId = this.uniqueId();
  var nameSel = '#' + nameId;
  var listSel = '#' + listId;

  this.open = function (callback_) {
    callback = callback_;
    var label = open ? 'Available' : 'Existing'; // Dialog box contents

    var dlg = '<div class="control"><label for="' + listId + '">' + label + '</label>' + '<select class="files" id="' + listId + '" name="' + listId + '" size="5">' + '</select><div class="notice">Querying Server...</div></div>' + '<div class="control"><label for="' + nameId + '">Name</label>' + '<input type="text" name="' + nameId + '" id="' + nameId + '" value="' + this.filename + '" spellcheck="false" class="text ui-widget-content ui-corner-all">' + '</div>';

    if (open) {
      this.contents(dlg, "File Open");
    } else {
      dlg += '<p>Enter a name to save your circuit on the server as.</p>';
      this.contents(dlg, "File Save");
    }

    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    var listElement = document.getElementById(listId);
    var nameElement = document.getElementById(nameId);
    listElement.addEventListener('click', function (event) {
      nameElement.value = listElement.value;
    });
    nameElement.select();
    queryFiles(listSel, nameSel);

    if (!open) {
      this.buttonOk().setAttribute('disabled', 'true');
    }
  };
  /**
   * Call back on a press of the OK button.
   * Must call either close or error
   */


  this.ok = function () {
    var _this = this;

    //
    // Obtain and validate the name
    //
    var listElement = document.getElementById(listId);
    var nameElement = document.getElementById(nameId); // Trim

    this.filename = this.sanitize(nameElement.value).replace(/^\s+|\s+$/gm, '');

    if (this.filename.length === 0) {
      nameElement.focus();
      this.error("Must supply a file name");
      return;
    } // Test for valid names


    var letters = /^[0-9a-zA-Z\.\-\+ ]+$/;

    if (!letters.test(this.filename)) {
      nameElement.focus();
      this.error("Names can contain a-z, A-Z, 0-9, ., -, +, and space");
      return;
    } // Append .cirsim


    if (this.filename.length < 8 || this.filename.substr(this.filename.length - 7, 7) !== '.cirsim') {
      this.filename += '.cirsim';
    }

    if (open) {
      this.read(this.filename, callback);
    } else {
      if (existing.indexOf(this.filename) >= 0) {
        var dlg = new _FileExistsDialog__WEBPACK_IMPORTED_MODULE_2__.FileExistsDialog(this.filename);
        dlg.open(function (save) {
          if (save) {
            _this.write(_this.filename, callback);
          }
        });
      } else {
        this.write(this.filename, callback);
      }
    }
  };
  /**
   * Query the server for all existing files.
   */


  var queryFiles = function queryFiles() {
    _Utility_Ajax__WEBPACK_IMPORTED_MODULE_3__.Ajax.do({
      url: files.url,
      data: Object.assign({
        cmd: "files"
      }, files.extra),
      method: "GET",
      dataType: 'json',
      success: function success(data) {
        var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__.JsonAPI(data);

        if (toast.jsonErrors(json)) {
          that.close();
          return;
        }

        var files = json.getData('files');
        var listElement = document.getElementById(listId);
        var nameElement = document.getElementById(nameId);
        var notice = listElement.parentNode.querySelector('.notice');

        if (notice !== null) {
          notice.parentNode.removeChild(notice);
        }

        existing = [];
        files.attributes.forEach(function (item) {
          var option = document.createElement('option');
          option.value = item.name;
          option.innerText = item.name;
          listElement.appendChild(option);
          existing.push(item.name);
        });

        _this2.buttonOk().removeAttribute('disabled');
      },
      error: function error(xhr, status, _error) {
        console.log(xhr.responseText);
        toast.message('Unable to communicate with server: ' + _error);
        that.close();
      }
    });
  };
};
FileDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
FileDialog.prototype.constructor = FileDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/FileExistsDialog.js":
/*!************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/FileExistsDialog.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileExistsDialog": () => (/* binding */ FileExistsDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");

/**
 * File system file exists dialog box
 * @param filename The filename that exists
 * @constructor
 */

var FileExistsDialog = function FileExistsDialog(filename) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  /**
   * Open the dialog box
   * @param done Callback that is called with the true/false depending on ok/cancel button press
   */

  this.open = function (done) {
    this.done = done; // Dialog box contents

    var dlg = '<p>File ' + filename + ' exists. Are you sure you want to overwrite?';
    this.contents(dlg, "Overwrite?");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
  };
  /**
   * Call back on a press of the OK button.
   * Must call either close or error
   */


  this.ok = function () {
    this.close();
    this.done(true);
  };
  /**
   * Call back on the press of the Cancel button
   */


  this.cancel = function () {
    this.done(false);
  };
};
FileExistsDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
FileExistsDialog.prototype.constructor = FileExistsDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/FileOpenDialog.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/FileOpenDialog.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileOpenDialog": () => (/* binding */ FileOpenDialog)
/* harmony export */ });
/* harmony import */ var _FileDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileDialog */ "./packages/cirsim/src/Cirsim/Dlg/FileDialog.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");



/**
 * File system save dialog box
 * @param options
 * @param toast
 * @constructor
 */

var FileOpenDialog = function FileOpenDialog(options, toast) {
  _FileDialog__WEBPACK_IMPORTED_MODULE_0__.FileDialog.call(this, true, options, toast);
  var open = options.getAPI('open');
  /**
   * Read the file.
   */

  this.read = function (name, callback) {
    var _this = this;

    _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__.Ajax.do({
      url: open.url,
      data: Object.assign({
        cmd: "open",
        name: name
      }, open.extra),
      method: "GET",
      dataType: 'json',
      success: function success(data) {
        var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__.JsonAPI(data);

        if (!toast.jsonErrors(json)) {
          var file = data.data[0].attributes.data;
          callback(name, file);

          _this.close();
        }
      },
      error: function error(xhr, status, _error) {
        console.log(xhr.responseText);
        toast.message('Unable to communicate with server: ' + _error);

        _this.close();
      }
    });
  };
};
FileOpenDialog.prototype = Object.create(_FileDialog__WEBPACK_IMPORTED_MODULE_0__.FileDialog.prototype);
FileOpenDialog.prototype.constructor = FileOpenDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/FileSaveDialog.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/FileSaveDialog.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileSaveDialog": () => (/* binding */ FileSaveDialog)
/* harmony export */ });
/* harmony import */ var _FileDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileDialog */ "./packages/cirsim/src/Cirsim/Dlg/FileDialog.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");



/**
 * File system save dialog box
 * @param data Data to save
 * @param type Data mime type
 * @param options The Cirsim options object
 * @param toast The Toast object
 * @constructor
 */

var FileSaveDialog = function FileSaveDialog(data, type, options, toast) {
  _FileDialog__WEBPACK_IMPORTED_MODULE_0__.FileDialog.call(this, false, options, toast);
  var save = options.getAPI('save');
  /**
   * Write the file. This is called only if we
   * know for sure the file does not exist.
   */

  this.write = function (name, callback) {
    var _this = this;

    _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__.Ajax.do({
      url: save.url,
      data: Object.assign({
        cmd: "save",
        name: name,
        data: data
      }, save.extra),
      method: "POST",
      dataType: 'json',
      success: function success(data) {
        var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__.JsonAPI(data);

        if (!toast.jsonErrors(json)) {
          _this.close();

          callback(name);
        }
      },
      error: function error(xhr, status, _error) {
        console.log(xhr.responseText);
        toast.message('Unable to communicate with server: ' + _error);

        _this.close();
      }
    });
  };
};
FileSaveDialog.prototype = Object.create(_FileDialog__WEBPACK_IMPORTED_MODULE_0__.FileDialog.prototype);
FileSaveDialog.prototype.constructor = FileSaveDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/HelpDialog.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/HelpDialog.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpDialog": () => (/* binding */ HelpDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Graphics_HelpPresenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Graphics/HelpPresenter */ "./packages/cirsim/src/Cirsim/Graphics/HelpPresenter.js");


/**
 * The standard Help dialog box.
 * @constructor
 */

var HelpDialog = function HelpDialog(main) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this, "help");

  this.open = function (url) {
    this.buttonCancel = null;
    this.resize = 'both'; // Dialog box contents

    var presenter = new _Graphics_HelpPresenter__WEBPACK_IMPORTED_MODULE_1__.HelpPresenter(main, this);
    var dlg = presenter.html();
    this.contents(dlg, "Cirsim Help");
    this.titleBarButtons = [{
      type: 'custom',
      contents: '<span class="icons-cl icons-cl-arrowthick-1-w">',
      click: function click() {
        presenter.back();
      }
    }, {
      type: 'custom',
      contents: '<span class="icons-cl icons-cl-home">',
      click: function click() {
        presenter.home();
      }
    }, {
      type: 'close'
    }];
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    presenter.present(url);
  };
};
HelpDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
HelpDialog.prototype.constructor = HelpDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/ImportDlg.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/ImportDlg.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImportDlg": () => (/* binding */ ImportDlg)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vendor/Blob.js */ "./packages/cirsim/src/Cirsim/Vendor/Blob.js");
/* harmony import */ var _Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Vendor_Blob_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utility_Unique_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Unique.js */ "./packages/cirsim/src/Cirsim/Utility/Unique.js");
/* harmony import */ var _Vendor_FileSaver_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Vendor/FileSaver.js */ "./packages/cirsim/src/Cirsim/Vendor/FileSaver.js");
/**
 * File import dialog box
 */




var ImportDlg = function ImportDlg(main, model) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  var that = this; // A unique ID for the input control

  var id = _Utility_Unique_js__WEBPACK_IMPORTED_MODULE_2__.default.uniqueName(); // Create the dialog box

  var dlg = '<div class="control gap"><input class="file" type="file" id="' + id + '" />' + '<br><span id="import-error" class="error"></span></div>' + '<p>Choose a file to import into Cirsim.</p>';

  this.ok = function () {
    var files = document.getElementById(id).files;

    if (files.length < 1) {
      return;
    }

    var file = files[0];
    var reader = new FileReader(); // Closure to capture the file information.

    reader.onload = function (e) {
      model.fmJSON(e.target.result);
      that.close();
      main.reload();
    };

    reader.onerror = function (e) {
      that.error("Error reading circuits file");
    };

    reader.onabort = function (e) {
      that.error("Circuits file read aborted");
    }; // Read in the file


    reader.readAsText(file);
  };

  this.buttonOk = 'Import';
  this.contents(dlg, "Cirsim Import");
};
ImportDlg.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
ImportDlg.prototype.constructor = ImportDlg;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/ImportTabDialog.js":
/*!***********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/ImportTabDialog.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImportTabDialog": () => (/* binding */ ImportTabDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");



/**
 * Dialog box for importing tabs from an existing file.
 * @constructor
 */

var ImportTabDialog = function ImportTabDialog(importer, options, toast) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  this.buttonOk = null;

  this.open = function (callback) {
    var _this = this;

    // Dialog box contents
    var body = '<p>Loading tab from server...</p>';
    this.contents(body, "Loading tab...");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    var open = options.getAPI('import');
    var extra = {};
    Object.assign(extra, open.extra);
    Object.assign(extra, importer.extra);

    if (open !== null) {
      _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__.Ajax.do({
        url: open.url,
        data: Object.assign({
          cmd: "open",
          name: importer.name
        }, extra),
        method: "GET",
        dataType: 'json',
        success: function success(data) {
          var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__.JsonAPI(data);

          if (!toast.jsonErrors(json)) {
            var load = data.data[0].attributes.data;
            callback(load);
          }

          _this.close();
        },
        error: function error(xhr, status, _error) {
          console.log(xhr.responseText);
          toast.message('Unable to communicate with server: ' + _error);

          _this.close();
        }
      });
    }
  };
};
ImportTabDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
ImportTabDialog.prototype.constructor = ImportTabDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/MessageDialog.js":
/*!*********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/MessageDialog.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageDialog": () => (/* binding */ MessageDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");

/**
 * The standard Message dialog box.
 * @param title Title text
 * @param body Body HTML
 * @param height Height of the box
 * @constructor
 */

var MessageDialog = function MessageDialog(title, body, height) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  /**
   * Open the dialog box.
   * @param ok Optional closure that will be called on OK
   * @param cancel Optional boolean - true indicates we include a cancel button
   */

  this.open = function (ok, cancel) {
    this.contents(body, title);

    if (cancel !== true) {
      this.buttonCancel = null;
    }

    this.ok = function () {
      if (ok !== undefined) {
        ok();
      }

      this.close();
    };

    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
  };
};
MessageDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
MessageDialog.prototype.constructor = MessageDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/OpenDialog.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/OpenDialog.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenDialog": () => (/* binding */ OpenDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");



/**
 * File open dialog box for when the filename to load is
 * already known.
 * @constructor
 */

var OpenDialog = function OpenDialog(name, options, toast) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  this.buttonOk = null;

  this.open = function (callback) {
    var _this = this;

    // Dialog box contents
    var body = '<p>Loading from server...</p>';
    this.contents(body, "Loading...");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    var open = options.getAPI('open');

    if (open !== null) {
      _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__.Ajax.do({
        url: open.url,
        data: Object.assign({
          cmd: "open",
          name: name
        }, open.extra),
        method: "GET",
        dataType: 'json',
        success: function success(data) {
          var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__.JsonAPI(data);

          if (!toast.jsonErrors(json)) {
            var load = data.data[0].attributes.data;
            callback(name, load);
          }

          _this.close();
        },
        error: function error(xhr, status, _error) {
          toast.message('Unable to communicate with server: ' + _error);

          _this.close();
        }
      });
    }
  };
};
OpenDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
OpenDialog.prototype.constructor = OpenDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/SaveDialog.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/SaveDialog.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SaveDialog": () => (/* binding */ SaveDialog)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");



/**
 * File save dialog box for when the filename to save as is
 * already known.
 * @param data Data to save
 * @param type Type (usually application/json)
 * @param filename Name to save as
 * @param options The Options object
 * @param toast The Toast object
 * @constructor
 */

var SaveDialog = function SaveDialog(data, type, filename, options, toast) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  var that = this;
  this.buttonOk = null;

  this.open = function () {
    var _this = this;

    // Dialog box contents
    var dlg = '<p>Saving to server...</p>';
    this.contents(dlg, "Saving...");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    var save = options.getAPI('save');
    _Utility_Ajax__WEBPACK_IMPORTED_MODULE_2__.Ajax.do({
      url: save.url,
      data: Object.assign({
        cmd: "save",
        name: filename,
        data: data
      }, save.extra),
      method: "POST",
      dataType: 'json',
      success: function success(data) {
        var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_1__.JsonAPI(data);

        if (!toast.jsonErrors(json)) {
          that.close();
        }
      },
      error: function error(xhr, status, _error) {
        console.log(xhr.responseText);
        toast.message('Unable to communicate with server: ' + _error);

        _this.close();
      }
    });
  };
};
SaveDialog.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
SaveDialog.prototype.constructor = SaveDialog;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/TabAddDlg.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/TabAddDlg.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabAddDlg": () => (/* binding */ TabAddDlg)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");

/**
 * Dialog box for adding a named tab.
 * @property tabs Tabs object
 * @constructor
 */

var TabAddDlg = function TabAddDlg(tabs) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  var MaxName = 8;
  var id;

  this.open = function () {
    // Dialog box contents
    id = this.uniqueId();
    var dlg = "<div class=\"control1 center\"><label for=\"".concat(id, "\">New tab name: </label>\n<input class=\"tabname\" type=\"text\" id=\"").concat(id, "\" spellcheck=\"false\"></div>\n<p>Enter the name for the new tab.</p>");
    this.contents(dlg, "New Tab");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    document.getElementById(id).select();
  };

  this.ok = function () {
    var name = document.getElementById(id).value;
    name = name.replace(/^\s+|\s+$/gm, '');
    name = this.sanitize(name);

    if (name.length < 1) {
      this.error('Must provide a tab name');
      document.getElementById(id).select();
      return;
    }

    if (name.length > MaxName) {
      this.error('Name must be no longer than ' + MaxName + ' characters');
      document.getElementById(id).select();
      return;
    } //
    // Ensure name does not already exist
    //


    var val = tabs.validateName(name);

    if (val !== null) {
      this.error(val);
      document.getElementById(id).select();
      return;
    }

    tabs.add(name);
    this.close();
  };
};
TabAddDlg.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
TabAddDlg.prototype.constructor = TabAddDlg;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Dlg/TabPropertiesDlg.js":
/*!************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Dlg/TabPropertiesDlg.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabPropertiesDlg": () => (/* binding */ TabPropertiesDlg)
/* harmony export */ });
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "./packages/cirsim/src/Cirsim/Dlg/Dialog.js");

/**
 * Dialog box for adding a named tab.
 * @param tabs Tabs object
 * @constructor
 */

var TabPropertiesDlg = function TabPropertiesDlg(tabs) {
  _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.call(this);
  var MaxName = 8;
  var id;

  this.open = function () {
    var circuit = tabs.currentCircuit();
    var name = circuit.getName();
    var stats = circuit.stats(); // Dialog box contents

    id = this.uniqueId();
    var dlg = "\n<div class=\"control1 center\"><label for=\"".concat(id, "\">Tab name: </label>\n<input class=\"tabname\" type=\"text\" id=\"").concat(id, "\" value=\"").concat(name, "\" spellcheck=\"false\" ").concat(name === 'main' ? "disabled" : "", "></div>");

    if (name === 'main') {
      dlg += '<p class="center"><em>The main tab cannot be renamed.</em></p>';
    } else {
      dlg += '<p>This page presents information for the ' + 'currently selected tab. Enter a new name to rename the tab.</p>';
    }

    dlg += "<table>\n<tr><th>Property</th><th>Value</th></tr>\n<tr><td>Components</td><td>".concat(stats.numComponents, "</td></tr>\n<tr><td>Connections</td><td>").concat(stats.numConnections, "</td></tr>\n<tr><td>Width</td><td>").concat(stats.width, " pixels</td></tr>\n<tr><td>Height</td><td>").concat(stats.height, " pixels</td></tr>\n</table>");
    this.contents(dlg, "New Tab");
    _Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype.open.call(this);
    document.getElementById(id).select();
  };

  this.ok = function () {
    // What is the current name?
    var circuit = tabs.currentCircuit();

    if (circuit.getName() === 'main') {
      this.close();
      return;
    }

    var name = document.getElementById(id).value;
    name = name.replace(/^\s+|\s+$/gm, '');
    name = this.sanitize(name);

    if (name.length < 1) {
      this.error('Must provide a tab name');
      document.getElementById(id).select();
      return;
    }

    if (name.length > MaxName) {
      this.error('Name must be no longer than ' + MaxName + ' characters');
      document.getElementById(id).select();
      return;
    } //
    // Ensure name does not already exist
    //


    var val = tabs.validateName(name, circuit);

    if (val !== null) {
      this.error(val);
      document.getElementById(id).select();
      return;
    }

    if (name !== circuit.getName()) {
      tabs.rename(name);
    }

    this.close();
  };
};
TabPropertiesDlg.prototype = Object.create(_Dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog.prototype);
TabPropertiesDlg.prototype.constructor = TabPropertiesDlg;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/Button.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/Button.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _CanvasHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasHelper */ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js");

/**
 * Construct a display button
 * @param label Label to display on the button
 * @param value Value of the button
 * @param x Center of the button
 * @param y Center of the button
 * @constructor
 */

var Button = function Button(label, value, x, y, size) {
  this.label = label;
  this.value = value;
  this.x = x;
  this.y = y;
  this.size = size === undefined ? 30 : size;
  this.state = 'off';
};

Button.prototype.touch = function (x, y) {
  var size = this.size;

  if (x > this.x - size / 2 && x < this.x + size / 2 && y > this.y - size / 2 && y < this.y + size / 2) {
    this.state = 'pressed';
    return true;
  }

  return false;
};

Button.prototype.setState = function (state) {
  this.state = state;
};

Button.prototype.untouch = function () {
  if (this.state === 'pressed') {
    this.state = 'on';
    return true;
  }

  return false;
};

Button.prototype.draw = function (context, x, y) {
  var saveFillStyle = context.fillStyle;
  var saveStrokeStyle = context.strokeStyle;
  x += this.x;
  y += this.y;
  var size = this.size;
  var textSize = size * 0.85; // ff5255

  switch (this.state) {
    case 'off':
    default:
      context.fillStyle = '#3ab5de';
      break;

    case 'pressed':
      context.fillStyle = '#ff5255';
      break;

    case 'on':
      context.fillStyle = '#0000ff';
      break;
  }

  var radius = 3;
  _CanvasHelper__WEBPACK_IMPORTED_MODULE_0__.CanvasHelper.roundedRect(context, x - size / 2, y - size / 2, size, size, radius);
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#f2f2f2';
  _CanvasHelper__WEBPACK_IMPORTED_MODULE_0__.CanvasHelper.roundedRect(context, x - size / 2, y - size / 2, size, size, radius);
  context.stroke();
  context.font = '' + textSize + 'px Arial';
  context.textAlign = "center";
  context.fillStyle = '#f2f2f2';
  context.fillText(this.label, x, y + textSize * 0.38); // Restore

  context.lineWidth = 1;
  context.fillStyle = saveFillStyle;
  context.strokeStyle = saveStrokeStyle;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js":
/*!*************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/CanvasHelper.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasHelper": () => (/* binding */ CanvasHelper),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Convenience functions for working with a canvas.
 * @constructor
 */
var CanvasHelper = function CanvasHelper() {};

CanvasHelper.roundedRect = function (context, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
};
/**
 * Do a context.fill(), but with a temporary style.
 * @param context Context to fill
 * @param fillStyle Style to use. If omitted, draws in white.
 */


CanvasHelper.fillWith = function (context, fillStyle) {
  var save = context.fillStyle;
  context.fillStyle = fillStyle !== undefined ? fillStyle : "#ffffff";
  context.fill();
  context.fillStyle = save;
};
/**
 * Do a context.fillText(), but with a temporary style.
 * @param context Context to fill
 * @param text Text to put in
 * @param x X location
 * @param y Y location
 * @param fillStyle Style to use. If omitted, draws in white.
 */


CanvasHelper.fillTextWith = function (context, text, x, y, fillStyle) {
  var save = context.fillStyle;
  context.fillStyle = fillStyle !== undefined ? fillStyle : "#ffffff";
  context.fillText(text, x, y);
  context.fillStyle = save;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasHelper);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/HelpDiv.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/HelpDiv.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpDiv": () => (/* binding */ HelpDiv)
/* harmony export */ });
/* harmony import */ var _Graphics_HelpPresenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Graphics/HelpPresenter */ "./packages/cirsim/src/Cirsim/Graphics/HelpPresenter.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");


/**
 * Help <div> that appears to the right of Cirsim
 * @constructor
 */

var HelpDiv = function HelpDiv(main) {
  var _this = this;

  var helpDiv = null;
  var presenter;

  var initialize = function initialize() {
    // Page contents
    presenter = new _Graphics_HelpPresenter__WEBPACK_IMPORTED_MODULE_0__.HelpPresenter(main, _this);
    var helpDiv = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('help-div');
    _this.element = helpDiv;
    main.element.appendChild(helpDiv);
    var html = "<div class=\"header\"><h1>Cirsim Help</h1>\n<button type=\"button\" class=\"help-back\" title=\"Back\">\n<span class=\"icons-cl icons-cl-arrowthick-1-w\"></span></button>\n<button type=\"button\" class=\"help-home\" title=\"Home\">\n<span class=\"icons-cl icons-cl-home\"></span></button>\n<button type=\"button\" class=\"help-close\" title=\"Close\">\n<span class=\"icons-cl icons-cl-closethick\"></span></button>\n</div>\n".concat(presenter.html());
    helpDiv.innerHTML = html;
    presenter.present('');
    var headerDiv = helpDiv.querySelector('.header');

    if (headerDiv !== null) {
      headerDiv.querySelector('button.help-close').addEventListener('click', function (event) {
        event.preventDefault();
        main.dockedHelp(false);
      });
      headerDiv.querySelector('button.help-home').addEventListener('click', function (event) {
        event.preventDefault();
        presenter.home();
      });
      headerDiv.querySelector('button.help-back').addEventListener('click', function (event) {
        event.preventDefault();
        presenter.back();
      });
    }
  };

  this.home = function () {
    presenter.home();
  };

  this.url = function (url) {
    presenter.present(url);
  };

  initialize();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/HelpPresenter.js":
/*!**************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/HelpPresenter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpPresenter": () => (/* binding */ HelpPresenter)
/* harmony export */ });
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


/**
 * Tool for presenting help. Used by both HelpDlg and HelpDiv
 * jQuery free
 * @constructor
 */

var HelpPresenter = function HelpPresenter(main, owner) {
  var _this = this;

  var stack = [];

  this.html = function () {
    return '<div class="cirsim-help">Fetching...</div>';
  };

  this.present = function (url) {
    if (url === '') {
      url = 'cirsim/help/index.html';
    }

    url = main.cirsim.root + url;
    this.presentAbsolute(url);
  };

  this.presentAbsolute = function (url) {
    stack.push(url);
    _Utility_Ajax__WEBPACK_IMPORTED_MODULE_0__.Ajax.do({
      url: url,
      data: {},
      method: "GET",
      success: function success(data) {
        install(data);
      },
      error: function error(xhr, status, _error) {
        main.toast.message('Unable to communicate with server: ' + _error);
      }
    });
  };
  /*
   * Install help HTML into the presenter.
   * @param html HTML to present
   */


  var install = function install(html) {
    if (html.indexOf('{{components}}') > 0) {
      var _root = main.cirsim.root;
      var links = '<ul>';
      main.palette.palette.forEach(function (component) {
        if (component.help !== undefined) {
          //
          // There are a few components we rename here so they are
          // easier to find in the list of components.
          //
          var label = component.label;

          switch (label) {
            case '0':
              label = 'Zero';
              break;

            case '1':
              label = 'One';
              break;
          }

          links += "<li><a href=\"".concat(component.help, ".html\">").concat(label, "</a> <em>").concat(component.desc, "</em></li>");
        }
      });
      links += '</ul>';
      html = html.replace('{{components}}', links);
    }

    var root = main.cirsim.root;
    html = html.replace(/src="img\//g, 'src="' + root + 'cirsim/help/img/');
    html = html.replace(/href="/g, 'href="' + root + 'cirsim/help/'); // Install a click handler for every link so they stay in this page
    // rather than navigating to the link.

    var cirsimHelp = owner.element.querySelector('.cirsim-help');

    if (cirsimHelp !== null) {
      cirsimHelp.innerHTML = html;

      var _iterator = _createForOfIteratorHelper(cirsimHelp.querySelectorAll('a')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var link = _step.value;
          link.addEventListener('click', function (event) {
            event.preventDefault();

            _this.presentAbsolute(event.target.href);
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };

  this.home = function () {
    this.present('');
  };

  this.back = function () {
    if (stack.length < 2) {
      return;
    } // Pop off the current page


    stack.pop(); // Page to return to

    var url = stack[stack.length - 1]; // Pop it off, since it will be pushed back on

    stack.pop();
    this.presentAbsolute(url);
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/Led.js":
/*!****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/Led.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Led": () => (/* binding */ Led)
/* harmony export */ });
/* harmony import */ var _Utility_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/Vector */ "./packages/cirsim/src/Cirsim/Utility/Vector.js");

/**
 * Object that simulates an LED
 */

var Led = function Led(x, y, param1, param2) {
  this.x = x;
  this.y = y;
  this.color = "undefined";

  if (param2 === undefined) {
    // Round LED
    this.radius = param1;
    this.width = param1 * 2;
    this.height = param1 * 2;
  } else {
    // Rectangular LED
    this.radius = null;
    this.width = param1;
    this.height = param2;
  }
};
Led.colors = {
  black: ['#000000', '#000000'],
  undefined: ['#444444', '#888888'],
  green: ['#55ff88', "#00fb4a"],
  red: ["#ff4444", "#ff0000"],
  blue: ["#25ffff", "#15ddff"],
  purple: ["#c000ff", "#8000ff"],
  yellow: ["#ffff00", "#ffff80"],
  none: ['#000000', '#000000']
};

Led.prototype.draw = function (context, x, y, background) {
  if (this.color === 'none') {
    return;
  }

  var saveFill = context.fillStyle;

  if (background === undefined) {
    background = "white";
  }

  context.beginPath();
  x += this.x;
  y += this.y;
  var r = this.radius * 1.15;
  var color1, color2;

  if (Led.colors.hasOwnProperty(this.color)) {
    color1 = Led.colors[this.color][0];
    color2 = Led.colors[this.color][1];
  } else {
    color1 = '#000000';
    color2 = '#000000';
  }

  if (this.radius !== null) {
    var grd = context.createRadialGradient(x, y, 1, x, y, r);
    grd.addColorStop(0, color1);
    grd.addColorStop(0.5, color2);
    grd.addColorStop(1, background);
    context.fillStyle = grd;
  } else {
    var _grd = context.createLinearGradient(0, y - this.height / 2, 0, y + this.height / 2);

    _grd.addColorStop(0, background);

    _grd.addColorStop(0.25, color1);

    _grd.addColorStop(0.75, color1);

    _grd.addColorStop(1, background);

    context.fillStyle = _grd;
  }

  context.fillRect(x - this.width / 2, y - this.height / 2, this.width, this.height);

  if (this.color === "undefined") {
    context.font = "14px Times";
    context.fillStyle = "#ffffff"; // "#00ffff";

    context.fontWeight = "bold";
    context.textAlign = "center";
    context.fillText("?", x, y + 5);
    context.fillText("?", x + 1, y + 5);
    context.fontWeight = "normal";
  }

  context.fillStyle = saveFill;
};

Led.prototype.touch = function (x, y, touchX, touchY) {
  x += this.x;
  y += this.y;
  return _Utility_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.distance({
    x: x,
    y: y
  }, {
    x: touchX,
    y: touchY
  }) <= this.radius;
};
/**
 * Create an HTML selector for LED colors.
 * @param id ID to apply to the selector
 * @param current Current value (selected)
 * @param allowNone If true, allow the color 'none'
 * @returns {string}
 */


Led.colorSelector = function (id, current) {
  var allowNone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var html = '<div class="control1 center"><label for="' + id + '">Color: </label><select id="' + id + '">';
  var colors = Led.colors;

  for (var color in colors) {
    if (!colors.hasOwnProperty(color)) {
      continue;
    }

    if (color === 'black' || color === 'undefined') {
      continue;
    }

    if (allowNone !== true && color === 'none') {
      continue;
    }

    if (color === current) {
      html += '<option selected>' + color + '</option>';
    } else {
      html += '<option>' + color + '</option>';
    }
  }

  html += '</select></div>';
  return html;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js":
/*!*************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaletteImage": () => (/* binding */ PaletteImage)
/* harmony export */ });
/**
 * Object for drawing an image that appears in the palette.
 *
 * Creates the canvas element that is used to draw the image
 *
 * jQuery free...
 *
 * @constructor
 * @param width Width of the canvas in pixels
 * @param height Height of the canvas in pixels
 */
var PaletteImage = function PaletteImage(width, height) {
  this.width = width;
  this.height = height;
  this.scale = width / 60;
  var canvasHeight = height / this.scale;
  this.element = document.createElement('canvas');
  this.element.style.width = '60px';
  this.element.style.height = canvasHeight + 'px';
  this.element.style.backgroundColor = 'transparent';
  this.canvas = this.element;
  this.canvas.height = this.height;
  this.canvas.width = this.width;
  this.context = this.canvas.getContext("2d");
  this.context.lineWidth = this.scale;
};
/**
 * Draw a box.
 * @param wid Box width
 * @param hit Box height
 */

PaletteImage.prototype.box = function (wid, hit) {
  var x = this.width / 2;
  var y = this.height / 2;
  var leftX = x - wid / 2 - 0.5;
  var rightX = x + wid / 2 + 0.5;
  var topY = y - hit / 2 - 0.5;
  var botY = y + hit / 2 + 0.5;
  this.context.beginPath();
  this.context.moveTo(leftX, topY);
  this.context.lineTo(rightX, topY);
  this.context.lineTo(rightX, botY);
  this.context.lineTo(leftX, botY);
  this.context.lineTo(leftX, topY);
  this.fillStroke();
};
/**
 * Draw a circle
 * @param x Center of circle
 * @param y Center of circle
 * @param radius Circle radius
 */


PaletteImage.prototype.circle = function (x, y, radius) {
  x += this.width / 2;
  y += this.height / 2;
  var save = this.context.fillStyle;
  this.context.fillStyle = '#ffffff';
  this.context.beginPath();
  this.context.arc(x, y, radius, 0, 2 * Math.PI);
  this.context.fill();
  this.context.fillStyle = save;
  this.context.beginPath();
  this.context.arc(x, y, radius, 0, 2 * Math.PI);
  this.context.stroke();
};
/**
 * Draw an I/O pin for a component
 * @param x X location of pin relative to center of image
 * @param y Y location of pin relative to center of image
 * @param dir Direction of pin 'n', 'e', 's', 'w'
 * @param cnt (optional) Number of pins to draw
 * @param dy (optional) Delta Y between pins
 */


PaletteImage.prototype.io = function (x, y, dir, cnt, dy) {
  cnt = cnt !== undefined ? cnt : 1;
  dy = dy !== undefined ? dy : 1;
  x += this.width / 2;
  y += this.height / 2;

  for (var i = 0; i < cnt; i++) {
    this.context.beginPath();
    this.context.moveTo(x, y);
    var len = 6 * this.scale;

    switch (dir) {
      case 'w':
      case 'W':
        this.context.lineTo(x - len, y);
        break;

      case 'e':
      case 'E':
        this.context.lineTo(x + len, y);
        break;

      case 'n':
      case 'N':
        this.context.lineTo(x, y - len);
        break;

      case 's':
      case 'S':
        this.context.lineTo(x, y + len);
        break;
    }

    this.context.stroke();
    y += dy;
  }
};

PaletteImage.prototype.clock = function (x, y, dir) {
  this.io(x, y, dir);
  this.context.beginPath();
  var wid = 3;
  x += this.width / 2;
  y += this.height / 2;

  switch (dir) {
    case 'n':
    case 'N':
      this.context.moveTo(x - wid, y);
      this.context.lineTo(x, y + wid);
      this.context.lineTo(x + wid, y);
      break;
  }

  this.context.stroke();
};
/**
 * Draw text on the palette image.
 * @param text Text to draw
 * @param x Location relative to center of the image
 * @param y Location relative to center of the image
 * @param font Font to use
 */


PaletteImage.prototype.drawText = function (text, x, y, font) {
  var context = this.context;
  context.beginPath();
  context.font = font !== undefined ? font : "14px Times";
  context.textAlign = "center";
  context.fillText(text, x + this.width / 2, y + this.height / 2);
  context.stroke();
};

PaletteImage.prototype.drawTextBar = function (text, x, y, font) {
  var context = this.context;
  var lw = context.lineWidth;
  this.drawText(text, x, y, font);
  context.lineWidth = 1;
  var wid = context.measureText(text);
  context.beginPath();
  y += this.height / 2 - 16;
  context.moveTo(x + this.width / 2 - wid.width / 2, y);
  context.lineTo(x + this.width / 2 + wid.width / 2, y);
  context.stroke();
  context.lineWidth = lw;
};
/**
 * Fill a path and then stroke it.
 * @param fillStyle Optional fill style to use. Uses white if not supplied.
 */


PaletteImage.prototype.fillStroke = function (fillStyle) {
  if (fillStyle === undefined) {
    fillStyle = 'white';
  }

  var fs = this.context.fillStyle;
  this.context.fillStyle = fillStyle;
  this.context.fill();
  this.context.fillStyle = fs;
  this.context.stroke();
};
/**
 * Set the line width.
 * @param w New width to set
 * @returns {number} Current line width
 */


PaletteImage.prototype.lineWidth = function (w) {
  var lw = this.context.lineWidth;
  this.context.lineWidth = w;
  return lw;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/Screw.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/Screw.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Screw": () => (/* binding */ Screw)
/* harmony export */ });
/**
 * Simple drawing of a screw head
 * @constructor
 */
var Screw = function Screw() {};

Screw.draw = function (context, x, y, radius, angle) {
  var saveFillStyle = context.fillStyle;
  var saveStrokeStyle = context.strokeStyle;
  context.fillStyle = "#dddddd";
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#000000";
  context.lineWidth = 0.5;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  var dx = Math.cos(angle) * radius;
  var dy = Math.sin(angle) * radius;
  context.moveTo(x - dx, y - dy);
  context.lineTo(x + dx, y + dy);
  context.stroke();
  context.strokeStyle = saveStrokeStyle;
  context.fillStyle = saveFillStyle;
  context.lineWidth = 1;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Graphics/Toast.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Graphics/Toast.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toast": () => (/* binding */ Toast)
/* harmony export */ });
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");

/**
 * Toast notification system
 * jQuery-free
 * @param main Main object
 * @constructor
 */

var Toast = function Toast(main) {
  var _this = this;

  /** Default toast duration in milliseconds */
  this.defaultDuration = 2000;
  /** Inter-toast delay time in milliseconds */

  this.interToastDelay = 500;
  var messages = []; // Pending messages

  var active = false; // Is there an active message displaying?

  var element = null;
  /**
   * Create the toast div
   * @param div Div to put the toast into
   */

  this.create = function (div) {
    element = _DOM_Tools__WEBPACK_IMPORTED_MODULE_0__.Tools.createClassedDiv('toast');
    div.appendChild(element);
    element.innerHTML = 'testing';
  };

  var show = function show() {
    if (messages.length > 0 && !active) {
      // Set the message
      var message = messages[0];
      messages.splice(0, 1);
      element.innerHTML = message.msg; // Show it

      element.classList.add('toast-active');
      active = true; // Delay while active

      setTimeout(function () {
        // Hide it
        element.classList.remove('toast-active'); // Delay between toasts

        setTimeout(function () {
          active = false;
          show();
        }, _this.interToastDelay);
      }, message.time);
    }
  };
  /**
   * Display a toast message
   * @param msg Message to display
   * @param time Time to display in milliseconds, omit for default
   */


  this.message = function (msg, time) {
    if (time === undefined) {
      time = this.defaultDuration;
    }

    messages.push({
      msg: msg,
      time: time
    });
    show();
  };
  /**
   * Display any JSON errors we have received.
   * @param jsonApi JsonAPI object
   * @returns {boolean} true if any errors existed.
   */


  this.jsonErrors = function (jsonApi) {
    var _this2 = this;

    if (jsonApi.errors() !== null) {
      jsonApi.errors().forEach(function (error) {
        _this2.message('Server Error: ' + error.title, 5000);
      });
      return true;
    }

    return false;
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/In.js":
/*!******************************************!*\
  !*** ./packages/cirsim/src/Cirsim/In.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "In": () => (/* binding */ In)
/* harmony export */ });
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Connector */ "./packages/cirsim/src/Cirsim/Connector.js");
/* harmony import */ var _Out__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Out */ "./packages/cirsim/src/Cirsim/Out.js");


/**
 * In connection for a component
 * @param component Component this connector is for
 * @param x Relative x on the component
 * @param y Relative y on the component
 * @param len Length in pixels to draw the connector
 * @param name Name to draw next to the connector
 * @param inv True (optional) if connector has a circle (inverse)
 * @implements Connector
 * @constructor
 */

var In = function In(component, x, y, len, name, inv) {
  _Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.call(this, component, x, y, len, name, inv);
  this.from = []; // Objects of type Connection

  this.orientation = "w"; // Default orientation for inputs is west
};
In.prototype = Object.create(_Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.prototype);
In.prototype.constructor = In;

In.prototype.clone = function () {
  var copy = new In(this.component, this.x, this.y, this.len, this.name, this.inv);
  copy.orientation = this.orientation;
  copy.copyFrom(this);
  return copy;
};
/**
 * Set the value from a connection
 */


In.prototype.set = function () {
  var value = this.from.length > 0 && this.from[0].from !== null ? this.from[0].from.value : undefined;

  if (this.value !== value) {
    this.value = value;
    this.component.pending();
  }
};

In.prototype.testAsString = function (value) {
  this.component.testAsString(value, this);
};
/**
 * Set a connection as the from for this input.
 * @param connection Connection to set
 */


In.prototype.setConnection = function (connection) {
  this.from.forEach(function (existing) {
    existing["delete"](this);
  });
  connection.to = this;
  this.from = [connection]; // Update value whenever a connection is made

  this.set();
};
/**
 * Clear all connections to this input
 */


In.prototype.clear = function () {
  this.from.forEach(function (existing) {
    existing["delete"](this);
  });
  this.from = [];
};
/**
 * Add a connection to this input. Normal connections only allow
 * one connection per input, but we allow two during the time we are
 * creating a new connection.
 * @param connection Connection to add
 */


In.prototype.add = function (connection) {
  this.from.push(connection);
};

In.prototype.remove = function (connection) {
  var newFrom = [];
  this.from.forEach(function (value) {
    if (value !== connection) {
      newFrom.push(value);
    }
  });
  this.from = newFrom;
};

In.prototype.draw = function (context, view) {
  _Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.prototype.draw.call(this, context, view);

  for (var i = 0; i < this.from.length; i++) {
    if (this.from[i].from === null) {
      this.from[i].draw(context, view);
    }
  }
};
/**
 * Get a bounding box that encloses this connector.
 * @returns {Rect}
 */


In.prototype.bounds = function () {
  var bounds = _Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.prototype.bounds.call(this);
  return bounds;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/InvalidArgumentException.js":
/*!****************************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/InvalidArgumentException.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvalidArgumentException": () => (/* binding */ InvalidArgumentException)
/* harmony export */ });
/**
 * Exception for indicating an invalid argument.
 * @param message
 * @constructor
 */
var InvalidArgumentException = function InvalidArgumentException(message) {
  this.message = message; // Use V8's native method if available, otherwise fallback

  if ("captureStackTrace" in Error) Error.captureStackTrace(this, InvalidArgumentException);else this.stack = new Error().stack;
};
InvalidArgumentException.prototype = Object.create(Error.prototype);
InvalidArgumentException.prototype.name = "InvalidArgumentException";
InvalidArgumentException.prototype.constructor = InvalidArgumentException;

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Main.js":
/*!********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Main.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Main": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var resizer_cl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! resizer-cl */ "./.yarn/cache/resizer-cl-npm-2.4.3-b618b20eb7-cacb0c49e5.zip/node_modules/resizer-cl/index.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./packages/cirsim/src/Cirsim/Menu.js");
/* harmony import */ var _Palette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Palette */ "./packages/cirsim/src/Cirsim/Palette.js");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Model */ "./packages/cirsim/src/Cirsim/Model.js");
/* harmony import */ var _Circuit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Circuit */ "./packages/cirsim/src/Cirsim/Circuit.js");
/* harmony import */ var _Tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tabs */ "./packages/cirsim/src/Cirsim/Tabs.js");
/* harmony import */ var _Dlg_ExportDlg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Dlg/ExportDlg */ "./packages/cirsim/src/Cirsim/Dlg/ExportDlg.js");
/* harmony import */ var _Dlg_ImportDlg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Dlg/ImportDlg */ "./packages/cirsim/src/Cirsim/Dlg/ImportDlg.js");
/* harmony import */ var _Test_Test__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Test/Test */ "./packages/cirsim/src/Cirsim/Test/Test.js");
/* harmony import */ var _Graphics_Toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Graphics/Toast */ "./packages/cirsim/src/Cirsim/Graphics/Toast.js");
/* harmony import */ var _Dlg_FileSaveDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Dlg/FileSaveDialog */ "./packages/cirsim/src/Cirsim/Dlg/FileSaveDialog.js");
/* harmony import */ var _Dlg_FileOpenDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Dlg/FileOpenDialog */ "./packages/cirsim/src/Cirsim/Dlg/FileOpenDialog.js");
/* harmony import */ var _Dlg_SaveDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Dlg/SaveDialog */ "./packages/cirsim/src/Cirsim/Dlg/SaveDialog.js");
/* harmony import */ var _Dlg_OpenDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Dlg/OpenDialog */ "./packages/cirsim/src/Cirsim/Dlg/OpenDialog.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./View */ "./packages/cirsim/src/Cirsim/View.js");
/* harmony import */ var _Graphics_HelpDiv__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Graphics/HelpDiv */ "./packages/cirsim/src/Cirsim/Graphics/HelpDiv.js");
/* harmony import */ var _UI_DragAndDrop__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./UI/DragAndDrop */ "./packages/cirsim/src/Cirsim/UI/DragAndDrop.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





















/**
 * Actual instance of Cirsim for a single element.
 * @param cirsim The main Cirsim object
 * @param element Element we are loading into
 * @param tests Array of tests added to cirsim using addTest
 * @constructor
 */

var Main = function Main(cirsim, element, tests) {
  var _this3 = this;

  this.cirsim = cirsim;
  this.element = element;
  this.options = cirsim.options;
  this.components = cirsim.components;
  this.test = new _Test_Test__WEBPACK_IMPORTED_MODULE_8__.Test(this); /// div.main

  this.div = null; //
  // Tests can come from add_test or from options
  //

  var _iterator = _createForOfIteratorHelper(tests),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var test = _step.value;
      this.test.addTest(test);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(this.options.tests),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _test = _step2.value;
      this.test.addTest(_test);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  this.filename = null;
  var options = cirsim.options; /// The active editing model

  var model = null; /// References to other model components

  var menu = null,
      palette = null,
      tabs = null; /// div.overlay

  var divOverlay = null,
      divWork = null;

  this.initialize = function () {
    var _this = this;

    if (options.display !== 'none') {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.addClass(element, 'cirsim');
      element.innerHTML = '';

      switch (options.display) {
        case 'full':
          _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.addClass(element, 'cirsim-full');
          break;

        case 'inline':
          _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.addClass(element, 'cirsim-inline');
          break;

        default:
          _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.addClass(element, 'cirsim-window');
          break;
      }

      if (options.display === 'window') {
        //
        // Add resizer to the window if in window mode
        // and it has not already been added
        //
        if (!element.classList.contains("resizer")) {
          new resizer_cl__WEBPACK_IMPORTED_MODULE_0__.default(element, {
            handle: '10px solid #18453B'
          });
        }
      }

      this.dragAndDrop = new _UI_DragAndDrop__WEBPACK_IMPORTED_MODULE_16__.DragAndDrop(this); //
      // Install a mutation observer so we can know if the
      // element that contains Cirsim is removed from the
      // DOM.
      //

      var observer = new MutationObserver(function () {
        if (!document.body.contains(element)) {
          observer.disconnect();

          _this.model.kill();
        }
      });
      observer.observe(document.body, {
        childList: true
      });
    } //
    // Instantiate a model object
    //


    model = new _Model__WEBPACK_IMPORTED_MODULE_3__.Model(this);
    this.model = model;

    for (var i in this.options.tabs) {
      this.model.circuits.add(new _Circuit__WEBPACK_IMPORTED_MODULE_4__.Circuit(this.options.tabs[i]));
    }

    if (this.options.load !== null) {
      model.fmJSON(this.options.load);
    } //
    // Create and add the window components
    //


    if (options.display !== 'inline' && options.display !== 'none') {
      //
      // All window-based versions other than inline get the
      // full user interface
      //
      // <div class="main"></div>
      this.div = _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.createClassedDiv('main');
      this.element.appendChild(this.div);
      this.help = new _Graphics_HelpDiv__WEBPACK_IMPORTED_MODULE_15__.HelpDiv(this);
      tabs = new _Tabs__WEBPACK_IMPORTED_MODULE_5__.Tabs(this);
      this.tabs = tabs; //
      // Add the menu
      //

      menu = new _Menu__WEBPACK_IMPORTED_MODULE_1__.Menu(this);
      this.menu = menu; //
      // Working area
      // <div class="work"></div>
      //

      divWork = _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.createClassedDiv('work');
      this.div.appendChild(divWork); //
      // And the palette
      //

      palette = new _Palette__WEBPACK_IMPORTED_MODULE_2__.Palette(this, divWork);
      this.palette = palette; //
      // And add the tabs
      //

      tabs.create(divWork); //
      // And the overlay
      // <div class="cirsim-overlay"></div>
      //

      divOverlay = _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.createClassedDiv('cirsim-overlay');
      this.div.appendChild(divOverlay);
      this.toast = new _Graphics_Toast__WEBPACK_IMPORTED_MODULE_9__.Toast(this);
      this.toast.create(this.div);
    }

    if (options.display === 'inline') {
      //
      // The minimal inline version
      // <div><canvas></canvas></div>
      //
      var div = document.createElement('div');
      element.appendChild(div);
      var canvas = document.createElement('canvas');
      div.appendChild(canvas);
      var circuit = model.circuits.getCircuit('main');
      var view = new _View__WEBPACK_IMPORTED_MODULE_14__.View(this, canvas, circuit, 0);
      model.getSimulation().setView(view); //
      // And the overlay
      // <div class="cirsim-overlay"></div>
      //

      divOverlay = _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.createClassedDiv('cirsim-overlay');
      element.appendChild(divOverlay);
      this.toast = new _Graphics_Toast__WEBPACK_IMPORTED_MODULE_9__.Toast(this);
      this.toast.create(this.element);
    } //
    // If open is specified with a single name, we
    // automatically open the file when we start.
    //


    var open = this.options.getAPI('open');

    if (open !== null && open.url !== undefined && open.name !== undefined) {
      this.filename = open.name;
      var dlg = new _Dlg_OpenDialog__WEBPACK_IMPORTED_MODULE_13__.OpenDialog(open.name, this.options, this.toast);
      dlg.open(function (name, json) {
        model.fmJSON(json);

        _this.reload();

        _this.filename = name;
      });
    }
  };

  this.addTest = function (test) {
    this.test.addTest(test);
  };

  this.currentView = function () {
    return tabs.currentView();
  };
  /**
   * Called whenever a new tab is selected
   */


  this.newTab = function () {
    if (palette !== null) {
      palette.refresh();
    }

    model.newTab();
  };
  /**
   * Backup the current circuits object in support of an Undo operation
   */


  this.backup = function () {
    model.backup();
  };
  /**
   * Undo operation
   */


  this.undo = function () {
    model.undo();
    tabs.undo();
    palette.refresh();
  };
  /**
   * Set or clear interface modal state.
   * @param modal True sets interface to modal state.
   *
   */


  this.modal = function (modal) {
    if (modal) {
      divOverlay.style.display = 'block';
    } else {
      divOverlay.style.display = 'none';
    }
  };

  this.open = function () {
    var _this2 = this;

    var dlg = new _Dlg_FileOpenDialog__WEBPACK_IMPORTED_MODULE_11__.FileOpenDialog(this.options, this.toast);
    dlg.open(function (name, data) {
      model.fmJSON(data);

      _this2.reload();

      _this2.filename = name;
    });
  };
  /**
   * Save the model to the server.
   * @param singleOnly If true, we only save if the single-file save option
   * @param silent If true, do not display a toast on successful single-file save
   */


  this.save = function (singleOnly, silent) {
    var api = _this3.options.getAPI('save');

    if (api === null) {
      // Save is not supported
      return;
    }

    if (api.name !== undefined) {
      var json = model.toJSON();
      var data = Object.assign({
        cmd: "save",
        name: api.name,
        data: json,
        type: 'application/json'
      }, api.extra);
      _Utility_Ajax__WEBPACK_IMPORTED_MODULE_18__.Ajax.do({
        url: api.url,
        data: data,
        method: "POST",
        dataType: 'json',
        contentType: api.contentType,
        success: function success(data) {
          var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_19__.JsonAPI(data);

          if (!_this3.toast.jsonErrors(json)) {
            if (silent !== true) {
              _this3.toast.message('Successfully saved to server');
            }
          }
        },
        error: function error(xhr, status, _error) {
          console.log(xhr.responseText);

          _this3.toast.message('Unable to communicate with server: ' + _error);
        }
      });
      return;
    }

    if (singleOnly === true) {
      return;
    }

    if (_this3.filename === null) {
      _this3.saveAs();
    } else {
      var _json = model.toJSON();

      var dlg = new _Dlg_SaveDialog__WEBPACK_IMPORTED_MODULE_12__.SaveDialog(_json, "application/json", _this3.filename, _this3.options, _this3.toast);
      dlg.open();
    }
  };

  this.saveAs = function () {
    var _this4 = this;

    var json = model.toJSON();
    var dlg = new _Dlg_FileSaveDialog__WEBPACK_IMPORTED_MODULE_10__.FileSaveDialog(json, "application/json", this.options, this.toast);

    if (this.filename !== null) {
      dlg.filename = this.filename;
    }

    dlg.open(function (name) {
      _this4.filename = name;
    });
  };

  this["export"] = function () {
    var dlg = new _Dlg_ExportDlg__WEBPACK_IMPORTED_MODULE_6__.ExportDlg(model);
    dlg.open();
  };

  this["import"] = function () {
    var dlg = new _Dlg_ImportDlg__WEBPACK_IMPORTED_MODULE_7__.ImportDlg(this, model);
    dlg.open();
  };

  this.importTab = function () {
    // Is the current tab in this list?
    for (var i = 0; i < this.options.imports.length; i++) {
      var importer = this.options.imports[i];

      if (importer.into === this.currentView().circuit.name) {
        this.currentView().importTab(importer);
        return;
      }
    }
  };
  /**
   * Complete reload after a new model is loaded
   */


  this.reload = function () {
    tabs.destroy();
    tabs.create(divWork, model);
  };

  var dockedHelp = false;

  this.isHelpDocked = function () {
    return dockedHelp;
  };

  this.dockedHelp = function (dock) {
    dockedHelp = dock;

    if (dockedHelp) {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.addClass(this.element, 'docked-help');
    } else {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_17__.Tools.removeClass(this.element, 'docked-help');
    }
  };
  /**
   * Load a model from JSON
   * @param json JSON source
   */


  this.load = function (json) {
    model.fmJSON(json);
    this.reload();
  };

  this.initialize();
};

Main.prototype.runTest = function (test) {
  return this.test.runTest(test);
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Menu.js":
/*!********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Menu.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");
/* harmony import */ var _Menus_FileMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menus/FileMenu */ "./packages/cirsim/src/Cirsim/Menus/FileMenu.js");
/* harmony import */ var _Menus_EditMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menus/EditMenu */ "./packages/cirsim/src/Cirsim/Menus/EditMenu.js");
/* harmony import */ var _Menus_TabsMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Menus/TabsMenu */ "./packages/cirsim/src/Cirsim/Menus/TabsMenu.js");
/* harmony import */ var _Menus_OptionsMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Menus/OptionsMenu */ "./packages/cirsim/src/Cirsim/Menus/OptionsMenu.js");
/* harmony import */ var _Menus_HelpMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Menus/HelpMenu */ "./packages/cirsim/src/Cirsim/Menus/HelpMenu.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








/**
 * The program menu bar
 * @param main Main object
 * @constructor
 */

var Menu = function Menu(main) {
  var _this = this;

  //
  // Create the menu components
  //
  var fileMenu = new _Menus_FileMenu__WEBPACK_IMPORTED_MODULE_2__.FileMenu(this, main);
  var editMenu = new _Menus_EditMenu__WEBPACK_IMPORTED_MODULE_3__.EditMenu(this, main);
  var tabsMenu = new _Menus_TabsMenu__WEBPACK_IMPORTED_MODULE_4__.TabsMenu(this, main);
  var optionsMenu = new _Menus_OptionsMenu__WEBPACK_IMPORTED_MODULE_5__.OptionsMenu(this, main);
  var helpMenu = new _Menus_HelpMenu__WEBPACK_IMPORTED_MODULE_6__.HelpMenu(this, main);
  this.helpMenu = helpMenu; /// The nav and ul elements for the menu

  this.nav = null;
  this.ul = null;

  var initialize = function initialize() {
    //
    // <nav class="menubar"><ul></ul></nav>
    //
    _this.nav = document.createElement('nav');
    _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.addClass(_this.nav, 'menubar');
    main.div.appendChild(_this.nav);
    var ul = document.createElement('ul');

    _this.nav.appendChild(ul);

    _this.ul = ul; //
    // Add the menu component's HTML
    //

    var html = '';
    html += fileMenu.html();
    html += editMenu.html();

    if (main.options.tabsMenu) {
      html += tabsMenu.html();
    }

    html += optionsMenu.html();
    html += helpMenu.html(); //
    // Add any tests as top-level menu options
    //

    var i = 0;

    var _iterator = _createForOfIteratorHelper(main.test.tests),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var test = _step.value;
        html += '<li><a class="cirsim-test-' + i + '">' + test.name + '</a></li>';
        i++;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    ul.innerHTML = html; //
    // Menu option for testing the Toast error reporting mechanism
    //
    // html += `<li><a class="toast-test">Toast!</a></li>`;
    // ul.innerHTML = html;
    //
    // this.toasts = 0;
    // this.click('.toast-test', (event)=> {
    // 	this.toasts++;
    // 	main.toast.message('Toast message ' + this.toasts);
    // });
    //
    // Install click handlers for all top-level menus
    //

    var _iterator2 = _createForOfIteratorHelper(ul.childNodes),
        _step2;

    try {
      var _loop = function _loop() {
        var node = _step2.value;

        if (node.tagName === 'LI') {
          node.addEventListener('click', function (event) {
            event.preventDefault(); // Find the <ul> in this menu

            var ulSub = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.child(node, 'UL');

            if (ulSub !== null) {
              if (getComputedStyle(ulSub).getPropertyValue('visibility') === 'hidden') {
                open(node);
              } else {
                // If already open, close all
                _this.closeAll();
              }
            }
          });
        }
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop();
      } //
      // Install test function handlers
      //

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    i = 0;

    var _iterator3 = _createForOfIteratorHelper(main.test.tests),
        _step3;

    try {
      var _loop2 = function _loop2() {
        var test = _step3.value;
        var cls = ".cirsim-test-" + i;

        _this.click(cls, function (event) {
          event.preventDefault();
          main.test.runTestDlg(test);
        });

        i++;
      };

      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        _loop2();
      } // Activate all of the menus

    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    fileMenu.activate();
    editMenu.activate();
    tabsMenu.activate();
    optionsMenu.activate();
    helpMenu.activate();
  };
  /*
      * Listen to key down events so we can close the menu
      * if we click outside of the menu while it is open.
   */


  var closeListener = function closeListener(event) {
    // See if we clicked on some child of nav...
    var node = event.target.parentNode;

    for (; node !== null; node = node.parentNode) {
      if (node === _this.nav) {
        return;
      }
    }

    _this.closeAll();
  };
  /*
   * Open a menu
   */


  var open = function open(li) {
    // Hide any other menus
    var _iterator4 = _createForOfIteratorHelper(_this.ul.childNodes),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var node = _step4.value;

        if (node.tagName === 'LI') {
          var _ul = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.child(node, 'UL');

          if (_ul !== null) {
            _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.removeClass(_ul, 'menu-open');
          }
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    selectionDependent(".edit-delete");
    componentSelectionDependent(".edit-properties");
    fileMenu.opening();
    tabsMenu.opening();
    optionsMenu.opening();
    helpMenu.opening(); // And open this menu

    var ul = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.child(li, 'UL');

    if (ul !== null) {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.addClass(ul, 'menu-open');
    }

    document.addEventListener('click', closeListener);
    document.addEventListener('mousedown', closeListener);
  };
  /** Close all menus */


  this.closeAll = function () {
    var _iterator5 = _createForOfIteratorHelper(_this.ul.childNodes),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var node = _step5.value;

        if (node.tagName === 'LI') {
          var ul = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.child(node, 'UL');

          if (ul !== null) {
            _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.removeClass(ul, 'menu-open');
          }
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    document.removeEventListener('click', closeListener);
    document.removeEventListener('mousedown', closeListener);
  };
  /**
      * Enable or disable a menu option by selector
   * @param sel Selector for the menu option (like '.tabs-add')
   * @param enable True to enable
   */


  this.enable = function (sel, enable) {
    var element = _this.ul.querySelector(sel);

    if (element === null) {
      return;
    }

    if (enable) {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.removeClass(element.parentNode, "menu-disabled");
    } else {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.addClass(element.parentNode, "menu-disabled");
    }
  };
  /*
   * Enable a menu option only if there is a current selection
   */


  var selectionDependent = function selectionDependent(sel) {
    _this.enable(sel, main.currentView().selection.selection.length > 0);
  };
  /*
   * Enable a menu option only if one component is selected
   */


  var componentSelectionDependent = function componentSelectionDependent(sel) {
    if (main.currentView().selection.selection.length !== 1 || !(main.currentView().selection.selection[0] instanceof _Component__WEBPACK_IMPORTED_MODULE_0__.Component)) {
      _this.enable(sel, false);
    } else {
      _this.enable(sel, true);
    }
  };
  /**
      * Find a menu option by selector
   * @param sel
   * @returns {Element}
   */


  this.find = function (sel) {
    return _this.ul.querySelector(sel);
  };
  /**
      * Install a menu option click hander
   * @param sel Selector for the menu option
   * @param closure The closure to call (passes 'event')
   */


  this.click = function (sel, closure) {
    var element = _this.find(sel);

    if (element !== null) {
      element.addEventListener('click', function (event) {
        event.preventDefault();

        _this.closeAll();

        closure(event);
      });
    }
  };

  initialize();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Menus/EditMenu.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Menus/EditMenu.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditMenu": () => (/* binding */ EditMenu)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./packages/cirsim/src/Cirsim/Component.js");

/**
 * The Edit menu
 * @param menu Menu object
 * @param main Main object
 * @constructor
 */

var EditMenu = function EditMenu(menu, main) {
  this.html = function () {
    return '<li><a>Edit</a>' + '<ul class="edit-menu">' + '<li><a class="edit-undo"><span class="icons-cl icons-cl-arrowreturnthick-1-w"></span>Undo</a></li>' + '<li><a class="edit-delete"><span class="icons-cl icons-cl-trash"></span>Delete</a></li>' + '<li class="menu-divider">&nbsp;</li>' + '<li><a class="edit-properties">Properties</a></li>' + '</ul>' + '</li>';
  };

  this.activate = function () {
    menu.click('.edit-delete', function (event) {
      console.log('delete');
      main.backup();
      main.currentView()["delete"]();
    });
    menu.click('.edit-undo', function (event) {
      main.undo();
    });
    menu.click('.edit-properties', function (event) {
      if (main.currentView().selection.selection.length === 1 && main.currentView().selection.selection[0] instanceof _Component__WEBPACK_IMPORTED_MODULE_0__.Component) {
        var component = main.currentView().selection.selection[0];
        component.properties(main);
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Delete') {
        menu.closeAll();
        main.backup();
        main.currentView()["delete"]();
      } else if (event.key === 'z' && event.ctrlKey && !event.altKey && !event.shiftKey) {
        menu.closeAll();
        main.undo();
      }
    });
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Menus/FileMenu.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Menus/FileMenu.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileMenu": () => (/* binding */ FileMenu)
/* harmony export */ });
/**
 * The File menu
 * @constructor
 */
var FileMenu = function FileMenu(menu, main) {
  var options = main.options;

  this.html = function () {
    var fileHtml = '';
    var saveAPI = options.getAPI('save');
    var openAPI = options.getAPI('open'); // We only allow the Open menu option if there is no supplied filename

    if (openAPI !== null && openAPI.name === undefined) {
      fileHtml += '<li><a class="file-open"><span class="icons-cl icons-cl-folder-open"></span>Open...</a></li>';
    } // Include the Save menu option if we are supporting save


    if (saveAPI !== null) {
      fileHtml += '<li><a class="file-save"><span class="icons-cl icons-cl-disk"></span>Save</a></li>';
    } // Save-as only if there is no specific filename to use


    if (saveAPI !== null && saveAPI.name === undefined) {
      fileHtml += '<li><a class="file-saveas"><span class="icons-cl icons-cl-disk"></span>Save As...</a></li>';
    }

    if (options.loadMenu.length > 0) {
      fileHtml += optionalSeparator(fileHtml);

      for (var i = 0; i < options.loadMenu.length; i++) {
        var item = options.loadMenu[i];
        fileHtml += '<li><a class="cs-file-load-menu" data-index="' + i + '"><span class="icons-cl icons-cl-arrowthickstop-1-n"></span>' + item.name + '</a></li>';
      }
    } // Import/Export options


    if (options["export"] !== 'none') {
      fileHtml += optionalSeparator(fileHtml);

      if (options["export"] === 'both' || options["export"] === 'import') {
        fileHtml += '<li><a class="cs-file-import"><span class="icons-cl icons-cl-arrowthickstop-1-n"></span>Import</a></li>';
      }

      if (options["export"] === 'both' || options["export"] === 'export') {
        fileHtml += '<li><a class="cs-file-export"><span class="icons-cl icons-cl-arrowthickstop-1-s"></span>Export</a></li>';
      }
    }

    if (options.exportPNG) {
      fileHtml += '<li><a class="cs-file-export-png"><span class="icons-cl icons-cl-arrowthickstop-1-s"></span>Export PNG</a></li>';
    }

    if (options.imports.length > 0) {
      fileHtml += optionalSeparator(fileHtml) + "<li><a class=\"cs-file-import-tab\"><span class=\"icons-cl icons-cl-arrowthickstop-1-s\"></span>Import Tab</a></li>";
    }

    if (options.exit !== null) {
      if (fileHtml.length > 0) {
        fileHtml += '<li class="menu-divider">&nbsp;</li>'; // Separator
      }

      fileHtml += '<li><a class="file-exit">Exit</a></li>';
    }

    if (fileHtml !== '') {
      return '<li><a>File</a><ul class="file-menu">' + fileHtml + '</ul></li>';
    } else {
      return '';
    }
  };

  var optionalSeparator = function optionalSeparator(fileHtml) {
    if (fileHtml.length > 0) {
      return '<li class="menu-divider">&nbsp;</li>'; // Separator
    }

    return '';
  };

  this.activate = function () {
    menu.click('.cs-file-import', function () {
      main["import"]();
    });
    menu.click('.cs-file-export', function () {
      main["export"]();
    });
    menu.click('.cs-file-load-menu', function (event) {
      var index = event.target.dataset['index'];
      main.load(options.loadMenu[index].json);
    });
    menu.click('.cs-file-export-png', function (event) {
      main.currentView().exportPNG();
    });
    menu.click('.file-saveas', function () {
      main.saveAs();
    });
    menu.click('.file-save', function () {
      main.save();
    });
    menu.click('.file-open', function () {
      main.open();
    });
    menu.click('.cs-file-import-tab', function () {
      main.importTab();
    });
    menu.click('.file-exit', function () {
      if (options.exit !== null) {
        window.location.href = options.exit;
      }
    });
  };

  this.opening = function () {
    // We enable the Import Tab menu option
    // only if we are in a tab that we can import into
    var enable = false;
    var circuit = main.currentView().circuit;

    if (circuit !== null) {
      var name = circuit.name;

      for (var i = 0; i < main.options.imports.length; i++) {
        var importer = main.options.imports[i];

        if (importer.into === name) {
          enable = true;
          break;
        }
      }
    }

    menu.enable(".cs-file-import-tab", enable);
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Menus/HelpMenu.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Menus/HelpMenu.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpMenu": () => (/* binding */ HelpMenu)
/* harmony export */ });
/* harmony import */ var _Dlg_AboutDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Dlg/AboutDialog */ "./packages/cirsim/src/Cirsim/Dlg/AboutDialog.js");
/* harmony import */ var _Dlg_HelpDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/HelpDialog */ "./packages/cirsim/src/Cirsim/Dlg/HelpDialog.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");



/**
 * The help menu
 * @param menu
 * @param main
 * @constructor
 */

var HelpMenu = function HelpMenu(menu, main) {
  this.html = function () {
    return '<li><a>Help</a>' + '<ul class="help-menu">' + '<li><a class="help-help">Help</a></li>' + '<li><a class="help-docked-help">Docked Help<img></a></li>' + '<li><a class="help-about">About...</a></li>' + '</ul>' + '</li>';
  };

  this.componentHelp = function (helper) {
    helper = 'cirsim/help/' + helper + '.html';

    if (!main.isHelpDocked()) {
      var dlg = new _Dlg_HelpDialog__WEBPACK_IMPORTED_MODULE_1__.HelpDialog(main);
      dlg.open(helper);
    } else {
      main.help.url(helper);
    }
  };

  this.activate = function () {
    menu.click('.help-about', function (event) {
      var dlg = new _Dlg_AboutDialog__WEBPACK_IMPORTED_MODULE_0__.AboutDialog(main);
      dlg.open();
    });
    menu.click('.help-help', function (event) {
      if (!main.isHelpDocked()) {
        var dlg = new _Dlg_HelpDialog__WEBPACK_IMPORTED_MODULE_1__.HelpDialog(main);
        dlg.open('');
      } else {
        main.help.home();
      }
    });
    menu.click('.help-docked-help', function (event) {
      main.dockedHelp(!main.isHelpDocked());
    });
  };

  this.opening = function () {
    if (main.isHelpDocked()) {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.addClass(menu.find('.help-docked-help img'), 'check');
    } else {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.removeClass(menu.find('.help-docked-help img'), 'check');
    }
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Menus/OptionsMenu.js":
/*!*********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Menus/OptionsMenu.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsMenu": () => (/* binding */ OptionsMenu)
/* harmony export */ });
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");

/**
 * The Options menu
 * @param menu
 * @param main
 * @constructor
 */

var OptionsMenu = function OptionsMenu(menu, main) {
  this.html = function () {
    return "<li><a>Options</a>\n<ul class=\"option-menu\">\n<li><a class=\"option-showoutputstates\">Show Output States<img></a></li>\n</ul></li>";
  };
  /**
   * Activate the menu, installing all handlers
   */


  this.activate = function () {
    menu.click('.option-showoutputstates', function (event) {
      main.options.showOutputStates = !main.options.showOutputStates;
      main.currentView().draw();
    });
  };
  /**
   * Called when menus are opening.
   * Set the state of the menu so it will be valid when shown.
   */


  this.opening = function () {
    if (main.options.showOutputStates) {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_0__.Tools.addClass(menu.find('.option-showoutputstates img'), 'check');
    } else {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_0__.Tools.removeClass(menu.find('.option-showoutputstates img'), 'check');
    }
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Menus/TabsMenu.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Menus/TabsMenu.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsMenu": () => (/* binding */ TabsMenu)
/* harmony export */ });
/* harmony import */ var _Dlg_TabAddDlg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Dlg/TabAddDlg */ "./packages/cirsim/src/Cirsim/Dlg/TabAddDlg.js");
/* harmony import */ var _Dlg_MessageDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/MessageDialog */ "./packages/cirsim/src/Cirsim/Dlg/MessageDialog.js");
/* harmony import */ var _Dlg_TabPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Dlg/TabPropertiesDlg */ "./packages/cirsim/src/Cirsim/Dlg/TabPropertiesDlg.js");



/**
 * The Tabs menu
 * @param menu
 * @param main
 * @constructor
 */

var TabsMenu = function TabsMenu(menu, main) {
  this.html = function () {
    return "<li><a>Tabs</a>\n<ul class=\"tabs-menu\">\n<li><a class=\"tabs-properties\"><span class=\"icons-cl icons-cl-wrench\"></span>Properties...</a></li>\n<li><a class=\"tabs-add\"><span class=\"icons-cl icons-cl-play\"></span>Add...</a></li>\n<li><a class=\"tabs-delete\"><span class=\"icons-cl icons-cl-close\"></span>Delete...</a></li>\n<li><a class=\"tabs-left\"><span class=\"icons-cl icons-cl-arrowthick-1-w\"></span>Move Left</a></li>\n<li><a class=\"tabs-right\"><span class=\"icons-cl icons-cl-arrowthick-1-e\"></span>Move Right</a></li>\n</ul>\n</li>";
  };

  var del = function del() {
    var current = main.tabs.currentCircuit();

    if (current === null) {
      return;
    }

    var dlg = new _Dlg_MessageDialog__WEBPACK_IMPORTED_MODULE_1__.MessageDialog("Are you sure?", '<p class="large">Are you sure you want to ' + 'delete the tab <em>' + current.getName() + '</em>?</p>', 200);
    dlg.open(function () {
      main.tabs.delActive();
    }, true);
  };

  this.activate = function () {
    menu.click('.tabs-add', function () {
      var dlg = new _Dlg_TabAddDlg__WEBPACK_IMPORTED_MODULE_0__.TabAddDlg(main.tabs);
      dlg.open();
    });
    menu.click('.tabs-delete', function () {
      del();
    });
    menu.click('.tabs-properties', function () {
      var dlg = new _Dlg_TabPropertiesDlg__WEBPACK_IMPORTED_MODULE_2__.TabPropertiesDlg(main.tabs);
      dlg.open();
    });
    menu.click('.tabs-left', function () {
      var tabs = main.tabs;

      if (main.model.circuits.moveLeft(tabs.active)) {
        tabs.sync();
      }
    });
    menu.click('.tabs-right', function () {
      var tabs = main.tabs;

      if (main.model.circuits.moveRight(tabs.active)) {
        tabs.sync();
      }
    });
  };
  /**
   * Called when menus are opening.
   * Set the state of the menu so it will be valid when shown.
   */


  this.opening = function () {
    var tabs = main.tabs;
    var circuits = main.model.circuits;
    menu.enable('.tabs-delete', circuits.canDelete(tabs.active));
    ;
    menu.enable('.tabs-left', circuits.canMoveLeft(tabs.active));
    ;
    menu.enable('.tabs-right', circuits.canMoveRight(tabs.active));
    ;
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Model.js":
/*!*********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Model.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _Circuit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Circuit */ "./packages/cirsim/src/Cirsim/Circuit.js");
/* harmony import */ var _Circuits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Circuits */ "./packages/cirsim/src/Cirsim/Circuits.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/**
 * The circuits model.
 *
 * One Model objects owns the circuits, so all references are
 * to the model rather than to the circuits. This allows the
 * circuits to be switched out due to an undo or load.
 * @param main The Cirsim object
 * @constructor
 */

var Model = function Model(main) {
  this.main = main;
  this.circuits = new _Circuits__WEBPACK_IMPORTED_MODULE_1__.Circuits(this);
  this.circuits.add(new _Circuit__WEBPACK_IMPORTED_MODULE_0__.Circuit("main"));
};

Model.prototype.getCircuit = function (name) {
  return this.circuits.getCircuit(name);
};

Model.prototype.undo = function () {
  if (this.circuits.prev !== null) {
    this.circuits = this.circuits.prev;
  }
};

Model.prototype.backup = function () {
  this.circuits.clone();
};

Model.prototype.status = function () {
  var i = 0;
  var p = this.circuits;

  var _iterator = _createForOfIteratorHelper(p.circuits),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var circuit = _step.value;
      var j = 0;
      var c = circuit;

      while (c !== null) {
        j++;
        c = c.prev;
      }

      console.log('circuit depth: ' + j);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  while (p !== null) {
    i++;
    p = p.prev;
  }

  console.log('circuits depth: ' + i);
};
/**
 * Update components after a circuit change.
 * This is used by CircuitRef components to ensure
 * references are always correct.
 * @param circuit Update up until this circuit
 */


Model.prototype.update = function (circuit) {
  this.circuits.update(circuit);
};

Model.prototype.toJSON = function () {
  return this.circuits.toJSON();
};

Model.prototype.fmJSON = function (json) {
  this.circuits.simulation.setView(null);
  this.circuits = new _Circuits__WEBPACK_IMPORTED_MODULE_1__.Circuits(this);
  this.circuits.fmJSON(json);
};

Model.prototype.getSimulation = function () {
  return this.circuits.simulation;
};

Model.prototype.newTab = function () {
  this.circuits.newTab();
  this.recompute();
};

Model.prototype.recompute = function () {
  this.circuits.recompute();
};

Model.prototype.addCircuit = function (name) {
  this.backup();
  this.circuits.addCircuit(name);
};
/**
 * Delete a circuit by the index to the circuit
 * @param index Index into the circuits array
 */


Model.prototype.deleteCircuitByIndex = function (index) {
  this.backup();
  this.circuits.deleteCircuitByIndex(index);
};
/**
 * Get a component by it's naming
 * @param naming Naming to search for
 * @returns {*}
 */


Model.prototype.getComponentByNaming = function (naming) {
  return this.circuits.getComponentByNaming(naming);
};
/**
 * Get all components by type
 * @param type Naming to search for
 * @returns Array with collection of components of that type
 */


Model.prototype.getComponentsByType = function (type) {
  return this.circuits.getComponentsByType(type);
};
/**
 * Replace a circuit that currently exists with a new version.
 */


Model.prototype.replaceCircuit = function (circuit) {
  this.circuits.replaceCircuit(circuit);
};
/**
 * Kill any active simulation when the model is destroyed
 */


Model.prototype.kill = function () {
  this.getSimulation().kill();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Options.js":
/*!***********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Options.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Options": () => (/* binding */ Options)
/* harmony export */ });
/**
 * User interface options.
 * @param options User provided options that override the default values.
 * @constructor
 */
var Options = function Options(options) {
  options = options ? options : {}; /// Display options
  /// window - Displays as a standard div (default)
  /// inline - For display in a page without the user interface
  /// full - Full screen
  /// none - No window at all

  this.display = 'window'; /// Any content (JSON) to preload

  this.load = null; /// Menu options to load content
  /// Each item is an object with the keys name and json.
  /// The name is the menu option name that will appear.
  /// json is the actual json content to load.

  this.loadMenu = []; /// Any additional tabs to add
  /// Do not include "main", it is always included

  this.tabs = []; /// If true, we include the tabs menu

  this.tabsMenu = true; /// Do we include the input/export menu options?
  /// Options are: 'none', 'import', 'export', 'both'

  this["export"] = 'both'; /// Do we include the ability to export PNG files?

  this.exportPNG = false; /// Number of milliseconds between tests
  /// Set larger to slow the tests down

  this.testTime = 17; /// A user ID associated with some remote system
  /// Primary used for AJAX file/save functionality

  this.userid = null;
  /**
   * All installed tests as an array of tests, each of
      * which represents a single test. Each test can be
      * a Javascript object, JSON of an object, or base64 of
      * a JSON object. The use of base64 helps to obfuscate tests.
      *
   * The underlying test is a JavaScript object with these tags:
   *
   * tag: A tag to identify the test
   * name: Name of the test, what will appear in menus
   * input: Array of input labels
   * output: Array of output labels
   * test: Array of tests, each an array of input/expected
   * staff: true if this is staff testing (no saving)
      * result: A results selector
      * circuit: A circuit selector
      * success: A value to set the results selector to on a success
      * quiet: If true, don't provide actual/expected results
      *
      * If result is set, any element that matches that selector will
      * be set to 0 or the value of 'success' depending on the test failure/success
      *
      * If circuit is set, any element that matches that selector will
      * have its value set to the current circuit when the test is selected.
   */

  this.tests = [];
  /**
      * Any import options, importing from files from other assignments
      * Creates an input tab option when a specific tab is selected
      *
      * Array of possible imports, each an object with the keys:
      * from - Tab in source we import from
      * into - Tab we import into
      * name - Filename for source
      * extra - Object with extra key/value pairs to send to server when importing
   */

  this.imports = []; /// Optional specification of server-side API for save/load capabilities
  /// Most simple version is a URL for the server.
  /// More advanced version is an object with these optional properties:
  ///
  /// url - Server URL
  /// extra - Object with extra data to be send with API operations
  /// save - Object with save-specific resources (url, name, mode, extra)
  /// open - Object with open-specific resources (url, extra)
  /// import - Object with import-specific resources (url, name,
  /// files - Object with directory query-specific resources
  /// test - Object with test-specific resources
  ///

  this.api = null; /// Optional exit link. If provided, the menu will have an "Exit" option
  /// with this link in it.

  this.exit = null; /// If set to a name, a global variable will be created with that name
  /// that points to the Cirsim Main object. This allows Javascript in a
  /// page script tag to control a Cirsim instance.

  this.global = null; /// Indication of what components are included in the palette.
  /// This can be:
  /// A string with a palette name
  /// [or] An array containing strings that name components
  /// or palette names.
  ///
  /// Examples:
  /// components: 'combinatorial'
  /// components: ['combinatorial', 'Or3', 'Or4']
  /// components: ['sequential']
  ///

  this.components = ['combinatorial', 'sequential']; /// List of components that are always included even if specific components are
  /// specified in this.components.

  this.always = ['Zero', 'One', 'InPin', 'OutPin', 'Clock', 'Button', 'LED', 'Text']; /// Display all output states

  this.showOutputStates = false; ////////////////////////////////////////////////////////////////////////////////////

  for (var property in options) {
    if (options.hasOwnProperty(property)) {
      if (!this.hasOwnProperty(property)) {
        throw new Error("Invalid option " + property);
      }

      this[property] = options[property];
    }
  }
  /**
   * Get the API operations for a given file mode.
   * @param mode 'save', 'open'
   * @returns {*}
   */


  this.getAPI = function (mode) {
    if (this.api === null) {
      return null;
    }

    if (this.api === Object(this.api)) {
      var obj;

      if (this.api[mode] !== undefined) {
        // Mode is explicitly specified
        var modeObj = this.api[mode];

        if (modeObj.url === undefined) {
          // Mode is not supported
          return null;
        } // Send content type


        obj = {
          url: modeObj.url
        };

        if (modeObj.contentType !== undefined) {
          obj.contentType = modeObj.contentType;
        } else if (this.api.contentType !== undefined) {
          obj.contentType = this.api.contentType;
        } else {
          obj.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        }

        if (modeObj.extra !== undefined) {
          obj.extra = modeObj.extra;
        } else if (this.api.extra !== undefined) {
          obj.extra = this.api.extra;
        } else {
          obj.extra = {};
        }

        if (modeObj.name !== undefined) {
          obj.name = modeObj.name;
        } else if (this.api.name !== undefined) {
          obj.name = this.api.name;
        }
      } else {
        if (this.api.url === undefined) {
          return null;
        }

        obj = {
          url: this.api.url
        };

        if (this.api.extra !== undefined) {
          obj.extra = this.api.extra;
        } else {
          obj.extra = {};
        }

        if (this.api.name !== undefined) {
          obj.name = this.api.name;
        }
      }

      return obj;
    } else {
      return {
        url: this.api
      };
    }
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Out.js":
/*!*******************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Out.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Out": () => (/* binding */ Out)
/* harmony export */ });
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Connector */ "./packages/cirsim/src/Cirsim/Connector.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


/**
 * Out connector
 * @param component Component this connector is for
 * @param x Relative x on the component
 * @param y Relative y on the component
 * @param len Length in pixels to draw the connector
 * @param name Name to draw next to the connector
 * @param inv True (optional) if connector has a circle (inverse)
 * @constructor
 */

var Out = function Out(component, x, y, len, name, inv) {
  _Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.call(this, component, x, y, len, name, inv);
  this.to = []; // Objects of type Connection

  this.orientation = "e"; // Default orientation for outputs is east
};
Out.prototype = Object.create(_Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.prototype);
Out.prototype.constructor = Out;

Out.prototype.clone = function () {
  var copy = new Out(this.component, this.x, this.y, this.len, this.name, this.inv);
  copy.orientation = this.orientation;
  copy.copyFrom(this);
  return copy;
};
/**
 * Set the output value.
 *
 * This sets the value for all connected inputs as well.
 * @param value Value to set
 */


Out.prototype.set = function (value) {
  var diff = true; // If the result is an array, compare it...

  if (Array.isArray(value)) {
    if (Array.isArray(this.value)) {
      if (value.length === this.value.length) {
        diff = false;

        for (var i in value) {
          if (value[i] !== this.value[i]) {
            diff = true;
            break;
          }
        }
      }
    }
  } else {
    diff = this.value !== value;
  }

  if (diff) {
    this.value = value;

    for (var _i = 0; _i < this.to.length; _i++) {
      var inp = this.to[_i].to;

      if (inp !== null) {
        inp.set();
      }
    }
  }
};

Out.prototype.setAsString = function (value) {
  if (this.bus) {
    this.set(_Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.parseBusValue(value));
  } else {
    switch (value) {
      default:
        this.set(false);
        break;

      case '1':
        this.set(true);
        break;

      case '?':
        this.set(undefined);
        break;
    }
  }
};

Out.prototype.get = function () {
  return this.value;
};

Out.prototype.draw = function (context, view) {
  _Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.prototype.draw.call(this, context, view);

  if (this.bus) {
    context.lineWidth = 2;
  } else {
    context.lineWidth = 1;
  }
  /*
   * Draw any connections
   */


  for (var i = 0; i < this.to.length; i++) {
    this.to[i].draw(context, view);
  }

  context.lineWidth = 1;
};

Out.prototype.add = function (connection) {
  this.to.push(connection);
};

Out.prototype.remove = function (connection) {
  var newTo = [];
  this.to.forEach(function (value) {
    if (value !== connection) {
      newTo.push(value);
    }
  });
  this.to = newTo;
};
/**
 * Clear all connections to this output
 */


Out.prototype.clear = function () {
  this.to.forEach(function (existing) {
    existing["delete"](this);
  });
  this.to = [];
};
/**
 * Test connections for this out to see if they have
 * been touched.
 * @param x
 * @param y
 * @returns touched connection or null;
 */


Out.prototype.touchConnections = function (x, y) {
  for (var i = 0; i < this.to.length; i++) {
    var touched = this.to[i].touch(x, y);

    if (touched != null) {
      return touched;
    }
  }

  return null;
};
/**
 * Collect all bends that
 * are contained in the rectangle.
 * @param rect Rectangle to test
 * @param collect Collection (array) to add items to.
 */


Out.prototype.selectRect = function (rect, collect) {
  for (var i = 0; i < this.to.length; i++) {
    this.to[i].selectRect(rect, collect);
  }
};
/**
 * Get a bounding box that encloses this connector.
 * @returns {Rect}
 */


Out.prototype.bounds = function () {
  var bounds = _Connector__WEBPACK_IMPORTED_MODULE_0__.Connector.prototype.bounds.call(this);

  var _iterator = _createForOfIteratorHelper(this.to),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var to = _step.value;
      bounds.expand(to.bounds());
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return bounds;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/OutInv.js":
/*!**********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/OutInv.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutInv": () => (/* binding */ OutInv)
/* harmony export */ });
/* harmony import */ var _Out__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Out */ "./packages/cirsim/src/Cirsim/Out.js");

/**
 * Out connection for a component/inverted
 * @param component Component this connector is for
 * @param x Relative x on the component
 * @param y Relative y on the component
 * @param len Length in pixels to draw the connector
 * @param name Name to draw next to the connector
 * @param inv True (optional) if connector has a circle (inverse)
 * @constructor
 */

var OutInv = function OutInv(component, x, y, len, name, inv) {
  _Out__WEBPACK_IMPORTED_MODULE_0__.Out.call(this, component, x, y, len, name, inv);
};
OutInv.prototype = Object.create(_Out__WEBPACK_IMPORTED_MODULE_0__.Out.prototype);
OutInv.prototype.constructor = OutInv;

OutInv.prototype.draw = function (context, view) {
  /*
   * Draw the pin
   */
  var x = this.component.x + this.x;
  var y = this.component.y + this.y;
  var notRad = 4;
  context.beginPath();
  context.arc(x + notRad + 0.5, y, notRad, 0, Math.PI * 2);
  context.moveTo(x + notRad * 2, y + 0.5);
  context.lineTo(x + this.len, y + 0.5);
  context.fillRect(x + this.len - 1, y - 1, 3, 3);

  if (this.component.circuit.circuits.model.main.options.showOutputStates) {
    context.font = "11px Times";
    context.fillText(this.value === undefined ? "?" : this.value ? "1" : "0", x + 7 + notRad * 2, y - 2);
  }

  context.stroke();

  if (this.name !== undefined) {
    context.font = "12px Times";
    context.textAlign = "right";
    context.fillText(this.name, x - 3, y + 3);

    if (this.inv) {
      y -= 8;
      context.beginPath();
      context.moveTo(x - 3, y);
      context.lineTo(x - 13, y);
      context.stroke();
    }
  }
  /*
   * Draw any connections
   */


  for (var i = 0; i < this.to.length; i++) {
    this.to[i].draw(context, view);
  }
};

OutInv.prototype.set = function (value) {
  if (value === undefined) {
    _Out__WEBPACK_IMPORTED_MODULE_0__.Out.prototype.set.call(this, value);
  } else {
    _Out__WEBPACK_IMPORTED_MODULE_0__.Out.prototype.set.call(this, !value);
  }
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Palette.js":
/*!***********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Palette.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Palette": () => (/* binding */ Palette)
/* harmony export */ });
/* harmony import */ var _PaletteItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaletteItem */ "./packages/cirsim/src/Cirsim/PaletteItem.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");
/* harmony import */ var _Utility_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Util */ "./packages/cirsim/src/Cirsim/Utility/Util.js");
/* harmony import */ var _Component_CircuitRef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Component/CircuitRef */ "./packages/cirsim/src/Cirsim/Component/CircuitRef.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * The pallet div where we select parts to add to the circuit
 * @param main Main object
 * @param work div.work
 * @constructor
 */

var Palette = function Palette(main, work) {
  var _this = this;

  this.main = main;
  this.cirsim = main.cirsim;
  this.palette = [];
  var div = null;
  var components = [];

  var initialize = function initialize() {
    // Create and install the div
    div = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('cs-palette');
    work.appendChild(div); // We allow either an array of strings in components
    // or a string naming a specific named palette

    if (typeof main.options.components === "string") {
      components = main.components.getPalette(main.options.components);

      if (components === null) {
        throw new Error('options.components invalid name ' + main.options.components);
      }
    } else {
      main.options.components.forEach(function (component) {
        // This can be a component name or a palette name
        var palette = main.components.getPalette(component);

        if (palette !== null) {
          components = components.concat(palette);
        } else {
          // Some component aliases
          if (component.toLowerCase() === 'not') {
            component = 'Inverter';
          }

          if (component.toLowerCase() === 'decoder') {
            component = 'BusDecoder';
          }

          components.push(component);
        }
      });
    } //
    // Load the circuit components into the palette
    //


    main.components.components.forEach(function (obj) {
      addToPalette(obj);
    });
  };

  var addToPalette = function addToPalette(obj) {
    // Only some components get added to the pallet...
    // A component is added if it is in the current
    // list of components or main.options.always
    var name = obj.type;

    if (!_Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.inArray(name, components) && !_Utility_Util__WEBPACK_IMPORTED_MODULE_2__.Util.inArray(name, main.options.always)) {
      return;
    }

    _this.palette.push(obj);

    var pi = new _PaletteItem__WEBPACK_IMPORTED_MODULE_0__.PaletteItem(_this, obj);
    div.appendChild(pi.element);
  };
  /**
   * Refresh the palette after any tab changes.
   * Ensures any CircuitRef palette items are correct
   */


  this.refresh = function () {
    // Remove any palette items that are of class "circuitref"
    var _iterator = _createForOfIteratorHelper(div.querySelectorAll('.cs-circuitref')),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        div.removeChild(c);
      } // Add any necessary circuitref palette items

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    for (var i = main.currentView().tabnum + 1; i < main.model.circuits.circuits.length; i++) {
      var circuit = main.model.circuits.circuits[i];
      var pi = new _PaletteItem__WEBPACK_IMPORTED_MODULE_0__.PaletteItem(this, _Component_CircuitRef__WEBPACK_IMPORTED_MODULE_3__.CircuitRef, circuit);
      pi.element.classList.add('cs-circuitref');
      div.appendChild(pi.element);
    }
  };

  initialize();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/PaletteItem.js":
/*!***************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/PaletteItem.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaletteItem": () => (/* binding */ PaletteItem)
/* harmony export */ });
/* harmony import */ var _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Graphics/PaletteImage */ "./packages/cirsim/src/Cirsim/Graphics/PaletteImage.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");


/**
 * Items that appear in the palette
 *
 * jQuery free
 *
 * @param palette The Palette that owns this item
 * @param obj The Component object
 * @param circuit The Circuit
 * @constructor
 */

var PaletteItem = function PaletteItem(palette, obj, circuit) {
  this.palette = palette;
  this.obj = obj;
  this.circuit = circuit !== undefined ? circuit.name : null; // Create an image component DOM element (canvas or img)

  var image = this.paletteImage(obj);
  var element = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('cs-item');
  var box = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('cs-box');
  element.appendChild(box);
  var img = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('cs-img');
  box.appendChild(img);
  img.appendChild(image);
  var desc = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('cs-desc');

  if (obj.label.length > 7) {
    _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.addClass(desc, 'long');
  }

  desc.innerText = circuit !== undefined ? circuit.name : obj.label;
  box.appendChild(desc);
  this.element = element;
  palette.main.dragAndDrop.draggable(this);
};
/**
 * Create the image for the palette, either using an existing
 * image file or creating one using PaletteImage.
 * @returns DOM element for either canvas or img
 */

PaletteItem.prototype.paletteImage = function () {
  var obj = this.obj;

  if (obj.img !== null && obj.img !== undefined) {
    var root = this.palette.cirsim.root;
    var element = document.createElement('img');
    element.setAttribute('src', root + 'cirsim/img/' + obj.img);
    element.setAttribute('alt', obj.desc);
    element.setAttribute('title', obj.desc);
    element.setAttribute('draggable', 'false');
    return element;
  } else if (obj.paletteImage !== undefined) {
    return obj.paletteImage().element;
  } else {
    var pi = new _Graphics_PaletteImage__WEBPACK_IMPORTED_MODULE_0__.PaletteImage(60, 60);
    pi.box(30, 40);
    pi.io(15, 20, 'w', 2, 20);
    pi.io(45, 20, 'e', 2, 20);
    pi.drawText(obj.label, 0, 0, "6px Times");
    return pi.element;
  }
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Selectable.js":
/*!**************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Selectable.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Selectable": () => (/* binding */ Selectable),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Base object for anything that is draggable
 * using the mouse.
 * @constructor
 */
var Selectable = function Selectable() {
  this.circuit = null; // Circuit this selectable is associated with

  this.x = 0; // Position of the selectable

  this.y = 0;
  this.moveX = 0; // Position of the selectable while moving

  this.moveY = 0;
  this.selectedStyle = '#ff0000';
  this.unselectedStyle = '#000000';
};

Selectable.prototype.copyFrom = function (selectable) {
  this.x = selectable.x;
  this.y = selectable.y;
  this.moveX = selectable.moveX;
  this.moveY = selectable.moveY;
};
/**
 * Is this something that is always selected alone (no multiple selection)
 * @returns {boolean}
 */


Selectable.prototype.single = function () {
  return false;
};

Selectable.prototype.selectStyle = function (context, view) {
  if (view.selection.isSelected(this)) {
    context.strokeStyle = this.selectedStyle;
    context.fillStyle = this.selectedStyle;
    return true;
  } else {
    context.strokeStyle = this.unselectedStyle;
    context.fillStyle = this.unselectedStyle;
    return false;
  }
};
/**
 * Start of the dragging process
 */


Selectable.prototype.grab = function () {
  this.moveX = this.x;
  this.moveY = this.y;
};

Selectable.prototype.move = function (dx, dy) {
  this.moveX += dx;
  this.moveY += dy;
  this.x = this.moveX;
  this.y = this.moveY;

  if (this.circuit !== null) {
    this.circuit.snapIt(this);
  }
};

Selectable.prototype.place = function (x, y) {
  this.moveX = x;
  this.moveY = y;
  this.x = this.moveX;
  this.y = this.moveY;

  if (this.circuit !== null) {
    this.circuit.snapIt(this);
  }
};

Selectable.prototype["delete"] = function () {};

Selectable.prototype.drop = function () {};
/**
 * A selected connection that we try to drag will create
 * a new bending point. This is overridden in the Connection
 * object.
 * @returns null
 */


Selectable.prototype.spawn = function (x, y) {
  return null;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Selectable);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Selection.js":
/*!*************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Selection.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Selection": () => (/* binding */ Selection),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utility_Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility/Rect */ "./packages/cirsim/src/Cirsim/Utility/Rect.js");

/**
 * The Selection object keeps track of what is currently
 * selected in a view.
 * @param view The view this selection object is associated with
 * @constructor
 */

var Selection = function Selection(view) {
  var _this = this;

  /// Maintains a list of the currently selected components
  this.selection = [];
  var down = false;
  var firstMove = false; /// Rectangle for selection

  var rect = null;

  this.mouseDown = function (x, y, event) {
    down = true;
    firstMove = true;
    var touched = view.circuit.touch(x, y);

    if (touched !== null) {
      // Some selectables are singles, meaning we can
      // only select one at a time.
      if (touched.single()) {
        this.selection = [touched];
      } else {
        // If we touched something that was not
        // previously selected, it becomes the selection
        if (!this.isSelected(touched)) {
          if (!event.shiftKey) {
            this.selection = [];
          }

          this.selection.push(touched);
        }
      }
    } else {
      // If we touch outside, we are clearing the selection if
      // shift is not selected and we start a selection rectangle
      if (!event.shiftKey) {
        this.selection = [];
      }

      rect = new _Utility_Rect__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y, x, y);
    }

    for (var i = 0; i < this.selection.length; i++) {
      this.selection[i].grab();
    }
  };

  this.mouseMove = function (x, y, dx, dy) {
    if (down) {
      if (firstMove) {
        // If we move the mouse the first time on any
        // selection, we need to create an undo backup
        if (rect === null && this.selection.length > 0) {
          view.model.backup();
        } // This is the first movement of the mouse
        // after we clicked. If there is one and only
        // one item selected, check to see if it is
        // something that might spawn a new child that
        // we drag. This is how bending points are implemented.


        if (this.selection.length === 1) {
          var spawned = this.selection[0].spawn(x, y);

          if (spawned !== null) {
            this.selection = [spawned];
          }
        }

        firstMove = false;
      }

      if (rect !== null) {
        rect.setRightBottom(x, y);
      } else {
        for (var i = 0; i < this.selection.length; i++) {
          this.selection[i].move(dx, dy);
        }
      }

      view.model.update(view.circuit);
    }
  };

  this.mouseUp = function (x, y) {
    if (down) {
      var clear = false;

      for (var i = 0; i < this.selection.length; i++) {
        if (this.selection[i].single()) {
          clear = true;
        }

        this.selection[i].drop();
      }

      if (clear) {
        this.selection = [];
      }
    }

    down = false;

    if (rect !== null) {
      selectRect();
      rect = null;
    }

    view.circuit.mouseUp();
  };

  var selectRect = function selectRect() {
    rect.normalize();

    if (!rect.isEmpty()) {
      var inRect = view.circuit.inRect(rect);

      if (inRect.length > 0) {
        var newSelection = _this.selection.slice();

        for (var i = 0; i < inRect.length; i++) {
          if (!_this.isSelected(inRect[i])) {
            newSelection.push(inRect[i]);
          }
        }

        _this.selection = newSelection;
      }
    }
  };
  /**
   * Is this component currently selected?
   * @param component Component to test
   * @returns {boolean} true if selected.
   */


  this.isSelected = function (component) {
    for (var i = 0; i < this.selection.length; i++) {
      if (component === this.selection[i]) {
        return true;
      }
    }

    return false;
  };

  this.draw = function (context) {
    if (rect !== null) {
      if (!context.setLineDash) {
        context.setLineDash = function () {};
      }

      context.strokeStyle = "#888888";
      context.setLineDash([2, 3]);
      context.beginPath();
      context.rect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top);
      context.stroke();
      context.setLineDash([]);
    }
  };

  this.getSelection = function () {
    return this.selection;
  };

  this.clear = function () {
    this.selection = [];
  };
};
/**
 * Delete everything that is selected.
 */

Selection.prototype["delete"] = function () {
  this.selection.forEach(function (selectable) {
    selectable["delete"]();
  });
  this.clear();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Selection);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Simulation.js":
/*!**************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Simulation.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Simulation": () => (/* binding */ Simulation)
/* harmony export */ });
/* harmony import */ var buckets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buckets-js */ "./.yarn/cache/buckets-js-npm-1.98.2-f05b27b0c5-bfc27d387a.zip/node_modules/buckets-js/dist/buckets.min.js");
/* harmony import */ var buckets_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buckets_js__WEBPACK_IMPORTED_MODULE_0__);

var instance = 0;
/**
 * Simulation management object
 * @constructor
 */

var Simulation = function Simulation() {
  var _this = this;

  // Current animation time in seconds, we start at time 1 to avoid 0 issues
  this.time = 1;
  this.view = null;
  this.speed = 0.000001; ///< Animation speed (1 million'th of real time)

  this.instance = ++instance; //
  // If the same component request multiple times during
  // the same time, this ensures the identical time events
  // will occur in the order they arrived.
  //

  this.order = 1; ///< Extra sorting order to ensure stable sort

  this.priorityQueue = new (buckets_js__WEBPACK_IMPORTED_MODULE_0___default().PriorityQueue)(function (a, b) {
    if (a.time === b.time) {
      return b.order - a.order;
    }

    return b.time - a.time;
  });
  /**
   * Set the simulation view. If set, we create a timing loop for
   * the simulation.
   * @param view
   */

  this.setView = function (view) {
    this.view = view;

    if (this.view !== null && !pendingAnimationFrame) {
      pendingAnimationFrame = true;
      requestAnimationFrame(mainLoop);
    }
  }; //
  // Animation main loop
  //


  var pendingAnimationFrame = false;
  var lastAnimationFrameTime = null;
  var killed = false;

  var mainLoop = function mainLoop(time) {
    pendingAnimationFrame = false;

    if (lastAnimationFrameTime === null) {
      lastAnimationFrameTime = time;
    }

    var delta = (time - lastAnimationFrameTime) * 0.001;
    lastAnimationFrameTime = time; // If the system is idle or very slow, there may be
    // a long time between calls, which can lock the
    // program up catching up on a day of updating. This
    // test ensures that we don't allow more than a one second
    // processing, so long delays are truncated.

    if (delta > 1) {
      delta = 1;
    }

    while (delta > 0) {
      /*
       * This ensures we have no time step greater than
       * 30ms;
       */
      var useDelta = delta;

      if (useDelta > 0.03) {
        useDelta = 0.03;
      }

      if (_this.advance(useDelta * _this.speed)) {
        if (_this.view !== null) {
          _this.view.draw();
        }
      }

      delta -= useDelta;
    }

    if (_this.view !== null && !killed) {
      pendingAnimationFrame = true;
      requestAnimationFrame(mainLoop);
    }
  };
  /**
   * Kill the simulation when the enclosing Cirsim element
   * is destroyed, so it does not continue to run in the background.
   */


  this.kill = function () {
    killed = true;
  };
};
/**
 * Add an event to the simulation queue
 * @param component Component the event is for
 * @param delay Delay time until event happens (in ns)
 * @param state Array of input state
 */

Simulation.prototype.queue = function (component, delay, state) {
  var ns = delay * 0.000000001;
  this.priorityQueue.add({
    time: this.time + ns,
    order: this.order,
    component: component,
    state: state
  });
  this.order++;
};
/**
 * Advance the simulation in time
 * @param delta Amount of time to advance (seconds)
 */


Simulation.prototype.advance = function (delta) {
  var any = false;

  while (!this.priorityQueue.isEmpty() && this.priorityQueue.peek().time <= this.time + delta) {
    var event = this.priorityQueue.dequeue();
    var advDelta = event.time - this.time; // How much do we move time?

    delta -= advDelta; // Subtract out the delta change

    this.time = event.time;

    if (advDelta > 0 && this.view !== null) {
      if (this.view.advance(advDelta)) {
        any = true;
      }
    }

    event.component.compute(event.state);
    any = true;
  }

  this.time += delta;

  if (delta > 0 && this.view !== null) {
    if (this.view.advance(delta)) {
      any = true;
    }
  }

  return any;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Tabs.js":
/*!********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Tabs.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tabs": () => (/* binding */ Tabs)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./packages/cirsim/src/Cirsim/View.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/**
 * Manages the tabs in the model
 * @param main Main object
 * @constructor
 */

var Tabs = function Tabs(main) {
  var _this = this;

  /// The currently active view/tab
  this.active = -1; // The collection of tabs

  var tabs = []; //
  // The structure: <div class="tabs"><ul></ul><div class="panes"></div></div>
  // div.tabs - Enclosure for all tabs content
  // ul - The tabs we select from
  // div.panes - The panes with the tab contents
  //

  var tabsDiv = null,
      ul = null,
      panesDiv = null;

  this.size = function () {
    return tabs.length;
  };
  /**
      * Create the tabs system
   * @param div The div we put the tabs into
   */


  this.create = function (div) {
    // Create: <div class="tabs"><ul></ul><div class="panes"></div></div>
    tabsDiv = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('tabs');
    ul = document.createElement('ul');
    tabsDiv.appendChild(ul);
    panesDiv = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('panes');
    tabsDiv.appendChild(panesDiv);
    div.appendChild(tabsDiv); // Clear the tabs collection

    tabs = [];

    _this.sync();
  };
  /**
   * Synchronize the tabs to match the model.
   */


  this.sync = function () {
    if (!needSync()) {
      return;
    } // What is the current circuit?


    var current = this.active >= 0 ? tabs[this.active].circuit : null;
    var collection = main.model.circuits.getCircuits(); // Div containing the panes

    panesDiv = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('panes'); // The ul tag for the tabs

    ul = document.createElement('ul'); // New collection of tabs

    var tabsNew = [];
    collection.forEach(function (circuit) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      li.appendChild(a);
      a.innerText = circuit.getName();
      li.addEventListener('click', function (event) {
        event.preventDefault();
        selectLi(li);
      });
      a.addEventListener('click', function (event) {
        event.preventDefault();
        selectLi(li);
      });
      ul.appendChild(li); // Does the pane already exist in tabs?

      var pane = null;
      var view = null;

      for (var i in tabs) {
        if (circuit === tabs[i].circuit) {
          // There was a previous tab for this circuit
          pane = tabs[i].pane;
          view = tabs[i].view;
        }
      }

      if (pane === null) {
        // <div class="tab"><canvas></canvas></div>
        pane = _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.createClassedDiv('tab');
        var canvas = document.createElement('canvas');
        pane.appendChild(canvas);
        view = new _View__WEBPACK_IMPORTED_MODULE_0__.View(main, canvas, circuit);
      }

      panesDiv.appendChild(pane);
      view.tabnum = tabsNew.length;
      tabsNew.push({
        li: li,
        pane: pane,
        circuit: circuit,
        view: view
      });
    });
    tabsDiv.innerHTML = '';
    tabsDiv.appendChild(ul);
    tabsDiv.appendChild(panesDiv);
    tabs = tabsNew; //
    // Find and select the current circuit
    //

    this.selectTabByCircuit(current);
  };

  this.selectTabByCircuit = function (circuit) {
    if (circuit === null) {
      // If nothing was current before, select the
      // first tab.
      this.selectTab(0, true);
    } else {
      var any = false;

      for (var i in tabs) {
        if (circuit === tabs[i].circuit) {
          // We found were current moved, so select that
          any = true;
          this.selectTab(i, true);
          break;
        }
      }

      if (!any) {
        // Current has been deleted
        if (this.active >= tabs.length) {
          this.selectTab(this.active - 1);
        } else {
          this.selectTab(this.active);
        }
      }
    }
  };
  /*
   * Determine if the tabs differ from the current circuit collection.
   * @returns true if we need a new sync operation.
   */


  function needSync() {
    var collection = main.model.circuits.getCircuits();

    if (tabs.length !== collection.length) {
      // If have different number of circuits than tabs
      return true;
    }

    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].circuit !== collection[i]) {
        // If a circuit has moved
        return true;
      }

      var tabName = tabs[i].li.querySelector('a').textContent;

      if (tabName !== collection[i].getName()) {
        // If a circuit has been renamed
        return true;
      }
    }

    return false;
  }

  var selectLi = function selectLi(li) {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].li === li) {
        _this.selectTab(i);
      }
    }
  };

  this.selectTab = function (num, force) {
    if (force !== true && num === _this.active) {
      return;
    } //
    // Clear all selections
    //


    tabs.forEach(function (tab) {
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.removeClass(tab.li, 'selected');
      _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.removeClass(tab.pane, 'selected');
    });
    _this.active = +num;
    var tab = tabs[_this.active];
    _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.addClass(tab.li, 'selected');
    _DOM_Tools__WEBPACK_IMPORTED_MODULE_1__.Tools.addClass(tab.pane, 'selected');
    tab.view.draw();
    main.model.getSimulation().setView(tab.view);
    main.newTab();
  }; // Return the current View object


  this.currentView = function () {
    if (_this.active < 0) {
      return null;
    }

    return tabs[_this.active].view;
  }; // Return the current Circuit object


  this.currentCircuit = function () {
    if (_this.active < 0) {
      return null;
    }

    return tabs[_this.active].circuit;
  }; // Implement undo for the tabs


  this.undo = function () {
    // What is the current tab before we undo?
    var current = this.active >= 0 ? tabs[this.active].circuit : null;

    if (current !== null) {
      // We need to know the undo version...
      current = current.prev;
    } // Clear any 'active' any selections


    this.active = -1;

    var _iterator = _createForOfIteratorHelper(tabs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var tab = _step.value;
        tab.view.selection.clear();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.sync();

    var _iterator2 = _createForOfIteratorHelper(tabs),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _tab = _step2.value;

        _tab.view.draw();
      } // Reselect the previously selected tab if it still exists

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this.selectTabByCircuit(current);
  };

  this.destroy = function () {
    this.active = -1;
    tabsDiv.parentNode.removeChild(tabsDiv);
    tabsDiv = null;
    tabs = [];
  };

  this.validateName = function (name, skip) {
    var circuits = main.model.circuits;
    var collection = circuits.getCircuits();

    for (var i = 0; i < collection.length; i++) {
      var circuit = collection[i];

      if (circuit === skip) {
        continue;
      }

      if (name.toLowerCase() === circuit.getName().toLowerCase()) {
        return 'Name ' + name + ' already in use by another tab';
      }
    }

    return null;
  };
  /**
   * Add a new tab with a new circuit in it.
   * @param name
   */


  this.add = function (name) {
    main.model.addCircuit(name);
    this.sync();
    this.selectTab(tabs.length - 1, true);
  };
  /**
   * Delete the active tab
   * @param index
   */


  this.delActive = function (index) {
    if (_this.active < 0) {
      return;
    }

    main.model.deleteCircuitByIndex(_this.active);

    _this.sync();
  };

  this.rename = function (name) {
    main.model.circuits.rename(this.active, name);
    this.sync();
  };
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Test/Test.js":
/*!*************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Test/Test.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Test": () => (/* binding */ Test)
/* harmony export */ });
/* harmony import */ var _Value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Value */ "./packages/cirsim/src/Cirsim/Value.js");
/* harmony import */ var _Dlg_MessageDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dlg/MessageDialog */ "./packages/cirsim/src/Cirsim/Dlg/MessageDialog.js");
/* harmony import */ var _TestException__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TestException */ "./packages/cirsim/src/Cirsim/Test/TestException.js");
/* harmony import */ var _Utility_Ajax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/Ajax */ "./packages/cirsim/src/Cirsim/Utility/Ajax.js");
/* harmony import */ var _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utility/JsonAPI */ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






/**
 * Constructor
 * @param main The Test object
 */

var Test = function Test(main) {
  /// The main object
  this.main = main; /// Array of installed tests

  this.tests = [];

  this.addTest = function (test) {
    if (test === Object(test)) {
      this.tests.push(test);
    } else if (test.substr(0, 1) === '{') {
      this.tests.push(JSON.parse(test));
    } else {
      // Not JSON, must be base64 encoded
      test = atob(test);
      this.tests.push(JSON.parse(test));
    }
  };
  /**
   * Find a test by its tag.
   * @param tag Tag to search for
   */


  this.findTest = function (tag) {
    for (var i = 0; i < this.tests.length; i++) {
      if (this.tests[i].tag === tag) {
        return this.tests[i];
      }
    }

    return null;
  };

  function isString(str) {
    return typeof str === 'string' || str instanceof String;
  }
  /**
   * Run a single test and bring up result dialog boxes
   * @param test A test from the array of tests.
   */


  this.runTestDlg = function (test) {
    // Save before we test
    main.save(true, true); // Set the overlay so the tests are modal

    main.modal(true);
    var promise = this.runTest(test);
    promise.then(function (test) {
      // Success
      main.modal(false);
      var html = '<h1>Circuit Success</h1>' + '<p>The test has passed.</p>';
      var dlg = new _Dlg_MessageDialog__WEBPACK_IMPORTED_MODULE_1__.MessageDialog("Success", html);
      dlg.open();
      setResult(test, test.success !== undefined ? test.success : 'success', main.model.toJSON());
    }, function (msg) {
      // Failure
      main.modal(false);
      var html = '<h1>Circuit Failure</h1>' + msg;
      var dlg = new _Dlg_MessageDialog__WEBPACK_IMPORTED_MODULE_1__.MessageDialog("Test Failure", html, 450);
      dlg.open();
      setResult(test, 'fail', main.model.toJSON());
    });
  };

  function setResult(test, result, circuit) {
    if (test.result !== undefined) {
      var elements = document.querySelectorAll(test.result);

      var _iterator = _createForOfIteratorHelper(elements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;
          element.value = result;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    if (test.circuit !== undefined) {
      var _elements = document.querySelectorAll(test.circuit);

      var _iterator2 = _createForOfIteratorHelper(_elements),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _element = _step2.value;
          _element.value = circuit;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    var api = main.options.getAPI('test');

    if (api === null) {
      // Test API is not supported
      return;
    }

    var data = Object.assign({
      cmd: "test",
      name: api.name,
      result: result,
      data: circuit,
      type: 'application/json'
    }, api.extra);
    _Utility_Ajax__WEBPACK_IMPORTED_MODULE_3__.Ajax.do({
      url: api.url,
      data: data,
      method: "POST",
      dataType: 'json',
      contentType: api.contentType,
      success: function success(data) {
        var json = new _Utility_JsonAPI__WEBPACK_IMPORTED_MODULE_4__.JsonAPI(data);

        if (!main.toast.jsonErrors(json)) {
          main.toast.message('Test result successfully saved to server');
        }
      },
      error: function error(xhr, status, _error) {
        // console.log(xhr.responseText);
        main.toast.message('Unable to communicate with server: ' + _error);
      }
    });
  }

  this.runTest = function (test) {
    return new Promise(function (success, failure) {
      var model = main.model; // Backup the model to support Undo of what the test changes

      model.backup(); // The current test number

      var testNum = -1;
      var inputs, outputs;

      try {
        //
        // Find the inputs
        //
        inputs = findInputs(test); //
        // Find the outputs
        //

        outputs = findOutputs(test);
      } catch (exception) {
        if (exception instanceof _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException) {
          failure(exception.msg);
          return;
        } else {
          throw exception;
        }
      }

      function testOne() {
        if (testNum >= 0) {
          var t = test.test[testNum]; // Ensure the last test passed

          for (var i = 0; i < outputs.length && i + inputs.length < t.length; i++) {
            // What is expected?
            var expected = t[i + inputs.length]; // Handle don't care, either a null or '?'

            if (expected === undefined || expected === null || expected === '?') {
              continue;
            } //
            // Handle any prefixes
            //
            // bitslop: is the bitslop option prefix.
            // Bitslop means we expect the result to be
            // within one bit of the expected value.
            //
            // test: is a string-based test.


            var bitSlop = false;
            var stringTest = false;

            if (isString(expected)) {
              var any = false;

              do {
                any = false;

                if (expected.substr(0, 8) === "bitslop:") {
                  bitSlop = true;
                  expected = expected.substr(8);
                  any = true;
                } else if (expected.substr(0, 5) === "test:") {
                  stringTest = true;
                  expected = expected.substr(5);
                  any = true;
                }
              } while (any);
            }

            if (stringTest) {
              //
              // String-based tests are like this:
              //
              // test:red=1;yel=0;grn=0
              // After the test: there is a series of one or more
              // tests separated by semicolons. Those tests are
              // passed to the function testAsString on the input,
              // which, in turn, passes the test on to testAsString
              // on the component. Test failures are indicated by a
              // throw.
              //
              var stringTests = expected.split(';');

              var _iterator3 = _createForOfIteratorHelper(stringTests),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var _test = _step3.value;

                  // Send the test to the component
                  try {
                    outputs[i].testAsString(_test);
                  } catch (msg) {
                    if (_test.quiet === true) {
                      failure('<div class="cirsim-test-result"><p>This test is failing. Some output is ' + 'not what is currently expected by the test. The circuit is left in the state it was' + ' in when the test failed. No additional detail will be provided about why ' + 'the test is failed. It is your responsibility to create a ' + 'circuit that works as expected.</p></div>');
                    } else {
                      failure("<div class=\"cirsim-test-result\"><p>This test is failing. ".concat(msg, "</p>\n<p class=\"cs-info\">Test ").concat(testNum, "</p></div>"));
                    } // We are done when there is an error


                    return;
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            } else {
              // Tests based on an expected value
              // What is expected? Use a Value component to
              // allow things like hex and floating point values
              var value = new _Value__WEBPACK_IMPORTED_MODULE_0__.Value();
              value.type = _Value__WEBPACK_IMPORTED_MODULE_0__.Value.BINARY;
              value.setAsString(expected); // Get the result

              var actual = outputs[i].getAsString();
              var good = true; // Until we know otherwise

              if (bitSlop) {
                expected = value.getAsInteger();
                value.setAsBinary(actual);
                actual = value.getAsInteger();

                if (actual === '?') {
                  good = false;
                } else if (actual < expected - 1 || actual > expected + 1) {
                  good = false;
                }
              } else {
                // The normal (binary) comparison case
                expected = value.getAsBinary();

                if (isString(expected)) {
                  // j and k index the last letters in actual and expected
                  var j = actual.length - 1;
                  var k = expected.length - 1; // Test from the right end of both results so we
                  // ensure we are testing the same bits.

                  for (; k >= 0 && good; j--, k--) {
                    if (expected.substr(k, 1) === '?') {
                      continue;
                    }

                    if (j < 0) {
                      good = false;
                      break;
                    }

                    if (actual.substr(j, 1) != expected.substr(k, 1)) {
                      good = false;
                    }
                  } // If we exhausted expected, but still have actual bits
                  // we have an error


                  if (j > 0) {
                    good = false;
                  }
                } else {
                  if (expected !== null && expected !== '?') {
                    good = expected == actual;
                  }
                }
              }

              if (good) {// Success
              } else {
                // Failure
                console.log("Test: " + testNum + " Output " + outputs[i].component.naming + " Actual: " + actual + " Expected: " + expected);

                if (test.quiet === true) {
                  failure('<div class="cirsim-test-result"><p>This test is failing. Some output is not what is currently' + ' expected by the test. The circuit is left in the state it was' + ' in when the test failed. No additional detail will be provided about why ' + 'the test is failed. It is your responsibility to create a ' + 'circuit that works as expected.</p></div>');
                } else {
                  failure("<div class=\"cirsim-test-result\"><p>This test is failing. An output value is \nnot what is currently expected by the test. The circuit is left in the state it was \nin when the test failed.<p>\n<p class=\"cs-result\">Output ".concat(outputs[i].component.naming, " expected: ").concat(expected, " actual: ").concat(actual, "</p>\n<p class=\"cs-info\">Test ").concat(testNum, "</p></div>\n"));
                }

                return;
              }
            }
          }
        }

        testNum++;

        if (testNum < test.test.length) {
          var _t = test.test[testNum];

          for (var _i = 0; _i < inputs.length && _i < _t.length; _i++) {
            if (_t[_i] !== null) {
              var result = inputs[_i].command(_t[_i]);

              if (result !== null) {
                if (!result.ok) {
                  failure('<p>This test is failing. ' + result.msg + '</p>');
                  return;
                }
              } else {
                try {
                  inputs[_i].setAsString(_t[_i]);
                } catch (msg) {
                  failure("<div class=\"cirsim-test-result\"><p>This test is failing. ".concat(msg, "</p>\n<p class=\"cs-info\">Test ").concat(testNum, "</p></div>"));
                  return;
                }
              }
            }
          } // Churn one second worth


          var simulation = model.getSimulation();

          for (var _i2 = 0; _i2 < 100; _i2++) {
            if (!simulation.advance(0.010 * simulation.speed)) {
              break;
            }
          }

          setTimeout(testOne, main.options.testTime);

          if (simulation.view !== null) {
            simulation.view.draw();
          }
        } else {
          success(test);
        }
      }

      setTimeout(testOne, main.options.testTime);
    });
  };
  /**
   * Find all of the specified circuit inputs
   * @param test The test we are running
   * @returns {Array} Array of input objects
   */


  function findInputs(test) {
    var model = main.model; //
    // Find the inputs
    //

    var inputs = [];

    for (var i = 0; i < test.input.length; i++) {
      var input = test.input[i];
      var items = input.split(':');
      var search = model;
      var tabmsg = ''; // Test for tab specification. That's a prefix
      // like this: tab:tabname:

      if (items[0] === "tab") {
        if (items.length < 3) {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>Invalid input tab definition: ' + input + '</p>');
        }

        var tabname = items[1];
        search = model.getCircuit(tabname);

        if (search === null) {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>Invalid input tab: ' + tabname + '</p>');
        }

        tabmsg = ' in tab <em>' + tabname + '</em>';
        items.splice(0, 2);
      }

      if (items[0] === "type") {
        if (items.length < 2) {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>Invalid input type specification: ' + input + '</p>');
        }

        var type = items[1];
        var components = search.getComponentsByType(type);

        if (items.length > 2) {
          // We have specified a component name after the type
          // Example: type:InPin:CLK
          var desired = null;

          var _iterator4 = _createForOfIteratorHelper(components),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var component = _step4.value;

              if (component.naming === items[2]) {
                desired = component;
                break;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          if (desired === null) {
            throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you do not have a' + ' component named ' + items[2] + ' of type ' + type + tabmsg + '.</p>');
          }

          inputs.push(desired);
        } else {
          if (components.length === 0) {
            throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you do not have a' + ' component of type ' + type + tabmsg + '.</p>');
          } else if (components.length > 1) {
            throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you have more than' + ' one  component of type ' + type + tabmsg + '.</p>' + '<p>You are only allowed one component of that type ' + 'in this circuit.</p>');
          }

          inputs.push(components[0]);
        }
      } else {
        // Finding component by naming
        var _component = search.getComponentByNaming(items[0]);

        if (_component !== null) {
          inputs.push(_component);
        } else {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you do not' + ' have a component named ' + items[0] + tabmsg + '.</p>' + '<p>Typically, the tests are looking for an input' + ' pin or a bus input pin. Input pins are labeled IN in the palette. Double-click' + ' on an input pin to set the name. Names in Cirsim are case sensitive.</p>');
        }
      }
    }

    return inputs;
  }

  function findOutputs(test) {
    var model = main.model;
    var outputs = [];

    for (var i = 0; i < test.output.length; i++) {
      var search = model;
      var tabmsg = '';
      var split = test.output[i].split("-");
      var output = split[0];
      var items = output.split(':'); // Test for tab specification. That's a prefix
      // like this: tab:tabname:

      if (output.substr(0, 4) === "tab:") {
        var tab = output.substr(4);
        var colon = tab.indexOf(":");

        if (colon === -1) {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>Invalid output tab definition: ' + output + '</p>');
          break;
        }

        var tabname = tab.substr(0, colon);
        search = model.getCircuit(tabname);

        if (search === null) {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>Invalid out tab: ' + tabname + '</p>');
          break;
        }

        tabmsg = ' in tab <em>' + tabname + '</em>';
        output = tab.substr(colon + 1);
        items.splice(0, 2);
      }

      var pin = split.length > 1 ? split[1] : 0;

      if (items[0] === 'type') {
        if (items.length < 2) {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>Invalid output type specification: ' + output + '</p>');
        }

        var type = items[1];
        var components = search.getComponentsByType(type);

        if (items.length > 2) {
          // We have specified a component name after the type
          // Example: type:OutPin:CLK
          var desired = null;

          var _iterator5 = _createForOfIteratorHelper(components),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var component = _step5.value;

              if (component.naming === items[2]) {
                desired = component;
                break;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          if (desired === null) {
            throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you do not have a' + ' component named ' + items[2] + ' of type ' + type + tabmsg + '.</p>');
          }

          outputs.push(desired.ins[pin]);
        } else {
          if (components.length === 0) {
            throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you do not have a' + ' component of type ' + type + tabmsg + '.</p>');
          } else if (components.length > 1) {
            throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you have more than' + ' one  component of type ' + type + tabmsg + '.</p>' + '<p>You are only allowed one component of that type ' + 'in this circuit.</p>');
          }

          outputs.push(components[0].ins[pin]);
        }
      } else {
        var _component2 = search.getComponentByNaming(output);

        if (_component2 !== null && _component2.ins.length > pin) {
          outputs.push(_component2.ins[pin]);
        } else {
          throw new _TestException__WEBPACK_IMPORTED_MODULE_2__.TestException('<p>The test is not able to pass because you do not' + ' have a component named ' + output + tabmsg + '.</p>' + '<p>Output pins are labeled OUT in the palette. Double-click' + ' on an output pin to set the name. Pin names are case sensitive.</p>');
        }
      }
    }

    return outputs;
  }
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Test/TestException.js":
/*!**********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Test/TestException.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestException": () => (/* binding */ TestException),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Exceptions thrown by testing
 * @param msg The exception message
 * @constructor
 */
var TestException = function TestException(msg) {
  this.msg = msg;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TestException);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/UI/DragAndDrop.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/UI/DragAndDrop.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DragAndDrop": () => (/* binding */ DragAndDrop)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Drag and drop support for the palette
 * @constructor
 */
var DragAndDrop = function DragAndDrop(main) {
  var dragElement = null; // DOM Element

  var dragItem = null; // PaletteItem

  var dropViews = []; // View

  var initialize = function initialize() {
    main.element.addEventListener('mousemove', function (event) {
      if (event.which === 0) {
        mouseUp(event.pageX, event.pageY);
        return;
      }

      mouseMove(event.pageX, event.pageY);
    });
    main.element.addEventListener('touchmove', function (event) {
      var touch = event.changedTouches[0];
      mouseMove(touch.pageX, touch.pageY);
    });
    main.element.addEventListener('mouseup', function (event) {
      mouseUp(event.pageX, event.pageY);
    });
    main.element.addEventListener('touchend', function (event) {
      var touch = event.changedTouches[0];
      mouseUp(touch.pageX, touch.pageY);
    });
    main.element.addEventListener('touchcancel', function (event) {
      var touch = event.changedTouches[0];
      mouseUp(touch.pageX, touch.pageY);
    });
  };

  this.draggable = function (paletteItem) {
    paletteItem.element.addEventListener('mousedown', function (event) {
      event.preventDefault();
      click(paletteItem);
      mouseMove(event.pageX, event.pageY);
    });
    paletteItem.element.addEventListener('touchstart', function (event) {
      event.preventDefault();
      click(paletteItem);
      var touch = event.changedTouches[0];
      mouseMove(touch.pageX, touch.pageY);
    });
  };

  this.droppable = function (view, callback) {
    dropViews.push({
      'view': view,
      'callback': callback
    });
  };

  var click = function click(paletteItem) {
    //
    // Create a copy of the element and set it up for dragging
    //
    var clone = paletteItem.paletteImage();
    main.element.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.top = 0;
    clone.style.left = 0;
    clone.style.zIndex = 100;
    clone.style.cursor = 'pointer';
    dragItem = paletteItem;
    dragElement = clone;
  };

  var mouseMove = function mouseMove(x, y) {
    if (dragElement !== null) {
      var rect = main.element.getBoundingClientRect();
      var mainX = rect.left + main.element.scrollLeft + window.pageXOffset;
      var mainY = rect.top + main.element.scrollTop + window.pageYOffset;
      dragElement.style.left = x - mainX - dragElement.clientWidth / 2 + 'px';
      dragElement.style.top = y - mainY - dragElement.clientHeight / 2 + 'px';
      return true;
    }

    return false;
  };

  var mouseUp = function mouseUp(x, y) {
    if (dragElement !== null) {
      var _iterator = _createForOfIteratorHelper(dropViews),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var view = _step.value;
          //
          // Is the view enabled?
          //
          var viewElement = view.view.element;

          if (viewElement.parentNode.style.display === 'none') {
            continue;
          } //
          // Determine x,y in the canvas
          //


          var rect = viewElement.getBoundingClientRect();
          var viewX = rect.left + viewElement.scrollLeft + window.pageXOffset;
          var viewY = rect.top + viewElement.scrollTop + window.pageYOffset;

          if (x >= viewX && y >= viewY && x < viewX + (rect.right - rect.left) && y < viewY + (rect.bottom - rect.top)) {
            view.callback(dragItem, x - viewX, y - viewY);
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      main.element.removeChild(dragElement);
      dragElement = null;
      dragItem = null;
    }
  };

  initialize();
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/Ajax.js":
/*!****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/Ajax.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ajax": () => (/* binding */ Ajax)
/* harmony export */ });
/**
 * Simple AJAX support without jQuery or other massive libraries
 * @constructor
 */
var Ajax = function Ajax() {};

Ajax["do"] = function (obj) {
  var request = new XMLHttpRequest();

  if (obj.method === 'GET') {
    var data = [];

    for (var key in obj.data) {
      if (!obj.data.hasOwnProperty(key)) {
        continue;
      }

      data.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
    }

    request.open('GET', obj.url + '?' + data.join('&'), true);
  } else {
    request.open(obj.method, obj.url, true);
  }

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      if (obj.dataType === 'json') {
        try {
          obj.success(JSON.parse(request.responseText));
        } catch (ex) {
          console.log(ex);
          console.log(request.responseText);
        }
      } else {
        obj.success(request.responseText);
      }
    } else {
      // We reached our target server, but it returned an error
      obj.error(request.xhr, request.statusText, 'invalid URL');
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
    obj.error(request.xhr, request.statusText, 'server not found');
  };

  if (obj.method === 'POST') {
    if (obj.contentType === 'application/json') {
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(obj.data));
    } else {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      var formData = [];

      for (var _key in obj.data) {
        if (!obj.data.hasOwnProperty(_key)) {
          continue;
        }

        formData.push(encodeURIComponent(_key) + '=' + encodeURIComponent(obj.data[_key]));
      }

      request.send(formData.join('&'));
    }
  } else {
    request.send();
  }
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/JsonAPI.js":
/*!*******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/JsonAPI.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonAPI": () => (/* binding */ JsonAPI)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * API object for help processing JSON API responses
 * @constructor
 */
var JsonAPI = function JsonAPI(api) {
  this.api = api;
};

JsonAPI.prototype.errors = function () {
  if (this.api.errors !== undefined) {
    return this.api.errors;
  }

  return null;
};

JsonAPI.prototype.fetch = function (type) {
  if (this.api.data === undefined) {
    return [];
  }

  var ret = [];
  this.api.data.forEach(function (item) {
    if (item.type === type) {
      ret.push(item);
    }
  });
  return ret;
};
/**
 * Get data from the JsonAPI object by data type.
 * @param type Data type name
 * @returns {*} Object or null if not found
 */


JsonAPI.prototype.getData = function (type) {
  if (this.api.data === undefined) {
    return [];
  }

  var _iterator = _createForOfIteratorHelper(this.api.data),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      if (item.type === type) {
        return item;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return null;
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/Ready.js":
/*!*****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/Ready.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ready": () => (/* binding */ Ready)
/* harmony export */ });
/**
 * Simple Document ready function, equivalent to jQuery's document ready.
 * @constructor
 */
var Ready = function Ready() {};
/**
 * Call a function when the document is readon.
 * @param fn Function to be called on document ready
 */

Ready.go = function (fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/Rect.js":
/*!****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/Rect.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rect": () => (/* binding */ Rect)
/* harmony export */ });
/**
 * A simple rectangle representation
 * @param left Left. If undefined, uses zero.
 * @param top Top. If undefined, uses zero.
 * @param right Right side. If undefined, uses this.left
 * @param bottom Bottom side. If undefined, used this.top.
 * @constructor
 */
var Rect = function Rect() {
  var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var bottom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  this.left = left;
  this.top = top;
  this.right = right;
  this.bottom = bottom;
};

Rect.prototype.setRightBottom = function (right, bottom) {
  this.right = right;
  this.bottom = bottom;
};
/**
 * Ensure left <= right and top <= bottom for the rectangle
 */


Rect.prototype.normalize = function () {
  if (this.left > this.right) {
    var t = this.left;
    this.left = this.right;
    this.right = t;
  }

  if (this.top > this.bottom) {
    var _t = this.top;
    this.top = this.bottom;
    this.bottom = _t;
  }
};

Rect.prototype.isEmpty = function () {
  return this.left >= this.right || this.top >= this.bottom;
};

Rect.prototype.contains = function (x, y) {
  return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
};
/**
 * Expand this rect to include all of some other rect.
 * @param rect Other rect to include
 */


Rect.prototype.expand = function (rect) {
  if (rect.left < this.left) {
    this.left = rect.left;
  }

  if (rect.right > this.right) {
    this.right = rect.right;
  }

  if (rect.top < this.top) {
    this.top = rect.top;
  }

  if (rect.bottom > this.bottom) {
    this.bottom = rect.bottom;
  }
};
/**
 * Expand this rect to include a given point.
 * @param x
 * @param y
 */


Rect.prototype.expandXY = function (x, y) {
  if (x < this.left) {
    this.left = x;
  }

  if (x > this.right) {
    this.right = x;
  }

  if (y < this.top) {
    this.top = y;
  }

  if (y > this.bottom) {
    this.bottom = y;
  }
};

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/Sanitize.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sanitize": () => (/* binding */ Sanitize),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "./.yarn/cache/dompurify-npm-2.2.9-1a93a7440c-8673be49ae.zip/node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Basic Sanitize operations to protect from XSS.
 *
 * Some of this is a wrapper around DOMPurify's sanitize, so
 * it can be easily replaced in the future. Additional functions are
 * useful for sanitizing input from files.
 *
 * @constructor
 */

var Sanitize = function Sanitize() {};

Sanitize.sanitize = function (text) {
  return dompurify__WEBPACK_IMPORTED_MODULE_0___default().sanitize(text);
};

Sanitize["boolean"] = function (value) {
  return value === true;
};
/**
 * Replace <, >, and & with corresponding HTML entities.
 * @param text
 * @returns {string|XML|*}
 */


Sanitize.htmlentities = function (text) {
  text = text.replace(/&/g, '&amp;');
  text = text.replace(/</g, '&lt;');
  text = text.replace(/>/g, '&gt;');
  return text;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sanitize);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/Unique.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/Unique.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Unique": () => (/* binding */ Unique),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Convenience class for generating unique Cirsim-specific ID's
 * @constructor
 */
var Unique = function Unique() {};
Unique.unique = 1;

Unique.uniqueId = function () {
  return Unique.unique++;
};

Unique.uniqueName = function () {
  return "cirsim-id-" + Unique.unique++;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Unique);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/Util.js":
/*!****************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/Util.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Util": () => (/* binding */ Util),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Utility functions
 * @constructor
 */
var Util = function Util() {};
/**
 * Convert a value to Hex
 * @param d Value to convert
 * @param len Number of digits to convert to.
 * @returns {string} Converted result.
 */

Util.toHex = function (d, len) {
  var hex = Number(d).toString(16);

  while (hex.length < len) {
    hex = '0' + hex;
  }

  return hex;
};
/**
 * Convert a value to Binary
 * @param d Value to convert
 * @param len Number of digits to convert to.
 * @returns {string} Converted result.
 */


Util.toBinary = function (d, len) {
  var bin = Number(d).toString(2);

  while (bin.length < len) {
    bin = '0' + bin;
  }

  return bin;
};
/**
 * Test if a string is in an array
 * @param needle String item to look for
 * @param haystack Array of strings
 * @return true if in array
 */


Util.inArray = function (needle, haystack) {
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i].toLowerCase() === needle.toLowerCase()) {
      return true;
    }
  }

  return false;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Util);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Utility/Vector.js":
/*!******************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Utility/Vector.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector": () => (/* binding */ Vector),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * General purpose object for 2D vectors.
 *
 * Points are represented with x,y properties:
 * var p = {x: 23, y: -7.3};
 * @param x
 * @param y
 * @constructor
 */
var Vector = function Vector(x, y) {
  this.x = x;
  this.y = y;
};
/**
 * Normalize a vector
 */

Vector.prototype.normalize = function () {
  var len = Math.sqrt(this.x * this.x + this.y * this.y);
  this.x /= len;
  this.y /= len;
};

Vector.normalize = function (vector) {
  var len = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return new Vector(vector.x / len, vector.y / len);
};
/**
 * Rotate a vector by some angle
 * @param vector Vector to rotate
 * @param angle Angle rotate by (radians)
 * @returns {Vector} New vector result
 */


Vector.rotate = function (vector, angle) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  return new Vector(c * vector.x - s * vector.y, s * vector.x + c * vector.y);
};
/**
 * Compute the nearest distance to a line defined
 * a ax + by + c.
 * @param p Vector
 * @param a scalar
 * @param b scalar
 * @param c scalar
 */


Vector.distanceToLine = function (p, a, b, c) {
  if (a == 0) {
    // Horizontal line
    return Math.abs((b * p.y + c) / b);
  } else if (b == 0) {
    // Vertical line
    return Math.abs((a * p.x + c) / a);
  } else {
    return Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a * a + b * b);
  }
};
/**
 * Compute the nearest distance to a line defined
 * by two points
 * @param p Vector
 * @param p1 First point (Vector)
 * @param p2 Second point (Vector)
 */


Vector.distanceToLineP2 = function (p, p1, p2) {
  return Vector.distanceToLine(p, p1.y - p2.y, p2.x - p1.x, p1.x * p2.y - p2.x * p1.y);
};
/**
 * Compute the nearest point on a line defined
 * a ax + by + c.
 * @param p Vector
 * @param a
 * @param b
 * @param c
 */


Vector.nearestOnLine = function (p, a, b, c) {
  if (a == 0) {
    // Horizontal line
    return {
      x: p.x,
      y: -c / b
    };
  } else if (b == 0) {
    // Vertical line
    return {
      x: -c / a,
      y: p.y
    };
  } else {
    return {
      x: (b * (b * p.x - a * p.y) - a * c) / (a * a + b * b),
      y: (a * (-b * p.x + a * p.y) - b * c) / (a * a + b * b)
    };
  }
};
/**
 * Compute the nearest point on a line defined
 * using two points p1, p2.
 * @param p Vector
 * @param p1
 * @param p2
 * @returns {{x, y}}
 */


Vector.nearestOnLineP2 = function (p, p1, p2) {
  return Vector.nearestOnLine(p, p1.y - p2.y, p2.x - p1.x, p1.x * p2.y - p2.x * p1.y);
};
/**
 * For the line segment [p1, p2], compute the t value.
 * t=0 for p1, t=1 for p2, t=[0,1] is on the line segment.
 * @param p Vector
 * @param p1
 * @param p2
 */


Vector.computeT = function (p, p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Line is more horizontal than vertical
    return (p.x - p1.x) / dx;
  } else {
    return (p.y - p1.y) / dy;
  }
};
/**
 * Compute distance between two points.
 * @param p1
 * @param p2
 */


Vector.distance = function (p1, p2) {
  return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
};
/**
 * Determine the distance from a point to the nearest
 * location on a line segement.
 * @param p Point to test (Vector)
 * @param p1
 * @param p2
 * @return Object with: d: distance, p (x,y) nearest point.
 */


Vector.distanceToLineSegment = function (p, p1, p2) {
  // What is the nearest point on the line through
  // p1 and p2?
  var n = Vector.nearestOnLineP2(p, p1, p2); // Is n in the line segment?

  var t = Vector.computeT(n, p1, p2);

  if (t >= 0 && t <= 1) {
    return {
      d: Vector.distance(p, n),
      p: n
    };
  } // Determine nearest end point


  var d1 = Vector.distance(p, p1);
  var d2 = Vector.distance(p, p2);

  if (d1 < d2) {
    return {
      d: d1,
      p: p1
    };
  } else {
    return {
      d: d2,
      p: p2
    };
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Value.js":
/*!*********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Value.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Value": () => (/* binding */ Value),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility/Sanitize */ "./packages/cirsim/src/Cirsim/Utility/Sanitize.js");

/**
 * Support for values that can be passed around in Cirsim.
 *
 * Mainly used in support of devices that display bus values
 * in binary, hex, or floating point, but also can be used
 * for scalar value.
 *
 * Supports:
 *  single-bit
 *  binary
 *  hexadecimal
 *  16-bit Half-Float values.
 *  @param init Initial value
 *  @param type Value.AUTO, Value.BINARY, Value.HEX, or Value.FLOAT16
 *  @constructor
 */

var Value = function Value(init, type) {
  // Default is undefined
  this.value = undefined;
  this.type = type !== undefined ? type : Value.AUTO; // Optional argument can be an array or value to set

  if (init !== undefined) {
    this.set(init);
  }
}; // The value types. This is how the type will display

Value.AUTO = 0; ///< Binary or hex as appropriate

Value.BINARY = 1; ///< Always in binary

Value.HEX = 2; ///< Hexadecimal

Value.FLOAT16 = 3; ///< 16-bit Half Float

/**
 * Get the current value as a binary array of (true/false)
 * @returns {*}
 */

Value.prototype.get = function () {
  return this.value;
};
/**
 * Get a single bit of the current binary value from the array.
 * @param b
 * @returns {*}
 */


Value.prototype.getBit = function (b) {
  if (this.value.length <= b) {
    return undefined;
  }

  return this.value[b];
};
/**
 * Set the value of this float
 * @param val Can be Value, array, or string.
 */


Value.prototype.set = function (val) {
  if (Array.isArray(val)) {
    this.value = val.slice();
  } else if (val instanceof Value) {
    this.value = val.value.slice();
  } else if (typeof val === 'string' || val instanceof String) {
    this.setAsString(val);
  } else {
    this.value = val;
  }
};

Value.prototype.setZero = function (size) {
  this.value = [];

  for (var i = 0; i < size; i++) {
    this.value.push(false);
  }
};

Value.prototype.clone = function () {
  return new Value(this.value, this.type);
};
/**
 * Add values for this to the save object
 */


Value.prototype.save = function (obj) {
  obj.value = this.value;

  if (this.type !== Value.AUTO) {
    obj.valuetype = this.type;
  }
};

Value.prototype.equals = function (value) {
  if (this.value === value.value) {
    return true;
  }

  if (Array.isArray(this.value) && Array.isArray(value.value) && this.value.length === value.value.length) {
    for (var i = 0; i < this.value.length; i++) {
      if (this.value[i] !== value.value[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
};
/**
 * Load this object from an object converted from JSON
 * @param obj Object from JSON
 */


Value.prototype.load = function (obj) {
  this.set(obj["value"]);

  if (obj['valuetype'] !== undefined) {
    this.type = obj['valuetype'];
  }
};

Value.prototype.getAsString = function () {
  if (this.value === undefined) {
    return "?";
  }

  switch (this.type) {
    default:
      if (this.value.length > 8) {
        return this.getAsHex();
      } else {
        return this.getAsBinary();
      }

    case Value.BINARY:
      return this.getAsBinary();

    case Value.HEX:
      return this.getAsHex();

    case Value.FLOAT16:
      return this.getAsFloat16();
  }
};

Value.prototype.setAsString = function (str, parseonly) {
  if (!(typeof str === 'string' || str instanceof String)) {
    str = str.toString();
  }

  str = _Utility_Sanitize__WEBPACK_IMPORTED_MODULE_0__.Sanitize.sanitize(str); // Trim any leading or trailing space

  str = str.replace(/^\s+|\s+$/gm, '');
  str = str.toLowerCase();

  if (str.indexOf("inf") >= 0 || str === "nan") {
    return this.setAsFloat16(str, parseonly);
  }

  var prefix = str.substr(0, 2);

  if (prefix === '0x') {
    return this.setAsHex(str.substr(2), parseonly);
  }

  if (prefix === '0b') {
    return this.setAsBinary(str.substr(2), parseonly);
  }

  if (str.indexOf('.') >= 0 || str.indexOf('e') >= 0 || str.indexOf('-') >= 0) {
    return this.setAsFloat16(str, parseonly);
  }

  switch (this.type) {
    default:
      return this.setAsBinary(str, parseonly);

    case Value.BINARY:
      return this.setAsBinary(str, parseonly);

    case Value.HEX:
      return this.setAsHex(str, parseonly);

    case Value.FLOAT16:
      return this.setAsFloat16(str, parseonly);
  }
};
/**
 * Draw the bus value with optional label.
 * @param context Context to draw on
 * @param x Center X location to draw
 * @param y Center Y location to draw
 * @param width Maximum allowed width
 * @param label Label to draw. Undefined or null does not draw
 */


Value.prototype.draw = function (context, x, y, width, label) {
  context.save();
  context.translate(x, y);
  context.font = "14px Times";
  context.textAlign = "left";
  var wLabel = 0;

  if (label !== undefined && label !== null) {
    wLabel = context.measureText(label + ": ").width;
  }

  var value = this.getAsString();
  var wValue = context.measureText(value).width;
  var wAll = wLabel + wValue; // Width of it all

  var scale = 1;

  if (wAll > width) {
    scale = width / wAll;
    context.scale(scale, scale);
  }

  var dy = 5;

  if (wLabel > 0) {
    context.fillText(label + ": ", -wAll / 2, dy);
  }

  var hex = this.type == Value.HEX || this.type == Value.AUTO && Array.isArray(this.value) && this.value.length > 8;

  if (hex) {
    context.font = "bold 14px Times";
  }

  context.fillText(value, -wAll / 2 + wLabel, dy);
  context.restore();
};
/**
 * Create content to support dialog box editing of the value
 * @param dlg Dialog box (derived from Dialog)
 * @param value True if dialog box includes the value.
 *
 * An Input dialog box would allow value editing, while an output
 * dialog box would not.
 *
 * @return Object with these attributes:
 *    html: HTML for the dialog box,
 *    validate: A validation function,
 *    accept: An acceptance function}
 */


Value.prototype.dialogContent = function (dlg, value) {
  var _this = this;

  var valueId = dlg.uniqueId();
  var selectId = dlg.uniqueId();

  var option = function option(html, name, type) {
    return "<input type=\"radio\" name=\"".concat(selectId, "\" value=\"").concat(type, "\"").concat(_this.type === type ? " checked" : "", "> ").concat(name);
  };

  var html = '';

  if (value) {
    var initial;

    switch (this.type) {
      default:
      case Value.BINARY:
        initial = '0b' + this.getAsBinary();
        break;

      case Value.HEX:
        initial = '0x' + this.getAsHex();
        break;

      case Value.FLOAT16:
        initial = this.getAsFloat16();
        break;
    }

    html += '<div class="control"><label for="' + valueId + '">Value</label>' + '<input type="text" id="' + valueId + '" name="' + valueId + '" value="' + initial + '" spellcheck="false" onfocus=" this.select()"></div>';
  }

  html += '<div class="control">' + option(html, "Auto", Value.AUTO) + '<br>' + option(html, "Hexadecimal", Value.HEX) + '<br>' + option(html, "Binary", Value.BINARY) + '<br>' + option(html, "Float-16", Value.FLOAT16) + '</div>';

  var validate = function validate() {
    // Validation function
    if (value) {
      // Save off the type so we can change it temporarily
      var saveType = _this.type;
      _this.type = parseInt(document.querySelector('input[name="' + selectId + '"]:checked').value); // $().val());
      // Test the input string

      var valstr = document.getElementById(valueId).value; //  $('#' + valueId).val();

      var val = _this.setAsString(valstr, true); // Restore the type


      _this.type = saveType;

      if (!val) {
        return "Invalid value";
      }
    }

    return null;
  };

  var accept = function accept() {
    // Accept function
    _this.type = parseInt(document.querySelector('input[name="' + selectId + '"]:checked').value); // parseInt($('input[name="' + selectId + '"]:checked').val());

    if (value) {
      var valstr = document.getElementById(valueId).value; //  $('#' + valueId).val();

      _this.setAsString(valstr, false);
    }
  };

  return {
    html: html,
    validate: validate,
    accept: accept
  };
};
/**
 * Add dialog options to a dialog box for editing the value
 * @param dlg Dialog box (derived from Dialog)
 * @param value True if dialog box includes the value.
 *
 * An Input dialog box would allow value editing, while an output
 * dialog box would not.
 *
 * @param callback Function to call after the value has been set
 */


Value.prototype.dialogOptions = function (dlg, value, callback) {
  var content = this.dialogContent(dlg, value);
  dlg.extra(content.html, content.validate, function () {
    content.accept();

    if (callback !== undefined) {
      callback();
    }
  }, value ? 170 : 130);
};
/**********************************************************
 *
 * Integer
 *
 **********************************************************/


Value.prototype.getAsInteger = function () {
  if (!Array.isArray(this.value)) {
    return "?";
  }

  var result = 0;
  var pow = 1;

  for (var i = 0; i < this.value.length; i++, pow *= 2) {
    if (this.value[i] === undefined) {
      return '?';
    } else if (this.value[i]) {
      result += pow;
    }
  }

  return result;
};
/**
 * Set the value from an integer
 * @param v Value to set
 * @param size Number of bits
 */


Value.prototype.setAsInteger = function (v, size) {
  var value = [];

  for (var i = 0; i < size; i++) {
    if (value.push((v & 1) === 1)) ;
    v >>= 1;
  }

  this.value = value;
  return true;
};
/**********************************************************
 *
 * Hexadecimal
 *
 **********************************************************/


Value.prototype.getAsHex = function () {
  if (!Array.isArray(this.value)) {
    return "?";
  }

  var str = '';

  for (var i = 0; i < this.value.length; i += 4) {
    var p = 1;
    var val = 0;

    for (var j = 0; j < 4 && i + j < this.value.length; j++, p *= 2) {
      if (this.value[i + j] === undefined) {
        val = -1;
        break;
      }

      if (this.value[i + j]) {
        val += p;
      }
    }

    if (val < 0) {
      str = '?' + str;
    } else {
      str = Number(val).toString(16) + str;
    }
  }

  return str;
};

Value.prototype.setAsHex = function (str, parseonly) {
  var value = [];

  for (var i = str.length - 1; i >= 0; i--) {
    var c = str.substr(i, 1);

    if (c === ' ') {
      if (value.length > 0) {
        // End when we hit any trailing spaces
        break;
      } else {
        // Ignore leading spaces
        continue;
      }
    } else if (c === '?') {
      value.push([undefined, undefined, undefined, undefined]);
    } else {
      var h = parseInt(c, 16);

      if (isNaN(h)) {
        return false;
      }

      value.push((h & 1) == 1, (h & 2) == 2, (h & 4) == 4, (h & 8) == 8);
    }
  }

  if (!parseonly) {
    this.value = value;
  }

  return true;
};
/**********************************************************
 *
 * Binary
 *
 **********************************************************/

/**
 * Get the value as a binary string
 * @returns binary string
 */


Value.prototype.getAsBinary = function () {
  function toValueString(v) {
    if (Array.isArray(v)) {
      var str = '';
      v.forEach(function (v1) {
        str = toValueString(v1) + str;
      });
      return str;
    } else {
      return v === undefined ? "?" : v ? "1" : "0";
    }
  }

  return toValueString(this.value);
};
/**
 * Set the value from a binary string
 * @param str String to parse
 * @param parseOnly True if parse, but don't set (error check)
 * @return {boolean} true if successful
 */


Value.prototype.setAsBinary = function (str, parseOnly) {
  var value = [];

  for (var i = str.length - 1; i >= 0; i--) {
    var c = str.substr(i, 1);

    if (c === ' ') {
      if (value.length > 0) {
        // End when we hit any leading spaces
        break;
      } else {
        // Ignore trailing spaces
        continue;
      }
    }

    switch (c) {
      case '0':
        value.push(false);
        break;

      case '1':
        value.push(true);
        break;

      case '?':
        value.push(undefined);
        break;

      default:
        return false;
    }
  }

  if (!parseOnly) {
    this.value = value;
  }

  return true;
};
/**********************************************************
 *
 * 16-bit Floating Point
 *
 **********************************************************/


Value.prototype.setInfinity16 = function (neg) {
  this.value = [false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, neg];
};
/**
 * Get the value as a floating point string like 3.5 or -7.88
 * @returns {string}
 */


Value.prototype.getAsFloat16 = function () {
  if (this.value.length < 16) {
    return '?';
  }

  var str = this.value[15] ? '-' : '';

  for (var i = 0; i < 15; i++) {
    if (this.value[i]) {
      break;
    }
  }

  if (i >= 15) {
    return str + '0';
  }
  /*
   * Convert exponent part to integer
   */


  var p = 1;
  var e = 0;

  for (i = 10; i < 15; i++, p *= 2) {
    if (this.value[i]) {
      e += p;
    }
  }

  if (e == 0x1f) {
    for (var i = 0; i < 10; i++) {
      if (this.value[i]) {
        return "NaN";
      }
    }

    return str + "inf";
  }
  /*
   * Remove the offset
   */


  e -= 0xf;
  /*
   * Convert fractional part to float
   */

  var f = 1;
  var p = 0.5;

  for (i = 9; i >= 0; i--, p /= 2) {
    if (this.value[i]) {
      f += p;
    }
  }

  f *= Math.pow(2, e);
  return str + f.toExponential(3);
};

Value.prototype.setAsFloat16 = function (str, parseonly) {
  var zero = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  var value = zero;

  if (str === "inf") {
    if (!parseonly) {
      this.value = [false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, false];
    }

    return true;
  }

  if (str === "-inf") {
    if (!parseonly) {
      this.value = [false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true];
    }

    return true;
  }

  if (str === "nan") {
    if (!parseonly) {
      this.value = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false];
    }

    return true;
  }

  var f = parseFloat(str);

  if (isNaN(f)) {
    return false;
  }

  if (f == 0) {
    if (!parseonly) {
      this.value = value;
    }

    return true;
  }

  var neg = f < 0;

  if (neg) {
    f = -f;
  }

  var e = 0;

  while (f > 1 && e < 16) {
    f /= 2;
    e++;
  }

  if (e >= 15) {
    // Infinity
    if (!parseonly) {
      this.setInfinity16(neg);
    }

    return true;
  }

  while (f < 1 && e > -15) {
    f *= 2;
    e--;
  }

  if (e <= -15) {
    // Not supporting denormal...
    if (!parseonly) {
      this.setZero(16);
    }

    return true;
  }

  f -= 1; // Remove the 1

  f *= 2;

  for (var i = 9; i >= 0; i--, f *= 2) {
    if (f >= 1) {
      value[i] = true;
      f -= 1;
    } else {
      value[i] = false;
    }
  }

  e += 0xf;

  for (i = 10; i < 15; i++, e >>= 1) {
    if (e & 1) {
      value[i] = true;
    } else {
      value[i] = false;
    }
  }

  value[15] = neg;

  if (!parseonly) {
    this.value = value;
  }

  return true;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Value);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Vendor/Blob.js":
/*!***************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Vendor/Blob.js ***!
  \***************************************************/
/***/ (function() {

/* Blob.js
 * A Blob implementation.
 * 2014-07-24
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/dsamarin
 * License: MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */

/*global self, unescape */

/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
 plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
(function (view) {
  "use strict";

  view.URL = view.URL || view.webkitURL;

  if (view.Blob && view.URL) {
    try {
      new Blob();
      return;
    } catch (e) {}
  } // Internally we use a BlobBuilder implementation to base Blob off of
  // in order to support older browsers that only have BlobBuilder


  var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || function (view) {
    var get_class = function get_class(object) {
      return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    },
        FakeBlobBuilder = function BlobBuilder() {
      this.data = [];
    },
        FakeBlob = function Blob(data, type, encoding) {
      this.data = data;
      this.size = data.length;
      this.type = type;
      this.encoding = encoding;
    },
        FBB_proto = FakeBlobBuilder.prototype,
        FB_proto = FakeBlob.prototype,
        FileReaderSync = view.FileReaderSync,
        FileException = function FileException(type) {
      this.code = this[this.name = type];
    },
        file_ex_codes = ("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR " + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),
        file_ex_code = file_ex_codes.length,
        real_URL = view.URL || view.webkitURL || view,
        real_create_object_URL = real_URL.createObjectURL,
        real_revoke_object_URL = real_URL.revokeObjectURL,
        URL = real_URL,
        btoa = view.btoa,
        atob = view.atob,
        ArrayBuffer = view.ArrayBuffer,
        Uint8Array = view.Uint8Array,
        origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;

    FakeBlob.fake = FB_proto.fake = true;

    while (file_ex_code--) {
      FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
    } // Polyfill URL


    if (!real_URL.createObjectURL) {
      URL = view.URL = function (uri) {
        var uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            uri_origin;
        uri_info.href = uri;

        if (!("origin" in uri_info)) {
          if (uri_info.protocol.toLowerCase() === "data:") {
            uri_info.origin = null;
          } else {
            uri_origin = uri.match(origin);
            uri_info.origin = uri_origin && uri_origin[1];
          }
        }

        return uri_info;
      };
    }

    URL.createObjectURL = function (blob) {
      var type = blob.type,
          data_URI_header;

      if (type === null) {
        type = "application/octet-stream";
      }

      if (blob instanceof FakeBlob) {
        data_URI_header = "data:" + type;

        if (blob.encoding === "base64") {
          return data_URI_header + ";base64," + blob.data;
        } else if (blob.encoding === "URI") {
          return data_URI_header + "," + decodeURIComponent(blob.data);
        }

        if (btoa) {
          return data_URI_header + ";base64," + btoa(blob.data);
        } else {
          return data_URI_header + "," + encodeURIComponent(blob.data);
        }
      } else if (real_create_object_URL) {
        return real_create_object_URL.call(real_URL, blob);
      }
    };

    URL.revokeObjectURL = function (object_URL) {
      if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
        real_revoke_object_URL.call(real_URL, object_URL);
      }
    };

    FBB_proto.append = function (data
    /*, endings*/
    ) {
      var bb = this.data; // decode data to a binary string

      if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
        var str = "",
            buf = new Uint8Array(data),
            i = 0,
            buf_len = buf.length;

        for (; i < buf_len; i++) {
          str += String.fromCharCode(buf[i]);
        }

        bb.push(str);
      } else if (get_class(data) === "Blob" || get_class(data) === "File") {
        if (FileReaderSync) {
          var fr = new FileReaderSync();
          bb.push(fr.readAsBinaryString(data));
        } else {
          // async FileReader won't work as BlobBuilder is sync
          throw new FileException("NOT_READABLE_ERR");
        }
      } else if (data instanceof FakeBlob) {
        if (data.encoding === "base64" && atob) {
          bb.push(atob(data.data));
        } else if (data.encoding === "URI") {
          bb.push(decodeURIComponent(data.data));
        } else if (data.encoding === "raw") {
          bb.push(data.data);
        }
      } else {
        if (typeof data !== "string") {
          data += ""; // convert unsupported types to strings
        } // decode UTF-16 to binary string


        bb.push(unescape(encodeURIComponent(data)));
      }
    };

    FBB_proto.getBlob = function (type) {
      if (!arguments.length) {
        type = null;
      }

      return new FakeBlob(this.data.join(""), type, "raw");
    };

    FBB_proto.toString = function () {
      return "[object BlobBuilder]";
    };

    FB_proto.slice = function (start, end, type) {
      var args = arguments.length;

      if (args < 3) {
        type = null;
      }

      return new FakeBlob(this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding);
    };

    FB_proto.toString = function () {
      return "[object Blob]";
    };

    FB_proto.close = function () {
      this.size = 0;
      delete this.data;
    };

    return FakeBlobBuilder;
  }(view);

  view.Blob = function (blobParts, options) {
    var type = options ? options.type || "" : "";
    var builder = new BlobBuilder();

    if (blobParts) {
      for (var i = 0, len = blobParts.length; i < len; i++) {
        if (Uint8Array && blobParts[i] instanceof Uint8Array) {
          builder.append(blobParts[i].buffer);
        } else {
          builder.append(blobParts[i]);
        }
      }
    }

    var blob = builder.getBlob(type);

    if (!blob.slice && blob.webkitSlice) {
      blob.slice = blob.webkitSlice;
    }

    return blob;
  };

  var getPrototypeOf = Object.getPrototypeOf || function (object) {
    return object.__proto__;
  };

  view.Blob.prototype = getPrototypeOf(new view.Blob());
})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/Vendor/FileSaver.js":
/*!********************************************************!*\
  !*** ./packages/cirsim/src/Cirsim/Vendor/FileSaver.js ***!
  \********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */

/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || function (view) {
  "use strict"; // IE <10 is explicitly unsupported

  if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
    return;
  }

  var doc = view.document // only get URL when necessary in case Blob.js hasn't overridden it yet
  ,
      get_URL = function get_URL() {
    return view.URL || view.webkitURL || view;
  },
      save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
      can_use_save_link = ("download" in save_link),
      click = function click(node) {
    var event = new MouseEvent("click");
    node.dispatchEvent(event);
  },
      is_safari = /constructor/i.test(view.HTMLElement),
      is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
      throw_outside = function throw_outside(ex) {
    (view.setImmediate || view.setTimeout)(function () {
      throw ex;
    }, 0);
  },
      force_saveable_type = "application/octet-stream" // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
  ,
      arbitrary_revoke_timeout = 1000 * 40 // in ms
  ,
      revoke = function revoke(file) {
    var revoker = function revoker() {
      if (typeof file === "string") {
        // file is an object URL
        get_URL().revokeObjectURL(file);
      } else {
        // file is a File
        file.remove();
      }
    };

    setTimeout(revoker, arbitrary_revoke_timeout);
  },
      dispatch = function dispatch(filesaver, event_types, event) {
    event_types = [].concat(event_types);
    var i = event_types.length;

    while (i--) {
      var listener = filesaver["on" + event_types[i]];

      if (typeof listener === "function") {
        try {
          listener.call(filesaver, event || filesaver);
        } catch (ex) {
          throw_outside(ex);
        }
      }
    }
  },
      auto_bom = function auto_bom(blob) {
    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xFEFF), blob], {
        type: blob.type
      });
    }

    return blob;
  },
      FileSaver = function FileSaver(blob, name, no_auto_bom) {
    if (!no_auto_bom) {
      blob = auto_bom(blob);
    } // First try a.download, then web filesystem, then object URLs


    var filesaver = this,
        type = blob.type,
        force = type === force_saveable_type,
        object_url,
        dispatch_all = function dispatch_all() {
      dispatch(filesaver, "writestart progress write writeend".split(" "));
    } // on any filesys errors revert to saving with object URLs
    ,
        fs_error = function fs_error() {
      if ((is_chrome_ios || force && is_safari) && view.FileReader) {
        // Safari doesn't allow downloading of blob urls
        var reader = new FileReader();

        reader.onloadend = function () {
          var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
          var popup = view.open(url, '_blank');
          if (!popup) view.location.href = url;
          url = undefined; // release reference before dispatching

          filesaver.readyState = filesaver.DONE;
          dispatch_all();
        };

        reader.readAsDataURL(blob);
        filesaver.readyState = filesaver.INIT;
        return;
      } // don't create more object URLs than needed


      if (!object_url) {
        object_url = get_URL().createObjectURL(blob);
      }

      if (force) {
        view.location.href = object_url;
      } else {
        var opened = view.open(object_url, "_blank");

        if (!opened) {
          // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
          view.location.href = object_url;
        }
      }

      filesaver.readyState = filesaver.DONE;
      dispatch_all();
      revoke(object_url);
    };

    filesaver.readyState = filesaver.INIT;

    if (can_use_save_link) {
      object_url = get_URL().createObjectURL(blob);
      setTimeout(function () {
        save_link.href = object_url;
        save_link.download = name;
        click(save_link);
        dispatch_all();
        revoke(object_url);
        filesaver.readyState = filesaver.DONE;
      });
      return;
    }

    fs_error();
  },
      FS_proto = FileSaver.prototype,
      saveAs = function saveAs(blob, name, no_auto_bom) {
    return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
  }; // IE 10+ (native saveAs)


  if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
    return function (blob, name, no_auto_bom) {
      name = name || blob.name || "download";

      if (!no_auto_bom) {
        blob = auto_bom(blob);
      }

      return navigator.msSaveOrOpenBlob(blob, name);
    };
  }

  FS_proto.abort = function () {};

  FS_proto.readyState = FS_proto.INIT = 0;
  FS_proto.WRITING = 1;
  FS_proto.DONE = 2;
  FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
  return saveAs;
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined.content); // `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window


if ( true && module.exports) {
  module.exports.saveAs = saveAs;
} else if (typeof define !== "undefined" && define !== null && __webpack_require__.amdO !== null) {
  define([], function () {
    return saveAs;
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveAs);

/***/ }),

/***/ "./packages/cirsim/src/Cirsim/View.js":
/*!********************************************!*\
  !*** ./packages/cirsim/src/Cirsim/View.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _Selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Selection */ "./packages/cirsim/src/Cirsim/Selection.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component */ "./packages/cirsim/src/Cirsim/Component.js");
/* harmony import */ var _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM/Tools */ "./packages/cirsim/src/Cirsim/DOM/Tools.js");
/* harmony import */ var _Dlg_ImportTabDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dlg/ImportTabDialog */ "./packages/cirsim/src/Cirsim/Dlg/ImportTabDialog.js");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Model */ "./packages/cirsim/src/Cirsim/Model.js");
/* harmony import */ var _Dlg_ExportPNGDlg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Dlg/ExportPNGDlg */ "./packages/cirsim/src/Cirsim/Dlg/ExportPNGDlg.js");






/**
 * View of a circuit
 * @param main Main object for interface
 * @param canvas Canvas element in the view
 * @param circuit Circuit we draw on that canvas
 * @constructor
 */

var View = function View(main, canvas, circuit) {
  var _this = this;

  //
  // Object properties
  //
  Object.defineProperties(this, {
    main: {
      get: function get() {
        return main;
      }
    },
    circuit: {
      get: function get() {
        return circuit;
      },
      set: function set(value) {
        circuit = value;
      }
    },
    element: {
      get: function get() {
        return canvas;
      }
    },
    model: {
      get: function get() {
        return circuit.circuits.model;
      }
    }
  }); // The selection object

  this.selection = new _Selection__WEBPACK_IMPORTED_MODULE_0__.Selection(this); /// The tab number for this view

  this.tabnum = -1;
  canvas.addEventListener('dragover', function (event) {
    event.preventDefault();
  });
  canvas.addEventListener('drop', function (event) {
    event.preventDefault();
  });

  this.initialize = function () {
    _this.setSize();

    main.dragAndDrop.droppable(_this, function (paletteItem, x, y) {
      var componentObject = paletteItem.obj;

      if (componentObject === undefined) {
        return;
      }

      _this.model.backup();

      var component = new componentObject(paletteItem);
      component.brand();
      component.x = x;
      component.y = y;

      _this.circuit.add(component);

      _this.circuit.snapIt(component);

      _this.ensureSize();

      _this.draw();
    }); //
    // Mouse management
    //

    var lastMouse = {
      x: 0,
      y: 0
    };
    var mouse = {
      x: 0,
      y: 0
    };
    var lastPage = {
      x: 0,
      y: 0
    };

    var mouseDownListener = function mouseDownListener(event) {
      event.preventDefault();
      downListener(event.pageX, event.pageY, false, event);
    };

    var touchStartListener = function touchStartListener(event) {
      event.preventDefault();
      var touch = event.changedTouches[0];
      downListener(touch.pageX, touch.pageY, true, event);
    };

    var downListener = function downListener(pageX, pageY, touch, event) {
      var offset = _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.offset(canvas);
      lastPage = {
        x: pageX,
        y: pageY
      };
      mouse.x = pageX - offset.left;
      mouse.y = pageY - offset.top;
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y; // If we are in inline mode, we don't allow selecting
      // or dragging at all.

      if (main.options.display === 'inline') {
        _this.circuit.touch(mouse.x, mouse.y);

        return;
      }

      _this.selection.mouseDown(mouse.x, mouse.y, event);

      _this.draw(); // Only install mouse or touch movement
      // handler while we are moving


      if (touch) {
        canvas.addEventListener('touchmove', touchMoveListener);
      } else {
        canvas.addEventListener('mousemove', mouseMoveListener);
      }

      canvas.parentNode.addEventListener('scroll', scrollListener);
    };

    var scrollListener = function scrollListener() {
      var offset = _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.offset(canvas); // canvasJ.offset();

      mouse.x = lastPage.x - offset.left;
      mouse.y = lastPage.y - offset.top;

      _this.selection.mouseMove(mouse.x, mouse.y, mouse.x - lastMouse.x, mouse.y - lastMouse.y);

      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;

      _this.draw();
    };

    var mouseMoveListener = function mouseMoveListener(event) {
      event.preventDefault();
      moveListener(event.pageX, event.pageY, false);
    };

    var touchMoveListener = function touchMoveListener(event) {
      event.preventDefault();
      var touch = event.changedTouches[0];
      moveListener(touch.pageX, touch.pageY, true);
    };

    var moveListener = function moveListener(pageX, pageY, touch) {
      // Ignore if we did not actually move
      if (pageX === lastPage.x && pageY === lastPage.y) {
        return;
      }

      var offset = _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.offset(canvas);
      lastPage = {
        x: pageX,
        y: pageY
      };
      mouse.x = pageX - offset.left;
      mouse.y = pageY - offset.top;

      _this.selection.mouseMove(mouse.x, mouse.y, mouse.x - lastMouse.x, mouse.y - lastMouse.y);

      _this.ensureSize();

      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;

      _this.draw();
    };

    var mouseDblClickListener = function mouseDblClickListener(event) {
      event.preventDefault();

      if (_this.selection.selection.length === 1 && _this.selection.selection[0] instanceof _Component__WEBPACK_IMPORTED_MODULE_1__.Component) {
        var component = _this.selection.selection[0];
        component.properties(main);
      }
    };

    var touchEndListener = function touchEndListener(event) {
      event.preventDefault();
      var touch = event.changedTouches[0];
      upListener(touch.pageX, touch.pageY, true);
    };

    var touchCancelListener = function touchCancelListener(event) {
      var touch = event.changedTouches[0];
      upListener(touch.pageX, touch.pageY, true);
    };

    var mouseUpListener = function mouseUpListener(event) {
      canvas.removeEventListener('mousemove', mouseMoveListener);
      upListener(event.pageX, event.pageY, false);
    };

    var upListener = function upListener(pageX, pageY, touch) {
      canvas.parentNode.removeEventListener('scroll', scrollListener); // canvasJ.parent().off("scroll");

      var offset = _DOM_Tools__WEBPACK_IMPORTED_MODULE_2__.Tools.offset(canvas);
      mouse.x = pageX - offset.left;
      mouse.y = pageY - offset.top;

      _this.selection.mouseUp(mouse.x, mouse.y);

      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;

      _this.draw();
    }; // Install mouse handlers


    canvas.addEventListener('mousedown', mouseDownListener);
    canvas.addEventListener('dblclick', mouseDblClickListener);
    var body = document.querySelector('body');
    body.addEventListener('mouseup', mouseUpListener); // Install touch handlers

    canvas.addEventListener('touchstart', touchStartListener);
    canvas.addEventListener('touchend', touchEndListener);
    canvas.addEventListener('touchcancel', touchCancelListener);
  };

  this.draw = function () {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.circuit.draw(ctx, this);
    this.selection.draw(ctx);
  };

  this["delete"] = function () {
    this.model.backup();
    this.selection["delete"]();
    this.draw();
  };
  /**
   * Advance the animation for this view by a given amount of time...
   * @param delta
   */


  this.advance = function (delta) {
    return this.circuit.circuits.advance(delta);
  };

  this.ensureSize = function () {
    var bounds = this.circuit.bounds();
    var wid = bounds.right + 1;
    var hit = bounds.bottom + 1;

    if (wid > canvas.offsetWidth) {
      //canvasJ.width(max.x);
      canvas.style.width = wid + 'px';
      canvas.setAttribute("width", wid);
      circuit.width = wid;
    }

    if (hit > canvas.offsetHeight) {
      canvas.style.height = bounds.bottom + 'px';
      canvas.setAttribute("height", bounds.bottom);
      circuit.height = bounds.bottom;
    }
  };

  this.setSize = function () {
    if (canvas.offsetWidth !== this.circuit.width || canvas.offsetHeight !== this.circuit.height) {
      // Size setting
      canvas.style.width = this.circuit.width + 'px';
      canvas.style.height = this.circuit.height + 'px';
      canvas.width = this.circuit.width;
      canvas.height = this.circuit.height;
    }
  };

  this.initialize();
  this.draw();
};
/**
 * Import a tab from another file that we load via AJAX.
 * @param importer Object from the list of imports
 *
 * Keys in the importer object:
 *
 * from - Tab in source we import from
 * into - Tab we import into
 * name - Filename for source
 * extra - Object with extra key/value pairs to send to server when importing
 */

View.prototype.importTab = function (importer) {
  var _this2 = this;

  this.selection.clear();
  var dlg = new _Dlg_ImportTabDialog__WEBPACK_IMPORTED_MODULE_3__.ImportTabDialog(importer, this.main.options, this.main.toast);
  dlg.open(function (data) {
    _this2.model.backup();

    var model = new _Model__WEBPACK_IMPORTED_MODULE_4__.Model(_this2.main);
    model.fmJSON(data); // Find the tab

    var circuit = model.getCircuit(importer.from);

    if (circuit !== null) {
      circuit.name = importer.into;

      _this2.main.model.replaceCircuit(circuit);

      _this2.circuit = circuit;

      _this2.draw();
    }
  });
};
/**
 * Export this view as a PNG file
 */


View.prototype.exportPNG = function () {
  var dlg = new _Dlg_ExportPNGDlg__WEBPACK_IMPORTED_MODULE_5__.ExportPNGDlg(this);
  dlg.open();
};

/***/ }),

/***/ "./packages/cirsim/src/polyfills/all.js":
/*!**********************************************!*\
  !*** ./packages/cirsim/src/polyfills/all.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var promise_polyfill_src_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! promise-polyfill/src/polyfill */ "./.yarn/cache/promise-polyfill-npm-8.2.0-caaa5896b6-37a612596d.zip/node_modules/promise-polyfill/src/polyfill.js");
/* harmony import */ var _endsWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endsWith.js */ "./packages/cirsim/src/polyfills/endsWith.js");
/* harmony import */ var _endsWith_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_endsWith_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assign.js */ "./packages/cirsim/src/polyfills/assign.js");
/* harmony import */ var _assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assign_js__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./packages/cirsim/src/polyfills/assign.js":
/*!*************************************************!*\
  !*** ./packages/cirsim/src/polyfills/assign.js ***!
  \*************************************************/
/***/ (() => {

/**
 * @file
 * Polyfill for Object.assign
 */
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
}

/***/ }),

/***/ "./packages/cirsim/src/polyfills/endsWith.js":
/*!***************************************************!*\
  !*** ./packages/cirsim/src/polyfills/endsWith.js ***!
  \***************************************************/
/***/ (() => {

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }

    return this.substring(this_len - search.length, this_len) === search;
  };
}

/***/ }),

/***/ "./packages/cirsim/src/public-path.js":
/*!********************************************!*\
  !*** ./packages/cirsim/src/public-path.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Set the Webpack public path so it knows where to load
 * CSS and images relative to. This must be imported before any other
 * imports.
 */
function getScriptDir() {
  var re = /^(http.*\/.*\/)[^\/]+.js.*$/;
  var result = document.currentScript.src.match(re);

  if (result !== null) {
    return result[1];
  } // If this fails we are likely running on a local
  // file system, so find the path from that.


  re = /^.*\/([^\/]+.js)$/;
  result = document.currentScript.src.match(re);

  if (result !== null) {
    var javascriptFile = result[1];
    var scriptElements = document.getElementsByTagName('script');

    for (var i = 0; i < scriptElements.length; i++) {
      var source = scriptElements[i].getAttribute("src");
      var ndx = source.indexOf(javascriptFile);

      if (ndx > -1) {
        return source.substring(0, ndx);
      }
    }
  }

  return '';
}

__webpack_require__.p = getScriptDir();

/***/ }),

/***/ "./vendor/cl/cirsim/index.js":
/*!***********************************!*\
  !*** ./vendor/cl/cirsim/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cirsim": () => (/* reexport safe */ cirsim__WEBPACK_IMPORTED_MODULE_1__.Cirsim),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cirsim_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cirsim.scss */ "./vendor/cl/cirsim/_cirsim.scss");
/* harmony import */ var cirsim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cirsim */ "./packages/cirsim/index.js");
/* harmony import */ var _js_CirsimFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/CirsimFactory */ "./vendor/cl/cirsim/js/CirsimFactory.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cirsim__WEBPACK_IMPORTED_MODULE_1__.Cirsim);

_js_CirsimFactory__WEBPACK_IMPORTED_MODULE_2__.CirsimFactory.create(Site.Site);

/***/ }),

/***/ "./vendor/cl/cirsim/js/CirsimFactory.js":
/*!**********************************************!*\
  !*** ./vendor/cl/cirsim/js/CirsimFactory.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CirsimFactory": () => (/* binding */ CirsimFactory)
/* harmony export */ });
/* harmony import */ var cirsim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cirsim */ "./packages/cirsim/index.js");

var CirsimFactory = function CirsimFactory() {};

CirsimFactory.create = function (site) {
  function install() {
    var elements = document.querySelectorAll('div.cirsim-install');

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var json = JSON.parse(element.textContent);
      element.innerHTML = '';
      var cirsim = new cirsim__WEBPACK_IMPORTED_MODULE_0__.Cirsim(element, json);
      cirsim.startNow();
      element.style.display = 'block';
      element.classList.remove('cirsim-install');
    }
  }

  site.start(function () {
    install();
  });
  site.messageListener(function (msg, data) {
    switch (msg) {
      case 'cl-quiz-after-installed':
        install();
        break;

      case 'cl-grades-grader-installed':
        install();
        break;
    }
  });
};

/***/ }),

/***/ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./packages/cirsim/src/_cirsim.scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./packages/cirsim/src/_cirsim.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/api.js */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/getUrl.js */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _img_menu_check_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/menu-check.png */ "./packages/cirsim/src/img/menu-check.png");
// Imports




var ___CSS_LOADER_EXPORT___ = _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_img_menu_check_png__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div.cirsim div.toast {\n  position: absolute;\n  bottom: 0;\n  visibility: hidden;\n  transform: translateY(2.3em);\n  z-index: 400;\n  transition: all 0.4s ease-in-out 0s, visibility 0s linear 0.4s, z-index 0s linear 0.01s;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 1.1em;\n  left: calc(50% - 30em/2);\n  width: 30em;\n  background-color: #151515;\n  color: white;\n  text-align: center;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  padding: 0.5em;\n}\ndiv.cirsim div.toast.toast-active {\n  visibility: visible;\n  transform: translateY(0%);\n  transition-delay: 0s, 0s, 0.4s;\n  z-index: 400;\n}\n\ndiv.cirsim nav.menubar {\n  position: relative;\n  z-index: 100;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  background-color: #f0f3f0;\n  border-bottom: thin solid #808080;\n  font-size: 0.9rem;\n}\ndiv.cirsim nav.menubar li:hover {\n  background: #00796B;\n}\ndiv.cirsim nav.menubar li {\n  user-select: none;\n  cursor: pointer;\n}\ndiv.cirsim nav.menubar li a, div.cirsim nav.menubar li a:link, div.cirsim nav.menubar li a:visited {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.9rem;\n  color: black;\n  text-decoration: none;\n}\ndiv.cirsim nav.menubar > ul {\n  list-style-type: none;\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\ndiv.cirsim nav.menubar > ul img.check {\n  vertical-align: baseline;\n  width: 19px;\n  height: 16px;\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\ndiv.cirsim nav.menubar > ul > li {\n  display: inline-block;\n  margin: 0;\n  border: 0;\n  padding: 0.25em 2em 0.25em 0.5em;\n  position: relative;\n}\ndiv.cirsim nav.menubar > ul > li a, div.cirsim nav.menubar > ul > li a:link, div.cirsim nav.menubar > ul > li a:visited {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.9rem;\n  color: black;\n  text-decoration: none;\n}\ndiv.cirsim nav.menubar > ul ul {\n  visibility: hidden;\n  opacity: 0;\n  transform: translateY(-2em);\n  z-index: -1;\n  transition: all 0.2s ease-in-out 0s, visibility 0s linear 0.2s, z-index 0s linear 0.01s;\n  list-style-type: none;\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  top: 100%;\n  margin: 1px 0 0 0;\n  background-color: #f0f3f0;\n  padding: 0;\n  border: 1px solid #808080;\n  border-top-width: 0;\n}\ndiv.cirsim nav.menubar > ul ul > li {\n  padding: 0 5px;\n  margin: 0;\n  overflow: hidden;\n}\ndiv.cirsim nav.menubar > ul ul > li a {\n  display: inline-block;\n  width: 8em;\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\ndiv.cirsim nav.menubar > ul ul > li.menu-disabled a {\n  opacity: 0.3;\n}\ndiv.cirsim nav.menubar > ul ul.menu-open {\n  visibility: visible;\n  opacity: 1;\n  z-index: 100;\n  transform: translateY(0%);\n  transition-delay: 0s, 0s, 0.2s;\n}\ndiv.cirsim nav.menubar > ul ul.edit-menu a {\n  width: 6em;\n}\ndiv.cirsim nav.menubar > ul ul.option-menu a {\n  width: 11em;\n}\ndiv.cirsim nav.menubar > ul ul.help-menu a {\n  width: 7.5em;\n}\ndiv.cirsim nav.menubar > ul .ul-state-active {\n  color: red;\n}\ndiv.cirsim nav.menubar > ul li.menu-divider {\n  height: 1px;\n  border: 0 solid black;\n  border-top-width: 1px;\n}\n\ndiv.cirsim div.cs-palette {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  box-sizing: border-box;\n  width: 83px;\n  background: white;\n  border-right: 1px solid black;\n  padding: 1em 5px;\n  z-index: 5;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  cursor: pointer;\n  -moz-user-select: -moz-none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\ndiv.cirsim div.cs-palette div.cs-item {\n  position: relative;\n  min-height: 60px;\n  border-bottom: thin solid #dddddd;\n  align-items: center;\n  display: flex;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box {\n  vertical-align: middle;\n  margin: 0;\n  padding: 0;\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box div.cs-img {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  line-height: 0;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box img {\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  margin: 0;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box div.cs-desc {\n  display: block;\n  font-style: normal;\n  font-weight: bold;\n  padding: 0;\n  margin: 0;\n  text-align: center;\n  font-size: 0.8em;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box div.long {\n  font-size: 0.65em;\n}\ndiv.cirsim div.cs-palette figure {\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  margin: 0;\n  padding: 0;\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border-bottom: thin solid #dddddd;\n}\ndiv.cirsim div.cs-palette figure img {\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  margin: 0;\n}\ndiv.cirsim div.cs-palette figure figcaption {\n  font-style: normal;\n  font-weight: bold;\n  padding: 0;\n  margin: 0;\n  text-align: center;\n}\ndiv.cirsim div.cs-palette figure figcaption.long {\n  font-size: 0.65em;\n}\n\n.cirsim-dialog-titlebar {\n  position: absolute;\n  top: 50%;\n  width: 20px;\n  margin: -10px 0 0 0;\n  padding: 1px;\n  height: 20px;\n}\n\n.cirsim-home {\n  right: calc(0.6em + 20px);\n}\n\n.cirsim-back {\n  right: calc(0.9em + 40px);\n}\n\n.cirsim-help {\n  position: relative;\n  width: 100%;\n  max-width: 100%;\n  padding: 0.5em;\n}\n.cirsim-help p:first-child {\n  margin-top: 0;\n}\n.cirsim-help figure {\n  text-align: center;\n  overflow-x: auto;\n  margin: 1em 0;\n}\n.cirsim-help figure img {\n  box-shadow: none;\n  border: 0;\n  padding: 0;\n  margin: 0;\n}\n\n.cirsim .help-div {\n  padding: 0;\n  border-left: 1px solid #aaaaaa;\n  border-right: 1px solid #aaaaaa;\n  background-color: white;\n}\n.cirsim .help-div div.header {\n  box-sizing: border-box;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-weight: bold;\n  background-color: #009688;\n  color: black;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  z-index: 20;\n  height: 25px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n}\n.cirsim .help-div div.header h1 {\n  flex-grow: 1;\n  margin: 0;\n  padding: 4px 4px 0 10px;\n  font-family: \"Trebuchet MS\", Helvetica, sans-serif;\n  font-size: 16px;\n  line-height: 16px;\n  user-select: none;\n}\n.cirsim .help-div div.header button {\n  box-size: border-box;\n  flex: 0 0 25px;\n  width: 25px;\n  height: 25px;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  background: none;\n  outline: none;\n}\n.cirsim .help-div div.header button:hover {\n  background-color: #e81123;\n  cursor: pointer;\n}\n\ndiv.cirsim div.work {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 1.53em;\n  right: 0;\n  bottom: 0;\n  background: black;\n}\n\ndiv.cirsim-install {\n  display: none;\n}\n\ndiv.cirsim .cirsim-overlay {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: #a00;\n  opacity: 0.05;\n  z-index: 2000;\n  display: none;\n}\ndiv.cirsim div.main {\n  line-height: normal;\n  font-size: 1rem;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n}\ndiv.cirsim div.help-div {\n  line-height: normal;\n  font-size: 1rem;\n  display: none;\n}\n\ndiv.cirsim.docked-help .main {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 325px;\n  bottom: 0;\n}\ndiv.cirsim.docked-help .help-div {\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 325px;\n  overflow: auto;\n}\n\ndiv.cirsim-full {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: white;\n}\n\ndiv.cirsim-inline {\n  position: relative;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  background: white;\n  overflow: hidden;\n}\ndiv.cirsim-inline div {\n  text-align: center;\n}\ndiv.cirsim-inline canvas {\n  margin: 0 auto;\n}\n\ndiv.cirsim-window {\n  position: relative;\n  width: 100%;\n  height: 600px;\n  margin: 0;\n  border-left: 0;\n  border-right: 0;\n  padding: 0;\n  border-top: thin solid #aaaaaa;\n  background: white;\n  min-height: 100px;\n  min-width: 800px;\n}\n\ndiv.cirsim.height300 {\n  height: 300px;\n}\n\ndiv.cirsim div.cirsim-dlg-content {\n  position: relative;\n  padding: 0.5em;\n  font-size: 0.95em;\n}\ndiv.cirsim div.cirsim-dlg-content input {\n  padding: 3px;\n  box-sizing: border-box;\n  font-size: 1.1em;\n}\ndiv.cirsim div.cirsim-dlg-content h2 {\n  margin: 0.75em 0;\n}\ndiv.cirsim div.cirsim-dlg-content form {\n  position: relative;\n  height: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content .large {\n  font-size: 1.2em;\n}\ndiv.cirsim div.cirsim-dlg-content fieldset {\n  position: relative;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  min-width: 0;\n  max-width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content p.error {\n  margin: 1em 0 0 0;\n  text-align: center;\n  color: red;\n  font-size: 0.9em;\n  font-style: italic;\n}\ndiv.cirsim div.cirsim-dlg-content div.control {\n  position: relative;\n  margin: 0 0 1em 0;\n}\ndiv.cirsim div.cirsim-dlg-content div.control div.left {\n  text-align: left;\n}\ndiv.cirsim div.cirsim-dlg-content div.control label {\n  display: block;\n  font-style: italic;\n  margin: 0.2em 0 0.1em 0;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input {\n  display: block;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input[type=text], div.cirsim div.cirsim-dlg-content div.control input[type=file] {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input[type=radio] {\n  display: inline-block;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input[type=range] {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control p.selector {\n  text-align: center;\n}\ndiv.cirsim div.cirsim-dlg-content div.control select {\n  width: 6em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control select.auto {\n  width: auto;\n}\ndiv.cirsim div.cirsim-dlg-content div.control select.files {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control div.notice {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 45%;\n  text-align: center;\n  font-style: italic;\n  color: saddlebrown;\n}\ndiv.cirsim div.cirsim-dlg-content div.control textarea {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control div.choosers {\n  display: inline-block;\n  text-align: left;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 {\n  margin: 0 0 1em 0;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 label {\n  display: inline-block;\n  font-style: italic;\n  padding-right: 0.5em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 select {\n  width: 6em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 input.number {\n  width: 2em;\n  text-align: center;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 input.compname {\n  width: 4em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 input.tabname {\n  width: 6em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 select.auto {\n  width: auto;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table {\n  margin: 0 auto;\n  display: table;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table div.control {\n  display: table-row;\n  height: 2em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table div.control label {\n  display: table-cell;\n  text-align: right;\n  padding-right: 0.5em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table div.control select {\n  display: table-cell;\n}\ndiv.cirsim div.cirsim-dlg-content div.center {\n  text-align: center;\n}\ndiv.cirsim div.cirsim-dlg-content div.indent {\n  margin-left: 20px;\n  margin-right: 20px;\n}\ndiv.cirsim div.cirsim-dlg-content h1 {\n  margin: 0 0 0.5em 0;\n}\ndiv.cirsim div.cirsim-dlg-content p, div.cirsim div.cirsim-dlg-content li {\n  color: #606060;\n}\ndiv.cirsim div.cirsim-dlg-content .gap {\n  margin-top: 1em;\n}\ndiv.cirsim.about {\n  width: 400px;\n  text-align: center;\n}\ndiv.cirsim.about img {\n  width: 171px;\n  height: 75px;\n}\ndiv.cirsim.about div.cirsim-dlg-content {\n  padding: 1em;\n}\ndiv.cirsim.about figure img {\n  box-shadow: none;\n}\ndiv.cirsim.help {\n  width: 500px;\n  height: 600px;\n}\ndiv.cirsim.component a.helper {\n  display: block;\n  position: absolute;\n  right: 0.5em;\n  top: 0.5em;\n  float: right;\n  color: #606060;\n  font-style: italic;\n  text-decoration: underline;\n  cursor: pointer;\n  font-size: 0.85em;\n  padding: 0;\n}\ndiv.cirsim .cirsim-error {\n  color: red;\n}\n\ndiv.cirsim-dialog {\n  padding: 1em;\n  font-size: 0.95em;\n}\n\ndiv.cirsim table {\n  margin-left: auto;\n  margin-right: auto;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.9em;\n}\ndiv.cirsim table th {\n  color: white;\n  background: #18453B;\n  /* #3e9c45; */\n  background: linear-gradient(#18453B, #73d189);\n  text-shadow: rgba(0, 0, 0, 0.4) 0 1px 0;\n  border-right: 1px solid #C1DAD7;\n  border-bottom: 1px solid #C1DAD7;\n  border-top: 1px solid #C1DAD7;\n  letter-spacing: 1px;\n  text-align: left;\n  padding: 2px 6px;\n  font-family: Helvetica, Arial, sans-serif;\n  text-decoration: none;\n  vertical-align: bottom;\n}\ndiv.cirsim table th a:link {\n  color: #F5F3EB;\n}\ndiv.cirsim table th a:visited {\n  color: #E3DCC5;\n}\ndiv.cirsim table th a:hover {\n  color: #ffffff;\n}\ndiv.cirsim table th.width40 {\n  width: 20%;\n}\ndiv.cirsim table th.width40em {\n  width: 40em;\n}\ndiv.cirsim table th.width20em {\n  width: 20em;\n}\ndiv.cirsim table td {\n  border-right: 1px solid #C1DAD7;\n  border-bottom: 1px solid #C1DAD7;\n  background: #ffffff;\n  padding: 0.25em 0.75em;\n  color: #4f6b72;\n}\ndiv.cirsim table td a, div.cirsim table td a:link, div.cirsim table td a:visited, div.cirsim table td a:hover {\n  text-decoration: underline;\n}\ndiv.cirsim table td a:link {\n  color: #8A8A8A;\n}\ndiv.cirsim table td a:visited {\n  color: #B09D5B;\n}\ndiv.cirsim table td a:hover {\n  color: #3366cc;\n}\ndiv.cirsim table.center td, div.cirsim table.center th {\n  text-align: center;\n}\ndiv.cirsim table.truth-table th {\n  color: black;\n  background: white;\n  text-shadow: none;\n  border: none;\n  border-bottom: 1px solid black;\n  text-align: center;\n}\ndiv.cirsim table.truth-table td {\n  border: 0;\n}\ndiv.cirsim table.truth-table th:last-child, div.cirsim table.truth-table td:last-child {\n  border-left: thin solid black;\n}\n\ndiv.cirsim div.tabs {\n  position: absolute;\n  left: 83px;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  font-size: 0.8rem;\n  padding: 0;\n  background: #ddd;\n  border: 0;\n}\ndiv.cirsim div.tabs > ul {\n  margin: 0;\n  padding: 3px 0 0 2px;\n  background: transparent;\n  border: 0;\n  list-style: none;\n}\ndiv.cirsim div.tabs > ul > li {\n  position: relative;\n  display: inline-block;\n  font-size: 0.8rem;\n  padding: 0.25em 1em 0.45em 1em;\n  min-width: 6em;\n  text-align: center;\n  cursor: pointer;\n  background: #ccc;\n  border: 1px solid black;\n  border-bottom: none;\n  border-radius: 5px 5px 0 0;\n  margin: 1px 3px -1px 0;\n  white-space: nowrap;\n  z-index: 18;\n}\ndiv.cirsim div.tabs > ul > li a {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  text-decoration: none;\n  color: black;\n  outline: 0;\n  user-select: none;\n}\ndiv.cirsim div.tabs > ul > li.selected {\n  background: white;\n  z-index: 22;\n}\ndiv.cirsim div.tabs > ul > li.selected a {\n  color: black;\n}\ndiv.cirsim div.tabs div.tab {\n  position: absolute;\n  display: none;\n  left: 0;\n  top: 29px;\n  right: 0;\n  bottom: 0;\n  z-index: 20;\n  overflow: auto;\n}\ndiv.cirsim div.tabs div.tab canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 500px;\n  height: 500px;\n  cursor: pointer;\n}\ndiv.cirsim div.tabs div.tab.selected {\n  display: block;\n  background: white;\n  border-top: 1px solid black;\n}\n\ndiv.cirsim-test-result p.cs-result {\n  text-align: center;\n  color: black;\n}\ndiv.cirsim-test-result p.cs-info {\n  text-align: center;\n  font-size: 0.9em;\n  font-style: italic;\n}", "",{"version":3,"sources":["webpack://./packages/cirsim/src/sass/partials/_toast.scss","webpack://./packages/cirsim/src/sass/modules/_variables.scss","webpack://./packages/cirsim/src/sass/modules/_colors.scss","webpack://./packages/cirsim/src/_cirsim.scss","webpack://./packages/cirsim/src/sass/partials/_menubar.scss","webpack://./packages/cirsim/src/sass/modules/_fonts.scss","webpack://./packages/cirsim/src/sass/partials/_palette.scss","webpack://./packages/cirsim/src/sass/partials/_help.scss","webpack://./packages/cirsim/src/sass/partials/_work.scss","webpack://./packages/cirsim/src/sass/partials/_main.scss","webpack://./packages/cirsim/src/sass/partials/_dialog.scss","webpack://./packages/cirsim/src/sass/partials/_tables.scss","webpack://./packages/cirsim/src/sass/partials/_tabs.scss","webpack://./packages/cirsim/src/sass/partials/_test.scss"],"names":[],"mappings":"AAIE;EACE,kBAAA;EACA,SAAA;EAEA,kBAAA;EACA,4BAAA;EACA,YAAA;EACA,uFAAA;EAEA,2DAAA;EACA,gBCdc;EDed,wBAAA;EACA,WCfU;EDgBV,yBEYe;EFXf,YEYS;EFXT,kBAAA;EACA,4BAAA;EACA,6BAAA;EACA,cAAA;AGLJ;AHQE;EACE,mBAAA;EACA,yBAAA;EACA,8BAAA;EACA,YAAA;AGNJ;;ACvBA;EACE,kBAAA;EACA,YAAA;EACA,SAAA;EACA,SAAA;EACA,UAAA;EACA,yBFgBgB;EEfhB,iCAAA;EACA,iBCPe;AFiCjB;ACxBE;EACE,mBFTW;ACmCf;ACvBE;EACE,iBAAA;EACA,eAAA;ADyBJ;ACvBI;EACE,2DCnBM;EDoBN,iBCnBW;EDoBX,YFEO;EEDP,qBAAA;ADyBN;AClBE;EACE,qBAAA;EACA,SAAA;EACA,SAAA;EACA,UAAA;ADoBJ;AClBI;EACE,wBAAA;EACA,WAAA;EACA,YAAA;EACA,gDAAA;ADoBN;ACjBI;EACE,qBAAA;EACA,SAAA;EACA,SAAA;EACA,gCAAA;EACA,kBAAA;ADmBN;ACjBM;EACE,2DClDI;EDmDJ,iBClDS;EDmDT,YF7BK;EE8BL,qBAAA;ADmBR;ACZI;EACE,kBAAA;EACA,UAAA;EACA,2BAAA;EACA,WAAA;EACA,uFAAA;EAEA,qBAAA;EAEA,kBAAA;EACA,gBAAA;EACA,OAAA;EACA,SAAA;EACA,iBAAA;EACA,yBFpDY;EEqDZ,UAAA;EACA,yBAAA;EACA,mBAAA;ADYN;ACVM;EACE,cAAA;EACA,SAAA;EACA,gBAAA;ADYR;ACVQ;EACE,qBAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;ADYV;ACPQ;EACE,YAAA;ADSV;ACJI;EACE,mBAAA;EACA,UAAA;EACA,YAAA;EACA,yBAAA;EACA,8BAAA;ADMN;ACHI;EACE,UAAA;ADKN;ACFI;EACE,WAAA;ADIN;ACGI;EACE,YAAA;ADDN;ACII;EACE,UAAA;ADFN;ACKI;EACE,WAAA;EACA,qBAAA;EACA,qBAAA;ADHN;;AG/HA;EACE,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,sBAAA;EACA,WAAA;EACA,iBAAA;EACA,6BAAA;EACA,gBAAA;EACA,UAAA;EACA,kBAAA;EACA,kBAAA;EACA,eAAA;EAEA,2BAAA;EACA,yBAAA;EACA,qBAAA;EACA,iBAAA;AHiIF;AG/HE;EACE,kBAAA;EACA,gBAAA;EACA,iCAAA;EACA,mBAAA;EACA,aAAA;AHiIJ;AG/HI;EACE,sBAAA;EAEA,SAAA;EACA,UAAA;EACA,qBAAA;EACA,wBAAA;EACA,gBAAA;AHgIN;AG9HM;EACE,SAAA;EACA,UAAA;EACA,SAAA;EACA,cAAA;AHgIR;AG7HM;EACE,qBAAA;EACA,wBAAA;EACA,gBAAA;EACA,SAAA;EACA,SAAA;AH+HR;AG5HM;EACE,cAAA;EACA,kBAAA;EACA,iBAAA;EACA,UAAA;EACA,SAAA;EACA,kBAAA;EACA,gBAAA;AH8HR;AG3HM;EACE,iBAAA;AH6HR;AGvHE;EACE,kBAAA;EACA,QAAA;EACA,2BAAA;EAEA,SAAA;EACA,UAAA;EACA,qBAAA;EACA,wBAAA;EACA,gBAAA;EACA,iCAAA;AHwHJ;AGtHI;EACE,qBAAA;EACA,wBAAA;EACA,gBAAA;EACA,SAAA;EACA,SAAA;AHwHN;AGrHI;EACE,kBAAA;EACA,iBAAA;EACA,UAAA;EACA,SAAA;EACA,kBAAA;AHuHN;AGpHI;EACE,iBAAA;AHsHN;;AIvNA;EACE,kBAAA;EACA,QAAA;EACA,WAAA;EACA,mBAAA;EACA,YAAA;EACA,YAAA;AJ0NF;;AIvNA;EACE,yBAAA;AJ0NF;;AIvNA;EACE,yBAAA;AJ0NF;;AItNA;EACE,kBAAA;EACA,WAAA;EACA,eAAA;EACA,cAAA;AJyNF;AIvNE;EACE,aAAA;AJyNJ;AItNE;EACE,kBAAA;EACA,gBAAA;EACA,aAAA;AJwNJ;AItNI;EACE,gBAAA;EACA,SAAA;EACA,UAAA;EACA,SAAA;AJwNN;;AInNA;EACE,UAAA;EACA,8BAAA;EACA,+BAAA;EAEA,uBAAA;AJqNF;AIlNE;EACE,sBAAA;EACA,2DAAA;EACA,iBAAA;EACA,yBLnDM;EKoDN,YAAA;EACA,WAAA;EACA,UAAA;EACA,SAAA;EACA,SAAA;EACA,WAAA;EACA,YNxDwB;EMyDxB,aAAA;EACA,mBAAA;EACA,iBAAA;AJoNJ;AIlNI;EACE,YAAA;EACA,SAAA;EACA,uBAAA;EACA,kDAAA;EACA,eAAA;EACA,iBAAA;EACA,iBAAA;AJoNN;AIjNI;EACE,oBAAA;EACA,cAAA;EACA,WN1EsB;EM2EtB,YN3EsB;EM4EtB,UAAA;EACA,SAAA;EACA,SAAA;EACA,gBAAA;EACA,aAAA;AJmNN;AIhNI;EACE,yBAAA;EACA,eAAA;AJkNN;;AK5SA;EACE,kBAAA;EACA,WAAA;EACA,OAAA;EACA,WAAA;EACA,QAAA;EACA,SAAA;EACA,iBAAA;AL+SF;;AMtTA;EACE,aAAA;ANyTF;;AMpTE;EACE,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,gBAAA;EACA,aAAA;EACA,aAAA;EACA,aAAA;ANuTJ;AMpTE;EAEE,mBAAA;EACA,eAAA;EAEA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,gBAAA;ANoTJ;AMjTE;EAEE,mBAAA;EACA,eAAA;EAEA,aAAA;ANiTJ;;AM3SE;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,YR3Ca;EQ4Cb,SAAA;AN8SJ;AM3SE;EACE,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,YRtDa;EQuDb,cAAA;AN6SJ;;AMzSA;EACE,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,iBAAA;AN4SF;;AMzSA;EACE,kBAAA;EACA,SAAA;EACA,SAAA;EACA,UAAA;EACA,iBAAA;EACA,gBAAA;AN4SF;AM1SE;EACE,kBAAA;AN4SJ;AM1SE;EACE,cAAA;AN4SJ;;AMxSA;EACE,kBAAA;EACA,WAAA;EACA,aAAA;EACA,SAAA;EACA,cAAA;EACA,eAAA;EACA,UAAA;EACA,8BAAA;EACA,iBAAA;EACA,iBAAA;EACA,gBAAA;AN2SF;;AMxSA;EACE,aAAA;AN2SF;;AO/YE;EACE,kBAAA;EACA,cAAA;EACA,iBAAA;APkZJ;AOhZI;EACE,YAAA;EACA,sBAAA;EACA,gBAAA;APkZN;AO/YI;EACE,gBAAA;APiZN;AO9YI;EACE,kBAAA;EACA,YAAA;APgZN;AO7YI;EACE,gBAAA;AP+YN;AO5YI;EACE,kBAAA;EACA,SAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;AP8YN;AO3YI;EACE,iBAAA;EACA,kBAAA;EACA,UAAA;EACA,gBAAA;EACA,kBAAA;AP6YN;AOzYI;EACE,kBAAA;EACA,iBAAA;AP2YN;AOzYM;EACE,gBAAA;AP2YR;AOxYM;EACE,cAAA;EACA,kBAAA;EACA,uBAAA;AP0YR;AOvYM;EACE,cAAA;APyYR;AOtYM;EACE,WAAA;APwYR;AOrYM;EACE,qBAAA;APuYR;AOpYM;EACE,WAAA;APsYR;AOnYM;EACE,kBAAA;APqYR;AOlYM;EACE,UAAA;APoYR;AOjYM;EACE,WAAA;APmYR;AOhYM;EACE,WAAA;APkYR;AO/XM;EACE,kBAAA;EACA,WAAA;EACA,OAAA;EACA,QAAA;EACA,kBAAA;EACA,kBAAA;EACA,kBAAA;APiYR;AO9XM;EACE,WAAA;APgYR;AO5XM;EACE,qBAAA;EACA,gBAAA;AP8XR;AOzXI;EACE,iBAAA;AP2XN;AOzXM;EACE,qBAAA;EACA,kBAAA;EACA,oBAAA;AP2XR;AOxXM;EACE,UAAA;AP0XR;AOvXM;EACE,UAAA;EACA,kBAAA;APyXR;AOtXM;EACE,UAAA;APwXR;AOrXM;EACE,UAAA;APuXR;AOpXM;EACE,WAAA;APsXR;AOlXI;EACE,cAAA;EACA,cAAA;APoXN;AOlXM;EACE,kBAAA;EACA,WAAA;APoXR;AOlXQ;EACE,mBAAA;EACA,iBAAA;EACA,oBAAA;APoXV;AOjXQ;EACE,mBAAA;APmXV;AO9WI;EACE,kBAAA;APgXN;AO7WI;EACE,iBAAA;EACA,kBAAA;AP+WN;AO5WI;EACE,mBAAA;AP8WN;AO3WI;EACE,cR1KW;ACuhBjB;AO1WI;EACE,eAAA;AP4WN;AOvWE;EACE,YAAA;EACA,kBAAA;APyWJ;AOvWI;EACE,YAAA;EACA,YAAA;APyWN;AOtWI;EACE,YAAA;APwWN;AOpWM;EACE,gBAAA;APsWR;AOjWE;EACE,YAAA;EACA,aAAA;APmWJ;AO9VI;EACE,cAAA;EACA,kBAAA;EACA,YAAA;EACA,UAAA;EACA,YAAA;EACA,cRpNW;EQqNX,kBAAA;EACA,0BAAA;EACA,eAAA;EACA,iBAAA;EACA,UAAA;APgWN;AO5VE;EACE,UAAA;AP8VJ;;AO1VA;EACE,YAAA;EACA,iBAAA;AP6VF;;AQvkBE;EACE,iBAAA;EACA,kBAAA;EAEA,yBAAA;EACA,iBAAA;EACA,gBAAA;ARykBJ;AQvkBI;EACE,YAAA;EACA,mBAAA;EAAqB,aAAA;EACrB,6CAAA;EACA,uCAAA;EACA,+BAAA;EACA,gCAAA;EACA,6BAAA;EACA,mBAAA;EACA,gBAAA;EACA,gBAAA;EACA,yCAAA;EACA,qBAAA;EACA,sBAAA;AR0kBN;AQxkBM;EACE,cAAA;AR0kBR;AQvkBM;EACE,cAAA;ARykBR;AQtkBM;EACE,cAAA;ARwkBR;AQnkBI;EACE,UAAA;ARqkBN;AQjkBI;EACE,WAAA;ARmkBN;AQhkBI;EACE,WAAA;ARkkBN;AQ/jBI;EACE,+BAAA;EACA,gCAAA;EACA,mBAAA;EACA,sBAAA;EACA,cAAA;ARikBN;AQ/jBM;EACE,0BAAA;ARikBR;AQ9jBM;EACE,cAAA;ARgkBR;AQ7jBM;EACE,cAAA;AR+jBR;AQ5jBM;EACE,cAAA;AR8jBR;AQxjBI;EACE,kBAAA;AR0jBN;AQrjBI;EACE,YAAA;EACA,iBAAA;EACA,iBAAA;EACA,YAAA;EACA,8BAAA;EACA,kBAAA;ARujBN;AQpjBI;EACE,SAAA;ARsjBN;AQnjBI;EACE,6BAAA;ARqjBN;;ASppBE;EACE,kBAAA;EACA,UAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,iBPLa;EOOb,UAAA;EACA,gBVGc;EUFd,SAAA;ATspBJ;ASppBI;EACE,SAAA;EACA,oBAAA;EACA,uBAAA;EACA,SAAA;EACA,gBAAA;ATspBN;ASnpBM;EACE,kBAAA;EACA,qBAAA;EACA,iBPtBS;EOuBT,8BAAA;EACA,cAAA;EACA,kBAAA;EACA,eAAA;EACA,gBVfS;EUgBT,uBAAA;EACA,mBAAA;EACA,0BAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;ATqpBR;ASnpBQ;EACE,2DPrCE;EOsCF,qBAAA;EACA,YVzBC;EU0BD,UAAA;EACA,iBAAA;ATqpBV;ASjpBM;EACE,iBV/BkB;EUgClB,WAAA;ATmpBR;ASjpBQ;EACE,YVlCU;ACqrBpB;AS9oBI;EACE,kBAAA;EACA,aAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,cAAA;ATgpBN;AS9oBM;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;ATgpBR;AS5oBI;EACE,cAAA;EACA,iBAAA;EACA,2BAAA;AT8oBN;;AU9tBE;EACE,kBAAA;EACA,YAAA;AViuBJ;AU9tBE;EACE,kBAAA;EACA,gBAAA;EACA,kBAAA;AVguBJ","sourcesContent":["div.cirsim\r\n{\r\n  $toast-transition-time: 0.4s;\r\n\r\n  div.toast {\r\n    position: absolute;\r\n    bottom: 0;\r\n\r\n    visibility: hidden;\r\n    transform: translateY(2.3em);\r\n    z-index: 400;\r\n    transition: all $toast-transition-time ease-in-out 0s, visibility 0s linear $toast-transition-time, z-index 0s linear 0.01s;\r\n\r\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n    font-size: $toast-font-size;\r\n    left: calc(50% - #{$toast-width}/2);\r\n    width: $toast-width;\r\n    background-color: $toast-background;\r\n    color: $toast-text;\r\n    text-align: center;\r\n    border-top-left-radius: 10px;\r\n    border-top-right-radius: 10px;\r\n    padding: 0.5em;\r\n  }\r\n\r\n  div.toast.toast-active {\r\n    visibility: visible;\r\n    transform: translateY(0%);\r\n    transition-delay: 0s, 0s, $toast-transition-time;\r\n    z-index: 400;\r\n\r\n  }\r\n}","$toast-font-size: 1.1em;\r\n$toast-width: 30em;\r\n\r\n$help-div-width: 325px;\r\n\r\n$docked-help-titlebar-size: 25px;","// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$dark-primary: #00796B;\r\n$primary: #009688;\r\n$light-primary: #B2DFDB;\r\n$accent: #607D8B;\r\n$primary-text: #212121;\r\n$divider-color: #BDBDBD;\r\n$secondary-text: #606060;\r\n\r\n$comp: #c41425;\r\n$window-borders: #aaaaaa;\r\n\r\n\r\n\r\n$tabs-background: #ddd;\r\n$tab-background: #ccc;\r\n$tab-text: black;\r\n$tab-selected-background: white;\r\n$tab-selected-text: black;\r\n\r\n$menu-focus: $dark-primary;\r\n$menu-background: #f0f3f0;\r\n$menu-color: black;\r\n$menu-divider-color: black;\r\n$menu-border-color: #808080;\r\n\r\n$resizer: $dark-primary;\r\n\r\n$toast-background: #151515;\r\n$toast-text: white;","div.cirsim div.toast {\n  position: absolute;\n  bottom: 0;\n  visibility: hidden;\n  transform: translateY(2.3em);\n  z-index: 400;\n  transition: all 0.4s ease-in-out 0s, visibility 0s linear 0.4s, z-index 0s linear 0.01s;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 1.1em;\n  left: calc(50% - 30em/2);\n  width: 30em;\n  background-color: #151515;\n  color: white;\n  text-align: center;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  padding: 0.5em;\n}\ndiv.cirsim div.toast.toast-active {\n  visibility: visible;\n  transform: translateY(0%);\n  transition-delay: 0s, 0s, 0.4s;\n  z-index: 400;\n}\n\ndiv.cirsim nav.menubar {\n  position: relative;\n  z-index: 100;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  background-color: #f0f3f0;\n  border-bottom: thin solid #808080;\n  font-size: 0.9rem;\n}\ndiv.cirsim nav.menubar li:hover {\n  background: #00796B;\n}\ndiv.cirsim nav.menubar li {\n  user-select: none;\n  cursor: pointer;\n}\ndiv.cirsim nav.menubar li a, div.cirsim nav.menubar li a:link, div.cirsim nav.menubar li a:visited {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.9rem;\n  color: black;\n  text-decoration: none;\n}\ndiv.cirsim nav.menubar > ul {\n  list-style-type: none;\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\ndiv.cirsim nav.menubar > ul img.check {\n  vertical-align: baseline;\n  width: 19px;\n  height: 16px;\n  content: url(\"../../img/menu-check.png\");\n}\ndiv.cirsim nav.menubar > ul > li {\n  display: inline-block;\n  margin: 0;\n  border: 0;\n  padding: 0.25em 2em 0.25em 0.5em;\n  position: relative;\n}\ndiv.cirsim nav.menubar > ul > li a, div.cirsim nav.menubar > ul > li a:link, div.cirsim nav.menubar > ul > li a:visited {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.9rem;\n  color: black;\n  text-decoration: none;\n}\ndiv.cirsim nav.menubar > ul ul {\n  visibility: hidden;\n  opacity: 0;\n  transform: translateY(-2em);\n  z-index: -1;\n  transition: all 0.2s ease-in-out 0s, visibility 0s linear 0.2s, z-index 0s linear 0.01s;\n  list-style-type: none;\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  top: 100%;\n  margin: 1px 0 0 0;\n  background-color: #f0f3f0;\n  padding: 0;\n  border: 1px solid #808080;\n  border-top-width: 0;\n}\ndiv.cirsim nav.menubar > ul ul > li {\n  padding: 0 5px;\n  margin: 0;\n  overflow: hidden;\n}\ndiv.cirsim nav.menubar > ul ul > li a {\n  display: inline-block;\n  width: 8em;\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\ndiv.cirsim nav.menubar > ul ul > li.menu-disabled a {\n  opacity: 0.3;\n}\ndiv.cirsim nav.menubar > ul ul.menu-open {\n  visibility: visible;\n  opacity: 1;\n  z-index: 100;\n  transform: translateY(0%);\n  transition-delay: 0s, 0s, 0.2s;\n}\ndiv.cirsim nav.menubar > ul ul.edit-menu a {\n  width: 6em;\n}\ndiv.cirsim nav.menubar > ul ul.option-menu a {\n  width: 11em;\n}\ndiv.cirsim nav.menubar > ul ul.help-menu a {\n  width: 7.5em;\n}\ndiv.cirsim nav.menubar > ul .ul-state-active {\n  color: red;\n}\ndiv.cirsim nav.menubar > ul li.menu-divider {\n  height: 1px;\n  border: 0 solid black;\n  border-top-width: 1px;\n}\n\ndiv.cirsim div.cs-palette {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  box-sizing: border-box;\n  width: 83px;\n  background: white;\n  border-right: 1px solid black;\n  padding: 1em 5px;\n  z-index: 5;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  cursor: pointer;\n  -moz-user-select: -moz-none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\ndiv.cirsim div.cs-palette div.cs-item {\n  position: relative;\n  min-height: 60px;\n  border-bottom: thin solid #dddddd;\n  align-items: center;\n  display: flex;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box {\n  vertical-align: middle;\n  margin: 0;\n  padding: 0;\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box div.cs-img {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  line-height: 0;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box img {\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  margin: 0;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box div.cs-desc {\n  display: block;\n  font-style: normal;\n  font-weight: bold;\n  padding: 0;\n  margin: 0;\n  text-align: center;\n  font-size: 0.8em;\n}\ndiv.cirsim div.cs-palette div.cs-item div.cs-box div.long {\n  font-size: 0.65em;\n}\ndiv.cirsim div.cs-palette figure {\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  margin: 0;\n  padding: 0;\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border-bottom: thin solid #dddddd;\n}\ndiv.cirsim div.cs-palette figure img {\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  margin: 0;\n}\ndiv.cirsim div.cs-palette figure figcaption {\n  font-style: normal;\n  font-weight: bold;\n  padding: 0;\n  margin: 0;\n  text-align: center;\n}\ndiv.cirsim div.cs-palette figure figcaption.long {\n  font-size: 0.65em;\n}\n\n.cirsim-dialog-titlebar {\n  position: absolute;\n  top: 50%;\n  width: 20px;\n  margin: -10px 0 0 0;\n  padding: 1px;\n  height: 20px;\n}\n\n.cirsim-home {\n  right: calc(0.6em + 20px);\n}\n\n.cirsim-back {\n  right: calc(0.9em + 40px);\n}\n\n.cirsim-help {\n  position: relative;\n  width: 100%;\n  max-width: 100%;\n  padding: 0.5em;\n}\n.cirsim-help p:first-child {\n  margin-top: 0;\n}\n.cirsim-help figure {\n  text-align: center;\n  overflow-x: auto;\n  margin: 1em 0;\n}\n.cirsim-help figure img {\n  box-shadow: none;\n  border: 0;\n  padding: 0;\n  margin: 0;\n}\n\n.cirsim .help-div {\n  padding: 0;\n  border-left: 1px solid #aaaaaa;\n  border-right: 1px solid #aaaaaa;\n  background-color: white;\n}\n.cirsim .help-div div.header {\n  box-sizing: border-box;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-weight: bold;\n  background-color: #009688;\n  color: black;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  z-index: 20;\n  height: 25px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n}\n.cirsim .help-div div.header h1 {\n  flex-grow: 1;\n  margin: 0;\n  padding: 4px 4px 0 10px;\n  font-family: \"Trebuchet MS\", Helvetica, sans-serif;\n  font-size: 16px;\n  line-height: 16px;\n  user-select: none;\n}\n.cirsim .help-div div.header button {\n  box-size: border-box;\n  flex: 0 0 25px;\n  width: 25px;\n  height: 25px;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  background: none;\n  outline: none;\n}\n.cirsim .help-div div.header button:hover {\n  background-color: #e81123;\n  cursor: pointer;\n}\n\ndiv.cirsim div.work {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 1.53em;\n  right: 0;\n  bottom: 0;\n  background: black;\n}\n\ndiv.cirsim-install {\n  display: none;\n}\n\ndiv.cirsim .cirsim-overlay {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: #a00;\n  opacity: 0.05;\n  z-index: 2000;\n  display: none;\n}\ndiv.cirsim div.main {\n  line-height: normal;\n  font-size: 1rem;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n}\ndiv.cirsim div.help-div {\n  line-height: normal;\n  font-size: 1rem;\n  display: none;\n}\n\ndiv.cirsim.docked-help .main {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 325px;\n  bottom: 0;\n}\ndiv.cirsim.docked-help .help-div {\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 325px;\n  overflow: auto;\n}\n\ndiv.cirsim-full {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: white;\n}\n\ndiv.cirsim-inline {\n  position: relative;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  background: white;\n  overflow: hidden;\n}\ndiv.cirsim-inline div {\n  text-align: center;\n}\ndiv.cirsim-inline canvas {\n  margin: 0 auto;\n}\n\ndiv.cirsim-window {\n  position: relative;\n  width: 100%;\n  height: 600px;\n  margin: 0;\n  border-left: 0;\n  border-right: 0;\n  padding: 0;\n  border-top: thin solid #aaaaaa;\n  background: white;\n  min-height: 100px;\n  min-width: 800px;\n}\n\ndiv.cirsim.height300 {\n  height: 300px;\n}\n\ndiv.cirsim div.cirsim-dlg-content {\n  position: relative;\n  padding: 0.5em;\n  font-size: 0.95em;\n}\ndiv.cirsim div.cirsim-dlg-content input {\n  padding: 3px;\n  box-sizing: border-box;\n  font-size: 1.1em;\n}\ndiv.cirsim div.cirsim-dlg-content h2 {\n  margin: 0.75em 0;\n}\ndiv.cirsim div.cirsim-dlg-content form {\n  position: relative;\n  height: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content .large {\n  font-size: 1.2em;\n}\ndiv.cirsim div.cirsim-dlg-content fieldset {\n  position: relative;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  min-width: 0;\n  max-width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content p.error {\n  margin: 1em 0 0 0;\n  text-align: center;\n  color: red;\n  font-size: 0.9em;\n  font-style: italic;\n}\ndiv.cirsim div.cirsim-dlg-content div.control {\n  position: relative;\n  margin: 0 0 1em 0;\n}\ndiv.cirsim div.cirsim-dlg-content div.control div.left {\n  text-align: left;\n}\ndiv.cirsim div.cirsim-dlg-content div.control label {\n  display: block;\n  font-style: italic;\n  margin: 0.2em 0 0.1em 0;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input {\n  display: block;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input[type=text], div.cirsim div.cirsim-dlg-content div.control input[type=file] {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input[type=radio] {\n  display: inline-block;\n}\ndiv.cirsim div.cirsim-dlg-content div.control input[type=range] {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control p.selector {\n  text-align: center;\n}\ndiv.cirsim div.cirsim-dlg-content div.control select {\n  width: 6em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control select.auto {\n  width: auto;\n}\ndiv.cirsim div.cirsim-dlg-content div.control select.files {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control div.notice {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 45%;\n  text-align: center;\n  font-style: italic;\n  color: saddlebrown;\n}\ndiv.cirsim div.cirsim-dlg-content div.control textarea {\n  width: 100%;\n}\ndiv.cirsim div.cirsim-dlg-content div.control div.choosers {\n  display: inline-block;\n  text-align: left;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 {\n  margin: 0 0 1em 0;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 label {\n  display: inline-block;\n  font-style: italic;\n  padding-right: 0.5em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 select {\n  width: 6em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 input.number {\n  width: 2em;\n  text-align: center;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 input.compname {\n  width: 4em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 input.tabname {\n  width: 6em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control1 select.auto {\n  width: auto;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table {\n  margin: 0 auto;\n  display: table;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table div.control {\n  display: table-row;\n  height: 2em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table div.control label {\n  display: table-cell;\n  text-align: right;\n  padding-right: 0.5em;\n}\ndiv.cirsim div.cirsim-dlg-content div.control-table div.control select {\n  display: table-cell;\n}\ndiv.cirsim div.cirsim-dlg-content div.center {\n  text-align: center;\n}\ndiv.cirsim div.cirsim-dlg-content div.indent {\n  margin-left: 20px;\n  margin-right: 20px;\n}\ndiv.cirsim div.cirsim-dlg-content h1 {\n  margin: 0 0 0.5em 0;\n}\ndiv.cirsim div.cirsim-dlg-content p, div.cirsim div.cirsim-dlg-content li {\n  color: #606060;\n}\ndiv.cirsim div.cirsim-dlg-content .gap {\n  margin-top: 1em;\n}\ndiv.cirsim.about {\n  width: 400px;\n  text-align: center;\n}\ndiv.cirsim.about img {\n  width: 171px;\n  height: 75px;\n}\ndiv.cirsim.about div.cirsim-dlg-content {\n  padding: 1em;\n}\ndiv.cirsim.about figure img {\n  box-shadow: none;\n}\ndiv.cirsim.help {\n  width: 500px;\n  height: 600px;\n}\ndiv.cirsim.component a.helper {\n  display: block;\n  position: absolute;\n  right: 0.5em;\n  top: 0.5em;\n  float: right;\n  color: #606060;\n  font-style: italic;\n  text-decoration: underline;\n  cursor: pointer;\n  font-size: 0.85em;\n  padding: 0;\n}\ndiv.cirsim .cirsim-error {\n  color: red;\n}\n\ndiv.cirsim-dialog {\n  padding: 1em;\n  font-size: 0.95em;\n}\n\ndiv.cirsim table {\n  margin-left: auto;\n  margin-right: auto;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.9em;\n}\ndiv.cirsim table th {\n  color: white;\n  background: #18453B;\n  /* #3e9c45; */\n  background: linear-gradient(#18453B, #73d189);\n  text-shadow: rgba(0, 0, 0, 0.4) 0 1px 0;\n  border-right: 1px solid #C1DAD7;\n  border-bottom: 1px solid #C1DAD7;\n  border-top: 1px solid #C1DAD7;\n  letter-spacing: 1px;\n  text-align: left;\n  padding: 2px 6px;\n  font-family: Helvetica, Arial, sans-serif;\n  text-decoration: none;\n  vertical-align: bottom;\n}\ndiv.cirsim table th a:link {\n  color: #F5F3EB;\n}\ndiv.cirsim table th a:visited {\n  color: #E3DCC5;\n}\ndiv.cirsim table th a:hover {\n  color: #ffffff;\n}\ndiv.cirsim table th.width40 {\n  width: 20%;\n}\ndiv.cirsim table th.width40em {\n  width: 40em;\n}\ndiv.cirsim table th.width20em {\n  width: 20em;\n}\ndiv.cirsim table td {\n  border-right: 1px solid #C1DAD7;\n  border-bottom: 1px solid #C1DAD7;\n  background: #ffffff;\n  padding: 0.25em 0.75em;\n  color: #4f6b72;\n}\ndiv.cirsim table td a, div.cirsim table td a:link, div.cirsim table td a:visited, div.cirsim table td a:hover {\n  text-decoration: underline;\n}\ndiv.cirsim table td a:link {\n  color: #8A8A8A;\n}\ndiv.cirsim table td a:visited {\n  color: #B09D5B;\n}\ndiv.cirsim table td a:hover {\n  color: #3366cc;\n}\ndiv.cirsim table.center td, div.cirsim table.center th {\n  text-align: center;\n}\ndiv.cirsim table.truth-table th {\n  color: black;\n  background: white;\n  text-shadow: none;\n  border: none;\n  border-bottom: 1px solid black;\n  text-align: center;\n}\ndiv.cirsim table.truth-table td {\n  border: 0;\n}\ndiv.cirsim table.truth-table th:last-child, div.cirsim table.truth-table td:last-child {\n  border-left: thin solid black;\n}\n\ndiv.cirsim div.tabs {\n  position: absolute;\n  left: 83px;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  font-size: 0.8rem;\n  padding: 0;\n  background: #ddd;\n  border: 0;\n}\ndiv.cirsim div.tabs > ul {\n  margin: 0;\n  padding: 3px 0 0 2px;\n  background: transparent;\n  border: 0;\n  list-style: none;\n}\ndiv.cirsim div.tabs > ul > li {\n  position: relative;\n  display: inline-block;\n  font-size: 0.8rem;\n  padding: 0.25em 1em 0.45em 1em;\n  min-width: 6em;\n  text-align: center;\n  cursor: pointer;\n  background: #ccc;\n  border: 1px solid black;\n  border-bottom: none;\n  border-radius: 5px 5px 0 0;\n  margin: 1px 3px -1px 0;\n  white-space: nowrap;\n  z-index: 18;\n}\ndiv.cirsim div.tabs > ul > li a {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  text-decoration: none;\n  color: black;\n  outline: 0;\n  user-select: none;\n}\ndiv.cirsim div.tabs > ul > li.selected {\n  background: white;\n  z-index: 22;\n}\ndiv.cirsim div.tabs > ul > li.selected a {\n  color: black;\n}\ndiv.cirsim div.tabs div.tab {\n  position: absolute;\n  display: none;\n  left: 0;\n  top: 29px;\n  right: 0;\n  bottom: 0;\n  z-index: 20;\n  overflow: auto;\n}\ndiv.cirsim div.tabs div.tab canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 500px;\n  height: 500px;\n  cursor: pointer;\n}\ndiv.cirsim div.tabs div.tab.selected {\n  display: block;\n  background: white;\n  border-top: 1px solid black;\n}\n\ndiv.cirsim-test-result p.cs-result {\n  text-align: center;\n  color: black;\n}\ndiv.cirsim-test-result p.cs-info {\n  text-align: center;\n  font-size: 0.9em;\n  font-style: italic;\n}","div.cirsim nav.menubar {\r\n  position: relative;\r\n  z-index: 100;\r\n  margin: 0;\r\n  border: 0;\r\n  padding: 0;\r\n  background-color: $menu-background;\r\n  border-bottom: thin solid #808080;\r\n  font-size: $menu-font-size;\r\n\r\n  li:hover {\r\n    background: $menu-focus;\r\n  }\r\n\r\n  li {\r\n    user-select: none;\r\n    cursor: pointer;\r\n\r\n    a, a:link, a:visited {\r\n      font-family: $menu-font;\r\n      font-size: $menu-font-size;\r\n      color: $menu-color;\r\n      text-decoration: none;\r\n    }\r\n  }\r\n\r\n  //\r\n  // Top level menu\r\n  //\r\n  > ul {\r\n    list-style-type: none;\r\n    margin: 0;\r\n    border: 0;\r\n    padding: 0;\r\n\r\n    img.check {\r\n      vertical-align: baseline;\r\n      width: 19px;\r\n      height: 16px;\r\n      content: url(\"../../img/menu-check.png\");\r\n    }\r\n\r\n    > li {\r\n      display: inline-block;\r\n      margin: 0;\r\n      border: 0;\r\n      padding: 0.25em 2em 0.25em 0.5em;\r\n      position: relative;\r\n\r\n      a, a:link, a:visited {\r\n        font-family: $menu-font;\r\n        font-size: $menu-font-size;\r\n        color: $menu-color;\r\n        text-decoration: none;\r\n      }\r\n    }\r\n\r\n    //\r\n    // Drop-down menu\r\n    //\r\n    ul {\r\n      visibility: hidden;\r\n      opacity: 0;\r\n      transform: translateY(-2em);\r\n      z-index: -1;\r\n      transition: all 0.2s ease-in-out 0s, visibility 0s linear 0.2s, z-index 0s linear 0.01s;\r\n\r\n      list-style-type: none;\r\n      // display: none;\r\n      position: absolute;\r\n      overflow: hidden;\r\n      left: 0;\r\n      top: 100%;\r\n      margin: 1px 0 0 0;\r\n      background-color: $menu-background;\r\n      padding: 0;\r\n      border: 1px solid $menu-border-color;\r\n      border-top-width: 0;\r\n\r\n      > li {\r\n        padding: 0 5px;\r\n        margin: 0;\r\n        overflow: hidden;\r\n\r\n        a {\r\n          display: inline-block;\r\n          width: 8em;\r\n          padding-top: 5px;\r\n          padding-bottom: 5px;\r\n        }\r\n      }\r\n\r\n      > li.menu-disabled {\r\n        a {\r\n          opacity: 0.3;\r\n        }\r\n      }\r\n    }\r\n\r\n    ul.menu-open {\r\n      visibility: visible;\r\n      opacity: 1;\r\n      z-index: 100;\r\n      transform: translateY(0%);\r\n      transition-delay: 0s, 0s, 0.2s;\r\n    }\r\n\r\n    ul.edit-menu a {\r\n      width: 6em;\r\n    }\r\n\r\n    ul.option-menu a {\r\n      width: 11em;\r\n    }\r\n\r\n    //ul.file-menu a {\r\n    //  width: 6em;\r\n    //}\r\n\r\n    ul.help-menu a {\r\n      width: 7.5em;\r\n    }\r\n\r\n    .ul-state-active {\r\n      color: red;\r\n    }\r\n\r\n    li.menu-divider {\r\n      height: 1px;\r\n      border: 0 solid $menu-divider-color;\r\n      border-top-width: 1px;\r\n    }\r\n  }\r\n}\r\n","$menu-font: \"Helvetica Neue\",Helvetica,Arial,sans-serif;\r\n$menu-font-size: 0.90rem;\r\n\r\n$tabs-font: \"Helvetica Neue\",Helvetica,Arial,sans-serif;\r\n$tabs-font-size: 0.80rem;","div.cirsim div.cs-palette {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  box-sizing: border-box;\r\n  width: 83px;\r\n  background: white;\r\n  border-right: 1px solid black;\r\n  padding: 1em 5px;\r\n  z-index: 5;\r\n  overflow-y: scroll;\r\n  overflow-x: hidden;\r\n  cursor: pointer;\r\n\r\n  -moz-user-select: -moz-none;\r\n  -webkit-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n\r\n  div.cs-item {\r\n    position: relative;\r\n    min-height: 60px;\r\n    border-bottom: thin solid #dddddd;\r\n    align-items: center;\r\n    display: flex;\r\n\r\n    div.cs-box {\r\n      vertical-align: middle;\r\n\r\n      margin: 0;\r\n      padding: 0;\r\n      -moz-box-shadow: none;\r\n      -webkit-box-shadow: none;\r\n      box-shadow: none;\r\n\r\n      div.cs-img {\r\n        margin: 0;\r\n        padding: 0;\r\n        border: 0;\r\n        line-height: 0;\r\n      }\r\n\r\n      img {\r\n        -moz-box-shadow: none;\r\n        -webkit-box-shadow: none;\r\n        box-shadow: none;\r\n        border: 0;\r\n        margin: 0;\r\n      }\r\n\r\n      div.cs-desc {\r\n        display: block;\r\n        font-style: normal;\r\n        font-weight: bold;\r\n        padding: 0;\r\n        margin: 0;\r\n        text-align: center;\r\n        font-size: 0.80em;\r\n      }\r\n\r\n      div.long {\r\n        font-size: 0.65em;\r\n      }\r\n\r\n    }\r\n  }\r\n\r\n  figure {\r\n    position: relative;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n\r\n    margin: 0;\r\n    padding: 0;\r\n    -moz-box-shadow: none;\r\n    -webkit-box-shadow: none;\r\n    box-shadow: none;\r\n    border-bottom: thin solid #dddddd;\r\n\r\n    img {\r\n      -moz-box-shadow: none;\r\n      -webkit-box-shadow: none;\r\n      box-shadow: none;\r\n      border: 0;\r\n      margin: 0;\r\n    }\r\n\r\n    figcaption {\r\n      font-style: normal;\r\n      font-weight: bold;\r\n      padding: 0;\r\n      margin: 0;\r\n      text-align: center;\r\n    }\r\n\r\n    figcaption.long {\r\n      font-size: 0.65em;\r\n    }\r\n  }\r\n}\r\n\r\n",".cirsim-dialog-titlebar {\r\n  position: absolute;\r\n  top: 50%;\r\n  width: 20px;\r\n  margin: -10px 0 0 0;\r\n  padding: 1px;\r\n  height: 20px;\r\n}\r\n\r\n.cirsim-home {\r\n  right: calc(0.6em + 20px);\r\n}\r\n\r\n.cirsim-back {\r\n  right: calc(0.9em + 40px);\r\n\r\n}\r\n\r\n.cirsim-help {\r\n  position: relative;\r\n  width: 100%;\r\n  max-width: 100%;\r\n  padding: 0.5em;\r\n\r\n  p:first-child {\r\n    margin-top: 0;\r\n  }\r\n\r\n  figure {\r\n    text-align: center;\r\n    overflow-x: auto;\r\n    margin: 1em 0;\r\n\r\n    img {\r\n      box-shadow: none;\r\n      border: 0;\r\n      padding: 0;\r\n      margin: 0;\r\n    }\r\n  }\r\n}\r\n\r\n.cirsim .help-div {\r\n  padding: 0;\r\n  border-left: 1px solid $window-borders;\r\n  border-right: 1px solid $window-borders;\r\n\r\n  background-color: white;\r\n\r\n\r\n  div.header {\r\n    box-sizing: border-box;\r\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n    font-weight: bold;\r\n    background-color: $primary;\r\n    color: black;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    border: 0;\r\n    z-index: 20;\r\n    height: $docked-help-titlebar-size;\r\n    display: flex;\r\n    flex-direction: row;\r\n    flex-wrap: nowrap;\r\n\r\n    h1 {\r\n      flex-grow: 1;\r\n      margin: 0;\r\n      padding: 4px 4px 0 10px;\r\n      font-family: \"Trebuchet MS\", Helvetica, sans-serif;\r\n      font-size: 16px;\r\n      line-height: 16px;\r\n      user-select: none;\r\n    }\r\n\r\n    button {\r\n      box-size: border-box;\r\n      flex: 0 0 $docked-help-titlebar-size;\r\n      width: $docked-help-titlebar-size;\r\n      height: $docked-help-titlebar-size;\r\n      padding: 0;\r\n      margin: 0;\r\n      border: 0;\r\n      background: none;\r\n      outline: none;\r\n    }\r\n\r\n    button:hover {\r\n      background-color: #e81123;\r\n      cursor: pointer;\r\n    }\r\n  }\r\n}\r\n","div.cirsim div.work {\r\n  position: absolute;\r\n  width: 100%;\r\n  left: 0;\r\n  top: 1.53em;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: black;\r\n}\r\n\r\n","div.cirsim-install {\r\n  display: none;\r\n}\r\n\r\ndiv.cirsim {\r\n\r\n  .cirsim-overlay {\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    background: #a00;\r\n    opacity: 0.05;\r\n    z-index: 2000;\r\n    display: none;\r\n  }\r\n\r\n  div.main {\r\n    // Normalizations\r\n    line-height: normal;\r\n    font-size: 1rem;\r\n\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    overflow: hidden;\r\n  }\r\n\r\n  div.help-div {\r\n    // Normalizations\r\n    line-height: normal;\r\n    font-size: 1rem;\r\n\r\n    display: none;\r\n  }\r\n\r\n}\r\n\r\ndiv.cirsim.docked-help {\r\n  .main {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: $help-div-width;\r\n    bottom: 0;\r\n  }\r\n\r\n  .help-div {\r\n    display: block;\r\n    box-sizing: border-box;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    width: $help-div-width;\r\n    overflow: auto;\r\n  }\r\n}\r\n\r\ndiv.cirsim-full {\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  background: white;\r\n}\r\n\r\ndiv.cirsim-inline {\r\n  position: relative;\r\n  margin: 0;\r\n  border: 0;\r\n  padding: 0;\r\n  background: white;\r\n  overflow: hidden;\r\n\r\n  div {\r\n    text-align: center;\r\n  }\r\n  canvas {\r\n    margin: 0 auto;\r\n  }\r\n}\r\n\r\ndiv.cirsim-window {\r\n  position: relative;\r\n  width: 100%;\r\n  height: 600px;\r\n  margin: 0;\r\n  border-left: 0;\r\n  border-right: 0;\r\n  padding: 0;\r\n  border-top: thin solid $window-borders;\r\n  background: white;\r\n  min-height: 100px;\r\n  min-width: 800px;\r\n}\r\n\r\ndiv.cirsim.height300 {\r\n  height: 300px;\r\n}\r\n\r\n\r\n","div.cirsim {\r\n\r\n  div.cirsim-dlg-content{\r\n    position: relative;\r\n    padding: 0.5em;\r\n    font-size: 0.95em;\r\n\r\n    input {\r\n      padding: 3px;\r\n      box-sizing: border-box;\r\n      font-size: 1.1em;\r\n    }\r\n\r\n    h2 {\r\n      margin: 0.75em 0;\r\n    }\r\n\r\n    form {\r\n      position: relative;\r\n      height: 100%;\r\n    }\r\n\r\n    .large {\r\n      font-size: 1.2em;\r\n    }\r\n\r\n    fieldset {\r\n      position: relative;\r\n      border: 0;\r\n      margin: 0;\r\n      padding: 0;\r\n      height: 100%;\r\n      min-width: 0;\r\n      max-width: 100%;\r\n    }\r\n\r\n    p.error {\r\n      margin: 1em 0 0 0;\r\n      text-align: center;\r\n      color: red;\r\n      font-size: 0.9em;\r\n      font-style: italic;\r\n    }\r\n\r\n    // Standard controls with label on top\r\n    div.control {\r\n      position: relative;\r\n      margin: 0 0 1em 0;\r\n\r\n      div.left {\r\n        text-align: left;\r\n      }\r\n\r\n      label {\r\n        display: block;\r\n        font-style: italic;\r\n        margin: 0.2em 0 0.1em 0;\r\n      }\r\n\r\n      input {\r\n        display: block;\r\n      }\r\n\r\n      input[type=text], input[type=file] {\r\n        width: 100%;\r\n      }\r\n\r\n      input[type=radio] {\r\n        display: inline-block;\r\n      }\r\n\r\n      input[type=range] {\r\n        width: 100%;\r\n      }\r\n\r\n      p.selector {\r\n        text-align: center;\r\n      }\r\n\r\n      select {\r\n        width: 6em;\r\n      }\r\n\r\n      select.auto {\r\n        width: auto;\r\n      }\r\n\r\n      select.files {\r\n        width: 100%;\r\n      }\r\n\r\n      div.notice {\r\n        position: absolute;\r\n        width: 100%;\r\n        left: 0;\r\n        top: 45%;\r\n        text-align: center;\r\n        font-style: italic;\r\n        color: saddlebrown;\r\n      }\r\n\r\n      textarea {\r\n        width: 100%;\r\n      }\r\n\r\n      // Items that left align like radio buttons or checkboxes\r\n      div.choosers {\r\n        display: inline-block;\r\n        text-align: left;\r\n      }\r\n    }\r\n\r\n    // Controls with label to the left\r\n    div.control1 {\r\n      margin: 0 0 1em 0;\r\n\r\n      label {\r\n        display: inline-block;\r\n        font-style: italic;\r\n        padding-right: 0.5em;\r\n      }\r\n\r\n      select {\r\n        width: 6em;\r\n      }\r\n\r\n      input.number {\r\n        width: 2em;\r\n        text-align: center;\r\n      }\r\n\r\n      input.compname {\r\n        width: 4em;\r\n      }\r\n\r\n      input.tabname {\r\n        width: 6em;\r\n      }\r\n\r\n      select.auto {\r\n        width: auto;\r\n      }\r\n    }\r\n\r\n    div.control-table {\r\n      margin: 0 auto;\r\n      display: table;\r\n\r\n      div.control {\r\n        display: table-row;\r\n        height: 2em;\r\n\r\n        label {\r\n          display: table-cell;\r\n          text-align: right;\r\n          padding-right: 0.5em;\r\n        }\r\n\r\n        select {\r\n          display: table-cell;\r\n        }\r\n      }\r\n    }\r\n\r\n    div.center {\r\n      text-align: center;\r\n    }\r\n\r\n    div.indent {\r\n      margin-left: 20px;\r\n      margin-right: 20px;\r\n    }\r\n\r\n    h1 {\r\n      margin: 0 0 0.5em 0;\r\n    }\r\n\r\n    p, li {\r\n      color: $secondary-text;\r\n    }\r\n\r\n    .gap {\r\n      margin-top: 1em;\r\n    }\r\n  }\r\n\r\n\r\n  &.about {\r\n    width: 400px;\r\n    text-align: center;\r\n\r\n    img {\r\n      width: 171px;\r\n      height: 75px;\r\n    }\r\n\r\n    div.cirsim-dlg-content {\r\n      padding: 1em;\r\n    }\r\n\r\n    figure {\r\n      img {\r\n        box-shadow: none;\r\n      }\r\n    }\r\n  }\r\n\r\n  &.help {\r\n    width: 500px;\r\n    height: 600px;\r\n  }\r\n\r\n  &.component {\r\n\r\n    a.helper {\r\n      display: block;\r\n      position: absolute;\r\n      right: 0.5em;\r\n      top: 0.5em;\r\n      float: right;\r\n      color: $secondary-text;\r\n      font-style: italic;\r\n      text-decoration: underline;\r\n      cursor: pointer;\r\n      font-size: 0.85em;\r\n      padding: 0;\r\n    }\r\n  }\r\n\r\n  .cirsim-error {\r\n    color: red;\r\n  }\r\n}\r\n\r\ndiv.cirsim-dialog {\r\n  padding: 1em;\r\n  font-size: 0.95em;\r\n}","\r\ndiv.cirsim {\r\n  table {\r\n    margin-left:auto;\r\n    margin-right:auto;\r\n\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    font-size: 0.9em;\r\n\r\n    th {\r\n      color: white;\r\n      background: #18453B; /* #3e9c45; */\r\n      background: linear-gradient(#18453B, #73d189);\r\n      text-shadow: rgba(0,0,0,.4) 0 1px 0;\r\n      border-right: 1px solid #C1DAD7;\r\n      border-bottom: 1px solid #C1DAD7;\r\n      border-top: 1px solid #C1DAD7;\r\n      letter-spacing: 1px;\r\n      text-align: left;\r\n      padding: 2px 6px;\r\n      font-family: Helvetica, Arial, sans-serif;\r\n      text-decoration: none;\r\n      vertical-align: bottom;\r\n\r\n      a:link {\r\n        color: #F5F3EB;\r\n      }\r\n\r\n      a:visited {\r\n        color: #E3DCC5;\r\n      }\r\n\r\n      a:hover {\r\n        color: #ffffff;\r\n      }\r\n\r\n    }\r\n\r\n    th.width40 {\r\n      width: 20%;\r\n    }\r\n\r\n\r\n    th.width40em {\r\n      width: 40em;\r\n    }\r\n\r\n    th.width20em {\r\n      width: 20em;\r\n    }\r\n\r\n    td {\r\n      border-right: 1px solid #C1DAD7;\r\n      border-bottom: 1px solid #C1DAD7;\r\n      background: #ffffff;\r\n      padding: 0.25em 0.75em;\r\n      color: #4f6b72;\r\n\r\n      a, a:link, a:visited, a:hover {\r\n        text-decoration:underline;\r\n      }\r\n\r\n      a:link {\r\n        color:#8A8A8A;\r\n      }\r\n\r\n      a:visited {\r\n        color:#B09D5B;\r\n      }\r\n\r\n      a:hover {\r\n        color:#3366cc;\r\n      }\r\n    }\r\n  }\r\n\r\n  table.center {\r\n    td, th {\r\n      text-align: center;\r\n    }\r\n  }\r\n\r\n  table.truth-table {\r\n    th {\r\n      color: black;\r\n      background: white;\r\n      text-shadow: none;\r\n      border: none;\r\n      border-bottom: 1px solid black;\r\n      text-align: center;\r\n    }\r\n\r\n    td {\r\n      border: 0;\r\n    }\r\n\r\n    th:last-child, td:last-child {\r\n      border-left: thin solid black;\r\n    }\r\n  }\r\n}\r\n","$tab-corner-radius: 5px;\r\n\r\ndiv.cirsim {\r\n  div.tabs {\r\n    position: absolute;\r\n    left: 83px;\r\n    top: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    font-size: $tabs-font-size;\r\n\r\n    padding: 0;\r\n    background: $tabs-background;\r\n    border: 0;\r\n\r\n    >ul {\r\n      margin: 0;\r\n      padding: 3px 0 0 2px;\r\n      background: transparent;\r\n      border: 0;\r\n      list-style: none;\r\n\r\n\r\n      >li {\r\n        position: relative;\r\n        display: inline-block;\r\n        font-size: $tabs-font-size;\r\n        padding: 0.25em 1em 0.45em 1em;\r\n        min-width: 6em;\r\n        text-align: center;\r\n        cursor: pointer;\r\n        background: $tab-background;\r\n        border: 1px solid black;\r\n        border-bottom: none;\r\n        border-radius: $tab-corner-radius $tab-corner-radius 0 0;\r\n        margin: 1px 3px -1px 0;\r\n        white-space: nowrap;\r\n        z-index: 18;\r\n\r\n        a {\r\n          font-family: $tabs-font;\r\n          text-decoration: none;\r\n          color: $tab-text;\r\n          outline: 0;\r\n          user-select: none;\r\n        }\r\n      }\r\n\r\n      >li.selected {\r\n        background: $tab-selected-background;\r\n        z-index: 22;\r\n\r\n        a {\r\n          color: $tab-selected-text;\r\n        }\r\n      }\r\n    }\r\n\r\n    div.tab {\r\n      position: absolute;\r\n      display: none;\r\n      left: 0;\r\n      top: 29px;\r\n      right: 0;\r\n      bottom: 0;\r\n      z-index: 20;\r\n      overflow: auto;\r\n\r\n      canvas {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        width: 500px;\r\n        height: 500px;\r\n        cursor: pointer;\r\n      }\r\n    }\r\n\r\n    div.tab.selected {\r\n      display: block;\r\n      background: white;\r\n      border-top: 1px solid black;\r\n    }\r\n\r\n  }\r\n\r\n}","div.cirsim-test-result {\r\n  p.cs-result {\r\n    text-align: center;\r\n    color: black;\r\n  }\r\n\r\n  p.cs-info {\r\n    text-align: center;\r\n    font-size: 0.9em;\r\n    font-style: italic;\r\n  }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/cirsim/_cirsim.scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/cirsim/_cirsim.scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/api.js */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div.cl-cirsim {\n  display: none;\n}\n\ndiv.cl-cirsim-gap-before, div.cl-cirsim-gap-after {\n  margin-top: 0;\n  margin-bottom: 0;\n  height: 1px;\n}\n\ndiv.cl-cirsim-gap-after {\n  height: 1em;\n}", "",{"version":3,"sources":["webpack://./vendor/cl/cirsim/_cirsim.scss"],"names":[],"mappings":"AAAA;EACE,aAAA;AACF;;AAEA;EACE,aAAA;EACA,gBAAA;EACA,WAAA;AACF;;AAEA;EACE,WAAA;AACF","sourcesContent":["div.cl-cirsim {\r\n  display: none;\r\n}\r\n\r\ndiv.cl-cirsim-gap-before, div.cl-cirsim-gap-after {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  height: 1px;\r\n}\r\n\r\ndiv.cl-cirsim-gap-after {\r\n  height: 1em;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./packages/cirsim/src/_cirsim.scss":
/*!******************************************!*\
  !*** ./packages/cirsim/src/_cirsim.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../.yarn/$$virtual/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-ffc3054882.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./.yarn/$$virtual/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-ffc3054882.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_cirsim_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!../../../.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!../../../.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./_cirsim.scss */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./packages/cirsim/src/_cirsim.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_cirsim_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_cirsim_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./vendor/cl/cirsim/_cirsim.scss":
/*!***************************************!*\
  !*** ./vendor/cl/cirsim/_cirsim.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../.yarn/$$virtual/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-ffc3054882.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./.yarn/$$virtual/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-ffc3054882.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_cirsim_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!../../../.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!../../../.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./_cirsim.scss */ "./.yarn/$$virtual/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-b9e5a32246.zip/node_modules/css-loader/dist/cjs.js!./.yarn/$$virtual/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-04e9f91dc8.zip/node_modules/resolve-url-loader/index.js!./.yarn/$$virtual/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-75f523e64c.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./vendor/cl/cirsim/_cirsim.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _yarn_$$virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_ffc3054882_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_cirsim_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_$$virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_b9e5a32246_zip_node_modules_css_loader_dist_cjs_js_yarn_$$virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_04e9f91dc8_zip_node_modules_resolve_url_loader_index_js_yarn_$$virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_75f523e64c_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_cirsim_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./packages/cirsim/src/img/menu-check.png":
/*!************************************************!*\
  !*** ./packages/cirsim/src/img/menu-check.png ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAOCAYAAADNGCeJAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAVdJREFUOI2V0bFrU1EUB+DvRWNsIJNQu6t1E8ykuDgKBQlIFwdHkQ7+AwU7url0FMQ5cXFwsoMguIhSqoPtJA51EHGohedQfg55SV9jaeKFw71wDt89hyOJesx60u83srR0LlwKvdArJoGiKKZDq6vzBoOunZ1ruIgfGPwXlm73lIODW7a3l5XlIn7hNfrYNcuY2duTXm8uPAgfQj/cD4uhGQRTsezvy8pKJzwMX8KzcCGcHiGHGHPhSlgIRZrNVjY3h1BZytpap+roU3ga5v9Bxj8PkRdhN7wLd8LltNvtrK93wt3wMQzC+WORGiYU4XrYCl8r9F64HTbC+3CzqjseqmGjOBOehO/hW3hZ4Y9D60RovICjYCM8Cj8r9HO4OhUaY6M4BFvhTfgd3oaz49zE9uvRmJBHrz/YQInn1V3Pz9DZ0Q674VW17aldJTmhYDjajVmhJP4Cy1ZU6+dCg3AAAAAASUVORK5CYII=");

/***/ }),

/***/ "./.yarn/cache/buckets-js-npm-1.98.2-f05b27b0c5-bfc27d387a.zip/node_modules/buckets-js/dist/buckets.min.js":
/*!*****************************************************************************************************************!*\
  !*** ./.yarn/cache/buckets-js-npm-1.98.2-f05b27b0c5-bfc27d387a.zip/node_modules/buckets-js/dist/buckets.min.js ***!
  \*****************************************************************************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! buckets - version: 1.98.2 - (c) 2013 - 2016 Mauricio Santos - https://github.com/mauriciosantos/Buckets-JS*/
!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(this,function(){"use strict";var a={};return a.defaultCompare=function(a,b){return a<b?-1:a===b?0:1},a.defaultEquals=function(a,b){return a===b},a.defaultToString=function(b){return null===b?"BUCKETS_NULL":a.isUndefined(b)?"BUCKETS_UNDEFINED":a.isString(b)?b:b.toString()},a.isFunction=function(a){return"function"==typeof a},a.isUndefined=function(a){return void 0===a},a.isString=function(a){return"[object String]"===Object.prototype.toString.call(a)},a.reverseCompareFunction=function(b){return a.isFunction(b)?function(a,c){return b(a,c)*-1}:function(a,b){return a<b?1:a===b?0:-1}},a.compareToEquals=function(a){return function(b,c){return 0===a(b,c)}},a.arrays={},a.arrays.indexOf=function(b,c,d){var e,f=d||a.defaultEquals,g=b.length;for(e=0;e<g;e+=1)if(f(b[e],c))return e;return-1},a.arrays.lastIndexOf=function(b,c,d){var e,f=d||a.defaultEquals,g=b.length;for(e=g-1;e>=0;e-=1)if(f(b[e],c))return e;return-1},a.arrays.contains=function(b,c,d){return a.arrays.indexOf(b,c,d)>=0},a.arrays.remove=function(b,c,d){var e=a.arrays.indexOf(b,c,d);return!(e<0)&&(b.splice(e,1),!0)},a.arrays.frequency=function(b,c,d){var e,f=d||a.defaultEquals,g=b.length,h=0;for(e=0;e<g;e+=1)f(b[e],c)&&(h+=1);return h},a.arrays.equals=function(b,c,d){var e,f=d||a.defaultEquals,g=b.length;if(b.length!==c.length)return!1;for(e=0;e<g;e+=1)if(!f(b[e],c[e]))return!1;return!0},a.arrays.copy=function(a){return a.concat()},a.arrays.swap=function(a,b,c){var d;return!(b<0||b>=a.length||c<0||c>=a.length)&&(d=a[b],a[b]=a[c],a[c]=d,!0)},a.arrays.forEach=function(a,b){var c,d=a.length;for(c=0;c<d;c+=1)if(b(a[c])===!1)return},a.Bag=function(b){var c={},d=b||a.defaultToString,e=new a.Dictionary(d),f=0;return c.add=function(b,d){var g;return(isNaN(d)||a.isUndefined(d))&&(d=1),!(a.isUndefined(b)||d<=0)&&(c.contains(b)?e.get(b).copies+=d:(g={value:b,copies:d},e.set(b,g)),f+=d,!0)},c.count=function(a){return c.contains(a)?e.get(a).copies:0},c.contains=function(a){return e.containsKey(a)},c.remove=function(b,d){var g;return(isNaN(d)||a.isUndefined(d))&&(d=1),!(a.isUndefined(b)||d<=0)&&(!!c.contains(b)&&(g=e.get(b),f-=d>g.copies?g.copies:d,g.copies-=d,g.copies<=0&&e.remove(b),!0))},c.toArray=function(){var a,b,c,d,f,g=[],h=e.values(),i=h.length;for(d=0;d<i;d+=1)for(a=h[d],b=a.value,c=a.copies,f=0;f<c;f+=1)g.push(b);return g},c.toSet=function(){var b,c=new a.Set(d),f=e.values(),g=f.length;for(b=0;b<g;b+=1)c.add(f[b].value);return c},c.forEach=function(a){e.forEach(function(b,c){var d,e=c.value,f=c.copies;for(d=0;d<f;d+=1)if(a(e)===!1)return!1;return!0})},c.size=function(){return f},c.isEmpty=function(){return 0===f},c.clear=function(){f=0,e.clear()},c.equals=function(b){var d;return!a.isUndefined(b)&&"function"==typeof b.toSet&&(c.size()===b.size()&&(d=!0,b.forEach(function(a){return d=c.count(a)===b.count(a)}),d))},c},a.BSTree=function(b){function c(a,b){for(var c,d=a;void 0!==d&&0!==c;)c=g(b,d.element),c<0?d=d.leftCh:c>0&&(d=d.rightCh);return d}function d(a){for(var b=a;void 0!==b.leftCh;)b=b.leftCh;return b}var e,f={},g=b||a.defaultCompare,h=0;return f.add=function(b){function c(a){for(var b,c,d=e;void 0!==d;){if(c=g(a.element,d.element),0===c)return;c<0?(b=d,d=d.leftCh):(b=d,d=d.rightCh)}return a.parent=b,void 0===b?e=a:g(a.element,b.element)<0?b.leftCh=a:b.rightCh=a,a}if(a.isUndefined(b))return!1;var d={element:b,leftCh:void 0,rightCh:void 0,parent:void 0};return void 0!==c(d)&&(h+=1,!0)},f.clear=function(){e=void 0,h=0},f.isEmpty=function(){return 0===h},f.size=function(){return h},f.contains=function(b){return!a.isUndefined(b)&&void 0!==c(e,b)},f.remove=function(a){function b(a,b){void 0===a.parent?e=b:a===a.parent.leftCh?a.parent.leftCh=b:a.parent.rightCh=b,void 0!==b&&(b.parent=a.parent)}function f(a){if(void 0===a.leftCh)b(a,a.rightCh);else if(void 0===a.rightCh)b(a,a.leftCh);else{var c=d(a.rightCh);c.parent!==a&&(b(c,c.rightCh),c.rightCh=a.rightCh,c.rightCh.parent=c),b(a,c),c.leftCh=a.leftCh,c.leftCh.parent=c}}var g;return g=c(e,a),void 0!==g&&(f(g),h-=1,!0)},f.inorderTraversal=function(a){function b(a,c,d){void 0===a||d.stop||(b(a.leftCh,c,d),d.stop||(d.stop=c(a.element)===!1,d.stop||b(a.rightCh,c,d)))}b(e,a,{stop:!1})},f.preorderTraversal=function(a){function b(a,c,d){void 0===a||d.stop||(d.stop=c(a.element)===!1,d.stop||(b(a.leftCh,c,d),d.stop||b(a.rightCh,c,d)))}b(e,a,{stop:!1})},f.postorderTraversal=function(a){function b(a,c,d){void 0===a||d.stop||(b(a.leftCh,c,d),d.stop||(b(a.rightCh,c,d),d.stop||(d.stop=c(a.element)===!1)))}b(e,a,{stop:!1})},f.levelTraversal=function(b){function c(b,c){var d=a.Queue();for(void 0!==b&&d.enqueue(b);!d.isEmpty();){if(b=d.dequeue(),c(b.element)===!1)return;void 0!==b.leftCh&&d.enqueue(b.leftCh),void 0!==b.rightCh&&d.enqueue(b.rightCh)}}c(e,b)},f.minimum=function(){if(!f.isEmpty())return d(e).element},f.maximum=function(){function a(a){for(;void 0!==a.rightCh;)a=a.rightCh;return a}if(!f.isEmpty())return a(e).element},f.forEach=function(a){f.inorderTraversal(a)},f.toArray=function(){var a=[];return f.inorderTraversal(function(b){a.push(b)}),a},f.height=function(){function a(b){return void 0===b?-1:Math.max(a(b.leftCh),a(b.rightCh))+1}function b(b){return void 0===b?-1:Math.max(a(b.leftCh),a(b.rightCh))+1}return b(e)},f.equals=function(b){var c;return!a.isUndefined(b)&&"function"==typeof b.levelTraversal&&(f.size()===b.size()&&(c=!0,b.forEach(function(a){return c=f.contains(a)}),c))},f},a.Dictionary=function(b){var c={},d={},e=0,f=b||a.defaultToString,g="/$ ";return c.get=function(b){var c=d[g+f(b)];if(!a.isUndefined(c))return c.value},c.set=function(b,c){var h,i,j;if(!a.isUndefined(b)&&!a.isUndefined(c))return i=g+f(b),j=d[i],a.isUndefined(j)?(e+=1,h=void 0):h=j.value,d[i]={key:b,value:c},h},c.remove=function(b){var c=g+f(b),h=d[c];if(!a.isUndefined(h))return delete d[c],e-=1,h.value},c.keys=function(){var a,b=[];for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&b.push(d[a].key);return b},c.values=function(){var a,b=[];for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&b.push(d[a].value);return b},c.forEach=function(a){var b,c,e;for(b in d)if(Object.prototype.hasOwnProperty.call(d,b)&&(c=d[b],e=a(c.key,c.value),e===!1))return},c.containsKey=function(b){return!a.isUndefined(c.get(b))},c.clear=function(){d={},e=0},c.size=function(){return e},c.isEmpty=function(){return e<=0},c.equals=function(b,d){var e,f;return!a.isUndefined(b)&&"function"==typeof b.keys&&(c.size()===b.size()&&(e=d||a.defaultEquals,f=!0,b.forEach(function(a,b){return f=e(c.get(a),b)}),f))},c},a.Heap=function(b){function c(b){function c(a){return Math.floor((a-1)/2)}var d;for(d=c(b);b>0&&g(f[d],f[b])>0;)a.arrays.swap(f,d,b),b=d,d=c(b)}function d(b){function c(a){return 2*a+1}function d(a){return 2*a+2}function e(a,b){return b>=f.length?a>=f.length?-1:a:g(f[a],f[b])<=0?a:b}var h;for(h=e(c(b),d(b));h>=0&&g(f[b],f[h])>0;)a.arrays.swap(f,h,b),b=h,h=e(c(b),d(b))}var e={},f=[],g=b||a.defaultCompare;return e.peek=function(){if(f.length>0)return f[0]},e.add=function(b){if(!a.isUndefined(b))return f.push(b),c(f.length-1),!0},e.removeRoot=function(){var a;if(f.length>0)return a=f[0],f[0]=f[f.length-1],f.splice(f.length-1,1),f.length>0&&d(0),a},e.contains=function(b){var c=a.compareToEquals(g);return a.arrays.contains(f,b,c)},e.size=function(){return f.length},e.isEmpty=function(){return f.length<=0},e.clear=function(){f.length=0},e.forEach=function(b){a.arrays.forEach(f,b)},e.toArray=function(){return a.arrays.copy(f)},e.equals=function(b){var c,d,f;return!a.isUndefined(b)&&"function"==typeof b.removeRoot&&(e.size()===b.size()&&(c=e.toArray(),d=b.toArray(),f=a.compareToEquals(g),c.sort(g),d.sort(g),a.arrays.equals(c,d,f)))},e},a.LinkedList=function(){function b(a){var b,e;if(!(a<0||a>=f)){if(a===f-1)return d;for(b=c,e=0;e<a;e+=1)b=b.next;return b}}var c,d,e={},f=0;return e.add=function(e,g){var h,i;return a.isUndefined(g)&&(g=f),!(g<0||g>f||a.isUndefined(e))&&(h={element:e,next:void 0},0===f?(c=h,d=h):g===f?(d.next=h,d=h):0===g?(h.next=c,c=h):(i=b(g-1),h.next=i.next,i.next=h),f+=1,!0)},e.first=function(){if(void 0!==c)return c.element},e.last=function(){if(void 0!==d)return d.element},e.elementAtIndex=function(a){var c=b(a);if(void 0!==c)return c.element},e.indexOf=function(b,d){var e=d||a.defaultEquals,f=c,g=0;if(a.isUndefined(b))return-1;for(;void 0!==f;){if(e(f.element,b))return g;g+=1,f=f.next}return-1},e.contains=function(a,b){return e.indexOf(a,b)>=0},e.remove=function(b,e){var g,h=e||a.defaultEquals,i=c;if(f<1||a.isUndefined(b))return!1;for(;void 0!==i;){if(h(i.element,b))return i===c?(c=c.next,i===d&&(d=void 0)):i===d?(d=g,g.next=i.next,i.next=void 0):(g.next=i.next,i.next=void 0),f-=1,!0;g=i,i=i.next}return!1},e.clear=function(){c=void 0,d=void 0,f=0},e.equals=function(b,d){var f=d||a.defaultEquals,g=!0,h=c;return!a.isUndefined(b)&&"function"==typeof b.elementAtIndex&&(e.size()===b.size()&&(b.forEach(function(a){return g=f(a,h.element),h=h.next,g}),g))},e.removeElementAtIndex=function(a){var e,g;if(!(a<0||a>=f))return 1===f?(e=c.element,c=void 0,d=void 0):(g=b(a-1),void 0===g?(e=c.element,c=c.next):g.next===d&&(e=d.element,d=g),void 0!==g&&(e=g.next.element,g.next=g.next.next)),f-=1,e},e.forEach=function(a){for(var b=c;void 0!==b&&a(b.element)!==!1;)b=b.next},e.reverse=function(){for(var a,b,e=c;void 0!==e;)b=e.next,e.next=a,a=e,e=b;b=c,c=d,d=b},e.toArray=function(){var a=[];return e.forEach(function(b){a.push(b)}),a},e.size=function(){return f},e.isEmpty=function(){return f<=0},e},a.MultiDictionary=function(b,c){var d={},e=new a.Dictionary(b),f=c||a.defaultEquals;return d.get=function(b){var c=e.get(b);return a.isUndefined(c)?[]:a.arrays.copy(c)},d.set=function(b,c){var g;return!a.isUndefined(b)&&!a.isUndefined(c)&&(d.containsKey(b)?(g=e.get(b),!a.arrays.contains(g,c,f)&&(g.push(c),!0)):(e.set(b,[c]),!0))},d.remove=function(b,c){var d,g;return a.isUndefined(c)?(d=e.remove(b),!a.isUndefined(d)):(g=e.get(b),!!a.arrays.remove(g,c,f)&&(0===g.length&&e.remove(b),!0))},d.keys=function(){return e.keys()},d.values=function(){var a,b,c,d=e.values(),f=[];for(a=0;a<d.length;a+=1)for(c=d[a],b=0;b<c.length;b+=1)f.push(c[b]);return f},d.containsKey=function(a){return e.containsKey(a)},d.clear=function(){return e.clear()},d.size=function(){return e.size()},d.isEmpty=function(){return e.isEmpty()},d.forEach=function(a){return e.forEach(a)},d.equals=function(b){var c,e=!0;return!a.isUndefined(b)&&"function"==typeof b.values&&(d.size()===b.size()&&(b.forEach(function(b,g){return c=d.get(b)||[],c.length!==g.length?e=!1:a.arrays.forEach(c,function(b){return e=a.arrays.contains(g,b,f)}),e}),e))},d},a.PriorityQueue=function(b){var c={},d=a.reverseCompareFunction(b),e=new a.Heap(d);return c.enqueue=function(a){return e.add(a)},c.add=function(a){return e.add(a)},c.dequeue=function(){var a;if(0!==e.size())return a=e.peek(),e.removeRoot(),a},c.peek=function(){return e.peek()},c.contains=function(a){return e.contains(a)},c.isEmpty=function(){return e.isEmpty()},c.size=function(){return e.size()},c.clear=function(){e.clear()},c.forEach=function(a){e.forEach(a)},c.toArray=function(){return e.toArray()},c.equals=function(b){var e,f,g;return!a.isUndefined(b)&&"function"==typeof b.dequeue&&(c.size()===b.size()&&(e=c.toArray(),f=b.toArray(),g=a.compareToEquals(d),e.sort(d),f.sort(d),a.arrays.equals(e,f,g)))},c},a.Queue=function(){var b={},c=new a.LinkedList;return b.enqueue=function(a){return c.add(a)},b.add=function(a){return c.add(a)},b.dequeue=function(){var a;if(0!==c.size())return a=c.first(),c.removeElementAtIndex(0),a},b.peek=function(){if(0!==c.size())return c.first()},b.size=function(){return c.size()},b.contains=function(a,b){return c.contains(a,b)},b.isEmpty=function(){return c.size()<=0},b.clear=function(){c.clear()},b.forEach=function(a){c.forEach(a)},b.toArray=function(){return c.toArray()},b.equals=function(c,d){var e,f,g;return!a.isUndefined(c)&&"function"==typeof c.dequeue&&(b.size()===c.size()&&(e=d||a.defaultEquals,f=!0,c.forEach(function(a){return g=b.dequeue(),b.enqueue(g),f=e(g,a)}),f))},b},a.Set=function(b){var c={},d=new a.Dictionary(b);return c.contains=function(a){return d.containsKey(a)},c.add=function(b){return!c.contains(b)&&!a.isUndefined(b)&&(d.set(b,b),!0)},c.intersection=function(a){c.forEach(function(b){a.contains(b)||c.remove(b)})},c.union=function(a){a.forEach(function(a){c.add(a)})},c.difference=function(a){a.forEach(function(a){c.remove(a)})},c.isSubsetOf=function(a){var b=!0;return!(c.size()>a.size())&&(c.forEach(function(c){if(!a.contains(c))return b=!1,!1}),b)},c.remove=function(a){return!!c.contains(a)&&(d.remove(a),!0)},c.forEach=function(a){d.forEach(function(b,c){return a(c)})},c.toArray=function(){return d.values()},c.isEmpty=function(){return d.isEmpty()},c.size=function(){return d.size()},c.clear=function(){d.clear()},c.equals=function(b){var d;return!a.isUndefined(b)&&"function"==typeof b.isSubsetOf&&(c.size()===b.size()&&(d=!0,b.forEach(function(a){return d=c.contains(a)}),d))},c},a.Stack=function(){var b={},c=new a.LinkedList;return b.push=function(a){return c.add(a,0)},b.add=function(a){return c.add(a,0)},b.pop=function(){return c.removeElementAtIndex(0)},b.peek=function(){return c.first()},b.size=function(){return c.size()},b.contains=function(a,b){return c.contains(a,b)},b.isEmpty=function(){return c.isEmpty()},b.clear=function(){c.clear()},b.forEach=function(a){c.forEach(a)},b.toArray=function(){return c.toArray()},b.equals=function(d,e){var f,g,h;return!a.isUndefined(d)&&"function"==typeof d.peek&&(b.size()===d.size()&&(f=e||a.defaultEquals,g=!0,d.forEach(function(a){return h=b.pop(),c.add(h),g=f(h,a)}),g))},b},a});
//# sourceMappingURL=buckets.min.js.map

/***/ }),

/***/ "./packages/cirsim/package.json":
/*!**************************************!*\
  !*** ./packages/cirsim/package.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"cirsim","version":"2.1.17","description":"Cirsim Circuit Simulator","main":"dist/cirsim.min.js","module":"index.js","scripts":{"build:dev":"webpack --config webpack.dev.js","build:prod":"webpack --config webpack.prod.js","build:all":"$npm_execpath run build:dev && $npm_execpath run build:prod","test":"karma start karma.conf.js","serve":"webpack serve --config webpack.dev.js --open","build:docs":"documentation build src/Cirsim/**/*.js --sort-order source -f html -o doc/js"},"keywords":["Education","Circuits","Computer Architecture"],"author":"Charles B. Owen","license":"MIT","devDependencies":{"@babel/core":"^7.14.6","@babel/plugin-transform-runtime":"^7.14.5","@babel/preset-env":"^7.14.5","@babel/runtime":"7.14.6","babel-loader":"^8.2.2","clean-webpack-plugin":"^4.0.0-alpha.0","copy-webpack-plugin":"^9.0.0","css-loader":"^5.2.6","css-minimizer-webpack-plugin":"^3.0.1","file-loader":"^6.2.0","html-webpack-plugin":"^5.3.1","html-webpack-tags-plugin":"^3.0.1","jasmine-core":"^3.7.1","karma":"^6.3.4","karma-chrome-launcher":"^3.1.0","karma-jasmine":"^4.0.1","karma-jasmine-html-reporter":"^1.6.0","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^5.0.0","resolve-url-loader":"^4.0.0","sass":"^1.35.1","sass-loader":"^12.1.0","style-loader":"^2.0.0","terser-webpack-plugin":"^5.1.3","webpack":"^5.39.1","webpack-cli":"^4.7.2","webpack-dev-server":"^3.11.2","webpack-merge":"^5.8.0"},"dependencies":{"buckets-js":"^1.98.2","dialog-cl":"^1.0.6","dompurify":"^2.2.9","icons-cl":"~1.1.3","promise-polyfill":"^8.2.0","resizer-cl":"^2.4.3"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/cl/dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"Cirsim": 0
/******/ 		};
/******/ 		
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
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcourselib"] = self["webpackChunkcourselib"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["common","vendor"], () => (__webpack_require__("./vendor/cl/cirsim/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;