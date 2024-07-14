exports.getWeekRange = (year, month, week) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const totalDays = lastDay.getDate();

  const weeksInMonth = Math.ceil((totalDays + firstDay.getDay()) / 7);

  if (week > weeksInMonth) {
    return {
      error: `The specified week number (${week}) does not exist in the month.`,
    };
  }

  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() + (week - 1) * 7 - firstDay.getDay());

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  if (end > lastDay) {
    end.setDate(lastDay.getDate());
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
};
