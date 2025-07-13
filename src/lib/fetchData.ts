export async function fetchLiveData() {
  const res = await fetch('/api/proxy')
  if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`)
  const json = await res.json()
  return json.data.dashboardData
}