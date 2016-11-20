/* eslint-disable */
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

function on(element, type, target, handler) {
  var listen = element.addEventListener;


  if(typeof target === "function" && !handler) {
    add(element, type, handler);
  }

  listen(type, function(e) {
    _inspect(e, target, handler);
  });

}

function delegate() {
  return on.apply(this, arguments);
}

function _inspect(e, target, handler) {
  var current = e.target;

  if(current.matches(target) && current !== window) {
    handler.call(current, e);
  }
}
