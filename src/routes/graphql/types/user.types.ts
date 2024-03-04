import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PostsType } from './posts.types.js';
import { ProfilesType } from './profiles.types.js';
import { ContextQL } from '../context.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType<ContextQL>({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
    posts: { type: new GraphQLList(PostsType) },
    profile: {
      type: ProfilesType,
    },
    userSubscribeTo: { type: new GraphQLList(UserType) },
    subscribeToUser: { type: new GraphQLList(UserType) },
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
