import React from 'react'

import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

export const InApp = (props) => {
  return(
    <>
 <Router>
     <App/>
 </Router>

    </>
   )
  }
