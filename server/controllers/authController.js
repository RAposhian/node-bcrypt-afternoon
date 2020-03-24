const bcrypt = require('bcryptjs');

module.exports = {
   register: async(req, res) => {
      const db = req.app.get('db');
      const {username, password, isAdmin} = req.body;

      let result = await db.get_user(username);
      const existingUser = result[0];
      if(existingUser) {
         return res.status(409).send('Username already taken');
      }

      const sale = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
   }

}