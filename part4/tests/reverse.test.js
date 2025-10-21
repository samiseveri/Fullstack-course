const { reverse } = require('./utils/for_testing')

test('reverse of a', () => {
  expect(reverse('a')).toBe('a')
})

test('reverse of react', () => {
  expect(reverse('react')).toBe('tcaer')
})
