"use client"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Room } from '@/db/schema';
import {
    Call,
    CallControls,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from "./actions";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;


export const DevRoomVideo = ({room}:{room:Room}) => {
    const session=useSession();
    const [client,setClient]=useState<StreamVideoClient | null>(null);
    const [call,setCall]=useState<Call | null>(null);
    useEffect(() => {
        if(!room) return;
        if(!session.data) return;
        const userId=session.data.user.id;
        const client = new StreamVideoClient({ apiKey, user:{
            id:userId,
        }, 
        tokenProvider:()=>generateTokenAction()
    });
        setClient(client)
        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call);

        return()=>{
            call.leave();
            client.disconnectUser();
        }
    }, [session,room])

    return (
       client && call && ( 
        <StreamVideo client={client}>
            <StreamTheme>
              <StreamCall call={call}>
                <SpeakerLayout/>
                <CallControls/>
              </StreamCall>
            </StreamTheme>
        </StreamVideo>)
    );
};