# **📝 Task Management API**

## User Routes

* POST /users/register - Register (username/password).
* POST /users/login - Login (username/password).
* PUT /users/update-profile - Update user's profile.
* POST /users/delete-account - Delete account.

## Task Routes
* GET /task/all-tasks?filter=<all|done|undone> - Get tasks for the logged-in user.
* POST /task/create-task - Create a new task.
* PUT /task/edit-task/:id - Edit a task.
* PUT /task/done-task/:id - Toggle task completion status.
* DELETE /task/delete-task/:id - Delete a task.