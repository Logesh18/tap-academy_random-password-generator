import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './ClipboardCard.css'
import copy from "copy-to-clipboard";
import { useState } from 'react';
export const ClipboardCard = ({password} : {password: string}) => {
    const [show, setShow] = useState<boolean>(false);

    const copyToClipboard = () => {
        copy(password);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 500);
    }
    return (
        <div className="ClipBoardContainer Flex">
                {
                    !show ? 
                        <div className='ClipBoardCard Flex'>
                            <span className="Password FontSize">{password}</span>
                            <span className='Icon Flex' onClick = {copyToClipboard}><ContentCopyIcon/></span>
                        </div>
                    : <span className='ClipBoardCard Copied Flex FontSize'>Copied!</span>
                } 
        </div>
    );
};