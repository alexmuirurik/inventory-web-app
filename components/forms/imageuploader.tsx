/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ImagePlus } from "lucide-react";
import { productSchema } from "@/prisma/schema";

const ImageUploader = ({ form }: {form: UseFormReturn<z.infer<typeof productSchema>>}) => {
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.clearErrors("image");
            } catch (error) {
                setPreview(null);
                form.resetField("image");
            }
        },
        [form],
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 1000000,
        accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

    return (
        <FormField control={form.control} name="image"
            render={() => (
                <FormItem className="w-full">
                    <FormLabel className={`${fileRejections.length !== 0 ? "text-destructive" : 'text-teal-500'}`}>
                        Image
                    </FormLabel>
                    <FormControl>
                        <div {...getRootProps()} className="flex cursor-pointer items-center rounded-md border border-gray-500 gap-2 w-full p-2.5" >
                            {preview
                                ? <>
                                    <img src={preview as string} alt="Uploaded image" className="h-4 rounded-sm" />
                                    <p className="text-sm text-gray-200">Upload Image</p>
                                </>
                                : <>
                                    <p className="text-sm text-gray-400">Select Image</p>
                                    <ImagePlus className={`h-4 ${preview ? "hidden" : "block"}`} />
                                </>
                            }
                            <Input {...getInputProps()} type="file" />
                        </div>
                    </FormControl>
                    <FormMessage>
                        {fileRejections.length !== 0 && ('Image must be less than 1MB and of type png, jpg, or jpeg')}
                    </FormMessage>
                </FormItem>
            )}
        />
    );
};

export default ImageUploader