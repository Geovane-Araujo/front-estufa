export default async (to, from, next) => {
  if (to.name === 'Login') {
    next()
  } else if (to.name !== 'Login' && (sessionStorage.getItem('token') === '' || sessionStorage.getItem('token') === null)) {
    next({ name: 'Login' })
  } else {
    next()
  }
}
