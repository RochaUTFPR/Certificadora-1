import React, { createContext, useState, useContext,useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [User, setUser] = useState({
        "nome": "Joaquim",
        "nivel": 1,
        "pontos": 0,
        "Questions": {
            "1": {
                "attempt": 0,
                "success": "",
            },
            "2": {
                "attempt": 0,
                "success": "",
            },
            "3": {
                "attempt": 0,
                "success": "",
            },
            "4": {
                "attempt": 0,
                "success": "",
            },
            "5": {
                "attempt": 0,
                "success": "",
            },
            "6": {
                "attempt": 0,
                "success": "",
            },
            "7": {
                "attempt": 0,
                "success": "",
            },
            "8": {
                "attempt": 0,
                "success": "",
            },
            "9": {
                "attempt": 0,
                "success": "",
            },
            "10": {
                "attempt": 0,
                "success": "",
            }
        }
    });

    useEffect(() => {
        console.log(User)
    }, [User]);

    const updateUserAttribute = (key, value) => {
        setUser(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const updateQuestionAttribute = (questionId, attribute, value) => {
        setUser(prevState => ({
            ...prevState,
            Questions: {
                ...prevState.Questions,
                [questionId]: {
                    ...prevState.Questions[questionId],
                    [attribute]: value,
                }
            }
        }));
    };

    return (
        <AppContext.Provider value={{ User, updateUserAttribute, updateQuestionAttribute }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}