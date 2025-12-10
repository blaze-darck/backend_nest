import { IsString, IsNotEmpty } from 'class-validator';

export class ActualizarTraduccionDto {
  @IsString()
  @IsNotEmpty()
  valor: string;
}
