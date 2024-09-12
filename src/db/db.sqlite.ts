const log = function (msg: any) {
    console.log(`<${new Date().toUTCString()}> [Database] ${msg}`)
}

import { Database } from 'bun:sqlite'

const db = new Database('sudoku.db.sqlite', { create: true })
db.exec('PRAGMA journal_mode = WAL;')
