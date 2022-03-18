const init = () => {
    const wrapper = document.querySelector('.wrapper')
    const coverImg = wrapper.querySelector('.img-cover img')
    const addBtn = wrapper.querySelector('.fa-cog')
    const angleUp = wrapper.querySelector('.fa-angle-up')
    const dialog = wrapper.querySelector('dialog')
    const likesContainer = wrapper.querySelector('.likes-container')
    const followersContainer = wrapper.querySelector('.followers-container')
    const header = wrapper.querySelector('.header')
    const closeBtn = wrapper.querySelector('#close')
    let likesCount
    let followersCount
    let ID

    fetch('http://localhost:3000/profile').then(res => {
        if (res.ok) return res.json()
    }).then(data => {
        for (const user of data) {
            if (user.likes) {
                const likeBtn = header.querySelector('#like')
                const likes = likesContainer.querySelector('#likes')
                likes.textContent = user.likes
                likesCount = user.likes
                likeBtn.textContent = 'Liked'
                likeBtn.classList.add('clicked')
            }
        }
    })

    closeBtn.addEventListener('click', e => dialog.remove())

    header.addEventListener('click', e => {
        const target = e.target // the btn that triggers the event listener

        if (e.target.id == 'like') {
            if (target.textContent != 'Liked') {
                target.textContent = 'Liked'
                target.classList.add('clicked')
                updateInfo(target)
            } else {
                target.textContent = 'Like'
                target.classList.remove('clicked')
                updateInfo()
            }
        }

        if (e.target.id == 'follow') {
            if (target.textContent != 'Following') {
                target.textContent = 'Following'
                target.classList.add('clicked')
                updateInfo(target)
            } else {
                target.textContent = 'Follow'
                target.classList.remove('clicked')
                updateInfo()
            }
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

            angleUp.style.display = 'block'
        } else {
            angleUp.style.display = 'none'
        }
        
        if ((window.pageYOffset + window.innerHeight) >= document.body.offsetHeight) {
            if (wrapper.contains(dialog)) {
                if (typeof dialog.showModal === 'function') {
                    dialog.style.display = 'block'
                    dialog.showModal()
                } else {
                    alert('Dialog API is not supported...')
                }
            }
        }
    }

    angleUp.addEventListener('click', e => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })

    function updateInfo(elem) {
        if (elem) {
            console.log(elem)
        } else {
            console.log('No longer clicked!')
        }
    }
}

window.onload = init