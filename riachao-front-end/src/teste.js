import React, { useEffect, useState } from "react";
import {
  AppContainer,
  Content,
  Header,
  FilterSection,
  ListaSection,
  ListasRow,
} from "./styles/lista";
import ListasCard from "./components/cards/listasCard";
import Logotipo from "./assets/imgs/logotipo_riachao.jpg";
import SearchInput from "./components/Inputs/searchInput";
import { CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";
import ModalAddLista from "./components/modal/modalAddLista";
import ButtonAddLista from "./components/buttons/addlista";
import ModalVerLista from "./components/modal/modalVerLista";

const Lista = () => {
  const [listas, setListas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVerListaOpen, setIsModalVerListaOpen] = useState(false);
  const [cliente_id, setCliente_Id] = useState(null);

  useEffect(() => {
    const storedClientId = localStorage.getItem("cliente_id");
    setCliente_Id(storedClientId);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalVerLista = async (lista_id) => {
    try {
      const response = await fetch(`http://localhost:3001/listas/${lista_id}/produtos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar os produtos da lista");
      }

      const data = await response.json();
      setProdutos(data);
      setIsModalVerListaOpen(true);
    } catch (error) {
      console.error("Erro ao carregar os produtos da lista: ", error);
    }
  };

  const closeModalVerLista = () => {
    setIsModalVerListaOpen(false);
    setProdutos([]);
  };

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const response = await fetch("http://localhost:3001/listas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar as listas");
        }

        const data = await response.json();
        setListas(data);
      } catch (error) {
        console.error("Erro ao carregar as listas: ", error);
      }
    };

    if (cliente_id) {
      fetchListas();
    }
  }, [cliente_id]);

  return (
    <AppContainer>
      <Header>
        <img src={Logotipo} alt="Logotipo Riachão" />
        <h1>Bem vindo ao nosso catálogo</h1>
        <div style={{ marginRight: "2rem" }}>
          <Link to={"/Home"}>
            <CiShop size={40} color="#FFD700" />
          </Link>
        </div>
        <SearchInput
          type="text"
          placeholder="Buscar produto"
          style={{ fontSize: "24px" }}
        />
      </Header>
      <Content>
        <FilterSection>
          <h2>Confira suas listas e envie pra um de nossos consultores</h2>
          <ButtonAddLista onClick={openModal}>Criar Lista</ButtonAddLista>
        </FilterSection>

        <ListaSection>
          <h2>Minhas listas</h2>
          <ListasRow>
            {listas.map((lista) => (
              <ListasCard key={lista.id} nome={lista.nome} onClick={() => openModalVerLista(lista.id)} />
            ))}
          </ListasRow>
        </ListaSection>
      </Content>

      {/* Modal para criar lista */}
      <ModalAddLista
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={adicionarLista}
      />

      {/* Modal para visualizar produtos da lista */}
      <ModalVerLista
        isOpen={isModalVerListaOpen}
        onClose={closeModalVerLista}
        produtos={produtos}
      />
    </AppContainer>
  );
};

export default Lista;
