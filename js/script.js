const init = () => {
    const wrapper = document.querySelector('.wrapper')
    const coverImg = wrapper.querySelector('.img-cover img')
    const addBtn = wrapper.querySelector('.fa-cog')
    const angleUp = wrapper.querySelector('.fa-angle-up')
    const dialog = wrapper.querySelector('dialog')
    const likesContainer = wrapper.querySelector('.likes-container')
    const followersContainer = wrapper.querySelector('.followers-container')
    const header = wrapper.querySelector('.header')
    const followers = followersContainer.querySelector('#followers')
    const likes = likesContainer.querySelector('#likes')
    const likeBtn = header.querySelector('#like')
    const followBtn = header.querySelector('#follow')
    const closeBtn = wrapper.querySelector('#close')
    let profile = window.localStorage.getItem('profile')

    if (profile) {
        profile = JSON.parse(profile)
        followers.textContent = profile.followers
        likes.textContent = profile.likes

        if (followers.textContent != 0) {
            followBtn.textContent = 'Following'
            followBtn.classList.add('clicked')
        }

        if (likes.textContent != 0) {
            likeBtn.textContent = 'Liked'
            likeBtn.classList.add('clicked')
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
                    console.log('Dialog API is not supported...')
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

    function updateInfo(event) {
        const followers = followersContainer.querySelector('#followers')
        const likes = likesContainer.querySelector('#likes')
        const target = event.target

        if (target) {
            if (target.id == 'like') {
                if (target.textContent != 'Liked') {
                    likes.textContent = 1
                    target.textContent = 'Liked'
                    target.classList.add('clicked')
                } else {
                    likes.textContent = 0
                    target.textContent = 'Like'
                    target.classList.remove('clicked')
                }
            }

            if (target.id == 'follow') {
                if (target.textContent != 'Following') {
                    followers.textContent = 1
                    target.textContent = 'Following'
                    target.classList.add('clicked')
                } else {
                    followers.textContent = 0
                    target.textContent = 'Follow'
                    target.classList.remove('clicked')
                }
            }

            window.localStorage.setItem('profile', JSON.stringify({
                followers: followers.textContent,
                likes: likes.textContent
            }))
        }
    }
}

window.onload = init