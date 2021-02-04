import React from 'react';

import iconConfig from './iconConfig';
import { IIconProps } from './interfaces';

const Icon: React.FunctionComponent<IIconProps> = (props) => {
  const { name, className, color, size } = props;

  const IconSVGComponent = iconConfig[name];

  const sizeProps = size ? { width: size, height: size } : {};

  return (
    <IconSVGComponent
      fill={color}
      {...(className ? { className } : {})}
      {...sizeProps}
    />
  );
};

export default Icon;
