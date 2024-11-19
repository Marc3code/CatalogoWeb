import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa"; // Importa o ícone de lupa

// Contêiner do input para controle do layout
const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;

  input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem; /* Espaçamento ajustado para o ícone */
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  /* Ícone de busca */
  svg {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: #ffd700;
    font-size: 1.2rem;
  }
`;

const SearchInput = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e); // Chama a função de busca recebida como prop
  };

  return (
    <InputContainer>
      <input
        type="text"
        placeholder="Buscar produto"
        onChange={handleInputChange} // Corrigido para onChange
      />
      <FaSearch />
    </InputContainer>
  );
};

export default SearchInput;
