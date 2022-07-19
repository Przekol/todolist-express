const calcDaysPassed = (currentDate, eventDate) =>
  currentDate.getDate() - eventDate.getDate();

const getDateInformation = (message, options, date) =>
  `${message} ${new Intl.DateTimeFormat(navigator.language, options).format(
    date
  )}`;

export const displayFormatDate = date => {
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0)
    return getDateInformation(
      'Today,',
      { hour: 'numeric', minute: 'numeric' },
      date
    );
  if (daysPassed === 1)
    return getDateInformation(
      'Yesterday,',
      { hour: 'numeric', minute: 'numeric' },
      date
    );
  if (daysPassed <= 7)
    return getDateInformation(
      `${daysPassed} days ago,`,
      { hour: 'numeric', minute: 'numeric' },
      date
    );
  return getDateInformation(
    '',
    {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
    date
  );
};
