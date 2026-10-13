'use client'

import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface ContextTypes{
    password: string,
    setPassword: Dispatch<SetStateAction<string>>
}

export const SubscriptionContext = createContext<ContextTypes>({
    password: '',
    setPassword: () => {}
})

const SubscriptionProvider = ({children}:{children:ReactNode}) => {
    const [password, setPassword] = useState<string>('')

    const sharedData = {
        password,
        setPassword
    }

    return (
        <SubscriptionContext.Provider value={sharedData}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export default SubscriptionProvider;