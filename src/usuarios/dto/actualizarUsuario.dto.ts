import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './crear-usuario.dto';

export class ActualizarUsuarioDto extends PartialType(CreateUsuarioDto) {}
