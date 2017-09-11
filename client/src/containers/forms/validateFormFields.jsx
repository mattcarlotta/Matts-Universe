export const isRequired = value => (!value ? 'Required' : undefined);
export const maxLength = max => value =>
	value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength30 = maxLength(30);
export const maxLength50 = maxLength(50);
export const maxLength100 = maxLength(100);
export const maxLength250 = maxLength(250);
export const maxLength20000 = maxLength(20000);
export const allowedCharacters = value =>
	/[~`@#$%&*+=[\]\\/{}|\\":<>]/g.test(value)
		? 'Please remove any special characters'
		: undefined;
export const postMaxLengthAllowed = [maxLength50, maxLength100, maxLength20000];
export const projectMaxLengthAllowed = [maxLength30, maxLength50, maxLength250];
