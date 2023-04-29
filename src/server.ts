import {PrismaClient} from '@prisma/client';
import fastify from 'fastify'
import {z} from 'zod';

const app = fastify();
const prisma = new PrismaClient();

const version = 'v1';
const path = 'books';
const url = `/api/${version}/${path}`

app.get(url, async () => {
    const books = await prisma.book.findMany();

    return {books};
});

app.get(`${url}/:id`, async (request: any) => {
    const {id} = request.params;
    const books = await prisma.book.findUnique({
        where: {id: id}
    });

    return {books};
});

app.post(url, async (request, reply) => {
    const validationSchema = z.object({
        title: z.string(),
        author: z.string()
    });

    const {title, author} = validationSchema.parse(request.body);

    const item: any = await prisma.book.create({
        data: {title, author}
    });

    return reply.status(201).send(item);
});

app.put(`${url}/:id`, async (request: any, reply) => {
    const {id} = request.params;
    const validationSchema = z.object({
        title: z.string(),
        author: z.string()
    });

    const {title, author} = validationSchema.parse(request.body);

    const item: any = await prisma.book.update({
        where: {id: id},
        data: {title, author}
    });

    return reply.status(200).send(item);
});

app.delete(`${url}/:id`, async (request: any, reply) => {
    const {id} = request.params;
    const item: any = await prisma.book.delete({
        where: {id: id}
    });
    return reply.status(200).send(item);
});


const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen({
    host: '0.0.0.0',
    port: PORT
}).then(() => {
    console.log(`HTTP running, port - ${PORT}`)
});
