import SearchIcon from 'components/icons/SearchIcon';
import TextField from 'components/text-field/TextField';
import { TTextFieldProps } from 'components/text-field/types/textField.types';

type TSearchFieldProps = TTextFieldProps & {
    textFieldClassName?: string;
};

export default function SearchField({
    placeholder = 'Search...',
    ...props
}: TSearchFieldProps): JSX.Element {
    return <TextField placeholder={placeholder} Icon={SearchIcon} {...props} />;
}
