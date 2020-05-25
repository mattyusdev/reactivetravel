CREATE DATABASE reactproject;

USE reactproject;

-- ---------------------------------------------------------------------
-- USERS
-- ---------------------------------------------------------------------
CREATE TABLE users(
    id int NOT NULL auto_increment,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(1000) NOT NULL,
    email varchar(255) NOT NULL,
    isAdmin boolean NOT NULL DEFAULT false,
    PRIMARY KEY(id)
);

INSERT INTO
    users(firstName, lastName, username, password, email)
VALUES
    (
        'Matan',
        'Mattyus',
        'matan',
        '$2a$10$Q1wFrv3pDgRTaU3KlstXTuOC7R0jbs0Kb2tYCf/wyTO0RMRvrOOX6',
        'matan@gmail'
    ),
UPDATE
    users
SET
    isAdmin = true
where
    id = 1;

-- ---------------------------------------------------------------------
-- VACATIONS
-- ---------------------------------------------------------------------
CREATE TABLE vacations(
    id int NOT NULL auto_increment,
    location varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    dateFrom date NOT NULL,
    dateTo date NOT NULL,
    price int NOT NULL,
    image text NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO
    vacations(
        location,
        title,
        description,
        dateFrom,
        dateTo,
        price,
        image
    )
VALUES
    (
        'Barcelona',
        'FC Barca Football Tour',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam facere explicabo nemo odit cupiditate, nesciunt recusandae perspiciatis! Amet commodi doloribus, optio velit exercitationem ipsum reiciendis dolores voluptates adipisci necessitatibus! Recusandae!Minima nostrum maiores facilis cum, expedita porro doloribus, quo vitae possimus placeat ex eum voluptatem saepe neque. Unde sint temporibus, aliquid magni quaerat molestias exercitationem eligendi laborum ducimus incidunt. Nam.',
        now(),
        now(),
        2300,
        'IMG'
    ),
    (
        'Bucarest',
        'A Deep Look Into Bucarest',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam facere explicabo nemo odit cupiditate, nesciunt recusandae perspiciatis! Amet commodi doloribus, optio velit exercitationem ipsum reiciendis dolores voluptates adipisci necessitatibus! Recusandae!Minima nostrum maiores facilis cum, expedita porro doloribus, quo vitae possimus placeat ex eum voluptatem saepe neque. Unde sint temporibus, aliquid magni quaerat molestias exercitationem eligendi laborum ducimus incidunt. Nam.',
        now(),
        now(),
        1500,
        'IMG'
    ),
    (
        'Rome',
        'Journey to the Colosseum',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam facere explicabo nemo odit cupiditate, nesciunt recusandae perspiciatis! Amet commodi doloribus, optio velit exercitationem ipsum reiciendis dolores voluptates adipisci necessitatibus! Recusandae!Minima nostrum maiores facilis cum, expedita porro doloribus, quo vitae possimus placeat ex eum voluptatem saepe neque. Unde sint temporibus, aliquid magni quaerat molestias exercitationem eligendi laborum ducimus incidunt. Nam.',
        now(),
        now(),
        2500,
        'IMG'
    );

-- ---------------------------------------------------------------------
-- USERS VACATION LINK TABLE
-- ---------------------------------------------------------------------
CREATE TABLE users_vacations(
    users_id int not null,
    vacations_id int not null,
    FOREIGN KEY(users_id) REFERENCES users(id),
    FOREIGN KEY(vacations_id) REFERENCES vacations(id)
);