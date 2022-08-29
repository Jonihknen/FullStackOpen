import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      patientId: string;

      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.patientId];
      const updatedPatient = {
        ...patient,
        entries: [...patient.entries.concat(action.payload)],
      };

      return {
        ...state,
        patient: updatedPatient,
      };

    default:
      return state;
  }
};

export const setPatient = (content: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: content,
  };
};

export const addPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content,
  };
};
export const setPatientList = (content: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content,
  };
};
export const setDiagnosisList = (content: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: content,
  };
};

export const addEntry = (content: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    patientId: id,
    payload: content,
  };
};
