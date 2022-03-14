import { useReducer, useEffect } from 'react';
import './App.css';
import { serviceReducer } from './store/reducers';
import { GET_SERVICE_DATA } from './store/actions';
import { Routes, Route } from "react-router-dom";
import Header from './header/Header';
import Service from './service/Service';
import Home from './home/Home';

function App() {

  const initialState = {
    services: [],
    selectedService: {}
  };

  const [state, dispatch] = useReducer(serviceReducer, initialState);

  useEffect(() => {
    const getServices = async () => {
      const response = await fetch("https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true");
      if (response.ok) {
        const data = await response.json();
        // Add the cycle hire menu item
        data.push({
          id: 'cycle-hire',
          name: "Cycle Hire",
          modeName: "zzz"
        });
        dispatch({ type: GET_SERVICE_DATA, data: data });
      }
    };

    try {
      if (!state.services.length) {
        getServices();
      }
    } catch (err) {
      console.log(err)
    }
  }, []);

  return (
    <>
      <Header state={state} dispatch={dispatch}></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="service/:id" element={<Service state={state} />} />
      </Routes>
    </>
  );
}

export default App;
