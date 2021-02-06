import React from 'react';

import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';

const MapControlsLocations: React.FunctionComponent = () => (
  <>
    <Button onClick={(): void => {}} color="lightgray" size="lg">
      <Icon name="user-location" color="black" size={24} />
    </Button>

    <Spacer y={6} />

    <Button color="lightgray" size="sm" onClick={(): void => {}}>
      <Icon name="home" color="black" size={16} />
    </Button>

    <Spacer y={6} />

    <Button color="lightgray" size="sm" onClick={(): void => {}}>
      <Icon name="briefcase" color="black" size={16} />
    </Button>

    <Spacer y={6} />

    <Button color="lightgray" size="sm" onClick={(): void => {}}>
      <Icon name="star" color="black" size={16} />
    </Button>
  </>
);

export default MapControlsLocations;
