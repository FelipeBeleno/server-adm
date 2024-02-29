import { Injectable } from '@nestjs/common';
import configuration from 'config/configuration';


import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



@Injectable()
export class FirestoreService {

    private readonly firebaseConfig = {
        apiKey: configuration().apiKey,
        authDomain: configuration().authDomain,
        projectId: configuration().projectId,
        storageBucket: configuration().storageBucket,
        messagingSenderId: configuration().messagingSenderId,
        appId: configuration().appId,
        measurementId: configuration().measurementId,
    }

    private app;
    private storage;


    constructor() {

        this.getStatedFireBase()
    }


    getStatedFireBase() {
        this.app = initializeApp(this.firebaseConfig);
        this.storage = getStorage(this.app);
    }

    async uploadImage(fileName: string, file: Buffer, path: string = "products") {

        const imageRef = ref(this.storage, `${path}/${fileName}`);

        const response = await uploadBytes(imageRef, file);

        return response
    }


    async getImageUrl(fileName: string, path: string = "products"): Promise<string> {
        const imageRef = ref(this.storage, `${path}/${fileName}`);
        const imageUrl = await getDownloadURL(imageRef);
        return imageUrl;
    }

}
