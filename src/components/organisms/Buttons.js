import React, { Fragment, useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const Buttons = ({ start, stop, reset, onComplete, time, color }) => {
	const [status, setStatus] = useState(-1);

	useEffect(() => {
		if (time === 0) {
			setStatus(-1);
		}
	}, [time]);

	const onClick = (fn, nextStatus) => {
		return () => {
			fn();
			setStatus(nextStatus);
		};
	};

	const renderButtons = () => {
		let btnA = { text: "null", props: {} },
			btnB = { text: "", props: {} };
		switch (status) {
			case 0:
				btnA.text = "Resume";
				btnB.text = "Done";
				btnA.props.onClick = onClick(start, 1);
				btnB.props.onClick = onClick(onComplete, -1);
				break;
			case 1:
				btnA.text = "Pause";
				btnB.text = "Stop";
				btnA.props.onClick = onClick(stop, 0);
				btnB.props.onClick = onClick(reset, -1);
				break;
			default:
				btnA.text = "Start";
				btnB.text = "Stop";
				btnA.props.onClick = onClick(start, 1);
				btnB.props.color = "default";
				btnB.props.disableRipple = true;
		}

		return (
			<div className="buttons">
				<Button variant="contained" color={color} {...btnA.props}>
					{btnA.text}
				</Button>
				<Button variant="contained" color={color} {...btnB.props}>
					{btnB.text}
				</Button>
			</div>
		);
	};
	return renderButtons();
};

export default Buttons;
