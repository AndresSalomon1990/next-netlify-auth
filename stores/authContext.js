import { createContext, useState, useEffect } from "react"
import netlifyIdentity from 'netlify-identity-widget'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // listen to the login event (happened also after the sign up)
    netlifyIdentity.on('login', user => {
      setUser(user);
      netlifyIdentity.close(); // close the modal
      console.log('login event');
    });

    // listen to the logout event
    netlifyIdentity.on('logout', () => {
      setUser(null);
      console.log('logout event');
    });

    // listen to init event
    netlifyIdentity.on('init', (user) => {
      setUser(user);
      setAuthReady(true);
    });

    // init netlify identity connection
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    }
  }, []);

  const login = () => {
    netlifyIdentity.open(); // open a modal with the signup/login form
  }

  const logout = () => {
    netlifyIdentity.logout();
  }

  const context = {
    user,
    login,
    logout,
    authReady,
  }

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}
