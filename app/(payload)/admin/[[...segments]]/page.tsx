import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../../importMap'

export const maxDuration = 60

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams })

async function Page({ params, searchParams }: Args) {
  try {
    return await RootPage({ config, params, searchParams, importMap })
  } catch (err) {
    console.error('[admin:page] RootPage error:', err)
    throw err
  }
}

export default Page
