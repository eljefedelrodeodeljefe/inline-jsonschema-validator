import App from '@/App.vue'
// import Vue from 'vue'

describe('App.vue', () => {
  it('has a created hook', () => {
    expect(typeof App.mounted).toBe('function')
  })
})
