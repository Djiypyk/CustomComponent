import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Store from './store/store'
import App from './App'
import './index.css'

interface State {
	store: Store
}

const store = new Store()

export const Context = createContext<State>({ store })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Context.Provider value={{ store }}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Context.Provider>,
)
