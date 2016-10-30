var classList = require("./functional-classlist");

/* 
=====================================
    NODE ATTRIBUTE OPERATIONS
=====================================
*/

// Get/Set Attributes
// Feature set - ES3 (ie8)
function _attr(element, attr, value) {
  var setting = {}.toString.call(value) !== "[Object Undefined]";

  return setting ? element.setAttribute(attr, value) : 
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
  element.value = (value || element.value);
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

// Append node as last child. 
function _append(element, node) {
  return element.appendChild(node);
}

// Prepend Node as first child
function _prepend(element, node) {
  return element.insertBefore(node, element.firstChild);
}

module.exports = {
  attr        : _attr,
  removeAttr  : _removeAttr,
  value       : _value,
  addClass    : _addClass,
  removeClass : _removeClass,
  append      : _append,
  prepend     : _prepend
};
