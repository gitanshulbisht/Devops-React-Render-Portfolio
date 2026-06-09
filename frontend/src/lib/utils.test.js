import { cn } from './utils';

describe('cn utility', () => {
    it('merges basic tailwind classes', () => {
        expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('resolves tailwind conflicts using tailwind-merge', () => {
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
        expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    });

    it('handles conditional classes with clsx', () => {
        expect(cn('base-class', { 'active-class': true, 'inactive-class': false })).toBe('base-class active-class');
    });

    it('handles arrays of classes', () => {
        expect(cn(['class1', 'class2'])).toBe('class1 class2');
    });

    it('handles falsy values gracefully', () => {
        expect(cn('class1', null, undefined, false, 0, '', 'class2')).toBe('class1 class2');
    });

    it('handles complex combinations', () => {
        expect(
            cn(
                'text-sm p-2',
                ['font-bold', 'text-red-500'],
                { 'bg-gray-100': true, 'bg-gray-200': false },
                'p-4' // overrides p-2
            )
        ).toBe('text-sm font-bold text-red-500 bg-gray-100 p-4');
    });
});
