-- used for heroku initialization;
CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    descr VARCHAR(2000) NOT NULL,
    img VARCHAR(64) NOT NULL,
    categories TEXT [],
    size VARCHAR(30),
    price FLOAT(8) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    ID SERIAL PRIMARY KEY,
    userid VARCHAR(30) NOT NULL
    products json NOT NULL
);

CREATE TABLE order (
    ID SERIAL PRIMARY KEY,
    userid VARCHAR(30) NOT NULL
    products json NOT NULL,
    amount INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    address1 VARCHAR(30) NOT NULL, 
    city VARCHAR(30) NOT NULL, 
    state VARCHAR(30) NOT NULL,
    zip VARCHAR(30) NOT NULL,
    status VARCHAR(30) DEFAULT "pending",
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user ADD CONSTRAINT email_unique UNIQUE (email);