var mocha    = require("mocha"),
    expect   = require("chai").expect,
    Browser  = require("mock-browser").mocks.MockBrowser,
    document = (new Browser()).getDocument(),
    _f       = require("../src/entry.js");


describe("DOM traversal operations", () => {

  describe("find(element, selector)", () => {
    var find = _f.dom.find,
        root,
        childOne,
        childTwo;

    beforeEach(() => {
      root = document.createElement("div");
      childOne = root.appendChild(document.createElement("div"));
      childTwo = root.appendChild(document.createElement("div"));
      
      childOne.innerHTML =  "<span id='little-one'>";
      childOne.innerHTML += "  <p data-content='none'></p>";
      childOne.innerHTML += "</span>";
    });

    it("correctly locates an element by tag name", () => {
      var target = find(root, "span");
      console.log(target.childNodes);
      expect(target.tagName).to.equal("SPAN");
      expect(target.parentNode.tagName).to.equal("DIV");
      expect(target.getAttribute("id")).to.equal("little-one");
      //expect(target.firstChild.tagName).to.equal("P");
    });

    it("correctly locates an element by attribute", () => {
     
    });

    it("correctly locates an element by pseudoclass");
    it("correctly finds deeply nested elements");
    it("returns the element if it's found");
    it("returns a array of elements if they're found");
    it("returns false if no element is found");
  });

  describe("query(selector)", () => {
    var root,
        childOne,
        childTwo;

    beforeEach(() => {
      root = document.createElement("div");
      childOne = root.appendChild(document.createElement("div"));
      childTwo = root.appendChild(document.createElement("div"));
    });

    it("correctly locates an element by tag name");
    it("correctly locates an element by attribute");
    it("correctly locates an element by pseudoclass");
    it("returns the element if it's found");
    it("returns false if no element is found");
  });

  describe("closest(element, selector)", () => {
    var root,
        childOne,
        childTwo;

    beforeEach(() => {
      root = document.createElement("div");
      childOne = root.appendChild(document.createElement("div"));
      childTwo = root.appendChild(document.createElement("div"));
    });

    it("correctly locates an element by tag name");
    it("correctly locates an element by attribute");
    it("correctly locates an element by pseudoclass");
    it("correctly returns element itself if it matches");
    it("returns the element if it's found");
    it("returns false if no element is found");
    
  });

  describe("parent(element)", () => {
    var root,
        childOne,
        childTwo;

    beforeEach(() => {
      root = document.createElement("div");
      childOne = root.appendChild(document.createElement("div"));
      childTwo = root.appendChild(document.createElement("div"));
    });

    it("correctly returns the parent element");

  });

  describe("children(element)", () => {
    var root,
        childOne,
        childTwo;

    beforeEach(() => {
      root = document.createElement("div");
      childOne = root.appendChild(document.createElement("div"));
      childTwo = root.appendChild(document.createElement("div"));
    }); 

    it("returns an array (or an element for one match)");
    it("returns an array of only element nodes");
  });

  describe("siblings(element, selector)", () => {
    var root,
        childOne,
        childTwo;

    beforeEach(() => {
      root = document.createElement("div");
      childOne = root.appendChild(document.createElement("div"));
      childTwo = root.appendChild(document.createElement("div"));
    }); 

    it("correctly returns all siblings of a given element");
    it("doesn't include itself in the result list");

  });
});
