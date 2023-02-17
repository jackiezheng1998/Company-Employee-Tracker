// Display the main menu and prompt the user for input
async function mainMenu() {
    const choices = [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Quit'
    ];
  
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices
    });
  
    switch (action) {
      case choices[0]: // View all departments
        viewDepartments();
        break;
      case choices[1]: // View all roles
        viewRoles();
        break;
      case choices[2]: // View all employees
        viewEmployees();
        break;
      case choices[3]: // Add a department
        addDepartment();
        break;
      case choices[4]: // Add a role
        addRole();
        break;
      case choices[5]: // Add an employee
        addEmployee();
        break;
      case choices[6]: // Update an employee role
        updateEmployeeRole();
        break;
      case choices[7]: // Quit
        console.log('Goodbye!');
        connection.end();
        break;
    }
  }
  
  // Display a table of all the departments
  async function viewDepartments() {
    const [rows] = await connection.query('SELECT * FROM departments');
    console.table(rows);
    mainMenu();
  }
  
  // Display a table of all the roles
  async function viewRoles() {
    const [rows] = await connection.query('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id');
    console.table(rows);
    mainMenu();
  }
  
  // Display a table of all the employees
  async function viewEmployees() {
    const [rows] = await connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id');
    console.table(rows);
    mainMenu();
  }

  // Add a department
    async function addDepartment() {
        const { name } = await inquirer.prompt({
            name: 'name',
            message: 'What is the name of the department?'
        });
    
        await connection.query('INSERT INTO departments SET ?', { name });
        console.log(`Added ${name} to the database`);
        mainMenu();
    }

    // Add a role
    async function addRole() {
        const departments = await connection.query('SELECT * FROM departments');
    
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));
    
        const role = await inquirer.prompt([
            {
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does the role belong to?',
                choices: departmentChoices
            }
        ]);
    
        await connection.query('INSERT INTO roles SET ?', role);
        console.log(`Added ${role.title} to the database`);
        mainMenu();
    }

    // Add an employee
    async function addEmployee() {
        const roles = await connection.query('SELECT * FROM roles');
        const employees = await connection.query('SELECT * FROM employees');
    
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));
    
        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        managerChoices.unshift({ name: 'None', value: null });
    
        const employee = await inquirer.prompt([
            {
                name: 'first_name',
                message: "What is the employee's first name?"
            },
            {
                name: 'last_name',
                message: "What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'role_id',
                message: "What is the employee's role?",
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Who is the employee's manager?",
                choices: managerChoices
            }
        ]);
    
        await connection.query('INSERT INTO employees SET ?', employee);
        console.log(
            `Added ${employee.first_name} ${employee.last_name} to the database`
        );
        mainMenu();
    }

    // Update an employee role
    async function updateEmployeeRole() {
        const employees = await connection.query('SELECT * FROM employees');
        const roles = await connection.query('SELECT * FROM roles');
    
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
    
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));
    
        const { employeeId, roleId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Which role do you want to assign to the selected employee?',
                choices: roleChoices
            }
        ]);
    
        await connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [
            roleId,
            employeeId
        ]);
    
        console.log('Updated employee role');
        mainMenu();
    }

    // Start the application
    mainMenu();