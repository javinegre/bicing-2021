export type ApiEndpointType = 'info' | 'status';

export type DataTransformType<OT, TT> = (station: OT) => TT;
