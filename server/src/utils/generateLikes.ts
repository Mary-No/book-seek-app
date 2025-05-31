import seedrandom from "seedrandom";

export function generateLikes(avgLikes: number, seed: string): number {
    const base = Math.floor(avgLikes);
    const rng = seedrandom(seed);
    const rnd = rng();
    return base + (rnd < avgLikes - base ? 1 : 0);
}