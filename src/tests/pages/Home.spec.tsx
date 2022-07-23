import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import Home, { getStaticProps } from "../../pages"
import { stripe } from '../../services/stripe'

// way to mock jsx components
jest.mock('../../components/Main/SubscribeButton', () => ({SubscribeButton: () => <div/>}))

jest.mock('../../services/stripe'
/* mock strip generically
, () => {
    return {
        stripe: {
            prices: {
                retrieve() {
                    return {
                        id: "abc",
                        unit_amount: 1234
                    }
                }
            }
        }
    }
}*/
)

describe('Home page', () => {

    it('renders correctly', () => {
        
        render(<Home product={{priceId: 'fake-price-id', amount: '$ 10.10'}}/>)

        expect(screen.getByText("for $ 10.10 month")).toBeInTheDocument()
    })

    it('loads initial data (getStaticProps)', async () => {

        const retrieveMock = jest.fn().mockResolvedValueOnce({
            id: "abc",
            unit_amount: 1234
        })

        const stripeMock = mocked(stripe)
        stripeMock.prices.retrieve = retrieveMock

        const response: any = await getStaticProps(null)

        expect(response.props).toMatchObject({product: {priceId: "abc", amount: "R$12.34"}})
        expect(response.revalidate).toBe(86400)
    })

    it('loads initial data (getStaticProps) - example 2', async () => {

        const retrieveMock = mocked(stripe.prices.retrieve)
        retrieveMock.mockResolvedValueOnce({ // this function is async, thus mockResolvedValueOnce
            id: "abc",
            unit_amount: 1234
        } as any)

        const response: any = await getStaticProps(null)

        expect(response.props).toMatchObject({product: {priceId: "abc", amount: "R$12.34"}})
        expect(response.revalidate).toBe(86400)
    })
})