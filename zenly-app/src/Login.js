import { useEffect, useRef, useState } from "react"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const Login = () => {
    const [ value, setValue ] = useState('');
    const [ isStep1, setIsStep1 ] = useState(true);

    const recaptchaVerifier = useRef();
    const confirmationResult = useRef();

    useEffect(() => {
        const auth = getAuth();
        recaptchaVerifier.current = new RecaptchaVerifier('recaptcha-container', {}, auth);
    }, [])

    const onClickLogin = async () => {
        const auth = getAuth();
        const phoneNumber = value;
        confirmationResult.current = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);

        setValue('');
        setIsStep1(false);
    }

    const onClickCheckCode = async () => {
        const code = value;

        await confirmationResult.current.confirm(code);
    }

    return (
        <div>
        {
            isStep1 ? (
                <div>
                    <div id="recaptcha-container"></div>
                    <input type="text" placeholder="Phone number" value={ value } onChange={ (e) => setValue(e.target.value) } />
                    <button onClick={ onClickLogin }>Login</button>
                </div>
            ) : (
                <div>
                    <input type="text" placeholder="Code" value={ value } onChange={ (e) => setValue(e.target.value) } />
                    <button onClick={ onClickCheckCode }>Check code</button>
                </div>
            )
        }
        </div>
    )
}
