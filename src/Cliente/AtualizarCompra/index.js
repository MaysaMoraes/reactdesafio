import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const AtualizarCompra =() =>{

    const params = useParams();
    const [CartaoId, setCartaoId] = useState(params.CartaoId)
    const [PromocaoId, setPromocaoId] = useState(params.PromocaoId)
    const [data, setData] = useState()
    const [quantidade, setQuantidade] = useState()
    const [valor, setValor] = useState()
    
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type' : 'application/json'
        }

        await axios.put(api+"/cartao/"+CartaoId+"/atualizarCompra/promocao/"+PromocaoId,
        {CartaoId, PromocaoId, data, quantidade,valor}, {headers})
        .then((response)=>{
            setStatus({
                type: 'success',
                message: 'Atualizada com sucesso.'
            })
            console.log(response.data.type)
            console.log(response.data.message)
        })
        .catch(()=>{
            setStatus({
                type: "error",
                message: "Erro: não foi possível atualizar a compra."
            })
        })
    }

    useEffect(()=>{
        const getCompras = async()=>{
            await axios.get(api+"/cartao/"+CartaoId+"/compras/promocao/"+PromocaoId)
            .then((response)=> {
                setCartaoId(response.data.compras.CartaoId)
                setPromocaoId(response.data.compras.PromocaoId)
                setData(response.data.compras.data)
                setQuantidade(response.data.compras.quantidade)
                setValor(response.data.compras.valor)

                console.log(response.data.compras.CartaoId)
                console.log(response.data.compras.PromocaoId)
                console.log(response.data.compras.data)
                console.log(response.data.compras.quantidade)
            })
            .catch(()=>{
                console.log("Erro: sem conexão com a API.")
            })
        }
        getCompras()
    }, [CartaoId, PromocaoId])




    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Atualizar Compra</h1>
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

                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>Id do Cartão</Label>
                        <Input
                            name="CartaoId"
                            placeholder="Id do Cartão"
                            type="text"
                            defaultValue={CartaoId}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Id da Promoção</Label>
                        <Input
                            name="PromocaoId"
                            placeholder="Id da Promoção"
                            type="text"
                            defaultValue={PromocaoId}  
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input
                            name="data"
                            placeholder="Data"
                            type="text"
                            value={data} onChange={e=> setData(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Quantidade</Label>
                        <Input
                            name="quantidade"
                            placeholder="Quantidade"
                            type="text"
                            value={quantidade} onChange={e=> setQuantidade(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Valor</Label>
                        <Input
                            name="valor"
                            placeholder="Valor"
                            type="text"
                            value={valor} onChange={e=> setValor(e.target.value)}
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