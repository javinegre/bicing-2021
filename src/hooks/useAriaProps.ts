import { AriaAttributes } from 'react';

import { IAccessibleFunctionComponentProps } from '../interfaces';

const useAriaProps: (
  props: IAccessibleFunctionComponentProps,
) => IAccessibleFunctionComponentProps = (props) => {
  const ariaProps: AriaAttributes = Object.entries(props)
    .filter(([key]) => key.match(/^aria-/))
    .reduce(
      (obj, [key]) => ({
        ...obj,
        [key]: props[key as keyof AriaAttributes],
      }),
      {},
    );

  return {
    role: props.role,
    tabIndex: props.tabIndex,
    ...ariaProps,
  };
};

export default useAriaProps;
