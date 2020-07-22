import React, { Component } from "react";
import ProdutoService from "../../app/produtoService";
import { withRouter } from "react-router-dom";
import Card from "../../components/Card";
import ProdutosTable from "./produtosTable";
export class ConsultaProdutos extends Component {
	state = {
		produtos: [],
	};

	constructor() {
		super();
		this.service = new ProdutoService();
	}

	componentDidMount() {
		const produtos = this.service.obterProdutos();
		this.setState({ produtos });
	}

	preparaEditar = (sku) => {
		console.log("sku para editar: ", sku);
		this.props.history.push(`/cadastro-produtos/${sku}`);
	};

	deletar = (sku) => {
		const produtos = this.service.deletar(sku);
		this.setState({ produtos });
	};

	render() {
		return (
			<Card header="Consulta de Produtos">
				<ProdutosTable produtos={this.state.produtos} editarAcao={this.preparaEditar} deletarAcao={this.deletar} />
			</Card>
		);
	}
}

export default withRouter(ConsultaProdutos);
