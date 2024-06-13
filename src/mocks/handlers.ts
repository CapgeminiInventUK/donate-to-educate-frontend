import { HttpResponse, graphql } from 'msw';
import getSchoolQueryResponse from './data/getSchoolQuery.json';

export const handlers = [
  graphql.query('getSchool', ({ variables }) => {
    // eslint-disable-next-line no-console
    console.log(variables);
    return HttpResponse.json({
      data: getSchoolQueryResponse,
    });
  }),
];
