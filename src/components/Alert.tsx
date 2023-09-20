import React, { useEffect } from 'react'

type AlertProps = {
    result: {
        success: boolean;
        message: string;
    }
    setResult: React.Dispatch<React.SetStateAction<{
        success: boolean;
        message: string;
    }>>
}


const Alert = ({ result,setResult }: AlertProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult({ success: false, message: "" });
        }, 2000);
        return () => clearTimeout(timer);
    }, [result, setResult]);

    return (
        <div className={result.success ? "alert alert-success mt-3" : "alert alert-danger mt-3"} role="alert">
            {result.message}
        </div>
    )
}

export default Alert
