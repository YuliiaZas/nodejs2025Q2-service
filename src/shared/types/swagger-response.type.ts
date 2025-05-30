import { Type } from '@nestjs/common';

export type SwaggerResponseType = string | Type<unknown> | [Type<unknown>];
