import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
    envFilePath: `.development.env`,
    isGlobal: true,
})

const configService = new ConfigService()


export default () => ({
    port: configService.get('PORT'),
    db_path: configService.get('DB_PATH'),
    apiKey: configService.get('apiKey'),
    authDomain: configService.get('authDomain'),
    projectId: configService.get('projectId'),
    storageBucket: configService.get('storageBucket'),
    messagingSenderId: configService.get('messagingSenderId'),
    appId: configService.get('appId'),
    measurementId: configService.get('measurementId'),
    secretConstant: configService.get('secretConstant')
});