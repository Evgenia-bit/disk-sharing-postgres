CREATE TABLE IF NOT EXISTS Person (
    Id SERIAL PRIMARY KEY,
    Nickname varchar(50) NOT NULL,
    Password varchar(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS Disk (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS TakenItem (
    Id SERIAL PRIMARY KEY,
    OwnerId INTEGER REFERENCES Person (Id),
    HolderId INTEGER REFERENCES Person (Id),
    DiskId INTEGER REFERENCES Disk (Id)
);

DELETE FROM TakenItem;
DELETE FROM Person;
DELETE FROM Disk;


INSERT INTO Person (Id, Nickname, Password) VALUES (1, 'Олег', '$2b$05$X6ObiIeHjII9Af6MEbLelOUT9y5tafnIgXOJT9ZQRfRlY0K1rxBMy');
INSERT INTO Person (Id, Nickname, Password) VALUES (2, 'Вася', '$2b$05$W.jhr6W6YHc9UcgAr1cIUu4A3/3oPkGNXpvSIVCiJvhtfNIjy2AsC');
INSERT INTO Person (Id, Nickname, Password) VALUES (3, 'Катя', '$2b$05$fylt60vuSxcuIG9irVCQXOjOGHrpgx2iDGFllvwAO67uQBUC/Czs2');

INSERT INTO Disk (Id, Name) VALUES (1, 'Хиты 2022');
INSERT INTO Disk (Id, Name) VALUES (2, 'Все части Шрека');
INSERT INTO Disk (Id, Name) VALUES (3, 'Лекции по программированию');
INSERT INTO Disk (Id, Name) VALUES (4, 'Лучшие песни Лепса');
INSERT INTO Disk (Id, Name) VALUES (5, 'Властенин колец все части');
INSERT INTO Disk (Id, Name) VALUES (6, 'Смешарики');
INSERT INTO Disk (Id, Name) VALUES (7, 'Хиты 2020');
INSERT INTO Disk (Id, Name) VALUES (8, 'Лекции по квантовой физике');
INSERT INTO Disk (Id, Name) VALUES (9, 'Лучшие песни лета 2017');

INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (1,1,1);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (1,1,2);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (1,1,3);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (2,2,4);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (2,2,5);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (2,2,6);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (3,3,7);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (3,3,8);
INSERT INTO TakenItem (OwnerId, HolderId, DiskId) VALUES (3,3,9);