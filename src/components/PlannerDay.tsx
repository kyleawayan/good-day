import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Ruler from './PlannerDayComponents/Ruler';
import Blocks from './PlannerDayComponents/Blocks';

const getCalendarData = (date: Date, token: string, canvasUrl: string) => {
  const tomorrowDate = new Date(date);
  tomorrowDate.setDate(date.getDate() + 1);
  return axios({
    method: 'get',
    url: `https://${canvasUrl}/api/v1/planner/items`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      start_date: date,
      end_date: tomorrowDate,
    },
  }).then((r) => r.data);
};

type PlannerDayProps = {
  date: Date;
  token: string;
  canvasUrl: string;
};

export default function PlannerDay({
  date,
  token,
  canvasUrl,
}: PlannerDayProps) {
  const { data, error } = useSWR([date, token, canvasUrl], getCalendarData, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {date.toString()}
      <Blocks data={data} />
      <Ruler />
    </div>
  );
}
