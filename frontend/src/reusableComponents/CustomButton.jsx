export const CustomButton = ({
  type,
  height,
  width,
  border,
  title,
  bgcolor,
  textcolor,
  borderColor,
  clickEvent,
  icon,
}) => {
  const py = { 1: 'py-1', 2: 'py-2', 3: 'py-3', 4: 'py-4', 5: 'py-5', 6: 'py-6' }[height] || 'py-2';
  const px = { 1: 'px-1', 2: 'px-2', 3: 'px-3', 4: 'px-4', 5: 'px-5', 6: 'px-6', 7: 'px-7', 8: 'px-8' }[width] || 'px-4';
  const bg = { white: 'bg-white', black: 'bg-black', 'green-500': 'bg-green-500', 'green-600': 'bg-green-600', 'orange-500': 'bg-orange-500', 'purple-500': 'bg-purple-500' }[bgcolor] || 'bg-green-500';
  const text = { white: 'text-white', black: 'text-black', 'green-600': 'text-green-600', 'orange-500': 'text-orange-500', 'purple-500': 'text-purple-500' }[textcolor] || 'text-white';
  const borderClass = { white: 'border-white', black: 'border-black', 'green-500': 'border-green-500', 'green-600': 'border-green-600', 'orange-500': 'border-orange-500', 'purple-500': 'border-purple-500' }[borderColor] || '';
  const rounded = type === 'add' ? 'rounded-md' : 'rounded-full';
  const contentIcon = icon || (type === 'filter' ? <i className="fa-solid fa-arrow-down-wide-short" aria-hidden="true" /> : null);
  
  return (
    <button type="button" onClick={clickEvent} className={`cursor-pointer inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 ${py} ${px} ${bg} ${text} ${border ? 'border' : ''} ${borderClass} ${rounded}`.trim()}>
      {type === 'add' && (
        <span className="flex items-center justify-center" aria-hidden="true">
          <i className="fa-regular fa-square-plus"></i>
        </span>
      )}
      <span>{title}</span>
      {contentIcon}
    </button>
  );
}