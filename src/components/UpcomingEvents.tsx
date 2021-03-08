import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import styles from '../styles/UpcomingEvents.module.css';
import seperateEventsByDate from '../utils/seperateEventsByDates';
import UpcomingEventDays from './UpcomingEventsComponents/UpcomingEventDays';

type UpcomingEventsProps = {
  token: string;
  canvasUrl: string;
};

const getCalendarData = async (
  date: Date,
  token: string,
  canvasUrl: string
) => {
  const correctlyFormattedDate = new Date(date);
  const afterWeekDate = new Date(date);
  afterWeekDate.setDate(correctlyFormattedDate.getDate() + 7);
  return axios({
    method: 'get',
    url: `https://${canvasUrl}/api/v1/planner/items`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      start_date: correctlyFormattedDate,
      end_date: afterWeekDate,
    },
  }).then((r) => seperateEventsByDate(r.data));
};

export default function UpcomingEvents({
  token,
  canvasUrl,
}: UpcomingEventsProps) {
  const { data, error } = useSWR(
    [new Date().setHours(0, 0, 0, 0), token, canvasUrl],
    getCalendarData,
    { refreshInterval: 1000 }
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.upcomingEvents}>
      <h1>Upcoming Events</h1>
      {data.map((dayEvents: DateEventObject) => (
        <UpcomingEventDays
          dayEvents={dayEvents}
          key={dayEvents.date.getTime()}
        />
      ))}
    </div>
  );
}
