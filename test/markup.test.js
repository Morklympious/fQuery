var mocha    = require("mocha"),
    expect   = require("chai").expect,
    fs       = require("fs"),
    Browser  = require("mock-browser").mocks.MockBrowser,
    window   = new Browser(),
    document = window.getDocument(),

    _f       = require("../src/entry.js"),
    mock     = fs.readFileSync("./test/html/structure.html");


describe("Markup tests", () => {
  
});
