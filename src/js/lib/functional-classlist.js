/*
    classList implementation wrapper for ie8 Compat.
*/
module.exports = function classList(element) {
  var classes = element.className,
      list    = classes.replace(/ +/g, " ").split(" ");

  function _exists(cls) {
    return list.indexOf(cls) > -1;
  }

  // Add classes to an element
  // Naive: assumes no duplicates
  function _add(classes) {
    var i,
        individuals = classes.split(" "),
        size        = individuals.length;

    for(i = 0; i < size; i++) {
      var cls = individuals[i];

      // If the class already exists, remove it from the
      // array we're eventually appending to the class list.
      (_exists(cls)) ? individuals.splice(i, 1) : function(){}();
    }

    list = list.concat(individuals);
    _set(list);
  }

  // Remove classes from an element
  // Naive: assumes no duplicates
  function _remove(classes) {
    var i,
        individuals = classes.split(" "),
        size        = individuals.length;

    for(i = 0; i < size; i++) {
        var at = list.indexOf(individuals[i]);

        if(at !== -1) {
            list.splice(at, 1);
        }
    }

    _set(list);
  }

  function _set(classes) {
    return element.className = classes.join(" ").trim();
  }

  return {
    add: _add,
    remove: _remove,
  }
}