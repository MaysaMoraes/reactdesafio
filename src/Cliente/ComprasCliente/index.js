import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../config"

export const ComprasCliente =() =>{
    
    const params = useParams()

    const [data, setData] = useState([])
    const [id] = useState(params.id)

    useEffect(()=>{
        const getCompras = async()=>{
            await axios.get(api+"/cartao/"+id+"/compras/promocao/:PromocaoId")
            .then((response)=>{
                console.log(response.data.compras)
                setData(response.data.compras)
            })
            .catch(()=>{
                console.log("Erro: sem conexão com a API.")
            })
        }

        getCompras()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-3">
                        <h1>Lista de Compras</h1>
                    </div>
                    <div className="p-2">
                        <Link to= "/listar-clientes" className="m-auto btn btn-outline-secondary btn-sm">Clientes</Link>
                    </div>
                </div> 

                <Table striped>
                    <thead>
                        <tr>
                            <th>Id do Cartão</th>
                            <th>Id da Promoção</th>
                            <th>Data da compra</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compras =>(
                            <tr key={compras.CartaoId}>
                                <th scope="row">{compras.CartaoId}</th>
                                <td>{compras.PromocaoId}</td>
                                <td>{compras.data}</td>
                                <td>{compras.quantidade}</td>
                                <td>{compras.valor}</td>
                                <td>
                                    <Link to={"/cartao/"+id+"/atualizarCompra/promocao/"+compras.PromocaoId} className="btn btn-outline-warning btn-sm">Editar</Link>
                                 </td>
                            </tr> 
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}