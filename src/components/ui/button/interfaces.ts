import React from 'react';

import { ButtonColorType, ButtonSizeType } from './types';
import { ILongPressEvents } from '../../../hooks/interfaces';

export interface IButtonProps<T = HTMLButtonElement> {
  onClick?: React.MouseEventHandler<T>;
  onLongPress?: ILongPressEvents<T>;
  className?: string;
  color?: ButtonColorType;
  size?: ButtonSizeType;
  status?: 'on' | 'off';
  disabled?: boolean;
}
