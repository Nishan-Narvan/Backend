const asyncHandler= require("express-async-handler");
// Import the Contact model (which talks to the DB)
const Contact = require("../models/contactModel");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(); // find all contacts in DB
    res.status(200).json(contacts); // send them as JSON
  });
  // @desc    Create a new contact
  // @route   POST /api/contacts
  // @access  Private
  const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
  
    // Check if any field is missing
    if (!name || !email || !phone) {
      res.status(400); // Bad request
      throw new Error("All fields are mandatory!");
    }
  
    // Create new contact using model
    const contact = await Contact.create({
      name,
      email,
      phone,
    });
  
    res.status(201).json(contact); // return created contact----json response
  });


  // @desc    Get a single contact by ID
// @route   GET /api/contacts/:id
// @access  Private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // return updated doc
  );

  res.status(200).json(updatedContact);
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Contact deleted successfully" });
});
  // Export the controller functions to use in routes
  module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
  };
  