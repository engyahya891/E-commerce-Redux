import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // استدعاء المزود
import App from './App.jsx';
import './index.css';
import store from './Redux/store'; // استدعاء المخزن

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
