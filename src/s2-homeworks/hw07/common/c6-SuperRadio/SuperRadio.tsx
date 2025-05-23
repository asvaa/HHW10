import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from 'react'
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

type DefaultSpanPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>

type OptionType = {
    id: number | string
    value: string
}

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: OptionType[]
    onChangeOption?: (option: OptionType) => void
    spanProps?: DefaultSpanPropsType
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
    id,
    name,
    className,
    options,
    value,
    onChange,
    onChangeOption,
    spanProps,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e) // стандартный onChange
        const selectedId = e.currentTarget.value
        const selectedOption = options?.find(
            (o) => o.id.toString() === selectedId
        )
        if (selectedOption && onChangeOption) {
            onChangeOption(selectedOption)
        }
    }

    const finalRadioClassName = s.radio + (className ? ' ' + className : '')
    const spanClassName =
        s.span + (spanProps?.className ? ' ' + spanProps.className : '')

    const mappedOptions: any[] = options
        ? options.map((o) => (
              <label key={name + '-' + o.id} className={s.label}>
                  <input
                      id={id + '-input-' + o.id}
                      className={finalRadioClassName}
                      type={'radio'}
                      name={name}
                      value={o.id}
                      checked={value?.toString() === o.id.toString()}
                      onChange={onChangeCallback}
                      {...restProps}
                  />
                  <span
                      id={id + '-span-' + o.id}
                      {...spanProps}
                      className={spanClassName}
                  >
                      {o.value}
                  </span>
              </label>
          ))
        : []

    return <div className={s.options}>{mappedOptions}</div>
}

export default SuperRadio
