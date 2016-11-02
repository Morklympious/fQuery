var classList = require("./classlist");

/* 
=====================================
    NODE ATTRIBUTE OPERATIONS
=====================================
*/

// Get/Set Attributes
// Feature set - ES3 (ie8)
function attr(element, attribute, val) {
  var setting = Object.prototype.toString.call(val) !== "[object Undefined]";

  return setting ? element.setAttribute(attr, val) : 
                   element.getAttribute(attr);
}

// Remove an attribute
// Feature set - ES3 (ie8)
function removeAttr(element, attribute) {
  return element.removeAttribute(attribute);
}

// Get/Set Values
// Feature set - ES3 (ie8)
function value(element, val) {
  element.value = (val || element.value);
}

// Add a class
// Feature set - ES3 (ie8)
function addClass(element, classes) {
  classList(element).add(classes);
}

// Remove a class
// Feature set - ES3 (ie8)
function removeClass(element, classes) {
  classList(element).remove(classes);
}

// Append node as last child. 
function append(element, node) {
  return element.appendChild(node);
}

// Prepend Node as first child
function prepend(element, node) {
  return element.insertBefore(node, element.firstChild);
}

function empty(element) {
  element.innerHTML = ""; 

  return; 
}

module.exports = {
  attr        : attr,
  removeAttr  : removeAttr,
  value       : value,
  addClass    : addClass,
  removeClass : removeClass,
  append      : append,
  prepend     : prepend,
  empty       : empty
};
