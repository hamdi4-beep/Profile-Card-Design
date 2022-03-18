const init = () => {
    const wrapper = document.querySelector('.wrapper')
    const coverImg = wrapper.querySelector('.img-cover img')
    const addBtn = wrapper.querySelector('.fa-cog')
    const angleUp = wrapper.querySelector('.fa-angle-up')

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
            const dialog = document.querySelector('dialog')
            angleUp.style.display = 'block'
            
            if (dialog) {
                dialog.style.display = 'none'
                dialog.close()
            }
        } else {
            angleUp.style.display = 'none'
        }
        
        if ((window.pageYOffset + window.innerHeight) >= document.body.offsetHeight) {
            const dialog = document.querySelector('dialog')
            dialog.style.display = 'block'
            
            if (typeof dialog.showModal === 'function') {
                dialog.showModal()
            } else {
                alert('Dialog API is not supported...')
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