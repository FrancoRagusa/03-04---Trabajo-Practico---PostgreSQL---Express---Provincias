import DBConfig from "../configs/dbConfig.js";
import pkg from 'pg';
import jwt from "jsonwebtoken";
const { Client } = pkg;
const secretKey = 'mysecretkey';

export default class AuthRepository {
  loginAsync = async (username, password) => {
    let returnObject = { 
            success: false, 
            message: 'ERROR', 
            token: null 
    };
    
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = 'SELECT * FROM users WHERE username = $1 AND password = $2';
      const values = [username, password];
      const result = await client.query(sql, values);
      await client.end();
      if (result.rows.length > 0) {
        const payload = { id: result.rows[0].id, username: result.rows[0].username };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        returnObject = { 
                success: true, 
                message: '', 
                token: token 
        };
      }
    } catch (error) {
      console.log(error);
    }
    console.log(returnObject);
    return returnObject;
  }
  

  registerAsync = async (entity) => {
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, username';
      const values = [entity.first_name, entity.last_name, entity.username, entity.password];
      const result = await client.query(sql, values);
      await client.end();

      const user = result.rows[0];
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

      return { success: true, token };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}