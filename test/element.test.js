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
    
    beforeEach(function() {
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

    it("can correctly add a class when there are duplicates", function() {
      addClass(root, "one five five five five five");
      expect(root.className.indexOf("five")).to.be.above(-1);
      expect(root.className).to.equal("one two three four five");
    });

    
  });
});
