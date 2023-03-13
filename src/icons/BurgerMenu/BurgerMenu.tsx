import { FC } from 'react';
import { SVG } from '../../components/Svg';

export const BurgerMenu: FC = () => {
    return (
        <>
            <g clip-path='url(#clip0_429_11066)'>
                <path
                    d='M3 6.00092H21M3 12.0009H21M3 18.0009H21'
                    stroke='white'
                    stroke-width='2.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                />
            </g>
            <defs>
                <clipPath id='clip0_429_11066'>
                    <rect
                        width='24'
                        height='24'
                        fill='white'
                        transform='translate(0 0.000915527)'
                    />
                </clipPath>
            </defs>
        </>
    );
};

export default BurgerMenu;
