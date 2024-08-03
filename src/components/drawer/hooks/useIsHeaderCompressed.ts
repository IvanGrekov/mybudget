import { useIsHeaderFixed } from 'hooks/useIsHeaderFixed';

export const useIsHeaderCompressed = (): { isCompressed: boolean } => {
    const { isFixed } = useIsHeaderFixed();

    return { isCompressed: isFixed };
};
