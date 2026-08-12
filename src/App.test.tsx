import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Nomad Roasters landing page', () => {
  it('renders the main shop and subscription calls to action', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /Coffee for\s*the journey/i }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /shop coffee/i }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', { name: /月に一度/ }),
    ).toBeInTheDocument()
  })

  it('has section links for the primary navigation', () => {
    render(<App />)
    expect(screen.getAllByRole('link', { name: 'COFFEE' })[0]).toHaveAttribute(
      'href',
      '#coffee',
    )
    expect(screen.getAllByRole('link', { name: 'STORY' })[0]).toHaveAttribute(
      'href',
      '#story',
    )
  })

  it('adds a product to the cart and announces the updated count', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'エチオピア / グジをカートに追加' }),
    )

    expect(screen.getByRole('link', { name: 'CART (1)' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      'エチオピア / グジをカートに追加しました。カート内の商品は1件です。',
    )
  })
})
