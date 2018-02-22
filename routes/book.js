const { pick } = require("lodash");
const Book = require("../models/book");
const { checkPermission } = require("../utils");

module.exports = router => {
  // create a book
  router.post("/book", checkPermission("CREATE", "Book"), (req, res, next) => {
    const obj = pick(req.body, ["title", "author", "pageCount", "publication"]);

    obj.createdBy = req.decoded._id;

    const book = new Book(obj);

    book
      .save()
      .then(book => res.json(book))
      .catch(next);
  });

  // delete a book
  router.delete(
    "/book/:id",
    checkPermission("DELETE", "Book"),
    (req, res, next) => {
      const bookId = req.params.id;

      Book.remove({ _id: bookId })
        .then(result => res.json(result))
        .catch(next);
    }
  );

  // update a book
  router.put(
    "/book/:id",
    checkPermission("UPDATE", "Book"),
    (req, res, next) => {
      const bookId = req.params.id;
      const options = { new: true };
      const obj = pick(req.body, [
        "title",
        "author",
        "pageCount",
        "publication"
      ]);

      Book.findByIdAndUpdate(bookId, obj, options)
        .then(book => res.json(book))
        .catch(next);
    }
  );

  // book details
  router.get("/book/:id", checkPermission("READ", "Book"), (req, res, next) => {
    const bookId = req.params.id;

    Book.findById(bookId)
      .then(book => res.json(book))
      .catch(next);
  });

  // list of books
  router.get("/book", checkPermission("LIST", "Book"), (req, res, next) => {
    Book.find({})
      .then(books => res.json(books))
      .catch(next);
  });
};
