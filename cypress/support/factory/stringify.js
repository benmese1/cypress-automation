import stringifyObject from 'stringify-object';

// THIS FUNCTIONALITY HAS BEEN DEPRECATED. PLEASE STAY TUNED FOR FUTURE IMPROVEMENTS



export function prettyString (object) {

	const pretty = stringifyObject(object, {
		indent: '  ',
		singleQuotes: false,
		inlineCharacterLimit: 1000
	});
	

}

