import { useEffect } from "react";

export function Receiver() {

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'receiver' }));
        }
        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            let pc: RTCPeerConnection | null = null;
            if(message.type === 'createOffer'){
                const pc = new RTCPeerConnection();
                pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer); 
                socket.send(JSON.stringify({ type: 'createAnswer', sdp: pc.localDescription }));
            }
        }
    })


    return <div>
        Receiver
    </div>
}