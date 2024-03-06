import { SearchFilters } from '@/shared/hooks/useSearch';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const backendRequester = axios.create({
  baseURL: BASE_URL,
});

type Meta = {
  total: number;
  limit: number;
  offset: number;
};

type BackendResponse<T> = {
  isSuccess: boolean;
  entity: T;
  meta?: Meta;
};

export type UserDTO = {
  id: string;
  primaryEmail: string;
  type: 'moral' | 'fisica';
  subscriber: boolean;
  fullName?: string;
  nickName?: string;
  primaryActivity?: string;
  recommendationsCount: number;
  secondaryActivity?: string;
  thirdActivity?: string;
  gender?: 'male' | 'female' | 'other';
  location?: string;
  profilePictureUrl?: string;
  headline?: string;
};

export function paginateSearch(
  params: SearchFilters & { limit?: number; offset?: number }
) {
  return (page: number) =>
    backendRequester
      .get('/profiles', { params: { ...params, offset: page } })
      .then((res) => res.data) as Promise<BackendResponse<UserDTO>>;
}

export function useProfileSearch(params: SearchFilters) {
  const paginationPartial = paginateSearch(params);
  return useInfiniteQuery({
    queryKey: ['search', params],
    queryFn: ({ pageParam }) => paginationPartial(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _) => {
      const next = lastPage.meta!.offset + lastPage.meta!.limit;
      if (next < lastPage.meta!.total) {
        return next;
      }
    },
  });
}
