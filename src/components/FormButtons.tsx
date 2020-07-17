import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import FormSection from "components/FormSection";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles((theme: Theme) => ({
  cancelButton: {
    marginRight: theme.spacing(1),
  },
}));

interface FormButtonsProps {
  onCancel: () => void;
  submitLabel: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onCancel, submitLabel }) => {
  const classes = useStyles();
  return (
    <FormSection>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button onClick={() => onCancel()} className={classes.cancelButton}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {submitLabel}
        </Button>
      </Grid>
    </FormSection>
  );
};

export default FormButtons;
