// TODO: import CONFIG to set log level

const log = function (msg: any) {
    if (global.v) console.log(`<${new Date().toUTCString()}> [Solver] ${msg}`)
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
 * @param verbose toggle for logger
 * @param gen_mode toggle for generating new board
 * @param type toggle solver algorithm (currently only supports backtracking)
 * @returns
 */
export default function solver(
    grid_string: string,
    verbose: boolean = false,
    gen_mode: boolean = false,
    type: string = 'backtrack'
): number[][] {
    global.v = verbose
    grid_string = grid_string.replaceAll(',', '')
    log('Initializing solver')
    let size: number = Math.sqrt(grid_string.length)
    let grid: number[][] = [...Array(size)].map(() => Array(size))
    let index = 0
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            grid[r][c] = parseInt(grid_string.charAt(index++))
        }
    }
    let res: any
    let solution_count = solution_counter(grid, true)

    if (!gen_mode && (solution_count === 2 || solution_count === 0)) {
        log(`Solver not run`)
        return res
    } else {
        log('Solving grid using [Backtracking]')
        let start_time = performance.now()
        res = backtrack_solver(grid)
        let end_time = performance.now()
        if (res === undefined) log(`No valid solution for grid`)
        else log(`Grid Solved in ${end_time - start_time}ms`)

        return res
    }

    // TODO: if implementing more solving algorithms
    function solver_toggle() {
        if (type.toLowerCase() == 'backtrack') {
        }
    }
}

/**
 * This function counts the number of possible solutions for a given sudoku board
 * @param grid 2d integer grid sudoku board
 * @param unique_break boolean flag to stops exec if solution is not unique
 * @returns integer count of solutions
 */
export function solution_counter(
    board: number[][],
    unique_break: boolean = false
) {
    var counter: number = 0
    log(`Counting solutions for ${board}`)
    backtrack(board)
    if (counter > 499) log(`Grid has 500+ solutions`)
    else
        log(
            `Grid has ${unique_break && counter > 0 && counter != 1 ? 'multiple' : counter} possible solutions`
        )
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
                        if (unique_break && counter > 1) break
                        if (counter > 499) break
                        if (backtrack(grid)) return grid
                        grid[row][col] = 0
                    }
                }
                return undefined
            }
        }
    }
}

// TODO: consolidate solver and counter into single call to reduce runtime
