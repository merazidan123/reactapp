
import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Register from './Component/Register/Register';
import Home from './Component/Home/Home';
import NotFound from './Component/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
function App() {
  let routers= createBrowserRouter([
    {path:'/', element:<Layout/>,children:[
      {index:true,element:<Register/>},
      {path:'home',element:<Home/>},
      {path:'*',element:<NotFound/>}
    ]}
  ])
  return (
    <div className="App">
      <RouterProvider router={routers}/>
    </div>
  );
}

export default App;
