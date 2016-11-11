var classList = require("./classlist"),
    dom       = require("./dom");

function add(element, type, handler) {
  var key;


  if(element.attachEvent) {
    key = "event-" + type + handler;

    element[key] = handler; 
    element[type + handler] = function() {
      element[key](window.event);
    };

    element.attachEvent("on" + type, element[type + handler]);

    return;
  }

  element.addEventListener(type, handler, false);
}

function remove(element, type, handler) {
  if(element.detachEvent) {
    element.detachEvent("on" + type, element[type + handler]);
    element[type + handler] = null; 

    return;
  }

  element.removeEventListener(type, handler, false);
}