import areas from '@shared/constants/areas.json';
import genders from '@shared/constants/genders.json';
import regiones from '@shared/constants/regiones.json';
import { ChangeEvent, useCallback, useState } from 'react';
import { getSubAreaObjectFromId, getTitle } from '@shared/utils/areaUtils';
import { ExtraFilters } from './extraFilters';
import { useNavigate } from '@tanstack/react-router';
import { Search } from '../types/searchParams';

export const ResultsFilter = ({ filters }: { filters: Search }) => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);

  const clearFilters = useCallback(() => {
    navigate({ search: {} });
  }, []);

  const updateFilterValue = useCallback(
    (fieldName: keyof Search) =>
      (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
        navigate({
          search: { ...filters, [fieldName]: ev.currentTarget.value },
        }),
    [filters, navigate]
  );

  return (
    <div className="">
      <div
        className="lg:hidden px-4 py-2 rounded-md bg-primary text-white
        cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        Filtros
      </div>
      <form
        className={[
          'flex flex-col transition-all lg:sticky top-0 bg-black bg-opacity-20',
          'p-4 rounded-b-md -mt-2 lg:rounded-t-md lg:mt-0',
          isVisible ? 'h-auto block' : 'h-0 hidden lg:block lg:h-auto',
        ].join(' ')}
      >
        <h2 className="text-primary text-xl hidden lg:block">Filtros</h2>
        <div className="flex flex-col gap-4 items-stretch">
          <div className="w-full flex flex-row-reverse">
            <button
              className="text-white cursor-pointer w-fit ml-auto"
              onClick={clearFilters}
            >
              Borrar Filtros
            </button>
          </div>
          <select
            className="dark"
            onChange={updateFilterValue('activity')}
            defaultValue={filters.activity?.slice(0, 3)}
          >
            <option value="">Categoría</option>
            {Object.entries(areas).map(([area, subareas], i) => (
              <optgroup
                key={area}
                label={area}
              >
                {Object.keys(subareas).map((subarea, n) => (
                  <option
                    key={subarea}
                    value={[i + 1, (n + 1).toString().padStart(2, '0')].join(
                      ''
                    )}
                  >
                    {subarea}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {filters.activity !== undefined && filters.activity?.length >= 3 && (
            <select
              onChange={updateFilterValue('activity')}
              className="dark"
              defaultValue={filters.activity}
            >
              <option value="">Actividad</option>
              {Object.keys(
                getSubAreaObjectFromId(filters.activity.slice(0, 3))
              ).map((activity) =>
                getTitle(activity, 'other') ? (
                  <option
                    key={activity}
                    value={activity}
                  >
                    {getTitle(activity, 'other')}
                  </option>
                ) : (
                  <></>
                )
              )}
            </select>
          )}
          <select
            className="dark"
            onChange={updateFilterValue('location')}
            defaultValue={filters.location}
          >
            <option value="">Ubicación</option>
            {regiones?.map((region) => (
              <optgroup
                key={region.id}
                label={region.nombre}
              >
                {region.estados?.map((estado) => (
                  <option
                    key={encodeURI(estado)}
                    value={estado}
                  >
                    {estado}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <select
            className="dark"
            onChange={updateFilterValue('gender')}
            defaultValue={filters.gender}
          >
            <option value="">Género</option>
            {genders.slice(0, 3).map((e) => (
              <option
                key={e}
                value={e}
              >
                {e}
              </option>
            ))}
          </select>
          {moreFiltersVisible && (
            <ExtraFilters
              filters={filters}
              updateFilterValue={updateFilterValue}
            />
          )}
          <div
            className="px-4 py-2 rounded-md bg-primary text-white
        cursor-pointer"
            onClick={() => setMoreFiltersVisible(!moreFiltersVisible)}
          >
            {moreFiltersVisible ? 'Ver menos' : 'Ver más'}
          </div>
        </div>
      </form>
    </div>
  );
};
