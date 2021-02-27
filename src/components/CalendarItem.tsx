import React from 'react';
import styles from '../styles/plannerItem.module.css';

type PlannableObject = {
  all_day: boolean;
  due_at: string;
  created_at: string;
  description: string;
  end_at: string;
  id: number;
  location_address: string;
  location_name: string;
  start_at: string;
  title: string;
  updated_at: string;
};

type PlannerItem = {
  context_image: string | null;
  context_name: string;
  context_type: string;
  course_id: number;
  html_url: string;
  new_activity: boolean;
  plannable: PlannableObject;
  plannable_date: string;
  plannable_id: number;
  // planner_override: PlannerOverride
  submissions: boolean;
};

type CalendarItemProps = {
  plannerItem: PlannerItem;
};

export default function CalendarItem({ plannerItem }: CalendarItemProps) {
  const startOfDayDate = new Date().setHours(0, 0, 0, 0);
  let startPlannerItemDate = 0;

  if (plannerItem.plannable.start_at) {
    startPlannerItemDate = new Date(plannerItem.plannable.start_at).getTime();
  } else if (plannerItem.plannable.due_at) {
    startPlannerItemDate = new Date(plannerItem.plannable.due_at).getTime();
  }
  const minutesSinceStartOfCurrentDay = startPlannerItemDate - startOfDayDate;

  console.log(minutesSinceStartOfCurrentDay / 100000);
  return (
    <div
      className={styles.plannerItem}
      style={{ top: minutesSinceStartOfCurrentDay / 100000 }}
    >
      {plannerItem.plannable.title}
    </div>
  );
}
