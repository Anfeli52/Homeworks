import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase/credentials";
import { useNavigate } from "react-router-dom";

interface UserCredentials {
    email: string,
    password: string,
}

interface AuthContextType {
    login: (credencials: UserCredentials) => Promise<void>;
    register: (credencials: UserCredentials) => Promise<any>;
    logout: () => void;
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async(credentials: UserCredentials) => {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        navigate('/home');
    }

    const register = async(credentials: UserCredentials) => {
        try {
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        signOut(auth);
        navigate('/login');
    }
    
    return (
        <AuthContext.Provider value={{ login, register, logout, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
}