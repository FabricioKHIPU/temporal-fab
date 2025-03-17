import { Resolver, Query, Subscription, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver()
export class MessagesResolver {
  private messageList: string[] = [];

  @Query(() => [String], { description: 'Obtiene la lista de mensajes' })
  messages(): string[] {
    return this.messageList;
  }

  @Query(() => String, { description: 'Agrega un mensaje y lo publica en tiempo real' })
  addMessage(@Args('content') content: string): string {
    this.messageList.push(content);
    pubSub.publish('messageAdded', { messageAdded: content });
    return content;
  }
    
  @Subscription(() => String, { description: 'Suscripción para recibir nuevos mensajes' })
  messageAdded() {
  }
}
