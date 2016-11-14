var helpers  = require("./internal/helpers"),
    _each    = helpers.each,
    _uniques = helpers.uniques;

/**
 * Wrap an element in a classlist-like object such that it can add and remove classes
 * in a manner compatible with ie8+ 
 * 
 * @param {Node} element - The element to wrap in a classlist object so it can use `.add()`, `.remove()`
 * etc. 
 * 
 * @return {object} The API that acts entirely on the element provided. 
 */
function classlist(element) {
  var classes = element.className,
      list    = classes.replace(/ +/g, " ").split(" ");
      
  function _contains(cls) {
    return list.indexOf(cls) > -1;
  }

  function _set(cls) {
    element.className = cls.join(" ").trim();

    return element; 
  }

  // TODO: support native classList if available
  function _add(cls) {
    // Passed in classes split into an array
    var individuals = cls.split(" ");

    return _set(_uniques(list.concat(individuals)));
  }

  // Remove classes from an element 
  // TODO: support native classList if available
  function _remove(cls) {
    var individuals = _uniques(cls.split(" "));

    _each(individuals, function(classname) {
      var at; 
      
     if(_contains(classname)) {
        at = list.indexOf(classname);

        list.splice(at, 1);
      }
    });

    _set(list);
  }

  return {
    add    : _add,
    remove : _remove,
    has    : _contains
  };
}

module.exports = classlist; 
