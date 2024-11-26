import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import Select from 'components/select/Select';
import Spacing from 'components/spacing/Spacing';
import Typography from 'components/typography/Typography';
import styles from 'styles/ModalContent.module.scss';

interface IChangeEntityCurrencyModalContentProps<T> {
    entityType: 'category' | 'account';
    entityName: string;
    isRelatedTransactionsLoading: boolean;
    areRelatedTransactionsExist: boolean;
    isLoading: boolean;
    options: T[];
    newCurrency: T;
    initialCurrency: T;
    onClose: VoidFunction;
    setNewCurrency: (value: T) => void;
    changeCurrency: VoidFunction;
}

export default function ChangeEntityCurrencyModalContent<T>({
    entityType,
    entityName,
    isLoading,
    isRelatedTransactionsLoading,
    areRelatedTransactionsExist,
    options,
    newCurrency,
    initialCurrency,
    onClose,
    setNewCurrency,
    changeCurrency,
}: IChangeEntityCurrencyModalContentProps<T>): JSX.Element {
    if (isRelatedTransactionsLoading) {
        return <ModalCircularLoading />;
    }

    if (areRelatedTransactionsExist) {
        return (
            <>
                <div className={styles.container}>
                    <Typography variant="subtitle2" className="error-color">
                        You can&apos;t change currency for &quot;{entityName}
                        &quot;
                        {entityType} because it has related transactions.
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
                    Change currency for &quot;{entityName}&quot; {entityType}
                </Typography>

                <Select
                    value={newCurrency}
                    onChange={(value): void => {
                        if (value) {
                            setNewCurrency(value);
                        }
                    }}
                    label="Currency"
                    options={options}
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
                        changeCurrency();
                    }}
                />
            </ModalActions>
        </>
    );
}
