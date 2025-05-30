/* eslint-disable no-console */
// DEPRECATED, keeping for retrocompatibility, use mini-app instead

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import OGMiniApp from 'components/OGMiniApp'
import { DOMAIN_URL } from 'constants/index'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  // console.log(searchParams)
  const imagePath = searchParams.get('image_path')
  if (!imagePath) {
    return new Response('Image slug is required', { status: 400 })
  }

  return new ImageResponse(<OGMiniApp image={`${DOMAIN_URL}${imagePath}`} />, {
    width: 1200,
    height: 800,
    headers: {
      'Cache-Control': 'no-store, no-cache',
    },
  })
}
