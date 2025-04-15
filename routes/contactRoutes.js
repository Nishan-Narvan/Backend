const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// GET all contacts & POST new contact
router.route("/").get(getContacts).post(createContact);

// GET, PUT, DELETE a single contact by ID
router
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
