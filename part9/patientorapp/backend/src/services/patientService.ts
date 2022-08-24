import patientData from "../../data/patients";

import { Patient, SafePatient, newPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getSafeEntiries = (): Array<SafePatient> => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
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

export default {
  getEntries,
  getSafeEntiries,
  addPatient,
};
