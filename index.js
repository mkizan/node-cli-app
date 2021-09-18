const { program } = require('commander');
const contactsFunctions = require('./db/contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await contactsFunctions.listContacts();
      console.log(list);
      break;

    case 'get':
      const contact = await contactsFunctions.getContactById(id);
      if (!contact) {
        console.log(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case 'add':
      const add = await contactsFunctions.addContact({ name, email, phone });
      console.log(add);
      break;

    case 'remove':
      await contactsFunctions.removeContact(id);
      console.log('Contact was successfully removed');
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);