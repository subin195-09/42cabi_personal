// ./src/routes/main.tsx

import * as React from 'react';
import axios from 'axios';

const back_url = 'http://localhost:4242/hello';

const handleClick = () => {
	axios.post(back_url, {
		data: 'hello'
	}).then((res) => console.log(res.data)).catch((err)=>console.log(err));
}

const Main = () => {
	return (
		<button onClick={handleClick}>
			hello
		</button>
	)
}

export default Main;
