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
    let likesCount = 0
    let followersCount = 0

    closeBtn.addEventListener('click', e => {
        dialog.close()
        dialog.remove()
    })

    header.addEventListener('click', e => {
        const _target = e.target

        if (e.target.id == 'like') {
            const h1 = likesContainer.querySelector('h1')

            if (likesCount == 0) {
                h1.textContent = ++likesCount
                _target.textContent = 'Liked'
                _target.classList.add('clicked')
            } else {
                h1.textContent = --likesCount
                _target.textContent = 'Like'
                _target.classList.remove('clicked')
            }
        }

        if (e.target.id == 'follow') {
            const h1 = followersContainer.querySelector('h1')
            
            if (followersCount == 0) {
                h1.textContent = ++followersCount
                _target.textContent = 'Followed'
                _target.classList.add('clicked')
            } else {
                h1.textContent = --followersCount
                _target.textContent = 'Follow'
                _target.classList.remove('clicked')
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
            if (dialog) {
                dialog.style.display = 'none'
                dialog.close()
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
}

window.onload = init