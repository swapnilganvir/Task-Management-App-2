<div id="readme-top" align="center">
  <h3 align="center">Task Management App</h3>
  <p align="center">
    <a href="https://task-management-app-frontend-2.onrender.com/">Demo</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#core-features">Core Features</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#conclusion">Conclusion</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
This project is a full-stack web application that allows users to manage their daily tasks efficiently. Users can create, edit, delete, and mark tasks as completed while ensuring a seamless user experience with authentication and database integration..

<b>Note: To use the demo please wait 1-2 minutes after opening the link, because the server gets down due to inactivity.</b>


<img width="800" src="https://github.com/user-attachments/assets/1bd9bce2-081b-42c5-a8a2-0ba5db58576f">
<img width="800" src="https://github.com/user-attachments/assets/2c0e4d8a-d3a8-4d37-883e-b6898aa6d616">
<img width="800" src="https://github.com/user-attachments/assets/4b08d1b0-713a-453b-a89a-e5fc54243f82">


<!-- Tech Stack -->
## Tech Stack
  * <b>Frontend</b>: React.js, React Router, Redux Toolkit, Material UI
  * <b>Backend</b>: Node.js, Express.js
  * <b>Database</b>: PostgreSQL with Neon database
  * <b>State Management</b>: React Context 
  * <b>Deployment</b>: Render
  * <b>Version Control</b>: Git and GitHub


<!-- Core Features -->
## Core Features
1. #### User Authentication
    * User registration and login.
    * Refresh token mechanism for persistent sessions.

2. #### Task Management
    * Add, update, and delete tasks.
    * Mark tasks as completed.
    * View a list of all tasks with sorting and filtering options.


<!-- API Endpoints -->
## API Endpoints
* `POST /api/user/register` – Registers user entry in the database.
* `POST /api/user/login` – Fetches user entry from the database.
* `POST /api/task/list` – Get list of all tasks for a user.
* `POST /api/task/add` – Adds a new task for a user.
* `POST /api/task/edit` – Edits a task of a user.
* `POST /api/task/remove` – Deletes a task of a user.


<!-- Database Schema -->
## Database Schema
#### Users Table 
* `id`- SERIAL PRIMARY KEY
* `name` - TEXT NOT NULL
* `email` - TEXT UNIQUE NOT NULL
* `password` - TEXT NOT NULL

#### Tasks Table 
* `id`- SERIAL PRIMARY KEY
* `title` - TEXT NOT NULL
* `description` - TEXT NOT NULL
* `priority` - INTEGER NOT NULL
* `status` - BOOLEAN NOT NULL
* `due_date` - TIMESTAMP NOT NULL
* `user_id` - INTEGER NOT NULL


<!-- Conclusion -->
## Conclusion
This project streamlines task organization with a user-friendly interface. Built with React.js, Node.js, Express.js, and PostgreSQL, it ensures secure authentication and efficient CRUD operations. Users can easily manage tasks while maintaining data integrity and scalability. Future enhancements like reminders and priority levels can further improve productivity.


<!-- CONTACT -->
## Contact
Swapnil Ganvir  - [@LinkedIn](https://www.linkedin.com/in/swapnilganvir) - swapnilganvir54@gmail.com

Project Link: https://github.com/swapnilganvir/Task-Management-App-2

Demo Link: [Demo](https://task-management-app-frontend-2.onrender.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
