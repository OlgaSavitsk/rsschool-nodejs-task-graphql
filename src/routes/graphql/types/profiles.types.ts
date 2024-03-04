import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeTypeId } from './member.types.js';

export const ProfilesType = new GraphQLObjectType({
  name: 'ProfilesType',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeTypeId },
  },
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
