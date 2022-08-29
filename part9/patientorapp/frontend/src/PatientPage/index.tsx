import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addEntry, setPatient, useStateValue } from "../state";
import { Patient, Entry, EntryWithoutId } from "../types";
import { apiBaseUrl } from "../constants";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { HealthcheckE, HospitalE, OccupationalE } from "./Entries";
import { Button } from "@material-ui/core";
import React from "react";
import AddEntryModal from "../AddEntryModal";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalE entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalE entry={entry} />;
    case "HealthCheck":
      return <HealthcheckE entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (id !== patient.id) {
      void fetchPatient();
    }
  }, [dispatch, patient]);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id) {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        console.log(newEntry);
        dispatch(addEntry(newEntry, id));

        closeModal();
      }
    } catch (error: unknown) {
      //let errorMessage = "Something went wrong.";
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        //errorMessage = error.response.data.error;
      }
      //setError(errorMessage);
    }
  };

  return (
    <div>
      {patient ? (
        <div>
          {" "}
          <h2>
            {patient.name}
            {patient.gender == "female" && <FemaleIcon />}
            {patient.gender == "male" && <MaleIcon />}
          </h2>
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation}
          <br />
          <div>
            <h3>entries</h3>
            {patient.entries?.map((entry: Entry) => (
              <EntryDetails key={entry.id} entry={entry}></EntryDetails>
            ))}
          </div>
        </div>
      ) : (
        <div>no patient</div>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};
export default PatientPage;
