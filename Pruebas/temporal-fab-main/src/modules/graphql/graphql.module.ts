import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MessagesResolver } from './messages.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // Configuración para habilitar Subscriptions con graphql-ws
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [MessagesResolver],// ejemplo de resolver
  exports: [GraphQLModule],
})
export class GraphqlModule {}
