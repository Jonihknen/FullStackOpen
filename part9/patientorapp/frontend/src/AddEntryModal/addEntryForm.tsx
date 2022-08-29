import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryWithoutId } from "../types";
import {
  HealthOption,
  SelectField,
  TextField,
  TextFieldLeft,
  TextFieldRight,
} from "./entryFormField";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const healthrateOption: HealthOption[] = [
  { value: 0, label: "Very good" },
  { value: 1, label: "Good" },
  { value: 2, label: "OK" },
  { value: 3, label: "BAD" },
];

function dateIsValid(dateStr: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateStr.match(regex) === null) {
    return false;
  }
  const date = new Date(dateStr);
  const timestamp = date.getTime();
  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    return false;
  }
  return date.toISOString().startsWith(dateStr);
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [type, setType] = useState("");
  if (!type) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setType("HealthCheck")} variant="contained">
          Health check
        </Button>

        <Button
          onClick={() => setType("OccupationalHealthcare")}
          variant="contained"
        >
          Occupational
        </Button>

        <Button onClick={() => setType("Hospital")} variant="contained">
          hospital{" "}
        </Button>
      </div>
    );
  }
  if (type === "HealthCheck") {
    return (
      <Formik
        initialValues={{
          type: "HealthCheck",
          date: "",
          description: "",
          specialist: "",
          healthCheckRating: 0,
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (values.date.length > 1 && !dateIsValid(values.date)) {
            errors.date = "invalid date";
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="date"
                placeholder="yyyy-mm-dd"
                name="date"
                component={TextField}
              />
              <Field
                label="description"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <SelectField
                name="healthCheckRating"
                label="health rating"
                options={healthrateOption}
              />
              <Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{ float: "right" }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  }
  if (type === "OccupationalHealthcare") {
    return (
      <Formik
        initialValues={{
          type: "OccupationalHealthcare",
          date: "",
          description: "",
          specialist: "",
          employerName: "",
          sickLeave: { startDate: "", endDate: "" },
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (values.date.length > 1 && !dateIsValid(values.date)) {
            errors.date = "invalid date";
          }
          if (!values.description) {
            errors.description = requiredError;
          }

          if (!values.specialist) {
            errors.specialist = requiredError;
          }

          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="date"
                placeholder="yyyy-mm-dd"
                name="date"
                component={TextField}
              />
              <Field
                label="description"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label="sick leave start"
                placeholder="start date"
                name="sickLeave.startDate"
                component={TextFieldLeft}
              />
              <Field
                label="sick leave end"
                placeholder="end date"
                name="sickLeave.endDate"
                component={TextFieldRight}
              />
              <Field
                label="Emloyer name"
                placeholder="employer name"
                name="employerName"
                component={TextField}
              />
              <Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{ float: "right" }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  }
  if (type === "Hospital") {
    return (
      <Formik
        initialValues={{
          type: "Hospital",
          date: "",
          description: "",
          specialist: "",
          discharge: {
            date: "",
            criteria: "",
          },
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (values.date.length > 1 && !dateIsValid(values.date)) {
            errors.date = "invalid date";
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="date"
                placeholder="yyyy-mm-dd"
                name="date"
                component={TextField}
              />
              <Field
                label="description"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label="discharge date"
                placeholder="date"
                name="discharge.date"
                component={TextFieldLeft}
              />
              <Field
                label="disharge criteria"
                placeholder="criteria"
                name="discharge.criteria"
                component={TextField}
              />
              <Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{ float: "right" }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  } else {
    return null;
  }
};
