const listContacts = require('./listContacts');
const writeContacts = require('./writeContacts');

const removeContact = async id => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }

  contacts.splice(idx, 1);
  await writeContacts(contacts);
  return true;
};

module.exports = removeContact;
