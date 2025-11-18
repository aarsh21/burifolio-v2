import { describe, it, expect } from 'vitest'
import {
    isSubpost,
    getParentId,
    // groupPostsByYear, // Need to mock collection entries for this, skipping for now to keep it simple
} from './data-utils'

describe('data-utils', () => {
    describe('isSubpost', () => {
        it('should return true for subpost IDs', () => {
            expect(isSubpost('parent/child')).toBe(true)
            expect(isSubpost('2024/my-post/part-1')).toBe(true)
        })

        it('should return false for top-level post IDs', () => {
            expect(isSubpost('my-post')).toBe(false)
            expect(isSubpost('2024-summary')).toBe(false)
        })
    })

    describe('getParentId', () => {
        it('should return the parent ID from a subpost ID', () => {
            expect(getParentId('parent/child')).toBe('parent')
            expect(getParentId('series/part-1')).toBe('series')
        })

        it('should return the first segment as parent ID', () => {
            expect(getParentId('a/b/c')).toBe('a')
        })
    })
})
