import React, { useEffect, useState, useRef } from "react";
import Timer from "../organisms/Timer";
import Buttons from "../organisms/Buttons";
import Setting from "../organisms/Setting";

const Pomodoro = ({ time }) => {
	const [timer, setTimer] = useState({ seconds: time.work, isRunning: false, type: "work" });
	const intervalRef = useRef();

	useEffect(() => {
		if (timer.seconds === 0) {
			onComplete();
		}
	}, [timer]);

	const start = () => {
		if (timer.isRunning === false)
			intervalRef.current = setInterval(() => {
				setTimer((prevTimer) => ({ ...prevTimer, seconds: prevTimer.seconds - 1, isRunning: true }));
			}, 1000);
	};

	const stop = () => {
		if (timer.isRunning === true) {
			clearInterval(intervalRef.current);
			setTimer({ ...timer, isRunning: false });
		}
	};

	const reset = (next = timer.type) => {
		clearInterval(intervalRef.current);
		setTimeout(() => setTimer({ ...timer, isRunning: false, seconds: time[next], type: next }), 250);
	};

	const onComplete = () => {
		console.log("oncomp");
		if (timer.type === "work") reset("rest");
		else reset("work");
	};

	const getColor = (type = timer.type) => {
		if (type === "work") return "secondary";
		return "primary";
	};

	const getPercent = () => {
		const percent = ((time[timer.type] - timer.seconds) / time[timer.type]) * 100;
		return percent;
	};

	return (
		<div>
			<Timer seconds={timer.seconds} isRunning={timer.isRunning} percent={getPercent()} color={getColor()} />
			<Buttons
				start={start}
				stop={stop}
				reset={reset}
				onComplete={onComplete}
				isRunning={timer.isRunning}
				color={getColor()}
			/>
		</div>
	);
};

export default Pomodoro;
