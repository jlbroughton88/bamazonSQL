DROP DATABASE IF EXISTS animals_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	stock_quantity INTEGER(100),
	item_id INTEGER(30) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30),
	price INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity )
VALUES ("1", "item1", "department1", "10", "50"),
		("2", "item2", "department1", "10", "50"),
		("3", "item3", "department1", "10", "50"),
		("4", "item4", "department1", "10", "50"),
		("5", "item5", "department1", "10", "50"),
		("6", "item6", "department1", "10", "50"),
		("7", "item7", "department1", "10", "50"),
		("8", "item8", "department1", "10", "50"),
		("9", "item9", "department1", "10", "50"),
		("10", "item10", "department1", "10", "50");