const addForm = document.querySelector('form');
const nameInput = document.querySelector('input');
const container = document.querySelector('section');

function viewList(res) {
    container.innerHTML = " "
    nameInput.value = " "
    res.data.forEach((monkeyName, index) => {
        container.innerHTML += `<p name="${index}">${monkeyName}</p>`
    })

    document.querySelectorAll('p').forEach(element => {
        const indexValue = element.getAttribute('name')

        element.addEventListener('click', () => {
            axios
                 .delete(`/api/monkeys/${indexValue}}`)
                 .then(res => {
                    viewList(res);
                 })
        })
    })
}

function submitHandler(evt) {
    evt.preventDefault();

    axios
        .post('/api/monkeys', { name: nameInput.value })
        .then(res => {
            view(res)
        })
        .catch(err => {
            nameInput.value = ''

            const notif = document.createElement('aside')
            notif.innerHTML = `<p>${err.response.data}</p>
            <button class="close">close</button>`
            document.body.appendChild(notif)

            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentNode.remove()
                })
            })
        })
}


axios
    .get('/api/monkeys')
    .then(res => {
        putTheThingInTheView(res)
    })

addForm.addEventListener('submit', submitHandler)