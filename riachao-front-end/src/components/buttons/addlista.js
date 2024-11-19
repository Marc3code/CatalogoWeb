import styled from "styled-components";

const ButtonContainer = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
  width: 200px;  

  &:hover {
    background-color: #45a049;
  }
`;

const ButtonAddLista = ({ onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <h3>Criar lista</h3>
    </ButtonContainer>
  );
};

export default ButtonAddLista;
