
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Contextprovider} from "./context.jsx"

createRoot(document.getElementById('root')).render(

<Contextprovider>
        <App />
</Contextprovider>

)
