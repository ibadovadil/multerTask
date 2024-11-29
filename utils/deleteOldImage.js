import fs from 'fs';
import path from 'path';

export function deleteSingleOldImage(imagePath) {
    const fullImagePath = path.join(imagePath);
    fs.unlink(fullImagePath, (error) => {
        if (error) {
            console.log("Something is wrong");
        } else {
            console.log('Image deleted successfully');
        }
    })
}

export function deleteManyOldImage(imagePath) {
    imagePath.map(item => {
        const fullImagePath = path.join(item);
        fs.unlink(fullImagePath, (error) => {
            if (error) {
                console.log("Something is wrong");
            } else {
                console.log('Images deleted successfully');
            }
        })
    })
}