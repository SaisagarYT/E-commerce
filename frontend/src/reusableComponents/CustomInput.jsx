import React from 'react'

export const CustomInput = ({type,title, fieldType, onchange, placeholder, border, borderColor, bgcolor,width,height, value}) => {
    const input1 = 
        type == 'adminDashboardInput'? `${border} ${bgcolor} ${borderColor} ${width} ${height}`:``
    const input2 = 
        type == 'adminDashboardImageUpload' ? `w-full flex justify-center item-center ${bgcolor} ${borderColor} ${height} border border-dashed`:``
  return (
    <div className={`${width} flex flex-col gap-2`}>
      {type == 'adminDashboardImageUpload' ? (
        <div className={`relative w-full ${height} ${bgcolor} ${borderColor} border border-dashed rounded-sm overflow-hidden`}>
          <span className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium pointer-events-none">
            upload your image
          </span>
          <input
            value={value}
            onChange={() => onchange(title)}
            placeholder={`${placeholder}`}
            type={`${fieldType}`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            name={value}
          />
        </div>
      ) : (
        <>
          <h1 className='font-medium text-md'>{title}</h1>
          <input value={value} onChange={onchange} placeholder={`${placeholder}`} type={`${fieldType}`} className={`${input1} ${input2} w-full indent-2 focus:outline-0 focus:ring-4 rounded-sm focus:ring-blue-300 outline-0`} />
        </>
      )}
    </div>
  )
}
