import dal_mysql from "./dal_mysql";

const create_users_table = "CREATE TABLE IF NOT EXISTS `vacations_db`.`users` (`id` INT NOT NULL AUTO_INCREMENT,`unique_id` VARCHAR(255) NULL,`first_name` VARCHAR(20) NULL,`last_name` VARCHAR(20) NULL,`user_name` VARCHAR(50) NULL,`password` VARCHAR(255) NULL,`role` INT NULL,PRIMARY KEY (`id`));";
const create_vacations_table = "CREATE TABLE IF NOT EXISTS `vacations_db`.`vacations` (`vacation_id` INT NOT NULL AUTO_INCREMENT,`description` VARCHAR(200) NULL,`destination` VARCHAR(25) NULL,`imageName` VARCHAR(45) NULL,`start_date` DATE NULL,`end_date` DATE NULL,`price` INT NULL,`sumFollowers` INT NULL,PRIMARY KEY (`vacation_id`));";
const create_following_table = "CREATE TABLE IF NOT EXISTS `vacations_db`.`following` (`id` INT NOT NULL AUTO_INCREMENT,`user_name` VARCHAR(50) NULL,`vacation_id` INT NULL,PRIMARY KEY (`id`));";

const building_DB_Tables = () => {
    dal_mysql.execute(create_users_table);
    dal_mysql.execute(create_vacations_table);
    dal_mysql.execute(create_following_table);
}

export default building_DB_Tables;