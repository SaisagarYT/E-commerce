import React, { useState } from 'react'

const settingsThemeColors = [
  { label: 'Slate', value: 'slate', preview: '#334155' },
  { label: 'Ocean', value: 'ocean', preview: '#0f766e' },
  { label: 'Amber', value: 'amber', preview: '#b45309' },
  { label: 'Rose', value: 'rose', preview: '#be123c' },
]

const SettingsDisplay = () => {
  const [fontSize, setFontSize] = useState('medium')
  const [themeColor, setThemeColor] = useState('slate')
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [orderAlerts, setOrderAlerts] = useState(true)
  const [realtimeFetching, setRealtimeFetching] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState('30')
  const [lowStockAlerts, setLowStockAlerts] = useState(true)
  const [compactDensity, setCompactDensity] = useState(false)

  const handleSave = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSave} className='mt-6 grid gap-6 pb-6'>
      <section className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Appearance</h2>
          <p className='text-sm text-gray-500'>Control how the admin dashboard looks and feels.</p>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <label className='grid gap-2 text-sm font-medium text-gray-700'>
            Font size
            <select
              value={fontSize}
              onChange={(event) => setFontSize(event.target.value)}
              className='rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-slate-500'
            >
              <option value='small'>Small</option>
              <option value='medium'>Medium</option>
              <option value='large'>Large</option>
            </select>
          </label>

          <div className='grid gap-2 text-sm font-medium text-gray-700'>
            <span>Theme color</span>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {settingsThemeColors.map((color) => (
                <button
                  key={color.value}
                  type='button'
                  onClick={() => setThemeColor(color.value)}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition ${themeColor === color.value ? 'border-slate-900 bg-slate-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <span className='h-4 w-4 rounded-full' style={{ backgroundColor: color.preview }} />
                  <span>{color.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Notifications</h2>
          <p className='text-sm text-gray-500'>Choose which admin alerts should be visible in the dashboard.</p>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <ToggleRow
            title='Message notifications'
            description='Show new message alerts in the admin panel.'
            enabled={messageNotifications}
            onToggle={() => setMessageNotifications((value) => !value)}
          />
          <ToggleRow
            title='Order updates'
            description='Notify when an order changes status.'
            enabled={orderAlerts}
            onToggle={() => setOrderAlerts((value) => !value)}
          />
          <ToggleRow
            title='Low stock warnings'
            description='Flag products that are running low.'
            enabled={lowStockAlerts}
            onToggle={() => setLowStockAlerts((value) => !value)}
          />
          <label className='grid gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700'>
            Sound and toast style
            <select className='rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-slate-500'>
              <option>Subtle</option>
              <option>Standard</option>
              <option>Quiet</option>
            </select>
          </label>
        </div>
      </section>

      <section className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Data Sync</h2>
          <p className='text-sm text-gray-500'>Control refresh behavior for dashboard data and lists.</p>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <ToggleRow
            title='Real-time fetching'
            description='Keep orders, products, and users synced automatically.'
            enabled={realtimeFetching}
            onToggle={() => setRealtimeFetching((value) => !value)}
          />

          <label className='grid gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700'>
            Auto refresh interval
            <select
              value={autoRefresh}
              onChange={(event) => setAutoRefresh(event.target.value)}
              className='rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-slate-500'
            >
              <option value='10'>Every 10 seconds</option>
              <option value='30'>Every 30 seconds</option>
              <option value='60'>Every minute</option>
              <option value='manual'>Manual only</option>
            </select>
          </label>

          <ToggleRow
            title='Compact table density'
            description='Fit more rows on the screen with tighter spacing.'
            enabled={compactDensity}
            onToggle={() => setCompactDensity((value) => !value)}
          />

          <label className='grid gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700'>
            Backup reminder
            <select className='rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-slate-500'>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Off</option>
            </select>
          </label>
        </div>
      </section>

      <section className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Recommended admin settings</h2>
          <p className='text-sm text-gray-500'>Useful non-profile controls for day-to-day store management.</p>
        </div>

        <div className='grid gap-3 text-sm text-gray-700 md:grid-cols-2'>
          <SettingHint title='Inventory alerts'>Warn when stock reaches a low threshold.</SettingHint>
          <SettingHint title='Order escalation'>Flag stuck orders for review after a delay.</SettingHint>
          <SettingHint title='Audit logs'>Record important admin actions for tracking.</SettingHint>
          <SettingHint title='Timezone display'>Keep timestamps aligned with the store region.</SettingHint>
        </div>
      </section>

      <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4'>
        <p className='text-sm text-gray-600'>These settings affect the admin dashboard only.</p>
        <button type='submit' className='rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800'>
          Save settings
        </button>
      </div>
    </form>
  )
}

const ToggleRow = ({ title, description, enabled, onToggle }) => (
  <button
    type='button'
    onClick={onToggle}
    className={`flex items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${enabled ? 'border-slate-900 bg-slate-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
  >
    <div>
      <h3 className='font-medium text-gray-900'>{title}</h3>
      <p className='mt-1 text-sm text-gray-500'>{description}</p>
    </div>
    <span className={`mt-1 inline-flex h-6 w-11 items-center rounded-full p-1 transition ${enabled ? 'bg-slate-900' : 'bg-gray-300'}`}>
      <span className={`h-4 w-4 rounded-full bg-white transition ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </span>
  </button>
)

const SettingHint = ({ title, children }) => (
  <div className='rounded-2xl border border-gray-200 bg-gray-50 p-4'>
    <h3 className='font-medium text-gray-900'>{title}</h3>
    <p className='mt-1 text-sm text-gray-500'>{children}</p>
  </div>
)

export default SettingsDisplay