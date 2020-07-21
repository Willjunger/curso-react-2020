import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cadastro from "./pages/Produtos";

export default function Rotas() {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/cadastro-produtos" component={Cadastro} />
			</Switch>
		</HashRouter>
	);
}
