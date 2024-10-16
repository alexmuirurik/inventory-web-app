import React, { Dispatch, SetStateAction, useState } from 'react'
import Avatar from 'react-avatar-edit'

export const Imageweploader = ({ setPreview, preview, width, height }: {setPreview: Dispatch<SetStateAction<string>>, preview: string, width: number, height: number }) => {
    const [src, setSrc] = useState('')
    const onCrop = (view: any) => setPreview(view)
    const onClose = (view: any) => setPreview(view)

    return <Avatar width={width} height={height} onCrop={onCrop} onClose={() => onClose} exportSize={80} src={src} />
}
