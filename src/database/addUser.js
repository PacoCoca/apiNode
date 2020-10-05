import service from '../services/user.js';

async function addUser(user, password, type) {
  if (!user || !password || !type) {
    console.log('Syntax: npm run add-user USER PASSWORD USER_TYPE');
    return;
  }

  const result = await service.create(user, password, type);
  switch (result) {
    case 'badRequest':
      console.log('Syntax: npm run add-user USER PASSWORD USER_TYPE');
      return;
    case 'ok':
      console.log('User added correctly');
  }
}

const [user, password, type] = process.argv.slice(2);
addUser(user, password, type);