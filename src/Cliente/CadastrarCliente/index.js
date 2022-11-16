import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const CadastrarCliente = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        cidade: '',
        uf: '',
        nascimento: ''
    })

    const valorInput = e => 
        setCliente({...cliente, [e.target.name]: e.target.value })

    const cadCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api + "/novo-cliente", cliente, { headers })
            .then((response) => {
                console.log(response.data.message)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    }

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cadastrar Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn btn-outline-secondary btn-sm">Clientes</Link>
                    </div>
                </div>

                <Form className="p-2" onSubmit={cadCliente}>
                    <FormGroup className="p-2">
                            <Label>Nome</Label>
                        <Input
                            name="nome"
                            placeholder="Digite o nome do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Cidade</Label>
                        <Input
                            name="cidade"
                            placeholder="Digite a cidade do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>UF</Label>
                        <Input
                            name="uf"
                            placeholder="Digite a UF do cliente"
                            type="text"
                            onChange={valorInput}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Data de Nascimento</Label>
                        <Input
                            name="nascimento"
                            placeholder="Digite a data de nascimento do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex">
                    <Button type="submit" outline color='warning'>Cadastrar</Button>
                    <Button type="reset" outline color='danger'>Limpar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}