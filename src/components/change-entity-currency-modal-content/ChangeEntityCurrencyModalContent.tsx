import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import Select from 'components/select/Select';
import Spacing from 'components/spacing/Spacing';
import Typography from 'components/typography/Typography';
import {
    useGetFeatureTranslations,
    useGetActionButtonsTranslations,
} from 'hooks/translations.hooks';
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
    const [
        youCanNotChangeCurrencyForText,
        becauseItHasRelatedTransactionsText,
        changeCurrencyForText,
    ] = useGetFeatureTranslations({
        featureName: 'ChangeEntityCurrency',
        keys: [
            'you_can_not_change_currency_for',
            'because_it_has_related_transactions',
            'change_currency_for',
        ],
    });
    const [entityTypeText, currencyText] = useGetFeatureTranslations({
        featureName: 'EntityNames',
        keys: [`for_${entityType}`, 'currency'],
    });
    const submitText = useGetActionButtonsTranslations()('change');

    if (isRelatedTransactionsLoading) {
        return <ModalCircularLoading />;
    }

    if (areRelatedTransactionsExist) {
        return (
            <>
                <div className={styles.container}>
                    <Typography variant="subtitle2" className="error-color">
                        {youCanNotChangeCurrencyForText} &quot;{entityName}
                        &quot; {entityTypeText}{' '}
                        {becauseItHasRelatedTransactionsText}.
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
                    {changeCurrencyForText} &quot;{entityName}&quot;{' '}
                    {entityTypeText}
                </Typography>

                <Select
                    value={newCurrency}
                    onChange={(value): void => {
                        if (value) {
                            setNewCurrency(value);
                        }
                    }}
                    label={currencyText}
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
                    text={submitText}
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
