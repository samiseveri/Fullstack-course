const { average } = require('../utils/for_testing')

test('average of one value is the value itself', () => {
  expect(average([1])).toBe(1)
})

test('average of many values is calculated right', () => {
  expect(average([1,2,3,4,5,6])).toBe(3.5)
})

test('average of empty array is zero', () => {
  expect(average([])).toBe(0)
})
