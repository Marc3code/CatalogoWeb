import React, { useState } from "react";
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

const ListasCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e0f7fa" : "white")};

  &:hover {
    transform: scale(1.02);
  }
`;

const ModalAddProduto = ({ isOpen, onClose, onSave, listas, produtoSelecionado }) => {
  const [listaSelecionada, setListaSelecionada] = useState(null); // Corrigido para null no início

  const handleListaSelect = (lista) => {
    setListaSelecionada(lista); // Apenas atualiza a lista selecionada
  };

  const handleSave = () => {
    if (listaSelecionada && produtoSelecionado) {
      onSave(listaSelecionada, produtoSelecionado); // Usa a prop produtoSelecionado corretamente
      onClose();
    } else {
      alert("Por favor, selecione uma lista antes de adicionar o produto.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Seleciona a lista em que deseja adicionar o produto</h2>
        {listas.map((lista) => (
          <ListasCard
            key={lista.id}
            onClick={() => handleListaSelect(lista)}
            selected={listaSelecionada && listaSelecionada.id === lista.id}
          >
            <h3>{lista.nome}</h3>
          </ListasCard>
        ))}
        <div style={{ marginTop: "10px" }}>
          <Button onClick={handleSave}>Adicionar</Button>
          <Button onClick={onClose} style={{ backgroundColor: "#f44336" }}>
            Cancelar
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalAddProduto;
