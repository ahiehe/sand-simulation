export type DrawCellInfo = {
    status: number;
    colorIndex: number;
}
export type MaterialCell = {
    info: DrawCellInfo;
}

export const CreateMaterialCell = (): MaterialCell => {
    return {
        info: {
            status: 0,
            colorIndex: 0,
        }
    }
}