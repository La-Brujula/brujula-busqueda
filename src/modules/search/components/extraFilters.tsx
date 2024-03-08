import languages from '@shared/constants/languages.json';
import { ChangeEvent } from 'react';
import { Search } from '../types/searchParams';

export function ExtraFilters({
  filters,
  updateFilterValue,
}: {
  filters: Search;
  updateFilterValue: (
    fieldName: keyof Search
  ) => (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}) {
  return (
    <div className="pt-4 border-t border-black flex flex-col gap-4">
      <div className="grid grid-cols-[min-content_1fr]">
        {/* Tipo de persona */}
        <div className="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20">
          <label
            className="font-normal w-full cursor-pointer"
            htmlFor="remote"
          >
            Remoto
          </label>
          <input
            type="checkbox"
            placeholder="remote"
            id="remote"
            onChange={updateFilterValue('remote')}
            className="size-4 cursor-pointer"
            defaultChecked={filters.remote}
          />
        </div>
        <select
          onChange={updateFilterValue('type')}
          className="w-full dark"
          defaultValue={filters.type}
        >
          <option
            value=""
            selected
            unselectable="on"
          >
            Tipo de persona
          </option>
          <option value="moral">Moral</option>
          <option value="fisica">Física</option>
        </select>
      </div>
      {/* Idioma */}
      <div className="flex flex-col gap-4 w-full">
        <select
          onChange={updateFilterValue('language')}
          defaultValue={filters.language}
          className="w-full dark"
        >
          <option value="">Idioma</option>
          {languages.map((defLang) => (
            <option
              value={defLang}
              key={defLang}
            >
              defLang
            </option>
          ))}
          <option value="other">Otro</option>
        </select>
        {!!filters.language && !languages.includes(filters.language) && (
          <input
            type="text"
            onChange={updateFilterValue('language')}
            placeholder="Escribe aquí el nombre del idioma"
          />
        )}
      </div>
      {/* Escuela */}
      <div className="grid gap-1 items-center text-left border-b border-b-black border-opacity-20">
        <label
          className="font-normal w-full cursor-pointer"
          htmlFor="certifications"
        >
          Universidad
        </label>
        <input
          type="text"
          placeholder=""
          id="certifications"
          onChange={updateFilterValue('schools')}
          defaultValue={filters.schools}
        />
      </div>
      {/* Servicio de becario */}
      <div className="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20">
        <label
          className="font-normal w-full cursor-pointer"
          htmlFor="socialService"
        >
          Disponible para sevicio social o de becario
        </label>
        <input
          type="checkbox"
          placeholder=""
          id="socialService"
          onChange={updateFilterValue('socialService')}
          className="size-4 cursor-pointer"
          defaultChecked={filters.socialService}
        />
      </div>
      {/* Asociaciones */}
      <div className="grid gap-1 items-center text-left border-b border-b-black border-opacity-20">
        <label
          className="font-normal w-full cursor-pointer"
          htmlFor="associations"
        >
          Asociaciones
        </label>
        <input
          type="text"
          placeholder=""
          id="associations"
          onChange={updateFilterValue('associations')}
          defaultValue={filters.associations}
        />
      </div>
      {/* Certificaciones */}
      <div className="grid gap-1 items-center text-left border-b border-b-black border-opacity-20">
        <label
          className="font-normal w-full cursor-pointer"
          htmlFor="certifications"
        >
          Certificaciones
        </label>
        <input
          type="text"
          placeholder=""
          id="certifications"
          onChange={updateFilterValue('certifications')}
          defaultValue={filters.certifications}
        />
      </div>
    </div>
  );
}
