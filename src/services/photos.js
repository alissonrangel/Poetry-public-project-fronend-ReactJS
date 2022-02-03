import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 as createId } from 'uuid';

export const getAll = async () => {
    let list = [];

    const imagesFolder = ref(storage, "poetry_images");
    const photoList = await listAll(imagesFolder);

    // for(let i in photoList.items) {
    //     let photoUrl = await getDownloadURL(photoList.items[i]);

    //     list.push({
    //         name: photoList.items[i].name,
    //         url: photoUrl
    //     });
    // }
    for (const it of photoList.items) {
      let photoUrl = await getDownloadURL(it);
        list.push({
            name: it.name,
            url: photoUrl
        });
    }

    return list;
}

export const insert = async (file) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `poetry_images/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return { name: upload.ref.name, url: photoUrl };
    } else {
        return new Error('Tipo de arquivo não permitido.');
    }
}

export const deleteFile = async (file) => {    

    var storageRef = ref(storage, file.url);

    // Create a reference to the file to delete
    let retorno = await deleteObject(storageRef)
            .then(() => {
                return true;
            }).catch((error) => {
                console.log('Error: ', error);
                return error;        
            });

    return retorno;
}