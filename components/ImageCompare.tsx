
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ImageCompareProps {
    original: string;
    edited: string | null;
    isLoading: boolean;
}

const ImageCard: React.FC<{ src: string; title: string; children?: React.ReactNode }> = ({ src, title, children }) => (
    <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
        <img src={src} alt={title} className="w-full h-full object-contain" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center">
            <h3 className="text-sm font-bold tracking-wider uppercase">{title}</h3>
        </div>
        {children}
    </div>
);

const PlaceholderCard: React.FC<{ title: string; isLoading: boolean }> = ({ title, isLoading }) => (
    <div className="relative w-full aspect-square bg-gray-900 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-600">
        {isLoading ? (
            <>
                <LoadingSpinner />
                <p className="mt-2 text-gray-400">Generating...</p>
            </>
        ) : (
            <p className="text-gray-500">{title}</p>
        )}
    </div>
);

export const ImageCompare: React.FC<ImageCompareProps> = ({ original, edited, isLoading }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageCard src={original} title="Original" />
            
            {edited ? (
                <ImageCard src={edited} title="Edited" />
            ) : (
                <PlaceholderCard title="AI Edited Result" isLoading={isLoading} />
            )}
        </div>
    );
};
