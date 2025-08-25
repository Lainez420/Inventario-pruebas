import { useEffect, useState } from "react";

export const useLocalStorage = (key:string):[string, boolean, (val:string) => void] => {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        try{
          if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            if(item) {
                setValue(item)
            }
          }
        }catch(error){  
                console.warn('Error reading localStorage key "${key}":', error)
        }finally{
            setIsLoading(false)
        }
      }, [key]);

      const setItem = (val:string) => {
        try{
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, val)
            }
        } catch(error){
            console.warn('Error setting localStorage key "${key}":', error);
        }finally{
            setValue(val)
        }
      }

      return [value, isLoading, setItem]
}