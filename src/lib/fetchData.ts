export async function fetchLiveData() {
  const res = await fetch('https://dashboard-api-dusky.vercel.app/')
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}
