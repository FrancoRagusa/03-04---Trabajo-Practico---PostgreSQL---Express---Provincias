import DBConfig from "../configs/dbConfig.js";
import pkg from "pg";
const { Client, Pool } = pkg;

export default class EventListRepository {
  getAllAsync = async () => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "SELECT * FROM events";
      const result = await client.query(sql);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getByIdAsync = async (id) => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "SELECT * FROM events WHERE id = $1";
      const values = [id];
      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getByNameAsync = async (name) => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "SELECT * FROM events WHERE name = $1";
      const values = [name];
      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getDetailsAsync = async (id) => {
    let returnObject = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = `
                SELECT e.id, e.name, e.description, e.id_event_category, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_creator_user,
                    el.id as event_location_id, el.name as event_location_name, el.full_address as event_location_full_address, el.max_capacity as event_location_max_capacity, el.latitude as event_location_latitude, el.longitude as event_location_longitude,
                    l.id as location_id, l.name as location_name, l.latitude as location_latitude, l.longitude as location_longitude,
                    p.id as province_id, p.name as province_name, p.full_name as province_full_name, p.latitude as province_latitude, p.longitude as province_longitude,
                    u.id as creator_user_id, u.first_name as creator_user_first_name, u.last_name as creator_user_last_name, u.username as creator_user_username,
                    c.id as event_category_id, c.name as event_category_name, c.display_order as event_category_display_order,
                    array_agg(json_build_object('id', t.id, 'name', t.name)) as tags
                FROM events e
                JOIN event_locations el ON e.id_event_location = el.id
                JOIN locations l ON el.id_location = l.id
                JOIN provinces p ON l.id_province = p.id
                JOIN users u ON e.id_creator_user = u.id
                JOIN event_categories c ON e.id_event_category = c.id
                LEFT JOIN event_tags et ON e.id = et.id_event
                LEFT JOIN tags t ON et.id_tag = t.id
                WHERE e.id = $1
                GROUP BY e.id, el.id, l.id, p.id, u.id, c.id;
            `;
      const values = [id];
      const result = await client.query(sql, values);
      await client.end();

      if (result.rows.length > 0) {
        const row = result.rows[0];
        returnObject = {
          id: row.id,
          name: row.name,
          description: row.description,
          id_event_category: row.id_event_category,
          id_event_location: row.event_location_id,
          start_date: row.start_date,
          duration_in_minutes: row.duration_in_minutes,
          price: row.price,
          enabled_for_enrollment: row.enabled_for_enrollment,
          max_assistance: row.max_assistance,
          id_creator_user: row.id_creator_user,
          event_location: {
            id: row.event_location_id,
            id_location: row.location_id,
            name: row.event_location_name,
            full_address: row.event_location_full_address,
            max_capacity: row.event_location_max_capacity,
            latitude: row.event_location_latitude,
            longitude: row.event_location_longitude,
            id_creator_user: row.id_creator_user,
            location: {
              id: row.location_id,
              name: row.location_name,
              id_province: row.province_id,
              latitude: row.location_latitude,
              longitude: row.location_longitude,
              province: {
                id: row.province_id,
                name: row.province_name,
                full_name: row.province_full_name,
                latitude: row.province_latitude,
                longitude: row.province_longitude,
                display_order: null,
              },
            },
            creator_user: {
              id: row.creator_user_id,
              first_name: row.creator_user_first_name,
              last_name: row.creator_user_last_name,
              username: row.creator_user_username,
              password: "******",
            },
          },
          tags: row.tags,
          creator_user: {
            id: row.creator_user_id,
            first_name: row.creator_user_first_name,
            last_name: row.creator_user_last_name,
            username: row.creator_user_username,
            password: "******",
          },
          event_category: {
            id: row.event_category_id,
            name: row.event_category_name,
            display_order: row.event_category_display_order,
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
    return returnObject;
  };

  getParticipantsAsync = async (eventId, filters) => {
    const client = new Client(DBConfig);
    await client.connect();

    try {
        const { first_name, last_name, username, attended, rating } = filters || {};
        const conditions = [];
        const values = [eventId];

        if (first_name) {
            values.push(`%${first_name}%`);
            conditions.push(`u.first_name ILIKE $${values.length}`);
        }
        if (last_name) {
            values.push(`%${last_name}%`);
            conditions.push(`u.last_name ILIKE $${values.length}`);
        }
        if (username) {
            values.push(`%${username}%`);
            conditions.push(`u.username ILIKE $${values.length}`);
        }
        if (attended !== undefined) {
            values.push(attended === 'true');
            conditions.push(`ee.attended = $${values.length}`);
        }
        if (rating) {
            values.push(parseInt(rating));
            conditions.push(`ee.rating >= $${values.length}`);
        }

        const whereClause = conditions.length ? `AND ${conditions.join(' AND ')}` : '';

        const sql = `
            SELECT 
                ee.id, ee.id_event, ee.id_user, ee.description, ee.registration_date_time, ee.attended, ee.observations, ee.rating,
                u.id as user_id, u.first_name, u.last_name, u.username
            FROM event_enrollments ee
            JOIN users u ON ee.id_user = u.id
            WHERE ee.id_event = $1 ${whereClause}
        `;

        const result = await client.query(sql, values);
        return {
            collection: result.rows.map(row => ({
                id: row.id,
                id_event: row.id_event,
                id_user: row.id_user,
                user: {
                    id: row.user_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    username: row.username
                },
                description: row.description,
                registration_date_time: row.registration_date_time,
                attended: row.attended,
                observations: row.observations,
                rating: row.rating
            })),
            pagination: {
                limit: 0,
                offset: 0,
                nextPage: "",
                total: result.rowCount
            }
        };
    } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
    } finally {
        await client.end();
    }
}
}