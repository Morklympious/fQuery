var expect   = require("chai").expect,
    _f       = require("../src/entry.js");

require("jsdom-global")();

describe("Classlist black box testing", () => {
  describe("Class manipulation", () => {
    var create = _f.markup.create,
        root; 

    beforeEach(() => {
      root = null; 
    });

    it("", () => {
      root = create("");

      expect(root instanceof DocumentFragment).to.be.true;
    });
    it("can create a single element", () => {
      root = create("<span>content</span>");

      expect(root.querySelector("span").tagName).to.equal("SPAN");
      expect(root.firstChild.tagName).to.equal("SPAN");
      expect(root.childNodes.length).to.equal(1);
    });

    it("can create nested elements inside of other elements", () => {
      var markup = "<ul> <li></li> <li></li> <li></li> </ul>";
      
      root = create(markup);

      expect(root.querySelectorAll("li").length).to.equal(3);
      expect(root.firstChild.tagName).to.equal("UL");
      expect(root.childNodes.length).to.equal(1);
    });

    it("can create elements with attributes", () => {
      var markup  = "<ul class='fire'> <li class='ice'></li> <li id='earth'></li> <li data-custom='true'></li> </ul>",
          root    = create(markup),
          list    = root.querySelector(".fire"),
          first   = root.firstChild,
          items   = root.querySelectorAll("li"),
          iOne    = root.querySelector(".ice"),
          iTwo    = items[1],
          iThree  = items[2]; 

      expect(items.length === 3);
      expect(root.querySelector("#earth")).to.equal(iTwo);
      expect(root.querySelector("[data-custom]")).to.equal(iThree);
      expect(first.tagName).to.equal("UL");
      expect(first.className).to.equal("fire");
      expect(root.querySelectorAll(".ice").length).to.equal(1);
      expect(((root.firstChild).firstChild)).to.equal(iOne);
      expect(root.childNodes.length).to.equal(1);
    });
  });

  describe("html(element, markup)", () => {
    var html = _f.markup.html,
        root;

    beforeEach(() => {
      root = document.createElement("div"); 
    });

    it("should be able to set markup", () => {
      var markup = "<ul> <li class='yo'></li> <li></li> <li></li> </ul>";

      html(root, markup);

      expect(root.childNodes.length).to.equal(1);
      expect(root.firstChild.tagName).to.equal("UL");
      expect(root.firstChild.childNodes.length).to.equal(3);
      expect(root.querySelectorAll("li").length).to.equal(3);
      expect(root.querySelectorAll(".yo").length).to.equal(1);
    });

    it("should be able to retrieve markup", () => {
       var markup = "<ul> <li class='yo'></li> <li></li> <li></li> </ul>";

      root.innerHTML = markup;

      expect(html(root)).to.equal("<ul><li class=\"yo\"></li><li></li><li></li></ul>");
    });

    it("should normalize markup to not have non-element nodes", () => {
       var markup = "<ul> <li class=\"yo\"></li> <li></li> <li></li> </ul>";

      root.innerHTML = markup;

      expect(html(root)).to.equal("<ul><li class=\"yo\"></li><li></li><li></li></ul>");
    });
  });

  describe("text(element, content)", () => {
    var text = _f.markup.text,
        root;

    beforeEach(() => {
      root = document.createElement("div"); 
    });

    it("sets text content", () => {
       var markup = "<div class=\"content\">this is premium content</div>";

      root.innerHTML = markup;
      text(root, "new stuff");

      expect(root.textContent || root.innerText).to.equal("new stuff");
    });

    it("retrieves text content", () => {
       var markup = "<div class=\"content\">this is premium content</div>";

      root.innerHTML = markup;
      expect(text(root)).to.equal("this is premium content");
    });


    it("retrieves text content nested 2 nodes deep", () => {
      var markup = "<div><span>this is nested content</span></div>";

      root.innerHTML = markup;
      expect(text(root)).to.equal("this is nested content");
    });

    it("replaces child elements with text nodes", () => {
      var markup = "<div><span>this is nested content</span></div>";

      root.innerHTML = markup;
      expect(text(root)).to.equal("this is nested content");

      text(root, "help");
      expect(root.childNodes.length).to.equal(1);
      expect(root.childNodes[0].nodeType).to.equal(Node.TEXT_NODE);
    });
  });
});
