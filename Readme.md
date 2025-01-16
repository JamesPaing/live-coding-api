# Express Backend with Authentication, Task API, and Migration

An Express backend built with TypeScript that provides authentication, a task management API, and a migration API to populate the database with initial data.

## Features

### 1. **Authentication**

-   **/auth/register**: Register a new user.
-   **/auth/login**: Login to receive an Access Token and Refresh Token.

**Authentication Flow**:

-   Access Token (short-lived) is used for secure API access.
-   Refresh Token (long-lived) is used to obtain a new Access Token when expired.

**Middlewares**:

-   `serializeUser`: Serialize user data.
-   `requireUser`: Enforce authentication.

### 2. **Task API**

-   **/api/tasks**: Get all tasks.
-   **/api/tasks?status=pending&priority=low**: Filter tasks by status and priority.

### 3. **Migration API**

-   **/migrate**: Populate the database with fake initial data (tasks, users).

## Setup & Usage

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Run In Development Mode

```bash
npm run dev
# and
npm run watch
```
