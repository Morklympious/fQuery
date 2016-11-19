/**
 * A for-each loop type function that can be run on arrays, it begins from the end of the list for the 
 * reason that it makes the burden on duplicate removal using indexOf far lighter. IE8 doesn't support Array.forEach
 * so this fulfills that functionality. 
 * 
 * @param {array} collection - The array to run `fn` against
 * @param {function} fn - The function that accepts each element, index, and the collection itself. 
 * 
 * @return {undefined} undefined. 
 */
function _each(collection, fn) {
  var i,
      size = collection.length;

  for(i = size - 1; i >= 0; i--) {
    fn(collection[i], i, collection);
  }

  return undefined; 
}

/**
 * A function that runs along an array and returns only unique values
 * 
 * @param {array} collection - The array to filter for uniques
 * 
 * @return {array} A new array containing the unique elements from `collection`. 
 */
function _uniques(collection) {
  var at;

  _each(collection, function(item, index, items) {
    at = items.indexOf(item);

    if(at !== index) {
      collection.splice(index, 1);
    }
  });

  return collection; 
}

/**
 * Excludes an element from an array
 * 
 * @param {array} collection - The array to search through for exclusions
 * @param {any} item - The function that accepts each element, index, and the collection itself. 
 * 
 * @return {array} the collection without the specified item
 */
function _exclude(collection, item) {
  var at = collection.indexOf(item);

  if(at > -1) {
    collection.splice(at, 1);
  }

  return collection;  
}

/**
 * Unwraps an element from an array if it's the only element in the array. This was created
 * to allow selectors that match to only a single DOM element to be interactive without having to
 * grab the first element of the returned collection array. 
 * 
 * @param {array} collection - The array of data
 * 
 * @return {any|array} the item as-is or an array of items
 */
function _unwrap(collection) {
  return collection.length === 1 ? collection[0] : collection; 
}

/**
 * Returns all nodes of an array collection. This function can also be used generically for 
 * almost any data type, but it should only be used with DOM elements. 
 * 
 * @param {array} collection - The array to search through for child Nodes
 * 
 * @return {array} the collection of all Nodes. 
 */
function _nodes(collection) {
  var nodes = [];

  _each(collection, function(node) {
    nodes.unshift(node);
  });

  return nodes; 
}

/**
 * Filters Element nodes of an array of Nodes. This filters out every node that is NOT and element node
 * (e.g. TextNode, CommentNode, AttributeNode, etc.) 
 * 
 * @param {array} collection - The array to search through for elements
 * 
 * @return {array} a new array containing only elements
 */
function _elements(collection) {
  var nodes    = _nodes(collection),
      elements = [],
      ELEMENT  = 1; // Element node ID.   

  _each(nodes, function(node) {
    if(node.nodeType === ELEMENT) {
      elements.unshift(node);
    }
  });

  return elements;
}

export default {
  each     : _each,
  uniques  : _uniques,
  exclude  : _exclude,
  unwrap   : _unwrap,
  nodes    : _nodes,
  elements : _elements
};
