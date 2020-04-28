import {useMemo} from 'react';

export function useAudio(url) {
    const audio = useMemo(() => {
        if (!url) return null;
        return new Audio(url);
    }, [url]);

    return () => {
        if (audio) {
            audio.play();
        }
    };
}
