# Stackpack
_What is this garbage?_ you say, staring into the void of this repository.

Well, my friend, _this_ garbage is a boilerplate featuring [Browserify](http://browserify.org/) and [Modular CSS](https://github.com/tivac/modular-css)!

A while back I wrote a boilerplate that used Webpack and allowed you to bundle your scripts
in such a way that you wouldn't hate your life setting up a build process.

This is much the same, but it has a few opinions.

## How do I even?

Pretty simple, actually!

- `npm install` for grabbing the dependencies.
- `npm run build` to output your bundled scripts into the `dist` directory.
- `npm run develop` to watch your files, rebuild on save, and also run a server at `:8080`
- `npm run lint` to run a fine-toothed comb through it via Eslint.

## Opinions
- [Browserify](http://browserify.org/) - It uses browserify to bundle stuff, and a few plugins to help you develop faster,
namely `watchify` for compile-on-save

- [Modular CSS](https://github.com/tivac/modular-css) - Modular CSS because back in the day when I tried React.js, I was using js
style properties and hooking them into a `style` attribute on a virtual dom element. This is
a much cleaner, more familiar way of approaching that same obstacle.

- [Eslint](http://eslint.org/) - Because whatever dude, why don't you fight me about linting my code? It's currently set
to use the Google preset, but you can just as easily change that by `npm install`ing your favorite
preset.

- [Mithril.js](http://mithril.js.org/) - Yes, this comes with Mithril. I included it simply because I think this sort of workflow is
ideal for a virtual DOM library. You're free to swap it out for any Virtual DOM library of your choice.
Maybe you're going to go rogue and you don't NEED a virtual DOM library, but honestly that's one of the
things that makes Modular CSS so good in this build. You don't need a Virtual DOM? GET OUTTA HERE.

## Anything else?

If I dropped the ball on anything here, please, let me know! Submit a PR! Help me make this great! :D
