const { nanoid } = require('nanoid');
const listContacts = require('./listContacts');
const writeContacts = require('./writeContacts');

const addContact = async data => {
  const contacts = await listContacts();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

module.exports = addContact;
