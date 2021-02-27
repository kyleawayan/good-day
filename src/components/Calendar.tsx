import React from 'react';
import useSWR from 'swr';
import axios from 'axios';

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

  console.log(data);

  return (
    <div>
      {data.map((event: any) => (
        <li key={event.plannable_id}>{event.plannable.title}</li>
      ))}
    </div>
  );
}
