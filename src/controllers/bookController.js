import { author, book } from "../models/index.js";
import { NotFound } from "../errors/notFound.js";

export class BookController {
  static list = async (req, res, next) => {
    try {
      const searchBooks = book.find({});

      req.result = searchBooks;

      next();
    } catch (error) {
      next(error);
    }
  };

  static get = async (req, res, next) => {
    try {
      const { id } = req.params;
      const foundBook = await book.findById(id);

      if (foundBook) {
        res.status(200).json(foundBook);
      } else {
        next(new NotFound("Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { title, publisher, pages, price, author_id } = req.body;

      const authorFound = await author.findById(author_id);

      const newBook = await book.create({
        title,
        publisher,
        pages,
        price,
        author: authorFound,
      });

      if (newBook) {
        res.status(201).json(newBook);
      } else {
        next(new NotFound("Autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, publisher, pages, price } = req.body;

      const updatedBook = {
        title,
        publisher,
        pages,
        price,
      };

      const foundBook = await book.findByIdAndUpdate(id, updatedBook, {
        new: true,
      });

      if (foundBook) {
        res.status(200).json(foundBook);
      } else {
        next(new NotFound("Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;

      const foundBook = await book.findByIdAndDelete(id);

      if (foundBook) {
        res.status(200).json({ message: "Livro excluído com sucesso" });
      } else {
        next(new NotFound("Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static listByFilter = async (req, res, next) => {
    try {
      const search = await searchQuery(req.query);

      if (search === null) {
        res.status(200).json([]);
      }

      const books = book.find(search).populate("author");

      req.result = books;

      next();
    } catch (error) {
      next(error);
    }
  };
}

async function searchQuery(query) {
  const { publisher, title, minPage, maxPage, authorName } = query;

  let search = {};

  if (publisher) search.publisher = { $regex: publisher, $options: "i" };
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPage || maxPage) search.pages = {};

  if (minPage) search.pages.$gte = minPage;
  if (maxPage) search.pages.$lte = maxPage;

  if (authorName) {
    const authorFound = await author.findOne({
      name: { $regex: authorName, $options: "i" },
    });

    if (authorFound !== null) {
      search.author = authorFound._id;
    } else {
      search = null;
    }
  }

  return search;
}
