import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class AdicionarDepartamento extends React.Component{

	getInitialState() {

		return {
			addObject: {
				departamento_id: '', 
				nome: '', 
				descricao: ''
			}
		}
    };

	render() {

		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Criar Departamento</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome do Departamento</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Nome"
								value={this.state.addObject.name}
								onChange={this.onAddDepartamentoNomeChange} />
							<br />
							
							<ControlLabel>Descricao do Departamento</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite a Descricao"
								value={this.state.addObject.descricao}
								onChange={this.onAddDepartamentoDescricaoChange} />
							<br />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeAddModal}>Sair</Button>
					<Button bsStyle="primary" onClick={this.onAddBtnClicked}>Salvar</Button>						
				</Modal.Footer>				
			</Modal>
		);
	};

	clearAddObject() {

		this.state.addObject.departamento_id = '';
		this.state.addObject.nome = '';
		this.state.addObject.descricao = '';
	};

	//Input changes
	onAddDepartamentoNomeChange(event) {
		this.state.addObject.nome = event.target.value;
		this.forceUpdate();
	};

	onAddDepartamentoDescricaoChange(event) {
		this.state.addObject.descricao = event.target.value;
		this.forceUpdate();
	};
	
	onAddBtnClicked() {

		//Salvar departamento
		axios.post('http://localhost:8080/departamentos/', this.state.addObject)
			.then(function (response) {
				this.props.parent.closeAddModal();
				this.props.parent.refreshTable();
				console.log(response);
//                                console.log(addObject);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
//                                console.log(addObject);
			});
	}
}