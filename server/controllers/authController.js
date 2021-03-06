const bcrypt = require('bcryptjs');

module.exports = {
   register: async(req, res) => {
      const {username, password, isAdmin} = req.body;
      const db = req.app.get('db');

      const result = await db.get_user([username]);
      const existingUser = result[0];
      if(existingUser) {
         return res.status(409).send('Username already taken');
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const registeredUser = await db.register_user([isAdmin, username, hash]);
      const user = registeredUser[0];

      req.session.user = { isAdmin: user.is_Admin, id: user.id, username: user.username};
      return res.status(201).send(req.session.user);
   },
   login: async(req, res) => {
      const {username, password} = req.body;
      const db = req.app.get('db');

      const result = db.get_user(username)
      .then(user => {})
   }

}

