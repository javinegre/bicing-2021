import React from 'react';

import { ButtonColorType, ButtonSizeType } from './types';

export interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  color?: ButtonColorType;
  size?: ButtonSizeType;
  status?: 'on' | 'off';
  disabled?: boolean;
}
