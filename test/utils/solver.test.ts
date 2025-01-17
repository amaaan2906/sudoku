import { expect, test, describe } from 'bun:test'

import solver, { counter } from '../../src/utils/solver'

// TODO: import from config
let verbose: boolean = false

/**
 * Test cases from http://sudopedia.enjoysudoku.com/
 */

describe('solution counts', () => {
    test('case 1: small count', () => {
        let c = [
            [0, 5, 0, 0, 0, 7, 3, 8, 0],
            [0, 1, 3, 0, 8, 0, 0, 4, 0],
            [7, 0, 0, 2, 4, 0, 0, 5, 6],
            [3, 0, 0, 8, 0, 0, 0, 6, 0],
            [0, 7, 0, 0, 0, 6, 0, 0, 0],
            [9, 0, 6, 7, 5, 2, 0, 3, 0],
            [0, 0, 0, 0, 2, 0, 0, 7, 0],
            [1, 3, 0, 0, 0, 8, 0, 0, 5],
            [0, 6, 2, 0, 7, 0, 8, 0, 4],
        ]
        expect(counter({ board_string: c.flat().join('') })).toBe(6)
    })

    test('case 2: large count', () => {
        let c = [
            [9, 0, 0, 0, 0, 0, 5, 2, 0],
            [0, 5, 6, 0, 9, 0, 0, 7, 0],
            [0, 0, 0, 2, 0, 0, 0, 6, 9],
            [0, 6, 7, 0, 0, 0, 0, 0, 2],
            [3, 9, 0, 0, 2, 7, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 7, 0, 3, 0, 0],
            [0, 1, 0, 3, 5, 0, 0, 9, 8],
        ]
        expect(counter({ board_string: c.flat().join('') })).toBe(125)
    })

    test('case 3: single solution', () => {
        let c = [
            [0, 5, 0, 0, 0, 7, 3, 8, 0],
            [0, 1, 0, 0, 0, 0, 0, 4, 7],
            [7, 0, 0, 2, 4, 0, 0, 5, 0],
            [0, 0, 0, 8, 0, 0, 0, 6, 0],
            [0, 7, 0, 0, 0, 6, 0, 0, 0],
            [9, 0, 0, 0, 5, 2, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 7, 0],
            [0, 3, 0, 0, 0, 8, 0, 0, 5],
            [0, 6, 2, 0, 7, 0, 8, 0, 4],
        ]
        expect(counter({ board_string: c.flat().join('') })).toBe(1)
    })

    test.todo('case 4: break solution', () => {
        let c = [
            [9, 0, 0, 0, 0, 0, 5, 2, 0],
            [0, 5, 6, 0, 9, 0, 0, 7, 0],
            [0, 0, 0, 2, 0, 0, 0, 6, 9],
            [0, 6, 7, 0, 0, 0, 0, 0, 2],
            [3, 9, 0, 0, 2, 7, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 7, 0, 3, 0, 0],
            [0, 1, 0, 3, 5, 0, 0, 9, 8],
        ] // 125
        expect(counter({ board_string: c.flat().join('') })).toBe(2)
    })
})

describe('valid solver', () => {
    test('case 1: completed puzzle', () => {
        let c =
            '187465293259713684643829157512936478834157926796284531978541362465372819321698745'
        let s =
            '187465293259713684643829157512936478834157926796284531978541362465372819321698745'
        expect(solver({ board_string: c }).toString().replaceAll(',', '')).toBe(
            s
        )
    })
    test('case 2: one empty square', () => {
        let c = [
            [9, 6, 1, 7, 2, 3, 4, 5, 8],
            [3, 4, 2, 5, 1, 8, 6, 7, 9],
            [8, 5, 7, 6, 4, 9, 3, 2, 1],
            [4, 1, 5, 2, 9, 6, 8, 3, 7],
            [6, 2, 3, 8, 7, 5, 9, 1, 4],
            [7, 9, 8, 4, 3, 1, 2, 6, 5],
            [5, 7, 6, 9, 8, 2, 1, 4, 3],
            [1, 8, 4, 3, 6, 7, 5, 9, 2],
            [2, 3, 9, 1, 0, 4, 7, 8, 6],
        ]
            .toString()
            .replaceAll(',', '')
        let s =
            '961723458342518679857649321415296837623875914798431265576982143184367592239154786'
        expect(solver({ board_string: c }).toString().replaceAll(',', '')).toBe(
            s
        )
    })
    test('case 3: naked singles', () => {
        let c = [
            [7, 4, 8, 6, 3, 0, 2, 1, 5],
            [6, 0, 9, 8, 1, 2, 4, 3, 0],
            [2, 1, 3, 4, 7, 5, 6, 9, 8],
            [4, 7, 1, 0, 6, 8, 9, 5, 2],
            [0, 6, 2, 9, 5, 1, 7, 4, 3],
            [9, 3, 5, 2, 4, 7, 8, 0, 1],
            [3, 2, 4, 5, 8, 0, 1, 7, 9],
            [1, 8, 6, 7, 9, 3, 5, 2, 0],
            [5, 0, 7, 1, 2, 4, 3, 8, 6],
        ]
            .toString()
            .replaceAll(',', '')

        let s =
            '748639215659812437213475698471368952862951743935247861324586179186793524597124386'
        expect(solver({ board_string: c }).toString().replaceAll(',', '')).toBe(
            s
        )
    })
    test('case 4: hidden singles', () => {
        let c =
            '002030008000008000031020000060050270010000050204060031000080605000000013005310400'
        let s =
            '672435198549178362831629547368951274917243856254867931193784625486592713725316489'
        expect(solver({ board_string: c }).toString().replaceAll(',', '')).toBe(
            s
        )
    })
})

describe('invalid solver', () => {
    test('case 1: empty grid', () => {
        let c =
            '000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 2: single number', () => {
        let c =
            '000000000000000000000000000400000000000000000000000000000000000000000000000000000'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 3: insufficient numbers', () => {
        let c =
            '000000000005000090004000010200003050000700000438000200000090000010400060000000000'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 4: duplicate box number', () => {
        let c =
            '009070005002100900100028000070005001008510000050000300000003006800000000210000087'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 5: duplicate column number', () => {
        let c =
            '601590000090010000000000004070314006024000005003000010006000003000902040000001600'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 6: duplicate row number', () => {
        let c =
            '040100350000000000000205000000408900260000012050300007004000160600007000010080020'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 7: unsolvable grid spot', () => {
        let c =
            '009028700806004005003000004600000000020713450000000002300000500900400807001250300'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 8: unsolvable box', () => {
        let c =
            '090300001000080046000000800405060030003275600060010904001000000580020000200007060'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 9: unsolvable column', () => {
        let c =
            '000041000060000020002000000320600000000050041700000002000000230048000000501002000'
        expect(solver({ board_string: c })).toBeUndefined()
    })

    test('case 10: unsolvable row', () => {
        let c =
            '900100004014030800003000090000708001800003000000000030021000070009040500500016003'
        expect(solver({ board_string: c })).toBeUndefined()
    })
})
