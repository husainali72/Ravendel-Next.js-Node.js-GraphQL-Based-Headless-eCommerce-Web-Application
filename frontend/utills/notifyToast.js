/* eslint-disable no-unused-vars */

import toast, { Toaster } from 'react-hot-toast';
const notify = (message,success) => {
    const options = {
        duration: 1000, // Set the duration as needed
      };
    if(success){
       return toast.success(message,options);
    }
    else{
        return toast.error(message,options);
    }
}
export default notify;