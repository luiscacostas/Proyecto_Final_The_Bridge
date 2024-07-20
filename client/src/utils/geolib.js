import { getDistance } from 'geolib';
import moment from 'moment';

export const calculateDistance = (path) => {
  let distance = 0;
  for (let i = 1; i < path.length; i++) {
    distance += getDistance(
      { latitude: path[i - 1].latitude, longitude: path[i - 1].longitude },
      { latitude: path[i].latitude, longitude: path[i].longitude }
    );
  }
  return distance;
};

export const calculateDuration = (startTime, endTime) => {
  const duration = moment.duration(moment(endTime).diff(moment(startTime)));
  return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
};