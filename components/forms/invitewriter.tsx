'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useToast } from "../ui/use-toast"
import { useState } from "react"
import { Input } from "../ui/input"
import { inviteWriterFormSchema } from "@/prisma/schema"

const InviteWriter = () => {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof inviteWriterFormSchema>>()
    const onFormSubmit = async (data: z.infer<typeof inviteWriterFormSchema>) => {

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-teal-500 hover:bg-teal-700">Invite a Writer</Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-gray-600">
                <DialogHeader className="flex flex-col !justify-center !text-center">
                    <DialogTitle className="text-gray-300 mb-2">Invite a Writer</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4" >
                        <FormField control={form.control} name='email' render={() => (
                            <FormItem>
                                <FormLabel className="text-right text-gray-300 mb-2" >Email</FormLabel>
                                <FormControl >
                                    <Input className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full" />
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className="flex !justify-center text-center ">
                            <Button type="submit" className="text-gray-300 border-gray-600" variant='outline'>Invite Writer</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


export default InviteWriter