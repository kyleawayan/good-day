import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PlannerDay from './PlannerDay';

type CalendarProps = {
  token: string;
};

export default function Planner({ token }: CalendarProps) {
  const [dates, setItems] = useState([
    new Date(new Date().setHours(0, 0, 0, 0)),
  ]);
  const [datesShowing, setDatesShowing] = useState(1);

  const fetchData = () => {
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    date.setDate(date.getDate() + datesShowing);
    setItems(dates.concat(date));
    setDatesShowing(datesShowing + 1);
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const startOfDayDate = new Date().setHours(0, 0, 0, 0);
      const hoursSinceStartOfCurrentDay =
        (new Date().getTime() - startOfDayDate) / 60000 / 60;
      // window.scrollTo({
      //   top: 202.8 * hoursSinceStartOfCurrentDay - 125,
      //   behavior: 'smooth',
      // });
    }, 1000);
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <InfiniteScroll
      dataLength={dates.length} // This is important field to render the next data
      next={fetchData}
      hasMore
      loader={<h4>Loading...</h4>}
      style={{
        width: '100%',
      }}
    >
      {dates.map((_, index) => (
        <div key={dates[index].getTime()}>
          <PlannerDay date={dates[index]} token={token} />
        </div>
      ))}
    </InfiniteScroll>
  );
}
