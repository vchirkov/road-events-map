import {toast} from 'react-toastify';

export function useToast() {
    return (...args) => {
        toast.dismiss();
        toast(...args);
    };
}
