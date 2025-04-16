const db = require('../db');

exports.createTask = async ({ title, description, due_date }) => {
  const result = await db.query(
    `INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *`,
    [title, description || null, due_date || null]
  );
  return result.rows[0];
};

exports.getAllTasks = async () => {
  const result = await db.query(`SELECT * FROM tasks ORDER BY id`);
  return result.rows;
};

exports.getTaskById = async (id) => {
  const result = await db.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  return result.rows[0];
};

exports.updateTaskStatus = async (id, status) => {
    const result = await db.query(
      `UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *`,
      [status, parseInt(id)]
    );
    return result.rows[0];
  };  

exports.deleteTask = async (id) => {
    const result = await db.query(
      `DELETE FROM tasks WHERE id = $1 RETURNING *`,
      [parseInt(id)]
    );
    return result.rowCount > 0;
  };
  
