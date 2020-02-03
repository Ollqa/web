const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');
const fs = require('fs');
const {
  isEmpty,
  find,
  map
} = lodash;
let users = require('./users.json');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const getAuthErrors = ({
  email,
  password
}) => {
  let errors = {};
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
  const passwordRegex = /\S{6,}/;
  if (!emailRegex.test(email)) {
    errors.email = 'Некорректный email адрес';
  }
  if (!passwordRegex.test(password)) {
    errors.password = 'Пароль должен содержать не менее 6 символов';
  }
  return errors;
}

app.post('/graphql', (req, res) => {
  switch (req.body.operationName) {
    case 'Register': {
      const {
        email,
        password
      } = req.body.variables.input;
      const errors = getAuthErrors({
        email,
        password
      });

      const newUser = {
        id: users.count + 1,
        email,
        profile: {
          firstName: '',
          lastName: ''
        }
      }

      if (isEmpty(errors)) {
        const updatedUsers = {
          rows: [...users.rows, {
            ...newUser,
            password,
            registeredAt: +new Date(),
            lastLogonAt: +new Date()
          }],
          count: users.count + 1
        }
        fs.writeFile('./server/users.json', JSON.stringify(updatedUsers), function (err) {
          console.log(
            err ?
            '[Ошибка обновления данных]:' + err :
            '[Обновление данных]: успешно ' + JSON.stringify(updatedUsers)
          );
        });
        users = updatedUsers;
      }

      const register = !isEmpty(errors) ? {
        errors
      } : {
        user: newUser,
        token: true,
        expiresIn: 1565448328
      };

      res.send({
        data: {
          register
        }
      });
      break;
    }
    case 'Login': {
      const {
        email,
        password
      } = req.body.variables;
      let errors = getAuthErrors({
        email,
        password
      });
      let user = null;
      if (isEmpty(errors)) {
        user = find(users.rows, ['email', email]);

        if (user) {
          const {
            rows,
            count
          } = users;
          const updatedUsers = {
            rows: map(rows, item => item.email === email ? {
              ...item,
              lastLogonAt: +new Date()
            } : item),
            count
          }

          fs.writeFile('./server/users.json', JSON.stringify(updatedUsers), function (err) {
            console.log(
              err ?
              '[Ошибка обновления данных]:' + err :
              '[Обновление данных]: успешно ' + JSON.stringify(updatedUsers)
            );
          });
          users = updatedUsers
        } else {
          errors.email = 'Пользователь с таким email не найден'
        }
      }
      const login = !isEmpty(errors) ? {
        errors: {
          email: '',
          password: '',
          ...errors
        },
        token: {
          token: '',
          expiresIn: ''
        },
        user: {
          id: '',
          email: '',
          profile: {
            lastName: '',
            firstName: ''
          }
        }
      } : {
        user: {
          id: user.id,
          email: user.email,
          profile: user.profile
        },
        token: {
          token: true,
          expiresIn: 1565448328
        },
        errors: {
          email: '',
          password: ''
        }
      };

      res.send({
        data: {
          login
        }
      });
      break;
    }
    case 'Users': {
      res.send({
        data: {
          users
        }
      });
      break;
    }
    case 'EditProfile': {
      const {
        firstName,
        lastName,
        id
      } = req.body.variables;
      user = find(users.rows, ['id', id]);
      let errors = {}

      if (user) {
        const {
          rows,
          count
        } = users;
        const updatedUsers = {
          rows: map(rows, item => item.id === id ? {
            ...item,
            profile: {
              ...item.profile,
              firstName,
              lastName
            }
          } : item),
          count
        }

        fs.writeFile('./server/users.json', JSON.stringify(updatedUsers), function (err) {
          console.log(
            err ?
            '[Ошибка обновления данных]:' + err :
            '[Обновление данных]: успешно ' + JSON.stringify(updatedUsers)
          );
        });
        users = updatedUsers
      } else {
        errors.id = 'Пользователь не найден'
      }

      const editProfile = !isEmpty(errors) ? {
        errors,
        user: {
          id: '',
          email: '',
          profile: {
            lastName: '',
            firstName: ''
          }
        }
      } : {
        user: {
          id,
          email: user.email,
          profile: {
            firstName,
            lastName
          }
        },
        errors: {
          id: ''
        }
      };

      res.send({
        data: {
          editProfile
        }
      });
      break;
    }
  }
});

app.listen(PORT, 'localhost', error => {
  if (error) {
    console.log('ERROR', error);
  } else {
    console.log('Listening at http://localhost:' + PORT);
  }
});