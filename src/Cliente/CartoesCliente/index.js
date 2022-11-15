import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../config"

export const CartoesCliente =() =>{

    const params = useParams()

    const [data, setData] = useState([])
    const [id] = useState(params.id)

    useEffect(()=>{
        const getCartoes = async()=>{
            await axios.get(api+"/clientes/"+id+"/cartaos")
            .then((response)=>{
                console.log(response.data.cartaos)
                setData(response.data.cartaos)
            })
            .catch(()=>{
                console.log("Erro: sem conexão com a API.")
            })
        }

        getCartoes()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cartões do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to= "/listar-clientes" className="m-auto btn btn-outline-secondary btn-sm">Clientes</Link>
                    </div>
                </div>


                <Table striped>
                    <thead>
                        <tr>
                            <th>Id do Cartão</th>
                            <th>Id do Cliente</th>
                            <th>Data do Cartão</th>
                            <th>Validade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cartaos =>(
                            <tr key={cartaos.id}>
                                <th scope="row">{cartaos.id}</th>
                                <td>{cartaos.ClienteId}</td>
                                <td>{cartaos.dataCartao}</td>
                                <td>{cartaos.validade}</td>
                                <td>
                                   
                                    <Link to={"/cartao/"+cartaos.id +"/compras/promocao/:PromocaoId"} className="btn btn-outline-secondary btn-sm">Compras</Link>
                                    <Link to={"/editar-cartao/" + cartaos.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                                 </td>

                            </tr> 
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}