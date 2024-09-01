'use client'
import React, { useState } from 'react';
import { writeTaskFormSchema } from '@/prisma/schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loadingbtn';
import { Task } from '@prisma/client';
import { Editor } from '@tinymce/tinymce-react';
import { updateTask } from '@/actions/taskController';
import { useToast } from '../ui/use-toast';

const WriteTask = ({ task }: { task: Task }) => {
    const [newtask, setNewTask] = useState(task)
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const form = useForm<z.infer<typeof writeTaskFormSchema>>({ 
        resolver: zodResolver(writeTaskFormSchema), 
        defaultValues: {
            title: task.title,
            content:task.content ?? '',
            slug: task.slug
        }
    })
    const handleChange = (value: any) => form.setValue('content', value?.currentTarget?.innerHTML)
    const onFormSubmit = async (data: z.infer<typeof writeTaskFormSchema>) => {
        setLoading(true)
        const updatedtask = await updateTask(data)
        if(updatedtask) {
            setNewTask(updatedtask)
            toast({
                title: 'Task Updated',
                description: 'Task Updated Successfully. Your Progress is now safe', 
                variant: 'success'
            })
        }
        return setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4" >
                <FormField control={form.control} name='title' render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="" >Company Location</FormLabel>
                        <FormControl >
                            <Input className=" border-teal-600 w-full" defaultValue={newtask.title} {...field}  />
                        </FormControl>
                    </FormItem>
                )} />

                <FormField control={form.control} name='content' render={({ field }) => (
                    <FormItem>
                        <FormLabel className="" >Description</FormLabel>
                        <FormControl >
                            <Editor
                                apiKey='eqrwjtfxkiofu35juhr54uoexgkj1zjc2i81bth308k65mbb'
                                initialValue={newtask.content ?? "<p>This is the initial content of the editor.</p>"}
                                onInput={handleChange}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    branding: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat',
                                    content_style: 'body { font-family:mono; font-size:16px }'
                                }}
                            />
                        </FormControl>
                    </FormItem>
                )} />

                <div className="flex !justify-end ">
                    <LoadingButton loading={loading} type="submit" className=" border-teal-600 text-teal-600" variant='outline'>
                        Save Progress
                    </LoadingButton>
                </div>

            </form>
        </Form>
    );
}

export default WriteTask;
