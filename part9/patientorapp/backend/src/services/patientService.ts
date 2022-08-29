import patientData from "../../data/patients";

import {
  Patient,
  SafePatient,
  newPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getSafeEntiries = (): Array<SafePatient> => {
  return patients.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const addPatient = (entry: newPatientEntry): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error("patient not found");
  } else {
    const newEntry = {
      ...entry,
      id: uuid(),
    };
    patient.entries?.push(newEntry);
    return newEntry;
  }
};

export default {
  getEntries,
  getSafeEntiries,
  addPatient,
  findById,
  addEntry,
};
