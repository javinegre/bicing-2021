import { IIconProps } from '../icon/interfaces';
import { ButtonSizeType } from '../button/types';

export interface IToggleOption<T> {
  value: T;
  icon: React.ReactElement<IIconProps>;
}

export interface IToggleOptions<T> {
  [0]: IToggleOption<T>;
  [1]: IToggleOption<T>;
}

export interface IToggle<T> {
  selectedValue: T;
  options: IToggleOptions<T>;
  onToggle: (value: T) => void;
  size?: ButtonSizeType;
}
