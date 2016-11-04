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

    it("can correctly retrieve a value", () => {
      
    });

    it("can reassign a value", () => {
      
    });

    it("returns nothing for non-control elements", () => {
     
    });
  });
});
