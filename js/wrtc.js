/**
 * Created by 01Alchemist on 8/18/15.
 */
var config = {
    openSocket: function(config) {
        // https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md
        // This method "openSocket" can be defined in HTML page
        // to use any signaling gateway either XHR-Long-Polling or SIP/XMPP or WebSockets/Socket.io
        // or WebSync/SignalR or existing implementations like signalmaster/peerserver or sockjs etc.

        var channel = config.channel || location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
        var socket = new Firebase('https://webrtc.firebaseIO.com/' + channel);
        socket.channel = channel;
        socket.on('child_added', function(data) {
            config.onmessage(data.val());
        });
        socket.send = function(data) {
            this.push(data);
        };
        config.onopen && setTimeout(config.onopen, 1);
        socket.onDisconnect().remove();
        return socket;
    },
    onRemoteStream: function(media) {
        console.log('got media');
        var video = media.video;
        document.getElementById('holder').appendChild(video);
        video.play();
    },
    onRoomFound: function(room) {

    }
};

var _broadcast = new broadcast(config);

console.log('///////////////////////////////\n' +
            '// Receiving...              //\n' +
            '///////////////////////////////');

var display = document.getElementsByTagName('video')[0];

_broadcast.joinRoom({
    roomToken:'9b93a7ea-c55b-dd9d-843b-f427be404312',
    joinUser:'9b93a7ea-c55b-dd9d-843b-f427be404312'
})