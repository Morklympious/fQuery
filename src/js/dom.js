/**
 * @module DOM
 */
import helpers from "./internal/helpers";

var _elements = helpers.elements,
    _exclude  = helpers.exclude,
    _unwrap   = helpers.unwrap;

/**
 * Finds an element by selector within a context. If child elements in 
 * element match selector, they are added to the return result
 * 
 * @param {Node} element - The element to search for children inside of
 * @param {string} selector - The CSS selector to match elements against
 * 
 * @returns {array|Node} A single element or collection of elements that match the query
 */
export function find(element, selector) {
  return _unwrap(_elements(element.querySelectorAll(selector)));
}

/**
 * Finds an element by selector within the context of context (document.body 
 * if no context is supplied). This is a bare-bones analog of jQuery's `$()`
 * 
 * @param {string} selector - The CSS selector to match elements against
 * @param {Node} context - The element to search inside of
 * 
 * @returns {array|Node} A single element or collection of elements that match the query
 */
export function query(selector, context = document.body) {
  return (selector === "body") ? context : find(context, selector);
}

// find the closest element that matches (includes self)
/**
 * Finds the closest parent element of element that matches selector
 * starting with the element this function was passed
 * 
 * @param {Node} element - The element from which to begin the search
 * @param {string} selector - The CSS selector to match elements against
 * 
 * @returns {Node} The first ancestor element that matches the query
 */
export function closest(element, selector) {
  var current  = element;

  // Keep looking up the DOM if our current element doesn't match, stop at <html>
  while(current.matches && !current.matches(selector) && current.tagName !== "HTML") {
    current = parent(current);
  }

  return (current.matches(selector)) ? current : [];
}

/**
 * Returns the immediate parent of a given node
 * 
 * @param {Node} element - The element from which to return a parent
 * 
 * @return {Node} element - The parent element of the element passed in
 */
export function parent(element) {
  return element.parentNode;
}

/**
 * Returns an array of children of the passed in element. Will return a single element
 * if the array contains only one child. 
 * 
 * @param {Node} element - The element from which to retrieve children
 * 
 * @return {array|Node} element - The children of element
 */
export function children(element) {
  return _unwrap(_elements(element.childNodes));
}

/**
 * Returns siblings of a given node. If a selector is specified, it will
 * return only the siblings that match that selector. 
 * 
 * @param {Node} element - The element from which to return a parent
 * @param {string} selector - the selector to match elements against
 * 
 * @return {array|Node} element - The sibling(s) of the element passed in. 
 */
export function siblings(element, selector) {
  var result = selector ? _exclude(find(parent(element), selector), element) :
                          _exclude(children(parent(element)), element);
  
  return _unwrap(result);
}

export default {
  query, 
  find,
  closest,
  parent,
  children,
  siblings
};
