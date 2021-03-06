export default function seperateEventsByDates(
  data: Array<PlannerItem>
): Array<DateEventObject> {
  const finalArray: Array<DateEventObject> = [];
  let dateWereLookingAt = new Date(
    new Date(data[0].plannable_date).setHours(0, 0, 0, 0)
  );

  let dataInDateEventObject = [];
  let i;
  for (i = 0; i < data.length; i += 1) {
    if (
      new Date(
        new Date(data[i].plannable_date).setHours(0, 0, 0, 0)
      ).getTime() === dateWereLookingAt.getTime() &&
      i < data.length - 1
    ) {
      dataInDateEventObject.push(data[i]);
    } else {
      finalArray.push({
        date: dateWereLookingAt,
        data: dataInDateEventObject,
      });
      dateWereLookingAt = new Date(
        new Date(data[i].plannable_date).setHours(0, 0, 0, 0)
      );
      dataInDateEventObject = [];
    }
  }
  return finalArray;
}
