import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Controls from './Controls';

interface QRCodePreviewProps {
    value: string;
    inputCount:string;
    handleCountChange:any;
    handleGenerate:any
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ inputCount, handleCountChange, handleGenerate, value }) => {
    return (
        <div className='flex w-158 flex-col items-center justify-around sticky top-0 border-r-2'>
            <div className="w-[270px] h-[270px] bg-white flex px-32 py-0 justify-center items-center">
                <div className="w-[190px] h-[190px] flex items-center justify-cente">
                    <QRCodeSVG
                        value={value}
                        size={190}
                        level="H"
                        className="w-[190px] h-[190px]"
                    />
                </div>
            </div>
            {/* Controls */}
            <Controls
                count={inputCount}
                onCountChange={handleCountChange}
                onGenerate={handleGenerate}
            />
        </div>
    );
};

export default QRCodePreview;