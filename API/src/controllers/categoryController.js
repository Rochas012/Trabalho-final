import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar categorias", error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar categoria", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar categoria", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar categoria", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar categoria", error: error.message });
  }
};