class User {
  static #url = 'http://localhost:3000/users';
  constructor() {
  }

  static create(user) {
    const headers = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user) }
      
    if (!user.first_name || !user.last_name) {
      console.error('Error: first_name and last_name is required.')
      return
    }

    fetch(this.#url, headers)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  static read(id) {
    fetch(this.#url + `/${id}`, { method: 'GET', mode: 'cors' })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  static update(user, id) {
    const headers = {
      method: 'PATCH',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user) }

      if (!user.first_name || !user.last_name) {
        console.error('Error: first_name and last_name is required.')
        return
      }

    fetch(this.#url + `/${id}`, headers)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  static remove(id) {
    fetch(this.#url + `/${id}`, { method: 'DELETE', mode: 'cors' })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }
}

export default User