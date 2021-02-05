import React from 'react';

import { IButton } from './interfaces';

const Button: React.FunctionComponent<IButton> = (props) => {
  const { children, className, disabled, onClick } = props;

  const sizeClassName: string = 'w-10 h-10';
  const disabledClassName: string = disabled ? 'opacity-30' : '';

  return (
    <button
      className={`inline-flex items-center justify-center ${sizeClassName} mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:outline-none hover:bg-indigo-800 ${disabledClassName} ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
