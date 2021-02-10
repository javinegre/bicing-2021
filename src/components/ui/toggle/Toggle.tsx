import React from 'react';

import { IToggle } from './interfaces';
import { ButtonSizeType } from '../button/types';

const Toggle: <T>(props: IToggle<T>) => React.ReactElement = (props) => {
  const {
    selectedValue,
    options: { 0: firstOption, 1: secondOption },
    size,
    onToggle,
  } = props;

  const getClassNames: (
    btnSize: ButtonSizeType | undefined,
    isFirstOption: boolean,
  ) => { toggle: string; button: string; leftPosition: string } = (
    btnSize,
    isFirstOption,
  ) => {
    let toggle;
    let button;
    let leftPosition;

    if (btnSize === 'sm') {
      toggle = 'w-16 h-8';
      button = 'w-8 h-8';
      leftPosition = 'left-8';
    } else if (btnSize === 'lg') {
      toggle = 'w-24 h-12';
      button = 'w-12 h-12';
      leftPosition = 'left-12';
    } else {
      toggle = 'w-20 h-10';
      button = 'w-10 h-10';
      leftPosition = 'left-10';
    }

    return {
      toggle,
      button,
      leftPosition: isFirstOption ? 'left-0' : leftPosition,
    };
  };

  const isFirstOptions: boolean = selectedValue === firstOption.value;

  const {
    toggle: toggleSizeClassName,
    button: buttonSizeClassName,
    leftPosition,
  } = getClassNames(size, isFirstOptions);

  const onToggleClick: () => void = () => {
    onToggle(
      selectedValue === firstOption.value
        ? secondOption.value
        : firstOption.value,
    );
  };

  return (
    <button
      type="button"
      className={`relative cursor-pointer focus:outline-none ${toggleSizeClassName}`}
      onClick={onToggleClick}
    >
      <div
        className={`absolute top-0 left-0 bg-gray-700 opacity-30 rounded-full ${toggleSizeClassName}`}
      />
      <div
        className={`absolute top-0 bg-gray-700 rounded-full transition-all ${leftPosition} ${buttonSizeClassName}`}
      />
      <div className="relative flex">
        <div
          className={`flex justify-center items-center ${buttonSizeClassName}`}
        >
          {firstOption.icon}
        </div>
        <div
          className={`flex justify-center items-center ${buttonSizeClassName}`}
        >
          {secondOption.icon}
        </div>
      </div>
    </button>
  );
};

export default Toggle;
