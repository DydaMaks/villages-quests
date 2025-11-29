import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Villages Quests API',
      version: '2.0.0',
      description: 'API для квест-платформи у селах України',
      contact: {
        name: 'API Support',
        email: 'support@villages-quests.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Унікальний ідентифікатор користувача'
            },
            username: {
              type: 'string',
              description: 'Ім\'я користувача'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email користувача'
            },
            role: {
              type: 'string',
              enum: ['user', 'organizer'],
              description: 'Роль користувача'
            },
            avatar: {
              type: 'string',
              description: 'URL аватара'
            }
          }
        },
        Quest: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Унікальний ідентифікатор квесту'
            },
            title: {
              type: 'string',
              description: 'Назва квесту'
            },
            description: {
              type: 'string',
              description: 'Опис квесту'
            },
            location: {
              type: 'string',
              description: 'Локація квесту'
            },
            difficulty: {
              type: 'string',
              enum: ['easy', 'medium', 'hard'],
              description: 'Складність квесту'
            },
            price: {
              type: 'number',
              description: 'Ціна квесту в гривнях'
            },
            duration: {
              type: 'number',
              description: 'Тривалість квесту в хвилинах'
            },
            maxParticipants: {
              type: 'number',
              description: 'Максимальна кількість учасників'
            }
          }
        }
      }
    },
  },
  apis: ['./src/routes/*.js'], // шлях до файлів з API
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };