# fQuery

I've been working on this functional implementation of jQuery.

Except it's not a functional implementation of jQuery, it's a functional implementation of:

- DOM traversal
- Element modification
- Markup creation
- Events

All sort of vaguely in the _style_ of jQuery. There's a genius in the brevity that Resig and the jQuery team have brought to the way that web developers interact with and modify the DOM. The API for fQuery is very similar in its naming conventions, the only difference being the way that these functions are called. 

## Why?

I wanted to make a jQuery-esque implementation that used all of my favorite parts of jQuery without all of the bloat. I decided to do this in a functional style for a few reasons:

- Stateless functions are amazing. You can always expect the output as a function of the input.
- Chaining - It's possible to chain these methods together a la lodash or some other functional equivalent.
- Dogfooding - I can reuse functions I've already defined in a fairly straightforward and understandable way!

_It's even ie8 compatible, too!_

## On the radar

- Events
