import type { GetServerSideProps, NextPage } from 'next'
import { trpc } from '../utils/trpc'
import { withAuthGetServerSideProps } from '../utils/with-auth-get-server-side-props'

export const getServerSideProps: GetServerSideProps =
  withAuthGetServerSideProps(async () => {
    return {
      props: {}
    }
  })

const SSR: NextPage = () => {
  const { data } = trpc.useQuery(['example.hello'])

  return <div>{data?.greeting}</div>
}

export default SSR
