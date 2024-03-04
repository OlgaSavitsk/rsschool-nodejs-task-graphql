import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeType, MemberTypeTypeId } from './member.types.js';
import { MemberType, Profile } from '@prisma/client';
import { ContextQL } from '../context.js';
import { UserType } from './user.types.js';

export const ProfilesType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeTypeId },
    user: {
      type: UserType,
      resolve: async (source: Profile, _args, { prisma }: ContextQL) =>
        prisma.user.findUnique({
          where: {
            id: source.userId,
          },
        }),
    },
    memberType: {
      type: MemberTypeType,
      resolve: async (source: Profile, _args, { prisma }: ContextQL) =>
        await prisma.memberType.findFirst({
          where: {
            id: source.memberTypeId,
          },
        }),
    },
  }),
});

export const ProfileInputType = new GraphQLInputObjectType({
  name: 'ProfileInputType',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeTypeId },
  },
});

export const ProfileInputChangeType = new GraphQLInputObjectType({
  name: 'ProfileInputChangeType',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeTypeId },
  },
});
