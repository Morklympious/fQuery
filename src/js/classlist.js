var helpers  = require("./internal/helpers"),
    _each    = helpers.each,
    _uniques = helpers.uniques;

/*
    classList element wrapper for ie8 Compat.
*/
function classlist(element) {
  var classes = element.className,
      list    = classes.replace(/ +/g, " ").split(" ");

  function _has(cls) {
    return list.indexOf(cls) > -1;
  }

  function _set(cls) {
    element.className = cls.join(" ").trim();

    return element; 
  }

  // Add classes to an element
  function _add(cls) {
    // Passed in classes split into an array
    var individuals = cls.split(" ");

    return _set(_uniques(list.concat(individuals)));
  }

  // Remove classes from an element
  // Naive: assumes no duplicates
  function _remove(cls) {
    var individuals = _uniques(cls.split(" "));

    _each(individuals, function(classname) {
      var at; 
      
     if(_has(classname)) {
        at = list.indexOf(classname);

        list.splice(at, 1);
      }
    });

    _set(list);
  }

  return {
    add    : _add,
    remove : _remove,
    has    : _has
  };
}

module.exports = classlist; 
