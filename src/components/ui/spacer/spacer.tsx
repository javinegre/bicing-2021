import React from 'react';

import { ISpacerProps } from './interfaces';

const Spacer: React.FunctionComponent<ISpacerProps> = (props) => {
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
