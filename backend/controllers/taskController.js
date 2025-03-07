import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString:
    'postgresql://postgresdb_owner:npg_iBDgCQspy70o@ep-broad-mud-a8l7e2mb-pooler.eastus2.azure.neon.tech/postgresdb?sslmode=require',
});

//
// add a task
const addTask = async (req, res) => {
  // keeping this for reference
  const task = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    due_date: req.body.due_date,
    user_id: req.body.user_id,
  };

  const columns = Object.keys(task);
  const values = Object.values(task);
  const placeholders = columns.map((_, idx) => `$${idx + 1}`).join(', ');
  const query = `INSERT INTO tasks (${columns.join(
    ', '
  )}) VALUES (${placeholders})`;

  try {
    await pool.query(query, values);
    res.json({ success: true, message: 'Task Added' });
  } catch (error) {
    // console.log(error);
    console.log('Error');
    res.json({ success: false, message: 'Error' });
  }
};

//
// all tasks list
const listTask = async (req, res) => {
  const { user_id } = req.body;
  try {
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [
      user_id,
    ]);
    res.json({ success: true, data: tasks.rows });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

//
// remove a task
const removeTask = async (req, res) => {
  try {
    const { user_id, ids } = req.body;
    await pool.query('DELETE FROM tasks WHERE user_id = $1 and id = ANY($2)', [
      user_id,
      ids,
    ]);
    res.json({ success: true, message: 'Task Removed' });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

//
// edit a task
const editTask = async (req, res) => {
  const updatedTask = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    due_date: req.body.due_date,
  };

  const conditions = {
    user_id: req.body.user_id,
    id: req.body.id,
  };

  const columns = Object.keys(updatedTask);
  const values = Object.values(updatedTask);
  const setClause = columns
    .map((col, idx) => `${col} = $${idx + 1}`)
    .join(', ');

  const conditionKeys = Object.keys(conditions);
  const conditionValues = Object.values(conditions);
  const conditionClause = conditionKeys
    .map((cond, idx) => `${cond} = $${columns.length + 1 + idx}`)
    .join(' and ');

  const query = `UPDATE tasks SET ${setClause} WHERE ${conditionClause}`;
  // console.log(query);

  try {
    await pool.query(query, [...values, ...conditionValues]);
    res.json({ success: true, message: 'Task Updated' });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export { addTask, listTask, removeTask, editTask };
