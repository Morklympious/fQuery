
function add(element, type, handler) {
  var listen = element.addEventListener;

  listen(type, handler);
}

function remove(element, type, handler) {
  var unlisten = element.removeEventListener;

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
