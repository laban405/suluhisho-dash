import React , {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const BankReportsContext = createContext();

export const BankReportsProvider = (props) => {
    const [bankReports, setBankReports] = useState([])
    
useEffect(() => {
    (() => {
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            timeout: 30000
        })
         instance.get('/v1/reports').then((res) => {
            setBankReports(res.data)
        }).catch((err) => {
            console.log(err)
        })
    })();
}, [])


    return (
        <BankReportsContext.Provider value={{bankReports, setBankReports}}>
            {props.children}
        </BankReportsContext.Provider>
    )
}