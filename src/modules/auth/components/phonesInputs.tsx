import { IUpdateBackendProfile } from '@/shared/types/user';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { IconButton, Tooltip } from '@mui/material';
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useReducer,
} from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ReducerAction {
  type: 'add' | 'remove' | 'change' | 'rebase';
  index?: number;
  item?: string;
  state?: string[];
}

const reducer = (state: string[], action: ReducerAction): string[] => {
  const newArray = !!state ? state.slice() : [];
  switch (action.type) {
    case 'add':
      newArray.splice(newArray.length, 0, '');
      return newArray;
    case 'remove':
      if (action.index === undefined) throw 'Missing index';
      newArray.splice(action.index, 1);
      return newArray;
    case 'change':
      if (action.index === undefined) throw 'Missing index';
      if (!action.item) throw 'Missing item';
      return newArray.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return action.item;
      });
    case 'rebase':
      if (action.state === undefined) return [];
      return action.state;
  }
};

export function StringArrayForm<T extends FieldValues>(props: {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  defaultState?: PathValue<T, Path<T>>;
  inputType: HTMLInputTypeAttribute;
  label: string;
}) {
  const { t } = useTranslation('auth');
  const [state, dispatch] = useReducer(reducer, props.defaultState || ['']);

  const updateValue =
    (i: number) => (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      dispatch({
        type: 'change',
        index: i,
        item: ev.currentTarget.value,
      });
    };

  useEffect(() => {
    props.setValue(props.name, state as PathValue<T, Path<T>>);
  }, [state]);

  return (
    <div className="flex flex-col gap-2">
      {!!state &&
        state.map((value: string, i: number) => (
          <div
            key={value}
            className="flex flex-col md:flex-row gap-2 items-center"
          >
            <input
              className="flex flex-col gap-4 w-full"
              type={props.inputType}
              onChange={updateValue(i)}
              value={value}
            />
            {state.length > 1 && (
              <IconButton
                aria-label={t('Borrar')}
                onClick={() =>
                  dispatch({
                    type: 'remove',
                    index: i,
                  })
                }
              >
                <Tooltip
                  title={t('Borrar')}
                  arrow
                >
                  <CloseOutlined />
                </Tooltip>
              </IconButton>
            )}
          </div>
        ))}
      <div
        className="cursor-pointer px-4 py-2 bg-secondary text-white
        rounded-md mx-auto w-fit"
        onClick={() => dispatch({ type: 'add' })}
      >
        {t('Agregar otro {{label}}', { replace: { label: props.label } })}
      </div>
    </div>
  );
}
