import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import { getSession } from "next-auth/react"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"
import { getPrismicClient } from "../../services/prismic"

jest.mock('next-auth/react', 
/* example of generic mock
() => {
    return {
        getSession() {
            return {
                activeSubscription: 'true'
            }
        }
    }
}
*/
)

jest.mock('../../services/prismic', 
/* example of generic mock
() => {
    return {
        getPrismicClient() {
            return {
                getByUID() {
                    return {
                        data: {
                            title: [{
                                type: 'heading',
                                text: 'Title 1'
                            }],
                            content: [{
                                type: 'paragraph',
                                text: 'Paragraph one',
                                spans: []
                            }]
                        },
                        last_publication_date: '01-04-2022'
                    }
                }
            }
        }
    }
}*/
)

describe('Post page', () => {

    it('renders post correctly', () => {
        render(<Post post={{
            slug: 'slug1',
            title: 'title 1',
            content: 'Content 1',
            updatedAt: '01 de abril de 2021'
        }}/>)

        const titleElement = screen.getByText("title 1")
        expect(titleElement).toBeInTheDocument()
        expect(titleElement.nextSibling).toHaveTextContent("01 de abril de 2021")
        expect(titleElement.nextSibling.nextSibling).toHaveTextContent("Content 1")
    })

    it('loads initial data as expected with subscription (getServerSideProps)', async () => {
        const getSessionMock = mocked(getSession)
        getSessionMock.mockResolvedValueOnce({
            activeSubscription: true
        } as any)

        const getPrismicClientMock = mocked(getPrismicClient)
        getPrismicClientMock.mockReturnValueOnce({
            getByUID: () => {
                return {
                    data: {
                        title: [{
                            type: 'heading',
                            text: 'Title 1'
                        }],
                        content: [{
                            type: 'paragraph',
                            text: 'Paragraph one',
                            spans: []
                        }]
                    },
                    last_publication_date: '01-04-2022'
                }
            }
        } as any)
        
        const response = await getServerSideProps({req: {} as any, params: {slug: "abc"}} as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: "abc",
                        title: "Title 1",
                        content: "<p>Paragraph one</p>",
                        updatedAt: "04 de janeiro de 2022"
                    }
                }
            })
        )
    })

    it('redirects to home if there is no subscription (getServerSideProps)', async () => {
        const response = await getServerSideProps({req: {}, params: {}} as any)

        expect(response).toEqual(expect.objectContaining(
            {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        ))
    })
})