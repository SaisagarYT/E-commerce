import React from 'react'

export const CustomInput = ({
  label,
  as = 'input',
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  options = [],
  children,
  className = '',
  inputClassName = '',
  labelClassName = '',
  ...props
}) => {
  const baseClassName = `w-full rounded-[12px] border border-[#dbe2e8] bg-white px-4 text-[15px] text-[#0f4b4d] outline-none transition placeholder:text-slate-400 focus:border-[#a8c6cf] focus:ring-4 focus:ring-[#dceff3] ${inputClassName}`

  return (
    <div className={`space-y-2 ${className}`}>
      {label ? <label className={`text-[15px] font-semibold tracking-tight text-[#0f4b4d] ${labelClassName}`}>{label}</label> : null}

      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClassName}
          {...props}
        >
          {children}
        </textarea>
      ) : as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={baseClassName}
          {...props}
        >
          {children}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClassName}
          {...props}
        />
      )}
    </div>
  )
}
