var classList = require("./classlist"),
    dom       = require("./dom");

/* 
=====================================
    NODE ATTRIBUTE OPERATIONS
=====================================
*/

// Get/Set Attributes
// Feature set - ES3 (ie8)
function attr(element, attribute, val) {
  var setting = Object.prototype.toString.call(val) !== "[object Undefined]";

  return setting ? element.setAttribute(attribute, val) : 
                   element.getAttribute(attribute);
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

  return element.value; 
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

function css(element, styles) {
  var rule,
      value; 

  for(rule in styles) {
    value = styles[rule];

    element.style[rule] = value; 
  }

  return element; 
}

// Append node as last child. 
function append(element, appendee) {
  return element.appendChild(appendee);
}

// Prepend Node as first child
function prepend(element, prependee) {
  return element.insertBefore(prependee, element.firstChild);
}

function empty(element) {
  element.innerHTML = ""; 

  return element; 
}

function clone(element, deep) {
  return element.cloneNode(deep); 
}

function remove(element) {
  return dom.parent(element).removeChild(element);
}

module.exports = {
  attr        : attr,
  removeAttr  : removeAttr,
  value       : value,
  addClass    : addClass,
  removeClass : removeClass,
  css         : css,
  append      : append,
  prepend     : prepend,
  empty       : empty, 
  clone       : clone,
  remove      : remove
};
