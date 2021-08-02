import React, { useState } from "react";
import Pomodoro from "./Pages/Pomodoro";

const App = () => {
	const [duration, setDuration] = useState({ work: 5, rest: 3 });
	return <Pomodoro duration={duration} setDuration={setDuration} />;
};

export default App;
