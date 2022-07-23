import { render, screen } from "@testing-library/react"
import Home from "../../pages"

// way to mock jsx components
jest.mock('../../components/Main/SubscribeButton', () => ({SubscribeButton: () => <div/>}))

describe('Home page', () => {

    it('renders correctly', () => {
        
        render(<Home product={{priceId: 'fake-price-id', amount: '$ 10.10'}}/>)

        expect(screen.getByText("for $ 10.10 month")).toBeInTheDocument()
    })

})