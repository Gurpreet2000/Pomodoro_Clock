import React from "react";
import CircularProgressWithLabel from "../molecules/CircularProgressWithLabel ";

const Timer = ({ seconds, isRunning, percent, color }) => {
	const formatTime = (seconds) => {
		let min = Math.floor(seconds / 60);
		if (min < 10) min = "0" + min;
		let sec = seconds - min * 60;
		if (sec < 10) sec = "0" + sec;
		return `${min} : ${sec}`;
	};

	return (
		<CircularProgressWithLabel
			value={100 - percent}
			size={250}
			color={color}
			thickness={1}
			text={formatTime(seconds)}
		/>
	);
};

export default Timer;
