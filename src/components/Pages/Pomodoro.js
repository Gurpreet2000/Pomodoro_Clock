import React, { useEffect, useState, useRef } from "react";
import Layout from "../templates/Layout";
import Timer from "../organisms/Timer";
import Buttons from "../organisms/Buttons";
import Setting from "../organisms/Setting";

const Pomodoro = ({ duration, setDuration }) => {
	const [timer, setTimer] = useState({ seconds: duration.work, isRunning: false, type: "work" });
	const intervalRef = useRef();

	useEffect(() => {
		if (timer.seconds === 0) {
			onComplete();
		}
	}, [timer]);

	useEffect(() => {
		reset("work");
	}, [duration]);

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
		setTimeout(() => setTimer({ ...timer, isRunning: false, seconds: duration[next], type: next }), 250);
	};

	const onComplete = () => {
		if (timer.type === "work") reset("rest");
		else reset("work");
	};

	const getColor = (type = timer.type) => {
		if (type === "work") return "secondary";
		return "primary";
	};

	const getPercent = () => {
		const percent = ((duration[timer.type] - timer.seconds) / duration[timer.type]) * 100;
		return percent;
	};

	return (
		<Layout>
			<Timer seconds={timer.seconds} isRunning={timer.isRunning} percent={getPercent()} color={getColor()} />
			<Setting setDuration={setDuration} work={duration.work} rest={duration.rest} />
			<Buttons
				start={start}
				stop={stop}
				reset={reset}
				onComplete={onComplete}
				time={timer.seconds}
				color={getColor()}
			/>
		</Layout>
	);
};

export default Pomodoro;
