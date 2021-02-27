import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import CalendarItem from './CalendarItem';

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

const getCalendarData = (token: string) => {
  return axios({
    method: 'get',
    url: 'https://catcourses.ucmerced.edu/api/v1/planner/items',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      start_date: new Date(),
    },
  }).then((r) => r.data);
};

type CalendarProps = {
  token: string;
};

export default function Calendar({ token }: CalendarProps) {
  const { data, error } = useSWR(token, getCalendarData);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {data.map((event: PlannerItem) => (
        <CalendarItem plannerItem={event} key={event.plannable.id} />
      ))}
    </div>
  );
}
