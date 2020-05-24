import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Books } from '../types.ts'

let books: Books[] = [
    {
      id: "1",
      name: "The Hobbit",
      author: "J. R. R. Tolkien",
      price: 99.99,
    },
    {
      id: "2",
      name: "Harry Potter",
      author: "J. K. Rowling",
      price: 150.99,
    },
    {
      id: "3",
      name: "The Alchemyst",
      author: "Michael Scott",
      price: 199.99,
    },
  ];

 export const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: books
    }
}

export const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const book: Books | undefined = books.find(p => p.id === params.id)

    if (book) {
        response.status = 200
        response.body = {
            success: true,
            data: books
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No book found'
        }
    }
}


export const addProduct = async ({ request, response }: { request: any, response: any }) => {    
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

export const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    books = books.filter(p => p.id !== params.id)
    response.body = { 
        success: true,
        msg: 'Book removed'
    }
}