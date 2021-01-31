import React from 'react';

export interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: string;
}
