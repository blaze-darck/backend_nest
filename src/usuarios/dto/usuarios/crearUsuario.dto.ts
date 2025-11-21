import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombreUsuario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()
  apellidoMaterno: string;

  @IsString()
  ci: string;

  @IsString()
  telefono: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  rolesIds?: number[];
}
