import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Menu } from './Menu';
import { Clientes } from './Cliente/Clientes';
import { CadastrarCliente } from './Cliente/CadastrarCliente';
import { CartoesCliente } from './Cliente/CartoesCliente';
import { AtualizarCartao } from './Cliente/AtualizarCartao';
import { ComprasCliente } from './Cliente/ComprasCliente';
import { Promocao } from './Cliente/Promocao';
import { Empresas } from './Cliente/Empresa';
import { CadastrarEmpresa } from './Cliente/CadastrarEmpresa';
import { AtualizarCompra } from './Cliente/AtualizarCompra';
import { AtualizarPromocao } from './Cliente/AtualizarPromocao';
function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/listar-clientes' element={<Clientes/>}/>
        <Route path = '/novo-cliente' element={<CadastrarCliente/>}/>
        <Route path = "/cartoes-cliente/:id"  element={<CartoesCliente/> }/>
        <Route path = "/editar-cartao/:id"  element={<AtualizarCartao/> }/>
        <Route path = "/cartao/:id/compras/promocao/:PromocaoId"  element={<ComprasCliente/> }/>
        <Route path = "/cartao/:CartaoId/atualizarCompra/promocao/:PromocaoId"  element={<AtualizarCompra/> }/>
        <Route path = "/listar-empresas"  element={<Empresas/>}/>
        <Route path = "/nova-empresa"  element={<CadastrarEmpresa/>}/>
        <Route path = "/empresa/:id/promocao"  element={<Promocao/>}/>
        <Route path = "/editar-promocao/:id"  element={<AtualizarPromocao/>}/>
  
      </Routes>
    </div>
  );
}

export default App;
