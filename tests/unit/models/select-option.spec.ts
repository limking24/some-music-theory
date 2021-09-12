import { Option, Select, SelectText } from '@/models/select-option';
import { expect } from 'chai';

function match(select: SelectText, index: number, selected: string): boolean {
	return (select.indexOfSelected === index) && 
			(select.selected === selected);
}

describe('model/select-option', () => {

	describe('select', () => {

		const options = [
			new Option('zero', '0'),
			new Option('one', '1'),
			new Option('two', '2')
		];

		describe('static', () => {

			it(Select.create.name, () => {
				expect(match(Select.create<string, Option<string>>(options),				0, 'zero')).to.be.true;
				expect(match(Select.create<string, Option<string>>(options, 1),				1, 'one')).to.be.true;
				expect(match(Select.create<string, Option<string>>(options, 5),				0, 'zero')).to.be.true;
				expect(match(Select.create<string, Option<string>>(options, 'two'),			2, 'two')).to.be.true;
				expect(match(Select.create<string, Option<string>>(options, 'five'),		0, 'zero')).to.be.true;
				expect(match(Select.create<string, Option<string>>(options, 'two', 2),		2, 'two')).to.be.true;
				expect(match(Select.create<string, Option<string>>(options, 'five', 1),		1, 'one')).to.be.true;
				expect(match(Select.create<string, Option<string>>(options, 'five', 5),		0, 'zero')).to.be.true;
			});

		});

	});

});