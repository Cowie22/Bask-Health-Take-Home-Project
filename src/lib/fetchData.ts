export async function fetchLiveData() {
  const res = await fetch('/api/proxy')
  if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`)

  const json = await res.json()
  // Defensive: check existence before access
  if (!json.data || !json.data.dashboardData) {
    console.error('Unexpected API response:', json)
    throw new Error('Missing dashboardData in API response')
  }
  return json.data.dashboardData
}
