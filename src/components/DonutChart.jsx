import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = ['#059f94', '#fbbf24', '#ef4444', '#1c7c99', '#833649', '#6b7280']

export default function DonutChart({ data }) {
  const filtered = data.filter(d => d.value > 0)

  if (!filtered.length) {
    return <p className="text-center text-gray-400 text-sm py-4">Sin datos</p>
  }

  const chartData = {
    labels: filtered.map(d => d.label),
    datasets: [{
      data:            filtered.map(d => d.value),
      backgroundColor: COLORS.slice(0, filtered.length),
      borderWidth:     2,
      borderColor:     '#fff',
    }],
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-40 h-40">
        <Doughnut
          data={chartData}
          options={{
            cutout: '60%',
            plugins: { legend: { display: false } },
            maintainAspectRatio: true,
          }}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {filtered.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            <span className="text-gray-700">{d.label}: <strong>{d.value}</strong></span>
          </div>
        ))}
      </div>
    </div>
  )
}
