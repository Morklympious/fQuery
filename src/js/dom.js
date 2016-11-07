var _elements = require("./internal/helpers").elements;

// Find a nested element
function find(element, selector) {
  return _elements(element.querySelectorAll(selector));
}

function query(selector, context) {
  context = context || document.body; 

  return (selector === "body") ? context : find(context, selector);
}

// find the closest element that matches (includes self)
function closest(element, selector) {
  var current  = element,
      document = element.ownerDocument;

  // While matches is a function and a match is not found
  while(current.matches && !current.matches(selector) && current.tagName !== "HTML") {
    // Move up to the parent
    current = parent(current);
  }

  return (current.matches(selector)) ? current : [];
}

// Return node parent
function parent(element) {
  return element.parentNode;
}

// Get immediate children
function children(element) {
  return _elements(element.childNodes);
}

function siblings(element, selector) {
  return selector ? find(parent(element), selector) : children(parent(element));
}

// Possible additions: .next(), .previous(). 

module.exports = {
  query    : query, 
  find     : find,
  closest  : closest,
  parent   : parent,
  children : children,
  siblings : siblings
};
