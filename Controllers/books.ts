import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Books } from '../types.ts'

let books: Books[] = [
    {
      id: "1",
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      price: 200,
    },
    {
      id: "2",
      title: "Harry Potter",
      author: "J. K. Rowling",
      price: 400,
    },
    {
      id: "3",
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 350,
    },
  ];

 export const getBooks = ({ response }: { response: any }) => {
    response.status = 200
    response.body = {
        success: true,
        data: books
    }
}

export const getBook = ({ params, response }: { params: { id: string }, response: any }) => {
    const book: Books | undefined = books.find(p => p.id === params.id)
    if (book) {
        response.status = 200
        response.body = {
            success: true,
            data: book
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No book found'
        }
    }
}


export const addBook = async ({ request, response }: { request: any, response: any }) => {    
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        const book: Books = body.value
        book.id = v4.generate()

        books.push(book)
        response.status = 201
        response.body = {
            success: true,
            data: books
        }
    }
}

export const updateBook = async({params, request, response} : {params :{id: string}, request: any, response:any }) => {
    let book: Books | undefined = books.find(p => p.id === params.id)
    if (book) {
        const body = await request.body()
        const updateInfo : { author?: string; title?: string} =body.value
        book = { ...book, ...updateInfo}
        books = [...books.filter(book => book.id !== params.id), book]
        response.status = 200
        response.body = { message: 'Success'}
    }
    else {
        response.status = 404
        response.body = { message: 'Book not found'}
    }
}

export const deleteBook = ({ params, response }: { params: { id: string }, response: any }) => {
    books = books.filter(p => p.id !== params.id)
    response.body = { 
        success: true,
        msg: 'Book removed'
    }
}