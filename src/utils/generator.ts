import solver, { solution_counter } from './solver'

const log = function (msg: any) {
    console.log(`<${new Date().toUTCString()}> [Generator] ${msg}`)
}

const LEVEL_MAP = ['easy', 'medium', 'hard']

/**
 * This function creates "holes" in the complete board while maintaining a unique solution.
 *
 * @param board 2d integer grid solved sudoku board
 * @param tries number of failed attempts allowed
 * @returns the removed values, generated board
 */
function poke_holes(board: number[][], tries: number = 15): any[] {
    let holes = []
    while (tries > 0) {
        let row = Math.floor(Math.random() * 9)
        let col = Math.floor(Math.random() * 9)
        // restart loop if selected slot is already empty
        if (board[row][col] == 0) continue

        // backup value, incase the board doesn't have a unique solution
        let val_bkp = board[row][col]
        board[row][col] = 0
        if (solution_counter(board) != 1) {
            // count number of solutions to board
            // if no/>1 solution, undo change
            board[row][col] = val_bkp
            tries -= 1
        } else {
            // only one solution to board
            // create array of every deleted val
            holes.push({
                row: row,
                col: col,
                val: val_bkp,
            })
        }
    }
    return [board, holes]
}

/**
 * Driver code for sudoku board generator
 * 1. Create random complete sudoku board
 * 2. Poke holes in complete board
 * @param level integer difficulty for sudoku grid
 * @param size integer AxA grid size (future functionality)
 */
export default function generator(level: number = -1, size: number = 9) {
    if (level == -1) {
        level = Math.floor(Math.random() * 3)
        log(`Randomizing level difficulty: ${LEVEL_MAP[level]}`)
    }
    const zero_string =
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    log('Generating unique board for solution')
    let start_time = performance.now()
    // pass zero string to create a random unique board
    let solution: number[][] = solver(zero_string, false, true)
    let end_time = performance.now()
    log(`Unique board generated in ${end_time - start_time}ms`)

    let tries = level == 0 ? 1 : level == 1 ? 8 : 20
    let [game_board, removed_vals] = poke_holes(solution, tries)
    log(`${removed_vals.length} values removed from board`)
    return { game_board, solution, removed_vals }
}
