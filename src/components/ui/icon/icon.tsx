import React from 'react';

import iconConfig from './iconConfig';
import { IIconProps } from './interfaces';

const Icon: React.FunctionComponent<IIconProps> = (props) => {
  const { name, color, size } = props;

  const IconSVGComponent = iconConfig[name];

  const sizeProps = size ? { width: size, height: size } : {};

  return <IconSVGComponent fill={color} {...sizeProps} />;
};

export default Icon;
