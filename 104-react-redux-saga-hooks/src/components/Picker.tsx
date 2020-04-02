import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';

export type PickerProps = {
  value: string,
  options: string[],
  onChange: (value: string) => void,
};

const Picker = ({onChange, options, value}: PickerProps) => {
  return (
    <span>
    <h1>{value}</h1>
    <select
      onChange={e => onChange(e.target.value)}
      value={value}
    >
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>)
      }
    </select>
  </span>
  );
};

export default Picker;
