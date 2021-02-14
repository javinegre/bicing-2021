import React, { useEffect } from 'react';

import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import useGeoLocation from '../../hooks/useGeoLocation';
import useLongPress from '../../hooks/useLongPress';
import { AppFunctionComponent } from '../../types';

const MapControlsLocations: AppFunctionComponent = () => {
  const {
    mapCenter,
    homeBookmark,
    workBookmark,
    favoriteBookmark,
  } = storeHooks.useStoreState((state) => ({
    mapCenter: state.map.mapCenter,
    homeBookmark: state.bookmark.home,
    workBookmark: state.bookmark.work,
    favoriteBookmark: state.bookmark.favorite,
  }));

  const {
    setMapCenter,
    setUserLocation,
    setHomeBookmark,
    setWorkBookmark,
    setFavoriteBookmark,
    pushNotification,
  } = storeHooks.useStoreActions((actions) => ({
    setMapCenter: actions.map.setMapCenter,
    setUserLocation: actions.map.setUserLocation,
    setHomeBookmark: actions.bookmark.setHome,
    setWorkBookmark: actions.bookmark.setWork,
    setFavoriteBookmark: actions.bookmark.setFavorite,
    pushNotification: actions.ui.pushNotification,
  }));

  const bookmarks = {
    home: { getter: homeBookmark, setter: setHomeBookmark },
    work: { getter: workBookmark, setter: setWorkBookmark },
    favorite: { getter: favoriteBookmark, setter: setFavoriteBookmark },
  };

  const { geoLocation, geoLocate } = useGeoLocation();

  const updateUserLocation: () => void = () => {
    if (geoLocation) {
      const userLocation = {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      };
      setMapCenter(userLocation);
      setUserLocation(userLocation);
    }
  };

  useEffect(updateUserLocation, [geoLocation]);

  const notifyNewBookmark: (bookmark: 'home' | 'work' | 'favorite') => void = (
    bookmark,
  ) => {
    pushNotification({
      content: (
        <>
          <span className="capitalize">{bookmark}</span> location set
        </>
      ),
    });
  };

  const onBookmarkLongPress: (
    bookmark: 'home' | 'work' | 'favorite',
  ) => () => void = (bookmark) => (): void => {
    bookmarks[bookmark].setter(mapCenter);
    notifyNewBookmark(bookmark);
  };

  const onBookmarkClick: (
    bookmark: 'home' | 'work' | 'favorite',
  ) => () => void = (bookmark) => (): void => {
    const bookmarkPosition = bookmarks[bookmark].getter;

    if (bookmarkPosition) {
      setMapCenter(bookmarkPosition);
    } else {
      bookmarks[bookmark].setter(mapCenter);
      notifyNewBookmark(bookmark);
    }
  };

  const onHomeLongPress = useLongPress(
    onBookmarkLongPress('home'),
    onBookmarkClick('home'),
  );

  const onWorkLongPress = useLongPress(
    onBookmarkLongPress('work'),
    onBookmarkClick('work'),
  );

  const onFavoriteLongPress = useLongPress(
    onBookmarkLongPress('favorite'),
    onBookmarkClick('favorite'),
  );

  return (
    <>
      <Button onClick={geoLocate} color="lightgray" size="lg">
        <Icon name="user-location" color="black" size={24} />
      </Button>

      <Spacer y={6} />

      <Button
        color="lightgray"
        size="sm"
        status={homeBookmark ? 'on' : 'off'}
        onLongPress={onHomeLongPress}
      >
        <Icon name="home" color="black" size={16} />
      </Button>

      <Spacer y={6} />

      <Button
        color="lightgray"
        size="sm"
        status={workBookmark ? 'on' : 'off'}
        onLongPress={onWorkLongPress}
      >
        <Icon name="briefcase" color="black" size={16} />
      </Button>

      <Spacer y={6} />

      <Button
        color="lightgray"
        size="sm"
        status={favoriteBookmark ? 'on' : 'off'}
        onLongPress={onFavoriteLongPress}
      >
        <Icon name="star" color="black" size={16} />
      </Button>
    </>
  );
};

export default MapControlsLocations;
