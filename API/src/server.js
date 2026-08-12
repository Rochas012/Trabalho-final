import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/Productroutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDatabase from "./database/connection.js";

import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
connectDatabase();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

console.log("ESTE É O SERVER DA TECHSTORE / ESTOQUE");

// Rotas
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/auth", authRoutes);   // ← esta linha é importante

// Rotas de teste
app.get("/", (req, res) => {
  res.json({
    message: "API do Sistema de Estoque e Vendas está funcionando!"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});