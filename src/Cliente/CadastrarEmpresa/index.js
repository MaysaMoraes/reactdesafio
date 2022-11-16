import axios from "axios"
import { useState } from "react"
import {  Link } from "react-router-dom"
import { Button,Form, Container, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const CadastrarEmpresa =() =>{

    const [empresa, setEmpresa] = useState({
        nome: '',
        dataAdesao: ''
    })

    const valorInput = e => 
        setEmpresa({...empresa, [e.target.name]: e.target.value })

    const cadEmpresa = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }
      
        await axios.post(api + "/nova-empresa", empresa, { headers })
            .then((response) => {
                console.log(response.data.message)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    }

    return(
        <div>
             <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cadastrar Empresa</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-empresas" className="m-auto btn btn-outline-secondary btn-sm">Empresas</Link>
                    </div>
                </div>

                <Form className="p-2" onSubmit={cadEmpresa}>
                    <FormGroup className="p-2">
                            <Label>Nome</Label>
                        <Input
                            name="nome"
                            placeholder="Digite o nome da empresa"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup  className= "p-2">
                        <Label>Data de Adesão</Label>
                        <Input
                            name="dataAdesao"
                            placeholder="Digite a data de Adesão"
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