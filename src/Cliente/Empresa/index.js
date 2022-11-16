import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../config"

export const Empresas =() =>{

    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getEmpresas = async () => {
        await axios.get(api + "/listar-empresas")
            .then((response) => {
                console.log(response.data.emp)
                setData(response.data.emp)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."

                })
                console.log("Erro: sem conexão com a API.")
            })
    }

    const delEmpresa = async(idEmpresa) =>{
        console.log(idEmpresa)

        const headers ={
            "Content-Type" : 'application/json'
        }

        await axios.delete(api+"/excluir-empresa/"+idEmpresa,
        {headers})
        .then((response)=>{
            console.log(response.data.type)
            console.log(response.data.message)
            getEmpresas()
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: "Erro: não foi possível conectar-se a API "
            })
        })
    }

    useEffect(() => {
        getEmpresas();
    }, [])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-3">
                        <h1>Empresas</h1>
                    </div> 
                    <div className="p-2">
                            <Link to= "/nova-empresa" className="m-auto btn btn-outline-secondary btn-sm ">Inserir</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome da Empresa</th>
                            <th>Data de Adesão</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(emp =>(
                            <tr key={emp.id}>
                                <th scope="row">{emp.id}</th>
                                <td>{emp.nome}</td>
                                <td>{emp.dataAdesao}</td>
                                <td><Link to={"/empresa/" + emp.id+"/promocao"}className="btn btn-outline-secondary btn-sm">Promoções</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> delEmpresa(emp.id)}>Excluir</span>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}