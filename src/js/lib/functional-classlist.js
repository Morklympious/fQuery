var _each = require("./functional-utils").each;

/*
    classList element wrapper for ie8 Compat.
*/
module.exports = function classList(element) {
  var classes = element.className,
      list    = classes.replace(/ +/g, " ").split(" ");

  function _exists(cls) {
    return list.indexOf(cls) > -1;
  }

  function _set(classes) {
    return element.className = classes.join(" ").trim();
  }

  // Add classes to an element
  function _add(classes) {
    var i,
        individuals = classes.split(" ");
    
    _each(individuals, function(cls, index) {
      (_exists(cls)) ? individuals.splice(index, 1) : (function() {}());
    });

    list = list.concat(individuals);
    _set(list);
  }

  // Remove classes from an element
  // Naive: assumes no duplicates
  function _remove(classes) {
    var individuals = classes.split(" ");

    _each(individuals, function(cls, index) {
      var at = list.indexOf(cls);
      
      if(at !== -1) {
        list.splice(at, 1);
      }
    });
   
    _set(list);
  }

  return {
    add    : _add,
    remove : _remove
  };
};
