
import toast, { Toaster } from 'react-hot-toast';
const notify = (message,success) => {
    if(success){
       return toast.success(message);
    }
    else{
        return toast.error(message);
    }
}
export default notify;