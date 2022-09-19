import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ERole } from '../interfaces/roles.enum';
import { AuthUserGuard } from '../guards/auth.guard';

export const Auth = ( ...roles: ERole[] ) => applyDecorators(
    UseGuards( AuthGuard(), AuthUserGuard ),
    SetMetadata('roles', roles)
);