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
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

interface FormButtonsProps {
  onCancel: () => void;
  onDelete?: () => void;
  submitLabel: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  onCancel,
  onDelete,
  submitLabel,
}) => {
  const classes = useStyles();
  return (
    <FormSection>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          {onDelete && (
            <Button
              variant="outlined"
              color="inherit"
              className={classes.deleteButton}
              onClick={() => onDelete && onDelete()}
            >
              Delete
            </Button>
          )}
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button onClick={() => onCancel()} className={classes.cancelButton}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {submitLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </FormSection>
  );
};

export default FormButtons;
