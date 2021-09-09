interface historyBody {
    position: string;
    period: {
        begin: Date;
        end: Date;
    }
}

export interface politicoCreateBody {
    fullName: string;
    socialName: string;
    currentPosition: string;
    history: historyBody[];
    status?: string;
    province: string;
    owner: string;
    officialInfoURL: string;
    imageURL: string;
}