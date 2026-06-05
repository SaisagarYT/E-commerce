import React from 'react'

const GenericTable = ({ columns = [], rows = [], renderRow, emptyMessage = 'No Data' }) => {
  return (
    <div className='w-full mt-4'>
      <div className='mt-6 overflow-hidden rounded-[24px] border border-slate-200'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-200'>
            <thead className='bg-slate-50'>
              <tr className='text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                {columns.map((col) => (
                  <th key={col.key ?? col.label ?? col} className='px-5 py-4'>
                    {col.label ?? col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100 bg-white'>
              {rows && rows.length > 0 ? (
                rows.map((row, idx) =>
                  renderRow ? (
                    renderRow(row, idx)
                  ) : (
                    <tr key={idx} className='transition hover:bg-orange-50/40'>
                      {columns.map((col, cidx) => (
                        <td key={cidx} className='px-5 py-4 text-sm text-slate-700'>{row[col.key ?? col]}</td>
                      ))}
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={columns.length} className='px-5 py-16 text-center text-sm text-slate-500'>
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GenericTable
