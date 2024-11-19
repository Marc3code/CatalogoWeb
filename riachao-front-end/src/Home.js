import React, { useEffect, useState } from "react";
import {
  AppContainer,
  Content,
  Header,
  ProdutosSection,
  ProdutosRow,
  FilterSection,
  CategorySelect,
} from "./styles/home";
import "./components/modal/modalAddProduto";
import Logotipo from "./assets/imgs/logotipo_riachao.jpg";
import SearchInput from "./components/Inputs/searchInput";
import ProdutosCard from "./components/cards/produtosCard";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import ModalAddProduto from "./components/modal/modalAddProduto";

const Home = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [numeroDeItens, setNumeroDeItens] = useState(0);
  const [buscarSelecionado, setBuscarSelecionado] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [listaSelecionada, setListaSelecionada] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [listas, setListas] = useState([]);
  const [cliente_id, setCliente_id] = useState(
    localStorage.getItem("cliente_id")
  );

  const openModal = (produto) => {
    setProdutoSelecionado(produto);  
    setIsModalOpen(true);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const response = await fetch("http://localhost:3001/listas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            cliente_id: cliente_id,
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

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3001/produtos");
        if (!response.ok) {
          throw new Error("Requisição falhou");
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar os produtos: ", error);
      }
    };
    getProdutos();
  }, []);

  const handleBuscaProduto = (e) => {
    setBuscarSelecionado(e.target.value);
  };

  const handleCategoriachange = (e) => {
    setCategoriaSelecionada(e.target.value);
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeCategoria =
      categoriaSelecionada === "" ||
      produto.categoria.toLowerCase() === categoriaSelecionada.toLowerCase();

    const correspondeBusca =
      buscarSelecionado === "" ||
      produto.nome.toLowerCase().includes(buscarSelecionado.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  const handleAddToLista = async (lista, produto) => {
    setListaSelecionada(lista);
    setProdutoSelecionado(produto);

    console.log("lista no front: ", lista.id);
    console.log("produto no front: ", produto);
    
    if (listaSelecionada && produtoSelecionado) {
      try {
        const response = await fetch("http://localhost:3001/adicionarProduto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            cliente_id: cliente_id,
          },
          body: JSON.stringify({
            lista_id: lista.id,
            produto_id: produto.id_Produto,
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao adicionar o produto à lista");
        }
        alert("Produto adicionado à lista com sucesso!");
        closeModal();
      } catch (error) {
        console.error("Erro ao adicionar o produto:", error);
        alert("Não é possível adicionar o produto duas vezes na mesma lista.");
      }
    }else{
      alert("Selecione uma lista e um produto para adicionar.");
    } 
  };

  return (
    <AppContainer>
      <Header>
        <img src={Logotipo} alt="Logotipo Riachão" />
        <h1>Bem vindo ao nosso catálogo</h1>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "2rem",
          }}
        >
          <Link to={"/lista"}>
            <GiNotebook
              size={40}
              style={{ margin: "0 10px", color: "#FFD700" }}
            />
          </Link>
          {numeroDeItens > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "5px 10px",
                fontSize: "12px",
              }}
            >
              {numeroDeItens}
            </span>
          )}
        </div>
        <SearchInput
          type="text"
          placeholder="Buscar produto"
          onSearch={handleBuscaProduto}
          style={{ fontSize: "24px" }}
        />
      </Header>
      <Content>
        <FilterSection>
          <h2>Confira nossos produtos</h2>
          <CategorySelect
            value={categoriaSelecionada}
            onChange={handleCategoriachange}
          >
            <option value="">Todos os produtos</option>
            <option value="ferramentas">Ferramentas</option>
            <option value="tintas">Tintas</option>
            <option value="eletrica">Materiais Elétricos</option>
            <option value="hidraulica">Materiais Hidráulicos</option>
            <option value="construcao">Construção Geral</option>
            <option value="pisos">Pisos</option>
          </CategorySelect>
        </FilterSection>

        <ProdutosSection>
          <ProdutosRow>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <ProdutosCard
                  key={produto.id}
                  nome={produto.nome}
                  descricao={produto.descricao}
                  preco={produto.preco}
                  imagem={produto.imagem}
                  onAdd={() => openModal(produto)}
                />
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </ProdutosRow>
        </ProdutosSection>
      </Content>

      <ModalAddProduto
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleAddToLista}
        produtoSelecionado={produtoSelecionado}
        listas={listas}
      />
    </AppContainer>
  );
};

export default Home;
