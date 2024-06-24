import Sora, {
    type SoraConnection,
    type SignalingNotifyMessage,
    ConnectionSubscriber,
} from "sora-js-sdk";

class SoraClient {
    private label: string;

    private debug = false;

    private channelId: string;
    private metadata: { access_token: string };
    private options: object;

    private sora: SoraConnection;
    private connection: ConnectionSubscriber;

    constructor(
        label: string,
        signalingUrl: string,
        channelIdPrefix: string,
        channelIdSuffix: string,
        accessToken: string
    ) {
        this.label = label;

        this.sora = Sora.connection(signalingUrl, this.debug);
        this.channelId = `${channelIdPrefix}${channelIdSuffix}`;
        this.metadata = { access_token: accessToken };
        this.options = {};

        //    this.connection = this.sora.sendrecv(
        this.connection = this.sora.recvonly(
            this.channelId,
            this.metadata,
            this.options
        );

        this.connection.on("notify", this.onnotify.bind(this));
        this.connection.on("track", this.ontrack.bind(this));
        this.connection.on("removetrack", this.onremovetrack.bind(this));

        console.log("SoraClient init;" + label);
        console.log(this.sora);
    }

    async connect(): Promise<void> {
        await this.connection.connect();
    }

    async disconnect(): Promise<void> {
        await this.connection.disconnect();
        const localVideo = document.querySelector<HTMLVideoElement>(`#local-video`);
        if (localVideo !== null) {
            localVideo.srcObject = null;
        } else {
        }
        // お掃除
        const remoteVideos = document.querySelector(`#remote-videos`);
        if (remoteVideos) {
            remoteVideos.innerHTML = "";
        }
    }

    private onnotify(event: SignalingNotifyMessage): void {
        console.log("Notify on notify:" + event.connection_id + ":" + event.event_type);
        if (
            event.event_type === "connection.created" &&
            this.connection.connectionId === event.connection_id
        ) {
            //            console.log("Notify on notify:" + event.connection_id);
            //            console.log("Real", event);
            // start video
            //          const remoteVideos = document.querySelector(`#remote-videos`);
            //            console.log("Notity Play! ", remoteVideos)
            //            remoteVideos?.children[0].play()
        }
    }
    private ontrack(event: RTCTrackEvent): void {
        console.log("OnTrack!", event.track.kind, event);
        const stream = event.streams[0];
        const remoteVideoId = `remote-video-${stream.id}`;
        const remoteVideos = document.querySelector(`#remote-videos`);
        if (remoteVideos && !remoteVideos.querySelector(`#${remoteVideoId}`)) {
            //            console.log("Set Media Stream", typeof stream, "::", stream);
            const remoteVideo = document.createElement("video");
            remoteVideo.id = remoteVideoId;
            remoteVideo.style.border = "1px solid";
            remoteVideo.autoplay = true;
            remoteVideo.muted = true;
            remoteVideo.playsInline = true;
            //            remoteVideo.controls = false;
            remoteVideo.controls = true;
            remoteVideo.width = 320;
            remoteVideo.height = 240;

            //            remoteVideo.setAttribute("width", "" + window.innerWidth);
            //            remoteVideo.setAttribute("height", "" + window.innerHeight);
            //            console.log("video:", remoteVideo)

            const tracks = stream.getTracks();
            //            console.log("Tracks", tracks);
            try {
                remoteVideo.srcObject = stream;
            } catch (err) {
                console.log("SetMedia Error", err);
            }
            //           console.log("MeidaSrc:=", remoteVideo.src);
            //           console.log("MeidaSrcObject:=", remoteVideo.srcObject);
            remoteVideos.appendChild(remoteVideo);
        }
    }

    private onremovetrack(event: MediaStreamTrackEvent): void {
        const target = event.target as MediaStream;
        const remoteVideo = document.querySelector(`#remote-video-${target.id}`);
        if (remoteVideo) {
            document.querySelector(`#remote-videos`)?.removeChild(remoteVideo);
        }
    }
}

export default SoraClient;
