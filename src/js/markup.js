var helpers   = require("./internal/helpers"),
    _each     = helpers.each,
    _elements = helpers.elements,

    elem      = require("./element"),
    append    = elem.append,
    empty     = elem.empty;

// generates usable DOM Markup. 
function create(html) {
  var fragment  = document.createDocumentFragment(), 
      container = document.createElement("div"); 

  container.innerHTML = html;

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
  
  return element.innerHtml; 
}

function text(element, content) {
  
  if(!content) {
    return element.textContent || element.innerText;
  }

  if(element.innerText) {
    element.innerText = content;

    return element.innerText;
  }

  element.textContent = content; 

  return element.textContent; 
}

module.exports = {
  create : create,
  html   : html,
  text   : text
};
