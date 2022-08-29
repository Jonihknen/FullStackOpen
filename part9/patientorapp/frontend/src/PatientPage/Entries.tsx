import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";

import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const borderStyle = {
  border: "2px solid black",
  marginTop: "2px",
  marginBottom: "2px",
};
const borderStyle2 = {
  borderTop: "2px groove",
  borderBottom: "2px groove",

  marginTop: "2px",
  marginBottom: "2px",
};

const diagnosisData = (entry: Entry) => {
  const [{ diagnoses }] = useStateValue();

  return entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
    <div>
      <b>diagnoses:</b>
      {entry.diagnosisCodes?.map((diag) => (
        <li key={diag}>
          {diag} {diagnoses?.find((obj) => obj.code === diag)?.name}
        </li>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

export const HospitalE: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div style={borderStyle}>
      <div>
        {entry.date} <LocalHospitalIcon />
        <br />
        {entry.description} <br />
        {diagnosisData(entry)}
      </div>
      {entry.discharge.date ? (
        <div style={borderStyle2}>
          discharge: {entry.discharge.date}
          <br />
          criteria: {entry.discharge.criteria} <br />
        </div>
      ) : (
        <div>not discharged yet</div>
      )}
      diagnose by: {entry.specialist}
    </div>
  );
};

export const OccupationalE: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div style={borderStyle}>
      {entry.date} <WorkHistoryIcon /> {entry.employerName}
      <br />
      {entry.description} <br />
      {diagnosisData(entry)}
      sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
      <br />
      diagnose by: {entry.specialist}
    </div>
  );
};

export const HealthcheckE: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <div style={borderStyle}>
      {entry.date} <MedicalInformationIcon />
      <br />
      {entry.description} <br />
      {diagnosisData(entry)}
      <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
      diagnose by: {entry.specialist}
    </div>
  );
};

export {};
