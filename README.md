# Task Manager Project - Setup Guide

## Installation & Setup Steps

### 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/rezahtms/task-manager
```

### 2. Navigate to Project Directory

Move into the project folder:

```bash
cd task-manager
```

### 3. Install Dependencies

Install required dependencies using pnpm:

```bash
pnpm install
```

### 4. Run in Development Mode

Start the development server on port 3000:

```bash
npm run dev -- --port 3000
```

**OR** (depending on your project setup):

```bash
npm run dev
```

Then open: `http://localhost:3000`

## Additional Notes

- The development server will start on **port 3000** instead of 5173.
- The application will be available at `http://localhost:3000`.
- If port 3000 is already in use, you may need to use a different port or free up port 3000.
- To stop the server, press `Ctrl + C` in the terminal.

If you encounter any issues, ensure you have the latest versions of Node.js and pnpm installed.
