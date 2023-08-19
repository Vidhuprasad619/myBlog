const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
    location.assign('/admin/logout')
}
