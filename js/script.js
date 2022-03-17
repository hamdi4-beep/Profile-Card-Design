const init = () => {
    const wrapper = document.querySelector('.wrapper')
    const coverImg = wrapper.querySelector('.img-cover img')
    const addBtn = wrapper.querySelector('.fa-cog')

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
        console.log(document.body.scrollTop)
    }
}

window.onload = init