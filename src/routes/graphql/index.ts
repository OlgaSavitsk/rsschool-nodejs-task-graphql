import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schemaQL } from './schemas.js';
import { graphql } from 'graphql';
import { ContextQL } from './context.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const {prisma} = fastify
      const contextValue: ContextQL = {
        prisma
    }
      return await graphql({schema: schemaQL, source: query, variableValues: variables, contextValue});
    },
  });
};

export default plugin;
