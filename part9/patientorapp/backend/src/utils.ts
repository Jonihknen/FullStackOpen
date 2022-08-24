import { parse } from "dotenv";
import { newPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
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

type Fields = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
};

const toNewPatientEntry = ({
  name,
  occupation,
  gender,
  ssn,
  dateOfBirth,
}: Fields): newPatientEntry => {
  const newEntry: newPatientEntry = {
    name: parseStringData(name),
    occupation: parseStringData(occupation),
    gender: parseGender(gender),
    ssn: parseStringData(ssn),
    dateOfBirth: parseDate(dateOfBirth),
  };

  return newEntry;
};

export default toNewPatientEntry;
