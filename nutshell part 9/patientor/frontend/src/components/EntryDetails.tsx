import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Diagnosis, Entry, HealthCheckRating } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const healthColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return assertNever(rating);
  }
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const diagnosisNames = (codes: string[] | undefined) =>
    codes?.map((code) => {
      const diagnosis = diagnoses.find((d) => d.code === code);
      return (
        <li key={code}>
          {code} {diagnosis?.name}
        </li>
      );
    });

  switch (entry.type) {
    case "Hospital":
      return (
        <Box sx={{ border: "1px solid black", borderRadius: 2, padding: 1.5, marginY: 1 }}>
          <Typography>
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography><em>{entry.description}</em></Typography>
          <ul>{diagnosisNames(entry.diagnosisCodes)}</ul>
          <Typography>
            discharge: {entry.discharge.date} {entry.discharge.criteria}
          </Typography>
          <Typography>diagnose by {entry.specialist}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={{ border: "1px solid black", borderRadius: 2, padding: 1.5, marginY: 1 }}>
          <Typography>
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography><em>{entry.description}</em></Typography>
          <ul>{diagnosisNames(entry.diagnosisCodes)}</ul>
          {entry.sickLeave && (
            <Typography>
              sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography>diagnose by {entry.specialist}</Typography>
        </Box>
      );
    case "HealthCheck":
      return (
        <Box sx={{ border: "1px solid black", borderRadius: 2, padding: 1.5, marginY: 1 }}>
          <Typography>
            {entry.date} <MedicalServicesIcon />
          </Typography>
          <Typography><em>{entry.description}</em></Typography>
          <ul>{diagnosisNames(entry.diagnosisCodes)}</ul>
          <FavoriteIcon htmlColor={healthColor(entry.healthCheckRating)} />
          <Typography>diagnose by {entry.specialist}</Typography>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
