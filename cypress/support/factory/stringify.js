import stringifyObject from 'stringify-object';



export function prettyString (object) {

	const pretty = stringifyObject(object, {
		indent: '  ',
		singleQuotes: false,
		inlineCharacterLimit: 1000
	});
	

}

