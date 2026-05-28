export class Song {
    name: string;
    artist: string;
    genre: string;
    album: string;
    albumArt: string;
    duration: number;
    popularity: number;

    constructor(name: string, artist: string, genre: string, album: string, albumArt: string, duration: number, popularity: number) {
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.album = album;
        this.albumArt = albumArt;
        this.duration = duration;
        this.popularity = popularity;
    }
}