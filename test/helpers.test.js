var expect   = require("chai").expect,
    helpers  = {}; 

require("jsdom-global")();

describe("Helper tests", () => {
  before(() => {
    require("./lib/compile")("./src/js/internal/helpers.js", helpers);
  });

  describe("each(collection, fn)", () => {
    var _each;

    before(() => {
      _each = helpers.exports.each;
    });   


    it("runs through each element", () => {
      var collection = [];

      _each([ 1, 2, 3, 4, 5 ], function(item) {
        collection.push(item);
      });

      expect(collection.length).to.equal(5);
    });
  });

  describe("_uniques(collection)", () => {
    var _uniques;

    before(() => {
      _uniques = helpers.exports.uniques;
    });   


    it("returns only unique entries", () => {
      var specials =  _uniques([ 1, 2, 4, 5, 6, 2, 3, 4, 5 ]);

      expect(specials.length).to.equal(6);
      expect(specials.toString()).to.equal([ 1, 2, 4, 5, 6, 3 ].toString());
    });
  });

  describe("_exclude(collection, item)", () => {
    var _exclude;

    before(() => {
      _exclude = helpers.exports.exclude;
    });   

    it("excludes the specified element in the collection", () => {
      var excluded =  _exclude([ 1, 2, 4, 5, 6 ], 6);

      expect(excluded.length).to.equal(4);
      expect(excluded.toString()).to.equal([ 1, 2, 4, 5 ].toString());
    });
  });

  describe("_unwrap(collection)", () => {
    var _unwrap;

    before(() => {
      _unwrap = helpers.exports.unwrap;
    });   

    it("returns an unwrapped element if the collection.length === 1", () => {
      var unwrapped =  _unwrap([ 1 ]);

      expect(unwrapped.length).to.be.undefined;
      expect(unwrapped).to.be.a("number");
    });

    it("does nothing otherwise with a collection > 1", () => {
      var unwrapped =  _unwrap([ 1, 2, 3, 4, 5 ]);

      expect(unwrapped.length).to.equal(5);
      expect(unwrapped).to.be.an("array");
    });
  });

  describe("_nodes(collection)", () => {
    var _nodes,
        root;

    before(() => {
      _nodes = helpers.exports.nodes;
      root   = document.createElement("div");

      root.innerHTML = "<!--wow--> <ul></ul> <div></div>";
    });   

    it("pushes all child nodes into an array", () => {
      var nodes =  _nodes(root.childNodes);

      expect(nodes.length).to.equal(5);
      expect(nodes[0].nodeType).to.equal(Node.COMMENT_NODE);
      expect(nodes[1].nodeType).to.equal(Node.TEXT_NODE);
      expect(nodes[2].nodeType).to.equal(Node.ELEMENT_NODE);
    });
  });

  describe("_elements(collection)", () => {
    var _elements,
        _each,
        root;

    before(() => {
      _elements = helpers.exports.elements;
      _each     = helpers.exports.each;
      root   = document.createElement("div");

      root.innerHTML = "<!--wow--> <ul></ul> <div></div>";
    });       


    it("pushes elements only", () => {
      var elements =  _elements(root.childNodes),
          works    = true;

      _each(elements, function(item) {
        if(item.nodeType !== Node.ELEMENT_NODE) {
          works = false; 
        }
      });

      expect(works).to.be.true; 
    });
  });
});
