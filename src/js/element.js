/**
 * @module element
 */
import classlist from "./classlist";
import dom from "./dom";

/**
 * a getter/setter function that modifies attributes on elements. 
 * 
 * @param {Node} element - The element to set attributes on
 * @param {string} attribute - The attribute to either retrieve or replace with a value
 * @param {string} [val] - The value to set, if any
 * 
 * @returns undefined
 */
export function attr(element, attribute, val) {
  var setting = Object.prototype.toString.call(val) !== "[object Undefined]";

  return setting ? element.setAttribute(attribute, val) : 
                   element.getAttribute(attribute);
}

/**
 * a function to remove attributes on elements
 * 
 * @param {Node} element - The element to remove attributes from
 * @param {string} attribute - The attribute on the element to remove
 * 
 * @returns undefined
 */
export function removeAttr(element, attribute) {
  return element.removeAttribute(attribute);
}

/**
 * a function to retrieve or set the value of a form element. 
 * 
 * @param {Node} element - The element on which to retrieve or set the value
 * @param {string|boolean|number} [val] - The value to set (or retrieve) as the elements value 
 * 
 * @returns {number|string} The value of the element
 */
export function value(element, val) {
  element.value = (val || element.value);

  return element.value; 
}

/**
 * A function that adds a class to the element provided using a 
 * polyfill wrapper for Element.classlist
 * @see classList
 * 
 * @param {Node} element - The element on which to add one (or many, space separated) class(es)
 * @param {string} classes - The classes to add to the element
 * 
 * @return {Node} The element on which the class was set
 */
export function addClass(element, classes) {
  classlist(element).add(classes);
}

/**
 * A function that removes a class from the element provided using a
 * polyfill wrapper for Element.classlist
 * @see classList
 * 
 * @param {Node} element - The element on which to remove one (or many, space separated) class(es)
 * @param {string} classes - The classes to remove from the element
 * 
 * @return {Node} The element on which the class was set
 */
export function removeClass(element, classes) {
  classlist(element).remove(classes);
}

/**
 * A function to set inline CSS properties onto an element
 * @see classList
 * 
 * @example
 * var div = document.createElement("div");
 * 
 * css(div, {
 *   background: blue,
 *   fontSize: "18px"
 * });
 * 
 * //The div will now have inline styles of:
 * // - font-size: 18px;
 * // - background: blue; 
 * 
 * @param {Node} element - The element on which to remove one (or many, space separated) class(es)
 * @param {object} styles - The styles, in camel-case (if applicable), to set on the element
 * 
 * @return {Node} The element on which the class was set
 */
export function css(element, styles) {
  var rule,
      val; 

  for(rule in styles) {
    val = styles[rule];
    element.style[rule] = val; 
  }

  return element; 
}

/**
 * Append a child node to the end of an element's children
 * 
 * @param {Node} element - The element to append a child to
 * @param {Node} appendee - The element that will be moved or appended to the 
 * new parent element
 * 
 * @return {Node} The element that was appended to the parent
 */
export function append(element, appendee) {
  return element.appendChild(appendee);
}

/**
 * Append a child node to the beginning of an element's children
 * 
 * @param {Node} element - The element to prepend a child to
 * @param {Node} prependee - The element that will be moved or prepended to the 
 * new parent element
 * 
 * @return {Node} The element that was prepended to the parent
 */
export function prepend(element, prependee) {
  return element.insertBefore(prependee, element.firstChild);
}

/**
 * Utility to empty elements child contents completely via `innerHTML`
 * 
 * @param {Node} element - The element to empty
 * 
 * @return {Node} The newly emptied element. 
 */
export function empty(element) {
  element.innerHTML = ""; 

  return element; 
}

/**
 * Clones a node, optionally deep clones the node to also clone its children
 * 
 * @param {Node} element - The element to clone
 * @param {boolean} [deep=false] - The flag to determine whether or not the copy is deep 
 * 
 * @return The newly cloned node
 */
export function clone(element, deep) {
  return element.cloneNode(deep); 
}

/**
 * Removes a node from the DOM
 * 
 * @param {Node} element - The element to remove from the DOM. 
 * 
 * @return {Node} The newly removed element
 */
export function remove(element) {
  return dom.parent(element).removeChild(element);
}

export default {
  attr,
  removeAttr,
  value,
  addClass,
  removeClass,
  css,
  append,
  prepend,
  empty, 
  clone,
  remove
};
