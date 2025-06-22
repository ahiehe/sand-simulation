export type DrawCellInfo = {
    status: number;
    colorIndex: number;
}
export type DrawCell = {
    info: DrawCellInfo;
}

export const CreateDrawCell = (): DrawCell => {
    return {
        info: {
            status: 0,
            colorIndex: 1,
        }
    }
}