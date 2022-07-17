# Automated Tests on React.JS

## Installing testing libs

Run the following command: `yarn add -D jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest`

`testing-library` is one of the most famous libraries for automated tests in JS and is used for react, vue, angular, etc.

Create a `jest.config.js` file and add the basic configuration (refer to commit). 
The `transform` property is at some extend similar to webpack's loaders as jest does not work with typescript but with with vanilla js - using babel convert from TS to JS.

_<rootDir> is a jest's annotation and means the same dir where the jest config file is_

