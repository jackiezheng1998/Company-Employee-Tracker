-- View All Employees
SELECT employee_id AS 'ID'
CONCAT (employee.first_name, ' ', employee.last_name) AS 'Employee',
role.title AS 'Title',
department.name AS 'Department',
role.salary AS 'Salary',
CONCAT (manager.first_name, ' ', manager.last_name) AS 'Manager'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN departments ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id
ORDER BY employee_id ASC;

-- View Managers
SELECT employee_id AS 'ID'
CONCAT (employee.first_name, ' ', employee.last_name) AS 'Manager',
role.title AS 'Title',
department.name AS 'Department',
role.salary AS 'Salary'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN departments ON role.department_id = department.id
WHERE employee.manager_id IS NULL

-- View All Departments
SELECT department_id AS 'ID'
department.name AS 'Department'
FROM department; 

-- View All Roles
SELECT role_id AS 'ID'
role.title AS 'Title'
department.name AS 'Department'
role.salary AS 'Salary'
FROM role
LEFT JOIN department ON role.department_id = department.id

-- Add Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('', '', '', '');

-- Add Department
INSERT INTO department (name)
VALUES ('');

-- Add Role
INSERT INTO role (title, salary, department_id)
VALUES ('', '', '');

-- Update Employee Role
UPDATE employee
SET role_id = ''
WHERE employee_id = '';

-- Update Employee Manager
UPDATE employee
SET manager_id = ''
WHERE employee_id = '';

-- Delete Employee
DELETE FROM employee
WHERE employee_id = '';

-- Delete Department
DELETE FROM department
WHERE department_id = '';

-- Delete Role
DELETE FROM role
WHERE role_id = '';

-- View Total Utilized Budget of a Department
SELECT department.name AS 'Department',
SUM(role.salary) AS 'Total Budget'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
GROUP BY department.name
ORDER BY department.name ASC;

