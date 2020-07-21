import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ProdutoService from "../../app/produtoService";
const estadoInicial = {
	nome: "",
	sku: "",
	descricao: "",
	preco: 0,
	fornecedor: "",
	sucesso: false,
	errors: [],
	atualizando: false,
};

class Cadastro extends Component {
	state = estadoInicial;

	constructor() {
		super();
		this.service = new ProdutoService();
	}

	onChange = (event) => {
		const valor = event.target.value;
		const nomeCampo = event.target.name;
		this.setState({ [nomeCampo]: valor });
	};

	onSubmit = (event) => {
		const produto = {
			nome: this.state.nome,
			sku: this.state.sku,
			descricao: this.state.descricao,
			preco: this.state.preco,
			fornecedor: this.state.fornecedor,
		};
		try {
			this.service.salvar(produto);
			this.limpaCampos();
			this.setState({ sucesso: true });
		} catch (erro) {
			const errors = erro.errors;
			this.setState({ errors: errors });
		}
	};

	limpaCampos = () => {
		this.setState(estadoInicial);
	};

	componentDidMount() {
		const sku = this.props.match.params.sku;

		if (sku) {
			const resultado = this.service.obterProdutos().filter((produto) => produto.sku === sku);
			if (resultado.length === 1) {
				const produtoEncontrado = resultado[0];
				this.setState({ ...produtoEncontrado, atualizando: true });
			}
		}
	}

	render() {
		return (
			<div className="card">
				<div className="card-header">{this.state.atualizando ? "Atualização" : "Cadastro"} de Produtos</div>
				<div className="card-body">
					{this.state.sucesso && (
						<div class="alert alert-dismissible alert-success">
							<button type="button" class="close" data-dismiss="alert">
								&times;
							</button>
							<strong>Bem feito!</strong> Cadastro realizado com sucesso!
						</div>
					)}

					{this.state.errors.length > 0 &&
						this.state.errors.map((msg) => {
							return (
								<div className="alert alert-dismissible alert-danger">
									<button type="button" className="close" data-dismiss="alert">
										&times;
									</button>
									<strong>Erro!</strong> {msg}
								</div>
							);
						})}

					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label>Nome: *</label>
								<input className="form-control" name="nome" value={this.state.nome} type="text" onChange={this.onChange} />
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group">
								<label>SKU: *</label>
								<input disabled={this.state.atualizando} className="form-control" name="sku" type="text" value={this.state.sku} onChange={this.onChange} />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label>Descrição</label>
								<textarea className="form-control" name="descricao" value={this.state.descricao} onChange={this.onChange} />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label>Preço: *</label>
								<input className="form-control" name="preco" type="text" value={this.state.preco} onChange={this.onChange} />
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label>Fornecedor: *</label>
								<input className="form-control" name="fornecedor" type="text" value={this.state.fornecedor} onChange={this.onChange} />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-1">
							<button className="btn btn-success" onClick={this.onSubmit} type="submit">
								{this.state.atualizando ? "Atualizar" : "Salvar"}
							</button>
						</div>
						<div className="col-md-1">
							<button className="btn btn-primary" onClick={this.limpaCampos} type="submit">
								Limpar
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Cadastro);
