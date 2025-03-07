import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//
// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // checking if user already exists
    const exists = await pool.query('SELECT name FROM users WHERE email = $1', [
      email,
    ]);
    if (exists.rows.length > 0) {
      return res.json({ success: false, message: 'User already exists' });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please enter a strong password',
      });
    }

    const response = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.json({ success: true, data: response.rows[0] });
  } catch (error) {
    // console.log(error);
    console.log('Error');
    res.json({ success: false, message: 'Error' });
  }
};

//
//  login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (user.rows.length == 0) {
      return res.json({ success: false, message: "User Doesn't Exist" });
    }

    const savedPassword = user.rows[0].password;
    if (password !== savedPassword) {
      return res.json({ success: false, message: 'Password Incorrect' });
    }

    res.json({ success: true, data: user.rows[0] });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Error' });
  }
};

export { registerUser, loginUser };
