# IssueFlow

A lightweight issue tracker built with React and Node.js for managing project tasks efficiently.

### Introduction

IssueFlow is a minimal issue tracking system designed to help teams manage projects and their related tasks. Built as an MVP, it allows users to create projects, add issues, and track progress — all in a clean, focused UI.

🔗 [Live Demo](https://issueflow.vercel.app)

### Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, React Router
- **Backend:** Node.js, Express, UUID
- **Database:** MongoDB
- **Hosting:** Vercel (Frontend), Railway

### Features (MVP)

- User authentication
- Project creation & listing
- Issue creation and display per project
- Status tags, redirect handling
- Clean, theme-consistent UI

### ⚙️ Installation & Setup

- Getting Started

```bash
git clone https://github.com/zeenox-stackissuelow.git
cd issueflow
npm install
npm run dev
```

Make sure to update the **.env** folder with proper credentials.

## 📡 API Reference

### 🔹 Projects

| Method | Endpoint                            | Description        |
| ------ | ----------------------------------- | ------------------ |
| POST   | `/api/project/create`               | Create new project |
| GET    | `/api/project` + (`/get` or `/:id`) | Fetch project(s)   |
| PUT    | `/api/project/:id`                  | Update project     |
| DELETE | `/api/project/:id`                  | Delete project     |

### 🔸 Issues

| Method | Endpoint                                              | Description    |
| ------ | ----------------------------------------------------- | -------------- |
| POST   | `/api/project/:projectId/issues/create`               | Create issue   |
| GET    | `/api/project/:projectId/issues` + (`/get` or `/:id`) | Fetch issue(s) |
| PATCH  | `/api/project/:projectId/issues/:id`                  | Update issue   |
| DELETE | `/api/project/:projectId/issues/:id`                  | Delete issue   |

### Future Features

- [ ] Form based User login and more oAuth provider support
- [ ] Project sharing & collaborators
- [ ] Markdown support for issue description
- [ ] Toast messages for more safety

### Contributions

Contributions are welcome! Feel free to fork, open issues or submit PRs.

### License

Licensed under MIT License.
