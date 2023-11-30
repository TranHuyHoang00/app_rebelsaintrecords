import { ReactElement } from "react";
export interface ICalendarEventBase {
  start: Date;
  end: Date;
  title: string;
  children?: ReactElement | null;
  hideHours?: boolean;
  disabled?: boolean;
  overlapPosition?: number;
  overlapCount?: number;
}
