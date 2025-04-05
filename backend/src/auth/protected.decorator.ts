import { Reflector } from '@nestjs/core';

export const Protected = Reflector.createDecorator<{ requireAdmin: true }>();

