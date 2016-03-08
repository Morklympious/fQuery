var m = require('mithril');
var css = require('../css/example.css');

module.exports = m('p', {class: css.paragraph}, [
  'This is coming from a component that has been imported via require. ',
  'The sky is the limit! Get to work!'
]);
