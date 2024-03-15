import React from 'react';

const Option = ({
  label,
  value,
  selected = false,
  onClick = () => null,
  correct = false,
  disabled = false,
}) => {
  let _class = 'text-primary';

  if (selected) {
    _class = 'bg-primary text-white';

    if (!correct) {
      _class = 'bg-red-700 text-white';
    }
  }

  return (
    <button
      className={`p-3 mb-1 border-[0.5px] rounded-[5px] cursor-pointer text-left ${_class} ${
        !disabled ? 'hover:bg-primary hover:text-white' : ''
      } transition-all option`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
};

export default Option;
