import { imgRooms, imgMonths } from '../constants/imageRoom';
export const randomImageRoom = () => {
  return imgRooms[Math.floor(Math.random() * 5)];
};

export const getImgByMonth = (month) => {
  return imgMonths[month];
};
