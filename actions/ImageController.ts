import path from "path";
import { writeFile } from "fs/promises"; 

export const uploadImage = async (file: any) => {
    try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = file.name.replaceAll(" ", "_")
        await writeFile( path.join(process.cwd(), "public/uploads/" + filename), buffer)
        return filename
    } catch (error) {
        return '/assets/img/Ellipse.png'
    }    
}