/* eslint-disable */

/**
 * a function to add an event listener to an element. 
 * Contains logic to backfill missing functionality in Internet Explorer 8.  
 * 
 * @param {Node} element - The element to add a handler to
 * @param {String} type - The type of event that the listener triggers on
 * @param {Function} handler - The function to run when the event listener is triggered. 
 * 
 * @returns {Undefined} undefined
 */
function add(element, type, handler) {
  var listen = element.addEventListener,
      eKey;

  // If this is ie8, which doesn't support addEventListener
  // create an event with attachEvent. 
  if(!listen) {
    eKey = "event-" + type + handler;
    element[eKey] = handler;

    element[type + handler] = function() {
      element[eKey](window.event);
    }

    element.attachEvent("on" + type, handler, false); 

    return; 
  }

  listen(type, handler);
}

/**
 * a function to remove an event listener to an element.
 * Contains logic to backfill missing functionality in Internet Explorer 8. 
 * 
 * @param {Node} element - The element to remove a handler from
 * @param {String} type - The type of event that the listener triggers on
 * @param {Function} handler - The function to remove 
 * 
 * @returns {Undefined} undefined
 */
function remove(element, type, handler) {
  var unlisten = element.removeEventListener;

  // If this is ie8, which doesn't support removeEventListener
  // create an event with detachEvent. 
  if(!unlisten) {
    element.detachEvent("on" + type, element[type + handler]);
    element[type + handler] = null; 

    return;
  }

  unlisten(type, handler);
}

/**
 * Event delegation using the add and remove event functions
 * 
 * @param {Node} element - The element that will be delegated the events
 * @param {String} type - The type of handler that will trigger this listener
 * @param {String} target - a CSS selector to match the elements that will trigger the listener
 * @param {Function} handler - A function to run when the listener is triggered
 */
function on(element, type, target, handler) {
  var listen = element.addEventListener;

  listen(type, function(e) {
    _inspect(e, target, handler);
  });

}

function _inspect(e, target, handler) {
  var current = e.target || e.srcElement;

  if(current.matches(target) && current !== window) {
    handler.call(current, e);
  }
}
