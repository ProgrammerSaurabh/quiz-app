import React from 'react';

const Select = ({
  label,
  options,
  value = null,
  changeHandler = () => null,
}) => {
  return (
    <div className='flex flex-col gap-2 my-2'>
      <label className='!text-left mb-2'>{label}</label>
      <select
        onChange={(e) => changeHandler(e.target.value)}
        className='border border-primary rounded-lg p-3 border-r-8 border-transparent px-4 outline outline-neutral-700'
        value={value}
      >
        {options.map((option) => (
          <option
            key={`select-option-${option.value}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
