import { IconNameType } from './types';
import { Property } from 'csstype';

export interface IIconProps {
  name: IconNameType;
  className?: string;
  size?: number;
  color?: Property.Color;
}
