import styles from '../styles/Guides.module.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../stores/authContext'

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch('/.netlify/functions/checkAuth', user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('You must log in to view this content.');
          }

          return res.json();
        })
        .then(data => {
          setGuides(data);
          setError(null);
        })
        .catch(err => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      { !authReady && <div>Loading...</div> }

      { error && (
        <div className={styles.error}>
          <p>{ error }</p>
        </div>
      )}

      { guides && guides.map(guide => (
        <div key={guide.title} className={styles.card}>
          <h3>{ guide.title }</h3>
          <h4>Written by { guide.author }</h4>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, dolorem pariatur quod recusandae debitis minima culpa perspiciatis similique aut cum est quisquam dolorum officiis nesciunt asperiores quas aspernatur vero adipisci!</p>
        </div>
      ))}
    </div>
  )
}
