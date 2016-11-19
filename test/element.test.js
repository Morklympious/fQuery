var expect   = require("chai").expect,
    _f       = {};

require("jsdom-global")();


describe("Node operations", () => {

  before(() => {
    require("./lib/compile")("./src/entry.js", _f);
  });

  describe("attr(element, attr, value)", () => {
    var attr,
        root = document.createElement("div");

    before(() => {
       attr = _f.exports.element.attr;
    });

    root.setAttribute("id", "Alexander");
    root.setAttribute("class", "Hamilton");
    root.setAttribute("custom-attr", "100");

    it("should set attributes", () => {
      attr(root, "class", "Burr");

      expect(root.getAttribute("id")).to.equal("Alexander");
      expect(root.getAttribute("class")).to.equal("Burr");
    });

    it("should get attributes", () => { 
      root.setAttribute("id", "cool");
      expect(attr(root, "id")).to.equal("cool");
    });
  });

  describe("removeAttr(element, attr)", () => {
    var remove,
        root   = document.createElement("div");

    before(() => {
       remove = _f.exports.element.removeAttr;
    });

    root.setAttribute("id", "Alexander");
    root.setAttribute("class", "Hamilton");
    root.setAttribute("custom-attr", "100");

    it("can remove an id", () => {
      remove(root, "id");
      expect(root.getAttribute("id")).to.equal(null);
    });

    it("can remove a class", () => {
      remove(root, "class");
      expect(root.getAttribute("class")).to.equal(null);
    });

    it("can remove custom attributes", () => {
      remove(root, "custom-attr");
      expect(root.getAttribute("custom-attr")).to.equal(null);
    });
  });

  describe("value(element, val)", () => {
    var value,
        root  = document.createElement("input");

    before(() => {
       value = _f.exports.element.value;
    });

    root.value = "test";

    it("can correctly retrieve a value", () => {
      expect(value(root)).to.equal("test");
    });

    it("can reassign a value", () => {
      value(root, "doot");
      expect(root.value).to.equal("doot");
      expect(value(root)).to.equal("doot");
    });
  });

  describe("addClass(element, classes)", () => {
    var addClass,
        root     = document.createElement("div");

    before(() => {
       addClass = _f.exports.element.addClass;
    });  

    beforeEach(() => {
      root.className = "one two three four";
    });  

    it("can correctly add a class", () => {
      addClass(root, "five");
      expect(root.className.indexOf("five")).to.be.above(-1);
      expect(root.className).to.equal("one two three four five");
    });

    it("can correctly add multiple classes", () => {
      addClass(root, "five six seven");
      expect(root.className).to.equal("one two three four five six seven");
    });

    it("handles duplicates", () => {
      addClass(root, "five five five five five");
      expect(root.className.indexOf("five")).to.be.above(-1);
      expect(root.className).to.equal("one two three four five");
    });

    it("handles duplicates of existing classes", () => {
      addClass(root, "one one two three four four four five six six");
      expect(root.className).to.equal("one two three four five six");
    });
  });

  describe("removeClass(element, classes)", () => {
    var removeClass,
        root     = document.createElement("div");

    before(() => {
       removeClass = _f.exports.element.removeClass;
    });

    beforeEach(() => {
      root.className = "one two three four";
    });  

    it("can correctly remove a class", () => {
      removeClass(root, "five");
      expect(root.className.indexOf("five")).to.equal(-1);
      expect(root.className).to.equal("one two three four");
    });

    it("can correctly remove multiple classes", () => {
      removeClass(root, "two three four");
      expect(root.className).to.equal("one");
    });

    it("can correctly remove a class when there are duplicates", () => {
      removeClass(root, "four four four four four");
      expect(root.className.indexOf("five")).to.equal(-1);
      expect(root.className).to.equal("one two three");
    });

    it("can correctly remove a class with duplicates and existing classes", () => {
      removeClass(root, "one one two three four four four five six six");
      expect(root.className).to.equal("");
    });
  });

  describe("css(element, styles)", () => {
    var css,
        root     = document.createElement("div");

    before(() => {
       css = _f.exports.element.css;
    });    
    
    it("correctly assigns styles", () => {
      css(root, {
        color           : "red",
        backgroundColor : "blue",
        fontSize        : "30px"
      });

      expect(root.style.color).to.equal("red");
      expect(root.style.backgroundColor).to.equal("blue");
      expect(root.style.fontSize).to.equal("30px");
    });
  });

  describe("append(element, appendee)", () => {
    var append,
        root,
        span   = document.createElement("span");

    before(() => {
       append = _f.exports.element.append;
    });  

    beforeEach(() => {
      root = document.createElement("div");
    });

    it("can correctly append child node", () => {
      append(root, span);
      expect(root.firstChild.tagName).to.equal("SPAN");
    });

    it("can nest append calls for appending", () => {
      append(append(root, span), document.createElement("span"));
      expect(root.firstChild.tagName).to.equal("SPAN");
      expect(root.firstChild.firstChild.tagName).to.equal("SPAN");
    });

    it("returns the node that was appended", () => {
      expect(append(root, span).tagName).to.equal("SPAN");
    });
  });

  describe("prepend(element, prependee)", () => {
    var prepend,
        root,
        span    = document.createElement("span");

    before(() => {
       prepend = _f.exports.element.prepend;
    });   

    beforeEach(() => {
      root = document.createElement("div");
    });  

    it("can correctly prepend child node", () => {
      prepend(root, span);
      expect(root.firstChild.tagName).to.equal("SPAN");
    });

    it("can nest prepend calls for prepending", () => {
      prepend(root, span);
      prepend(root, document.createElement("textarea"));

      expect(root.firstChild.tagName).to.equal("TEXTAREA");
    });

    it("returns the node that was prepended", () => {
      expect(prepend(root, span).tagName).to.equal("SPAN");
    });
  });

  describe("empty(element)", () => {
    var empty,
        root  = document.createElement("div"),
        span  = document.createElement("span");

    before(() => {
       empty = _f.exports.element.empty;
    });  

    root.appendChild(span);

    it("empties the inner html of an element", () => {
      expect(root.firstChild.tagName).to.equal("SPAN");
      expect(empty(root).innerHTML).to.equal("");
    });
  });

  describe("clone(element)", () => {
    var clone,
        root,
        two;

    before(() => {
      clone = _f.exports.element.clone;

      root = document.createElement("div");
      root.setAttribute("class", "one two three");
      root.setAttribute("data-custom", "fire");
      root.appendChild(document.createElement("input"));
      root.appendChild(document.createElement("i"));
    });  

    beforeEach(() => {
      two = clone(root, true);
    });


    it("clones a node (attributes and all)", () => {
      expect(two.tagName).to.equal("DIV");
      expect(two.getAttribute("class")).to.equal("one two three");
      expect(two.getAttribute("data-custom")).to.equal("fire");
    });

     it("clones a node that has children", () => {
      expect(two.tagName).to.equal("DIV");
      expect(two.getAttribute("class")).to.equal("one two three");
      expect(two.firstChild.tagName).to.equal("INPUT");
      expect(two.childNodes.length).to.equal(2);
    });
  });
});
