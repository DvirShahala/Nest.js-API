import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT } from './constants/index';
import { databaseConfig } from './database.config';
import { User } from '../../users/user.entity';
import { Post } from '../../posts/post.entity';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            config = databaseConfig.development;
            const sequelize = new Sequelize(config);
            sequelize.addModels([User, Post]);
            await sequelize.sync();
            return sequelize;
        },
    },
];