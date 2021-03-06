import React from 'react';

import { IButtonProps } from './interfaces';
import { ButtonSizeType } from './types';
import { AppFunctionComponent } from '../../../types';

import './Button.css';

const Button: AppFunctionComponent<IButtonProps> = (props) => {
  const {
    onClick,
    onLongPress,
    children,
    className,
    color,
    size,
    status,
    disabled,
  } = props;

  const baseClassName: string =
    'inline-flex items-center justify-center transition-colors duration-150 rounded-full focus:outline-none';
  const disabledClassName: string = disabled
    ? 'opacity-20 pointer-events-none'
    : '';
  const statusClassName = status === 'off' ? 'opacity-10' : '';

  const getSizeClassName: (btnSize: ButtonSizeType | undefined) => string = (
    btnSize,
  ) => {
    let sizeClassName;

    if (btnSize === 'sm') {
      sizeClassName = 'w-8 h-8';
    } else if (btnSize === 'lg') {
      sizeClassName = 'w-12 h-12';
    } else {
      sizeClassName = 'w-10 h-10';
    }

    return sizeClassName;
  };

  return (
    <button
      className={`Button ${baseClassName} ${color ?? ''} ${getSizeClassName(
        size,
      )} ${disabledClassName} ${className}`}
      type="button"
      onClick={onClick}
      {...onLongPress}
    >
      <div className={statusClassName}>{children}</div>
    </button>
  );
};

export default Button;
