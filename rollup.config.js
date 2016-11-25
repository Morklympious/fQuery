var buble  = require("rollup-plugin-buble"),
    uglify = require("rollup-plugin-uglify");

module.exports = {
    entry   : "./src/entry.js",
    dest    : "./dist/bundle.js",
    format  : "umd",
    moduleName : "fQuery",
    plugins : [ buble(), uglify() ]
};
