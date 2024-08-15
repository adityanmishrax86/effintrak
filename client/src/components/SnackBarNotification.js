import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Notify({ data, label }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={handleClose}
      message={data?.message}
      action={action}
    />
  );
}
