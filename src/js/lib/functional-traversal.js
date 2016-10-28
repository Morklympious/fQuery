var _elements = require("./functional-helpers").elements;

/* 
=====================================
    NODE TRAVERSAL
=====================================
*/

// Find a nested element
function _find(element, selector){
  return _elements(element.querySelectorAll(selector));
}

// find the closest element that matches (includes self)
function _closest(element, selector) {
  var matched = false,
      current = element; 

  // If the node has a .matches function, we're still in 
  // the DOM. If not, we reached the document object. 
  while(current.matches && !current.matches(selector)) {
    current = _parent(current);
  }

  return !(current === document) ? current : false;
}

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

// Append node as last child. 
function _append(element, node) {
  return element.appendChild(node);
}

// Prepend Node as first child
function _prepend(element, node) {
  return element.insertBefore(node, element.firstChild);
}