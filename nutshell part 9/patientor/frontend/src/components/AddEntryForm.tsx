import { useState, type SyntheticEvent } from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => Promise<void>;
  onCancel: () => void;
  error?: string;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ onSubmit, onCancel, error, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    if (type === "HealthCheck") {
      await onSubmit({
        ...base,
        type: "HealthCheck",
        healthCheckRating,
      });
    } else if (type === "Hospital") {
      await onSubmit({
        ...base,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      });
    } else {
      await onSubmit({
        ...base,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave:
          sickLeaveStart && sickLeaveEnd
            ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
            : undefined,
      });
    }
  };

  return (
    <Box sx={{ border: "dashed 1px gray", padding: 2, marginY: 2 }}>
      <Typography variant="h6">New {type} entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={submit}>
        <InputLabel sx={{ marginTop: 1 }}>Type</InputLabel>
        <Select
          fullWidth
          value={type}
          onChange={(event: SelectChangeEvent) => setType(event.target.value as EntryType)}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </Select>

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginTop: 1 }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginTop: 1 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ marginTop: 1 }}
        />

        <InputLabel sx={{ marginTop: 1 }}>Diagnosis codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={(event) => {
            const value = event.target.value;
            setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
          }}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>

        {type === "HealthCheck" && (
          <>
            <InputLabel sx={{ marginTop: 1 }}>Health check rating</InputLabel>
            <Select
              fullWidth
              value={String(healthCheckRating)}
              onChange={(event: SelectChangeEvent) =>
                setHealthCheckRating(Number(event.target.value) as HealthCheckRating)
              }
            >
              <MenuItem value={0}>Healthy (0)</MenuItem>
              <MenuItem value={1}>Low risk (1)</MenuItem>
              <MenuItem value={2}>High risk (2)</MenuItem>
              <MenuItem value={3}>Critical risk (3)</MenuItem>
            </Select>
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              sx={{ marginTop: 1 }}
            />
            <TextField
              label="Sick leave start"
              type="date"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: 1 }}
            />
            <TextField
              label="Sick leave end"
              type="date"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: 1 }}
            />
          </>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: 1 }}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              sx={{ marginTop: 1 }}
            />
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button color="secondary" variant="contained" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEntryForm;
