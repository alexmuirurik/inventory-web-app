'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useToast } from "../ui/use-toast"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { Input } from "../ui/input"
import { companyFormSchema } from "@/prisma/schema"
import { LoadingButton } from "../ui/loadingbtn"
import { createCompany } from "@/actions/companyController"
import { User } from "next-auth"
import { Company } from "@prisma/client"

const CreateCompany = ({ user, company}: { user: User | undefined, company?: Company | null}) => {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof companyFormSchema>>({
        resolver: zodResolver(companyFormSchema),
        defaultValues: { 
            userId: user?.id as string 
        }
    })
    const onFormSubmit = async (data: z.infer<typeof companyFormSchema>) => {
        setLoading(true)
        const createcompany = await createCompany(data)
        if(createcompany) {
            toast({
                title: 'Update Successfull',
                description: 'We\'ve successfully updated your company details',
                variant: 'success'
            })
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4" >
                <div className="flex gap-4">
                    <FormField control={form.control} name='title' render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel className="" >Company Name</FormLabel>
                            <FormControl >
                                <Input className=" border-teal-600 w-full" {...field} defaultValue={company?.title} />
                            </FormControl>
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='location' render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel className="" >Company Location</FormLabel>
                            <FormControl >
                                <Input className=" border-teal-600 w-full" {...field} defaultValue={company?.location} />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>

                <div className="flex gap-4">
                    <FormField control={form.control} name='location' render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel className="" >Website</FormLabel>
                            <FormControl >
                                <Input className=" border-teal-600 w-full" {...field} defaultValue={company?.location} />
                            </FormControl>
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='payperword' render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel className="" >Pay Per Word</FormLabel>
                            <FormControl >
                                <Input type='number'className=" border-teal-600 w-full" min={0.01} max={0.2} step={0.01} 
                                defaultValue={String(company?.payperword)} {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name='description' render={({field}) => (
                    <FormItem>
                        <FormLabel className="" >Description</FormLabel>
                        <FormControl >
                            <Textarea className=" border-teal-600 w-full" {...field} defaultValue={company?.description} />
                        </FormControl>
                    </FormItem>
                )} />
                <div className="flex !justify-end ">
                    <LoadingButton loading={loading} type="submit" className=" border-teal-600 text-teal-600" variant='outline'>
                        Update Company
                    </LoadingButton>
                </div>
            </form>
        </Form>
    )
}


export default CreateCompany