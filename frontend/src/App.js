import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-4'>
        <Container>
          {/* Main Page Route */}
          <Route exact path='/' component={HomeScreen} />
          {/* Detail Page Route by ID */}
          <Route path='/product/:id' component={ProductScreen} />
          {/* Cart Page Route by ID which is optional*/}
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
