import React, { Component } from 'react';
import './produtos.css';
//import ReleaseForm from './ReleaseForm';

export default class EnviaProdutosForm extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            produtos: [
                {
                    id: 1,
                    nome: 'produto1',
                    quantidade: 17
                },
                {
                    id: 2,
                   nome: 'produto2',
                    quantidade: 33
                },
                {
                    id: 3,
                   nome: 'produto3',
                    quantidade: 56
                },
                {
                    id: 4,
                   nome: 'produto4',
                    quantidade: 23
                }
            ]
        }
    }

    handleSubmit(e, {nome, quantidade}) {
        e.preventDefault();
        var state = this.state;
        var listaProdutos = {
            id: state.produtos.length + 1,
            nome: nome,
            quantidade: quantidade
        }
        this.setState({produtos: state.produtos.concat(listaProdutos)});
    }

    handleRemove(id){
        
        var listaProdutos = this.state.produtos;
        listaProdutos.splice(id, 1)
        this.setState({produtos: listaProdutos});
    }




    render() {




        return (
          <div id="div-left" >
          <h3> Lista dos Pedidos</h3>
             <form className="form-inline">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NOME</th>
                            <th>QUANTIDADE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.produtos.map((produto, index) => {
                            const onClickRemove = (e) => {
                                this.handleRemove(index);
                            }
                            return (
                                <tr key={produto.id}>
                                          

                                    <th scope="row">{produto.id}</th>
                                    <td>{produto.nome}</td>

                                    <td  > <button onClick={this.decrement}>-</button>
                                    <span>{this.state.count}</span>
                                    {produto.quantidade}
                                    <button onClick={this.increment}>+</button></td>

                                    <td><button type="button" className="btn btn-danger btn-sm" onClick={onClickRemove}>Remove</button></td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                <div id="btnEnviar" >
               <button type="submit" className="btn btn-primary">Enviar</button>
               <button type="submit" className="btn btn-primary">Limpar</button>
               </div>

              </form>
            </div>
        );
    }
}