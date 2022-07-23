import { fireEvent, render, screen } from "@testing-library/react"
import { useSession, signIn } from "next-auth/react"
import { SubscribeButton } from "."
import { mocked } from 'jest-mock'

jest.mock('next-auth/react', () => {
    return {
        useSession() {
            return {
                data: undefined,
                status: "unauthenticated"
            }
        },
        signIn: jest.fn(), // void functions can use this jest function that has no return
    }
})
jest.mock('next/router')

describe('SubscribeButton component', () => {

    it('renders subscribe button', () => {
        
        render(<SubscribeButton />)

        expect(screen.getByText("Subscribe now")).toBeInTheDocument()
    })

    it('redirects user to signin when not authenticated', () => {

        const signInMock = mocked(signIn)

        render(<SubscribeButton/>)

        const subscribeButton = screen.getByText("Subscribe now")

        fireEvent.click(subscribeButton)

        expect(signInMock).toHaveBeenCalled()
    })

})