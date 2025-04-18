![image](https://github.com/user-attachments/assets/1edfdf3c-fca6-49e5-87ae-eb376c5f2ee7)
![image](https://github.com/user-attachments/assets/c5a9b962-1129-496f-be68-71a6dccc4ff6)
![image](https://github.com/user-attachments/assets/59c7a5bf-4e6f-4e7b-8744-58bbd6eef81a)
![image](https://github.com/user-attachments/assets/f74cbc25-8ee3-4f41-9cde-cb74715ae9f2)
![image](https://github.com/user-attachments/assets/57a26a4b-11b4-49df-86f3-06345eee4303)
![image](https://github.com/user-attachments/assets/1fed5a5c-396c-4e8d-87fc-93f5a1acf647)
📝 **Blog Management Web**
This project is a modern blog management app built with the Next.js framework, designed to allow users to create, update, and delete blog posts in an elegant and user-friendly interface. It uses ShadCN UI components for beautifully styled forms and modals, and is fully connected to a Supabase database for real-time data persistence.

🔧 Tech Stack
Next.js (App Router) — Full-stack React framework

ShadCN/UI — Reusable and accessible component library based on Radix UI and Tailwind CSS

Supabase — Open source Firebase alternative for database + authentication

React Hook Form + Zod — For form validation and management

LocalStorage (optional) — Used for fallback or offline demo logic

✨ Features
✅ Add a Blog
Users can click the "Add Blog" button to open a dialog form. The title and description are validated and submitted, creating a new blog entry that gets:

Saved to Supabase

Instantly reflected in the UI

✏️ Edit a Blog

Users can edit existing blog posts through a modal dialog.

On submit, the blog is updated in Supabase and immediately shown on the UI.

🗑️ Delete a Blog

Users are prompted with a confirmation dialog before deletion.

Upon confirmation, the blog post is removed from Supabase and the UI is updated in real-time.

📡 Supabase Integration
Connected using Supabase’s JavaScript client.

All CRUD operations (Create, Read, Update, Delete) are handled through Supabase:

insert() → When adding a new blog

update() → When editing a blog

delete() → When confirming blog deletion

select() → To fetch and render all blogs on page load

The app uses useEffect() in Next.js to load blogs from Supabase when the page is opened or after any update.

📦 Database Table Structure (blogs)

Column Name	Type	Description
id	UUID	Primary Key (auto-generated)
Title	Text	Blog title
Description	Text	Blog description
created_at	Timestamptz	Timestamp when added
📍 Status
 Add, Edit, and Delete blog entries

 Supabase integration for real-time DB operations

 Responsive design using Tailwind & ShadCN
