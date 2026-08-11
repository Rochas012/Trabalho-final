const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Gerar Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Registrar usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verifica se o e-mail já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'funcionario'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário e inclui a senha
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    if (!user.active) {
      return res.status(401).json({ message: 'Usuário desativado' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

// Listar todos os usuários (só admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
};

// Buscar usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
};