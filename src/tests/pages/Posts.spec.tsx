import { render, screen } from "@testing-library/react"
import Posts from "../../pages/posts"

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
    
})