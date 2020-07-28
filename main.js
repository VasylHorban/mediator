 class User {
     constructor(data) {
         this.name = data.name
         this.room = null
     }
     send(message, to) {
         this.room.send(message, this, to)
     }
     recive(message, from) {
         console.log(`${message} . (from ${from.name} to ${this.name})`)
     }
 }

 class ChatRoom {
     constructor() {
         this.users = {}
     }
     register(user) {
         this.users[user.name] = user
         user.room = this
     }
     send(message, from, to) {
         if (to) {
             to.recive(message, from)
         } else {
             for (let key in this.users) {
                 if (this.users[key] != from) {
                     console.log(this.users[key])
                     this.users[key].recive(message, from)
                 }
             }

         }
     }
 }
 let users = [
    new User({
         name: 'Vasyl'
     }),
    new User({
         name: 'Andrew'
     }),
    new User({
         name: 'Taras'
     }),
    new User({
         name: 'Mykhola'
     }),
    new User({
         name: 'Ivan'
     }),
];



 ////
 let me = new User({
     name: 'Vasya'
 })
 ////

 showFriendsList(users)

 function showFriendsList(arr) {
     let out = '<ul>';
     arr.forEach((person, index) => {
         out += `<li data-index='${index}'>${person.name} <span class ='btn'>+</span></li>`
     })
     document.querySelector('#friends').innerHTML = out + '</ul>'
 }

 document.querySelector('#friends').addEventListener('click', event => {
     if (event.target.classList.contains('btn')) {
         let index = event.target.parentElement.getAttribute('data-index');
         const chatRoom = new ChatRoom();
         chatRoom.register(users[index])
         chatRoom.register(me)
         console.log(chatRoom)
         chatWindow(index);
         chatModule.init()

     }
 })


 function chatWindow(i) {
     let div = document.createElement('div')
     div.style = 'background : lightyellow; position: absolute; margin: 0 auto';
     div.innerHTML = `<h3>Chating with : ${users[i].name}</h3><input class='text' type='text'><button>Send</button>`;
     document.querySelector('body').append(div)
 }


 const chatModule = (function () {
     let message;
     function innitialHtml() {
         message = document.querySelector('.text').textContent;
         document.querySelector('button').onclick = send;
         console.log(message)
     }

     function send() {
         me.send(message)
         console.log(message)
     }

     function init() {
         innitialHtml()
     }
     return {
         init: init
     }
 })()
