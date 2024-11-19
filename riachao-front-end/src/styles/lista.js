import React from "react";
import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  padding: 0 2rem;
  box-sizing: border-box;
  font-family: Roboto mono, open sans;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid black;

  h1 {
    font-size: 2rem;
    margin: 0;
    flex-grow: 1; /* Faz o título ocupar o espaço disponível entre o logo e o input */
    text-align: center;
  }

  img {
    max-width: 120px;
    max-height: 60px;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 300px;
    max-width: 100%;
  }

  /* Media queries para tornar o layout responsivo */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    input {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;

// Container do conteúdo
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

// Seção de filtros ou outras informações acima dos produtos
export const FilterSection = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 1rem;
  flex-direction: column;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    text-align: center;
  }
`;

export const CategorySelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
  max-width: 100%;
  margin-top: 1rem;
  cursor: pointer;

  option {
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Container dos produtos, com ajuste para 4 por linha
export const ListaSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
`;

// Estilização das linhas dos produtos, garantindo que sejam exibidos 4 por linha
export const ListasRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 1rem;
  gap: 1rem; /* Espaço entre os produtos */
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;

  /* Responsividade: 3 produtos por linha em tablets */
  @media (max-width: 1024px) {
    > div {
      flex: 1 1 calc(33.33% - 1rem);
      max-width: calc(33.33% - 1rem);
    }
  }

  /* Responsividade: 2 produtos por linha em telas menores */
  @media (max-width: 768px) {
    > div {
      flex: 1 1 calc(50% - 1rem);
      max-width: calc(50% - 1rem);
    }
  }

  /* Responsividade: 1 produto por linha em telas muito pequenas */
  @media (max-width: 480px) {
    > div {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
`;