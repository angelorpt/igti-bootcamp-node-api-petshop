const Validator = require("Validator");
import proprietarioService from "../services/proprietario.service";

export const validateProprietarioRequestBody = (req, res, next) => {
  let data = req.body;

  const rules = {
    nome: "required|string|max:255",
    telefone: "required|string|max:20",
  };

  const validate = Validator.make(data, rules);

  if (validate.fails()) {
    const validateError = validate.getErrors();
    const result = {
      success: false,
      message: "Dados inválidos",
      error: validateError,
    };
    logger.error(`POST /proprietario - ${JSON.stringify(result)}`);
    res.status(400).send(result);
  } else {
    next();
  }
};

const createProprietario = async (req, res, next) => {
  let data = req.body;
  logger.info(`POST /proprietario - ${JSON.stringify(data)}`);
  let proprietario = await proprietarioService.createProprietario(data);
  res.status(201).send(proprietario);
};

const getProprietarios = async (req, res, next) => {
  try {
    let proprietarios = await proprietarioService.getProprietarios();
    res.status(200).send(proprietarios);
  } catch (error) {
    next(error);
  }
};

const getProprietario = async (req, res, next) => {
  const id = req.params.id;
  try {
    let proprietario = await proprietarioService.getProprietario(id);
    if (!proprietario) {
      res.status(404).send({ message: "proprietario não encontrado" });
    }
    res.status(200).send(proprietario);
  } catch (error) {
    next(error);
  }
};

const updateProprietario = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const proprietario = await proprietarioService.updateProprietario({
      id,
      data,
    });
    if (!proprietario) {
      res.status(404).send({ message: "proprietario não encontrado" });
    }
    res.status(200).send(proprietario);
  } catch (error) {
    next(error);
  }
};

const deleteProprietario = async (req, res, next) => {
  const id = req.params.id;
  try {
    const proprietario = await proprietarioService.deleteProprietario(id);
    if (!proprietario) {
      res.status(404).send({ message: "proprietario não encontrado" });
    }
    res.status(200).send({ message: "proprietario deletado com sucesso" });
  } catch (error) {
    next(error);
  }
};

export default {
  validateProprietarioRequestBody,
  createProprietario,
  getProprietarios,
  getProprietario,
  updateProprietario,
  deleteProprietario,
};
