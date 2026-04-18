import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import React from 'react'
import { importMap } from './importMap'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const serverFunction = async (args: Parameters<typeof handleServerFunctions>[0]) => {
    'use server'
    return handleServerFunctions({ ...args, config, importMap })
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
