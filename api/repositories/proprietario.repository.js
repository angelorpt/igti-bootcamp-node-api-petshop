import { connect } from "./database";

const insertProprietario = async (proprietario) => {
  const conn = await connect();
  try {
    const sql = `INSERT INTO proprietarios (nome, telefone) 
                                   values ($1, $2)
                 RETURNING *`;
    const values = [proprietario.nome, proprietario.telefone];
    const result = await conn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getProprietarios = async () => {
  const conn = await connect();
  try {
    const sql = `SELECT * FROM proprietarios`;
    const result = await conn.query(sql);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const existProprietario = async (id) => {
  const conn = await connect();
  try {
    const sql = `SELECT count(1) AS EXIST FROM proprietarios WHERE proprietario_id = $1`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result.rows[0]["EXIST"] > 0 ? true : false;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getProprietario = async (id) => {
  if (!existProprietario(id)) {
    return null;
  }

  const conn = await connect();
  try {
    const sql = `SELECT * FROM proprietarios WHERE proprietario_id = $1`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const updateProprietario = async ({ id, proprietario }) => {
  if (!existProprietario(id)) {
    return null;
  }

  const conn = await connect();
  try {
    const sql = `UPDATE proprietarios
                 SET  nome     = $2
                     ,telefone = $3
                 WHERE proprietario_id = $1
                 RETURNING *`;
    const values = [id, proprietario.nome, proprietario.telefone];
    const result = await conn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const deleteProprietario = async (id) => {
  if (!existProprietario(id)) {
    return null;
  }

  const conn = await connect();
  try {
    const sql = `DELETE FROM proprietarios WHERE proprietario_id = $1`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result.rowCount > 0;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

export default {
  insertProprietario,
  getProprietario,
  getProprietarios,
  updateProprietario,
  deleteProprietario,
};
