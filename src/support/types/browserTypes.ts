

export interface CreateTabProps {
    url:string;
}

export interface ShowTabProps {
    id:number;
}

export interface UpdateBoundingBoxProps {
    bbox: {
        height: number;
        width: number;
        x: number;
        y: number;
    }
}