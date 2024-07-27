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

exports.getCalendarPeriods = (qq) => {
  let start;
  let end;
  if (qq.hasOwnProperty("d") && qq["d"] == "today") {
    start = new Date();
    start.setHours(0, 0, 0, 0);

    end = new Date();
    end.setHours(23, 59, 59, 999);
  } else if (qq.hasOwnProperty("d") && qq["d"] == "last7") {
    end = new Date();
    start = new Date();
    start.setDate(end.getDate() - 7);
  } else if (qq.hasOwnProperty("m") && qq["m"] == "month") {
    start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(1);
    end.setHours(0, 0, 0, 0);
  } else if (
    qq.hasOwnProperty("m") &&
    qq.hasOwnProperty("y") &&
    qq.hasOwnProperty("w")
  ) {
    const week = getWeekRange(qq?.y, qq?.m, qq?.w);
    if (week.error)
      return res.status(400).json({
        success: false,
        message: week.error,
      });

    start = week.start;
    end = week.end;
  } else if (qq.hasOwnProperty("m") && qq.hasOwnProperty("y")) {
    start = new Date(qq?.y, qq?.m - 1, 1);
    end = new Date(qq?.y, qq?.m, 1);
  }

  return [start, end];
};
