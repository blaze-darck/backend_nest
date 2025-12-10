import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IdiomaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Obtener idioma de diferentes fuentes (en orden de prioridad)
    let idioma =
      request.headers['x-app-language'] || // Header personalizado de la app
      request.headers['accept-language']?.split(',')[0]?.split('-')[0] || // Accept-Language del navegador
      request.user?.idioma || // Del token JWT si está autenticado
      'es'; // Idioma por defecto

    // Validar que sea un idioma soportado
    const idiomasSoportados = ['es', 'en', 'ay'];
    if (!idiomasSoportados.includes(idioma)) {
      idioma = 'es';
    }

    // Agregar el idioma al request para que esté disponible en controllers/services
    request.idioma = idioma;

    return next.handle();
  }
}
