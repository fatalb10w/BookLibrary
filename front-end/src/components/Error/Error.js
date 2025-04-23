import { ToastContainer, toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux";
import {selectErrorMessage, clearError} from "../../redux/slices/errorSlice";
import {useEffect} from "react";

const Error = () => {
    const errorMessage = useSelector(selectErrorMessage)
    const dispatch = useDispatch()
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(clearError())
        }
    }, [errorMessage, dispatch]);
    return <ToastContainer position="top-right" autoClose={2000}/>
}

export  default Error

