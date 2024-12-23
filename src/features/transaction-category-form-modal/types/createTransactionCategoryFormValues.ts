import { CreateTransactionCategoryDto } from 'types/generated.types';

export type TCreateTransactionCategoryFormValues = Omit<
    CreateTransactionCategoryDto,
    'userId' | 'parentId' | 'iconName' | 'iconColor'
>;
