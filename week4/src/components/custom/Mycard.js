import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import AddBlogForm from "@/components/custom/addblogpage"
  
function Mycard() {
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button> Add Blog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add blog</DialogTitle>
      <DialogDescription> </DialogDescription>
    </DialogHeader>
    <AddBlogForm/>
  </DialogContent>
</Dialog>

  )
}

export default Mycard
