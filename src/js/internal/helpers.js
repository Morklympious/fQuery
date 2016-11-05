/*
    Implementing common operations in a functional style -- ie8 compat. 
*/

function _each(collection, fn) {
  var i,
      size = collection.length;

  for(i = size; i > 0; i--) {
    fn(collection[i], i, collection);
  }

  return undefined; 
}

function _uniques(collection, fn) {
  var at;

  _each(collection, function(item, index, items) {
    at = items.indexOf(item);

    if(at !== index) {
      collection.splice(index, 1);
    }
  });

  return collection; 
}

/*
    Return an array of Nodes
    Feature set - ES3 (ie8)
    NOTE: ie8 will return elements only from this. 
    All other browsers will return whitespace/text 
    in addition. 
*/
function _nodes(collection) {
  var nodes = [];

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

module.exports = {
  each     : _each,
  uniques  : _uniques,
  nodes    : _nodes,
  elements : _elements
};
