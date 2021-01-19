function userInformationHTML(user) {
    console.log(user);
    return `<h5>${user.name} <span class='small-name'>(@<a href='${user.html_url}' target='_blank'>${user.login}</a>)</span></h5>
    <div class='gh-content'>
        <div class='gh-avatar'>
            <a href='${user.html_url}' target='_blank'>
                <img src='${user.avatar_url}' height='80' width='80' alt=${user.login}>
            </a>
        </div>
        <p>Followers: ${user.followers} | Following: ${user.following} <br> Projects: ${user.public_repos}</p>
    </div>`;
}

function fetchGitHubInfo(event) {
    var username = $('#gh-username').val();
    if (!username) {
        $('#gh-user-data').html(`<h5>Please enter a GitHub username!</h5>`).addClass('gh-alert');
        return;
    }
    $('#gh-user-data').html(`<div><img src='assets/img/1_CsJ05WEGfunYMLGfsT2sXA.gif' alt='loading...'></div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function (response) {
            var userData = response;
            $('#gh-user-data').removeClass('gh-alert').html(userInformationHTML(userData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $('#gh-user-data').html(`<h5>No info found for user ${username}!</h5>`);
            } else if (errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                $('#gh-user-data').html(`<h5>Too many API requests! Please wait until ${resetTime.toLocaleDateString()} before trying again.</h5>`);
            } else {
                console.log(errorResponse);
                $('#gh-user-data').html(`<h5>Error: ${errorResponse.responseJSON.message}!</h5>`);
            }
        }
    );
}

$(document).ready(fetchGitHubInfo);