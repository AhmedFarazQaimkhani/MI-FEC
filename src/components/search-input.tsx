// Packages
import TextField from '@mui/material/TextField';

// Components
import { Button } from './button';

interface SearchInputProps {
  handleSearch: any;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchInput = (props: SearchInputProps) => {
  const { setSearchValue, handleSearch } = props;
  return (
    <>
      <div className={'searchContainer'}>
        <TextField
          label={'Search'}
          type="search"
          onReset={handleSearch}
          onChange={(e: any) => setSearchValue(e.target.value)}
          className={'textField'}
          id="outlined-size-small"
          size="small"
        />

        <Button primary onClick={handleSearch}>
          Search
        </Button>
      </div>
    </>
  );
};
