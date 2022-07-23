import { fireEvent, render, screen } from "@testing-library/react"
import { useSession, signIn } from "next-auth/react"
import { NextRouter, useRouter } from 'next/router'
import { SubscribeButton } from "."
import { mocked } from 'jest-mock'

jest.mock('next-auth/react')
jest.mock('next/router')

describe('SubscribeButton component', () => {

    it('renders subscribe button', () => {
        const useSessionMock = mocked(useSession)
        useSessionMock.mockReturnValueOnce({
                data: undefined,
                status: "unauthenticated"
            })

        render(<SubscribeButton />)

        expect(screen.getByText("Subscribe now")).toBeInTheDocument()
    })

    it('redirects user to signin when not authenticated', () => {
        const useSessionMock = mocked(useSession)
        useSessionMock.mockReturnValueOnce({
                data: undefined,
                status: "unauthenticated"
            })

        const signInMock = mocked(signIn)

        render(<SubscribeButton/>)

        const subscribeButton = screen.getByText("Subscribe now")

        fireEvent.click(subscribeButton)

        expect(signInMock).toHaveBeenCalled()
    })

    it('redirects to posts when user already has a subscription', () => {

        const useSessionMock = mocked(useSession)
        useSessionMock.mockReturnValueOnce({
            data: {
                activeSubscription: true,
                expires: "expires-mock"
            },
            status: "authenticated"
        })


        /**
         * this is complicated but: we need to mock the push function that comes from useRouter therefore:
         * we need to mock useRouter and return a mocked push function when it is called. It is 
         * a kind of nested mocking.
         */
        const pushMock = jest.fn()

        const useRouterMock = mocked(useRouter)
        useRouterMock.mockReturnValueOnce({
            push: pushMock
        } as unknown as NextRouter)

        render(<SubscribeButton />)

        // when
        const subscribeButton = screen.getByText("Subscribe now")
        fireEvent.click(subscribeButton)

        // then
        expect(pushMock).toHaveBeenCalledWith('/posts')
    })

})