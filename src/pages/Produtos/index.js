import React, { Component } from "react";

import ProdutoService from "../../app/produtoService";
const estadoInicial = {
	nome: "",
	sku: "",
	descricao: "",
	preco: 0,
	fornecedor: "",
	sucesso: false,
};

export default class Cadastro extends Component {
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

		this.service.salvar(produto);
		this.limpaCampos();
		this.setState({ sucesso: true });
	};

	limpaCampos = () => {
		this.setState(estadoInicial);
	};

	render() {
		return (
			<div className="card">
				<div className="card-header">Cadastro de Produtos</div>
				<div className="card-body">
					{this.state.sucesso && (
						<div class="alert alert-dismissible alert-success">
							<button type="button" class="close" data-dismiss="alert">
								&times;
							</button>
							<strong>Bem feito!</strong> Cadastro realizado com sucesso!
						</div>
					)}

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
								<input className="form-control" name="sku" type="text" value={this.state.sku} onChange={this.onChange} />
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
								Salvar
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
