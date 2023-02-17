// Dependencies: connection.js
const connection = require('./connection');

// Class Constructor
class companyDatabase {
    constructor(connection) {
        this.connection = connection;
    };
};

// View all employees
viewEmployees(); {
    return this.connection.promise().query(
        'SELECT employees.id, CONCAT (employees.first_name, " ", employees.last_name) AS "Employee", roles.title AS "Title, departments.name AS department, roles.salary AS "Salary", CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id'
    );
};

// View all managers
viewManagers(); {
    return this.connection.promise().query(
        'SELECT employees.id, CONCAT (employees.first_name, " ", employees.last_name) AS "Employee", roles.title AS "Title, departments.name AS department, roles.salary AS "Salary", CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id WHERE employees.manager_id IS NULL'
    );
};

// View all departments
viewDepartments(); {
    return this.connection.promise().query(
        'SELECT * FROM departments'
    );
};

// Add an employee
addEmployee(employee); {
    return this.connection.promise().query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
    );
};

// Update an employee's role
updateEmployeeRole(employeeId, roleId); {
    return this.connection.promise().query(
        'UPDATE employees SET role_id = ? WHERE id = ?',
        [roleId, employeeId]
    );
};

// Update an employee's manager
updateEmployeeManager(employeeId, managerId); {
    return this.connection.promise().query(
        'UPDATE employees SET manager_id = ? WHERE id = ?',
        [managerId, employeeId]
    );
};

// Delete an employee
deleteEmployee(employeeId); {
    return this.connection.promise().query(
        'DELETE FROM employees WHERE id = ?',
        [employeeId]
    );
};

// View all roles
viewRoles(); {
    return this.connection.promise().query(
        'SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id'
    );
};

// Add a role
addRole(role); {
    return this.connection.promise().query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [role.title, role.salary, role.department_id]
    );
};

// Delete a role
deleteRole(roleId); {
    return this.connection.promise().query(
        'DELETE FROM roles WHERE id = ?',
        [roleId]
    );
};

// View all departments
viewDepartments(); {
    return this.connection.promise().query(
        'SELECT * FROM departments'
    );
};

// Add a department
addDepartment(department); {
    return this.connection.promise().query(
        'INSERT INTO departments (name) VALUES (?)',
        [department.name]
    );
};

// Delete a department
deleteDepartment(departmentId); {
    return this.connection.promise().query(
        'DELETE FROM departments WHERE id = ?',
        [departmentId]
    );
};

// Export the class
module.exports = new companyDatabase(connection);
