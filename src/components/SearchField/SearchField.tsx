import {ChangeEvent} from 'react';

type SearchFieldPropsType = {
  searchValue: string;
  setSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchField = (props: SearchFieldPropsType) => {
  const { searchValue, setSearchValue } = props;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={setSearchValue}
      />
    </div>
  );
};
