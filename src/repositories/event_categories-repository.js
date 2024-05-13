import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool } = pkg;

export default class EventRepository 
{
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_categories`;
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
            const sql = 'SELECT * FROM public.event_categories where id=$1';
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

}
