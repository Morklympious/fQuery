var utils     = require("./functional-utils"),
    _each     = utils.each,
    _elements = utils.elements;

// generates usable DOM Markup. 
function _create(html) {
  var fragment  = document.createDocumentFragment(), 
      container = document.createElement("div"); 

  container.innerHTML = html;

  _each(_elements(container.childNodes), function(element) {
    fragment.appendChild(element);
  });

  return fragment;
}

function _html(element, html) {
  if(html) {
    element.appendChild(_create(html));
  }

  return element.innerHtml; 
}


module.exports = {
  create : _create,
  html   : _html
};
