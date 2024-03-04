import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberId, MemberTypeType, MemberTypeTypeId } from './types/member.types.js';
import { ContextQL } from './context.js';
import { PostsType } from './types/posts.types.js';
import { UUIDType } from './types/uuid.js';
import { ProfilesType } from './types/profiles.types.js';
import { UserType } from './types/user.types.js';
import { MemberTypeId } from '../member-types/schemas.js';
import { MemberType, Post, User } from '@prisma/client';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

export const query = new GraphQLObjectType({
  name: 'query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberTypeType),
      resolve: async (_, _args, context: ContextQL) => {
        return await context.prisma.memberType.findMany();
      },
    },
    memberType: {
      type: new GraphQLNonNull(MemberTypeType),
      args: { id: { type: new GraphQLNonNull(MemberTypeTypeId) } },
      resolve: async (_, args: { id: MemberType['id'] }, { prisma }: ContextQL) => {
        return await prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostsType),
      resolve: async (_, _args, { prisma }: ContextQL) => {
        return await prisma.post.findMany();
      },
    },
    post: {
      type: PostsType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: Post['id'] }, { prisma }: ContextQL) =>
        await prisma.post.findUnique({
          where: {
            id: args.id,
          },
        }),
    },
    profiles: {
      type: new GraphQLList(ProfilesType),
      resolve: async (_, _args, context: ContextQL) =>
        await context.prisma.profile.findMany(),
    },
    profile: {
      type: ProfilesType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: { id: string }, { prisma }: ContextQL) =>
        await prisma.profile.findUnique({
          where: {
            id: id,
          },
        }),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, _args, { prisma }: ContextQL, info) => {
        const parsedResolveInfoFragment = parseResolveInfo(info);
        const { fields } = simplifyParsedResolveInfoFragmentWithType(
          parsedResolveInfoFragment as ResolveTree,
          UserType,
        );
        return await prisma.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: User['id'] }, { prisma }: ContextQL) =>
        await prisma.user.findUnique({
          where: {
            id: args.id,
          },
        }),
    },
  },
});
