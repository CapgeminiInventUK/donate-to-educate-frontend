import { HttpResponse, graphql } from 'msw';
import getSchoolQueryResponse from './data/getSchoolQuery.json';

export const handlers = [
  graphql.query('getSchool', () => {
    return HttpResponse.json({
      data: getSchoolQueryResponse,
    });
  }),
];
