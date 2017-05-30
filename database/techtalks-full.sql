/************************************/
/*************DROP USERS*************/
DROP USER 'techtdbadmin'@'localhost';
DROP USER 'techtwebadmin'@'localhost';
DROP USER 'techtwebuser'@'localhost';

/************************************/
/************DROP DATABASE***********/
DROP DATABASE IF EXISTS techtalks;
/************************************/
/***********CREATE DATABASE**********/
CREATE DATABASE IF NOT EXISTS techtalks 
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;
/************************************/
/************USE DATABASE************/
USE techtalks;

/************************************/
/************CREATE USERS************/
CREATE USER 'techtdbadmin'@'localhost' IDENTIFIED BY 'qwertydba';
CREATE USER 'techtwebadmin'@'localhost' IDENTIFIED BY 'qwertywa';
CREATE USER 'techtwebuser'@'localhost' IDENTIFIED BY 'qwertywu';
/************************************/
/*******GRANT USERS PRIVILEGES*******/
GRANT ALL PRIVILEGES ON * TO 'techtdbadmin'@'localhost';
GRANT ALL PRIVILEGES ON * TO 'techtwebadmin'@'localhost';
GRANT SELECT ON * TO 'techtwebuser'@'localhost';
/************************************/
/*********RELOAD GRANT TABLES********/
FLUSH PRIVILEGES;

/************************************/
/***********CREATE TABLES************/
CREATE TABLE users(
 id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
 email VARCHAR(100)UNIQUE NOT NULL,
 pass VARCHAR (300) NOT NULL,
 fname VARCHAR(30) NOT NULL,
 lname VARCHAR(30) NOT NULL,	
 mobile VARCHAR(12),
 djoin DATETIME  NOT NULL DEFAULT NOW(),
 arid INT(11) UNSIGNED NOT NULL DEFAULT '1',
 activeacct TINYINT(1) UNSIGNED DEFAULT '0',
  PRIMARY KEY (id)
);

CREATE TABLE accessrights(
 id INT(2) UNSIGNED NOT NULL, 
 ardesc VARCHAR(15),
  PRIMARY KEY (id)
);

CREATE TABLE techevents(
id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
tename VARCHAR(80) NOT NULL,
tedescription TEXT,
PRIMARY KEY (id)
);

CREATE TABLE lecturer(
 id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
 email VARCHAR(40)UNIQUE NOT NULL,
 mobile VARCHAR(12),
 fname VARCHAR(30) NOT NULL,
 lname VARCHAR(30) NOT NULL, 
 PRIMARY KEY (id)
);

CREATE TABLE telecturer(
  teid INT(11) UNSIGNED NOT NULL,
  lid INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (teid, lid)
);

CREATE TABLE locations(
 id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
 address VARCHAR(40),
 zip VARCHAR(10),
 PRIMARY KEY (id)
);

CREATE TABLE teslocation(
  tesid INT(11) UNSIGNED NOT NULL,
  lid INT(11) UNSIGNED NOT NULL,
  eventst DATETIME,
  eventet DATETIME,
  dateadded DATETIME DEFAULT NOW(), 
  totalattending INT(10) UNSIGNED,
  attendlimit INT(10) UNSIGNED,
  PRIMARY KEY(tesid, lid)
);

CREATE TABLE userattending(
  uid INT(11) UNSIGNED NOT NULL,
  tesid INT(11) UNSIGNED NOT NULL,
  reservedseats INT(10) UNSIGNED NOT NULL,
  attending TINYINT(1) UNSIGNED,
  PRIMARY KEY (uid, tesid)
);

CREATE TABLE partners(
 id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
 pname VARCHAR(20)  NOT NULL,
 url VARCHAR(2083) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE epartners(
 eid INT(11) UNSIGNED NOT NULL,
 pid INT(11) UNSIGNED NOT NULL,
 PRIMARY KEY(eid, pid)
);

CREATE TABLE ppartners(
  pid INT(11) UNSIGNED NOT NULL
);

CREATE TABLE imagelabels(	
 id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
 ilabel VARCHAR(80) NOT NULL,
 ialt VARCHAR(200) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE teventilabels(
 tesid INT(11) UNSIGNED NOT NULL,
 ilid INT(11) UNSIGNED NOT NULL,
 PRIMARY KEY(tesid, ilid)
);

CREATE TABLE partnerilabels(
 pid INT(11) UNSIGNED NOT NULL,
 ilid INT(11) UNSIGNED NOT NULL,
 PRIMARY KEY(pid, ilid)
);

CREATE TABLE locationilabels(
 lid INT(11) UNSIGNED NOT NULL,
 ilid INT(11) UNSIGNED NOT NULL,
 PRIMARY KEY(lid, ilid)
);

/************************************/
/***********ALTER TABLES*************/
/***INITIATE AUTO_INCREMENT TABLES***/
ALTER TABLE users AUTO_INCREMENT = 5000;
ALTER TABLE techevents AUTO_INCREMENT = 20000;
ALTER TABLE lecturer AUTO_INCREMENT = 40000;
ALTER TABLE locations AUTO_INCREMENT = 25000;
ALTER TABLE partners AUTO_INCREMENT = 10000;
ALTER TABLE imagelabels AUTO_INCREMENT = 800000;

/********CONNECT TABLES********/
ALTER TABLE users
ADD FOREIGN KEY(arid) REFERENCES accessrights(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

ALTER TABLE teslocation 
ADD FOREIGN KEY(tesid) REFERENCES techevents(id)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD FOREIGN KEY(lid) REFERENCES locations(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

ALTER TABLE telecturer 
ADD FOREIGN KEY (teid) REFERENCES techevents(id)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD FOREIGN KEY (lid) REFERENCES lecturer(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

ALTER TABLE userattending 
ADD FOREIGN KEY(uid) REFERENCES users(id)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD FOREIGN KEY(tesid) REFERENCES techevents(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

ALTER TABLE epartners
ADD FOREIGN KEY(eid) REFERENCES techevents(id)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD FOREIGN KEY(pid) REFERENCES partners(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

ALTER TABLE ppartners
ADD FOREIGN KEY(pid) REFERENCES partners(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE teventilabels
ADD FOREIGN KEY(tesid) REFERENCES techevents(id)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD FOREIGN KEY(ilid) REFERENCES imagelabels(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

ALTER TABLE partnerilabels
ADD FOREIGN KEY(pid) REFERENCES partners(id)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD FOREIGN KEY(ilid) REFERENCES imagelabels(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

ALTER TABLE locationilabels
ADD FOREIGN KEY(lid) REFERENCES locations(id)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD FOREIGN KEY(ilid) REFERENCES imagelabels(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

/************************************/
/**********PREPARED STATMENTS********/
/*SELECTING USERS BASED ON ACCES RIGHTS*/
PREPARE users_select FROM "SELECT * FROM users WHERE arid = ?";
SET @select_admins = "10";
SET @select_users = "1";


/************************************/
/**********STORED PROCEDURES*********/

/********CREATE ACCESS RIGHTS******/
DELIMITER //
DROP PROCEDURE IF EXISTS CreateAccessRight//
CREATE PROCEDURE CreateAccessRight(IN arId INT, IN arType VARCHAR(15))
DETERMINISTIC
BEGIN

INSERT INTO accessrights (id, ardesc) 
VALUES (arId, arType);
END 
// DELIMITER ;

/********CREATE USER******/
DELIMITER //
DROP PROCEDURE IF EXISTS CreateSystemUser//
CREATE PROCEDURE CreateSystemUser(IN uemail VARCHAR(100), IN upass VARCHAR(300), IN ufname VARCHAR(30), IN ulname VARCHAR(30), IN umobile VARCHAR(12)) 
DETERMINISTIC
BEGIN

INSERT INTO users (email, pass, fname, lname, mobile) 
VALUES (uemail, upass, ufname, ulname, umobile);

END 
// DELIMITER ;

/********DROP USER*******/
DELIMITER //
DROP PROCEDURE IF EXISTS DropSystemUser//
CREATE PROCEDURE DropSystemUser(IN uId INT) 
DETERMINISTIC
BEGIN

DELETE FROM users WHERE id = uId;

END 
// DELIMITER ;

/*******CREATE FIRST SUPER USER******/
DELIMITER //
DROP PROCEDURE IF EXISTS UpdateFSAdmin //
CREATE PROCEDURE UpdateFSAdmin()
BEGIN
DECLARE newArId INT;
DECLARE newAA INT;
DECLARE uId INT;

SET newArId = 10;
SET uId = 5000;
SET newAA = 1;

UPDATE users 
SET arid = newArId, activeacct = newAA  
WHERE id = uId;

END 
// DELIMITER ;

/*******ACTIVATE REGISTERED USER*****/
DELIMITER //
DROP PROCEDURE IF EXISTS ActivateRegisteredUsr//
CREATE PROCEDURE ActivateRegisteredUsr(IN uId INT)
DETERMINISTIC
BEGIN
DECLARE newAA INT;

SET newAA = 1;

UPDATE users 
SET activeacct = newAA  
WHERE id = uId;

END 
// DELIMITER ;

/*******CREATE EVENT*****/
DELIMITER //
DROP PROCEDURE IF EXISTS CreateTechEvent//
CREATE PROCEDURE CreateTechEvent(IN ename VARCHAR(80), IN edesc TEXT)
DETERMINISTIC
BEGIN

INSERT INTO techevents (tename, tedescription)
VALUES (ename, edesc);

END 
// DELIMITER ;

/*******CREATE LOCATION*****/
DELIMITER //
DROP PROCEDURE IF EXISTS CreateLocation//
CREATE PROCEDURE CreateLocation(IN addr VARCHAR(80), IN zipcode TEXT)
DETERMINISTIC
BEGIN

INSERT INTO locations (address, zip)
VALUES (addr, zipcode);

END 
// DELIMITER ;

/*******CREATE EVENT LOCATION*****/
DELIMITER //
DROP PROCEDURE IF EXISTS CreateEventLocation//
CREATE PROCEDURE CreateEventLocation(IN tesid INT, IN lid INT, IN eventST datetime,IN eventET datetime, IN attendLim INT(10))
DETERMINISTIC
BEGIN

INSERT INTO teslocation(tesid,lid,eventst,eventet,attendlimit)
VALUES (tesid, lid, eventST, eventET, attendLim);

END 
// DELIMITER ;
/************************************/
/*****PREPARED STORED PROCEDURE******/

/********GET USER********/
DELIMITER //
DROP PROCEDURE IF EXISTS getUserById//
CREATE PROCEDURE getUserById(IN uId INT)
DETERMINISTIC
BEGIN
/*SELECTING USERS BASED ON USER ID*/
PREPARE user_select_by_id FROM "SELECT * FROM users WHERE id = ?";

SET @select_users = uId;
EXECUTE user_select_by_id USING @select_users;
DEALLOCATE PREPARE user_select_by_id;

END 
// DELIMITER ;


/************************************/
/***************TRIGGERS*************/
/**
DELIMITER //
DROP TRIGGER IF EXISTS createSuperAdmin //
CREATE TRIGGER createSuperAdmin
  AFTER INSERT ON users
  FOR EACH ROW 
	BEGIN
    DECLARE uCount INT;
    SELECT COUNT(*) INTO uCount
    FROM users;
    IF uCount = 1
    THEN    
	  CALL UpdatesAdmin();
    END IF;    
    END;
// DELIMITER ;
**/
USE techtalks;

/************************************/
/*************INITIALIZE*************/
/********CREATE ACCESSRIGHTS*********/
CALL CreateAccessRight('1', 'basic user');
CALL CreateAccessRight('10', 'super admin');
SELECT * FROM accessrights;

/********CREATE USERS***************/
CALL CreateSystemUser('bobby@gmail.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51', 'bobby', 'lite', '5948-953');
CALL CreateSystemUser('garry@gmail.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51', 'garry', 'brown', '5455-4489');
CALL CreateSystemUser('gill@live.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51', 'gill', 'krones', '5455-6489');

SELECT * FROM users;

/********GET USER***************/
CALL GetUserById(5000);

/********DROP USER***************/
CALL DropSystemUser(5001);

/*****CREATE FIRST SUPER ADMIN*******/
/**********- run in php code*********/
SELECT id, email, arid, activeacct FROM users;
CALL UpdateFSAdmin();
DROP PROCEDURE IF EXISTS UpdateSAdmin;
SELECT id, email, arid, activeacct FROM users;

/***ACTIVE REGISTERED USER ACCOUNT***/
CALL ActivateRegisteredUsr(5001);
SELECT id, email, arid, activeacct FROM users;


EXECUTE users_select USING @select_admins;
EXECUTE users_select USING @select_users;
/**DEALLOCATE PREPARE test_stmt;*/


USE techtalks;

CALL CreateSystemUser('lorem.eget.mollis@magna.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Fay','Meadows','3882-1825');
CALL CreateSystemUser('Donec.porttitor@atfringillapurus.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Latifah','Talley','4521-3259');
CALL CreateSystemUser('Donec.feugiat@lacusQuisquepurus.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Nissim','Bentley','2697-7692');
CALL CreateSystemUser('ornare.lectus@Utsemper.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Rana','Frazier','3201-7947');
CALL CreateSystemUser('mauris@dolorquamelementum.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Unity','Joyce','1640-6907');
CALL CreateSystemUser('Mauris.vel@gravidasagittisDuis.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Rose','Petersen','4028-3595');
CALL CreateSystemUser('urna.convallis@nonlobortis.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Orla','Massey','9189-5146');
CALL CreateSystemUser('posuere.at@vehicula.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Kelly','Golden','1409-7396');
CALL CreateSystemUser('gravida.Aliquam.tincidunt@nisi.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Magee','Gibbs','3598-2054');
CALL CreateSystemUser('malesuada@Quisquefringillaeuismod.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Barclay','Nichols','8968-6000');
CALL CreateSystemUser('cursus@ipsum.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Quamar','Gregory','5676-1170');
CALL CreateSystemUser('ipsum.ac.mi@Nullamenim.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Yvette','Combs','8439-1614');
CALL CreateSystemUser('tempus.risus.Donec@nasceturridiculus.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Gay','Travis','7571-0556');
CALL CreateSystemUser('convallis@aliquet.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Urielle','Douglas','5536-8404');
CALL CreateSystemUser('nisi@vulputateduinec.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Dustin','Michael','2291-6424');
CALL CreateSystemUser('tempor.est.ac@sitametluctus.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Eugenia','Ross','1215-6170');
CALL CreateSystemUser('dui.nec@nequevitae.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Amy','Chandler','9686-5061');
CALL CreateSystemUser('magna.tellus@tinciduntnuncac.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Uriah','Buck','7805-0907');
CALL CreateSystemUser('lacus@massaMaurisvestibulum.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Evangeline','Collier','1194-4554');
CALL CreateSystemUser('blandit.congue.In@utlacusNulla.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Imogene','Eaton','4854-7785');
CALL CreateSystemUser('Curae.Phasellus@lectus.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Liberty','Berry','4540-1593');
CALL CreateSystemUser('elementum.lorem.ut@Sednullaante.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Xaviera','Sandoval','4680-1616');
CALL CreateSystemUser('mollis.dui@neceuismodin.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Cheyenne','Burns','4534-8991');
CALL CreateSystemUser('ipsum.porta@necligula.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Daria','Conley','5416-9708');
CALL CreateSystemUser('lobortis.quis@magnaLoremipsum.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Uma','Shepherd','1677-2031');
CALL CreateSystemUser('sagittis@nullaIntegerurna.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Shaine','Nielsen','2516-4014');
CALL CreateSystemUser('malesuada@parturient.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Yvonne','Hubbard','4291-1480');
CALL CreateSystemUser('lorem.vehicula.et@etcommodoat.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Montana','Harrell','9831-9971');
CALL CreateSystemUser('odio.Phasellus@erosNamconsequat.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Kendall','Thompson','6188-3521');
CALL CreateSystemUser('lorem@Morbiaccumsanlaoreet.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Alice','Hayes','7798-6761');
CALL CreateSystemUser('at@Vivamussitamet.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Coby','Collins','5156-4611');
CALL CreateSystemUser('nulla.vulputate@DonecegestasAliquam.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Kai','Molina','1968-0486');
CALL CreateSystemUser('erat@etcommodoat.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Cooper','Beck','1000-3166');
CALL CreateSystemUser('consectetuer.adipiscing.elit@molestiesodales.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Brock','Sawyer','4364-5038');
CALL CreateSystemUser('vulputate@temporaugue.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','May','Bright','6154-1412');
CALL CreateSystemUser('molestie.Sed@Fusce.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Natalie','Schmidt','8754-6538');
CALL CreateSystemUser('sodales.Mauris@Aliquamauctor.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Curran','Gallagher','6353-6091');
CALL CreateSystemUser('nunc.interdum@aliquetdiamSed.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Minerva','Leblanc','8926-2070');
CALL CreateSystemUser('In.at@ategestasa.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Graiden','Trujillo','7808-9854');
CALL CreateSystemUser('blandit.viverra.Donec@lectusrutrumurna.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Kelly','Beck','6347-1045');
CALL CreateSystemUser('fermentum.fermentum.arcu@luctusfelis.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Neil','Ochoa','5085-9132');
CALL CreateSystemUser('arcu@acmattis.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Katell','Cooper','4375-6930');
CALL CreateSystemUser('risus.Nunc@dui.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Ian','Lee','8394-5386');
CALL CreateSystemUser('posuere.cubilia.Curae@egetipsumDonec.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Zia','Osborne','3807-2046');
CALL CreateSystemUser('ad.litora.torquent@in.com', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Jeremy','Watts','5677-4899');
CALL CreateSystemUser('ullamcorper@maurisaliquameu.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Gillian','Carpenter','3326-1673');
CALL CreateSystemUser('amet@Morbi.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Kiara','Castaneda','6540-0292');
CALL CreateSystemUser('imperdiet.non@dolorvitaedolor.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Deacon','Farmer','9831-4600');
CALL CreateSystemUser('accumsan.laoreet@dolorquamelementum.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Cyrus','Austin','7625-9074');
CALL CreateSystemUser('auctor.odio@semperauctorMauris.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Haviva','Savage','6753-2431');
CALL CreateSystemUser('augue.ut@mauriselitdictum.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Barclay','Thornton','6574-8430');
CALL CreateSystemUser('aliquet.molestie.tellus@nibhAliquamornare.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Aline','Phillips','7470-9349');
CALL CreateSystemUser('et@Nullaegetmetus.org', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Tanek','Dillard','6152-0219');
CALL CreateSystemUser('id.libero@duinecurna.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Whilemina','Faulkner','5853-0215');
CALL CreateSystemUser('semper.Nam.tempor@parturient.edu', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Kessie','Sanchez','8186-8571');
CALL CreateSystemUser('neque.non@feliseget.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Sonia','Ratliff','7652-6324');
CALL CreateSystemUser('Nullam@Fusce.net', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Macon','Rivers','4398-4720');
CALL CreateSystemUser('nulla@placeratCras.ca', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Shafira','Avila','1632-5182');
CALL CreateSystemUser('eros.turpis.non@et.co.uk', '19b58543c85b97c5498edfd89c11c3aa8cb5fe51','Derek','Barrett','3319-7547');

CALL CreateTechEvent('Turings Toy', 'Alan Turings paper from 1936, where he describes what came to be known as the Turing machine, is one of the truly pivotal papers in the history of computer science. Are you interested in learning more about Turings ground breaking accomplishment? Then join me and hear the fascinating story of the Turing machine! I will describe both its historical context and its implications, but first and foremost I will explain the details of Turings fictional machine and what he was trying to accomplish with it. This is the story of how a mathematician thought outside the box and accidentally changed the course of history! ');
CALL CreateTechEvent('Patents for programmers and engineers - A legal perspective','At this event we will have two speakers addressing two topics around patents and other intellectual property in the digital age, both for individuals, such as programmers and engineers, and digital companies. Our first speaker is Dominic Davies from IP firm Invent Horizon IP, who specialize in helping companies of all sizes manage their intellectual property. Dominic is an experienced patent attorney and has worked within multiple hi-tech industries, such as consumer electronics, digital surgery, and solar energy. For his talk, Dominic will address how to approach and understand patents from the software developer or engineer’s perspective, which is relevant to anyone innovating in a digital environment. The second speaker, Sissela Engquist, is a lawyer at Invent Horizon IP and specializes in Intellectual Property and digitization. She will talk about personal data from a legal perspective and what digital companies need-to-know to create legal processing - and commercialization - of data.');
CALL CreateTechEvent('The Brain and the Interface', 'As Designer we strive to create interfaces that are intuitive and unobtrusive. Sometimes that means we struggle with a good distinction between unconcious guidance and user consent, especially as machine learning and context detection are potentially being introduced into the design ecosystem. This talk will cover some of the obvious as well as hidden challenges designers face as interfaces evolve, from touch interfaces, to voice commands up to the horizon of brain-machine interfaces. ');
CALL CreateTechEvent('The Player of Games Meetup','Lets meet and talk about games! \n The Player Of Games is a global online group, checking in daily to discuss game development and game culture. \n Lets follow up on the success of our latest annual get together with this, the first of what we hope will be a whole bunch of regular meet ups. ');
CALL CreateTechEvent('React Native March Meetup','Its time again! \n In collaboration with React Native CPH and Founders House, we are pleased to present the next React Native Meetup.');
CALL CreateTechEvent('The Dapp version - Copenhagen Ethereum Meetup','In collaboration with the Copenhagen Ethereum Meetup Group, we are more than excited to announce the Dapp Version event. \n The ethereum project is maturing as both the technology stack is coming together and dapps are being launched within the community. \n During the meetup you will experience the potential of the project and try some of the amazing dapps which are now available. \n If you have people in your network who could be interested in learning more on this disruptive technology, please invite them to the meetup, so we can grow the Danish Ethereum community. \n Feel free to bring a Laptop to the meeting with a chrome browser installed. ');
CALL CreateTechEvent('Software QA and Testing - Docker for Testing and Testing in Scrum',' We are excited to announce our very first partner event with Unity3D. \n The event will focus on both testing for Docker, and testing for Scrum. \n Testing for Docker:  \n Speaker: Rasmus Selsmark  \n Rasmus Selsmark is the QA Lead for Services at Unity Technologies, working between Helsinki and Copenhagen. His talk on software QA and testing will focus on Docker for testing.  \n  \n Unity3D is a cross-platform 3D engine and a user friendly development environment for 3D games and applications for mobile, desktop, the web, and consoles.  \n \n Testing in Scrum:  \n Speaker: Carsten Feilberg, House of Test  \n Ive seen a number of problems in projects that want to use scrum and agile as a methodology. There seem to be problem especially in testing. Mostly I have been able to track the root cause to the mindset of the people both inside and outside the development team. \n It can seem like a high-paced chaotic run to reach the sprint goal, with too little time to do everything, but it is in fact not as insane once you get your head right around what it actually is all about. I’d like to present my view on how to make it work - how to get testing incorporated in a good way and stick with the basic principles of agile software development.');
CALL CreateTechEvent('Ionic pop-up event','This time together with Ionic Denmark and AngularJS Copenhagen we are pleased to have Sani Yusuf for a great Ionic talk just 2 days before his talk at ngVikings. \n Ionic has reached its stable release in Jan 2017 and there are a lot of great goodies out there for it. PWAs is also the hottest technology going around and in this session, Sani Yusuf from the Ionic UK community will show how we can use Ionic to achieve a working PWA app and have our app work offline while still having 3 applications.');
CALL CreateTechEvent('Scala Second Coding Session','Hello Scala enthusiasts, \n Our last Scala coding session on January 17th was a big success. We were so happy to finally meet so many of you scala coders and received a lot of positive feedback after the event. As the result, we hereby introduce our second Scala coding session, in collaboration with the Copenhagen Scala User Group. \n For those for are new, the idea is simple. Let us get together and create something awesome in Scala. It does not have to be feature complete but it should bring enough exposure to the language and the power that it brings. Do not be shy to share ideas, as we will come up with a couple of small or one big project that we can code up together.  \n For those who attended the first coding session, as agreed, we will have a follow up to finish our Akka Actor task, possibly start a new one and talk about Partial Functions.  \n Akka actor assignment: https://github.com/amupoti/Principles-of-Reactive-Programming/blob/master/w5/actorbintree/src/main/scala/actorbintree/BinaryTreeSet.scala  \n And the task description: https://github.com/amupoti/Principles-of-Reactive-Programming/blob/master/w5/week5.actorbintree-instructions.pdf ');

CALL CreateLocation('Ap #559-467 Libero. Rd.','426421');
CALL CreateLocation('5348 Elementum Road','H1A 5Y7');
CALL CreateLocation('P.O. Box 293, 966 Enim Avenue','R4Z 7L5');
CALL CreateLocation('250-2978 Sed Ave','L1X 9N5');
CALL CreateLocation('Ap #776-1877 Morbi St.','42248');
CALL CreateLocation('482-4506 Mollis. Road','7495');
CALL CreateLocation('Ap #220-131 Magna Avenue','25367');
CALL CreateLocation('P.O. Box 226, 318 Laoreet, Rd.','JR8F 1UA');
CALL CreateLocation('393-9185 Tortor Ave','299322');
CALL CreateLocation('5912 Blandit Ave','21119');

INSERT INTO teslocation (tesid, lid, eventst, eventet, dateadded, totalattending, attendlimit) VALUES ('20003', '25006', '2017-05-21 11:00:00', '2017-05-21 18:00:00', CURRENT_TIMESTAMP, NULL, '60'); 
INSERT INTO teslocation (tesid, lid, eventst, eventet, dateadded, totalattending, attendlimit) VALUES ('20005', '25006', '2017-05-09 00:00:00', '2017-05-09 18:00:00', CURRENT_TIMESTAMP, NULL, '200'); 
INSERT INTO teslocation (tesid, lid, eventst, eventet, dateadded, totalattending, attendlimit) VALUES ('20002', '25000', '2017-05-16 14:00:00', '2017-05-16 20:00:00', CURRENT_TIMESTAMP, NULL, '50'); 
INSERT INTO teslocation (tesid, lid, eventst, eventet, dateadded, totalattending, attendlimit) VALUES ('20006', '25007', '2017-05-25 05:00:00', '2017-05-25 12:00:00', CURRENT_TIMESTAMP, NULL, '1000');
INSERT INTO teslocation (tesid, lid, eventst, eventet, dateadded, totalattending, attendlimit) VALUES ('20006', '25003', '2017-06-03 12:00:00', '2017-05-06 19:00:00', CURRENT_TIMESTAMP, NULL, '60');
INSERT INTO teslocation (tesid, lid, eventst, eventet, dateadded, totalattending, attendlimit) VALUES  ('20004', '25005', '2017-05-24 09:00:00', '2017-05-24 18:00:00', CURRENT_TIMESTAMP, NULL, '40');

INSERT INTO lecturer (email, mobile, fname, lname) VALUES ( 'klaus@themail.com', '3459-3204', 'klause', 'rasmus');
INSERT INTO lecturer (email, mobile, fname, lname) VALUES ( 'peter.p@gmail.com', '4359-4356', 'peter', 'smith');
INSERT INTO lecturer (email, mobile, fname, lname) VALUES ( 'roger.s@gmail.com', '4365-6432', 'roger', 'smith');

INSERT INTO telecturer (teid, lid) VALUES ('20000', '40000');
INSERT INTO telecturer (teid, lid) VALUES ('20001', '40001');
INSERT INTO telecturer (teid, lid) VALUES ('20001', '40002');

INSERT INTO userattending (uid, tesid, reservedseats, attending) VALUES ('5000', '20000', '3', '1'); 
INSERT INTO userattending (uid, tesid, reservedseats, attending) VALUES ('5002', '20001', '1', '1');
INSERT INTO userattending (uid, tesid, reservedseats, attending) VALUES ('5002', '20000', '1', '1'); 
INSERT INTO userattending (uid, tesid, reservedseats, attending) VALUES ('5002', '20004', '20', '1'); 
INSERT INTO userattending (uid, tesid, reservedseats, attending) VALUES ('5003', '20003', '4', '1');
INSERT INTO userattending (uid, tesid, reservedseats, attending) VALUES ('5003', '20006', '47', '1');

INSERT INTO partners (pname, url) VALUES ('falcon', 'http://foocafe.org/');
INSERT INTO partners (pname, url) VALUES ('pinmeto', 'https://www.pinmeto.com/');
INSERT INTO partners (pname, url) VALUES ('microsoft', 'https://www.microsoft.com/'); 
INSERT INTO partners (pname, url) VALUES ('iis', 'https://www.iis.se/');
INSERT INTO partners (pname, url) VALUES ('king', 'https://king.com/');

INSERT INTO ppartners (pid) VALUES ('10000');
INSERT INTO ppartners (pid) VALUES ('10001');
INSERT INTO ppartners (pid) VALUES ('10002');

INSERT INTO epartners (eid, pid) VALUES ('20000', '10000'); 
INSERT INTO epartners (eid, pid) VALUES ('20000', '10001'); 
INSERT INTO epartners (eid, pid) VALUES ('20000', '10002'); 
INSERT INTO epartners (eid, pid) VALUES ('20001', '10002'); 
INSERT INTO epartners (eid, pid) VALUES ('20001', '10003'); 
INSERT INTO epartners (eid, pid) VALUES ('20002', '10004'); 
INSERT INTO epartners (eid, pid) VALUES ('20003', '10004');

INSERT INTO imagelabels (ilabel, ialt) VALUES ( 'falcon', 'falcon logo'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ( 'pinmeto', 'pinmeto logo');
INSERT INTO imagelabels (ilabel, ialt) VALUES ( 'microsoft', 'microsoft logo');
INSERT INTO imagelabels (ilabel, ialt) VALUES ( 'iis', 'iis logo'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ( 'king', 'king logo');

INSERT INTO partnerilabels (pid, ilid) VALUES ('10000', '800000');
INSERT INTO partnerilabels (pid, ilid) VALUES ('10001', '800001');
INSERT INTO partnerilabels (pid, ilid) VALUES ('10002', '800002');
INSERT INTO partnerilabels (pid, ilid) VALUES ('10003', '800003');
INSERT INTO partnerilabels (pid, ilid) VALUES ('10004', '800004');

INSERT INTO imagelabels (ilabel, ialt) VALUES ('location1.jpg', 'A large empty hall'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('location2.jpg', 'A small empty hall'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('location3.jpg', 'A large furnished hall'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('location4.jpg', 'A small furnished hall'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('location5.jpg', 'A small empty room');

INSERT INTO locationilabels (lid, ilid) VALUES ('25000', '800005'); 
INSERT INTO locationilabels (lid, ilid) VALUES ('25000', '800009'); 
INSERT INTO locationilabels (lid, ilid) VALUES ('25001', '800006'); 
INSERT INTO locationilabels (lid, ilid) VALUES ('25002', '800007'); 
INSERT INTO locationilabels (lid, ilid) VALUES ('25003', '800008');

INSERT INTO imagelabels (ilabel, ialt) VALUES ('patent.jpg', 'patent stamp print'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('brain.jpg', 'brain network firing neurons'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('gamer.jpg', 'room full of nerds wasting time'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('react.jpg', 'react logo'); 
INSERT INTO imagelabels (ilabel, ialt) VALUES ('dapp.jpg', 'ethereum logo');

INSERT INTO teventilabels (tesid, ilid) VALUES ('20000', '800009'); 
INSERT INTO teventilabels (tesid, ilid) VALUES ('20001', '800010'); 
INSERT INTO teventilabels (tesid, ilid) VALUES ('20002', '800011'); 
INSERT INTO teventilabels (tesid, ilid) VALUES ('20003', '800012'); 
INSERT INTO teventilabels (tesid, ilid) VALUES ('20004', '800013');

/***********************************************************/
/**    -added passwords for users  CreateUser() procedure **/
/**    -added passwords for users  user inserts inserts   **/
/**    -added passwords for users  user inserts           **/
