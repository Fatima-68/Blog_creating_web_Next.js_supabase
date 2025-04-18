"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase' ;

const formSchema = z.object({
  Title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 characters"),
  Description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
})

function AddBlogForm({ onBlogAdded, onClose = () => {} }) { // Now, if onClose is missing, it won't cause errors
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { Title: "", Description: "" },
  })

  async function onSubmit(values) {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .insert([{ Title: values.Title, Description: values.Description }])

      if (error) {
        console.error("Supabase Insert Error:", error)
        alert(`Something went wrong: ${error.message}`)
        return
      }

      alert("Blog Created Successfully!")
      console.log("Inserted Data:", data)
      
      if (onBlogAdded && data) onBlogAdded(data[0])  // Immediately update the blog list on the page

      form.reset();  // Reset the form fields after submission
      onClose();     // Close the modal after successful submission

    } catch (err) {
      console.error("Unexpected Error:", err)
      alert(`Unexpected Error: ${err.message}`)
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AddBlogForm
