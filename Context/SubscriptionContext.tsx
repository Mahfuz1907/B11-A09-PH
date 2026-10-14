'use client'

import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface ContextTypes{
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    resPass: string,
    setResPass: Dispatch<SetStateAction<string>>
}

export const SubscriptionContext = createContext<ContextTypes>({
    password: '',
    setPassword: () => {},
    resPass: '',
    setResPass: () => {}
})

const SubscriptionProvider = ({children}:{children:ReactNode}) => {
    const [password, setPassword] = useState<string>('')
    const [resPass, setResPass] = useState<string>('')

    const sharedData = {
        password,
        setPassword,
        resPass,
        setResPass
    }

    return (
        <SubscriptionContext.Provider value={sharedData}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export default SubscriptionProvider;