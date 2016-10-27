var polyfills = require("../polyfills/polyfills");
var classList = require("./functional-classlist");

// Polyfill indexOf if need be. (ie8 depends on this)
polyfills.initialize.indexOf();

// Polyfill Element.matches (ie8 depends on this)
polyfills.initialize.matches();

/*
    Implementing common jQuery operations in a functional style. 
    IE8 compatibility minimum. 
*/

function __each(collection, callback) {
  var i,
      size = collection.length;

  for(i = 0; i < size; i++) {
    callback(collection[i], i, collection);
  }
}

/*
    Return an array of Nodes
    Feature set - ES3 (ie8)
    NOTE: ie8 will return elements only from this. 
    All other browsers will return whitespace/text 
    in addition. 
*/
function __nodes(collection) {
  var i,
      size  = collection.length,
      nodes = Array(size);

  __each(collection, function(node) {
    nodes.push(node);
  })

  return nodes; 
}

/*  
    Return an array of Elements
    Feature set - ES3 (ie8)
    NOTE: ie8 will return only elements from this. 
    All other browsers will return whitespace/text nodes
    in addition. 
*/
function __elements(collection) {
  var i,
      nodes    = __nodes(collection),
      size     = nodes.length,
      elements = [],
      ELEMENT  = Node.ELEMENT_NODE;  

  __each(collection, function(element) {
    if(element.nodeType === ELEMENT) {
      elements.push(element);
    }
  });

  return elements;
}

/* 
=====================================
    NODE OPERATIONS
=====================================
*/

// Find a nested element
function _find(element, selector){
  return __elements(element.querySelectorAll(selector));
}

// find the closest element that matches (includes self)
function _closest(element, selector) {
  var matched = false,
      current = element; 

  while(!current.matches(selector)) {
    current = _parent(current);
  }

  return !(current === document) ? current : false;
}

// Get immediate children
function _children(element) {
  return __elements(element.childNodes);
}

// Return node parent
function _parent(element) {
  return element.parentNode;
}

// Append node as last child. 
function _append(element, node) {
  return element.appendChild(node);
}

// Prepend Node as first child
function _prepend(element, node) {
  return element.insertBefore(node, element.firstChild);
}

/* 
=====================================
    ATTRIBUTE OPERATIONS
=====================================
*/

// Get/Set Attributes
// Feature set - ES3 (ie8)
function _attr(element, attr, value){
  return value ? element.setAttribute(attr, value) : 
                 element.getAttribute(attr);
}

// Remove an attribute
// Feature set - ES3 (ie8)
function _removeAttr(element, attr) {
  return element.removeAttribute(attr);
}

// Get/Set Values
// Feature set - ES3 (ie8)
function _value(element, value) {
  return value ? element.value = value : element.value;
}

// Add a class
// Feature set - ES3 (ie8)
function _addClass(element, classes) {
  classList(element).add(classes);
}

// Remove a class
// Feature set - ES3 (ie8)
function _removeClass(element, classes) {
  classList(element).remove(classes);
}

module.exports = {
  find: _find,
  children: _children,
  parent: _parent,
  attr: _attr,
  removeAttr: _removeAttr,
  value: _value,
  addcls: _addClass,
  removecls: _removeClass
}