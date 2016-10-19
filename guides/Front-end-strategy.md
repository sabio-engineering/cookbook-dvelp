# Front-end strategy

### What we use

#### Foundation 6 framework

Use only required components and libraries. We don't need to use normalize with Foundation 6, it included in foundation-global-styles mixin.

#### Grunt

Use grunt tasks for creating svg sprites. You can use `grunt` command to run grunt tasks.

#### Autoprefixer

Use Autoprefixer gem or Autoprefixer of [grunt-postcss](https://github.com/nDmitry/grunt-postcss) task in Shopify projects.

#### Bower

Use bower with bower installer to manage libraries and control their versions. [Using front-end libraries](https://github.com/DVELP/cookbook/blob/front-end-strategy/guides/Using%20front-end%20libraries.md)

#### Front-man

[Front-man](https://github.com/DVELP/front_man) is a gem that includes utilities classes, z-index variables and helpers for sprite and image tags.

#### Frequently used plugins

* [Lazysizes](https://github.com/aFarkas/lazysizes) is a lazyloader for images, background images. Use only the necessary components. Usually the additional components are:
  * ls.bgset.js - for responsive background images, 
  * ls.respimg.js - for cross browser responsive image support,
  * lazysizes.js - main file
* [Slick](https://github.com/kenwheeler/slick) is a plugin for sliders, carousels.
* [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup) is a responsive jQuery Lightbox plugin.

#### Development and page optimization

* Mobile-First development method - it is more efficient and future-friendly.
* Svg files for sprites should be cleaned. Without extra tags like <clipPath>, <defs>, which can cause problems in IE browser, icons can't be displayed at all. If we need to change the colour of icons they should be cleaned of fill attributes or stroke, depending on the type of icon.
* Use svg sprites.
* Optimize Images. All images (.jpg, .png) should be optimized. They can be saved for web via Photoshop at least or optimized using specialized services/tools.
* Put JS files at the bottom of page. 
* Minimize HTTP Requests. JS and CSS files should be combined into a single file and minimised.
* Avoid fixing layout with javascript. If you can, try to use only css styles and avoid js.
* Trying to reduce the number of DOM Elements.

#### Page speed testing

Page speed can be checked in DevTools in Chrome browser on Network tab. There you can find information about the amount of requests, speed of DOMContentLoad and page load.
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) - service that analyzes the page speed and recommends how it can be improved for both the desktop and mobile versions of a site. 
[GTmetrix](https://gtmetrix.com/) - tool which measures the speed of the site and gives recommendations for improvements.

###### What we can improve

* Use ESLint - tool that analyses javascript code and points out potential problem areas, bad coding styles. Create a common settings for the team in .eslintrc file and use it in your IDE at least and follow its instructions. 
* Rethink some of the front-man components. We can remove _pollyfills.scss file if we use Autoprefixer and remove some classes from _utility.scss file that are used rarely.
