import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AtualizaProduto = React.createClass({

	getInitialState: function() {

		return {
			updateObject: {
				id: '', 
				nome: '', 
				quantidade: '',
				sku: '',
			}
		}
    },

	render: function() {
		
		if(this.props.parent.state.showUpdateModal === false){
			return (<div></div>);
		}

		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Atualiza Produto</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome</ControlLabel>
							<FormControl
								type="text"
								placeholder="Nome"
								value={this.state.updateObject.nome}
								onChange={this.onUpdateProdutoNomeChange} />
							<br />
							
							<ControlLabel>Quantidade</ControlLabel>
							<FormControl
								type="text"
								placeholder="Quantidade"
								value={this.state.updateObject.quantidade}
								onChange={this.onUpdateProdutoQuantidadeChange} />
							<br />	
							<ControlLabel>Sku</ControlLabel>
							<FormControl
								type="text"
								placeholder="Sku"
								value={this.state.updateObject.sku}
								onChange={this.onUpdateProdutoSkuChange} />
							<br />					
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeUpdateModal}>Sair</Button>
					<Button bsStyle="primary" onClick={this.onUpdateBtnClicked}>Atualizar</Button>						
				</Modal.Footer>
			</Modal>
		);
	},

	fillUpdateObject: function() {

    	var selectedProduto = this.props.parent.getProdutoById(this.props.parent.state.selectedProdutoId);

		this.state.updateObject = {
			id: selectedProduto.id, 
			nome: selectedProduto.nome, 
			quantidade: selectedProduto.quantidade,
			sku: selectedProduto.sku,
		}
	},

	clearUpdateObject: function() {
		
		this.state.updateObject.id = '';
		this.state.updateObject.nome = '';
		this.state.updateObject.quantidade = '';
		this.state.updateObject.sku = '';
	},

	//Input changes
	onUpdateProdutoNomeChange: function(event) {
		this.state.updateObject.nome = event.target.value;
		this.forceUpdate();
	},

	onUpdateProdutoQuantidadeChange: function(event) {
		this.state.updateObject.quantidade = event.target.value;
		this.forceUpdate();
	},	

	onUpdateProdutoSkuChange: function(event) {
		this.state.updateObject.sku = event.target.value;
		this.forceUpdate();
	},

	onUpdateBtnClicked: function() {
		
		axios.put('http://localhost:8080/produtos/' + this.state.updateObject.id, this.state.updateObject)
			.then(function (response) {
				this.props.parent.closeUpdateModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default AtualizaProduto;