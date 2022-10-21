import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField } from "@material-ui/core";
import { AlertComponent } from "../../../../components/organisms";

import validate from "validate.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 300,
    },
  },
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  message: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 131072,
    },
  },
};

const Form = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [alertComponent, setAlertComponent] = useState({
    openAlert: false,
    severity: "success",
    message: "",
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formState.isValid) {
      setAlertComponent({
        openAlert: true,
        severity: "success",
        message: t("Contact.alert.message"),
      });
      setTimeout(() => {
        window.location.replace("/");
      }, 1500);
    }

    setFormState((formState) => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form name="message-reset-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder="Name"
              label={t("Contact.form.textField.name")}
              variant="outlined"
              size="medium"
              name="name"
              fullWidth
              helperText={hasError("name") ? formState.errors.name[0] : null}
              error={hasError("name")}
              onChange={handleChange}
              type="text"
              value={formState.values.name || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="E-mail"
              label={t("Contact.form.textField.email")}
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              helperText={hasError("email") ? formState.errors.email[0] : null}
              error={hasError("email")}
              onChange={handleChange}
              type="email"
              value={formState.values.email || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Message"
              label={t("Contact.form.textField.message")}
              variant="outlined"
              size="medium"
              name="message"
              fullWidth
              helperText={
                hasError("message") ? formState.errors.message[0] : null
              }
              error={hasError("message")}
              onChange={handleChange}
              type="text"
              value={formState.values.message || ""}
              multiline
              rows={12}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              {t("Contact.form.button")}
            </Button>
          </Grid>
        </Grid>
      </form>
      <AlertComponent
        alertComponent={alertComponent}
        setAlertComponent={setAlertComponent}
      />
    </div>
  );
};

export default Form;
