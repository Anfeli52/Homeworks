import { useMemo, useState } from 'react'
import LinkedList from './LinkedList'
import Node from './Node'

interface Song {
    nombre: string;
    Duracion: string;
    song: string;
}

const songs: Song[] = [
    { nombre: 'Wake Up - Three Days Grace',     Duracion: '3:24', song: '' },
    { nombre: 'Papercut - Linkin Park',         Duracion: '3:05', song: '' },
    { nombre: 'Two Faced - Linkin Park',        Duracion: '3:18', song: '' },
    { nombre: 'Like A Stone - Audioslave',      Duracion: '4:54', song: '' },
    { nombre: 'Dream On - Aerosmith',           Duracion: '4:28', song: '' },
    { nombre: 'Pinball Map - In Flames',        Duracion: '4:07', song: '' },
    { nombre: 'Windowpane - Opeth',             Duracion: '3:04', song: '' },
    { nombre: 'Get Some - Chevelle',            Duracion: '4:28', song: '' },
    { nombre: 'Stupify - Disturbed',            Duracion: '4:34', song: '' }
]

function songsNames() {
    // El useMemo lo que hace el memorizar la LinkedList para no tener que renderizarla a cada rato
    // https://www.youtube.com/watch?v=QQ0DkNkqvQU

    const list = useMemo(() => { 
        const linkedList = new LinkedList()
        songs.forEach((song) => linkedList.add(song))
        return linkedList
    }, [])

    const [currentNode, setCurrentNode] = useState<Node | null>(list.head)

    const nextSong = () => {
        setCurrentNode((prevNode) => {
            if (!prevNode) return list.head
            return prevNode.next ?? list.head
        })
    }

    const previousSong = () => {
        setCurrentNode((prevNode) => {
            if (!prevNode || prevNode === list.head) {
                let tail = list.head
                while (tail?.next) {
                    tail = tail.next
                }
                return tail
            }

            let current = list.head
            while (current?.next && current.next !== prevNode) {
                current = current.next
            }

            return current
        })
    }

    const currentSong = currentNode?.value as Song

    return (
        <div className="songs-container">
            <div className="player">
                <h1>Playlist</h1>
                <div className="current-song">
                    <h2 className="song-name">
                        { currentSong?.nombre }
                    </h2>
                    <p className="song-duration">Duración: { currentSong?.Duracion }</p>
                </div>
                <div className="controls">
                    <button className="btn btn-prev" onClick={previousSong}> ⏮ Anterior </button>
                    <button className="btn btn-next" onClick={nextSong}> Siguiente ⏭ </button>
                </div>
            </div>
        </div>
    )
}

export default songsNames