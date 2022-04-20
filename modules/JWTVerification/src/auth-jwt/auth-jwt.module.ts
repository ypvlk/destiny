import { isArray } from 'lodash';
import { DynamicModule, Inject, MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtStrategy } from './auth-jwt.strategy';
import { JWTMiddleware } from './auth-jwt.middleware';

interface JwtOptions {
    exludeUrls: string[];
    key?: string;
}
@Module({
    providers: [JwtStrategy]
})
export class AuthJwtModule {
    constructor(@Inject('CONFIG_OPTIONS') private options: JwtOptions) { }

    static forRoot(options: JwtOptions): DynamicModule {
        return {
            module: AuthJwtModule,
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options
                }
            ]
        };
    }

    configure(consumer: MiddlewareConsumer) {
        const { exludeUrls } = this.options;
        if (exludeUrls && isArray(exludeUrls) && exludeUrls.length) {
            consumer
                .apply(JWTMiddleware.forRoot(this.options.key))
                .exclude(...exludeUrls)
                .forRoutes('/');
        } else {
            consumer.apply(JWTMiddleware.forRoot(this.options.key)).forRoutes('/');
        }
    }
}
