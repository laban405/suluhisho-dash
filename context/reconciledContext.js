import React , {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const ReconciledContext = createContext();

export const ReconciledCardTransProvider = (props) => {
    const [reconciledTrans, setReconciledTrans] = useState([])

    useEffect(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            timeout: 30000,
          });
      
          instance
            .get('/v1/transactiontypes/reconciled')
            .then((response) => {
              const transactionData = response.data.result
                .filter((data) => !data.approved)
                .map((data) => [
                  moment(data.reconciledAt).format('LLL'),
                  data.transactionId,
                  data.cardNo,
                  data.amount,
                  data.reconciledBy,
                  data.transactionStatus,
                  <Button
                    disabled={false}
                    variant="outlined"
                    onClick={() => {
                      handleApprove(data);
                      setOpen(!open);
                    }}
                  >
                    Approve
                  </Button>,
                ]);
              setAllReconciled(transactionData);
              setCurrent(transactionData.slice(0, 10));
            })
            .catch((error) => console.log(error));
    })
    
    return (
        <ReconciledContext.Provider value={{reconciledTrans, setReconciledTrans}}>
            {props.children}
        </ReconciledContext.Provider>
    )
}