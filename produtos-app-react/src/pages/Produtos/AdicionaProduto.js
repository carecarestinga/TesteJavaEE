import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AdicionaProduto = React.createClass({

	getInitialState: function() {
		
		return {
			addObject: {
				id: '', 
				nome: '', 
				quantidade: '',
				sku: ''
			}
		}
    },
	
	render: function() {

		if(this.props.parent.state.showAddModal === false){
			return (<div></div>);
		}	
	
		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Adiciona Produto</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome</ControlLabel>
							<FormControl
								type="text"
								placeholder="Nome"
								value={this.state.addObject.nome}
								onChange={this.onAddProdutoNomeChange} />
							<br />
							
							<ControlLabel>Quantidade</ControlLabel>
							<FormControl
								type="text"
								placeholder="Quantidade"
								value={this.state.addObject.quantidade}
								onChange={this.onAddProdutoQuantidadeChange} />
							<br />
							<ControlLabel>Sku</ControlLabel>
							<FormControl
								type="text"
								placeholder="Sku"
								value={this.state.addObject.sku}
								onChange={this.onAddProdutoSkuChange} />
							<br />
							
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeAddModal}>Sair</Button>
					<Button bsStyle="primary" onClick={this.onAddBtnClicked}>Adicionar</Button>						
				</Modal.Footer>				
			</Modal>
		);
	},

	clearAddObject: function() {

		this.state.addObject.id = '';
		this.state.addObject.nome = '';
		this.state.addObject.quantidade = '';
		this.state.addObject.sku = '';
	},

	//Input changes
	onAddProdutoNomeChange: function(event) {
		this.state.addObject.nome = event.target.value;
		this.forceUpdate();
	},

	onAddProdutoQuantidadeChange: function(event) {
		this.state.addObject.quantidade = event.target.value;
		this.forceUpdate();
	},

	onAddProdutoSkuChange: function(event) {
		this.state.addObject.sku = event.target.value;
		this.forceUpdate();
	},

	onAddBtnClicked: function() {

		//Save meeting
		axios.post('http://localhost:8080/produtos/', this.state.addObject)
			.then(function (response) {
				this.props.parent.closeAddModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default AdicionaProduto;