import {Dimensions} from 'react-native';
import {sprintf} from 'sprintf-js';

export const font = {
  regular: 'Outfit-Regular',
  medium: 'Outfit-Medium',
  bold: 'Outfit-Bold',
  semiBold: 'Outfit-SemiBold',
};

export let customFonts = {
  OutfitBold: require('../../assets/fonts/Outfit-Bold.ttf'),
  OutfitRegular: require('../../assets/fonts/Outfit-Regular.ttf'),
  OutfitMedium: require('../../assets/fonts/Outfit-Medium.ttf'),
  OutfitSemiBold: require('../../assets/fonts/Outfit-SemiBold.ttf'),
};

export const noop = () => {};

export const getFormattedCounter = (timeInSeconds: number): string => {
  const seconds = timeInSeconds % 60;
  const minutes = (timeInSeconds / 60) % 60;
  return sprintf('%02d:%02d', minutes, seconds);
};

export const formatCurrency = (number, fixed = 0) => {
  const fixedValue = !Number.isInteger(number) ? 2 : fixed;
  return fixedValue > 0
    ? number && number.toFixed(fixedValue).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    : Math.round(((number + Number.EPSILON) * 100) / 100)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const trimStringWithEllipsis = (
  inputString: string,
  charLimit: number | undefined = 20,
): string => {
  if (inputString.length <= charLimit) {
    return inputString;
  }

  const trimmedString = inputString.slice(0, charLimit - 3);
  return trimmedString + '...';
};

export const formatDateTime = (date, noTime = true) => {
  const inputDate = new Date(date);

  const day = inputDate.getDate();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const year = inputDate.getFullYear();

  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const formattedDate = noTime
    ? `${day}/${month}/${year}`
    : `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} ${amPm}`;
  return formattedDate;
};

export const formatDate = (isoString: string): string => {
  const parsedDate = new Date(isoString);
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  /* @ts-expect-error  */
  const formattedDate = parsedDate.toLocaleDateString('en-US', options);
  const day = parsedDate.toLocaleDateString('en-US', {weekday: 'short'});
  return `${day} ${formattedDate}`;
};

// export const getApplicationVersion = () => {
//   return Application.nativeApplicationVersion;
// };

export const generateRandomUUID = () => {
  const timestamp = new Date().getTime().toString();
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return timestamp + randomPart;
};

export const extractDatePart = (
  dateString: string,
  part: 'time' | 'day' | 'month',
): string => {
  const date = new Date(dateString);

  switch (part) {
    case 'time':
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    case 'day':
      return date.getDate().toString();
    case 'month':
      // const month = date.getMonth(); // Months are 0-indexed (January = 0)
      return new Intl.DateTimeFormat('en-US', {month: 'short'}).format(date);
    default:
      throw new Error(
        `Invalid part: ${part}. Must be "time", "day", or "month"`,
      );
  }
};

export const convertTimeToToday = (timeString): Date => {
  const today = new Date();
  const hours = parseInt(timeString.slice(0, 2), 10);
  const minutes = parseInt(timeString.slice(3, 5), 10);
  const amOrPm = timeString.slice(5, 7);

  if (amOrPm === 'PM' && hours !== 12) {
    today.setHours(hours + 12);
  } else if (amOrPm === 'AM' && hours === 12) {
    today.setHours(0);
  } else {
    today.setHours(hours);
  }

  today.setMinutes(minutes);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
};

export const formatFileSize = (fileSize: number) => {
  if (fileSize < 1024) {
    return `${fileSize} bytes`;
  }

  const kb = fileSize / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }

  const mb = kb / 1024;
  if (mb < 1024) {
    return `${mb.toFixed(2)} MB`;
  }

  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
};

export const convertRatingToArray = (rating, maxStars = 5) => {
  const result: number[] = [];
  const fullStars = Math.floor(rating); // Get the whole number part (e.g., 4 in case of 4.5)
  const halfStar = rating % 1 >= 0.5 ? 0.5 : 0; // Check if there's a fractional part (0.5)

  // Add full stars (1s)
  for (let i = 0; i < fullStars; i++) {
    result.push(1);
  }

  // Add half star if applicable (0.5)
  if (halfStar) {
    result.push(halfStar);
  }

  // Fill remaining with 0s to make the array of length maxStars
  while (result.length < maxStars) {
    result.push(0);
  }

  return result;
};

export const calculateDelta = (latitude, longitude, distance) => {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;

  const ONE_DEGREE_OF_LATITUDE_IN_METERS = 111.32 * 1000;
  const latitudeDelta = distance / ONE_DEGREE_OF_LATITUDE_IN_METERS;
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;

  return {latitudeDelta, longitudeDelta};
};

export const timeDifference = (dateStr: string | number | Date) => {
  // Parse the date string into a Date object
  const date = new Date(dateStr);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(date.getTime() - Date.now());

  // Define units and their corresponding thresholds in milliseconds
  const units: [string, number][] = [
    ['year', 365 * 24 * 60 * 60 * 1000],
    ['month', 30 * 24 * 60 * 60 * 1000],
    ['day', 24 * 60 * 60 * 1000],
    ['hour', 60 * 60 * 1000],
    ['minute', 60 * 1000],
    ['second', 1000],
  ];

  // Find the most suitable unit
  for (const [unit, threshold] of units) {
    if (timeDiff >= threshold) {
      const numUnits = Math.floor(timeDiff / threshold);
      return `${numUnits} ${unit}${numUnits > 1 ? 's' : ''} ago`;
    }
  }

  // If no suitable unit is found, return "just now"
  return 'just now';
};
