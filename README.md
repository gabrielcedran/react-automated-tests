# Automated Tests on React.JS

## Installing testing libs

Run the following command: `yarn add -D jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest`

`testing-library` is one of the most famous libraries for automated tests in JS and is used for react, vue, angular, etc.

Create a `jest.config.js` file and add the basic configuration (refer to commit). 
The `transform` property is at some extend similar to webpack's loaders as jest does not work with typescript but with with vanilla js - using babel convert from TS to JS. To support CSS, the `moduleNameMapper` can be used.

_<rootDir> is a jest's annotation and means the same dir where the jest config file is_


### Mocking modules and functions

To mock modules and functions with Jest is super simple. Simply call the function `mock` of the `jest` module providing the first parameter
as the module being mocked and the second the functions that are being mocked.

Example:

```
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('Description', () => {

    test('narrative', () => {
        // at this point, next/router module is already mocked and returning `asPath` as `/` whenever the `useRouter` function is being called.
    })
})

```

#### Mocking different results for each test case

The previous approach will yield the same result for all the tests within the same test file. Bringing the mock set up inside the tests won't work.

In order to enable results variation within the same test file, it is necessary to use the lib `jest-mock` - `yarn add jest-mock -D`.

With this lib in place, the following extra steps must be done:

1. the function that will be mock has to be imported as though it was going to be used
2. wrap the function with the `mocked` function coming from the `jest-mock`
3. define what will be returned once it is called with the in place function `mockReturnValue`

ps. the jest.mock remains, however the return is not defined in it.

Example:

```
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';

jest.mock('next/router')

describe('Description', () => {

    test('narrative', () => {

        const useRouterMocked = mocked(useRouter)
        useRouterMocked.mockReturnValue({
            asPath: '/'
        } as NextRouter) // each test can mock its own return

        render(...)
        ...
    })
})

```

_for more details, refer to commit_


