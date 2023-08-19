const showImages=()=>{
    const imageInput=document.getElementById('image');
    const imagePreview=document.getElementById('imagePreview');
    imagePreview.innerHTML = '';
    const selectedImages=imageInput.files;
    for (let i = 0; i < selectedImages.length; i++) {
        const image=document.createElement('img');
        image.src=URL.createObjectURL(selectedImages[i]);
        image.alt = 'Image Preview';
        imagePreview.appendChild(image);

    }
}

const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
    location.assign('/logout')
}

