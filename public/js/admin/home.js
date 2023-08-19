

const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
    location.assign('/admin/logout')
}


// const removePost=(postId)=> {
//     fetch(`/admin/removePost/${postId}`, {
//         method: 'POST',
//         headers:{
//             "Content-Type":"application/json"
//         },
//     })
//     .then(response => {
//         console.log(response);
//         if (response.ok) {
//             // Reload the page to reflect the updated list of posts
//             location.reload();
//         } else {
//             console.error('Error deleting post:', response.statusText);
//         }
//     })
//     .catch(error => {
//         console.error('Error deleting post:', error);
//     });
// }