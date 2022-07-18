// this render will create a virtual component so that it can be tested in isolation.
import { render } from '@testing-library/react'
import { ActiveLink } from '.'

// mocks this module. It returns the mocked function and what it will return
// this approach works for both 3rd party libs and internal modules
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink component tests', () => {

    test('active link renders correctly', () => {
        const {debug, getByText} = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        debug()
        expect(getByText("Home")).toBeInTheDocument()
    })
    
    it('hightlights the active link when the path matches the link', () => {
        const {getByText} = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(getByText("Home")).toHaveClass('active')
    })
})
