import { useRouter } from 'next/navigation';

interface UseRouter {
    goHome: () => void;
}

export function useMyRouter(): UseRouter {
    const router = useRouter();

    return {
        goHome: () => router.push('/')
    };
}





