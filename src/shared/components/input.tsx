import React, { HTMLInputTypeAttribute, ReactNode, useMemo } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputProps<
  Type extends
    | 'textArea'
    | 'select'
    | 'groupedSelect'
    | 'custom'
    | HTMLInputTypeAttribute,
  FormFields extends FieldValues,
> = {
  label: string;
  register: UseFormRegister<FormFields>;
  fieldName: Path<FormFields>;
  inputClass?: string;
  divClass?: string;
  labelClass?: string;
  required?: boolean;
} & (Type extends 'textArea'
  ? {
      type: 'textArea';
      rows?: number;
    }
  : Type extends 'select'
    ? {
        type: 'select';
        items: { key: string; label: string }[];
      }
    : Type extends 'groupedSelect'
      ? {
          type: 'groupedSelect';
          groupedItems: { [k: string]: { key: string; label: string }[] };
        }
      : Type extends 'custom'
        ? {
            type: 'custom';
            component: React.FunctionComponent<{
              register: UseFormRegister<FormFields>;
              fieldName: Path<FormFields>;
            }>;
            [k: string]: any;
          }
        : Type extends HTMLInputTypeAttribute
          ? {
              type: HTMLInputTypeAttribute;
              autoComplete?: string;
            } & React.DetailedHTMLProps<
              React.InputHTMLAttributes<HTMLInputElement>,
              HTMLInputElement
            >
          : {});

const internalProps = [
  'label',
  'register',
  'fieldName',
  'inputClass',
  'divClass',
  'labelClass',
  'required',
];
function buildGroupedSelect<T extends FieldValues>(
  props: InputProps<'groupedSelect', T>
) {
  return (
    <select
      {...props.register(props.fieldName, { required: props.required })}
      id={props.fieldName}
      className={props.inputClass}
      required={props.required}
      defaultValue=""
    >
      <option
        value=""
        unselectable="on"
      >
        {props.label}
      </option>
      {Object.entries(props.groupedItems).map(([group, items]) => (
        <optgroup
          key={group}
          label={group}
        >
          {items.map(({ key, label }) => (
            <option
              key={key}
              value={key}
            >
              {label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function buildSelect<T extends FieldValues>(props: InputProps<'select', T>) {
  return (
    <select
      {...props.register(props.fieldName, { required: props.required })}
      id={props.fieldName}
      className={props.inputClass}
      required={props.required}
      defaultValue=""
    >
      <option
        value=""
        unselectable="on"
      >
        {props.label}
      </option>
      {props.items.map(({ key, label }) => (
        <option
          key={key}
          value={key}
        >
          {label}
        </option>
      ))}
    </select>
  );
}

function buildTextArea<T extends FieldValues>(
  props: InputProps<'textArea', T>
) {
  return (
    <textarea
      {...props.register(props.fieldName, { required: props.required })}
      id={props.fieldName}
      className={props.inputClass}
      rows={props.rows || 3}
      required={props.required}
    />
  );
}

function buildInput<T extends FieldValues>(
  props: InputProps<HTMLInputTypeAttribute, T>
) {
  return (
    <input
      className={props.inputClass}
      {...Object.fromEntries(
        Object.entries(props).filter(([k, v]) => !internalProps.includes(k))
      )}
      id={props.fieldName}
      {...props.register(props.fieldName, { required: props.required })}
    />
  );
}

function Input<T extends FieldValues>(
  props:
    | InputProps<'textArea', T>
    | InputProps<'select', T>
    | InputProps<'groupedSelect', T>
    | InputProps<'custom', T>
    | InputProps<HTMLInputTypeAttribute, T>
) {
  const inputElement: ReactNode = useMemo(() => {
    switch (props.type) {
      case 'textArea':
        return buildTextArea(props as InputProps<'textArea', T>);
      case 'select':
        return buildSelect(props as InputProps<'select', T>);
      case 'groupedSelect':
        return buildGroupedSelect(props as InputProps<'groupedSelect', T>);
      case 'custom':
        const CustomElement = (props as InputProps<'custom', T>).component;
        return <CustomElement {...props} />;
      default:
        return buildInput(props);
    }
  }, [props]);

  return (
    <div
      className={['flex flex-col gap-2 text-left', props.divClass].join(' ')}
    >
      <label
        htmlFor={props.fieldName}
        className={props.labelClass}
      >
        {props.label}
        {props.required && ' *'}
      </label>
      {inputElement}
    </div>
  );
}

export default Input;
