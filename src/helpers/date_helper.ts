import Moment from 'moment';

export const convertUnixToNormal = (_unix: number) => {
  const normalDateFormat = Moment(_unix).format('yyyy/MM/DD HH:mm a');
  return normalDateFormat;
};

export const convertNormalToUnix = (_date: string) => {
  const unixDateFormat = Moment(_date).unix();
  return unixDateFormat;
};

export const getPrevDate = (_date: number, _duration: number) => {
  const prevDate = new Date(_date.valueOf() - 86400000 * _duration);
  return prevDate;
};
