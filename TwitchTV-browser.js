function TwitchTvBrowser($input, $output, startChannels) {
    var $form = $input.find('.js-search-form');
    var $title = $form.find('.js-title');

    var $channelsList = $output.find('.js-channels-list');
    var $clearButton = $output.find('.clearButton');
    var isLoaded = false;

    init();

    function init() {
        $form.on('submit', function(e) {
            searchChannel($title.val());
            e.preventDefault();
        });

        $clearButton.on('click', function() {
            clearChannelsList();
            showStartChannels();
        });

        showStartChannels();
    }

    function showStartChannels() {
        isLoaded = false;
        showHideLoader();
        GetChannelsData(startChannels, showChannels);
    }

    function showChannels(channels) {
        channels.forEach(function(channel) {
            renderChannel(channel);
        });
        isLoaded = true;
        showHideLoader();
    }

    function showHideLoader() {
        var $loader = $('#loaderImg');
        if (isLoaded) {
            $loader.addClass('hidden');
        } else {
            $loader.removeClass('hidden');
        }
    }

    function renderChannel(channelData) {
        var channelContainer;
        var channelContent;
        var channelTitle;
        var channelStatusLink;
        var iconImg;
        var description;
        var textElements;
        var textElementsBlock;
        var imageBlock;

        channelContainer = document.createElement('div');
        channelContainer.classList.add('channel-container');

        channelContent = document.createElement('div');
        channelContent.classList.add('row');
        channelContainer.appendChild(channelContent);

        channelTitle = document.createElement('h4');
        channelTitle.innerText = channelData.name;

        channelStatusLink = document.createElement('a');
        channelStatusLink.href = 'https://www.twitch.tv/' + channelData.name;
        channelStatusLink.target = '_blank';

        iconImg = document.createElement('img');
        iconImg.classList.add('channel-thumbnail', 'img-responsive', 'center-block');

        description = document.createElement('p');
        description.classList.add('channel-description');

        if (channelData.stream) {
            channelStatusLink.innerText = 'On Air';
            channelStatusLink.classList.add('btn', 'btn-online');
            iconImg.src = channelData.stream.icon;
            description.innerText = channelData.stream.description;
        } else if (channelData.error) {
            channelStatusLink.innerText = 'Error';
            channelStatusLink.classList.add('btn', 'btn-danger');
            iconImg.src = 'https://d30y9cdsu7xlg0.cloudfront.net/png/45088-200.png';
            description.innerText = channelData.error.description;
        } else {
            channelStatusLink.innerText = 'Offline';
            channelStatusLink.classList.add('btn', 'btn-offline');
            iconImg.src = 'https://d30y9cdsu7xlg0.cloudfront.net/png/45081-200.png';
            description.innerText = '';
        }

        textElements = [channelTitle, channelStatusLink, description];
        textElementsBlock = document.createElement('div');
        textElementsBlock.classList.add('col-sm-8');
        textElements.forEach(function(value) {
            textElementsBlock.appendChild(value);
        });

        imageBlock = document.createElement('div');
        imageBlock.classList.add('col-sm-4');
        imageBlock.appendChild(iconImg);
        channelContent.appendChild(textElementsBlock);
        channelContent.appendChild(imageBlock);

        $channelsList.append(channelContainer);
    }

    function searchChannel(channelName) {
        if (isLoaded) {
            clearChannelsList();
            isLoaded = false;
            showHideLoader();
            GetChannelsData([channelName], showChannels);
            $clearButton.removeClass('hidden');
            $title.val('');
        }
    }

    function clearChannelsList() {
        $channelsList.empty();
        $clearButton.addClass('hidden');
    }
}
