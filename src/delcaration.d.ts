declare module '*.module.css';

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
  todo_date: string;
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
