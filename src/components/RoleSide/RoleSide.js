import { useState, createContext } from 'react';
import { publicRoutes } from '../../routes';

 const RouterContext = createContext();


function RoleSide({children}){
    const [role, setRole] = useState('Student');
    const [router, setRouter] = useState([]);
    
    useState(() =>{
        switch (role) {
            case 'Student':
                setRouter(publicRoutes)
                break;
            case 'Tutor':
                break;
            case 'Admin':
                break;
            default:
                break;
        }
    }, [])
    return (
        <RouterContext.Provider value={router}>
                {children}
        </RouterContext.Provider>        
    );
}

export {RoleSide, RouterContext};