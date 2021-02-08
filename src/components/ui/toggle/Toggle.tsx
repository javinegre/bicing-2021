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
    let width;

    if (btnSize === 'sm') {
      width = 8;
    } else if (btnSize === 'lg') {
      width = 12;
    } else {
      width = 10;
    }

    return {
      toggle: `w-${2 * width} h-${width}`,
      button: `w-${width} h-${width}`,
      leftPosition: isFirstOption ? 'left-0' : `left-${width}`,
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
