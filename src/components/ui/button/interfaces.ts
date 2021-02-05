import React from 'react';

export interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  size?: string;
}
