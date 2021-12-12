import React from 'react'
import swal from "sweetalert";
// import Button from "../../components/controls/Button";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

/// for Daialog start
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



export const Dialog = (props) => {
  return(
   <>
   <Dialog
              maxWidth="xl"
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Manufacture Add
              </DialogTitle>
              <DialogContent>
                <TextField
                  id="outlined-basic"
                  label="Manufacture Name"
                  variant="outlined"
                  // style={{ width: '300 px'  }}
                  style ={{width: '100%'}}
                  fullWidth
                  onChange={(e) => {
                    setManufactureName(e.target.value);
                  }}
                  required
                />
                
                <br></br>
                <br></br>
                <TextField
                  id="outlined-basic"
                  label="Manufacture Line"
                  variant="outlined"
                  // style={{ width: 300, marginBottom:20  }}
                  onChange={(e) => {
                    setManufactureLine(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClose();
                    saveManufacture();
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
   </>
   )
  }
