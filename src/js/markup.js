import helpers from "./internal/helpers";
import elem    from "./element";

var _each     = helpers.each,
    _elements = helpers.elements,

    append    = elem.append,
    empty     = elem.empty;

/**
 * Create html markup in a manner similar to jQuery's usage of
 * $("<div></div>") et. al. 
 * 
 * @param {string} markup - The html markup you'd like to have created
 * 
 * 
 * @return {Node|DocumentFragment} The result of your HTML input, appendable to the DOM.
 */
function create(markup) {
  var fragment  = document.createDocumentFragment(), 
      container = document.createElement("div"); 
  
  container.innerHTML = _normalize(markup);

  _each(_elements(container.childNodes), function(element) {
    append(fragment, element);
  });

  return fragment;
}

/**
 * A functional style mirror of jQuery's `html()`. This function will 
 * create markup if `markup` is specified, and will retrieve markup if only
 * `element` is provided. 
 * 
 * @param {Node} element - The element to either set or retrieve html to/from
 * @param {Node} markup - The markup to assign to this element's `innerHTML`
 * 
 * @return {Node} The element that was appended to the parent
 */
function html(element, markup) {
  if(markup) {
    empty(element);
    append(element, create(markup));
  }
  
  return _normalize(element.innerHTML); 
}

/**
 * Sets an elements `textContent`
 * 
 * @param {Node} element - The element on which to retrieve or set text
 * @param {string|number} [content] - The content to set for the element's text value
 */
function text(element, content) {
  var prop = element.textContent ? "textContent" : "innerText";

  if(content) {
    element[prop] = content; 
  }
 
  return element[prop]; 
}

/**
 * Helper function to remove excess space between html tags
 * 
 * @param {Node} markup - The markup to sanitize for spaces. 
 * 
 * @return {string} The normalized markup with no extraneous spaces. 
 */
function _normalize(markup) {
  return markup.replace(/\> +\</g, "><");
}

export default {
  create : create,
  html   : html,
  text   : text
};
