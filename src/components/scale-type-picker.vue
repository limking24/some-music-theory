<template>
	<div class="scale-type-picker">
		<div>
			<label for="supertype">Type</label>
			<select id="supertype" v-model="_supertype" @change="loadTypes(Number($event.target.value))" size="10">
				<option v-for="(supertype, key) in supertypes" :key="key" :value="key">
					{{supertype}}
				</option>
			</select>
		</div>

		<div>
			<label for="type">Scale</label>
			<select id="type" :value="_type" @change="changeType($event.target.value)" size="10">
				<option v-for="(type, key) in types" :key="key" :value="key" :class="{'alias-of-selected': type.aliasOfSelected}">
					{{type.display}}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts">
import { ScaleDao } from '@/data-access/scale-dao';
import { ScaleType as Dto } from '@/data/scale-type';
import { ScaleSupertype, ScaleType } from '@/models/scale-type-picker';
import { Inject } from 'typescript-ioc';
import { Optional } from 'typescript-optional';
import { Vue } from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

export default class ScaleTypePicker extends Vue {

	@Prop({default: []})
	excludeSupertypes!: ScaleSupertype[];

	@Prop()
	scaleType?: string;

	@Inject
	scaleDao!: ScaleDao;

	supertypes: Record<string, string> = {};

	types: Record<string, ScaleType> = {};

	_supertype: number = -1;

	_type: string = '';

	async mounted(): Promise<void> {
		// Find the scale type to be selected from database, and load supertypes options synchronously.
		let [scale] = await Promise.all([
			this.scaleType ? this.scaleDao.get(this.scaleType) : Promise.resolve(Optional.empty<Dto>()), 
			this.loadSuperTypes()
		]);
		// Check if the scale type exists, and if its supertype is one of the options.
		// If yes, then they will be the selected scale type and supertype.
		// Otherwise, set the supertype to the first option
		scale.ifPresent(data => {
			if (data.supertype in this.supertypes) {
				this._supertype = data.supertype;
				this._type = this.scaleType!;
			}
		});
		if (this._supertype === -1) {
			this._supertype = Number(Object.keys(this.supertypes)[0]);
		}
		// Load type options
		await this.loadTypes(this._supertype);
	}

	async loadSuperTypes(): Promise<void> {
		this.supertypes = (await this.scaleDao.supertypes())
							.filter(supertype => !this.excludeSupertypes.includes(supertype))
							.reduce((options, supertype) => {
								let display = `${ScaleSupertype[supertype]} (${supertype})`;
								if (display) {
									options[supertype] = display;
								}
								return options;
							}, {} as Record<string, string>);
	}

	async loadTypes(supertype: number): Promise<void> {
		// Load types
		this.types = (await this.scaleDao.getBySupertype(supertype))
						.reduce((options, type) => {
							options[type.key] = new ScaleType(type.display, type.aliasKeys);
							return options;
						}, {} as Record<string, ScaleType>);
		// Highlight aliases
		this.toggleAliasHighlight(this._type);
		// Position the selected option (or the first option) to the top
		this.$nextTick(() => {
			let select = this.$el.querySelector('.scale-type-picker #type');
			let selected = this.$el.querySelector('.scale-type-picker #type option:checked') as HTMLElement;
			select.scrollTop = (selected) ? selected.offsetTop - select.offsetTop : 0;
		});
	}

	@Emit('picked')
	changeType(key: string): string {
		this.toggleAliasHighlight(key); // Highlight aliases of the newly selected
		this.toggleAliasHighlight(this._type); // Unhighlight aliases of the old one
		this._type = key;
		return key;
	}

	toggleAliasHighlight(key: string): void {
		if (key in this.types) {
			for (let alias of this.types[key].aliasKeys) {
				if (alias in this.types) {
					this.types[alias].toggleAliasOfSelected();
				}
			}
		}
	}

}
</script>

<style scoped>
.scale-type-picker {
	white-space: nowrap;
	margin: 20px;
}

.scale-type-picker > div {
	display: inline-block;
	text-align: left;
}

label {
	margin: 0 13px;
	font-weight: bold;
	font-size: large;
}

select {
	display: block;
	margin: 0 12px;
	overflow-y: auto;
}

#supertype {
	width: 170px;
}

#type {
	width: 250px;
}

select:focus option:checked {
	background: rgb(45, 150, 250) linear-gradient(rgb(45, 150, 250), rgb(45, 150, 250));
}

#type:focus .alias-of-selected {
	color: rgb(255, 255, 255);
	background: rgb(100, 175, 255);
	transition: color 0.15s, background 0.5s ease-out;
}

#type:not(:focus) .alias-of-selected {
	background: rgb(225, 225, 225);
}
</style>