import { FunctionComponent } from 'react';

import { IAccessibleFunctionComponentProps } from './interfaces';

// Extend function component props with aria related properties
export type AppFunctionComponent<T = {}> = FunctionComponent<
  T & IAccessibleFunctionComponentProps
>;
