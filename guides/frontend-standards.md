# Front-end Standards

### Motivation

As the Front-end team grows, we would need to agree on both standards to apply to our code, as well as conventions, methods, patterns and tools to use.

As one said: “_A team should be producing code as if only one person has written all of it_”

### Table of Contents

We are going to touch on the following subjects:

* [Code styling](#code-styling)
* [Linting](#linting)
* [Styleguides](#styleguides)
* [Testing](#testing)
* [Using types](#using-types)
* [CSS Styling](#css-styling)
* [Project structure](#project-structure)
* [APIs](#apis)
* [Error collection](#error-collection)

### Code Styling

> "A team should write code as if only one person has written it".

In this regard, the team has chosen to work with **Prettier**, as code parser, so we can better read code output and be familiar with how it’s written.

We ideally want a strategy of pre-commit hooks to format output code.

References:
[Prettier](https://prettier.io/)
[Editorconfig](http://editorconfig.org/)

### Linting

While Prettier is going to do the heavy lifting of parsing our code and re-writing it to it's final state, we are going to set up some **ESLint/TSLint** linting rules with immediate feedback on our code editors.

We are going to use AirBnB configuration initially, and customize different rules later on to our heart’s content.

References:
[ESLint](https://eslint.org/)
[TSLint](https://palantir.github.io/tslint/)
[Prettier-ESLint](https://github.com/prettier/prettier-eslint)


### Styleguides

For larger projects, which probably need to define a design style guide for components, we are going to be able to present with the components visuals and their options for anyone in the team to check, know how to use, discuss, access the code, and as a way to preserve cohesion with the other components in the same project.

[Styleguidist](https://react-styleguidist.js.org/)

We have already started several projects with React **Styleguidist**, a solution that also allows us to publish those style guides online for easier sharing.

[Styleguide for WIT example:](https://styleguide-ctwntzsstw.now.sh/)

[Styleguide for Opsmatix example:](https://styleguide-rpjxdqiehe.now.sh/)

We agreed to improve our newer style guides from now on with code view, so it's easier for the whole team to use the defined components.

### Testing

> **"Good tests make good documentation"** someone said.

In modern front-end development there is little room for delivering badly tested software, patching over patched code, and not covering edge cases.

We have selected to use **Jest** as a testing assertion framework, with **Enzyme** for it's component testing capabilities. For the UI we are already going to use a component styleguide. We also decided not to keep snapshots as they can be tricky to provide context on the output.

For E2E testing, we will be relying on **Cypress**.

References:
[Jest](https://facebook.github.io/jest/)
[Enzyme](http://airbnb.io/enzyme/)
[Cypress.io](https://www.cypress.io/)


### Using types

In order to enhance code quality and understandability, and reduce bugs by using interfaces (data contracts) we have chosen to keep working with **TypeScript**, as the language for all our future projects.

As the team adjusts to this, we would go from a very loose set of rules to a more strict set whenever everyone feels comfortable with it. We have established we want to write code according to AirBnB set of rules, tweaked to throw warnings to keep learning the particularities of the language.

We can also test new version features from different packages as non-typed modules by tricking the TypeScript compiler to work around them.
```
const React = require(‘react’); // inside as .ts for cutting edge
import * as React from ‘react’; // looks @types/ folder for types definitions
```

We are nevertheless going to have workshops and learning events so everyone gets to leverage this technology as soon as possible.

### CSS Styling

We are skilled enough to select a wide range of css styling solutions when starting a new project.

As we are mainly working with React at the moment, and per project basis, we would be using either **PostCSS/CSSModules** or **Styled-Components**.

### Project structure

Having a good solid project structure for our code makes it easier for developers to find components, logic, utility code, in a stress-free and fast way.

Although each project would need different approaches and choices in technology, we would like to define a good base of common ground.

```
build/
src/
  app/
	  client/
    server/ (in case of SSR)
  styles/ (if needed)
  core/
	  App.js
	  Routes.js (if needed)
	  ...
  common/
	  layouts/
	  components/
  	containers/
	controls/
	dataViews/
	utils/ (maybe utility components?)
	...
  utils/ (utility functions to be shared)
  ...
(modules || pages) /
	Module-1/
	Module-2/
```


### APIs

We recommend the use of **GraphQL** if possible, as it makes it easier for front-end developers to access just the data they need and in the particular structure is more useful for the piece being developed.

### Error collection

Collecting errors on production environments and acting accordingly to solve the major issues should be one of our priorities. We are using **Sentry.io** for error collecting and notifications, both in the back and front ends, which integrates easily with most common JavaScript code.

[Sentry.io](https://docs.sentry.io/clients/javascript/)

### TL;DR;
