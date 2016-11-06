var mocha    = require("mocha"),
    expect   = require("chai").expect,
    fs       = require("fs"),
    Browser  = require("mock-browser").mocks.MockBrowser,
    window   = new Browser(),
    document = window.getDocument(),

    _f       = require("../src/entry.js"),
    mock     = fs.readFileSync("./test/html/structure.html");


describe("DOM traversal operations", () => {

  describe("find(element, selector)", () => {
    var find = _f.dom.find,
        root; 

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    });

    it("correctly locates an element by tag name", () => {
      var target = find(root, "div"),
          first  = target[0];

      expect(target.length).to.be.above(1);
      expect(first.parentNode.tagName).to.equal("BODY");
      expect(first.getAttribute("id")).to.equal("wrapper");
    });

    it("correctly locates an element by attribute", () => {
      var target = find(root, "[data-cool]");

      expect(target.tagName).to.equal("DIV");
      expect(target.className).to.equal("feature article");
      expect(target.getAttribute("data-cool")).to.equal("true");
    });

    it("correctly locates an element by pseudoclass", () => {
      var target = find(root, ":checked");

      expect(target.tagName).to.equal("INPUT");
      expect(target.getAttribute("type")).to.equal("checkbox");
      expect(target.getAttribute("checked")).to.exist;
      expect(target.parentNode.tagName).to.equal("LABEL");
    });

    it("correctly finds deeply nested elements", () => {
      var target = find(root, ".article-list-item");

      expect(target.tagName).to.equal("LI");
      expect(target.parentNode.className).to.equal("article-list");
    });

    it("returns the element if it's found", () => {
      var target = find(root, ".article-list-item");

      expect(target).to.be.an("object");
      expect(target.className).to.equal("article-list-item");
      expect(target.parentNode.tagName).to.equal("UL");
    });
    it("returns a array of elements if they're found", () => {
      var target = find(root, "div");

      expect(target).to.be.an("array");
      expect(target.length).to.be.above(1);
    });

    it("returns false if no element is found");
  });

  describe("query(selector)", () => {
    var root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    });

    it("correctly locates an element by tag name");
    it("correctly locates an element by attribute");
    it("correctly locates an element by pseudoclass");
    it("returns the element if it's found");
    it("returns false if no element is found");
  });

  describe("closest(element, selector)", () => {
    var root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    });

    it("correctly locates an element by tag name");
    it("correctly locates an element by attribute");
    it("correctly locates an element by pseudoclass");
    it("correctly returns element itself if it matches");
    it("returns the element if it's found");
    it("returns false if no element is found");
    
  });

  describe("parent(element)", () => {
    var root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    });

    it("correctly returns the parent element");

  });

  describe("children(element)", () => {
    var root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    }); 

    it("returns an array (or an element for one match)", () => {

    });
    it("returns an array of only element nodes");
  });

  describe("siblings(element, selector)", () => {
    var root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    }); 

    it("correctly returns all siblings of a given element");
    it("doesn't include itself in the result list");

  });
});
