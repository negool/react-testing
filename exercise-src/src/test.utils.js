import React from 'react';
import {render} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from './theme';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const AllTheProviders = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Switch>
          <Route path="/*" exact>
          {children}
          </Route>
        </Switch>
     </BrowserRouter>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}