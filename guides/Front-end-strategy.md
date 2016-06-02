# Front-end strategy

### What we use
####Foundation 6 framework
Use only required components and libraries. We don't need to use normalize with Foundation 6, it included in foundation-global-styles mixin.

####Grunt
Use grant tasks for creating svg sprites

####Autoprefixer
Use Autoprefixer gem or Autoprefixer of [grunt-postcss](https://github.com/nDmitry/grunt-postcss) task in Shopify projects.

####Bower
Use bower with bower installer for manage libraries and control their versions.

####Front-man
It includes utilities classes, z-index variables and helpers for sprite and image tags.

####Frequently used plugins
* [Lazysizes](https://github.com/aFarkas/lazysizes) Lazyloader for images, background images. Use only the necessary components. Usually the additional components is:
  ls.bgset.js - for responsive background images, 
  ls.respimg.js - for cross browser responsive image support,
  lazysizes.js - main file
* [Slick](https://github.com/kenwheeler/slick) Plugin for sliders, carousel
* [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup) jQuery Lightbox plugin.

####Development and page optimization
* Mobile-First development method - it is more efficient and future-friendly.
* Svg files for sprites should be cleaned. Without extra tags like <clipPath>, <defs>, which can cause problems in IE browser, icons can't be displayed at all. If we need to change color of icons they should be cleaned of fill attributes or stroke,  depends on the type of icon.
* Use svg sprites.
* Optimize Images. All images (.jpg, .png) should be optimized. They can be saved for web via Photoshop at least or optimized using specialized services/tools.
* Put JS files at the bottom of page. 
* Minimize HTTP Requests. JS and CSS files should be combined into a single file and minified.
* Avoid fixing layout with javascript. If there is an opportunity to do some features using only css styles better to do it without js.
* Trying to reduce the number of DOM Elements.

####Page speed testing
Page speed can be checked in DevTools in Chrome browser on Network tab. There is shown information about amount of requests, speed of DOMContentLoad and page load.
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) - service that analyzes the page speed and gives recommendations how it can be improved for both the desktop and mobile versions of a site. 
[GTmetrix](https://gtmetrix.com/) - tool which measures the speed of the site and gives recommendations for improve it.

######What we can improve
* Use ESLint - tool that analyses javascript code and points out potential problem areas, bad coding styles. Create a common settings for the team in .eslintrc file and use it in your IDE at least and follow its instructions. 
* Rethink some of the front-man components. We can remove pollyfills because of uselessness if we use Autoprefixer and remove some classes from utility file that are used rarely.
