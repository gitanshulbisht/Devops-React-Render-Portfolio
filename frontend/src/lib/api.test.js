import { formatApiErrorDetail } from './api';

describe('formatApiErrorDetail', () => {
    it('returns default message for null or undefined', () => {
        expect(formatApiErrorDetail(null)).toBe("Something went wrong. Please try again.");
        expect(formatApiErrorDetail(undefined)).toBe("Something went wrong. Please try again.");
    });

    it('returns the same string if input is a string', () => {
        expect(formatApiErrorDetail("Error occurred")).toBe("Error occurred");
    });

    it('handles arrays of objects with msg property', () => {
        const detail = [{ msg: "Error 1" }, { msg: "Error 2" }];
        expect(formatApiErrorDetail(detail)).toBe("Error 1 Error 2");
    });

    it('handles arrays of objects without msg property', () => {
        const detail = [{ foo: "bar" }, { baz: "qux" }];
        expect(formatApiErrorDetail(detail)).toBe('{"foo":"bar"} {"baz":"qux"}');
    });

    it('handles mixed arrays', () => {
        const detail = [{ msg: "Error 1" }, { foo: "bar" }, "Not an object"];
        expect(formatApiErrorDetail(detail)).toBe('Error 1 {"foo":"bar"} "Not an object"');
    });

    it('returns msg property if input is an object with msg', () => {
        expect(formatApiErrorDetail({ msg: "Single error message" })).toBe("Single error message");
    });

    it('returns stringified representation for other types', () => {
        expect(formatApiErrorDetail(123)).toBe("123");
        expect(formatApiErrorDetail(true)).toBe("true");
        expect(formatApiErrorDetail({ foo: "bar" })).toBe("[object Object]");
    });
});
