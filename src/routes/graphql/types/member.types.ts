import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';

export enum MemberId {
  BASIC = 'basic',
  BUSINESS = 'business',
}

export const MemberTypeTypeId = new GraphQLEnumType({
  name: 'MemberTypeTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberTypeType = new GraphQLObjectType({
  name: 'MemberTypeType',
  fields: {
    id: { type: MemberTypeTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});
