let users = [];
let projects = [];

document.getElementById('createUserBtn').addEventListener('click', createUser);

function createUser() {
    const userName = prompt("Enter user name:");
    if (userName) {
        const user = { name: userName, projects: [] };
        users.push(user);
        renderUsers();
    }
}

function renderUsers() {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = '';
    
    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `<strong>${user.name}</strong> <button onclick="createProject(${index})">Create Project</button>`;
        usersContainer.appendChild(userDiv);
    });
}

function createProject(userIndex) {
    const projectName = prompt("Enter project name:");
    if (projectName) {
        const project = { name: projectName, tasks: [] };
        users[userIndex].projects.push(project);
        renderProjects(userIndex);
    }
}

function renderProjects(userIndex) {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';

    users[userIndex].projects.forEach((project) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        projectDiv.innerHTML = `<h3>${project.name}</h3>`;
        
        const taskInput = document.createElement('input');
        taskInput.placeholder = "Enter task";
        const addTaskBtn = document.createElement('button');
        addTaskBtn.innerText = "Add Task";
        addTaskBtn.onclick = () => {
            const taskName = taskInput.value;
            if (taskName) {
                const timestamp = new Date().toLocaleString(); // Get current date and time
                project.tasks.push({ name: taskName, timestamp, completed: false, comments: [] });
                renderTasks(projectDiv, project);
                taskInput.value = '';
            }
        };
        
        projectDiv.appendChild(taskInput);
        projectDiv.appendChild(addTaskBtn);
        renderTasks(projectDiv, project);
        projectsContainer.appendChild(projectDiv);
    });
}

function renderTasks(projectDiv, project) {
    const tasksDiv = document.createElement('div');
    
    project.tasks.forEach((task, taskIndex) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `<strong>${task.name}</strong> <em>(Added on: ${task.timestamp})</em>`;
        
        // Complete Task Button
        const completeTaskBtn = document.createElement('button');
        completeTaskBtn.innerText = "Complete Task";
        completeTaskBtn.onclick = () => {
            project.tasks.splice(taskIndex, 1); // Remove task from array
            renderTasks(projectDiv, project); // Re-render tasks after completion
        };

        const commentInput = document.createElement('input');
        commentInput.placeholder = "Enter comment";
        const addCommentBtn = document.createElement('button');
        addCommentBtn.innerText = "Add Comment";
        addCommentBtn.onclick = () => {
            const comment = commentInput.value;
            if (comment) {
                task.comments.push(comment);
                renderComments(taskDiv, task);
                commentInput.value = '';
            }
        };
        
        taskDiv.appendChild(completeTaskBtn);
        taskDiv.appendChild(commentInput);
        taskDiv.appendChild(addCommentBtn);
        renderComments(taskDiv, task);
        tasksDiv.appendChild(taskDiv);
    });

    projectDiv.appendChild(tasksDiv);
}

function renderComments(taskDiv, task) {
    const commentsDiv = document.createElement('div');
    task.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerText = comment;
        commentsDiv.appendChild(commentDiv);
    });
    taskDiv.appendChild(commentsDiv);
}
