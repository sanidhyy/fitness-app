export type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
};

export type YoutubeVideo = {
  video?: {
    videoId?: string;
    title?: string;
    channelName?: string;
    thumbnails?: { url: string }[];
  };
};

export type YoutubeSearchResponse = {
  contents?: YoutubeVideo[];
};
