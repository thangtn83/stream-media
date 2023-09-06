import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Header from "../components/Header"
import { store } from "../app/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

const renderComponent = (component: React.ReactElement) => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>{component}</CookiesProvider>
      </BrowserRouter>
    </Provider>,
  )
}

describe("Header", () => {
  test("render header", () => {
    renderComponent(<Header />)
    const text = screen.getByText(/mern/i)
    expect(text).toBeInTheDocument()
  })
})
