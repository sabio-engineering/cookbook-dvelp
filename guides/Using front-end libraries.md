# Using front-end libraries

Using Bower to manage javascript components.

Install Bower: 

```
npm install -g bower
```

You can use `bower init` to create new `bower.json` file.

Now we can install packages with `bower install <package> --save`

```
bower install jquery --save
```

Use files only that you need while using Bower-installer

Install `bower installer` globally

```
npm install -g bower-installer
```

Specify the path in `bower.json` you would like to use

```
  "install": {
    "path": {
      "css": "assets/stylesheets/vendor",
      "scss": "assets/stylesheets/vendor",
      "js": "assets/javascripts/vendor"
    }
  }
```

#### Ignore files

Files can be ignored and not copied. For example, some libraries can have dependencies that we don't want to use so we can ignore them.

```
    "ignore": [
      "fastclick",
      "jquery-placeholder"
    ],
```

#### Overriding main files

A lot of registered components for bower do not include bower.json configuration. Therefore, bower does not know about any "main files" and therefore, by default bower-installer doesn't know about them either. Bower-installer can override an existing main file path or provide a non-existant one:

```
  "install": {
    "sources": {
        "lazysizes": [
            "bower_components/lazysizes/plugins/bgset/ls.bgset.js",
            "bower_components/lazysizes/plugins/respimg/ls.respimg.js",
            "bower_components/lazysizes/plugins/respimg/ls.parent-fit.js",
            "bower_components/lazysizes/lazysizes.js"
        ],
    }
  }
```

#### Rename files

Files can be renamed when bower-installer copies them to their new destination.

```
  "install": {
    "sources": {
      "slick-carousel": {
          "mapping": [
            {
              "bower_components/slick-carousel/slick/slick.js": "slick.js"
            },
            {
              "bower_components/slick-carousel/slick/slick.scss": "_slick.scss"
            }
          ]
      },
    }
  }
```
