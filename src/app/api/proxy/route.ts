import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.DASHBOARD_API_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'API token not configured' }, { status: 500 })
  }

  const res = await fetch('https://dashboard-api-dusky.vercel.app/api/get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()

  return NextResponse.json(data)
}
