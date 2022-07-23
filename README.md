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

        const useRouterMock = mocked(useRouter)
        useRouterMock.mockReturnValue({
            asPath: '/'
        } as NextRouter) // each test can mock its own return

        render(...)
        ...
    })
})

```

_for more details, refer to commit_


### Emulating events on html elements

In order to emulate events (and user actions) on html, it is just a matter of getting the element (e.g screen.getByText(...)) and passing it down to the desired event function of the fireEvent component.

```
import { fireEvent, render, screen } from "@testing-library/react"

...

    render(<SubscribeButton/>)

    const subscribeButton = screen.getByText("Subscribe now")

    fireEvent.click(subscribeButton)
```



### Inspecting that a function has been called

When it is necessary to check that a given function has been called all that needs to be done is (1) mock the element similarly to the previous example (jest.mock, mock the function's results) (2) decorate the function with the `mocked` function (3) inspect that it's been called with the `expect` matcher.

Example:

```
jest.mock('next-auth/react', () => {
    return {
        signIn: jest.fn(), // void functions can use this jest function that has no return
    }
})


describre('description', () => {
    it('redirects user to signin when not authenticated', () => {
        const signInMock = mocked(signIn)
        ...
        expect(signInMock).toHaveBeenCalled()

    })
})
```

It could be a global mock like this or one specific by test.