var mocha    = require("mocha"),
    expect   = require("chai").expect,
    Browser  = require("mock-browser").mocks.MockBrowser,
    document = (new Browser()).getDocument(),
    _f       = require("../src/entry.js");

describe("Node operations", () => {
 
  describe("attr(element, attr, value)", () => {
    var attr = _f.element.attr,
        root = document.createElement("div");

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
    var remove = _f.element.removeAttr,
        root   = document.createElement("div")

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
    var value = _f.element.value,
        root  = document.createElement("input");

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
    var addClass = _f.element.addClass,
        root     = document.createElement("div");
    
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

    it("can correctly add a class when there are duplicates", () => {
      addClass(root, "five five five five five");
      expect(root.className.indexOf("five")).to.be.above(-1);
      expect(root.className).to.equal("one two three four five");
    });

    it("can correctly add a class with duplicates and existing classes", () => {
      addClass(root, "one one two three four four four five six six");
      expect(root.className).to.equal("one two three four five six");
    });
    
  });

  describe("removeClass(element, classes)", () => {
    var removeClass = _f.element.removeClass,
        root     = document.createElement("div");
    
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

  describe("append(element, appendee)", () => {
    var append = _f.element.append,
        root,
        span   = document.createElement("span");
    
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
});
