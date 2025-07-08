import {
    atom
} from "recoil"

const genre = atom({
    key: "genre",
    default: ""
})

const song = atom({
    key: "song",
    default: {}
})

const visualize = atom({
    key: "visualize",
    default: {}
})

export {
    genre,
    song,
    visualize
}
