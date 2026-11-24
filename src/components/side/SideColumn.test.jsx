import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import SideColumn from './SideColumn.jsx'
import { profile } from '../../data/profile.js'

afterEach(cleanup)

it('has resume download link and fires callbacks', () => {
  const onSearch = vi.fn()
  const onCopyEmail = vi.fn()
  render(<SideColumn onSearch={onSearch} onCopyEmail={onCopyEmail} />)
  const resume = screen.getByRole('link', { name: 'Download resume' })
  expect(resume).toHaveAttribute('href', profile.resume)
  expect(resume).toHaveAttribute('download')
  fireEvent.click(screen.getByRole('button', { name: /Search/ }))
  fireEvent.click(screen.getByRole('button', { name: profile.email }))
  expect(onSearch).toHaveBeenCalledTimes(1)
  expect(onCopyEmail).toHaveBeenCalledTimes(1)
})

it('shows the photo by default without the placeholder caption', () => {
  render(<SideColumn />)
  const img = screen.getByRole('img', { name: 'Dheeraj T.P' })
  expect(img).toHaveAttribute('width', '88')
  expect(screen.queryByText('DT')).toBeNull()
  expect(screen.queryByText('photo soon')).toBeNull()
})

it('falls back to the monogram when photo is falsy', () => {
  render(<SideColumn photo={null} />)
  expect(screen.queryByRole('img', { name: 'Dheeraj T.P' })).toBeNull()
  expect(screen.getByText('DT')).toBeInTheDocument()
})
