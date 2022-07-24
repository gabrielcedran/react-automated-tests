import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import PostPreview from "../../pages/posts/preview/[slug]"

jest.mock('next-auth/react', 
/* example of generic mock
() => {
    return {
        useSession() {
            return {
                data: null
            }
        }
    }
}*/)

jest.mock('next/router', 
/* example of generic mock() => {
    return {
        useRouter() {
            return {
                push: () => {console.log("redirecting")}
            }
        }
    }
}*/)

describe('Preview page', () => {
    it('renders preview correctly', () => {

        const useSessionMock = mocked(useSession)
        useSessionMock.mockReturnValueOnce({
            data: {
                activeSubscription: false
            }
        } as any)

        render(
            <PostPreview post={{
                slug: 'slug1',
                title: 'New Title',
                content: '<p>Post Content</p>',
                updatedAt: '04 de Julho de 2022'
                }}
            />
        )
        const titleElement = screen.getByText("New Title")
        expect(titleElement).toBeInTheDocument()
        expect(titleElement.nextElementSibling).toHaveTextContent("04 de Julho de 2022")
        expect(titleElement.nextElementSibling.nextElementSibling).toHaveTextContent("Post Content")
        expect(screen.getByText("Subscribe now")).toBeInTheDocument()
    })

    it('redirects to post when there is an active subscription', () => {
        const useSessionMock = mocked(useSession)
        useSessionMock.mockReturnValueOnce({
            data: {
                activeSubscription: true
            }
        } as any)

        const pushMock = jest.fn()
        const useRouterMock = mocked(useRouter)
        useRouterMock.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(
            <PostPreview post={{
                slug: 'slug1',
                title: 'New Title',
                content: '<p>Post Content</p>',
                updatedAt: '04 de Julho de 2022'
                }}
            />
        )

        expect(pushMock).toHaveBeenCalledWith('/posts/slug1')
    })
})