import Paths from '@/config/paths';

export const paramedRoute = (route: Paths, params: Record<string, string | undefined>): string => {
  return route.replace(/:([a-zA-Z]+)/g, (_, key: string) =>
    params[key] ? encodeURIComponent(params[key]) : ''
  );
};
