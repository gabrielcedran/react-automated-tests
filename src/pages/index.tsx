import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/Main/SubscribeButton';
import styles from './home.module.scss';
import next from 'next';
import { stripe } from '../services/stripe';

type HomeProps = {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      {// tag Head allows to add custom headers per route (page). It supports anything that would go inside the html tag head (canonical tag, meta tags, etc). 
      }
      <Head><title>ig.news Home</title></Head> 
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KdMNMJEXW7bCbDM9nQt4ede'
  //, {expand: ['product']}
  )

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat(Intl.DateTimeFormat().resolvedOptions().locale, {currency: 'BRL', style: 'currency'}).format(price.unit_amount / 100),

  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}
