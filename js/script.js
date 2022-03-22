const init = () => {
    const wrapper = document.querySelector('.wrapper')
    const bannerCoverWrapper = wrapper.querySelector('.banner-cover-wrapper')
    const video = bannerCoverWrapper.querySelector('video')
    const dialog = wrapper.querySelector('dialog')
    const header = wrapper.querySelector('.header')
    const likeBtn = header.querySelector('#like')
    const followBtn = header.querySelector('#follow')
    const closeBtn = wrapper.querySelector('#close')
    const dots = wrapper.querySelectorAll('.vid')
    const map = new Map

    const vids = [
        './media/wallpaper one.mp4',
        './media/wallpaper two.mp4',
        './media/wallpaper three.mp4',
        './media/wallpaper four.mp4'
    ]
    
    let state = {
        liked: false,
        followed: false,
    }

    for (let i=0; i<vids.length; i++) {
        map.set(dots[i], vids[i])
        dots[i].onclick = function(e) {
            if (video.src != vids[i]) {
                video.src = vids[i]
            }

            for (const dot of dots) {
                if (e.target == dot) {
                    e.target.classList.add('ticked')
                } else {
                    if (dot.classList.contains('ticked')) dot.classList.remove('ticked')
                }
            }
        }
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

    bannerCoverWrapper.addEventListener('click', e => {
        if (e.target.className == 'banner-cover') video.muted = !video.muted
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