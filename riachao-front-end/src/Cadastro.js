import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { AppContainer, Header, Content } from "./styles/home";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const InputField = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SwitchToLogin = styled.p`
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      nome,
      numero,
      email,
      senha: password,
    };

    try {
      const response = await axios.post("http://localhost:3001/cadastro", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) { 
        alert("Usuário cadastrado com sucesso!");
        navigate("/"); 
      } else {
        alert(`Erro: ${response.data.message || "Erro ao cadastrar."}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      if (error.response) {
        alert(`Erro: ${error.response.data.message || error.message}`);
      } else {
        alert("Erro ao cadastrar, tente novamente.");
      }
    }
  };

  return (
    <AppContainer>
      <Header style={{ borderBottom: "none" }}>
      </Header>
      <Content>
        <FormContainer>
          <form onSubmit={handleSignup}>
            <InputField
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <InputField
              type="text"
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Cadastrar</Button>
          </form>
          <SwitchToLogin>
            <Link to="/">Já tem uma conta? Faça login</Link>
          </SwitchToLogin>
        </FormContainer>
      </Content>
    </AppContainer>
  );
};

export default Cadastro;
