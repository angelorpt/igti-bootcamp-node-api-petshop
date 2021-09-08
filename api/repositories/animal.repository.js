import { connect } from "./database";

const insert = async (animal) => {
  const conn = await connect();
  try {
    const sql = `INSERT INTO animais (nome, tipo, proprietario_id) 
                              values ($1, $2, $3)
                 RETURNING *`;
    const values = [animal.nome, animal.tipo, animal.proprietario_id];
    const result = await conn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getAll = async () => {
  const conn = await connect();
  try {
    const sql = `SELECT * FROM animais`;
    const result = await conn.query(sql);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getAnimalsOf = async (proprietario_id) => {
  const conn = await connect();
  try {
    const sql = `SELECT * FROM animais
                 WHERE proprietario_id = $1`;
    const values = [proprietario_id];
    const result = await conn.query(sql, values);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const exists = async (id) => {
  const conn = await connect();
  try {
    const sql = `SELECT count(1) AS EXIST
                 FROM animais
                 WHERE animal_id = $1`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result.rows[0]["EXIST"] > 0 ? true : false;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const find = async (id) => {
  // if (!(await exists(id))) {
  //   return null;
  // }

  const conn = await connect();
  try {
    const sql = `SELECT * FROM animais WHERE animal_id = $1`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const update = async ({ id, animal }) => {
  // if (!(await exists(id))) {
  //   return null;
  // }

  const conn = await connect();
  try {
    const sql = `UPDATE animais
                 SET  nome             = $2
                     ,tipo             = $3
                     ,proprietario_id  = $4
                 WHERE animal_id = $1
                 RETURNING *`;
    const values = [id, animal.nome, animal.tipo, animal.proprietario_id];
    const result = await conn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const destroy = async (id) => {
  // if (!(await exists(id))) {
  //   return null;
  // }

  const conn = await connect();
  try {
    const sql = `DELETE FROM animais WHERE animal_id = $1`;
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
  insert,
  getAll,
  getAnimalsOf,
  find,
  update,
  destroy,
};
