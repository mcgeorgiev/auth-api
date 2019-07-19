CREATE TABLE users (
  id       VARCHAR(255) PRIMARY KEY,
  email    VARCHAR(255),
  password VARCHAR(255)
);

INSERT INTO users (id, email, password) VALUES ('123', 'test@test.com', 'password');
