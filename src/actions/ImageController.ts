import path from "path";
import { writeFile } from "fs/promises"; 

export const uploadImage = async (file: any) => {
    try {
        const filename = file.name.replaceAll(" ", "_")
        return filename
    } catch (error) {
        return '/assets/img/Ellipse.png'
    }    
}