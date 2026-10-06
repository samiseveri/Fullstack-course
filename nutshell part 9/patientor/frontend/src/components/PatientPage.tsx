import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import axios from "axios";
import patientService from "../services/patients";
import { Diagnosis, EntryWithoutId, Gender, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      const data = await patientService.getById(id);
      setPatient(data);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>loading...</div>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  const submitEntry = async (values: EntryWithoutId) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({ ...patient, entries: (patient.entries ?? []).concat(entry) });
      setShowForm(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;
        if (typeof data === "string") {
          setError(data);
        } else if (data && typeof data === "object" && "error" in data) {
          setError(JSON.stringify(data.error));
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        {patient.name} {genderIcon()}
      </Typography>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      {!showForm && (
        <Button
          variant="contained"
          sx={{ marginY: 2 }}
          onClick={() => setShowForm(true)}
        >
          Add New Entry
        </Button>
      )}

      {showForm && (
        <AddEntryForm
          diagnoses={diagnoses}
          error={error}
          onCancel={() => {
            setShowForm(false);
            setError(undefined);
          }}
          onSubmit={submitEntry}
        />
      )}

      <Typography variant="h5" sx={{ marginTop: 2 }}>
        entries
      </Typography>
      {(patient.entries ?? []).map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
