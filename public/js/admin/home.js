


const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
    location.assign('/admin/logout')
}


const removePost=(postId)=> {
    fetch('/admin/removePost', {
        method: 'delete',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({postId:postId})
    }).then(res => res.json())
    .then(response=>{
        if (response.delete) {
            location.reload();
        } else {
            console.error('Error deleting post:', response.statusText);
        }
    })
    .catch(err => {
        console.error('Error deleting post:', err);
    })
}