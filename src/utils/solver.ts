// TODO: import CONFIG to set log level

const log = function (msg: any) {
    console.log(`<${new Date().toUTCString()}> [Solver] ${msg}`)
}

/**
 * This function will check if the grid is completely filled in
 * @param grid 9x9 board to check
 * @returns true if the grid is complete
 */
function check_grid_complete(grid: number[][]): boolean {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (grid[r][c] == 0) return false
        }
    }
    return true
}

/**
 * Fisher-Yates Sorting Algorithm.
 * Used to shuffle [1->9] integer array for use in solver
 * @returns shuffled integer array
 */
function shuffle_array(): number[] {
    let res = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[res[i], res[j]] = [res[j], res[i]]
    }
    return res
}

/**
 * This function will check if placement of val at (row,col) in the grid is valid
 * @param val integer value to check
 * @param row integer row grid coordinate
 * @param col integer column grid coordinate
 * @param grid 2d integer array sudoku board
 * @returns true if placement is valid
 */
function valid_placement(
    val: number,
    row: number,
    col: number,
    grid: number[][]
) {
    return (
        row_valid(val, row, grid) &&
        col_valid(val, col, grid) &&
        box_valid(val, row, col, grid)
    )
}
/**
 * Helper function for valid_placement(). Check if val is unique in row
 * @param val integer value to check
 * @param row integer row grid coordinate
 * @param grid 2d integer grid sudoku board
 * @returns true if placement is valid in row
 */
function row_valid(val: number, row: number, grid: number[][]): boolean {
    return grid[row].indexOf(val) == -1
}

/**
 * Helper function for valid_placement(). Check if val is unique in column
 * @param val integer value to check
 * @param col integer column grid coordinate
 * @param grid 2d integer grid sudoku board
 * @returns true if placement is valid in column
 */
function col_valid(val: number, col: number, grid: number[][]): boolean {
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] == val) return false
    }
    return true
}

/**
 * Helper function for valid_placement(). Check if val is unique in its 3x3 sub-grid
 * @param val integer value to check
 * @param row integer row grid coordinate
 * @param col integer column grid coordinate
 * @param grid 2s integer grid sudoku board
 * @returns true if placement if valid in sub-grid
 */
function box_valid(
    val: number,
    row: number,
    col: number,
    grid: number[][]
): boolean {
    // top-left corner coords of 3x3 box containing current (row,col)
    let start_row_box: number = row - (row % 3)
    let start_col_box: number = col - (col % 3)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[start_row_box + i][start_col_box + j] == val) return false
        }
    }
    return true
}

/**
 * Main sudoku board solver function using backtracking.
 * @param grid 2d integer grid sudoku board
 * @returns solved 2d integer grid sudoku board
 */
function backtrack_solver(grid: number[][]) {
    if (check_grid_complete(grid)) return grid
    for (let i = 0; i < 81; i++) {
        // find empty slot
        let row: number = Math.floor(i / 9)
        let col: number = i % 9
        if (grid[row][col] == 0) {
            let num_list = shuffle_array()
            for (let num of num_list) {
                if (valid_placement(num, row, col, grid)) {
                    grid[row][col] = num
                    if (backtrack_solver(grid)) return grid
                    grid[row][col] = 0
                }
            }
            return undefined
        }
    }
}

/**
 * Driver code for sudoku solver
 * @param grid_string string representation of board
 * @param type toggle solver algorithm (currently only supports backtracking)
 * @returns
 */
export default function solver(
    grid_string: string,
    type: string = 'backtrack'
): number[][] {
    log('Initializing solver')
    let size: number = Math.sqrt(grid_string.replaceAll(',', '').length)
    let grid: number[][] = [...Array(size)].map(() => Array(size))
    let index = 0
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            grid[r][c] = parseInt(grid_string.charAt(index++))
        }
    }
    let res: any
    if (type.toLowerCase() == 'backtrack') {
        log('Solving grid using [Backtracking]')
        let start_time = performance.now()
        res = backtrack_solver(grid)
        let end_time = performance.now()
        log(`Grid Solved in ${end_time - start_time}ms`)
    }
    return res
}

/**
 * This function counts the number of possible solutions for a given sudoku board
 * @param grid 2d integer grid sudoku board
 * @returns integer count of solutions
 */
export function solution_counter(grid: number[][]) {
    var counter: number = 0
    backtrack(grid)
    return counter

    function backtrack(grid: number[][]) {
        if (check_grid_complete(grid)) {
            counter++
            return undefined
        }
        for (let i = 0; i < 81; i++) {
            // find empty slot
            let row: number = Math.floor(i / 9)
            let col: number = i % 9
            if (grid[row][col] == 0) {
                for (let j = 1; j < 10; j++) {
                    if (valid_placement(j, row, col, grid)) {
                        grid[row][col] = j
                        if (backtrack(grid)) return grid
                        grid[row][col] = 0
                    }
                }
                return undefined
            }
        }
    }
}
