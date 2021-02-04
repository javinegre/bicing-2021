const getLastUpdateTimeString: (diff: number) => string = (diff) => {
  let timeStr: string;

  if (diff < 60000) {
    // less than 1 min
    timeStr = 'up to date';
  } else if (diff < 3600000) {
    // between 1 min and 1 hour
    const minutes = Math.floor(diff / 60000);
    timeStr = `${minutes} min ago`;
  } else {
    timeStr = '+1 hr ago';
  }

  return timeStr;
};

export default { getLastUpdateTimeString };
