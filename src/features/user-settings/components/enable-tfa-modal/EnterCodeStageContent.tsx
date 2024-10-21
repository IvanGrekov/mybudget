import TextField from 'components/text-field/TextField';
import { VERIFICATION_CODE_LENGTH } from 'constants/verificationCodeLength';

interface IEnterCodeStageContentProps {
    code: string;
    setCode: (code: string) => void;
}

export default function EnterCodeStageContent({
    code,
    setCode,
}: IEnterCodeStageContentProps): JSX.Element {
    return (
        <TextField
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="number"
            maxLength={VERIFICATION_CODE_LENGTH}
            label="Authenticator App Code"
            isFullWidth={true}
        />
    );
}
