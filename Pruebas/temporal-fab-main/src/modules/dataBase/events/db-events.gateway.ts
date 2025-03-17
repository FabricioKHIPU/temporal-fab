import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RedisService } from '../../redis/redis.service';
import { Server } from 'socket.io';
import { PubSub } from 'graphql-subscriptions';

@WebSocketGateway()
export class DbEventsGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    // Se crea un PubSub para reutilizarlo en GraphQL (idealmente debería compartirse)
    private pubSub: PubSub = new PubSub();

    constructor(private readonly redisService: RedisService) { }

    async onModuleInit() {
        // Duplica la conexión para usarla en modo suscriptor
        const subscriber = this.redisService.getClient().duplicate();

        // Suscribirse a ambos canales de cambios
        subscriber.subscribe('mysql:changes', 'postgres:changes', (err, count) => {
            if (err) {
                console.error('Error subscribing to channels:', err);
            } else {
                console.log(`Subscribed to ${count} channel(s): mysql:changes, postgres:changes`);
            }
        });

        // Cuando se recibe un mensaje, emitirlo vía WebSocket y publicarlo en el PubSub
        subscriber.on('message', (channel, message) => {
            console.log(`Received message from ${channel}: ${message}`);

            // Emitir a todos los clientes conectados vía WebSocket
            this.server.emit('dbChange', { channel, message });

            // Publicar para GraphQL subscriptions (por ejemplo, la suscripción "dbChange" en GraphQL)
            this.pubSub.publish('dbChange', { dbChange: { channel, message } });
        });
    }
}
