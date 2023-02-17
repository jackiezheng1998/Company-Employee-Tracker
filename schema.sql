DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- Create the departments table
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

-- Create the roles table
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments (id)
);

-- Create the employees table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles (id),
  FOREIGN KEY (manager_id) REFERENCES employees (id)
);