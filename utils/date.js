const formatDate = (date) => {
  const tempDate = new Date(date);
  let formattedDate = '';
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const year = tempDate.getFullYear();
  const month = tempDate.getMonth();
  const day = tempDate.getDate();
  formattedDate = `${months[month]} ${day}, ${year}`;

  return formattedDate;
};

export default formatDate;
