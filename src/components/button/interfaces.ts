import React from 'react';

export interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  size?: string;
}
