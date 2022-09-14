import type { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { authOptions } from '../pages/api/auth/[...nextauth]'

export const withAuthGetServerSideProps = (cb: GetServerSideProps) => {
  const fn: GetServerSideProps = async ctx => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    )
    if (!session)
      return {
        notFound: true
      }
    console.log(session)
    return await cb(ctx)
  }
  return fn
}
