const Validator = require("Validator");
import animalService from "../services/animal.service";

export const validateAnimalRequestBody = (req, res, next) => {
  let data = req.body;

  const rules = {
    nome: "required|string|max:255",
    tipo: "required|string|max:20",
    proprietario_id: "required|numeric",
  };

  const validate = Validator.make(data, rules);

  if (validate.fails()) {
    const validateError = validate.getErrors();
    const result = {
      success: false,
      message: "Dados inválidos",
      error: validateError,
    };
    logger.error(`POST /animal - ${JSON.stringify(result)}`);
    res.status(400).send(result);
  } else {
    next();
  }
};

const createAnimal = async (req, res, next) => {
  let data = req.body;
  logger.info(`POST /animal - ${JSON.stringify(data)}`);
  let animal = await animalService.createAnimal(data);
  res.status(201).send(animal);
};

const getAnimais = async (req, res, next) => {
  const { proprietario_id } = req.query;
  let animais = {};
  try {
    if (proprietario_id) {
      animais = await animalService.getAnimaisDoProprietario(proprietario_id);
    } else {
      animais = await animalService.getAnimais();
    }
    res.status(200).send(animais);
  } catch (error) {
    next(error);
  }
};

const getAnimaisDoProprietario = async (req, res, next) => {
  const { proprietario_id } = req.params.query;
  try {
    res.status(200).send(animais);
  } catch (error) {
    next(error);
  }
};

const getAnimal = async (req, res, next) => {
  const id = req.params.id;
  try {
    let animal = await animalService.getAnimal(id);
    if (!animal) {
      res.status(404).send({ message: "animal não encontrado" });
    }
    res.status(200).send(animal);
  } catch (error) {
    next(error);
  }
};

const updateAnimal = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const animal = await animalService.updateAnimal({
      id,
      data,
    });
    if (!animal) {
      res.status(404).send({ message: "animal não encontrado" });
    }
    res.status(200).send(animal);
  } catch (error) {
    next(error);
  }
};

const deleteAnimal = async (req, res, next) => {
  const id = req.params.id;
  try {
    const animal = await animalService.deleteAnimal(id);
    if (!animal) {
      res.status(404).send({ message: "animal não encontrado" });
    }
    res.status(200).send({ message: "animal deletado com sucesso" });
  } catch (error) {
    next(error);
  }
};

export default {
  validateAnimalRequestBody,
  createAnimal,
  getAnimais,
  getAnimal,
  updateAnimal,
  deleteAnimal,
};
