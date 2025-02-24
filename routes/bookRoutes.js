const express = require ("express");
const router = express.Router();
const Book = require("../models/Book");

//POST
router.post("/", async (requestAnimationFrame, res)=>{
    try {
        const { title, author, genre, publishedYear, availableCopies} = req.body;

        if (!title || !author || !genre || availableCopies == undefined) {
            return res.status(400).json({ error: "Missing required field"});
        }

        const newBook = new Book ({title, author, genre, publishedYear, availableCopies });
        await newBook.save();

        res.status(201).json(newBook);
     } catch(error){
        res.status(500).json({ error: "Internal Server Error" });
        }
        
    });

//GET
router.get("/", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // READ a single book by ID (GET)
  router.get("/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // UPDATE a book (PUT)
  router.put("/:id", async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedBook) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // DELETE a book (DELETE)
  router.delete("/:id", async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  module.exports = router;