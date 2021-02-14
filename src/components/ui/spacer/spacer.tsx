import React from 'react';

import { ISpacerProps } from './interfaces';
import { AppFunctionComponent } from '../../../types';

const Spacer: AppFunctionComponent<ISpacerProps> = (props) => {
  const { x, y } = props;

  return (
    <div
      className="inline-block"
      style={{
        ...(x ? { width: x } : undefined),
        ...(y ? { height: y } : undefined),
      }}
    />
  );
};

export default Spacer;
