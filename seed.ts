import { AppDataSource } from './ormconfig';
import { Rol } from './src/usuarios/entities/rol.entity';
import { Usuario } from './src/usuarios/entities/usuario.entity';
import { RolUsuario } from './src/usuarios/entities/rolUsuario.entity';

export async function runSeed() {
  // Evitar ejecutar seed duplicado
  const count = await AppDataSource.getRepository(Rol).count();
  if (count > 0) {
    console.log('Seed omitido (ya existen registros)');
    return;
  }

  const rolRepo = AppDataSource.getRepository(Rol);
  const usuarioRepo = AppDataSource.getRepository(Usuario);
  const rolUsuarioRepo = AppDataSource.getRepository(RolUsuario);

  // Roles
  const roles = await rolRepo.save([
    { nombre: 'Admin', descripcion: 'Rol de administrador' },
    { nombre: 'Cliente', descripcion: 'Rol de cliente' },
  ]);

  // Usuarios
  const usuarios = await usuarioRepo.save([
    {
      nombre: 'Juan',
      apellido_paterno: 'Pérez',
      apellido_materno: 'Gómez',
      correo: 'juan.perez@example.com',
      contraseña: '123456',
    },
    {
      nombre: 'María',
      apellido_paterno: 'López',
      apellido_materno: 'Ramírez',
      correo: 'maria.lopez@example.com',
      contraseña: '123456',
    },
  ]);

  // Roles → Usuarios
  await rolUsuarioRepo.save([
    { usuario: usuarios[0], rol: roles[0] },
    { usuario: usuarios[1], rol: roles[1] },
  ]);

  console.log('Seed ejecutado correctamente ✔');
}
