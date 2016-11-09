var helpers   = require("./internal/helpers"),
    _each     = helpers.each,
    _elements = helpers.elements,

    elem      = require("./element"),
    append    = elem.append,
    empty     = elem.empty;

// generates usable DOM Markup. 
function create(markup) {
  var fragment  = document.createDocumentFragment(), 
      container = document.createElement("div"); 
  
  // This should regexp to account for spaces between tags.
  container.innerHTML = _normalize(markup);

  _each(_elements(container.childNodes), function(element) {
    append(fragment, element);
  });

  return fragment;
}

function html(element, markup) {
  if(markup) {
    empty(element);
    append(element, create(markup));
  }
  
  return _normalize(element.innerHTML); 
}

function text(element, content) {
  var prop = element.textContent ? "textContent" : "innerText";

  if(content) {
    element[prop] = content; 
  }
 
  return element[prop]; 
}

function _normalize(markup) {
  return markup.replace(/\> +\</g, "><");
}

module.exports = {
  create : create,
  html   : html,
  text   : text
};
