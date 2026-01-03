import { formatDistanceToNow, format } from "date-fns";

//  "Time Ago" function
export const getTimeAgo = (timestamp) => {
  if (!timestamp) return "";
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

// "Full Date" function
export const getFullDate = (timestamp) => {
  if (!timestamp) return "";
  // 'PP' is a date-fns pattern for "Jan 3, 2026" // 'p' adds the time like "5:27 AM"
  return format(new Date(timestamp), "PP");
};
