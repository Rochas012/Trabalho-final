import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("user", "name email")
      .populate("products.product", "name sku")
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar vendas", error: error.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name sku");

    if (!sale) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar venda", error: error.message });
  }
};

export const createSale = async (req, res) => {
  try {
    const { products, discount = 0, paymentMethod, user } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "A venda precisa ter pelo menos um produto" });
    }

    let total = 0;
    const saleProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Produto não encontrado: ${item.product}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Estoque insuficiente para o produto: ${product.name}`
        });
      }

      const itemTotal = product.priceSale * item.quantity;
      total += itemTotal;

      saleProducts.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.priceSale
      });

      // Baixa o estoque
      product.stock -= item.quantity;
      await product.save();
    }

    total = total - Number(discount);

    const sale = await Sale.create({
      products: saleProducts,
      total,
      discount,
      paymentMethod,
      user
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar venda", error: error.message });
  }
};

export const cancelSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }

    if (sale.status === "cancelada") {
      return res.status(400).json({ message: "Venda já está cancelada" });
    }

    // Devolve o estoque
    for (const item of sale.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    sale.status = "cancelada";
    await sale.save();

    res.json({ message: "Venda cancelada com sucesso", sale });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cancelar venda", error: error.message });
  }
};