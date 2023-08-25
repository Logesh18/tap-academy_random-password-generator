import {useEffect, useState} from 'react';
import { Header } from '../Header/Header';
import { ClipboardCard } from '../ClipboardCard/ClipboardCard';
import './PasswordGenerator.css';
export const PasswordGenerator = () => {
    const passwordTypes: any = {
        numerals: '0123456789',
        alphabets: 'abcdefghijhklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        specialCharacters: ':<=>?@_!#%&()*+,-.~'
    };
    const maxArrayLength: number = 5;
    const passwordLength: number = 30;
    const [error, setError] = useState<boolean>(false);
    const [numberCheckBox, setNumberCheckBox] = useState<boolean>(false);
    const [alphabetCheckBox, setAlphabetCheckBox] = useState<boolean>(false);
    const [specialCharacterCheckBox, setSpecialCharacterCheckBox] = useState<boolean>(false);
    const [passwordArray, setPasswordArray] = useState<string[]>(JSON.parse(localStorage.getItem('passwordArray') || '[]'));

    useEffect(() => {
        localStorage.setItem('passwordArray', JSON.stringify(passwordArray));
    }, [passwordArray]);

    const generatePassword = () => {
        let passwordCharcters: string = '';
        let pwd: string = '';
        if (numberCheckBox) {
            passwordCharcters += passwordTypes.numerals;
        }
        if (alphabetCheckBox) {
            passwordCharcters += passwordTypes.alphabets;
        }
        if (specialCharacterCheckBox) {
            passwordCharcters += passwordTypes.specialCharacters;
        }
        if(passwordCharcters.length) {
            for ( let i: number = 0; i < passwordLength; i++ ) {
                pwd += passwordCharcters.charAt(Math.floor(Math.random() * passwordCharcters.length));
            }
            const tempArray: string[] = (passwordArray.length > maxArrayLength - 1) 
                                    ? [pwd].concat([...passwordArray].slice(0, -1))
                                    : [pwd, ...passwordArray];

            setPasswordArray(tempArray);
            setError(false);
            localStorage.setItem('passwordArray', JSON.stringify(tempArray));
        } else {
            setError(true);
        }
        
        
    };
    return (
        <>
        <Header />
        <div className = "CheckBoxContainer Flex FontSize">
            <div className='Title'>
                Generate Password based on your wish using these options...
            </div>
            <div className = "CheckBoxes Flex">
                <input type="checkbox" id="number" name="number" value="number" onChange={(e) => setNumberCheckBox(e.target.checked)} /> Number
            </div>
            <div className = "CheckBoxes Flex">
                <input type="checkbox" id="alphabets" name="alphabets" value="alphabets" onChange={(e) => setAlphabetCheckBox(e.target.checked)} /> Alphabets
            </div>
            <div className = "CheckBoxes Flex">
                <input type="checkbox" id="specialCharacters" name="specialCharacters" value="specialCharacters" onChange={(e) => setSpecialCharacterCheckBox(e.target.checked)} /> Special Characters
            </div>
            <button className = "GenerateButton Flex FontSize" onClick={generatePassword}>Generate</button>
            { error && <div className='Error'>Please select one checkbox to generate password</div> }
        </div>
        
        <div className='ContentContainer Flex'>
        {
            passwordArray.map((password: string, index: number) => {
                return (
                    <ClipboardCard key={index} password = {password} />
                );
            })
        }
        </div>
        
        </>
    );
};