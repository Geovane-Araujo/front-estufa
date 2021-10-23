export default async (to, from, next) => {
  if (sessionStorage.getItem('token') === null) {
    sessionStorage.setItem('token', '')
  }
  if (to.name === 'Login') {
    next()
  } else if (to.name !== 'Login' && sessionStorage.getItem('token') === '') {
    next({ name: 'Login' })
  } else {
    next()
  }
}
