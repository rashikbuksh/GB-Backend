import * as HSCode from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { createErrorSchema } from 'stoker/openapi/schemas';

import { notFoundSchema } from '@/lib/constants';
import * as param from '@/lib/param';
import { createRoute, z } from '@hono/zod-openapi';

import { insertSchema, patchSchema, selectSchema } from './utils';

const tags = ['portfolio.recipe'];

export const list = createRoute({
  path: '/portfolio/recipe',
  method: 'get',
  tags,
  // request: {
  //   query: z.object({
  //     portfolio_faculty: z.string().optional(),
  //     access: z.string().optional(),
  //   }),
  // },
  responses: {
    [HSCode.OK]: jsonContent(
      z.array(selectSchema),
      'The list of recipe',
    ),
  },
});

export const create = createRoute({
  path: '/portfolio/recipe',
  method: 'post',
  request: {
    body: jsonContentRequired(
      insertSchema,
      'The club to create',
    ),
  },
  tags,
  responses: {
    [HSCode.OK]: jsonContent(
      selectSchema,
      'The created recipe',
    ),
    [HSCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertSchema),
      'The validation error(s)',
    ),
  },
});

export const getOne = createRoute({
  path: '/portfolio/recipe/{uuid}',
  method: 'get',
  request: {
    params: param.uuid,
  },
  tags,
  responses: {
    [HSCode.OK]: jsonContent(
      selectSchema,
      'The requested recipe',
    ),
    [HSCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'recipe not found',
    ),
    [HSCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(param.uuid),
      'Invalid id error',
    ),
  },
});

export const patch = createRoute({
  path: '/portfolio/recipe/{uuid}',
  method: 'patch',
  request: {
    params: param.uuid,
    body: jsonContentRequired(
      patchSchema,
      'The recipe updates',
    ),
  },
  tags,
  responses: {
    [HSCode.OK]: jsonContent(
      selectSchema,
      'The updated recipe',
    ),
    [HSCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'recipe not found',
    ),
    [HSCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchSchema)
        .or(createErrorSchema(param.uuid)),
      'The validation error(s)',
    ),
  },
});

export const remove = createRoute({
  path: '/portfolio/recipe/{uuid}',
  method: 'delete',
  request: {
    params: param.uuid,
  },
  tags,
  responses: {
    [HSCode.NO_CONTENT]: {
      description: 'Testimonial deleted',
    },
    [HSCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Authorities not found',
    ),
    [HSCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(param.uuid),
      'Invalid id error',
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
