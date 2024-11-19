const db = require("./database");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

// CORS sem credenciais, apenas permitindo a origem do front-end
app.use(
  cors({
    origin: "http://localhost:3000", // Endereço do front-end
  })
);

app.use(express.json());

// Middleware para autenticar o token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Acesso negado");
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Token inválido");
  }
};

// ************GETTERS****************
app.get("/", async (req, res) => {
  console.log("Servidor rodando...");
  res.send("API de produtos");
});

app.get("/produtos", async (req, res) => {
  const sql = "SELECT * FROM produtos";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar dados");
    }
    res.json(result);
  });
});

app.get("/clientes", async (req, res) => {
  const sql = "SELECT * FROM clientes";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar dados");
    }
    res.json(result);
  });
});

app.get("/listas", authenticateToken, async (req, res) => {
  const clienteId = req.header("cliente_id");

  if (!clienteId) {
    return res.status(400).send("cliente_id está faltando");
  }

  const sql = "SELECT * FROM listas WHERE clientes_id = ?";

  db.query(sql, [clienteId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar dados");
    }
    res.json(result);
  });
});

app.get("/listas_produtos", async (req, res) => {

  const listaId = req.query.lista_id; //usar ?lista_id=1 na URL
  
  const sql = `
    SELECT * from listas WHERE lista_id = ?;
  `;

  db.query(sql, [listaId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar dados");
    }

    res.json(result);
  });
});


// ************POSTS****************

// Chave secreta usada para assinar o JWT
const JWT_SECRET = "sua_chave_secreta_aqui";

// Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM clientes WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar dados");
    }

    if (result.length === 0) {
      return res.status(401).send("E-mail ou senha inválidos");
    }

    const cliente = result[0];

    // Comparar a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(senha, cliente.senha);
    if (!isMatch) {
      return res.status(401).send("E-mail ou senha inválidos");
    }

    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("id do cliente:", cliente.id);
    console.log("Hash armazenado:", cliente.senha);

    // Se a senha estiver correta, gerar o token JWT
    const token = jwt.sign(
      {
        id: cliente.id,
        email: cliente.email,
        nome: cliente.nome,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retornar o token para o cliente
    res.json({
      token,
      nome: cliente.nome,
      email: cliente.email,
      cliente_id: cliente.id,
    });
  });
});

app.post("/cadastro", async (req, res) => {
  const { nome, email, senha, numero } = req.body;

  // Verificar se o e-mail já está cadastrado
  const sqlSelect = "SELECT * FROM clientes WHERE email = ?";
  db.query(sqlSelect, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao verificar e-mail");
    }

    if (result.length > 0) {
      return res.status(400).send("E-mail já cadastrado");
    }

    try {
      // Criptografar a senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      // Inserir o novo usuário no banco de dados
      const sqlInsert =
        "INSERT INTO clientes (nome, email, senha, numero) VALUES (?, ?, ?, ?)";
      db.query(
        sqlInsert,
        [nome, email, hashedPassword, numero],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Erro ao cadastrar usuário");
          }
          res.status(201).send("Usuário cadastrado com sucesso");
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao criptografar a senha");
    }
  });
});

// Rota para criar uma nova lista (protegida)
app.post("/listas", authenticateToken, async (req, res) => {
  const { cliente_id, nome } = req.body;

  const sql = "INSERT INTO listas (clientes_id, nome) VALUES (?, ?)";
  db.query(sql, [cliente_id, nome], (err, result) => {
    console.log("Cliente ID:", cliente_id); // Verifica se o cliente_id está sendo passado corretamente

    if (!cliente_id || !nome) {
      return res.status(400).send("cliente_id ou nome está faltando");
    }

    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao criar lista");
    }
    res.status(201).json({ id: result.insertId });
  });
});

// Rota para adicionar produto à lista (protegida)
app.post("/adicionarProduto", authenticateToken, async (req, res) => {
  const { lista_id, produto_id } = req.body;

  console.log("Produto ID recebido no backend: ", produto_id);
  console.log("Lista ID recebido no backend: ", lista_id);

  const sql =
    "INSERT INTO listas_produtos (lista_id, produto_id) VALUES (?, ?)";
  db.query(sql, [lista_id, produto_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao adicionar produto à lista");
    }
    res.status(201).send("Produto adicionado à lista com sucesso");
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
