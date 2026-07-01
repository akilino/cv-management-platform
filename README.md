# 🚀 React Vite Production Template

A production-ready, highly structured React placeholder boilerplate designed for rapid project spin-ups. Equipped with automated global styling tokens, modular isolated APIs, and containerized Docker layers.

---

## 🛠️ Folder Architecture Quick-Reference

* **`src/api/`** - Isolated axios instances (`clients/`) and feature endpoints (`services/`).
* **`src/components/`** - Global architectural design tokens. Modular CSS resides directly alongside its `.jsx` file.
* **`src/pages/`** - Centralized full-view layouts mapped directly to application routing targets.
* **`src/styles/`** - Global CSS resets and custom variables design tokens (`variables.css`).
* **`docker/`** - Isolated configurations managing local `dev` versus compiled multi-stage `prod` targets.

---

## 🚀 Getting Started

### Method A: Local Development (Bare Metal)
Ensure you have **Node.js (v20+)** installed locally.

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the Vite dev server**
    ```bash
    npm run dev
    ```
The application will launch locally at http://localhost:3000.

---

### Method B: Containerized Development (Docker Recommended)

Ensure you have **Docker** and **Docker Compose** installed.

1.	**Spin up the application bundle:**
    ```bash
    docker compose up --build
    ```
This initializes a container with structural hot-reloading mapped to your local changes. Access the application container at http://localhost:3000.

2. **Shut down the containers**
    ```bash
    docker compose down
    ```
---
## ⚙️ Environment Variables Config

Create a `.env` file inside the root directory when spinning up an instantiation of this template.

```env 
VITE_API_BASE_URL=[https://api.yourproductiondomain.com](https://api.yourproductiondomain.com)
````

## 📦 Bundling & Deployment
### Local Production Build

Compiles highly optimized assets into the static `/dist` distribution folder:

```bash
npm run build
```

### Production Docker Compilation

To test or deploy using the production-ready multi-stage Nginx configuration container:
```bash
docker build -t react-app-prod -f ./docker/prod.Dockerfile .
``` 

# 📝 Developer Notes Checklist

•	[ ] Change your application brand metadata in public/manifest.json and index.html.

•	[ ] Update the core structural CSS custom tokens located in src/styles/variables.css.

•	[ ] Setup React Router DOM routing blocks if multiple workspace page directories are required.

---
## 🏁 How to make this a template on GitHub

Now that all your code and documentation files are fully constructed locally, it's time to put it on GitHub!

1. **Create a brand new, empty repository on GitHub named something like `react-vite-template`.**
2. **Push your local workspace code up to that repository:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete boilerplate setup"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main