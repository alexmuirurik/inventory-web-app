'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useToast } from "../ui/use-toast"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { Input } from "../ui/input"
import { taskFormSchema } from "@/prisma/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Company, Folder } from "@prisma/client"
import { LoadingButton } from "../ui/loadingbtn"
import { createTask } from "@/actions/taskController"
import { useRouter } from "next/navigation"


const AddTask = ({ company, folder }: { company: Company, folder?: Folder }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            companyId: company.id,
            folderId: folder?.id
        }
    })
    const onFormSubmit = async (data: z.infer<typeof taskFormSchema>) => {
        setLoading(true)
        const createtask = await createTask(data)
        if (createtask) {
            toast({
                title: 'Task Created',
                description: 'Task Created Successfully. Happy writing!',
                variant: 'success'
            })
            router.refresh()
            setOpen(false)
        }

        return setLoading(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-teal-500 hover:bg-teal-700">Add a Task</Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-gray-600">
                <DialogHeader className="flex flex-col !justify-center !text-center">
                    <DialogTitle className="text-gray-300 mb-2">Add a Task</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4 w-full" >
                        <div className="flex gap-4 w-full">
                            <FormField control={form.control} name='title' render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-right text-gray-300 mb-2" >Title</FormLabel>
                                    <FormControl >
                                        <Input className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='wordcount' render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-right text-gray-300 mb-2" >WordCount</FormLabel>
                                    <FormControl >
                                        <Input type='number' min={500} max={10000} step={100}  {...field}
                                            className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full" />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name='instructions' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-right text-gray-300 mb-2" >Description</FormLabel>
                                <FormControl >
                                    <Textarea rows={10} className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <div className="flex gap-4">
                            <FormField control={form.control} name='deadline' render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-right text-gray-300 w-full mb-2" >Deadline</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full">
                                                <SelectValue placeholder="Assign Deadline after writer takes task" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-neutral-800 border-gray-600 text-gray-300">
                                            <SelectItem value="1">1 Day</SelectItem>
                                            <SelectItem value="2">2 Days</SelectItem>
                                            <SelectItem value="3">3 Days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='folderId' render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-right text-gray-300 w-full mb-2" >Folder</FormLabel>
                                    <FormControl >
                                        <Input className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full" defaultValue={folder?.title} readOnly />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>

                        <div className="flex !justify-center text-center ">
                            <LoadingButton loading={loading} type="submit" className="text-gray-300 border-gray-600" variant='outline'>
                                Add Task
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


export default AddTask