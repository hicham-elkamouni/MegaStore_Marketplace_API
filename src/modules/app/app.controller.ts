import { Controller, Get, Param, Req, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as fs from 'fs';
import { join } from 'path';
import { FirebaseService } from '../firebase/firebase.service';


@Controller('media')
export class MediaController {
    constructor(private firebaseService: FirebaseService) { }
    @Get(':key')
    async getFile(@Param() params, @Res() res) {
        (await this.firebaseService.getFileStreamFirebase(params.key))
            .on("error", () => {
                return res.json({ error: 'smtng went bad' })
            })
            .pipe(res);
    }
}