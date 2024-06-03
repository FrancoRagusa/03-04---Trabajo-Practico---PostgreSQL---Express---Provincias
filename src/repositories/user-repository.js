import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
import jwt from 'jsonwebtoken';
const { Client, Pool } = pkg;

export default class EventRepository 
{
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM users`;
            const result = await client.query(sql);
            await client.end();
            console.log(result);
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getByIdAsync = async (id) => {

        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users where id=$1';
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            if (result.rows.length >0)
            {
                returnEntity=result.rows[0]
            }
           
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }



    createAsync = async(entity)=> {
        console.log(entity.display_order)
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `INSERT INTO users (username, password) VALUES ($1, $2)`
            const values = [entity.username,entity.password,entity.display_order]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }

  
    LoginAsync = async (entity) => {

        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users where username=$1 AND password=$2';
            const values = [entity.username,entity.password];
            const result = await client.query(sql, values);
            await client.end();
            if (result.rows.length >0)
            {
                returnEntity=result.rows[0]
            }
           
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}
