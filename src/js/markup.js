var helpers   = require("./internal/helpers"),
    _each     = helpers.each,
    _elements = helpers.elements,

    elem      = require("./element"),
    append    = elem.append,
    empty     = elem.empty;

// generates usable DOM Markup. 
function _create(html) {
  var fragment  = document.createDocumentFragment(), 
      container = document.createElement("div"); 

  container.innerHTML = html;

  _each(_elements(container.childNodes), function(element) {
    append(fragment, element);
  });

  return fragment;
}

function _html(element, html) {
  if(html) {
    empty(element);
    append(element, _create(html));
  }

  return element.innerHtml; 
}

module.exports = {
  create : _create,
  html   : _html
};
