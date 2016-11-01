var _each = require("./functional-utils").each;

/*
    classList element wrapper for ie8 Compat.
*/
function classlist(element) {
  var classes  = element.className,
      list    = classes.replace(/ +/g, " ").split(" ");

  function _exists(cls) {
    return list.indexOf(cls) > -1;
  }

  function _set(cls) {
    element.className = cls.join(" ").trim();

    return element; 
  }

  function _contains(cls) {
    var at = list.indexOf(cls);
    
    return (at !== -1); 
  }

  // Add classes to an element
  function _add(cls) {
    var individuals = cls.split(" ");
    
    _each(individuals, function(classname, index) {
      (_exists(classname)) ? individuals.splice(index, 1) : null;
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

      if(_contains(classname)) {
        at = list.indexOf(classname);
      
        list.splice(at, 1);
      }
    });
   
    return _set(list);
  }

  return {
    add    : _add,
    remove : _remove
  };
}

module.exports = classlist; 
