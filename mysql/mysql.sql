CREATE TABLE tasks ( `text` varchar(200) );

CREATE TABLE log (
	id int PRIMARY KEY auto_increment,
	option varchar(10) NOT NULL,
	text varchar(200),
	`time` time NOT NULL DEFAULT now(),
	`date` date NOT NULL DEFAULT date(now())
	);

delimiter //
CREATE TRIGGER `tasks insert` AFTER insert ON `tasks`
FOR EACH ROW BEGIN
INSERT INTO log SET text = NEW.text, option = 'insert';
END//

CREATE TRIGGER `tasks delete` BEFORE delete ON `tasks` 
FOR EACH ROW BEGIN
INSERT INTO log SET text = OLD.text, option = 'delete';
END //
delimiter ;