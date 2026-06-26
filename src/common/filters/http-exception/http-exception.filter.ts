// Importa interfaces e decorators do NestJS para lidar com exceções HTTP
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

// Importa tipos do Express para tipar request e response
import { Request, Response } from 'express';

// Define que esse filtro vai capturar exceções do tipo HttpException
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {

  // Método obrigatório da interface ExceptionFilter
  catch(exception: T, host: ArgumentsHost) {
    // Obtém o contexto da requisição HTTP
    const ctx = host.switchToHttp();
    
    // Recupera o objeto de resposta (response)
    const response = ctx.getResponse<Response>();
    
    // Recupera o objeto da requisição (request)
    const request = ctx.getRequest<Request>();

    // Obtém o status HTTP da exceção (ex: 404, 400, 500)
    const status = exception.getStatus();
        
    // Obtém o conteúdo da resposta da exceção
    // Pode ser uma string ou um objeto
    const exceptionResponse = exception.getResponse();
    
    // Aqui há uma verificação do tipo da resposta
    // Se for string, cria um objeto com a mensagem
    // Caso contrário, usa o objeto retornado pela exceção
    // OBS: aqui existe um pequeno erro lógico (ver explicação abaixo)
    const error = typeof exceptionResponse === 'string'
    ? { message: exceptionResponse }
    : (exceptionResponse as object);

    console.log({...error})
    
    // Retorna a resposta personalizada para o cliente
    response.status(status).json({
      ...error, // espalha os dados do erro
      statusCode: status, // código HTTP
      timestamp: new Date().toISOString(), // data/hora da resposta
      path: request.url, // URL da requisição
    });
  }
}
