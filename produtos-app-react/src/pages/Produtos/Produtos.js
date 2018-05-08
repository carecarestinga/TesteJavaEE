import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './produtos.css';
import AdicionaProdutoModal from './AdicionaProduto';
import AtualizaProdutoModal from './AtualizaProduto';
//import EnviaProdutosForm from './EnviaProdutosForm';
import ListaProdutosForm from './ListaProdutosForm';
import EnviaProdutosForm from './EnviaProdutosForm';


var Produtos = React.createClass({

	getInitialState: function() {

		return {
			data: null,
			selectedProdutoId: null,
			showAddModal: false,
			showUpdateModal: false,

	      	segments:this.props.data,
            selected: []
		}
		var enviaLista = [
		    {id: 1, nome: "nome1", quantidade: 10, sku: 11111},
		    {id: 2, nome: "nome2", quantidade: 20, sku: 22222},
		    {id: 3, nome: "nome3", quantidade: 30, sku: 33333},
		    {id: 4, nome: "nome4", quantidade: 40, sku: 44444}
		];


    },

 	selectFirstRow: function(e){
      this.setState({
        selected: [this.props.data[0].unitId]
      });
    },

    unselectAllRow: function(e){
      this.setState({
        selected: []
      });
    },

	
	componentDidMount: function() {
		this.refreshTable();
	},
	
	render: function() {

		var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            selected: this.state.selected  //give a default selected row.
        };

		var selectRowProp = {
			mode: "radio",
			clickToSelect: true,
			className: "selected-row",
			bgColor: 'rgb(101, 148, 255)',
			onSelect: this.onRowSelect
		};		
		
		if(!this.state.data){
			return (<div></div>);
		}
		
		return (
<div id="produtos-body">


					
					<ListaProdutosForm />

			
					<EnviaProdutosForm />









</div>	


						
		);
	},
	
	// Keep selected row
	onRowSelect: function(row, isSelected) {
		if(isSelected) {
			this.setState({ selectedProdutoId: row.id });
		}else {
			this.setState({ selectedProdutoId: null });
		}
	},

	//Add modal open/close
	closeAddModal: function() {
		this.setState({ showAddModal: false });
		this.refs.adicionaProduto.clearAddObject();
	},

	openAddModal: function() {
		this.refs.adicionaProduto.clearAddObject();		
		this.setState({ showAddModal: true });
	},

	//Update modal open/close
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.atualizaProduto.clearUpdateObject();
	},

	openUpdateModal: function() {
		this.refs.atualizaProduto.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//BEGIN: Delete Meeting
	onDeleteBtnClicked: function() {
		
		axios.delete('http://localhost:8080/produtos/' + this.state.selectedProdutoId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});		
	},
	//END: Delete Meeting
	
	getProdutoById: function(id) {
		
		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	},


	getProdutos: function() {
	  return axios.get('http://localhost:8080/produtos');
	},

	refreshTable: function() {
		
		axios.all([this.getProdutos()])
		.then(axios.spread(function (produtos) {
			this.setState({data: produtos.data});
		}.bind(this)));
	}
});

export default Produtos;