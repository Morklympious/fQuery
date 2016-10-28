var mocha    = require("mocha"),
    expect   = require("chai").expect,
    Browser  = require("mock-browser").mocks.MockBrowser,
    document = (new Browser()).getDocument(),
    _f       = require("../src/entry.js");

describe("attr(element, attr, value)", function() {
  var root = document.createElement("div");

  it("should set attributes", function() {
    _f.node.attr(root, "data-cool", true);

    expect(root.getAttribute("data-cool")).to.equal("true");
  });

  it("should get attributes", function() {

  })
})