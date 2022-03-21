const init = () => {
    const wrapper = document.querySelector('.wrapper')
    const videoCoverWrapper = wrapper.querySelector('.video-cover-wrapper')
    const video = videoCoverWrapper.querySelector('video')
    const audio = videoCoverWrapper.querySelector('.sound')
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
            updateInfo(likeBtn)
        }

        if (state.followed) {
            updateInfo(followBtn)
        }
    }
    
    audio.addEventListener('click', () => {
        if (video.muted == false) video.muted = true
        else video.muted = !video.muted
    })

    closeBtn.addEventListener('click', e => dialog.remove())

    header.addEventListener('click', e => {
        const target = e.target // the btn that triggers the event listener
        updateInfo(target)
    })

    document.onscroll = function(e) {
        if (document.documentElement.scrollTop != 0) {
            if (dialog && dialog.open) {
                // dialog.style.display = 'none'
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

    function updateInfo(elem) {
        if (elem) {
            if (elem.id == 'like') {
                if (elem.textContent != 'Liked') {
                    elem.textContent = 'Liked'
                    elem.classList.add('clicked')
                    state.liked = true
                } else {
                    elem.textContent = 'Like'
                    elem.classList.remove('clicked')
                    state.liked = false
                }
            }

            if (elem.id == 'follow') {
                if (elem.textContent != 'Following') {
                    elem.textContent = 'Following'
                    elem.classList.add('clicked')
                    state.followed = true
                } else {
                    elem.textContent = 'Follow'
                    elem.classList.remove('clicked')
                    state.followed = false
                }
            }
        }

        window.localStorage.setItem('profile', JSON.stringify(state))
    }
}

window.onload = init