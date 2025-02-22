const time = (str: string) => {
  const date = new Date(str);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = [
    ['Sunday', 'Sun', 'S', 6],
    ['Monday', 'Mon', 'M', 0],
    ['Tuesday', 'Tue', 'T', 1],
    ['Wednesday', 'Wed', 'W', 2],
    ['Thursday', 'Thu', 'T', 3],
    ['Friday', 'Fri', 'F', 4],
    ['Saturday', 'Sat', 'S', 5],
  ];

  return {
    monthName: months[date.getMonth()],
    dayName: days[date.getDay()],
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    hours: `0${date.getHours()}`.slice(-2),
    minutes: `0${date.getMinutes()}`.slice(-2),
  };
};

export default time;
