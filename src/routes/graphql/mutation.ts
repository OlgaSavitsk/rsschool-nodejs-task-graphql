import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ContextQL } from './context.js';
import { Post, PrismaClient, Profile, User } from '@prisma/client';
import { CreatePostInput, PostsInputChangeType, PostsType } from './types/posts.types.js';
import { UUIDType } from './types/uuid.js';
import {
  ProfileInputChangeType,
  ProfileInputType,
  ProfilesType,
} from './types/profiles.types.js';
import { UserInput, UserInputPatch, UserType } from './types/user.types.js';

export const mutations = new GraphQLObjectType<ContextQL>({
  name: 'mutations',
  fields: {
    createUser: {
      type: UserType,
      args: { payload: { type: new GraphQLNonNull(UserInput) } },
      resolve: (
        { prisma }: { prisma: PrismaClient },
        { args }: { args: Omit<User, 'id'> },
      ) => prisma.user.create({ data: args }),
    },
    createPost: {
      type: PostsType,
      args: { payload: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: ({ prisma }: { prisma: PrismaClient }, args: Omit<Post, 'id'>) =>
        prisma.post.create({ data: args }),
    },
    createProfile: {
      type: ProfilesType,
      args: { payload: { type: new GraphQLNonNull(ProfileInputType) } },
      resolve: (
        { prisma }: { prisma: PrismaClient },
        { args }: { args: Omit<Profile, 'id'> },
      ) => 
        console.log('!!!!!!',args)
      // prisma.profile.create({ data: args })}),
    },
    changeProfile: {
      type: ProfilesType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        payload: { type: new GraphQLNonNull(ProfileInputChangeType) },
      },
      resolve: ({ prisma }: { prisma: PrismaClient }, { args }: { args: Profile }) =>
        prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args,
        }),
    },
    changePost: {
      type: PostsType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        payload: { type: new GraphQLNonNull(PostsInputChangeType) },
      },
      resolve: ({ prisma }: { prisma: PrismaClient }, { args }: { args: Post }) =>
        prisma.post.update({
          where: {
            id: args.id,
          },
          data: args,
        }),
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        payload: { type: new GraphQLNonNull(UserInputPatch) },
      },
      resolve: ({ prisma }: { prisma: PrismaClient }, { args }: { args: User }) =>
        prisma.user.update({
          where: {
            id: args.id,
          },
          data: args,
        }),
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: ({ prisma }: { prisma: PrismaClient }, { args }: { args: User }) =>
        prisma.user.delete({
          where: {
            id: args.id,
          },
        }),
    },
    deletePost: {
      type: PostsType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: ({ prisma }: { prisma: PrismaClient }, { args }: { args: Post }) =>
        prisma.post.delete({
          where: {
            id: args.id,
          },
        }),
    },
    deleteProfile: {
      type: ProfilesType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: ({ prisma }: { prisma: PrismaClient }, { args }: { args: Profile }) =>
        prisma.profile.delete({
          where: {
            id: args.id,
          },
        }),
    },
  },
});
