var _elements = require("./functional-utils").elements;

// Return node parent
function _parent(element) {
  return element.parentNode;
}

// Get immediate children
function _children(element) {
  return _elements(element.childNodes);
}

function _siblings(element, selector) {
  return selector ? _find(_parent(element), selector) : _children(_parent(element));
}

// Find a nested element
function _find(element, selector) {
  return _elements(element.querySelectorAll(selector));
}

function _query(selector) {
  return _find(document.body, selector);
}

// find the closest element that matches (includes self)
function _closest(element, selector) {
  var current = element; 

  // If the node has a .matches function, we're still in 
  // the DOM. If not, we reached the document object. 
  while(current.matches && !current.matches(selector)) {
    current = _parent(current);
  }

  return !(current === document) ? current : false;
}

module.exports = {
  query    : _query, 
  find     : _find,
  closest  : _closest,
  parent   : _parent,
  children : _children,
  siblings : _siblings
};
