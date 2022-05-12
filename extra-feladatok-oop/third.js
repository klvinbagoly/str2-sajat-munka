import User2 from "./second.js";

class Messenger extends User2 {
  constructor(url) {
    super(url)
  }

  message(message) {
    const display = document.querySelector('.message')
    display.textContent = message
    setTimeout(() => display.textContent = '', 5000)
  }

  createMessenger(user){
    this.create(user)
    .then(resp => this.message(resp?.id 
      ? "Successful data request: " + JSON.stringify(resp) 
      : "Error: " + JSON.stringify(resp)))
  }

  readMessenger(id) {
    this.read(id)
      .then(resp => this.message(resp.id 
        ? "Successful data request: " + JSON.stringify(resp) 
        : "Error: " + JSON.stringify(resp)))
  }

  updateMessenger(user, id) {
    this.update(user, id)
    .then(resp => this.message(resp?.id 
      ? "Successful data request: " + JSON.stringify(resp) 
      : "Error: " + JSON.stringify(resp)))
  }

  removeMessenger(id) {
    this.remove(id)
    .then(resp => this.message(resp))
  }
}

export default Messenger