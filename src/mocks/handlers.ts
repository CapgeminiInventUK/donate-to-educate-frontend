import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('GetUser', ({ query, variables }) => {
    const { userId } = variables;

    return HttpResponse.json({
      data: {
        user: {
          name: 'John',
        },
      },
    });
  }),
];
