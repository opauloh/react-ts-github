# react-ts-github

Create React application using TypeScript that connects to the GitHub API.

## Features

- GitHub repository search
- Profile page
- Repository list

## Requirements

User has to be able to search for a particular GitHub account name, and if there is
a match application has to display:

- User profile (profile picture, username and email, link to GitHub profile)
- Repository list (full repo name and repo description, link to GitHub repo)

User has to be able to sort repositories by name.
User repositories should be cached in order to assure immediate access of user
data if the same search is executed.
Component and application styling is required

## Dependencies

- react: The aim of this project, is a JavaScript library for creating user interfaces and handle stage management.
- react-dom: In this project is the entry point to the DOM for React

## Dev Dependencies

- typescript : Another requirement for this project, it mades developer's life easier by executing javascript Type checks in development time, preventing a lot of unexpected runtime errors
- @babel/core: This package is core of the Babel, Babel is a compiler used to execute transformations on javascript, like transform ECMA 6 javascript to ECMA 5, for better compatibility, and support plugins to load javascript, and assets as well.
- @babel/preset-env: This package is used to allow Babel transpile the Javascript necessary accordinly to the necessary target browsers, by used public data from open source projects, the plugin knows if the browser is dead, or used by less than 0.x% of people, so it can transpile only the needed, used to have always the most advanced javascript running, according to the public target (you can specify specific browsers and versions to support as well).
- @babel/preset-react: This is a Babel preset, and is used to convert JSX syntax to React's Syntax, like from <div>Hello</div> to React.
- @babel/preset-typescript: This is a Babel preset, and is recommended if you use TypeScript, a typed superset of JavaScript. It includes the plugins "@babel/plugin-transform-typescript" that adds support for the syntax used by the TypeScript programming language. However, this plugin does not add the ability to type-check the JavaScript passed to it. For that, we will need to install and set up TypeScript
