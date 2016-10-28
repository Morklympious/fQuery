/*
    Implementing common jQuery operations in a functional style. 
    IE8 compatibility minimum. 
*/

function _each(collection, callback) {
  var i,
      size = collection.length;

  for(i = 0; i < size; i++) {
    callback(collection[i], i, collection);
  }
}

/*
    Return an array of Nodes
    Feature set - ES3 (ie8)
    NOTE: ie8 will return elements only from this. 
    All other browsers will return whitespace/text 
    in addition. 
*/
function _nodes(collection) {
  var i,
      size  = collection.length,
      nodes = Array(size);

  __each(collection, function(node) {
    nodes.push(node);
  })

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
  var i,
      nodes    = __nodes(collection),
      size     = nodes.length,
      elements = [],
      ELEMENT  = Node.ELEMENT_NODE;  

  __each(collection, function(element) {
    if(element.nodeType === ELEMENT) {
      elements.push(element);
    }
  });

  return elements;
}

module.exports = {
  each: __each,
  nodes: __nodes,
  elements: __elements
}