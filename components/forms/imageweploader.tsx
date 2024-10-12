import React, { Dispatch, SetStateAction, useState } from 'react'
import Avatar from 'react-avatar-edit'

export const Imageweploader = ({ setPreview, preview }: {setPreview: Dispatch<SetStateAction<string>>, preview: string }) => {
    const [src, setSrc] = useState('')
    const onCrop = (view: any) => setPreview(view)
    const onClose = (view: any) => setPreview(view)

    return <Avatar width={400} height={300} onCrop={onCrop} onClose={() => onClose} exportSize={80} src={src} />
}
