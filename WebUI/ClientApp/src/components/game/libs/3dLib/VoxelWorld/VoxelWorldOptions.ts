export default class VoxelWorldOptions {
    public cellSize: number;
    public tileSize: number;
    public tileTextureHeight: number;
    public tileTextureWidth: number;

    constructor(
        cellSize: number,
        tileSize: number,
        tileTextureHeight: number,
        tileTextureWidth: number
    ) {
        this.cellSize = cellSize;
        this.tileSize = tileSize;
        this.tileTextureHeight = tileTextureHeight;
        this.tileTextureWidth = tileTextureWidth;
    }
}
