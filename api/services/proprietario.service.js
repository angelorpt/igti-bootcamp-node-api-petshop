import proprietarioRepository from "../repositories/proprietario.repository";

const createProprietario = async (data) => {
  const proprietario = await proprietarioRepository.insertProprietario(data);
  return proprietario;
};

const getProprietarios = async () => {
  return await proprietarioRepository.getProprietarios();
};

const getProprietario = async (id) => {
  return await proprietarioRepository.getProprietario(id);
};

const updateProprietario = async ({ id, data }) => {
  return await proprietarioRepository.updateProprietario({
    id,
    proprietario: data,
  });
};

const deleteProprietario = async (id) => {
  return await proprietarioRepository.deleteProprietario(id);
};

export default {
  createProprietario,
  getProprietarios,
  getProprietario,
  updateProprietario,
  deleteProprietario,
};
