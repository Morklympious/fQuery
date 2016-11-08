var mocha    = require("mocha"),
    expect   = require("chai").expect,

    _f       = require("../src/entry.js");

require("jsdom-global")();

describe("Markup tests", () => {
  
  describe("create(html)", () => {
    var create = _f.markup.create,
        root; 

    beforeEach(() => {
      root = null; 
    });

    it("returns a document fragment", () => {
      
      root = create("");

      expect(root instanceof DocumentFragment).to.be.true;
    });
    it("can create a single element", () => {
      root = create("<span>content</span>");

      expect(root.querySelector("span")).to.be.ok;
      expect(root.childNodes.length).to.equal(1);
    });
    it("can create nested elements inside of other elements");
    it("can create elements with attributes");

  });

  describe("html(element, markup)", () => {

  });

  describe("text(element, content)", () => {

  });
});
