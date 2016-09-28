var startChannels = [
    'freecodecamp',
    'BobRoss',
    'NoelleMBrooks',
    'ESL_SC2',
    'OgamingSC2',
    'cretetion',
    'storbeck',
    'habathcx',
    'RobotCaleb',
    'noobs2ninjas'
];

$(document).ready(function() {
    TwitchTvBrowser($('#searchInputBlock'), $('#searchOutputBlock'), startChannels);
});
