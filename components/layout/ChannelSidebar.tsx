"use client";

import { Channel, Server } from "@/types";
import {
    Volume2,
    Mic,
    MicOff,
    Video,
    VideoOff,
    MonitorUp,
    PhoneOff,
    Settings
} from "lucide-react";

interface ChannelSidebarProps {
    server: Server | undefined;
    channels: Channel[];
    activeChannel: string | null;
    previewChannel: string | null;
    onChannelClick: (id: string) => void;

    username: string;
    isMuted: boolean;
    wantsVideo: boolean;
    isScreenSharing: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    onToggleScreenShare: () => void;
    onLeaveChannel: () => void;
    onOpenSettings?: () => void;
}

export default function ChannelSidebar({
    server,
    channels,
    activeChannel,
    previewChannel,
    onChannelClick,
    username,
    isMuted,
    wantsVideo,
    isScreenSharing,
    onToggleAudio,
    onToggleVideo,
    onToggleScreenShare,
    onLeaveChannel,
    onOpenSettings,
}: ChannelSidebarProps) {
    return (
        <div className="w-60 bg-[#2b2d31] flex flex-col shrink-0">

            {/* Header */}
            <header className="h-12 px-4 flex items-center font-bold border-b border-[#1f2023] hover:bg-[#35373c] transition">
                {server?.name}
            </header>

            {/* Channels */}
            <div className="flex-1 p-2 overflow-y-auto">
                <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase">
                    Voice Channels
                </div>

                {channels.map(channel => (
                    <button
                        key={channel.id}
                        onClick={() => onChannelClick(channel.id)}
                        className={`
              w-full flex items-center gap-2 px-2 py-1.5 rounded
              transition-colors cursor-pointer
              ${activeChannel === channel.id ? "bg-[#3f4147] text-white" : "text-gray-400 hover:bg-[#35373c] hover:text-gray-200"}
              ${previewChannel === channel.id ? "bg-[#35373c]/60" : ""}
            `}
                    >
                        <Volume2 size={16} className="shrink-0 opacity-70" />
                        <span className="truncate font-medium">{channel.name}</span>
                    </button>
                ))}
            </div>

            {/* User Controls */}
            <div className="h-[56px] bg-[#232428] px-2 flex items-center gap-1 border-t border-[#1f2023] cursor-pointer">

                {/* Avatar */}
                <div className="relative w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm shrink-0">
                    {username[0]?.toUpperCase()}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#232428] rounded-full" />
                </div>

                {/* Username */}
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate cursor-pointer">{username}</div>
                </div>

                {/* Controls */}
                <ControlButton
                    active={!isMuted}
                    danger={isMuted}
                    onClick={onToggleAudio}
                    title="Mute"

                >
                    {isMuted ? <MicOff className="cursor-pointer" size={18} /> : <Mic className="cursor-pointer" size={18} />}
                </ControlButton>

                <ControlButton
                    active={wantsVideo}
                    danger={!wantsVideo}
                    onClick={onToggleVideo}
                    title="Camera"
                >
                    {wantsVideo ? <Video className="cursor-pointer" size={18} /> : <VideoOff className="cursor-pointer" size={18} />}
                </ControlButton>

                <ControlButton
                    active={isScreenSharing}
                    onClick={onToggleScreenShare}
                    title="Share Screen"
                >
                    <MonitorUp className="cursor-pointer" size={18} />
                </ControlButton>

                {activeChannel && (
                    <ControlButton danger onClick={onLeaveChannel} title="Disconnect">
                        <PhoneOff className="cursor-pointer" size={18} />
                    </ControlButton>
                )}

                <ControlButton onClick={onOpenSettings} title="Settings">
                    <Settings className="cursor-pointer" size={18} />
                </ControlButton>
            </div>
        </div>
    );
}

/* Reusable control button */
function ControlButton({
    children,
    onClick,
    active,
    danger,
    title,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    danger?: boolean;
    title?: string;
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`
        p-2 rounded transition
        ${danger ? "text-red-500 hover:bg-red-500/10" : ""}
        ${active ? "text-green-500" : "text-gray-400 hover:text-white hover:bg-[#3f4147]"}
      `}
        >
            {children}
        </button>
    );
}
