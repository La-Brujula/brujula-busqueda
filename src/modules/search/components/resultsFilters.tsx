import areas from '@shared/constants/areas.json';
import genders from '@shared/constants/genders.json';
import regiones from '@shared/constants/regiones.json';
import { useCallback, useState } from 'react';
import { getSubAreaObjectFromId, getTitle } from '@shared/utils/areaUtils';
import { ExtraFilters } from './extraFilters';
import { Search } from '../types/searchParams';
import { Input } from '@/shared/components/input';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { UseFormRegister, UseFormReset } from 'react-hook-form';

export const ResultsFilter = (props: {
  filters: Search;
  register: UseFormRegister<Search>;
  reset: UseFormReset<Search>;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const { t } = useTranslation('search');

  const clearFilters = useCallback(() => {
    props.reset();
  }, [props.reset]);

  return (
    <div className="">
      <button
        className="lg:hidden px-4 py-2 rounded-md bg-primary text-white"
        onClick={() => setIsVisible(!isVisible)}
      >
        {t('Filtros')}
      </button>
      <form
        className={[
          'flex flex-col transition-all top-0 bg-black bg-opacity-20',
          'p-4 rounded-b-md -mt-2 lg:rounded-t-md lg:mt-0',
          isVisible ? 'h-auto block' : 'h-0 hidden lg:block lg:h-auto',
        ].join(' ')}
      >
        <h2 className="text-primary text-xl hidden lg:block">{t('Filtros')}</h2>
        <div className="flex flex-col gap-4 items-stretch text-start">
          <div className="w-full flex flex-row-reverse">
            <IconButton
              className="text-white cursor-pointer w-fit ml-auto"
              onClick={clearFilters}
            >
              <DeleteOutlined />
            </IconButton>
          </div>
          <Input
            label={t('Categoría')}
            register={props.register}
            fieldName="activity"
            type="groupedSelect"
            groupedItems={Object.fromEntries(
              Object.entries(areas).map(([area, subareas], i) => [
                area,
                Object.keys(subareas).map((subarea, n) => ({
                  key: [i + 1, (n + 1).toString().padStart(2, '0')].join(''),
                  label: subarea,
                })),
              ])
            )}
          />

          {props.filters.activity !== undefined &&
            props.filters.activity?.length >= 3 && (
              <Input
                label={t('Actividad')}
                register={props.register}
                fieldName="activity"
                type="select"
                items={Object.keys(
                  getSubAreaObjectFromId(props.filters.activity.slice(0, 3))
                )
                  .filter((activity) => getTitle(activity, 'other'))
                  .map((activity) => ({
                    key: activity,
                    label: getTitle(activity, 'other'),
                  }))}
              />
            )}
          <Input
            label={t('Ubicación')}
            register={props.register}
            fieldName="location"
            type="groupedSelect"
            groupedItems={Object.fromEntries(
              regiones?.map((region) => [
                region.nombre,
                region.estados?.map((estado) => ({
                  key: estado,
                  label: estado,
                })),
              ])
            )}
          />
          <Input
            label={t('Género')}
            register={props.register}
            fieldName="gender"
            type="select"
            items={genders.slice(0, 3).map((gender) => ({
              key: gender,
              label: t(gender, { ns: 'genders' }),
            }))}
          />
          {moreFiltersVisible && (
            <ExtraFilters
              filters={props.filters}
              register={props.register}
            />
          )}
          <div
            className="px-4 py-2 rounded-md bg-primary text-white
        cursor-pointer"
            onClick={() => setMoreFiltersVisible(!moreFiltersVisible)}
          >
            {moreFiltersVisible ? t('Ver menos') : t('Ver más')}
          </div>
        </div>
      </form>
    </div>
  );
};
