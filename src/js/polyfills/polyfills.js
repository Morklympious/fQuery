var helpers = require("../internal/helpers"),
    _each   = helpers.each; 

(function() {
  var indexOf = Array.prototype.indexOf;

  function _polyfill(item /* , from*/) {
    var self     = this,
        len      = self.length,
        start    = Number(arguments[1]) || 0,
        negative = start < 0, 

        ceiling = Math.ceil,
        floor   = Math.floor;

    start = (negative) ? ceiling(start) : floor(start);

    if(negative) {
      start += len;
    }

    for(; start < len; start++) {
      if(start in this && this[start] === item) {
        return start;
      }
    }

    return -1;
  }

  if(!indexOf) {
    Array.prototype.indexOf = _polyfill;
  }
}());

(function() {  
  var matches = Element.prototype.matches;

  // Look for other implementations to use
  // Otherwise, just polyfill with a function.
  function _fix() {
    var prefixes = [ "moz", "ms", "o", "webkit", "" ];
    
    _each(prefixes, function(prefix) {
      var key     = prefix + "MatchesSelector",
          current = Element.prototype[key];

      if(current) {
        matches = current;

        return; 
      }
    });

    _polyfill();
  }

  // The polyfill if there aren't other implementations
  function _polyfill() {
    Element.prototype.matches = function(s) {
        var m = (this.document || this.ownerDocument).querySelectorAll(s),
            i = m.length;

        while(--i >= 0 && m.item(i) !== this) { 
          null; 
        }

        return i > -1;            
    };
  }

  if(!matches) {
    _fix();
  }
}());


