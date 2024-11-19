import React, { useState } from "react";
import styled from "styled-components";

// Estilização do Card de Produtos
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  margin: 0.5rem 0;
  text-align: center;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }

  span {
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-top: 0.5rem;
  }
`;

const AddToCartButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: #45a049;
  }
`;

const ProdutosCard = ({ imagem, nome, descricao, preco, categoria, onAdd }) => {
  return (
    <Card>
      <ProductImage src={imagem} alt={nome} />
      <ProductInfo>
        <h3>{nome}</h3>
        <p>{descricao}</p>
        <span>R${preco}</span>
        {categoria}
      </ProductInfo>
      <AddToCartButton onClick={onAdd}>Adicionar à lista</AddToCartButton>
    </Card>
  );
};

export default ProdutosCard;
