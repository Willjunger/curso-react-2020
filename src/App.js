import React from "react";

import Navbar from "./components/Navbar";
import Rotas from "./routes";

function App() {
	return (
		<>
			<div className="container">
				<Navbar />
				<Rotas />
			</div>
		</>
	);
}

export default App;
