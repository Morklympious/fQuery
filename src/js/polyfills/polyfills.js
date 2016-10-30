/* eslint-disable */
/* 
    indexOf Polyfill for ie8. 
*/
function _indexOf() {
  if(!global.Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /* , from*/) {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;

      from = (from < 0) ? 
        Math.ceil(from) :
        Math.floor(from);

      if(from < 0) {
        from += len;
      }

      for(; from < len; from++) {
        if(from in this && this[from] === elt) {
          return from;
        }
      }

      return -1;
    };
  }
}

function _matches() {
  Element.prototype.matches = 
    Element.prototype.matchesSelector || 
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector || 
    Element.prototype.oMatchesSelector || 
    Element.prototype.webkitMatchesSelector ||
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;

        while(--i >= 0 && matches.item(i) !== this) { }

        return i > -1;            
    };
}

module.exports = {
  initialize : {
    indexOf : _indexOf,
    matches : _matches
  }
};

