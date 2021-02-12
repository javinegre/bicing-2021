export type LocalStoragePositionKeyType =
  | 'mapCenter'
  | 'userLocation'
  | 'bookmarkHome'
  | 'bookmarkWork'
  | 'bookmarkFavorite';

export type LocalStorageNumberKeyType = 'mapZoom' | 'userLocationTimestamp';

export type LocalStorageKeyType =
  | LocalStoragePositionKeyType
  | LocalStorageNumberKeyType
  | 'resourceShown'
  | 'bikeTypeFilter';
