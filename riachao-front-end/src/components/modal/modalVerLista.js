import React from "react";
import styled from "styled-components";

// Estilos para o Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const ModalVerLista = ({ isOpen, onClose, produtos }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Produtos da Lista</h2>
        {produtos && produtos.length > 0 ? (
          produtos.map((produto) => ( 
            <div key={produto.produto_id}>
              <p>Nome: {produto.nome}</p>
              <p>Quantidade: {produto.quantidade}</p>
            </div>
          ))
        ) : (
          <p>Esta lista não possui produtos.</p>
        )}
        <Button onClick={onClose}>Fechar</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalVerLista;
