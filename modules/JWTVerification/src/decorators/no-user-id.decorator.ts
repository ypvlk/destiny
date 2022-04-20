import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const NoUserIdAccess = (): CustomDecorator<string> => SetMetadata('noUserIdAccess', true);
