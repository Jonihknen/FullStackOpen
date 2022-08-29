import { newPatientEntry, Gender, Entry, EntryWithoutId } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseStringData = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error("Incorrect or missing name");
  }
  return data;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    console.log("here");
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};
const isEntries = (entries: unknown[]): entries is Entry[] => {
  return true;
};

const parseEntries = (entries: unknown[]): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
};

type Fields = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  entries: unknown[];
};

const toNewPatientEntry = ({
  name,
  occupation,
  gender,
  ssn,
  dateOfBirth,
  entries,
}: Fields): newPatientEntry => {
  const newEntry: newPatientEntry = {
    name: parseStringData(name),
    occupation: parseStringData(occupation),
    gender: parseGender(gender),
    ssn: parseStringData(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    entries: parseEntries(entries),
  };

  return newEntry;
};

const toNewEntry = (entry: Entry): EntryWithoutId => {
  const shared = {
    date: parseDate(entry.date),
    description: parseStringData(entry.description),
    specialist: parseStringData(entry.specialist),
    diagnosisCodes: entry.diagnosisCodes,
  };

  switch (entry.type) {
    case "HealthCheck":
      return {
        ...shared,
        healthCheckRating: entry.healthCheckRating,
        type: entry.type,
      };
    case "Hospital":
      return {
        ...shared,
        type: entry.type,
        discharge: entry.discharge,
      };
    case "OccupationalHealthcare":
      return {
        ...shared,
        employerName: parseStringData(entry.employerName),
        sickLeave: entry.sickLeave,
        type: entry.type,
      };
    default:
      throw new Error("something went wrong in entry typecheck");
  }
};

export { toNewPatientEntry, toNewEntry };
