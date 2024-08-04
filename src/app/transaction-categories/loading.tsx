import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { EAppTitles } from 'types/appTitles';

export default function TransactionCategoriesLoading(): JSX.Element {
    return (
        <LoadingScreen
            description={`${EAppTitles.TransactionCategories} are loading`}
        />
    );
}
