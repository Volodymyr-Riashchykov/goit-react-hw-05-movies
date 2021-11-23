import React, { useState } from "react"
import s from "./Form.module.css"
import Button from "../Button/Button"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form({ searh }) {
    const [error, setError] = useState(null);
    const [searhs, setSearhs] = useState('');
    
    const handleSearh = e => {
        e.preventDefault();
        if (searhs.trim() === "") {
            setError(toast.error("Пустая строка"))
            return
        }
        searh(searhs);
        setSearhs("");
        if(error) {setError(null);}
    }

    const handleSearhReq = e => {
        setSearhs( e.currentTarget.value.toLowerCase())
    }
    
        return (
           
                < form onSubmit = { handleSearh } className={s.form}>
                    <Button />
                    
                    <label className={s.label}>
                        <input
                            className={s.input}
                            type = "text"
                            placeholder="Search"
                            value = {searhs}
                            onChange = {handleSearhReq}
                        />
                    </label>
                     <ToastContainer />
                </form>
           
        )
    }