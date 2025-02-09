import { createContext, useContext, useState } from "react";

const SigninContext = createContext();

//provide
const SigninProvider = ({ children }) => {
    const [formData, setFormData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    // console.log(formData);
    
    const submitData = () => {

    }

    return (
        <SigninContext.Provider value={{ formData, setFormData, finalData, setFinalData, submitData }}>
            {children}
        </SigninContext.Provider>
    )
}

//consumer
function useOwner() {
    return useContext(SigninContext);
}

export { useOwner, SigninProvider, SigninContext };