import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/configuration.service";
import { initializeApp } from 'firebase/app';
import { getStorage, getStream, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) { }
  private firebaseConfig = {
    apiKey: this.configService.firebaseApiKey,
    authDomain: this.configService.firebaseAuthDomain,
    projectId: this.configService.firebaseProjectId,
    storageBucket: this.configService.firebaseStorageBucket,
    messagingSenderId: this.configService.firebaseMessaginSender,
    appId: this.configService.firebaseAppId,
  };
  private app = initializeApp(this.firebaseConfig);

  async uploadToFirebase(file) {
    let { createReadStream, mimetype, filename, encoding } = await file;
    const storage = getStorage(this.app);
    let fileName = filename.split(" ").join("");
    const myfile = await createReadStream();
    const uniqueSuffix = `${uuid()}-${fileName}`;
    let Key = null;

    await new Promise((resolve, reject) => {
      const chunks = [];
      myfile.on("data", async (chunk) => {
        chunks.push(chunk);
      });
      myfile.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const imagesRef = ref(storage, `/megastore/${uniqueSuffix}`);
        imagesRef;
        const done = await uploadBytes(imagesRef, buffer, {
          contentType: mimetype,
        });
        resolve((Key = done));
      });
      myfile.on("error", reject);
    });
    
    return uniqueSuffix
    
  }
  async getFileStreamFirebase(fileKey) {
    const storage = getStorage(this.app);
    const imagesRef = ref(storage, `/megastore/${fileKey}`);
    const file=await getStream(imagesRef);
    return file
    
  };
}