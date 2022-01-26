import {ChangeEvent} from 'react';
//@ts-ignore
import s from './SearchField.module.scss';

type SearchFieldPropsType = {
  searchValue: string;
  setSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchField = (props: SearchFieldPropsType) => {
  const { searchValue, setSearchValue } = props;

  return (
    <div className={s.SearchField}>
      <input className={s.SearchInput}
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={setSearchValue}
      />
    </div>
  );
};
