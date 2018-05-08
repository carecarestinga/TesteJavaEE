import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import MainTemplate from './pages/MainTemplate';
import Funcionarios from './pages/Funcionarios';
import Departamentos from './pages/Departamentos';
import Produtos from './pages/Produtos';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={MainTemplate}>
			<Route path="produtos" components={{main: Produtos}} />
			<Route path="departamentos" components={{main: Departamentos}} />
			<Route path="funcionarios" components={{main: Funcionarios}} />
		</Route>
	</Router>,
	document.getElementById('root')
);
