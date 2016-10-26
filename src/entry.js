var polyfills = require("./js/polyfills/polyfills");
var classList = require("./js/lib/functional-classlist");

// Polyfill indexOf if need be.
polyfills.initialize.indexOf();

/*
    Implementing common jQuery operations in a functional style. 
    IE8 compatibility minimum. 
*/

/*
    Return an array of Nodes
    Feature set - ES3 (ie8)
    NOTE: ie8 will return elements only from this. 
    All other browsers will return whitespace/text 
    in addition. 
*/
function __nodes(collection) {
    var i,
        size  = collection.length,
        nodes = Array(size);

    for(i = 0; i < size; i++) {
        nodes[i] = collection[i]
    }

    return nodes; 
}

/*  
    Return an array of Elements
    Feature set - ES3 (ie8)
    NOTE: ie8 will return elements only from this. 
    All other browsers will return whitespace/text 
    in addition. 
*/
function __elements(collection) {
    var i,
        nodes    = __nodes(collection),
        size     = nodes.length,
        elements = [],
        element  = Node.ELEMENT_NODE;  


    for(i = 0; i < size; i++) {
        var current   = nodes[i],
            elemental = current.nodeType === element; 

        if(elemental) {
            elements.push(current);
        }
    }

    return elements;
}

/* 
=====================================
    NODE OPERATIONS
=====================================
*/

// Find a nested element
function _find(element, selector){
    return __elements(element.querySelectorAll(selector));
}

function _closest(element, selector) {

}

// Get immediate children
function _children(element) {
    return __elements(element.childNodes);
}

// Return node parent
function _parent(element) {
    return element.parentNode;
}

// Append node as last child. 
function _append(element, node) {
    return element.appendChild(node);
}

// Prepend Node as first child
function _prepend(element, node) {
    var first = element.firstChild;

    return element.insertBefore(node, child);
}

/* 
=====================================
    ATTRIBUTE OPERATIONS
=====================================
*/

// Get/Set Attributes
// Feature set - ES3 (ie8)
function _attr(element, attr, value){
    return value ? element.setAttribute(attr, value) : element.getAttribute(attr);
}

// Remove an attribute
// Feature set - ES3 (ie8)
function _removeAttr(element, attr) {
    return element.removeAttribute(attr);
}

// Get/Set Values
// Feature set - ES3 (ie8)
function _value(element, value) {
    return value ? element.value = value : element.value;
}

// Add a class
// Feature set - ES3 (ie8)
function _addClass(element, classes) {
    var list = classList(element);

    list.add(classes);
}

// Remove a class
// Feature set - ES3 (ie8)
function _removeClass(element, classes) {
    var list = classList(element);

    list.remove(classes);
}

module.exports = {
    find: _find,
    children: _children,
    parent: _parent,
    attr: _attr,
    removeAttr: _removeAttr,
    value: _value,
    class: {
        add: _addClass,
        remove: _removeClass
    }
}