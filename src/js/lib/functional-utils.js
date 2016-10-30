/*
    Implementing common jQuery operations in a functional style. 
    IE8 compatibility minimum. 
*/

function _each(collection, callback) {
  var i,
      size = collection.length;

  for(i = 0; i < size; i++) {
    return callback(collection[i], i, collection);
  }

  return undefined; 
}

/*
    Return an array of Nodes
    Feature set - ES3 (ie8)
    NOTE: ie8 will return elements only from this. 
    All other browsers will return whitespace/text 
    in addition. 
*/
function _nodes(collection) {
  var nodes = Array(collection.size);

  _each(collection, function(node) {
    nodes.push(node);
  });

  return nodes; 
}

/*  
    Return an array of Elements
    Feature set - ES3 (ie8)
    NOTE: ie8 will return only elements from this. 
    All other browsers will return whitespace/text nodes
    in addition. 
*/
function _elements(collection) {
  var nodes    = _nodes(collection),
      elements = [],
      ELEMENT  = Node.ELEMENT_NODE;  

  _each(nodes, function(node) {
    if(node.nodeType === ELEMENT) {
      elements.push(node);
    }
  });

  return elements;
}

function _exists(value) {
  return {}.toString.call(value) === "[Object Undefined]";
}

module.exports = {
  each     : _each,
  nodes    : _nodes,
  elements : _elements,
  exists   : _exists
};
