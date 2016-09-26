var $channelsList;
var startChannels;
startChannels = ['freecodecamp', 'BobRoss', 'NoelleMBrooks', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

$(document).ready(function() {
    $channelsList = $('.js-channels-list');
    showStartChannels();
});

function showStartChannels() {
    startChannels.forEach(function(value) {
        showChannel(value);
    });
}

function showChannel(channelName) {
    // render container
    var channelContainer;
    channelContainer = document.createElement('div');
    channelContainer.classList.add('container', 'well');

    var channelTitle;
    channelTitle = document.createElement('a');
    channelTitle.href = 'https://www.twitch.tv/' + channelName;
    channelTitle.target = '_blank';
    channelTitle.innerText = channelName;
    channelContainer.appendChild(channelTitle);

    var url = 'https://api.twitch.tv/kraken/streams/' + channelName + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?';
    var channelData;
    channelData = null;
    $.getJSON(url, function(data) {
        if (data.stream) {
            channelData = {
                description: data.stream.channel.status,
                icon: data.stream.preview.medium
            };


        }
        var channelStatus;
        var iconImg;
        var description;
        channelStatus = document.createElement('p');
        channelContainer.appendChild(channelStatus);
        iconImg = document.createElement('img');
        channelContainer.appendChild(iconImg);
        description = document.createElement('p');
        channelContainer.appendChild(description);


        if (channelData) {
            channelStatus.innerText = 'On Air';
            iconImg.src = channelData.icon;
            description.innerText = channelData.description;
        } else {
            channelStatus.innerText = 'Offline';
            iconImg.src = 'https://d30y9cdsu7xlg0.cloudfront.net/png/45081-200.png';
            description.innerText = '';
        }
    });

    $channelsList.append(channelContainer);
}

function renderChannel(channelData){

}