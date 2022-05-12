class User2 {
  #url;
  constructor(url) {
    this.#url = url
  }

  async create(user) {
    const headers = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user) }
      
    if (!user.first_name || !user.last_name) {
      console.error('Error: first_name and last_name is required.')
      return 'Error: first_name and last_name is required.'
    }

    let msg

      await fetch(this.#url, headers)
      .then(resp => resp.json())
      .then(data => msg = data)
      .catch(err => msg = err.message)

      console.log(msg)
      return msg
  }

  async read(id) {
    let msg

      await fetch(this.#url + `/${id}`, { method: 'GET', mode: 'cors' })
      .then(resp => resp.json())
      .then(data => msg = data)
      .catch(err => msg = err.message)

      console.log(msg)
      return msg
  }

  async update(user, id) {
    const headers = {
      method: 'PATCH',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user) }

      if (!user.first_name || !user.last_name) {
        console.error('Error: first_name and last_name is required.')
        return 'Error: first_name and last_name is required.'
      }

      let msg

      await fetch(this.#url + `/${id}`, headers)
      .then(resp => resp.json())
      .then(data => msg = data)
      .catch(err => msg = err.message)

      console.log(msg)
      return msg
  }

  async remove(id) {
    let msg
    try {
      await fetch(this.#url + `/${id}`, { method: 'DELETE', mode: 'cors' })
      .then(resp => resp.json())
      .then(data => msg = 'Successfully deleted')
    } catch (err) {
      msg = err.message
    }

      console.log(msg)
      return msg
  }
}

export default User2