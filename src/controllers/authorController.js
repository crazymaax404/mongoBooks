import { NotFound } from "../errors/notFound.js";
import { author } from "../models/index.js";

export class AuthorController {
  static list = async (req, res, next) => {
    try {
      const authors = author.find({});

      req.result = authors;

      next();
    } catch (error) {
      next(error);
    }
  };

  static get = async (req, res, next) => {
    try {
      const { id } = req.params;
      const foundAuthor = await author.findById(id);

      if (foundAuthor) {
        res.status(200).json(foundAuthor);
      } else {
        next(new NotFound("Autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { name, nacionality } = req.body;
      const newAuthor = await author.create({ name, nacionality });

      res.status(201).json(newAuthor);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, nacionality } = req.body;

      const updatedAuthor = {
        name,
        nacionality,
      };

      const foundAuthor = await author.findByIdAndUpdate(id, updatedAuthor, {
        new: true,
      });

      if (foundAuthor) {
        res.status(200).json(foundAuthor);
      } else {
        next(new NotFound("Autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;

      const foundAuthor = await author.findByIdAndDelete(id);

      if (foundAuthor) {
        res.status(200).json({ message: "Autor excluído com sucesso" });
      } else {
        next(new NotFound("Autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };
}
