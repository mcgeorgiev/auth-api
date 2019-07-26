DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id       VARCHAR(255),
  email    VARCHAR(255)  PRIMARY KEY,
  password VARCHAR(255)
);

INSERT INTO users (id, email, password) VALUES ('123', 'test@test.com', 'password');
