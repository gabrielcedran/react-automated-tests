import { queryByText, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { Async } from "."

describe('Async component', () => {
    it('renders the button one correctly - method 1', async () => {
        render(
            <Async/>
        )

        expect(screen.getByText("Example of how to test things that are async")).toBeInTheDocument()

        // findByText awaits that element to show up in the screen - it is necessary to turn the function async and add the await
        expect(await screen.findByText("Button One")).toBeInTheDocument()

        // jest has a default timeout. If it is not enough it is possible to fine tune the timeout as the following:
        expect(await screen.findByText("Button One", {}, {timeout: 1000})).toBeInTheDocument()
    })

    it('renders the button one correctly - method 2', async () => {
        render(
            <Async/>
        )

        expect(screen.getByText("Example of how to test things that are async")).toBeInTheDocument()

        await waitFor(() => {
            // it will keep polling thus no need for the findByText
            return expect(screen.getByText("Button One")).toBeInTheDocument()
        })
        
        await waitFor(() => {
            // it will keep polling thus no need for the findByText
            return expect(screen.getByText("Button One")).toBeInTheDocument()
        }, {
            timeout: 1000
        })
    })

    it('removes button two - method 1', async () => {
        render(<Async />)

        expect(screen.getByText("Example of how to test things that are async")).toBeInTheDocument()

        // with this approach, jest ensures that the element is first visible before being removed. With the next one, the test will pass as long as the element is never found.
        await waitForElementToBeRemoved(screen.queryByText("Button Two"))
    })

    it('removes button two - method 1', async () => {
        render(<Async />)

        expect(screen.getByText("Example of how to test things that are async")).toBeInTheDocument()

        await waitFor(() => expect(screen.queryByText("Button Twos")).not.toBeInTheDocument())
    })
})

// get functions search for an element synchronously
// find functions search for an element asynchronously and awaits until it finds
// query functions search for an element and if it doesn't find, it does not fail - it is also asynchronous.