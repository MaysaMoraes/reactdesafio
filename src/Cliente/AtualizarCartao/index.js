import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const AtualizarCartao =() =>{

    const params = useParams();
    const [id, setId] = useState(params.id)
    const [ClienteId, setClienteId] = useState()
    const [dataCartao, setDataCartao] = useState()
    const [validade, setValidade] = useState()
    
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtCartao = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type' : 'application/json'
        }

        await axios.put(api+"/editar-cartao/"+id,
        {id, ClienteId, dataCartao, validade}, {headers})
        .then((response)=>{
            setStatus({
                type: 'success',
                message: 'Atualizado com sucesso.'
            })
            console.log(response.data.type)
            console.log(response.data.message)
        })
        .catch(()=>{
            setStatus({
                type: "error",
                message: "Erro: não foi possÍvel atualizar o cartão."
            })
        })
    }

    useEffect(()=>{
        const getCartao = async()=>{
            await axios.get(api+"/cartao/"+id)
            .then((response)=> {
                setId(response.data.cardcli.id)
                setClienteId(response.data.cardcli.ClienteId)
                setDataCartao(response.data.cardcli.dataCartao)
                setValidade(response.data.cardcli.validade)

                console.log(response.data.cardcli.id)
                console.log(response.data.cardcli.ClienteId)
                console.log(response.data.cardcli.dataCartao)
                console.log(response.data.cardcli.validade)
            })
            .catch(()=>{
                console.log("Erro: sem conexão com a API.")
            })
        }
        getCartao()
    }, [id])




    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Atualizar Cartao</h1>
                    </div>
                    <div className="p-2">
                        <Link to= "/listar-clientes" className="m-auto btn btn-outline-secondary btn-sm">Clientes</Link>
                    </div>
                </div>

                <div>
                    <hr className="m-1"></hr>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === "success" ? <Alert color="success">{status.message}</Alert> : '' }
                </div>

                <Form className="p-2" onSubmit={edtCartao}>
                    <FormGroup className="p-2">
                        <Label>Id do Cartão</Label>
                        <Input
                            name="id"
                            placeholder="Id do Pedido"
                            type="text"
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Data do Cartão</Label>
                        <Input
                            name="dataCartao"
                            placeholder="Data do cartão"
                            type="text"
                            value={dataCartao} onChange={e=> setDataCartao(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Id do Cliente</Label>
                        <Input
                            name="ClienteId"
                            placeholder="Id do Cliente"
                            type="text"
                            defaultValue={ClienteId}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Data de Validade</Label>
                        <Input
                            name="validade"
                            placeholder="Data de validade"
                            type="text"
                            value={validade} onChange={e=> setValidade(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="d-flex">
                    <Button type="submit" outline color='warning'>Atualizar</Button>
                    <Button type="reset" outline color='danger'>Limpar</Button>
                    </FormGroup>
                </Form>

            </Container>
        </div>
    )
}