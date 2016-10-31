var mocha    = require("mocha"),
    expect   = require("chai").expect,
    Browser  = require("mock-browser").mocks.MockBrowser,
    document = (new Browser()).getDocument(),
    _f       = require("../src/entry.js");

describe("Node operations", () => {
 
  describe("attr(element, attr, value)", () => {
     var root = document.createElement("div");

    it("should set attributes", () => {
      _f.node.attr(root, "data-cool", true);
      expect(root.getAttribute("data-cool")).to.equal("true");
    });

    it("should get attributes", () => { 
      root.setAttribute("id", "cool");
      expect(_f.node.attr(root, "id")).to.equal("cool");
    });

  });

  describe("removeAttr(element, attr)", () => {
    var remove = _f.node.removeAttr,
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
      remove(root, "custom-attr")
      expect(root.getAttribute("custom-attr")).to.equal(null);
    });
  });
});
