const tokenService = require('../services/tokens.services');


// Crear un nuevo token
const createToken = async (req, res) => {
  try {
    const token = await tokenService.createToken(req.body);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los tokens
const getAllTokens = async (req, res) => {
  try {
    const tokens = await tokenService.getAllTokens();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un token por ID
const getTokenById = async (req, res) => {
  try {
    const token = await tokenService.getTokenById(req.params.id);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un token por ID
const updateTokenById = async (req, res) => {
  try {
    const token = await tokenService.updateTokenById(req.params.id, req.body);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un token por ID
const deleteTokenById = async (req, res) => {
  try {
    const token = await tokenService.deleteTokenById(req.params.id);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.status(200).json({ message: 'Token deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const captureToken = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { tokenId, latitude, longitude } = req.body;

    const token = await tokenService.captureToken(userId, tokenId, latitude, longitude);

    res.status(200).json({ message: 'Token captured successfully', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createToken,
  getAllTokens,
  getTokenById,
  updateTokenById,
  deleteTokenById,
  captureToken
};