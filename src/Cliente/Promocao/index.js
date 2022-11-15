import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../config"

export const Promocao =() =>{

    const params = useParams()

    const [data, setData] = useState([])
    const [id] = useState(params.id)

    useEffect(()=>{
        const getPromocao = async()=>{
            await axios.get(api+"/empresa/"+id+"/promocao")
            .then((response)=>{
                console.log(response.data.promo)
                setData(response.data.promo)
            })
            .catch(()=>{
                console.log("Erro: sem conexão com a API.")
            })
        }

        getPromocao()
    },[id])



    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Promoções</h1>
                    </div>
                    <div className="p-2">
                        <Link to= "/listar-empresas" className="m-auto btn btn-outline-secondary btn-sm">Empresas</Link>
                    </div>
                </div>


                <Table striped>
                    <thead>
                        <tr>
                            <th>Id da Promoção</th>
                            <th>Id da Empresa</th>
                            <th>Descrição</th>
                            <th>Validade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(promo =>(
                            <tr key={promo.id}>
                                <th scope="row">{promo.id}</th>
                                <td>{promo.EmpresaId}</td>
                                <td>{promo.nome}</td>
                                <td>{promo.descricao}</td>
                                <td>{promo.validade}</td>
                                <td>
                                    <Link to={"/editar-promocao/" + promo.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                                 </td>

                            </tr> 
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}