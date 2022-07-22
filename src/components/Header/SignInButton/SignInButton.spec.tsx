import { render, screen } from "@testing-library/react"
import { mocked } from 'jest-mock'
import { Session } from "next-auth"
import { useSession } from 'next-auth/react'
import { SignInButton } from "."

jest.mock('next-auth/react')

describe('SignInButton component', () => {

    it('renders log-in button when user is not authenticated', () => {

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce({data: null, status: "unauthenticated"})

        const {debug} = render(<SignInButton />)

        debug()

        expect(screen.getByText("Sign in with Github")).toBeInTheDocument()
    })

    it('renders log-out button when user is authenticated', () => {

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValue(
            {
                data: {
                    user: {
                        name: "don bob"
                    },
                } as Session,
                status: "authenticated"
            }
        )

        render(<SignInButton />)

        expect(screen.getByText("don bob")).toBeInTheDocument()
    })
})