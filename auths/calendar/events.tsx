import dayjs from "dayjs";
import { ICalendarEventBase } from "./src/interfaces";

export const events: Array<ICalendarEventBase & { color?: string }> = [
  {
    title: "Watch Boxing",
    start: dayjs().set("hour", 0).set("minute", 0).set("second", 0).toDate(),
    end: dayjs().set("hour", 1).set("minute", 30).toDate(),
    color: "#02edda",
  },
  {
    title: "Meeting",
    start: dayjs().set("hour", 10).set("minute", 0).toDate(),
    end: dayjs().set("hour", 10).set("minute", 30).toDate(),
  },
  {
    title: "Coffee break",
    start: dayjs().set("hour", 14).set("minute", 30).toDate(),
    end: dayjs().set("hour", 15).set("minute", 30).toDate(),
  },
  {
    title: "with color prop",
    start: dayjs().set("hour", 16).set("minute", 0).toDate(),
    end: dayjs().set("hour", 18).set("minute", 30).toDate(),
    color: "purple",
  },
  {
    title: "Repair my car",
    start: dayjs().add(1, "day").set("hour", 7).set("minute", 45).toDate(),
    end: dayjs().add(1, "day").set("hour", 13).set("minute", 30).toDate(),
  },
  {
    title: "Meet Realtor",
    start: dayjs().add(1, "day").set("hour", 8).set("minute", 25).toDate(),
    end: dayjs().add(1, "day").set("hour", 9).set("minute", 55).toDate(),
  },
  {
    title: "Laundry",
    start: dayjs().add(1, "day").set("hour", 8).set("minute", 25).toDate(),
    end: dayjs().add(1, "day").set("hour", 11).set("minute", 0).toDate(),
  },
  {
    title: "Doctor's appointment",
    start: dayjs().set("hour", 13).set("minute", 0).toDate(),
    end: dayjs().set("hour", 14).set("minute", 15).toDate(),
  },
];
