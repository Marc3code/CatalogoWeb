import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
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

const SwitchToSignup = styled.p`
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage);
        return;
      }
  
      const data = await response.json();
      console.log(data); 
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("cliente_id", String(data.cliente_id)); 
  
      console.log("cliente_id armazenado:", data.cliente_id); 
  
      navigate("/Home");
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  };
  

  return (
    <AppContainer>
      <Header style={{ borderBottom: "none" }} />
      <Content>
        <FormContainer>
          <form onSubmit={handleLogin}>
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
            <Button type="submit">Login</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <SwitchToSignup>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
          </SwitchToSignup>
        </FormContainer>
      </Content>
    </AppContainer>
  );
};

export default Login;
