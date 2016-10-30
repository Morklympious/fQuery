var mocha    = require("mocha"),
    expect   = require("chai").expect,
    Browser  = require("mock-browser").mocks.MockBrowser,
    document = (new Browser()).getDocument(),
    _f       = require("../src/entry.js");

describe("Node operations", () => {
 
  describe("attr(element, attr, value)", () => {
     

    it("should set attributes", () => {
      var root = document.createElement("div");

      _f.node.attr(root, "data-cool", true);
      expect(root.getAttribute("data-cool")).to.equal("true");
    });

    it("should get attributes", () => {
      var root = document.createElement("div");
      console.log(root);
      root.setAttribute("id", "bars");
      expect(_f.node.attr(root, "id")).to.equal("false");
    });
  });

  describe("removeAttr(element, attr)", () => {



    it("can remove an id", () => {

    });

    it("can remove a class", () => {
      
    });
  });
});
