import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SettingsIcon from "@material-ui/icons/Settings";

const FormDialog = ({ changeIntervals, work, rest }) => {
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = React.useState({ work, rest });

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		changeIntervals(formData);
	};

	return (
		<div>
			<IconButton color="inherit" onClick={handleClickOpen}>
				<SettingsIcon />
			</IconButton>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" color="primary">
				<DialogTitle id="form-dialog-title">Settings</DialogTitle>
				<DialogContent>
					<DialogContentText>All values are in minutes</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="work"
						label="Work Time(in minutes)"
						type="text"
						value={formData.work}
						onChange={(e) => {
							setFormData({ ...formData, work: e.target.value });
						}}
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Rest Time(in minutes)"
						type="text"
						value={formData.rest}
						onInput={(e) => {
							setFormData({ ...formData, rest: e.target.value });
						}}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default FormDialog;
