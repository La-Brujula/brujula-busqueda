import { useCallback, useEffect, useMemo } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { ErrorMessage } from '@shared/components/errorMessage';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import useDebounce from '@shared/hooks/useDebounce';
// import { replaceSearchTermsFromIndex } from '@shared/utils/busqueda';
import { ResultsFilter } from '../search/components/resultsFilters';
import { UsersList } from '../search/components/userList';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useProfileSearch } from '../search/hooks/useSearch';
import { Search, searchSchema } from '../search/types/searchParams';

export const Route = createFileRoute('/')({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchHomepage,
});

function SearchHomepage() {
  const search: Search = Route.useSearch();

  const {
    data: results,
    isLoading: loading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useProfileSearch(search);

  const users = useMemo(
    () =>
      results !== undefined
        ? [...results.pages.flatMap((page) => page.entity)]
        : [],
    [results]
  );

  let [query, setQuery] = useDebounce(search.query, 500);

  const navigate = useNavigate();

  const updateSearchParams = useCallback(
    (fieldName: keyof Search) => (value: any) =>
      navigate({
        search: {
          ...search,
          [fieldName]: value,
        },
      }),
    [navigate]
  );

  useEffect(() => {
    if (!query) return;
    updateSearchParams('query')(query);
  }, [query]);

  return (
    <>
      <div className="bg-primary absolute top-0 h-48 w-full left-0 -z-10" />
      <div
        className="w-full grid grid-cols-[1fr_max-content]
      gap-4 text-white font-bold items-center px-4"
      >
        <div
          className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white flex flex-row gap-1
        justify-start items-center px-2 mx-auto rounded-md
        z-10 w-full"
          style={{
            backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
            border: '2px solid #dfe1e5',
            borderColor: 'rgb(237 237 237 / var(--tw-border-opacity))',
            flexGrow: '1',
          }}
        >
          <input
            type="text"
            defaultValue={query}
            onChange={(ev) => setQuery(ev.currentTarget.value)}
            className="border-none bg-transparent focus:outline-none w-full"
          />
        </div>
        <p>{results?.pages[0].meta?.total || '...'} resultados</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-12 mt-16">
        <ResultsFilter filters={search} />
        <div
          className="flex flex-col gap-8 text-left bg-black bg-opacity-20
          rounded-l-3xl p-8 w-full relative"
        >
          <div
            className="w-[50vw] absolute left-[100%] top-0 h-full bg-black
          bg-opacity-20 -z-10 hidden"
          ></div>
          {!!users && users.length > 0 ? (
            <UsersList users={users} />
          ) : (
            !loading && !error && <p>No se encontraron resultados</p>
          )}
          {loading && <LoadingSpinner />}
          {!loading && hasNextPage && (
            <ReactVisibilitySensor
              partialVisibility
              offset={640}
              onChange={(isVisible: boolean) =>
                isVisible && !loading && !error && fetchNextPage()
              }
            >
              <LoadingSpinner />
            </ReactVisibilitySensor>
          )}
          {!!error && <ErrorMessage message={error.toString()} />}
        </div>
      </div>
    </>
  );
}

export default SearchHomepage;
