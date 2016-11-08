var helpers   = require("./internal/helpers"),
    _elements = helpers.elements,
    _exclude  = helpers.exclude,
    _unwrap   = helpers.unwrap;

// Find a nested element
function find(element, selector) {
  return _unwrap(_elements(element.querySelectorAll(selector)));
}

function query(selector, context) {
  context = context || document.body; 

  return (selector === "body") ? context : _unwrap(find(context, selector));
}

// find the closest element that matches (includes self)
function closest(element, selector) {
  var current  = element;

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
  return _unwrap(_elements(element.childNodes));
}

function siblings(element, selector) {
  var result = selector ? _exclude(find(parent(element), selector), element) :
                          _exclude(children(parent(element)), element);
  
  return _unwrap(result);
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
