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
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const ModalInput = styled.input`
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem; /* Espaçamento ajustado para o ícone */
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const ModalAddLista = ({ isOpen, onClose, onSave, listaNome, setListaNome }) => {
  if (!isOpen) return null; 

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Dê um nome para sua lista</h2>
        <ModalInput
          type="text"
          placeholder="Nome da Lista"
          value={listaNome}
          onChange={(e) => setListaNome(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}> 
          <Button onClick={onSave}>Salvar</Button>
          <Button onClick={onClose} style={{ backgroundColor: "#f44336" }}>
            Cancelar
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalAddLista;
