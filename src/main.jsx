import ReactDOM from 'react-dom/client'
import './index.css'
import { SapsprintApp } from './SapsprintApp.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <SapsprintApp />
    </BrowserRouter>
    )
