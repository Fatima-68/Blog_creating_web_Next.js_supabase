"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditBlogPage from "@/components/custom/editblogpage";
import DeleteBlogDialog from "@/components/custom/deleteblogitem";
import Mycard from "@/components/custom/Mycard";
import AddBlogForm from "@/components/custom/addblogpage";
import { supabase } from "@/lib/supabase";

function AddBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
    getData();
  }, []);

  // Fetch blogs from Supabase
  const getData = async () => {
    try {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) {
        alert("Something went wrong");
        console.error("Supabase Fetch Error:", error);
      } else {
        setBlogs(data || []);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  // Function to update a blog
  const handleUpdate = async (updatedBlog) => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .update({
          Title: updatedBlog.Title,
          Description: updatedBlog.Description,
        })
        .eq("id", updatedBlog.id)
        .select();
  
      if (error) {
        console.error("Supabase Update Error:", error);
        return;
      }
  
      if (data && data.length > 0) {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === updatedBlog.id ? data[0] : blog
        );
        setBlogs(updatedBlogs);
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
        console.log("Blog Updated Successfully");
      }
    } catch (err) {
      console.error("Unexpected Error during Update:", err);
    }
  };
  
  // Function to delete a blog
  const handleDelete = async (blogId) => {
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", blogId);

      if (error) {
        console.error("Supabase Delete Error:", error);
        return;
      }

      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
      setDeletingBlog(null);
      console.log("Blog Deleted Successfully");
    } catch (err) {
      console.error("Unexpected Error during Deletion:", err);
    }
  };

  // Function to handle new blog addition
  const handleBlogAdded = (newBlog) => {
    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setShowAddBlogForm(false); // Close the form after successful addition
  };

  return (
    <div className="min-h-screen p-10">
      <Mycard />

      <div className="grid grid-cols-4 gap-4 mt-5">
        {blogs.map((blog, index) => (
          <div
            key={blog.id || index}
            className="bg-white p-5 rounded-lg shadow"
          >
            <h2 className="font-bold">{blog.Title}</h2>
            <p>{blog.Description}</p>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" onClick={() => setEditingBlog(blog)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => setDeletingBlog(blog)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {editingBlog && (
        <EditBlogPage
          blog={editingBlog}
          onUpdate={handleUpdate}
          onClose={() => setEditingBlog(null)}
        />
      )}

      {deletingBlog && (
        <DeleteBlogDialog
          blog={deletingBlog}
          onDelete={() => handleDelete(deletingBlog.id)}
          onClose={() => setDeletingBlog(null)}
        />
      )}

      {showAddBlogForm && (
        <AddBlogForm
          onBlogAdded={handleBlogAdded}
          onClose={() => setShowAddBlogForm(false)}
        />
      )}
    </div>
  );
}

export default AddBlogPage;
