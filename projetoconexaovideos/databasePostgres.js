import { randomUUID } from "node:crypto";
import {sql} from "./sql.js";

export class DatabasePostgres{ 
    async list(search){
        let result;

        if(search){
            result = await sql `SELECT * FROM videos WHERE title 
            ILIKE ${'%' + search + '%' }`;
        }else{
            result = await sql `SELECT * FROM videos`;
        }

        // garante que sempre retorna um array
        return array.isArray(result) ? result: result.rows || []
    }
    async create(video){
        const videoId = randomUUID();
        const {title, description,duration } = video;

        await sql`
            INSERT INTO videos(id, title, description, duration)
            VALUES (${videoId}, ${title}, ${description}, ${duration})
            
            `;
    }
    async update(id,video){
        const{ title, description, duration } = video;

        await sql`
            UPDATE 
            SET title = ${title}, description =  ${description}, duration = ${duration}
            WHERE id = ${id}
        `;
    }

    async delete(id){
        await sql`DELETE FROM videos WHERE id = ${id}`;
    }
}