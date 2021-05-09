import React from 'react';

import {
} from 'react-bootstrap';

import Header from '../../components/Header';

const Main: React.FC = () => {

  const items = [
    {
      href: "/",
      name: "Home",
      isActive: true,
    },
  ]

  return (
    <div>
      <Header items={[...items]}/>

      <main>
        <article style={styles.container}>
          <div>
            Aqui será uma main page
          </div>
        </article>
      </main>      
    </div>
  );

}

const styles = {
  container: {
    maxWidth: 900,
    margin: "0 auto"
  }
}

export default Main;