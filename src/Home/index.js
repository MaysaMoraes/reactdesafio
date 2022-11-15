import { Link } from "react-router-dom"
import { Container } from "reactstrap"

export const Home =() =>{
    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-4">
                        <h1>BEM-VINDO(A)</h1>
                        <p className="p-1">Desafio React - Maysa Moraes</p>
                    </div>
                </div> 

                <div>
                    <div className="p-2">
                            <Link to= "/listar-clientes" className="m-auto btn btn-outline-info btn-lg active">Clientes</Link>
                    </div>
                    <div className="p-3">
                            <Link to= "/listar-empresas" className="m-auto btn btn-outline-warning btn-lg active">Empresas</Link>
                    </div>
                    <div className="p-3">
                            <Link to= "/novo-cliente" className="m-auto btn btn-outline-info btn-lg active">Novo Cliente</Link>
                    </div>
                    
                    <div className="p-3">
                            <Link to= "/nova-empresa" className="m-auto btn btn-outline-warning btn-lg active">Nova Empresa</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}