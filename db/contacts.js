const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async id => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);

  if (idx === -1) {
    return null;
  }

  return contacts[idx];
};

const addContact = async data => {
  const contacts = await listContacts();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async id => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }

  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return true;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
