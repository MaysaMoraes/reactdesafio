import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const AtualizarPromocao =() =>{

    const params = useParams();
    const [id, setId] = useState(params.id)
    const [EmpresaId, setEmpresaId] = useState()
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [validade, setValidade] = useState()
    
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtPromocao = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type' : 'application/json'
        }

        await axios.put(api+"/editar-promocao/"+id,
        {id, EmpresaId, nome, descricao, validade}, {headers})
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
        const getPromocao = async()=>{
            await axios.get(api+"/promocao/"+id)
            .then((response)=> {
                setId(response.data.promo.id)
                setEmpresaId(response.data.promo.EmpresaId)
                setNome(response.data.promo.nome)
                setDescricao(response.data.promo.descricao)
                setValidade(response.data.promo.validade)

                console.log(response.data.promo.id)
                console.log(response.data.promo.ClienteId)
                console.log(response.data.promo.nome)
                console.log(response.data.promo.descricao)
                console.log(response.data.promo.validade)
            })
            .catch(()=>{
                console.log("Erro: sem conexão com a API.")
            })
        }
        getPromocao()
    }, [id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Atualizar Promoção</h1>
                    </div>
                    <div className="p-2">
                        <Link to= "/listar-empresas" className="m-auto btn btn-outline-secondary btn-sm">Empresas</Link>
                    </div>
                </div>

                <div>
                    <hr className="m-1"></hr>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === "success" ? <Alert color="success">{status.message}</Alert> : '' }
                </div>

                <Form className="p-2" onSubmit={edtPromocao}>
                    <FormGroup className="p-2">
                        <Label>Id da Promoção</Label>
                        <Input
                            name="id"
                            placeholder="Id do Pedido"
                            type="text"
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Id da Empresa</Label>
                        <Input
                            name="EmpresaId"
                            placeholder="Id da Empresa"
                            type="text"
                            defaultValue={EmpresaId}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Nome</Label>
                        <Input
                            name="nome"
                            placeholder="Nome da Promoção"
                            type="text"
                            value={nome} onChange={e=> setNome(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input
                            name="descricao"
                            placeholder="Descrição da promoção"
                            type="text"
                            value={descricao} onChange={e=> setDescricao(e.target.value)}
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