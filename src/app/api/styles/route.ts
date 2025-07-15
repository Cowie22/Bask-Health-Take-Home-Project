import { NextResponse } from 'next/server'

const colorPalettes = {
  light: {
    bgColors: [
      '#f1f8e9',
      '#e3f2fd',
      '#fff3e0',
      '#fce4ec',
      '#ede7f6',
      '#e8f5e9',
      '#f3e5f5',
      '#fbe9e7',
      '#e0f7fa',
      '#f9fbe7',
    ],
    textColors: ['#181b1c', '#3e4244', '#333333', '#1e293b', '#374151'],
    borderColors: ['#d8dcde', '#cfd8dc', '#b0bec5', '#e2e8f0', '#d1d5db'],
    borderColorEdits: [
      '#42a5d7',
      '#93d5f5',
      '#18709b',
      '#0ea5e9',
      '#81c784',
      '#ffb74d',
      '#ef9a9a',
      '#ba68c8',
    ],
    accentColors: [
      '#1976d2', // blue
      '#388e3c', // green
      '#f57c00', // orange
      '#d32f2f', // red
      '#7b1fa2', // purple
      '#00838f', // teal
      '#c2185b', // pink
    ],
  },
  dark: {
    bgColors: [
      '#181b1c',
      '#1f2937',
      '#2c2f31',
      '#3e4244',
      '#374151',
      '#263238',
      '#2e3b3e',
      '#3b2f3f',
      '#3a3a2e',
      '#2f2e41',
    ],
    textColors: ['#ebebeb', '#d7d7d7', '#fafdff', '#f9fafb', '#e5e7eb'],
    borderColors: ['#6b6f71', '#757575', '#bdbdbd', '#4b5563', '#5c6b73'],
    borderColorEdits: [
      '#2896cd',
      '#40b1e9',
      '#82cff6',
      '#38bdf8',
      '#66bb6a',
      '#ffa726',
      '#ef5350',
      '#ab47bc',
    ],
    accentColors: [
      '#90caf9', // blue
      '#a5d6a7', // green
      '#ffcc80', // orange
      '#ef9a9a', // red
      '#ce93d8', // purple
      '#80deea', // teal
      '#f48fb1', // pink
    ],
  },
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export async function GET() {
  const lightStyle = {
    bgColor: getRandomItem(colorPalettes.light.bgColors),
    textColor: getRandomItem(colorPalettes.light.textColors),
    borderColor: getRandomItem(colorPalettes.light.borderColors),
    borderColorEdit: getRandomItem(colorPalettes.light.borderColorEdits),
    accentColor: getRandomItem(colorPalettes.light.accentColors),
    borderRadius: `${Math.floor(Math.random() * 12) + 4}px`,
  }

  const darkStyle = {
    bgColor: getRandomItem(colorPalettes.dark.bgColors),
    textColor: getRandomItem(colorPalettes.dark.textColors),
    borderColor: getRandomItem(colorPalettes.dark.borderColors),
    borderColorEdit: getRandomItem(colorPalettes.dark.borderColorEdits),
    accentColor: getRandomItem(colorPalettes.light.accentColors),
    borderRadius: `${Math.floor(Math.random() * 12) + 4}px`,
  }

  return NextResponse.json({ light: lightStyle, dark: darkStyle })
}
