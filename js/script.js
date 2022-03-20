const init = () => {
    const wrapper = document.querySelector('.wrapper')
    const coverImg = wrapper.querySelector('.img-cover img')
    const addBtn = wrapper.querySelector('.fa-cog')
    const dialog = wrapper.querySelector('dialog')
    const header = wrapper.querySelector('.header')
    const likeBtn = header.querySelector('#like')
    const followBtn = header.querySelector('#follow')
    const closeBtn = wrapper.querySelector('#close')
    
    let state = {
        liked: false,
        followed: false,
    }

    if (window.localStorage.getItem('profile')) {
        state = JSON.parse(window.localStorage.getItem('profile'))
        
        if (state.liked) {
            likeBtn.textContent = 'Liked'
            likeBtn.classList.add('clicked')
        }

        if (state.followed) {
            followBtn.textContent = 'Following'
            followBtn.classList.add('clicked')
        }
    }

    closeBtn.addEventListener('click', e => dialog.remove())

    header.addEventListener('click', e => {
        const target = e.target // the btn that triggers the event listener

        if (e.target.id == 'like') {
            updateInfo(e)
        }

        if (e.target.id == 'follow') {
            updateInfo(e)
        }
    })

    addBtn.addEventListener('click', e => {
        const input = document.createElement('input')
        input.type = 'file'
        input.click()

        input.onchange = function(e) {
            if (e.target.files[0]) {
                const reader = new FileReader
                const file = this.files[0]
                const type = file.type

                if (type.split('/')[0] == 'image') {
                    reader.onload = function() {
                        coverImg.src = reader.result
                    }

                    reader.readAsDataURL(file)
                }
            }
        }

        input.remove()
    })

    document.onscroll = function(e) {
        if (document.documentElement.scrollTop != 0) {
            if (dialog && dialog.open) {
                dialog.style.display = 'none'
                dialog.remove()
            }
        }
        
        if ((window.pageYOffset + window.innerHeight) >= document.body.offsetHeight && document.documentElement.offsetWidth <= 1366) {
            if (wrapper.contains(dialog)) {
                if (typeof dialog.showModal === 'function') {
                    dialog.style.display = 'block'
                    dialog.showModal()
                } else {
                    console.log('Dialog API is not supported...')
                }
            }
        }
    }

    function updateInfo(event) {
        const target = event.target

        if (target) {
            if (target.id == 'like') {
                if (target.textContent != 'Liked') {
                    target.textContent = 'Liked'
                    target.classList.add('clicked')
                    state.liked = true
                } else {
                    target.textContent = 'Like'
                    target.classList.remove('clicked')
                    state.liked = false
                }
            }

            if (target.id == 'follow') {
                if (target.textContent != 'Following') {
                    target.textContent = 'Following'
                    target.classList.add('clicked')
                    state.followed = true
                } else {
                    target.textContent = 'Follow'
                    target.classList.remove('clicked')
                    state.followed = false
                }
            }
        }

        window.localStorage.setItem('profile', JSON.stringify(state))
    }
}

window.onload = init