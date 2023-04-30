import {PrismaClient} from '@prisma/client';
import fastify from 'fastify'

const app = fastify();
const prisma = new PrismaClient();

const version = 'v1';
const path = 'books';
const url = `/api/${version}/${path}`

let bookstore: any = {
    books: [
        {id: 1, title: 'teste', author: 'testador'}
    ]
};

app.get(url, async () => {
    // const books = await prisma.book.findMany();
    //
    // return {books};

    return bookstore;
});

app.get(`${url}/:id`, async (request: any, reply: any) => {
    const id = String(request?.params?.id);
    // const item = await prisma.book.findUnique({
    //     where: {id: id}
    // });

    const item = bookstore.books.find((item: any) => item.id == id);
    if (!!item) {
        return reply.status(404);
    }

    return reply.status(200).send(item);
});

app.post(url, async (request: any, reply: any) => {
    // const validationSchema = z.object({
    //     title: z.string(),
    //     author: z.string()
    // });
    //
    // const {title, author} = validationSchema.parse(request.body);
    //
    // const item: any = await prisma.book.create({
    //     data: {title, author}
    // });
    //
    // return reply.status(201).send(item);

    request.body.id = bookstore.books.length + 1;
    bookstore.books.push(request.body);

    return reply.status(201).send(request.body);
});

app.put(`${url}/:id`, async (request: any, reply: any) => {
    const id = String(request?.params?.id);
    // const validationSchema = z.object({
    //     title: z.string(),
    //     author: z.string()
    // });
    //
    // const {title, author} = validationSchema.parse(request.body);
    //
    // const item: any = await prisma.book.update({
    //     where: {id: id},
    //     data: {title, author}
    // });

    let thereIs: boolean = false;
    let currentItem: any = null;
    bookstore.books = bookstore.books.map((item: any) => {
        if (item.id === id) {
            item = request.body
            thereIs = true;
            currentItem = item;
        }
        return item;
    });

    return !thereIs
        ? reply.status(404)
        : reply.status(200).send(currentItem);
});

app.delete(`${url}/:id`, async (request: any, reply: any) => {
    const id = String(request?.params?.id);
    // const item: any = await prisma.book.delete({
    //     where: {id: id}
    // });

    bookstore.books = bookstore.books.filter((item: any) => item.id != id);

    return reply.status(200).send(bookstore);
});


const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen({
    host: '0.0.0.0',
    port: PORT
}).then(() => {
    console.log(`HTTP running, port - ${PORT}`)
});
