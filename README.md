# School Management App

A full-stack web application for managing students, courses, and enrollments built with  **React**  and  **Supabase API**.

This project was created as a technical task and demonstrates CRUD operations, frontend validation, and integration with a backend service using Supabase.

----------

## 🚀 Technologies

-   **React**  – Frontend UI library
    
-   **Supabase**  – Backend as a Service (Database + API)
    
-   **JavaScript / JSX**  – App logic
    

----------

## 🧠 Features

✔ View, create, edit, and delete students  
✔ View, create, edit, and delete courses  
✔ Enroll students in courses  
✔ Prevent enrolling in courses with the same start time  
✔ All operations use Supabase API  
✔ No custom backend — pure frontend + Supabase

----------

## 🗂️ Project Structure

`/src
  /components – UI components
  /pages      – Main pages (Students, Courses, Enrollments)
  /lib        – Supabase client setup
  /services   – API interaction
  /types      – Type definitions` 

----------

## ⚙️ Getting Started

### 1. Install dependencies

`npm install` 

### 2. Create Supabase project

1.  Sign up at  [https://supabase.com](https://supabase.com/)
    
2.  Create a new project
    
3.  Create tables:  `students`,  `courses`,  `enrollments`
    

### 3. Configure environment

Put keys in file: ConnectData

`VITE_SUPABASE_URL=your_supabase_url VITE_SUPABASE_KEY=your_supabase_key` 

Add  `.env`  to  `.gitignore`


----------

## 🧪 Running the App

Start the dev server:

`npm run dev` 

Open in browser:

`http://localhost:5173` 

----------

## 📌 Validation Rules

✔ Students must have first name, last name, and age  
✔ Courses must have title, start time, and description  
✔ Course title must be unique  
✔ A student cannot be enrolled in two courses with the same start time


