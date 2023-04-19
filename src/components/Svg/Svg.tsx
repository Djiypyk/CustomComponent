import { FC, SVGProps } from 'react';

interface ISVGProps extends SVGProps<SVGSVGElement> {
    viewBox?: string;
    children?: React.ReactNode;
    className?: string;
}

export const SVG: FC<ISVGProps> = ({ viewBox = '0 0 20 20', children, className, onClick }) => {
    return (
        <svg
            onClick={onClick}
            className={className}
            viewBox={viewBox}
            xmlns='<http://www.w3.org/2000/svg>'
        >
            {children}
        </svg>
    );
};

export default SVG;
