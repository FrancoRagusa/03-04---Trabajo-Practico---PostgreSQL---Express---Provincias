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
            const sql = `SELECT * FROM location`;
            const result = await client.query(sql);
            await client.end();
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
            const sql = 'SELECT * FROM location where id=$1';
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
            const sql = `INSERT INTO location (name, id_province,  latitude, longitude) VALUES ($1, $2, $3, $4)`
            const values = [entity.name, entity.id_province,  entity.latitude, entity.longitude]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }

    updateAsync = async(entity)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `UPDATE event_location
            SET name=$1, full_adress=$2, max_capacity=$3, latitude=$4, longitude=$5   
            WHERE id = $6       `
            const values = [entity.name,entity.display_order]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }

    DeleteByIdAsync = async(id)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "DELETE FROM event_location WHERE id = " +id
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
}
