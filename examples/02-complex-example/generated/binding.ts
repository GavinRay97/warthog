import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import * as schema from  './schema.graphql'

export interface Query {
    users: <T = Array<User>>(args: { offset?: Int | null, limit?: Int | null, where?: UserWhereInput | null, orderBy?: UserOrderByInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = StandardDeleteResponse>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {}

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema })

/**
 * Types
*/

export type StringEnum =   'FOO' |
  'BAR'

export type UserOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'firstName_ASC' |
  'firstName_DESC' |
  'lastName_ASC' |
  'lastName_DESC' |
  'stringEnumField_ASC' |
  'stringEnumField_DESC' |
  'email_ASC' |
  'email_DESC' |
  'registeredAt_ASC' |
  'registeredAt_DESC' |
  'nickName_ASC' |
  'nickName_DESC' |
  'privateField_ASC' |
  'privateField_DESC' |
  'jsonField_ASC' |
  'jsonField_DESC' |
  'idField_ASC' |
  'idField_DESC' |
  'noFilterField_ASC' |
  'noFilterField_DESC'

export interface BaseWhereInput {
  id_eq?: String | null
  id_in?: String[] | String | null
  createdAt_eq?: String | null
  createdAt_lt?: String | null
  createdAt_lte?: String | null
  createdAt_gt?: String | null
  createdAt_gte?: String | null
  createdById_eq?: String | null
  updatedAt_eq?: String | null
  updatedAt_lt?: String | null
  updatedAt_lte?: String | null
  updatedAt_gt?: String | null
  updatedAt_gte?: String | null
  updatedById_eq?: String | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: String | null
  deletedAt_lt?: String | null
  deletedAt_lte?: String | null
  deletedAt_gt?: String | null
  deletedAt_gte?: String | null
  deletedById_eq?: String | null
}

export interface UserCreateInput {
  firstName: String
  lastName: String
  stringEnumField: StringEnum
  email: String
  registeredAt: DateTime
  nickName?: String | null
  privateField?: String | null
  jsonField?: JSONObject | null
  idField?: String | null
  noFilterField?: String | null
  noSortField?: String | null
  noFilterOrSortField?: String | null
}

export interface UserUpdateInput {
  firstName?: String | null
  lastName?: String | null
  stringEnumField?: StringEnum | null
  email?: String | null
  registeredAt?: DateTime | null
  nickName?: String | null
  privateField?: String | null
  jsonField?: JSONObject | null
  idField?: String | null
  noFilterField?: String | null
  noSortField?: String | null
  noFilterOrSortField?: String | null
}

export interface UserWhereInput {
  id_eq?: String | null
  id_in?: String[] | String | null
  createdAt_eq?: String | null
  createdAt_lt?: String | null
  createdAt_lte?: String | null
  createdAt_gt?: String | null
  createdAt_gte?: String | null
  createdById_eq?: String | null
  updatedAt_eq?: String | null
  updatedAt_lt?: String | null
  updatedAt_lte?: String | null
  updatedAt_gt?: String | null
  updatedAt_gte?: String | null
  updatedById_eq?: String | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: String | null
  deletedAt_lt?: String | null
  deletedAt_lte?: String | null
  deletedAt_gt?: String | null
  deletedAt_gte?: String | null
  deletedById_eq?: String | null
  firstName_eq?: String | null
  firstName_contains?: String | null
  firstName_startsWith?: String | null
  firstName_endsWith?: String | null
  firstName_in?: String[] | String | null
  lastName_eq?: String | null
  lastName_contains?: String | null
  lastName_startsWith?: String | null
  lastName_endsWith?: String | null
  lastName_in?: String[] | String | null
  stringEnumField_eq?: StringEnum | null
  stringEnumField_in?: StringEnum[] | StringEnum | null
  email_eq?: String | null
  email_contains?: String | null
  email_startsWith?: String | null
  email_endsWith?: String | null
  email_in?: String[] | String | null
  registeredAt_eq?: DateTime | null
  registeredAt_lt?: DateTime | null
  registeredAt_lte?: DateTime | null
  registeredAt_gt?: DateTime | null
  registeredAt_gte?: DateTime | null
  nickName_eq?: String | null
  nickName_contains?: String | null
  nickName_startsWith?: String | null
  nickName_endsWith?: String | null
  nickName_in?: String[] | String | null
  privateField_eq?: String | null
  privateField_contains?: String | null
  privateField_startsWith?: String | null
  privateField_endsWith?: String | null
  privateField_in?: String[] | String | null
  idField_eq?: ID_Input | null
  idField_in?: ID_Output[] | ID_Output | null
  noSortField_eq?: String | null
  noSortField_contains?: String | null
  noSortField_startsWith?: String | null
  noSortField_endsWith?: String | null
  noSortField_in?: String[] | String | null
}

export interface UserWhereUniqueInput {
  id?: String | null
  email?: String | null
}

export interface BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface DeleteResponse {
  id: ID_Output
}

export interface BaseModel extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface BaseModelUUID extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface StandardDeleteResponse {
  id: ID_Output
}

export interface User extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  firstName: String
  lastName: String
  stringEnumField: StringEnum
  email: String
  registeredAt: DateTime
  nickName?: String | null
  privateField?: String | null
  jsonField?: JSONObject | null
  idField?: String | null
  noFilterField?: String | null
  noSortField?: String | null
  noFilterOrSortField?: String | null
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The javascript `Date` as string. Type represents date and time as the ISO Date string.
*/
export type DateTime = Date | string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
*/
export type JSONObject = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string