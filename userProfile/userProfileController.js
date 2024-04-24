function viewProfile(id, name){
    console.log('yoo');
    model.app.page = "userProfile";
    console.log(id, name);
    model.input.userPage = {id:id, name:name};
    updateView();
}

