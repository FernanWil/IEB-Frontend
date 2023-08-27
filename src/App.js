import './App.css';
import Product from './products/product';
import { FormProduct, FormDetails } from './components/forms';
import { Fragment} from 'react';

function App() {
  return (
    <Fragment>
       <div className='card mb-20 mx-auto border-dark' style={{width: "1000px",  marginTop:"10%"}}>
          <div className='card-body'>
             <ul className="nav nav-tabs">
                <li className="nav-item">
                   <a className="nav-link active" data-toggle="tab" href="#menu1">Productos</a>
                </li>
                <li className="nav-item">
                   <a className="nav-link" data-toggle="tab" href="#menu2">Detalles</a>
                </li>
                <li className="nav-item">
                   <a className="nav-link" data-toggle="tab" href="#menu3">Lista</a>
                </li>
             </ul>
             <div className="tab-content">
                <div className="tab-pane active" id="menu1">
                   <FormProduct/>
                </div>
                <div className="tab-pane container fade" id="menu2">
                     <FormDetails />
                </div>
                <div className="tab-pane container fade" id="menu3">
                   <Product/>
                </div>
             </div>
          </div>
       </div>
    </Fragment>
 );
}

export default App;
