let searchBtn = document.querySelector('#searchBth');
let searchUser = document.querySelector('#serchUser');
let ui = new UI();

searchBtn.addEventListener('click', (e) => {
    let userText = searchUser.value;
    if (userText != '') {
        // using fetch API
        fetch(`https://api.github.com/users/${userText}`)
            .then(result => result.json())
            .then(data => {
                // console.log(data);
                if (data.message == 'Not Found') {
                    // show alert
                } else {
                    // show profile
                    ui.showProfile(data);
                }
            });
    } else {
        // clear profile
    }
});