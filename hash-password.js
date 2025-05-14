const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password for "${password}": ${hashedPassword}`);
}

hashPassword('ballery@619');
