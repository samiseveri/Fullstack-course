/** @vitest-environment jsdom */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it } from 'vitest'
import AnecdoteList from './AnecdoteList'
import { useAnecdoteStore } from '../store'

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: [
      { content: 'low votes', id: '1', votes: 1 },
      { content: 'high votes', id: '2', votes: 5 },
      { content: 'something else', id: '3', votes: 4 },
    ],
    filter: '',
  })
})

it('AnecdoteList receives the anecdotes sorted by votes', () => {
  render(<AnecdoteList />)

  const high = screen.getByText('high votes')
  const other = screen.getByText('something else')
  const low = screen.getByText('low votes')

  expect(high.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(other.compareDocumentPosition(low) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

it('AnecdoteList receives only the anecdotes that match the filter', () => {
  useAnecdoteStore.setState({ filter: 'votes' })
  render(<AnecdoteList />)

  expect(screen.getByText('high votes')).toBeTruthy()
  expect(screen.getByText('low votes')).toBeTruthy()
  expect(screen.queryByText('something else')).toBeNull()
})
