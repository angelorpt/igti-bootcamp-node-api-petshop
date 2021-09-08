import animalRepository from "../repositories/animal.repository";

const createAnimal = async (data) => {
  const animal = await animalRepository.insert(data);
  return animal;
};

const getAnimais = async () => {
  return await animalRepository.getAll();
};

const getAnimaisDoProprietario = async (proprietario_id) => {
  return await animalRepository.getAnimalsOf(proprietario_id);
};

const getAnimal = async (id) => {
  return await animalRepository.find(id);
};

const updateAnimal = async ({ id, data }) => {
  return await animalRepository.update({
    id,
    animal: data,
  });
};

const deleteAnimal = async (id) => {
  return await animalRepository.destroy(id);
};

export default {
  createAnimal,
  getAnimaisDoProprietario,
  getAnimais,
  getAnimal,
  updateAnimal,
  deleteAnimal,
};
