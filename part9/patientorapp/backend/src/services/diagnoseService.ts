import diagnoseData from "../../data/diagnoses";

import { Diagnosis } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses: Array<Diagnosis> = diagnoseData;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries,
};
