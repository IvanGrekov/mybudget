import { useFormContext, Controller } from 'react-hook-form';

import TextField from 'components/text-field/TextField';

export default function NicknameField(): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name="nickname"
            control={control}
            render={({ field }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <TextField
                        isFullWidth={true}
                        nativeSelectRefCallback={ref}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
