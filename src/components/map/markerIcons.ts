import { StationResourceTypeEnum } from '../../enums';

import BbbIcon from '../../assets/icons/markers/bikes-big-black.svg';
import BbgIcon from '../../assets/icons/markers/bikes-big-gray.svg';
import BbvIcon from '../../assets/icons/markers/bikes-big-green.svg';
import BboIcon from '../../assets/icons/markers/bikes-big-orange.svg';
import BbrIcon from '../../assets/icons/markers/bikes-big-red.svg';

import BsbIcon from '../../assets/icons/markers/bikes-small-black.svg';
import BsgIcon from '../../assets/icons/markers/bikes-small-gray.svg';
import BsvIcon from '../../assets/icons/markers/bikes-small-green.svg';
import BsoIcon from '../../assets/icons/markers/bikes-small-orange.svg';
import BsrIcon from '../../assets/icons/markers/bikes-small-red.svg';

import DbbIcon from '../../assets/icons/markers/docks-big-black.svg';
import DbgIcon from '../../assets/icons/markers/docks-big-gray.svg';
import DbvIcon from '../../assets/icons/markers/docks-big-green.svg';
import DboIcon from '../../assets/icons/markers/docks-big-orange.svg';
import DbrIcon from '../../assets/icons/markers/docks-big-red.svg';

import DsbIcon from '../../assets/icons/markers/docks-small-black.svg';
import DsgIcon from '../../assets/icons/markers/docks-small-gray.svg';
import DsvIcon from '../../assets/icons/markers/docks-small-green.svg';
import DsoIcon from '../../assets/icons/markers/docks-small-orange.svg';
import DsrIcon from '../../assets/icons/markers/docks-small-red.svg';

const icons = {
  [StationResourceTypeEnum.bikes]: {
    big: {
      black: BbbIcon,
      gray: BbgIcon,
      green: BbvIcon,
      orange: BboIcon,
      red: BbrIcon,
    },
    small: {
      black: BsbIcon,
      gray: BsgIcon,
      green: BsvIcon,
      orange: BsoIcon,
      red: BsrIcon,
    },
  },
  [StationResourceTypeEnum.docks]: {
    big: {
      black: DbbIcon,
      gray: DbgIcon,
      green: DbvIcon,
      orange: DboIcon,
      red: DbrIcon,
    },
    small: {
      black: DsbIcon,
      gray: DsgIcon,
      green: DsvIcon,
      orange: DsoIcon,
      red: DsrIcon,
    },
  },
};

export default icons;
