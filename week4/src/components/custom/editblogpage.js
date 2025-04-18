"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  Title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 characters"),
  Description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
})

function EditBlogPage({ blog, onUpdate, onClose }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { Title: blog.Title, Description: blog.Description },
  })

  const onSubmit = (values) => {
    const updatedBlog = { ...blog, Title: values.Title, Description: values.Description }
    onUpdate(updatedBlog)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-lg font-bold mb-4">Edit Blog</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} />
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
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditBlogPage
