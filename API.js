function GetChannelsData(channels, onComplete) {
    var results;
    var pendingChannels;

    results = [];
    pendingChannels = channels.length;

    channels.forEach(function(value, index) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/streams/' + value + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?',
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function(json) {
                results[index] = composeResults(value, json);
            },
            error: function() {
                results[index] = 'something went wrong';
            },
            complete: function() {
                pendingChannels -= 1;
                if (pendingChannels === 0) {
                    onComplete(results);
                }
            }
        });
    });

    function composeResults(channelName, json) {
        var channelData = {
            name: channelName
        };
        if (json.error) {
            channelData.error = {
                description: json.message
            };
        } else if (json.stream) {
            channelData.stream = {
                description: json.stream.channel.status,
                icon: json.stream.preview.medium
            };
        }
        return channelData;
    }
}
