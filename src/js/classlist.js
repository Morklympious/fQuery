var _each = require("./internal/helpers").each;

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
    var individuals = cls.split(" ");
    
    _each(individuals, function(classname, index) {
      (_has(classname)) ? individuals.splice(index, 1) : null;
    });

    list = list.concat(individuals);

    return _set(list);
  }

  // Remove classes from an element
  // Naive: assumes no duplicates
  function _remove(cls) {
    var individuals = cls.split(" ");

    _each(individuals, function(classname) {
      var at; 

      while(_has(classname)) {
        at = list.indexOf(classname);
      
        list.splice(at, 1);
      }
    });
   
    return _set(list);
  }

  return {
    add    : _add,
    remove : _remove,
    has    : _has
  };
}

module.exports = classlist; 
