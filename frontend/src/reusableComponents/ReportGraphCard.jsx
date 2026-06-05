import React, { useMemo, useState } from 'react'

const defaultDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const defaultValues = [16, 27, 27, 19, 36, 22, 31]
const defaultMetrics = [
  { value: '52k', label: 'Customers', active: true },
  { value: '3.5k', label: 'Total Products' },
  { value: '2.5k', label: 'Stock Products' },
  { value: '0.5k', label: 'Out of Stock' },
  { value: '250k', label: 'Revenue' },
]

const chartWidth = 1024
const chartHeight = 360
const chartPadding = { top: 18, right: 18, bottom: 42, left: 54 }
const chartGridTicks = [0, 10, 20, 30, 40, 50]

const buildLinePath = (values) => {
  const innerWidth = chartWidth - chartPadding.left - chartPadding.right
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom
  const step = innerWidth / Math.max(values.length - 1, 1)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const range = maxValue - minValue || 1

  const points = values.map((value, index) => {
    const x = chartPadding.left + step * index
    const y = chartPadding.top + innerHeight - ((value - minValue) / range) * innerHeight
    return { x, y, value }
  })

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const areaPath = `${linePath} L ${chartPadding.left + innerWidth} ${chartPadding.top + innerHeight} L ${chartPadding.left} ${chartPadding.top + innerHeight} Z`

  return { points, linePath, areaPath }
}

const ReportGraphCard = ({
  title = 'Report for this week',
  subtitle = 'Last 7 days',
  days = defaultDays,
  values = defaultValues,
  metrics = defaultMetrics,
}) => {
  const { points, linePath, areaPath } = useMemo(() => buildLinePath(values), [values])
  const [hoveredIndex, setHoveredIndex] = useState(3)
  const hoveredPoint = points[hoveredIndex] ?? points[0]

  const updateHoveredPoint = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const nearestIndex = points.reduce((closestIndex, point, index) => {
      const closestPoint = points[closestIndex]
      return Math.abs(point.x - mouseX) < Math.abs(closestPoint.x - mouseX) ? index : closestIndex
    }, 0)

    setHoveredIndex(nearestIndex)
  }

  const tooltipX = Math.min(Math.max(hoveredPoint.x, chartPadding.left + 52), chartWidth - chartPadding.right - 46)
  const tooltipY = hoveredPoint.y - 38

  return (
    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-none min-w-0'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h3 className='text-2xl font-semibold text-slate-900'>{title}</h3>
          <p className='text-sm text-slate-400'>{subtitle}</p>
        </div>
        <div className='flex items-center gap-2 rounded-2xl bg-orange-100 p-1'>
          <button className='rounded-xl bg-white px-4 py-2 text-sm font-medium text-orange-600 shadow-none transition-all duration-200 ease-out'>This week</button>
          <button className='rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition-all duration-200 ease-out hover:bg-white/70'>Last week</button>
          <button className='ml-1 rounded-full px-1 text-slate-500 transition-all duration-200 ease-out hover:text-slate-700'>
            <i className='fa-solid fa-ellipsis-vertical text-sm' />
          </button>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-5 gap-4'>
        {metrics.map((metric) => (
          <div key={metric.label} className='pb-3'>
            <div className='text-2xl font-semibold text-slate-900'>{metric.value}</div>
            <div className='mt-1 text-sm text-slate-500'>{metric.label}</div>
            <div className={`mt-3 h-0.5 rounded-full transition-all duration-300 ease-out ${metric.active ? 'bg-orange-500' : 'bg-orange-200'}`} />
          </div>
        ))}
      </div>

      <div className='relative mt-5 w-full overflow-hidden rounded-3xl bg-white p-2'>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className='h-[320px] w-full cursor-crosshair'
          onMouseMove={updateHoveredPoint}
          onMouseLeave={() => setHoveredIndex(3)}
        >
          <defs>
            <linearGradient id='reportFill' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#fdba74' stopOpacity='0.62' />
              <stop offset='100%' stopColor='#fdba74' stopOpacity='0.10' />
            </linearGradient>
            <linearGradient id='reportStroke' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#fb923c' />
              <stop offset='100%' stopColor='#f97316' />
            </linearGradient>
          </defs>

          {chartGridTicks.map((tick, index) => {
            const y = chartPadding.top + ((chartHeight - chartPadding.top - chartPadding.bottom) / (chartGridTicks.length - 1)) * (chartGridTicks.length - 1 - index)
            return <line key={tick} x1={chartPadding.left} x2={chartWidth - chartPadding.right} y1={y} y2={y} stroke='#ffedd5' strokeDasharray='5 7' />
          })}

          {chartGridTicks.map((tick, index) => {
            const y = chartPadding.top + ((chartHeight - chartPadding.top - chartPadding.bottom) / (chartGridTicks.length - 1)) * (chartGridTicks.length - 1 - index)
            return (
              <text key={tick} x={chartPadding.left - 12} y={y + 4} textAnchor='end' fontSize='12' fill='#94a3b8'>
                {tick}k
              </text>
            )
          })}

          <path d={areaPath} fill='url(#reportFill)' className='transition-all duration-300 ease-out' />
          <path d={linePath} fill='none' stroke='url(#reportStroke)' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' className='transition-all duration-300 ease-out' />

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={index === hoveredIndex ? 6 : 4}
              fill='#ffffff'
              stroke={index === hoveredIndex ? '#f97316' : '#22c55e'}
              strokeWidth={index === hoveredIndex ? 3 : 2}
              className='transition-all duration-300 ease-out'
            />
          ))}

          <line x1={hoveredPoint.x} x2={hoveredPoint.x} y1={chartPadding.top} y2={chartHeight - chartPadding.bottom + 4} stroke='#fb923c' strokeDasharray='4 6' className='transition-all duration-300 ease-out' />

          <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r='6' fill='none' stroke='#fdba74' strokeOpacity='0.42' strokeWidth='10' className='transition-all duration-300 ease-out' />
          <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r='3' fill='#f97316' className='transition-all duration-300 ease-out' />

          {days.map((day, index) => {
            const x = chartPadding.left + ((chartWidth - chartPadding.left - chartPadding.right) / (days.length - 1)) * index
            return (
              <text key={day} x={x} y={chartHeight - 14} textAnchor='middle' fontSize='12' fill={index === hoveredIndex ? '#c2410c' : '#94a3b8'} fontWeight={index === hoveredIndex ? '700' : '500'}>
                {day}
              </text>
            )
          })}
        </svg>

        <div
          className='pointer-events-none absolute z-10 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 shadow-none transition-all duration-300 ease-out'
          style={{
            left: `${tooltipX}px`,
            top: `${tooltipY}px`,
            transform: 'translate(-50%, -100%)',
            opacity: 1,
          }}
        >
          <div className='text-center text-xs font-semibold text-orange-700'>{days[hoveredIndex]}</div>
          <div className='text-center text-sm font-bold text-orange-900'>{values[hoveredIndex]}k</div>
        </div>
      </div>
    </div>
  )
}

export default ReportGraphCard
