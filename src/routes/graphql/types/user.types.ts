import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PostsType } from './posts.types.js';
import { ProfilesType } from './profiles.types.js';
import { ContextQL } from '../context.js';
import { User } from '@prisma/client';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    posts: {
      type: new GraphQLList(PostsType),
      resolve: async (source: User, _args, { prisma }: ContextQL) =>
        await prisma.post.findMany({
          where: {
            authorId: source.id,
          },
        }),
    },
    profile: {
      type: ProfilesType,
      resolve: async (source: User, _args, { prisma }: ContextQL) =>
      await prisma.profile.findFirst({
        where: {
          userId: source.id,
        },
      }),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (source: User, _args, { prisma }: ContextQL) => {
        const users = await prisma.subscribersOnAuthors.findMany({
          where: {
            subscriberId: source.id,
          },
          include: {
            author: true,
          },
        });
        return users.map((user) => user.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (source: User, _args, { prisma }: ContextQL) => {
        const users = await prisma.subscribersOnAuthors.findMany({
          where: {
            authorId: source.id,
          },
          include: {
            subscriber: true,
          },
        });
        return users.map((user) => user.subscriber);
      },
    },
  }),
});

export const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
  }),
});

export const UserInputPatch = new GraphQLInputObjectType({
  name: 'UserInputPatch',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
  }),
});
