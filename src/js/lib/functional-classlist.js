/*
    classList implementation wrapper for ie8 Compat. 
*/
module.exports = function __classList(element) {
    var classes = element.className,
        list    = classes.replace(/ +/g, " ").split(" ");

    function _add(classes) {
        var individuals = classes.split(" ");

        list = list.concat(individuals);
        _set(list);
    }

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
        return element.className = classes.join(" "); 
    }

    return {
        add: _add,
        remove: _remove,
    }
}