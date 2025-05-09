import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './security/roles/roles.guard';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new ConsoleLogger({
    json: true,
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Tenants API')
    .setDescription(
      'The tenants api provide tenants and licences management throught the system.',
    )
    .setVersion(process.env.npm_package_version || '1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  app.listen(process.env.PORT ?? 3000).then(() => {
    logger.log(`Listening on port ${process.env.APP_PORT || 5000}`);
    logger.log('Swagger UI available at /api-docs');
  });
}

bootstrap().then();
