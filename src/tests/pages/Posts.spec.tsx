import { Client } from "@prismicio/client"
import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import Posts, {getStaticProps} from "../../pages/posts"
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic', 
/* example of generic mock
() => {
    return {
        getPrismicClient() {
            return {
                getAllByType() {
                    return [{
                        uuid: 'slug1',
                        data: posts[0]
                    },
                    {
                        uuid: 'slug2',
                        data: posts[1]
                    }]
                }
            }
        }
    }
}*/
)

const posts = [{
    slug: 'slug1',
    title: 'title 1',
    excerpt: 'Excerpt 1',
    updatedAt: '10/10/2010'
}, {
    slug: 'slug2',
    title: 'title 2',
    excerpt: 'Excerpt 2',
    updatedAt: '11/11/2022'
}]

describe('Posts page', () => {
    it('renders as expected', () => {
        
        const {debug} = render(<Posts posts={posts}/>)

        const post1 = screen.getByText("title 1")
        expect(post1).toBeInTheDocument
        expect(post1.nextElementSibling).toHaveTextContent("Excerpt 1")
        expect(post1.previousElementSibling).toHaveTextContent("10/10/2010")
        expect(post1.closest("a")).toHaveAttribute("href", "/posts/slug1")
        

        const post2 = screen.getByText("title 2")
        expect(post2).toBeInTheDocument
        expect(post2.nextElementSibling).toHaveTextContent("Excerpt 2")
        expect(post2.previousElementSibling).toHaveTextContent("11/11/2022")
        expect(post2.closest("a")).toHaveAttribute("href", "/posts/slug2")
        
    })
  
    it('loads initial data (getStaticProps)', async () => {

        const getPrismicClientMock = mocked(getPrismicClient)
        getPrismicClientMock.mockReturnValueOnce({
            getAllByType: jest.fn().mockResolvedValueOnce([{
                uid: 'slug1',
                data: {
                    title: [{type: 'heading', text: 'Title 1'}],
                    content: [{type: 'paragraph', text: 'Content 1'}]
                },
                last_publication_date: '04-01-2021'
            }])
        } as any)

        const response: any = await getStaticProps({})

        expect(response).toEqual(expect.objectContaining({
            props: {
                posts: [{
                    slug: 'slug1',
                    title: 'Title 1',
                    excerpt: 'Content 1',
                    updatedAt: '01 de abril de 2021'
                }]
            }}
        ))

    })
})