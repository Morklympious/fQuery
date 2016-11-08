var mocha    = require("mocha"),
    expect   = require("chai").expect,
    fs       = require("fs"),

    _f       = require("../src/entry.js"),
    mock     = fs.readFileSync("./test/html/structure.html");

require("jsdom-global")();

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

    it("returns empty array if no element is found", () => {
      expect(find(root, ".nonexistent-element")).to.be.ok;
      expect(find(root, ".nonexistent-element").length).to.equal(0);
      expect(find(root, ".nonexistent-element")).to.be.an("array");
    });
  });

  describe("query(selector)", () => {
    it("is a facade pattern for find()", () => {
     expect(true); 
    });
  });

  describe("closest(element, selector)", () => {
    var closest = _f.dom.closest,
        root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    });

    it("correctly locates an element by tag name", () => {
      var child  = root.querySelector("#item-one"),
          target = closest(child, "div");

      expect(target.tagName).to.equal("DIV");
      expect(target.className).to.equal("simple article");
    });

    it("correctly locates an element by attribute", () => {
      var child  = root.querySelector("#item-one"),
          target = closest(child, "[data-neat]");

      expect(target.tagName).to.equal("DIV");
      expect(target.id).to.equal("content");
    });

    it("correctly locates an element by pseudoclass", () => {
      var child  = root.querySelector("#checkbox"),
          target = closest(child, ":checked");

      expect(target.tagName).to.equal("INPUT");
      expect(target.getAttribute("checked")).to.equal("");
      expect(target.getAttribute("type")).to.equal("checkbox");
    });

    it("correctly returns element itself if it matches", () => {
      var child  = root.querySelector("#checkbox"),
          target = closest(child, ":checked");

      expect(target.tagName).to.equal("INPUT");
      expect(target.getAttribute("checked")).to.equal("");
      expect(target.getAttribute("type")).to.equal("checkbox");
    });
    it("returns the element if it's found", () => {
      var child  = root.querySelector("#checkbox"),
      target = closest(child, "form");

      expect(target.tagName).to.equal("FORM");
    });

    it("returns empty array if no element is found", () => {
      var child  = root.querySelector("#checkbox"),
      target = closest(child, ".nonexistent-element");

      expect(target).to.be.an("array");
      expect(target).to.be.empty;
    });
  });

  describe("parent(element)", () => {
    var parent = _f.dom.parent,
        root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    });

    it("correctly returns the parent element", () => {
      var checkbox = root.querySelector("#checkbox"),
          feature  = root.querySelector(".feature");

      expect(parent(checkbox).tagName).to.equal("LABEL");
      expect(parent(feature).tagName).to.equal("DIV");
      expect(parent(feature).id).to.equal("content");
    });
  });

  describe("children(element)", () => {
    var children = _f.dom.children,
        root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    }); 

    it("returns an array (or an element for one match)", () => {
      var content = root.querySelector("#content");

      expect(children(content)).to.be.an("array");
      expect(children(content).length).to.equal(3); 
    });

    it("returns an array of only element nodes", () => {
      var content  = root.querySelector("#content"),
          childs = children(content);

      expect(childs[0].nodeType).to.equal(1);
      expect(childs[1].nodeType).to.equal(1);
      expect(childs[2].nodeType).to.equal(1); 
    });
  });

  describe("siblings(element, selector)", () => {
    var siblings = _f.dom.siblings,
        root;

    beforeEach(() => {
      root = document.createElement("html");
      root.innerHTML = mock;
    }); 

    it("correctly returns all siblings of a given element", () => {
      var content = root.querySelector(".feature.article");

      expect(siblings(content).length).to.equal(2);
      expect(siblings(content)[0].className).to.equal("simple article");
      expect(siblings(content)[0].tagName).to.equal("DIV");
      expect(siblings(content)[1].className).to.equal("");
      expect(siblings(content)[1].tagName).to.equal("FORM");
    });

    it("doesn't include itself in the result list", () => {
      var content = root.querySelector(".feature.article");

      expect(siblings(content).indexOf(content)).to.equal(-1);
      expect(siblings(content)[0].className).to.equal("simple article");
    });

  });
});
