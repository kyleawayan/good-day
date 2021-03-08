// arrange the blocks so that events at the same time don't just overlay each other

function getTimeDomain(event: PlannerItem): [number, number] {
  let leftDomain = -1;
  let rightDomain = -1;
  const offsetIfNoEndTime = 10000;

  if (event.plannable.start_at) {
    // if it has a start and end time
    leftDomain = new Date(event.plannable.start_at).getTime();
    if (event.plannable.end_at) {
      rightDomain = new Date(event.plannable.end_at).getTime();
    } else {
      rightDomain = leftDomain + offsetIfNoEndTime;
    }
  } else if (event.plannable.due_at) {
    // if it only has a due date (assignments)
    leftDomain = new Date(event.plannable.due_at).getTime();
    rightDomain = leftDomain + offsetIfNoEndTime;
  } else if (event.plannable.todo_date) {
    // if it is a custom to do
    leftDomain = new Date(event.plannable.todo_date).getTime();
    rightDomain = leftDomain + offsetIfNoEndTime;
  }

  return [leftDomain, rightDomain];
}

export default function arrangeBlocks(
  data: Array<PlannerItem>
): Array<Array<PlannerItem>> {
  const finalArray: Array<Array<PlannerItem>> = [];
  if (data.length >= 2) {
    let tempArray: Array<PlannerItem> = [data[0]]; // where two (or more) blocks would be joined together. aka they have overlapping times
    let domain = getTimeDomain(data[0]);

    let i;
    for (i = 1; i < data.length; i += 1) {
      const eventStartTime = new Date(data[i].plannable_date).getTime();
      if (domain[0] <= eventStartTime && eventStartTime <= domain[1]) {
        tempArray.push(data[i]);
      } else {
        finalArray.push(tempArray);
        tempArray = [data[i]];
        domain = getTimeDomain(data[i]);
        if (i === data.length - 1) {
          finalArray.push([data[i]]);
        }
      }
    }
  } else if (data.length !== 0) {
    finalArray.push([data[0]]);
  }

  return finalArray;
}
