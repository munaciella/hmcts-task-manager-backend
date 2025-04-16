# HMCTS Task Manager – Backend

This is the backend API for the HMCTS Task Manager application, built as part of a technical test. The API allows caseworkers to create, view, update, and delete tasks.

## 📦 Tech Stack

- Node.js
- Express
- PostgreSQL
- Jest & Supertest (Testing)
- dotenv (Environment variables)
- pg (PostgreSQL client)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/munaciella/hmcts-task-manager-backend.git
cd hmcts-task-manager-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
DATABASE_URL=postgresql://youruser:yourpassword@localhost:5432/hmcts_tasks
```

> Replace `youruser`, `yourpassword`, and database name with your actual PostgreSQL config.

### 4. Create the Database

If using `psql` or pgAdmin, run the following SQL to create the `tasks` table:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'todo',
  due_date TIMESTAMP
);
```

### 5. Start the Development Server

```bash
npm run dev
```

---

## 🧪 Running Tests

Run all Jest unit tests:

```bash
npm test
```

Tests cover:
- Creating a task
- Validation (title & description)
- Getting all tasks
- Getting a task by ID
- Updating a task’s status
- Deleting a task
- Handling non-existent IDs

---

## 📚 API Endpoints

All responses are in JSON format.

| Method | Endpoint        | Description                |
|--------|------------------|----------------------------|
| POST   | `/tasks`         | Create a new task          |
| GET    | `/tasks`         | Get all tasks              |
| GET    | `/tasks/:id`     | Get a task by ID           |
| PATCH  | `/tasks/:id`     | Update task status         |
| DELETE | `/tasks/:id`     | Delete a task              |

---

## 📝 Example Task Object

```json
{
  "id": 1,
  "title": "Write README",
  "description": "Complete the backend README file",
  "status": "todo",
  "due_date": "2025-04-20T12:00:00Z"
}
```

---

## 📁 Folder Structure

```
.
├── controllers/        # Route handlers
├── routes/             # API routes
├── models/             # Database queries
├── db/                 # PostgreSQL connection setup
├── tests/              # Jest/Supertest tests
├── .env                # Environment variables
├── app.js              # Express app
├── server.js           # Starts the server
├── jest.config.js      # Jest config
└── README.md
```

---

## 📌 Deployment (Optional)

You can deploy this backend on [Render](https://render.com/) or any platform that supports Node.js + PostgreSQL.

- Add `PORT` and `DATABASE_URL` as environment variables
- Use `npm start` as the start command
