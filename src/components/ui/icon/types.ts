import React from 'react';

export type ReactComponentIconType = React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
>;

export type IconNameType =
  | 'bike'
  | 'bolt'
  | 'briefcase'
  | 'gears'
  | 'home'
  | 'info'
  | 'parking'
  | 'refresh'
  | 'star'
  | 'time-refresh'
  | 'user-location';

export type IconConfigType = {
  [name in IconNameType]: ReactComponentIconType;
};
