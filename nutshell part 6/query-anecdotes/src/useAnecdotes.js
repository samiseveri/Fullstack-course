import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotify } from './NotificationContext'
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
}

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: (created) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(created))
      notify(`you created '${created.content}'`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })
}

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) => (anecdote.id === updated.id ? updated : anecdote)),
      )
      notify(`you voted '${updated.content}'`)
    },
  })
}
