import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cadastro from "./pages/Produtos";
import ConsultaProdutos from "./pages/Produtos/consulta";

export default function Rotas() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/cadastro-produtos/:sku?" component={Cadastro} />
			<Route exact path="/consulta-produtos" component={ConsultaProdutos} />
		</Switch>
	);
}
