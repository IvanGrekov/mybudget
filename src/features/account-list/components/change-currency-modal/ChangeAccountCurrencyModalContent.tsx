import { useState } from 'react';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import Select from 'components/select/Select';
import Spacing from 'components/spacing/Spacing';
import Typography from 'components/typography/Typography';
import { useChangeCurrency } from 'features/account-list/components/change-currency-modal/hooks/useChangeCurrency';
import { useGetAreRelatedTransactionsExist } from 'features/account-list/components/change-currency-modal/hooks/useGetAreRelatedTransactionsExist';
import { TChangeAccountCurrencyModalDataProps } from 'features/account-list/components/change-currency-modal/types/changeAccountCurrencyModalDataProps';
import { getDefaultCurrency } from 'features/account-list/components/change-currency-modal/utils/getDefaultCurrency';
import styles from 'styles/ModalContent.module.scss';
import { EditAccountCurrencyDtoCurrencyEnum } from 'types/generated.types';

interface IChangeAccountCurrencyModalContentProps
    extends TChangeAccountCurrencyModalDataProps {
    onClose: VoidFunction;
}

const OPTIONS = Object.values(EditAccountCurrencyDtoCurrencyEnum);

export default function ChangeAccountCurrencyModalContent({
    id,
    type,
    name,
    currency,
    onClose,
}: IChangeAccountCurrencyModalContentProps): JSX.Element {
    const initialCurrency = getDefaultCurrency(currency);
    const [newCurrency, setNewCurrency] =
        useState<EditAccountCurrencyDtoCurrencyEnum>(initialCurrency);

    const {
        isLoading: isRelatedTransactionsLoading,
        areRelatedTransactionsExist,
    } = useGetAreRelatedTransactionsExist(id);
    const { isLoading, change } = useChangeCurrency({
        id,
        type,
        initialCurrency,
        currency: newCurrency,
    });

    if (isRelatedTransactionsLoading) {
        return <ModalCircularLoading />;
    }

    if (areRelatedTransactionsExist) {
        return (
            <>
                <div className={styles.container}>
                    <Typography variant="subtitle2" className="error-color">
                        You can&apos;t change currency for &quot;{name}&quot;
                        account because it has related transactions.
                    </Typography>
                </div>

                <ModalActions>
                    <CancelAction onCancel={onClose} />
                </ModalActions>
            </>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <Typography>
                    Change currency for &quot;{name}&quot; account
                </Typography>

                <Select
                    value={newCurrency}
                    onChange={(value): void => {
                        if (value) {
                            setNewCurrency(value);
                        }
                    }}
                    label="Currency"
                    options={OPTIONS}
                    shouldAddSearch={true}
                    isClearable={false}
                    required={true}
                    isFullWidth={true}
                />

                <Spacing xs={50} />
            </div>

            <ModalActions>
                <CancelAction onCancel={onClose} />
                <Button
                    text="Change"
                    variant="contained"
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={newCurrency === initialCurrency}
                    onClick={(): void => {
                        onClose();
                        change();
                    }}
                />
            </ModalActions>
        </>
    );
}
