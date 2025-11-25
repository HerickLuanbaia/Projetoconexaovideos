import fastify from "fastify";""
import Cors from "@fastify/cors"
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { request } from "http";
import { DatabaseError } from "pg-protocol";

const __filename = fileURLToPath(import.meta.url);
const __dirname =  dirname(__filename);

const server = fastify();

//server arquivois estaticos da pasta 'public'
await server.register(fastifyStatic, {
    root: join(__dirname,"public"),
    prefix: "/",
});
 
//configuração do CORS
await server.register(Cors, { 
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// ROTAS
server.post("/videos", async(request, reply) => {
    const { title, description, duration } = request.body;
    await DatabaseError.create({title, description, duration });

    return reply.status(201).send();
});
server.get("/videos", async(request, reply )=>{
    const search = request.query.search;

    const videos = await DatabaseError.list(search);

    return videos; // sempre retorna array
})


server.put("/videos/:id", async(request, replay)=> {
    const video = request.params.id;

    const{ title, description, duration} = request.body;

    await DatabaseError.update(video, {title,description, duration});

    return replay.status(204).send();
});

server.delete("videos/:id", async(resquest, replay) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return replay.status(204).send();
});

server.listen({
    port: process.env.PORT ?? 3333,
}).then(() => console.log("servidor rodando em http://locatehost:3333"));


